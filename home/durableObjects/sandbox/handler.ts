import { getSandbox } from '@cloudflare/sandbox';
import type { Context } from "hono";

export const handleSandboxRequest = async (
    c: Context,
): Promise<Response> => {
    const slide = c.req.param("slide");
    const sandbox = getSandbox(c.env.SLIDE_SANDBOX, slide);

    const result = await sandbox.exec('npm --version');

    return Response.json({
        output: result.stdout,
        exitCode: result.exitCode,
        success: result.success,
    });
}
