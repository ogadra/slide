import { proxyToSandbox, type SandboxEnv } from "@cloudflare/sandbox";
import { type Context, Hono } from "hono";
import { Index } from "./app/index";
import { demo } from "./demo";
import { handleSandboxRequest } from "./durableObjects/sandbox/handler";
import { HTMLRewriterHandler } from "./htmlRewriterHandler";
import { handleWebSocketConnection } from "./utils/handleWebSocketConnection";
import { handleLogin, LoginPage } from "./utils/login";

type BindingsEnv = {
	Sandbox: DurableObjectNamespace;
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

app.post("/sandbox/:slide", handleSandboxRequest);

export default app;

export { Sandbox } from "@cloudflare/sandbox";
export { SlideSyncConnectionServer } from "./durableObjects/slideSyncConnectionServer";
