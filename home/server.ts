import { type Context, Hono } from "hono";
import { HTMLRewriterHandler } from "./htmlRewriterHandler";

const app = new Hono();

app.on("GET", ["/:slide"], async (c: Context) => {
  return HTMLRewriterHandler(c, 1);
});

app.on("GET", ["/:slide/:num"], async (c: Context) => {
  return HTMLRewriterHandler(c, Number(c.req.param("num")));
});

app.on("GET", ["*"], async (c: Context) => {
  return c.env.ASSETS.fetch(c.req.url);
});

export default app;
