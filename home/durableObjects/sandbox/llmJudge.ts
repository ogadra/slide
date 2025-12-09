import type { Context } from "hono";
import type { AllowExecuteType } from "./handler";

interface LLMJudgeResult {
	result: boolean;
	reason: string;
}

const LLMJudge = async (
	c: Context,
	_lang: AllowExecuteType,
	code: string,
): Promise<LLMJudgeResult> => {
	const res = await c.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
		messages: [
			{
				role: "system",
				content: `You are a security auditor for a Docker Sandbox environment. I will provide a command, and you must evaluate whether it is safe to execute.

Please determine if the command is "True" or "False" based strictly on the following criteria:

1. **OS File Interference:** The command must not modify, delete, or interfere with OS system files.
2. **Network Restrictions:** The command must not initiate any external network requests (e.g., using curl, wget, or other network tools).

**Instruction:**
Analyze the command provided below. If it violates any of the above criteria, mark it as UNSAFE and explain why.`,
			},
			{
				role: "user",
				content: `Command to evaluate: ${code}`,
			},
		],
		response_format: {
			type: "json_schema",
			json_schema: {
				type: "object",
				properties: {
					result: {
						type: "boolean",
					},
					reason: {
						type: "string",
					},
				},
				required: ["result", "reason"],
			},
		},
	});
	return res.response;
};

export const judge = async (
	c: Context,
	lang: AllowExecuteType,
	code: string,
): Promise<LLMJudgeResult> => {
	for (let i = 0; i < 3; i++) {
		try {
			const response = await LLMJudge(c, lang, code);
			return response;
		} catch (_e) {}
	}
	throw new Error("LLM Judge Failed after 3 attempts");
};
