import { DurableObject } from "cloudflare:workers";
import { Files } from "@cloudflare/sandbox";

const ROOT = "/var/lib/processes";
const WORKSPACE = "/workspace";
const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;
const PORT_TOKENS = "portTokens";
const PROCESS_ID =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

// exec() の戻り値は開始したリクエストに属するので、後続リクエストから追えるよう pid・ログ・終了コードをファイルに残す
const RUN = `dir=$1; shift
setsid sh -c 'echo "$$" >"$0/pid"; exec "$@"' \\
	"$dir" "$@" >"$dir/stdout.log" 2>"$dir/stderr.log"
echo "$?" >"$dir/exit-code.tmp" && mv "$dir/exit-code.tmp" "$dir/exit-code"`;

const STATUS = `dir=$1
if [ ! -d "$dir" ]; then echo missing
elif [ -e "$dir/exit-code" ]; then echo "exited $(cat "$dir/exit-code")"
elif [ ! -e "$dir/pid" ]; then echo starting
elif kill -0 "$(cat "$dir/pid")" 2>/dev/null; then echo "running $(cat "$dir/pid")"
elif [ -e "$dir/exit-code" ]; then echo "exited $(cat "$dir/exit-code")"
else echo lost
fi`;

type Status =
	| { state: "starting" | "lost" }
	| { state: "running"; pid: number }
	| { state: "exited"; exitCode: number };

type LogStream = "stdout" | "stderr";

const run = async (container: Container, argv: string[]) => {
	const process = await container.exec(argv);
	const output = await process.output();
	return {
		exitCode: output.exitCode,
		stdout: new TextDecoder().decode(output.stdout),
	};
};

const previewUrl = (
	port: number,
	name: string,
	token: string,
	hostname: string,
): string => `https://${port}-${name}-${token}.${hostname}/`;

const generateToken = (): string => {
	const bytes = crypto.getRandomValues(new Uint8Array(12));
	return btoa(String.fromCharCode(...bytes))
		.replace(/[+/]/g, "_")
		.toLowerCase();
};

