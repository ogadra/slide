import { getSandbox } from "@cloudflare/sandbox";
import type { Context } from "hono";

const AllowExecuteType = {
	bash: "bash",
	TypeScript: "TypeScript",
	kill: "kill",
} as const;

type AllowLanguageType =
	(typeof AllowExecuteType)[keyof typeof AllowExecuteType];

const AllowEditableFiles = [
	"/workspace/example-1.ts",
	"/workspace/example-2.ts",
];

export const handleSandboxRequest = async (c: Context): Promise<Response> => {
	const slide = c.req.param("slide");
	const sandbox = getSandbox(c.env.slide_sandbox, slide);

	const { code, lang, fileName } = await c.req.json();

	if (!lang || !(lang in AllowExecuteType)) {
		return Response.json({ error: "Invalid ExecuteType" }, { status: 400 });
	}

	switch (lang as AllowLanguageType) {
		case AllowExecuteType.bash: {
			const process = await sandbox.startProcess(code);
			const stream = await sandbox.streamProcessLogs(process.id);

			return new Response(stream, {
				headers: {
					"Content-Type": "text/event-stream",
					"Cache-Control": "no-cache",
					"Process-Id": process.id,
				},
			});
		}
		case AllowExecuteType.TypeScript:
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
		case AllowExecuteType.kill: {
			const { processId } = await c.req.json();
			if (!processId) {
				return Response.json({ error: "Process ID required" }, { status: 400 });
			}
			const result = await sandbox.killProcess(processId);
			return Response.json(result);
		}
		default:
			return Response.json({ error: "Unsupported language" }, { status: 400 });
	}
};
