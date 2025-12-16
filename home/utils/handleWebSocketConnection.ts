import type { DurableObjectStub } from "@cloudflare/workers-types";
import type { Context } from "hono";

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

	// @ts-expect-error
	return await stub.fetch(c.req.raw);
};
