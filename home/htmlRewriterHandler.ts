import { type Context } from "hono";
import { rewriter, HeadHandler } from "./htmlRewriter";

const titles = (path: string): string => {
  switch (path) {
    case "cloudflare-fullstack-application":
      return "CloudflareだけでWebアプリを作成してみた";
    case "ja-using-conform-in-remix":
      return "RemixでConformを使って感じたこと";
    case "solo-dev-considerations":
      return "個人開発で気をつけるべきこと";
    case "using-conform-in-remix":
      return "Conform in Remix Personal Observations";
    default:
      return "Slidev";
  }
}

export const HTMLRewriterHandler = async (c: Context, num: number) =>{
  const regex = /^(https?:\/\/[^/]+\/[^/]+)/;
  const urlPrefix = c.req.url.match(regex)?.[1] ?? c.req.url;
  const html = await c.env.ASSETS.fetch(urlPrefix);
  const title = titles(c.req.param("slide"));

  return rewriter
    .on(
      "head",
      new HeadHandler(`${urlPrefix}/slides-export/${num}.png`, title)
    )
    .transform(html);
}
