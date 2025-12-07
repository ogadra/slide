/** @jsx jsx */
/** @jsxImportSource hono/jsx */

import type { Context } from "hono";
import { Section } from "./components/Section";

export const Index = (c: Context) => {
	return c.html(
		<html lang="ja">
			<Header />
			<Body />
		</html>,
	);
};

const Header = () => (
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>ogadra's slides</title>
		<link rel="stylesheet" cross-origin href="./style.css" />
		<meta
			property="og:image"
			content="https://media.ogadra.com/misskey/drive/4250e8ad-7d0a-4c81-af5b-0a6c649e8110.png"
		/>
		<meta property="twitter:card" content="summary_large_image" />
		<meta
			property="twitter:image"
			content="https://media.ogadra.com/misskey/drive/4250e8ad-7d0a-4c81-af5b-0a6c649e8110.png"
		/>
		<meta property="og:title" content="ogadra's Slide Archive" />
		<meta property="twitter:title" content="おがどらのスライドアーカイブ" />
		<meta
			property="twitter:text:title"
			content="おがどらのスライドアーカイブ"
		/>
		<meta property="og:description" content="おがどらのスライドアーカイブ" />
	</head>
);

const Body = () => {
	const year = new Date().getFullYear();
	return (
		<body>
			<header>
				<h1>ogadra's Slide Archive</h1>
			</header>

			<main>
				<Section
					date="2025/12/10"
					eventLink="https://cfm-cts.connpass.com/event/374413/"
					eventTitle="Cloudflare Meet-up Tokyo Vol.9"
					slide={[
						{
							link: "./cloudflare-workers-slidev",
							title: "workersでSlidevを120%活かす！",
						},
					]}
				/>

				<Section
					date="2025/10/22"
					eventLink="https://wnb.connpass.com/event/371722/"
					eventTitle="Work≠Build Meetup Tokyo feat ryoppippi"
					slide={[
						{
							link: "./playwright-mcp-deep-dive",
							title: "深堀り! Playwright MCP",
						},
					]}
				/>

				<Section
					date="2025/08/26"
					eventLink="https://beenos.connpass.com/event/364554/"
					eventTitle="個人開発/環境依存LT会"
					slide={[
						{
							link: "./ios-safari-app-experience",
							title: "Safariでもネイティブアプリの触り心地を実現したい！",
						},
					]}
				/>

				<Section
					date="2025/07/29"
					eventLink="https://dev-hive.connpass.com/event/361847/"
					eventTitle="全力で生成AIに仕事奪わせてみたLT会"
					slide={[
						{
							link: "./playwright-mcp-best-effort",
							title: "Playwright MCPの、今の全力",
						},
					]}
				/>

				<Section
					date="2025/07/10"
					eventTitle="非公開発表"
					slide={[
						{
							link: "./claude-code-presentation",
							title: "大興奮！Claude Codeはなぜ我々の価値観を変えるのか",
						},
					]}
				/>

				<Section
					date="2025/06/23"
					eventLink="https://lu.ma/paz62qi5"
					eventTitle="Remix Tokyo Meetup 第5回 『Bring Your Own Talk』"
					slide={[
						{
							link: "./upgrade-to-rrv7",
							title: "RRv7移行のつらみポイント",
						},
					]}
				/>

				<Section
					date="2025/04/10"
					eventLink="https://canly.connpass.com/event/349882/"
					eventTitle="初心者歓迎！クラフトビールを楽しむLT会！#2"
					slide={[
						{
							link: "./self-hosting-slides",
							title: "スライド自己管理のすゝめ",
						},
					]}
				/>

				<Section
					date="2025/03/29"
					eventLink="https://mii-meetup.connpass.com/event/347603/"
					eventTitle="個人開発LT会"
					slide={[
						{
							link: "./solo-dev-considerations",
							title: "個人開発で気をつけるべきこと",
						},
					]}
				/>

				<Section
					date="2025/03/25"
					eventLink="https://lu.ma/l9539owb"
					eventTitle="Remix Tokyo Meetup 第4回 『Remix in Production』"
					slide={[
						{
							link: "./using-conform-in-remix",
							title: "Conform in Remix Personal Observations",
						},
						{
							link: "./ja-using-conform-in-remix",
							title: "RemixでConformを使って感じたこと",
						},
					]}
				/>

				<Section
					date="2025/03/14"
					eventLink="https://cfm-cts.connpass.com/event/344633/"
					eventTitle="Cloudflare Meet-up Tokyo Vol.7"
					slide={[
						{
							link: "./cloudflare-fullstack-application",
							title: "CloudflareだけでWebアプリを作成してみた",
						},
					]}
				/>

				<Section
					date="2024/11/19"
					eventLink="https://lu.ma/wv9xzam7"
					eventTitle="Remix Tokyo × Cloudflare Meetup"
					slide={[
						{
							link: "./remix-on-hono",
							title: "hono-remix-adapter 使ってみた",
						},
					]}
				/>
			</main>

			<footer>
				<div class="footer-links">
					<a
						href="https://twitter.com/const_myself"
						target="_blank"
						rel="noopener noreferrer"
					>
						Twitter
					</a>
					<a
						href="https://github.com/ogadra/slide"
						target="_blank"
						rel="noopener noreferrer"
					>
						このページのGitHub
					</a>
				</div>
				<p>&copy; {year} ogadra</p>
			</footer>
		</body>
	);
};
