import { type Context, Hono } from "hono";
import { Index } from "./app/index";
import { demo } from "./demo";
import { handleSandboxRequest } from "./durableObjects/sandbox/handler";
import { HTMLRewriterHandler } from "./htmlRewriterHandler";
import { handleWebSocketConnection } from "./utils/handleWebSocketConnection";
import { handleLogin, LoginPage } from "./utils/login";

const app = new Hono();

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

export { Sandbox as SlideSandbox } from "@cloudflare/sandbox";
export { SlideSyncConnectionServer } from "./durableObjects/slideSyncConnectionServer";
