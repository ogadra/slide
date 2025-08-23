import { type Context, Hono } from "hono";
import { HTMLRewriterHandler } from "./htmlRewriterHandler";
import { Index } from "./app/index";
import { demo } from "./demo";

const app = new Hono();

app.route('/demo', demo);

app.on("GET", ["/assets/*"], async (c: Context) => {
  return c.env.ASSETS.fetch(c.req.url);
});

app.on("GET", ["/:slide", "/:slide/", "/:slide/:num"], async (c: Context) => {
  return HTMLRewriterHandler(c, Number(c.req.param("num") ?? 1));
});

app.on("GET", ["/"], async (c: Context) => {
  return Index(c);
});

app.on("GET", ["*"], async (c: Context) => {
  return c.env.ASSETS.fetch(c.req.url);
});

export default app;
