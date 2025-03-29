import { type Context, Hono } from "hono";
import { rewriter, ElementHandler } from "./htmlRewriter";

const app = new Hono();

app.on("GET", ["/:slide/:num"], async (c: Context) => {
  const regex = /^(https?:\/\/[^/]+\/[^/]+\/)/;
  const urlPrefix = c.req.url.match(regex)?.[1] ?? c.req.url;
  const html = await c.env.ASSETS.fetch(urlPrefix);

  return rewriter
    .on(
      "head",
      new ElementHandler(`${urlPrefix}slides-export/${c.req.param("num")}.png`)
    )
    .transform(html);
});


app.on("GET", ["*"], async (c: Context) => {
  return c.env.ASSETS.fetch(c.req.url);
});

export default app;
