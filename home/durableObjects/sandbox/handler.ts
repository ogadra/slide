import { getSandbox } from "@cloudflare/sandbox";
import type { Context } from "hono";
import { ipLogger } from "../../utils/ipLogger";
import { AllowCommands } from "./constants/allowCommands";
import { judge } from "./llmJudge";
import {
	mockedAccessHandler,
	mockedHandler,
	mockedStreamHandler,
} from "./mock/handlers";
import { AllowExecute, type AllowExecuteType } from "./types/sandbox";
export { AllowExecute, type AllowExecuteType };

const AllowEditableFiles = ["example-1/index.ts", "example-2/index.ts"];

const EXPORT_PORT = 7070;
const IS_MOCKED = true;

export const handleSandboxAccessRequest = async (
	c: Context,
): Promise<Response> => {
	const sessionId = c.get("sessionId");
	return mockedAccessHandler(c, sessionId);
};

export const handleSandboxStreamRequest = async (
	c: Context,
): Promise<Response> => {
	const processId = c.req.query("processId");

	if (!processId) {
		return c.json({ error: "processId required" }, { status: 400 });
	}
	const sessionId = c.get("sessionId");

	if (IS_MOCKED) {
		return mockedStreamHandler(c, sessionId, processId);
	}

	const sandbox = getSandbox(c.env.Sandbox, sessionId);
	const streamProcess = await sandbox.streamProcessLogs(processId);

	return new Response(streamProcess, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
		},
	});
};

export const handleSandboxRequest = async (c: Context): Promise<Response> => {
	const sessionId = c.get("sessionId");

	if (IS_MOCKED) {
		return mockedHandler(c, sessionId);
	}

	const sandbox = getSandbox(c.env.Sandbox, sessionId);

	const content = await c.req.json();
	const { code, execType, fileName } = content as {
		code: string;
		execType: AllowExecuteType;
		fileName?: string;
	};

	if (!execType || !(execType in AllowExecute)) {
		return c.json({ error: "Invalid ExecuteType" }, { status: 400 });
	}

	await ipLogger(c.env.IP_LOG, c.req.raw, `sandbox:${execType}`, content);

	if (code && execType in AllowExecute) {
		const allowedCommands = AllowCommands[execType];
		if (allowedCommands && !allowedCommands.includes(code)) {
			const result = await judge(c, execType, code);
			if (!result.result) {
				return c.json({ error: result.reason }, { status: 403 });
			}
		} else {
		}
	}

	switch (execType as AllowExecuteType) {
		case AllowExecute.bash: {
			const process = await sandbox.startProcess(code);
			return c.json({ processId: process.id });
		}
		case AllowExecute.TypeScript: {
			// check fileName
			if (!fileName || !AllowEditableFiles.includes(fileName)) {
				return c.json({ error: "File not editable" }, { status: 403 });
			}

			await sandbox.writeFile(fileName, code);

			return c.json({
				output: `File ${fileName} updated successfully.`,
				exitCode: 0,
				success: true,
			});
		}
		case AllowExecute.kill: {
			const { processId } = await c.req.json();
			if (!processId) {
				return c.json({ error: "Process ID required" }, { status: 400 });
			}
			const result = await sandbox.killProcess(processId);
			return c.json(result);
		}
		case AllowExecute.start: {
			const hostname = new URL(c.req.url).hostname;
			const exposes = await sandbox.getExposedPorts(hostname);

			for (const expose of exposes) {
				if (expose.port === EXPORT_PORT) {
					return c.json({
						url: expose.url,
						exitCode: 0,
						success: true,
					});
				}
			}

			const exposed = await sandbox.exposePort(EXPORT_PORT, { hostname });
			return c.json({
				url: exposed.url,
				exitCode: 0,
				success: true,
			});
		}
		default:
			return c.json({ error: "Unsupported language" }, { status: 400 });
	}
};
