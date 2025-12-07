import { getSandbox } from "@cloudflare/sandbox";
import type { Context } from "hono";

const AllowLanguage = {
	bash: "bash",
	TypeScript: "TypeScript",
} as const;

type AllowLanguageType = (typeof AllowLanguage)[keyof typeof AllowLanguage];

const AllowEditableFiles = [
	"/workspace/example-1.ts",
	"/workspace/example-2.ts",
];

export const handleSandboxRequest = async (c: Context): Promise<Response> => {
	const slide = c.req.param("slide");
	const sandbox = getSandbox(c.env.slide_sandbox, slide);

	const { code, lang, fileName } = await c.req.json();

	if (!code || !lang || !(lang in AllowLanguage)) {
		return Response.json(
			{ error: "Invalid code or language" },
			{ status: 400 },
		);
	}

	switch (lang as AllowLanguageType) {
		case AllowLanguage.bash: {
			const stream = await sandbox.execStream(code);

			return new Response(stream, {
				headers: {
					"Content-Type": "text/event-stream",
					"Cache-Control": "no-cache",
				},
			});
		}
		case AllowLanguage.TypeScript:
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
		default:
			return Response.json({ error: "Unsupported language" }, { status: 400 });
	}
};
