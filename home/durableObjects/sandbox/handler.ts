import { getSandbox } from "@cloudflare/sandbox";
import type { Context } from "hono";

const AllowLanguage = {
	bash: "bash",
	TypeScript: "typescript",
} as const;

type AllowLanguageType = (typeof AllowLanguage)[keyof typeof AllowLanguage];

export const handleSandboxRequest = async (c: Context): Promise<Response> => {
	const slide = c.req.param("slide");
	const sandbox = getSandbox(c.env.SLIDE_SANDBOX, slide);

	const { code, lang } = await c.req.json();

	if (!code || !lang || !(lang in AllowLanguage)) {
		return Response.json(
			{ error: "Invalid code or language" },
			{ status: 400 },
		);
	}

	switch (lang as AllowLanguageType) {
		case AllowLanguage.bash: {
			const result = await sandbox.exec(code);
			return Response.json({
				output: result.stdout,
				exitCode: result.exitCode,
				success: result.success,
			});
		}
		case AllowLanguage.TypeScript:
			return Response.json(
				{ error: "TypeScript execution not implemented yet" },
				{ status: 501 },
			);
		default:
			return Response.json({ error: "Unsupported language" }, { status: 400 });
	}
};