export class Sandbox extends DurableObject<Env> {
	private setup: Promise<void> | null = null;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		const container = ctx.container;
		// inactivity timeout は DO の再起動で消えるので、動いているコンテナを見つけたら掛け直す
		if (container?.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
		}
	}

	private get container(): Container {
		const container = this.ctx.container;
		if (!container) {
			throw new Error("No container is configured");
		}
		return container;
	}

	private ensureRunning(): Promise<void> {
		if (this.setup === null || !this.container.running) {
			this.setup = this.startContainer().catch((error) => {
				this.setup = null;
				throw error;
			});
		}
		return this.setup;
	}

	private async startContainer(): Promise<void> {
		if (!this.container.running) {
			// npm install -g @hono/cli を実行するので外部への通信を許す
			this.container.start({
				image: this.container.images.sandbox,
				enableInternet: true,
			});
		}
		try {
			await this.container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
		} catch (error) {
			await this.container.destroy();
			throw error;
		}
	}

	async startProcess(command: string): Promise<string> {
		await this.ensureRunning();
		const id = crypto.randomUUID();
		const dir = `${ROOT}/${id}`;
		await run(this.container, ["mkdir", "-p", dir]);

		// 出力を読まないことで、プロセスがこのリクエストより長く生きられる
		await this.container.exec(
			["sh", "-c", RUN, "sh", dir, "bash", "-c", command],
			{ cwd: WORKSPACE, stdout: "ignore", stderr: "ignore" },
		);

		for (let i = 0; i < 50; i++) {
			if ((await this.status(id))?.state !== "starting") break;
			await scheduler.wait(100);
		}

		await this.ctx.storage.put(`process:${id}`, command);
		await this.ctx.storage.setAlarm(Date.now() + 60_000);
		return id;
	}

	async status(id: string): Promise<Status | undefined> {
		const container = this.ctx.container;
		// id はブラウザから届きディレクトリ名になるので、startProcess が発行する UUID 以外は通さない
		if (!container?.running || !PROCESS_ID.test(id)) {
			return undefined;
		}

		const { stdout } = await run(container, [
			"sh",
			"-c",
			STATUS,
			"sh",
			`${ROOT}/${id}`,
		]);
		const [state, value] = stdout.trim().split(" ");

		if (state === "running") {
			return { state, pid: Number(value) };
		}
		if (state === "exited") {
			return { state, exitCode: Number(value) };
		}
		if (state === "starting" || state === "lost") {
			return { state };
		}
		return undefined;
	}

	async follow(id: string): Promise<Response | undefined> {
		const status = await this.status(id);
		if (!status) {
			return undefined;
		}

		const { readable, writable } = new TransformStream<
			Uint8Array,
			Uint8Array
		>();
		const writer = writable.getWriter();
		const encoder = new TextEncoder();
		// スライド側の EventSource は名前なしイベントの data.type で振り分けるので、0.x と同じ形で送る
		const send = (data: Record<string, unknown>) =>
			writer.write(
				encoder.encode(
					`data: ${JSON.stringify({ ...data, processId: id })}\n\n`,
				),
			);

		const tails = await Promise.all(
			(["stdout", "stderr"] as const).map(async (stream: LogStream) => {
				const path = `${ROOT}/${id}/${stream}.log`;
				const argv =
					status.state === "running"
						? ["tail", "-n", "+1", "-F", "--pid", `${status.pid}`, path]
						: ["cat", path];
				const process = await this.container.exec(argv, { stderr: "ignore" });
				let exited = false;
				const markExited = () => {
					exited = true;
				};
				process.exitCode.then(markExited, markExited);
				return { stream, process, isExited: () => exited };
			}),
		);

		// 終了済みのプロセスに signal を送ると内部エラーが記録されるので、生きている tail だけ止める
		const stop = () => {
			for (const { process, isExited } of tails) {
				if (!isExited()) process.kill();
			}
		};
		writer.closed.catch(stop);

		// ログが静かな間もクライアントの切断に気づけるよう、書き込みを定期的に起こす
		const heartbeat = setInterval(() => {
			writer.write(encoder.encode(": keep-alive\n\n")).catch(() => {});
		}, 5_000);

		const pump = async () => {
			try {
				await send({ type: "process_info", status: status.state });
				await Promise.all(
					tails.map(async ({ stream, process }) => {
						if (!process.stdout) return;
						for await (const text of process.stdout.pipeThrough(
							new TextDecoderStream(),
						)) {
							await send({ type: stream, data: text });
						}
					}),
				);
				const ended = await this.status(id);
				const exitCode = ended?.state === "exited" ? ended.exitCode : null;
				await send({ type: "exit", exitCode });
				await writer.close();
			} catch (error) {
				stop();
				await writer.abort(error).catch(() => {});
			} finally {
				clearInterval(heartbeat);
			}
		};
		void pump();

		return new Response(readable, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
			},
		});
	}

	async stop(id: string): Promise<boolean> {
		const status = await this.status(id);
		if (status?.state !== "running") {
			return false;
		}

		// 負の pid でプロセスグループごと止め、bash -c が起動した子プロセスも残さない
		const { exitCode } = await run(this.container, [
			"sh",
			"-c",
			'kill -s TERM -- "$1"',
			"sh",
			`-${status.pid}`,
		]);
		return exitCode === 0;
	}

	async alarm(): Promise<void> {
		let running = false;

		for (const key of (
			await this.ctx.storage.list({ prefix: "process:" })
		).keys()) {
			const status = await this.status(key.slice("process:".length));
			if (status?.state === "running" || status?.state === "starting") {
				running = true;
			} else {
				await this.ctx.storage.delete(key);
			}
		}

		// 実行中のプロセスはコンテナを生かさないので、alarm で inactivity timeout を延ばし続ける
		if (running) {
			await this.ctx.storage.setAlarm(Date.now() + 60_000);
		}
	}

	async writeFile(fileName: string, content: string): Promise<void> {
		await this.ensureRunning();
		await new Files(this.container).writeFile(fileName, content, {
			cwd: WORKSPACE,
		});
	}

	async exposePort(
		sandboxName: string,
		port: number,
		hostname: string,
	): Promise<{ url: string; port: number }> {
		const tokens =
			(await this.ctx.storage.get<Record<string, string>>(PORT_TOKENS)) ?? {};
		const token = tokens[port] ?? generateToken();
		tokens[port] = token;
		await this.ctx.storage.put(PORT_TOKENS, tokens);
		return { url: previewUrl(port, sandboxName, token, hostname), port };
	}

	async getExposedPorts(
		sandboxName: string,
		hostname: string,
	): Promise<{ url: string; port: number }[]> {
		const tokens =
			(await this.ctx.storage.get<Record<string, string>>(PORT_TOKENS)) ?? {};
		return Object.entries(tokens).map(([port, token]) => ({
			url: previewUrl(Number(port), sandboxName, token, hostname),
			port: Number(port),
		}));
	}
}
