import { type Context } from "hono";
import { rewriter, ElementHandler } from "./htmlRewriter";

export const HTMLRewriterHandler = async (c: Context, num: number) =>{
  const regex = /^(https?:\/\/[^/]+\/[^/]+\/)/;
  const urlPrefix = c.req.url.match(regex)?.[1] ?? c.req.url;
  const html = await c.env.ASSETS.fetch(urlPrefix);

  return rewriter
    .on(
      "head",
      new ElementHandler(`${urlPrefix}slides-export/${num}.png`)
    )
    .transform(html);
}
