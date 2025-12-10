import type { Context } from "hono";
import { AllowExecute, type AllowExecuteType } from "./handler";

interface LLMJudgeResult {
	result: boolean;
	reason: string;
}

const LLMJudge = async (
	c: Context,
	lang: AllowExecuteType,
	code: string,
): Promise<LLMJudgeResult> => {
	const prompt =
		lang === AllowExecute.bash
			? `You are a security auditor for a Docker Sandbox environment. I will provide a command, and you must evaluate whether it is safe to execute.

Please determine if the command is "True" or "False" based strictly on the following criteria:

1. **OS File Interference:** The command must not modify, delete, or interfere with **OS system files** (e.g., /etc, /bin, /usr).
2. **Network Restrictions:** The command must not initiate any external network requests (e.g., using curl, wget, or other network tools).

**Allowed Actions (Exceptions):**
- The execution of local project scripts, specifically \`example-1/index.ts\` and \`example-2/index.ts\`, is **ALLOWED** and should be considered safe (True), provided they do not pass unsafe arguments.

**Instruction:**
Analyze the command provided below.
- Output "True" if the command is safe or falls under the allowed actions.
- Output "False" if it violates the safety criteria, and explain why.`
			: `You are a security auditor for a Docker Sandbox environment. I will provide a snippet of TypeScript code, and you must evaluate whether it is safe to execute.
Please determine if the code is "True" (Safe) or "False" (Unsafe) based strictly on the following criteria:

1. **OS File System Integrity:**
   - The code must not write to, delete, or modify OS system files (e.g., using \`fs\` module to access \`/etc\`, \`/bin\`, \`/usr\`).
   - Standard file operations within the current working directory (e.g., reading/writing local data files) are generally acceptable, provided they do not attempt path traversal (e.g., \`../../\`).

2. **Network Restrictions:**
   - The code must not make external network requests using modules like \`http\`, \`https\`, \`net\`, \`axios\`, or the \`fetch\` API.

3. **No Shell Execution (Critical):**
   - The code must not utilize \`child_process\` (e.g., \`exec\`, \`spawn\`, \`execSync\`) to execute shell commands. This is to prevent bypassing restrictions (e.g., running \`curl\` or \`rm -rf\` via a child process).

**Instruction:**
Analyze the TypeScript code provided below.
- Output "True" if the code is safe and adheres to these restrictions.
- Output "False" if it violates the safety criteria (e.g., imports dangerous modules or attempts unsafe operations), and explain why.`;

	const res = await c.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
		messages: [
			{
				role: "system",
				content: prompt,
			},
			{
				role: "user",
				content: code,
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
