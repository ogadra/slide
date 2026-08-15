/** @jsxImportSource hono/jsx */

import type { Context } from "hono";
import { manifest } from "../generated/manifest";
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
		<link rel="stylesheet" cross-origin href="./assets/style.css" />
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
				{manifest.map((group) => (
					<Section
						date={group.date}
						eventLink={group.eventLink}
						eventTitle={group.event}
						slide={group.slides.map((slide) => ({
							link: `./${slide.name}`,
							title: slide.title,
						}))}
					/>
				))}
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
