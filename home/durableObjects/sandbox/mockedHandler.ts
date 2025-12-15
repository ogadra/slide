import { DurableObject } from "cloudflare:workers";
import type { Context } from "hono";
import { streamSSE } from "hono/streaming";
import {
	getMockedResponses,
	honoInstallResponse,
	honoRequestResponse,
	honoUninstalledErrorResponse,
	killNothingResponse,
	killResponse,
} from "./mock/response";

const allowCommands = {
	installHonoCli: "npm install -g @hono/cli",
	requestExample: "hono request -P / example-1/index.ts",
	startServer: 'hono serve example-2/index.ts \\\n    --use "logger()"',
	killServer: "lsof -ti:7070 | xargs kill -9",
};

const selectResponse = async (processId: string, stub: SandboxMock) => {
	const command = atob(processId);
	switch (command) {
		case allowCommands.installHonoCli:
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
			// TODO: add more responses for starting server
			return getMockedResponses(processId, []);
		case allowCommands.killServer:
			if (!(await stub.getServerStarted())) {
				return getMockedResponses(processId, killNothingResponse);
			}
			return getMockedResponses(processId, killResponse);
	}
	return [];
};

export const mockedStreamHandler = async (
	c: Context,
	nanoId: string,
	processId: string,
): Promise<Response> => {
	const id = c.env.SANDBOX_MOCK.idFromName(nanoId);
	const stub: SandboxMock = c.env.SANDBOX_MOCK.get(id);
	const responses = await selectResponse(processId, stub);

	return streamSSE(c, async (stream) => {
		await stream.writeSSE({ data: JSON.stringify(responses[0]) });
		await new Promise((resolve) =>
			setTimeout(resolve, Math.random() * 1000 + 500),
		);
		for (let i = 1; i < responses.length; i++) {
			await stream.writeSSE({ data: JSON.stringify(responses[i]) });
		}
		await stream.close();
	});
};

export const mockedHandler = async (c: Context, nanoId: string) => {
	const id = c.env.SANDBOX_MOCK.idFromName(nanoId);
	const stub: SandboxMock = c.env.SANDBOX_MOCK.get(id);

	const { code } = await c.req.json();
	switch (code) {
		case allowCommands.installHonoCli:
			await stub.installHonoCli();
			break;
		case allowCommands.requestExample:
			break;
		case allowCommands.startServer:
			await stub.startServer();
			break;
		case allowCommands.killServer:
			await stub.stopServer();
			break;
		default:
			return c.json(
				{ error: "Custom Commands are not allowed." },
				{ status: 400 },
			);
	}
	return c.json({ processId: btoa(code) });
};

interface DemoState {
	isInstalledHonoCli: boolean;
	isStartedServer: boolean;
	accessCount: number | null;
}

export class SandboxMock extends DurableObject {
	private demoState: DemoState;

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
	}

	async getInstalledHonoCli(): Promise<boolean> {
		return this.demoState.isInstalledHonoCli;
	}

	async getServerStarted(): Promise<boolean> {
		return this.demoState.isStartedServer;
	}
}
