import type { DurableObjectStub } from "@cloudflare/workers-types";
import { type Context, Hono } from "hono";
import { Index } from "./app/index";
import { demo } from "./demo";
import { HTMLRewriterHandler } from "./htmlRewriterHandler";

export const handleWebSocketConnection = async (
	c: Context,
): Promise<Response> => {
	const upgradeHeader = c.req.header("Upgrade");
	if (upgradeHeader !== "websocket") {
		return c.text("Expected websocket", 400);
	}

	const slide = c.req.param("slide");
	if (!slide) {
		return c.text("Slide name is required", 400);
	}

	const id = c.env.SLIDE_SYNC_CONNECTION_SERVER.idFromName(slide);
	const stub: DurableObjectStub = c.env.SLIDE_SYNC_CONNECTION_SERVER.get(id);

	// @ts-ignore
	return await stub.fetch(c.req.raw);
};

const app = new Hono();

app.route("/demo", demo);

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

export default app;

export { SlideSyncConnectionServer } from "./durableObjects/slideSyncConnectionServer";
