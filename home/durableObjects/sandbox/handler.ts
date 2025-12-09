import { getSandbox } from "@cloudflare/sandbox";
import type { Context } from "hono";

const AllowExecuteType = {
	bash: "bash",
	TypeScript: "TypeScript",
	kill: "kill",
	start: "start",
} as const;

type AllowExecuteType =
	(typeof AllowExecuteType)[keyof typeof AllowExecuteType];

const AllowEditableFiles = ["example-1/index.ts", "example-2/index.ts"];

const EXPORT_PORT = 7070;

export const handleSandboxStreamRequest = async (
	c: Context,
): Promise<Response> => {
	const slide = c.req.param("slide");
	const processId = c.req.query("processId");

	if (!processId) {
		return Response.json({ error: "processId required" }, { status: 400 });
	}

	const sandbox = getSandbox(c.env.Sandbox, slide);
	const stream = await sandbox.streamProcessLogs(processId);

	return new Response(stream, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
		},
	});
};

export const handleSandboxRequest = async (c: Context): Promise<Response> => {
	const slide = c.req.param("slide");

	const sandbox = getSandbox(c.env.Sandbox, slide);

	const { code, execType, fileName } = await c.req.json();

	if (!execType || !(execType in AllowExecuteType)) {
		return Response.json({ error: "Invalid ExecuteType" }, { status: 400 });
	}

	switch (execType as AllowExecuteType) {
		case AllowExecuteType.bash: {
			const process = await sandbox.startProcess(code);
			return Response.json({ processId: process.id });
		}
		case AllowExecuteType.TypeScript: {
			// check fileName
			if (!fileName || !AllowEditableFiles.includes(fileName)) {
				return Response.json({ error: "File not editable" }, { status: 403 });
			}

			await sandbox.writeFile(fileName, code);

			return Response.json({
				output: `File ${fileName} updated successfully.`,
				exitCode: 0,
				success: true,
			});
		}
		case AllowExecuteType.kill: {
			const { processId } = await c.req.json();
			if (!processId) {
				return Response.json({ error: "Process ID required" }, { status: 400 });
			}
			const result = await sandbox.killProcess(processId);
			return Response.json(result);
		}
		case AllowExecuteType.start: {
			const hostname = new URL(c.req.url).hostname;
			const exposes = await sandbox.getExposedPorts(hostname);

			for (const expose of exposes) {
				if (expose.port === EXPORT_PORT) {
					return Response.json({
						url: expose.url,
						exitCode: 0,
						success: true,
					});
				}
			}

			const exposed = await sandbox.exposePort(EXPORT_PORT, { hostname });
			return Response.json({
				url: exposed.url,
				exitCode: 0,
				success: true,
			});
		}
		default:
			return Response.json({ error: "Unsupported language" }, { status: 400 });
	}
};
