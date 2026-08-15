import { type Context } from "hono";
import { slideTitles } from "./generated/manifest";
import { HeadHandler } from "./htmlRewriter";

export const HTMLRewriterHandler = async (c: Context, num: number) =>{
  const regex = /^(https?:\/\/[^/]+\/[^/]+)/;
  const urlPrefix = c.req.url.match(regex)?.[1] ?? c.req.url;
  const slide = c.req.param("slide") ?? "";
  const object = await c.env.ASSETS.get(`slides/${slide}/index.html`);

  if (object === null) {
    return c.notFound();
  }

  const html = new Response(object.body, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
  const title = slideTitles[slide] ?? "Slidev";

  return new HTMLRewriter()
    .on(
      "head",
      new HeadHandler(`${urlPrefix}/slides-export/${num}.png`, title)
    )
    .transform(html);
}
