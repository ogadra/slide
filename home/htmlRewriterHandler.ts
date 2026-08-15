import { type Context } from "hono";
import { slideTitles } from "./generated/manifest";
import { HeadHandler } from "./htmlRewriter";

export const HTMLRewriterHandler = async (c: Context, num: number) =>{
  const slide = c.req.param("slide");
  if (slide === undefined) {
    throw new Error("the route matched without a slide parameter");
  }

  const urlPrefix = c.req.url.match(/^(https?:\/\/[^/]+\/[^/]+)/)?.[1];
  if (urlPrefix === undefined) {
    throw new Error(`cannot read an origin and a deck out of ${c.req.url}`);
  }

  const object = await c.env.ASSETS.get(`slides/${slide}/index.html`);

  if (object === null) {
    return c.notFound();
  }

  // R2 mirrors dist/, which is built from the same slidev/ the manifest is
  // generated from, so a deck can only be missing here if the two drifted.
  const title = slideTitles[slide];
  if (title === undefined) {
    throw new Error(`R2 serves ${slide} but the manifest has no entry for it`);
  }

  const html = new Response(object.body, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });

  return new HTMLRewriter()
    .on(
      "head",
      new HeadHandler(`${urlPrefix}/slides-export/${num}.png`, title)
    )
    .transform(html);
}
