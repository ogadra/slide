import { type Context, Hono } from "hono";

const app = new Hono();

app.on("GET", ["*"], async (c: Context) => {
  return c.env.ASSETS.fetch(c.req.url);
});

export default app;
