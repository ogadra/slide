import { DurableObject } from "cloudflare:workers";
import type { Context } from "hono";
import { streamSSE } from "hono/streaming";
import { getMockedResponses, honoInstallResponse } from "./mock/response";

const allowCommands = {
	installHonoCli: "npm install -g @hono/cli",
	requestExample: "hono request -P / example-1/index.ts",
	startServer: `hono serve example-2/index.ts \n  --use "logger()"`,
	killServer: "lsof -ti:7070 | xargs kill -9",
};

const selectResponse = (processId: string) => {
	const command = atob(processId);
	switch (command) {
		case allowCommands.installHonoCli:
			return getMockedResponses(processId, honoInstallResponse);
	}
	return [];
};

export const mockedStreamHandler = async (
	c: Context,
	nanoId: string,
	processId: string,
): Promise<Response> => {
	const id = c.env.SANDBOX_MOCK.idFromName(nanoId);
	// TODO: use stub for state management
	// @ts-expect-error - will be used later
	const _stub: SandboxMock = c.env.SANDBOX_MOCK.get(id);
	const responses = selectResponse(processId);

	return streamSSE(c, async (stream) => {
		await stream.writeSSE({ data: JSON.stringify(responses[0]) });
		await new Promise((resolve) =>
			setTimeout(resolve, Math.random() * 1000 + 500),
		);
		for (let i = 1; i < responses.length; i++) {
			await stream.writeSSE({ data: JSON.stringify(responses[i]) });
		}
	});
};

export const mockedHandler = async (c: Context, nanoId: string) => {
	const id = c.env.SANDBOX_MOCK.idFromName(nanoId);
	const stub: SandboxMock = c.env.SANDBOX_MOCK.get(id);

	const { code } = await c.req.json();
	switch (code) {
		case allowCommands.installHonoCli:
			stub.installHonoCli();
			break;
		case allowCommands.requestExample:
			break;
		case allowCommands.startServer:
			stub.startServer();
			break;
		case allowCommands.killServer:
			stub.stopServer();
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

	installHonoCli = () => {
		this.demoState.isInstalledHonoCli = true;
	};

	startServer = () => {
		this.demoState.isStartedServer = true;
		this.demoState.accessCount = 0;
	};

	stopServer = () => {
		this.demoState.isStartedServer = false;
		this.demoState.accessCount = null;
	};
}
