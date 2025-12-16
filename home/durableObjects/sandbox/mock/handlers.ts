import type { Context } from "hono";
import { streamSSE } from "hono/streaming";
import { randomString } from "../../../utils/randomString";
import { AllowCommandStrings } from "../constants/allowCommands";
import { Page } from "../src/example-2/page";
import type { SandboxMock } from "./SandboxMock";
import { selectResponse } from "./selectResponse";

const getSandboxMockStub = (c: Context, sessionId: string): SandboxMock => {
	const id = c.env.SANDBOX_MOCK.idFromName(sessionId);
	return c.env.SANDBOX_MOCK.get(id);
};

export const mockedStreamHandler = async (
	c: Context,
	sessionId: string,
	processId: string,
): Promise<Response> => {
	const stub = getSandboxMockStub(c, sessionId);
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

export const mockedAccessHandler = async (c: Context, sessionId: string) => {
	const stub = getSandboxMockStub(c, sessionId);

	if (!(await stub.getServerStarted())) {
		return c.text(
			"Error proxying request to container: The container is not listening in the TCP address 10.0.0.1:7070",
			{ status: 403 },
		);
	}

	const accessCount = await stub.honoServerAccess();
	c.set("count", accessCount);
	return Page(c);
};

export const mockedHandler = async (c: Context, sessionId: string) => {
	const stub = getSandboxMockStub(c, sessionId);

	const { code, execType, processId } = await c.req.json();

	// killコマンドの処理（startServerプロセスの停止）
	if (
		execType === "kill" &&
		atob(processId) === AllowCommandStrings.startServer
	) {
		await stub.stopServer();
		return c.json({ processId: btoa(code) });
	}

	if (execType === "start") {
		const hostname = new URL(c.req.url).hostname;

		return c.json({
			url: `https://7070-${randomString()}-${sessionId}.${hostname}`,
			exitCode: 0,
			success: true,
		});
	}

	// 許可されたコマンドかチェック
	const isAllowedCommand = Object.values(AllowCommandStrings).includes(code);
	if (!isAllowedCommand) {
		return c.json(
			{ error: "Custom Commands are not allowed." },
			{ status: 400 },
		);
	}

	return c.json({ processId: btoa(code) });
};
