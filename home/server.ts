import { type Context, Hono } from "hono";

const app = new Hono();

app.on("GET", ["/:slide/:num"], async (c: Context) => {
  const regex = /^(https?:\/\/[^/]+\/[^/]+\/)/;
  return c.env.ASSETS.fetch(c.req.url.match(regex)?.[1] ?? c.req.url);
});

app.on("GET", ["*"], async (c: Context) => {
  return c.env.ASSETS.fetch(c.req.url);
});

export default app;
