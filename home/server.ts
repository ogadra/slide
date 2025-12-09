import { proxyToSandbox, type SandboxEnv } from "@cloudflare/sandbox";
import { type Context, Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { nanoid } from "nanoid";
import { Index } from "./app/index";
import { demo } from "./demo";
import {
	handleSandboxRequest,
	handleSandboxStreamRequest,
} from "./durableObjects/sandbox/handler";
import { HTMLRewriterHandler } from "./htmlRewriterHandler";
import { handleWebSocketConnection } from "./utils/handleWebSocketConnection";
import { handleLogin, LoginPage } from "./utils/login";

type BindingsEnv = {
	Sandbox: DurableObjectNamespace;
	IP_LOG: KVNamespace;
};

const app = new Hono<{ Bindings: BindingsEnv }>();

app.use("*", async (c, next) => {
	const proxyResponse = await proxyToSandbox(
		c.req.raw,
		c.env as unknown as SandboxEnv,
	);
	if (proxyResponse) {
		return proxyResponse;
	}
	await next();
});

app.route("/demo", demo);

app.get("/login", (c: Context) => LoginPage(c));
app.post("/login", handleLogin);

app.get("/ws/:slide", handleWebSocketConnection);

app.use("/sandbox/*", async (c, next) => {
	const nanoId = getCookie(c, "nanoId");
	if (!nanoId) {
		setCookie(c, "nanoId", nanoid().toLowerCase(), {
			httpOnly: true,
			path: "/",
		});
	}

	await next();
});

app.get("/sandbox/:slide/stream", handleSandboxStreamRequest);
app.post("/sandbox/:slide", handleSandboxRequest);

app.on("GET", ["/assets/*"], async (c: Context) => {
	return c.env.ASSETS.fetch(c.req.url);
});

app.on(
	"GET",
	["/:slide", "/:slide/", "/:slide/:num", "/:slide/presenter/:num"],
	async (c: Context) => {
		return HTMLRewriterHandler(c, Number(c.req.param("num") ?? 1));
	},
);

app.on("GET", ["/"], async (c: Context) => {
	return Index(c);
});

app.on("GET", ["*"], async (c: Context) => {
	return c.env.ASSETS.fetch(c.req.url);
});

export default app;

export { Sandbox } from "@cloudflare/sandbox";
export { SlideSyncConnectionServer } from "./durableObjects/slideSyncConnectionServer";
