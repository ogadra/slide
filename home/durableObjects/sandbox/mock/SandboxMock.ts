import { DurableObject } from "cloudflare:workers";
import type { ServerLogSubscriber } from "../types/sandbox";
import type { MockedResponse } from "./response";

export class SandboxMock extends DurableObject {
	private serverLogSubscriber: ServerLogSubscriber | null = null;

	constructor(
		public state: DurableObjectState,
		public env: Env,
	) {
		super(state, env);
		if (!this.ctx.storage.get("isInitialized")) {
			this.ctx.storage.put("isInitialized", true);
			this.ctx.storage.put("isInstalledHonoCli", false);
			this.ctx.storage.put("isStartedServer", false);
			this.ctx.storage.put("accessCount", undefined);
		}
	}

	handleStream(processId: string): Response {
		const { readable, writable } = new TransformStream();
		const writer = writable.getWriter();

		this.serverLogSubscriber = { processId, writer };

		// 初期レスポンスを非同期で送信
		const processInfo: MockedResponse = {
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
		this.ctx.storage.put("isInstalledHonoCli", true);
	}

	async startServer(): Promise<void> {
		this.ctx.storage.put("isStartedServer", true);
		this.ctx.storage.put("accessCount", 0);
	}

	async stopServer(): Promise<void> {
		this.ctx.storage.put("isStartedServer", false);
		this.ctx.storage.put("accessCount", undefined);
		await this.closeServerLogs();
	}

	async getInstalledHonoCli(): Promise<boolean> {
		return (await this.ctx.storage.get("isInstalledHonoCli")) as boolean;
	}

	async getServerStarted(): Promise<boolean> {
		return (await this.ctx.storage.get("isStartedServer")) as boolean;
	}

	async honoServerAccess(): Promise<number | undefined> {
		if (
			!this.ctx.storage.get("isStartedServer") ||
			this.ctx.storage.get("accessCount") === undefined
		)
			throw new Error("Server is not started");

		const before = (await this.ctx.storage.get("accessCount")) as number;
		this.ctx.storage.put("accessCount", before + 1);

		if (!this.serverLogSubscriber) return this.ctx.storage.get("accessCount");

		const { processId } = this.serverLogSubscriber;
		const responseTimeMs = Math.floor(Math.random() * 10) + 1;

		await this.pushServerLog({
			type: "stdout",
			data: "<-- GET /\n",
			processId,
		});

		await new Promise((resolve) => setTimeout(resolve, responseTimeMs));

		await this.pushServerLog({
			type: "stdout",
			data: `--> GET / \x1b[32m200\x1b[0m ${responseTimeMs}ms\n`,
			processId,
		});

		return this.ctx.storage.get("accessCount");
	}

	async pushServerLog(data: MockedResponse): Promise<void> {
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
