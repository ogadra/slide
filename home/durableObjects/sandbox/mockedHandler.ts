import { DurableObject } from "cloudflare:workers";
import type { Context } from "hono";
import { streamSSE } from "hono/streaming";
import {
	alreadyStartedServerResponse,
	getMockedResponses,
	getPersistentResponse,
	honoInstallResponse,
	honoRequestResponse,
	honoUninstalledErrorResponse,
	killNothingResponse,
	killResponse,
	type SelectResponseResult,
} from "./mock/response";

const allowCommands = {
	installHonoCli: "npm install -g @hono/cli",
	requestExample: "hono request -P / example-1/index.ts",
	startServer: 'hono serve example-2/index.ts \\\n    --use "logger()"',
	killServer: "lsof -ti:7070 | xargs kill -9",
};

const selectResponse = async (
	processId: string,
	stub: SandboxMock,
): Promise<SelectResponseResult> => {
	const command = atob(processId);
	switch (command) {
		case allowCommands.installHonoCli:
			await stub.installHonoCli();
			return getMockedResponses(processId, honoInstallResponse);
		case allowCommands.requestExample:
			if (!(await stub.getInstalledHonoCli())) {
				return getMockedResponses(processId, honoUninstalledErrorResponse);
			}
			return getMockedResponses(processId, honoRequestResponse);
		case allowCommands.startServer:
			if (!(await stub.getInstalledHonoCli())) {
				return getMockedResponses(processId, honoUninstalledErrorResponse);
			}
			if (await stub.getServerStarted()) {
				return getMockedResponses(processId, alreadyStartedServerResponse);
			}
			await stub.startServer();
			return getPersistentResponse(processId);
		case allowCommands.killServer:
			if (!(await stub.getServerStarted())) {
				return getMockedResponses(processId, killNothingResponse);
			}
			await stub.stopServer();
			return getMockedResponses(processId, killResponse);
	}
	return getMockedResponses(processId, []);
};

export const mockedStreamHandler = async (
	c: Context,
	nanoId: string,
	processId: string,
): Promise<Response> => {
	const id = c.env.SANDBOX_MOCK.idFromName(nanoId);
	const stub: SandboxMock = c.env.SANDBOX_MOCK.get(id);
	const result = await selectResponse(processId, stub);

	if (result.type === "immediate") {
		return streamSSE(c, async (stream) => {
			await stream.writeSSE({ data: JSON.stringify(result.responses[0]) });
			await new Promise((resolve) =>
				setTimeout(resolve, Math.random() * 1000 + 500),
			);
			for (let i = 1; i < result.responses.length; i++) {
				await stream.writeSSE({ data: JSON.stringify(result.responses[i]) });
			}
			await stream.close();
		});
	}

	// persistent: DOのfetchを使ってSSEレスポンスを返す
	return stub.handleStream(processId);
};

export const mockedPushHandler = async (c: Context, nanoId: string) => {
	const id = c.env.SANDBOX_MOCK.idFromName(nanoId);
	const stub: SandboxMock = c.env.SANDBOX_MOCK.get(id);

	await stub.simulateServerAccess();

	return c.json({ success: true });
};

export const mockedHandler = async (c: Context, nanoId: string) => {
	const id = c.env.SANDBOX_MOCK.idFromName(nanoId);
	const stub: SandboxMock = c.env.SANDBOX_MOCK.get(id);

	const { code, execType, processId } = await c.req.json();

	// killコマンドの処理（startServerプロセスの停止）
	if (execType === "kill" && atob(processId) === allowCommands.startServer) {
		await stub.stopServer();
		return c.json({ processId: btoa(code) });
	}
	// 許可されたコマンドかチェック
	const isAllowedCommand = Object.values(allowCommands).includes(code);
	if (!isAllowedCommand) {
		return c.json(
			{ error: "Custom Commands are not allowed." },
			{ status: 400 },
		);
	}

	return c.json({ processId: btoa(code) });
};

type ServerLogSubscriber = {
	processId: string;
	writer: WritableStreamDefaultWriter;
};

interface DemoState {
	isInstalledHonoCli: boolean;
	isStartedServer: boolean;
	accessCount: number | null;
}

export class SandboxMock extends DurableObject {
	private demoState: DemoState;
	private serverLogSubscriber: ServerLogSubscriber | null = null;

	constructor(
		public state: DurableObjectState,
		public env: Env,
	) {
		super(state, env);
		this.demoState = {
			isInstalledHonoCli: false,
			isStartedServer: false,
			accessCount: null,
		};
	}

	handleStream(processId: string): Response {
		const { readable, writable } = new TransformStream();
		const writer = writable.getWriter();

		this.serverLogSubscriber = { processId, writer };

		// 初期レスポンスを非同期で送信
		const processInfo = {
			type: "process_info",
			command: atob(processId),
			status: "running",
			processId,
		};
		this.pushServerLog(processInfo);

		setTimeout(() => {
			this.pushServerLog({
				type: "stdout",
				data: "Listening on http://localhost:7070\n",
				processId,
			});
		}, Math.random() * 1000);

		return new Response(readable, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
			},
		});
	}

	async installHonoCli(): Promise<void> {
		this.demoState.isInstalledHonoCli = true;
	}

	async startServer(): Promise<void> {
		this.demoState.isStartedServer = true;
		this.demoState.accessCount = 0;
	}

	async stopServer(): Promise<void> {
		this.demoState.isStartedServer = false;
		this.demoState.accessCount = null;
		await this.closeServerLogs();
	}

	async getInstalledHonoCli(): Promise<boolean> {
		return this.demoState.isInstalledHonoCli;
	}

	async getServerStarted(): Promise<boolean> {
		return this.demoState.isStartedServer;
	}

	async simulateServerAccess(): Promise<void> {
		if (!this.serverLogSubscriber || !this.demoState.isStartedServer) return;

		const { processId } = this.serverLogSubscriber;
		const timestamp = new Date().toISOString();
		const responseTimeMs = Math.floor(Math.random() * 5) + 1;

		// リクエスト受信ログ
		await this.pushServerLog({
			type: "stdout",
			data: "<-- GET /\n",
			processId,
			timestamp,
		});

		// レスポンス送信ログ（少し遅延）
		setTimeout(async () => {
			await this.pushServerLog({
				type: "stdout",
				data: `--> GET / \x1b[32m200\x1b[0m ${responseTimeMs}ms\n`,
				processId,
				timestamp: new Date().toISOString(),
			});
		}, responseTimeMs);
	}

	async pushServerLog(data: unknown): Promise<void> {
		if (!this.serverLogSubscriber) return;

		const { writer } = this.serverLogSubscriber;
		try {
			const message = `data: ${JSON.stringify(data)}\n\n`;
			const encoder = new TextEncoder();
			await writer.write(encoder.encode(message));
		} catch {
			// クライアント切断時
			this.serverLogSubscriber = null;
		}
	}

	async closeServerLogs(): Promise<void> {
		if (!this.serverLogSubscriber) return;

		const { writer } = this.serverLogSubscriber;
		try {
			await writer.close();
		} catch {
			// already closed
		}
		this.serverLogSubscriber = null;
	}
}
