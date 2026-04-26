import { type Context } from "hono";
import { HeadHandler } from "./htmlRewriter";

const titles = (path: string): string => {
  switch (path) {
    case "my-strongest-presentation-slides":
      return "俺の考えた最強の登壇資料";
    case "lambda-as-an-ecs-alternative":
      return "LambdaをECSと思い込む技術";
    case "what-is-this-add-to-calendar-button":
      return "「カレンダーに追加」ボタンって何者？";
    case "cloudflare-workers-slidev":
      return "実行可能なスライドを作る";
    case "playwright-mcp-deep-dive":
      return "深堀り! Playwright MCP";
    case "ios-safari-app-experience":
      return "Safariでもネイティブアプリの触り心地を実現したい！";
    case "playwright-mcp-best-effort":
      return "Playwright MCPの、今の全力";
    case "claude-code-presentation":
      return "大興奮！Claude Codeはなぜ我々の価値観を変えるのか";
    case "upgrade-to-rrv7":
      return "RRv7移行のつらみポイント";
    case "self-hosting-slides":
      return "スライド自己管理のすゝめ";
    case "solo-dev-considerations":
      return "個人開発で気をつけるべきこと";
    case "using-conform-in-remix":
      return "Conform in Remix Personal Observations";
    case "ja-using-conform-in-remix":
      return "RemixでConformを使って感じたこと";
    case "cloudflare-fullstack-application":
      return "CloudflareだけでWebアプリを作成してみた";
    case "remix-on-hono":
      return "hono-remix-adapter 使ってみた";
    default:
      return "Slidev";
  }
}

export const HTMLRewriterHandler = async (c: Context, num: number) =>{
  const regex = /^(https?:\/\/[^/]+\/[^/]+)/;
  const urlPrefix = c.req.url.match(regex)?.[1] ?? c.req.url;
  const html = await c.env.ASSETS.fetch(urlPrefix);
  const title = titles(c.req.param("slide") ?? "");

  return new HTMLRewriter()
    .on(
      "head",
      new HeadHandler(`${urlPrefix}/slides-export/${num}.png`, title)
    )
    .transform(html);
}
