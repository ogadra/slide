import { type Context, Hono } from "hono";
import { HTMLRewriterHandler } from "./htmlRewriterHandler";

const app = new Hono();

app.on("GET", ["/assets/*"], async (c: Context) => {
  return c.env.ASSETS.fetch(c.req.url);
});

app.on("GET", ["/:slide", "/:slide/", "/:slide/:num"], async (c: Context) => {
  return HTMLRewriterHandler(c, Number(c.req.param("num") ?? 1));
});

app.on("GET", ["*"], async (c: Context) => {
  return c.env.ASSETS.fetch(c.req.url);
});

export default app;
