import type { Context } from "hono";

type BunshinEnv = {
	BUNSHIN_DOMAIN: string;
	BUNSHIN_PROXY_SECRET: string;
};

export const proxyToBunshin = async (c: Context): Promise<Response> => {
	const env = c.env as unknown as BunshinEnv;
	const endpoint = c.req.param("endpoint");

	const res = await fetch(`https://${env.BUNSHIN_DOMAIN}/api/${endpoint}`, {
		method: c.req.method,
		headers: {
			"X-Proxy-Secret": env.BUNSHIN_PROXY_SECRET,
			"Content-Type": "application/json",
			Cookie: c.req.header("Cookie") ?? "",
		},
		body: c.req.method === "POST" ? await c.req.text() : undefined,
	});

	return new Response(res.body, {
		status: res.status,
		headers: res.headers,
	});
};
