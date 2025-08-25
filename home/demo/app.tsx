/** @jsx jsx */
/** @jsxImportSource hono/jsx */

import type { Context } from "hono";
import { css, Style } from "hono/css";

export const App = (c: Context) => {
	return c.html(
		<html lang="ja" class={htmlClass}>
			<Header />
			<Body />
		</html>,
	);
};

const Header = () => (
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>デモ一覧 - ogadra's slides</title>
		<Style />
	</head>
);

const Body = () => {
	return (
		<body class={bodyClass}>
			<header class={headerClass}>
				<h1 class={h1Class}>デモ一覧</h1>
			</header>
			<main class={mainClass}>
				<div class={contentClass}>
					<h2 class={h2Class}>利用可能なデモ</h2>
					<ul class={demoListClass}>
						<li class={demoItemClass}>
							<a href="/demo/ios-safari-app-experience" class={demoLinkClass}>
								Safariでもネイティブアプリの触り心地を実現したい！
							</a>
						</li>
					</ul>
				</div>
				<a href="/" class={backLinkClass}>
					← トップページに戻る
				</a>
			</main>
			<footer class={footerClass}>
				<div class={footerLinksClass}>
					<a
						href="https://twitter.com/const_myself"
						target="_blank"
						rel="noopener noreferrer"
						class={footerLinkClass}
					>
						Twitter
					</a>
					<a
						href="https://github.com/ogadra/slide"
						target="_blank"
						rel="noopener noreferrer"
						class={footerLinkClass}
					>
						このページのGitHub
					</a>
				</div>
				<p class={copyrightClass}>&copy; {new Date().getFullYear()} ogadra</p>
			</footer>
		</body>
	);
};

const htmlClass = css`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  font-weight: 400;
  font-size: 16px;
  color-scheme: light dark;
  color: #eee;
  background-color: #1a1a1a;
`;

const bodyClass = css`
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const headerClass = css`
  text-align: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #333;
`;

const h1Class = css`
  margin: 0;
  color: #eee;
  font-size: 2.5rem;
  font-weight: 600;
`;

const mainClass = css`
  flex: 1;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`;

const contentClass = css`
  margin-bottom: 2rem;
`;

const h2Class = css`
  color: #eee;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const demoListClass = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const demoItemClass = css`
  margin-bottom: 1rem;
  padding: 1.5rem;
  background-color: #252525;
  border-radius: 8px;
  border-left: 4px solid #64b5f6;
  transition: border-left-color 0.3s ease, background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    border-left-color: #81d4fa;
    background-color: #2a2a2a;
    transform: translateY(-2px);
  }
`;

const demoLinkClass = css`
  color: #64b5f6;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.3s ease;
  display: block;
  
  &:hover {
    color: #81d4fa;
  }
`;

const backLinkClass = css`
  color: #a5d6a7;
  text-decoration: none;
  font-weight: 500;
  margin-top: 2rem;
  display: inline-block;
  transition: color 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    color: #c8e6c9;
  }
`;

const footerClass = css`
  text-align: center;
  padding: 1rem 0;
  border-top: 1px solid #333;
  margin-top: auto;
`;

const footerLinksClass = css`
  margin-bottom: 0.5rem;
`;

const footerLinkClass = css`
  margin: 0 1rem;
  color: #64b5f6;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #81d4fa;
  }
`;

const copyrightClass = css`
  margin: 0;
  color: #ccc;
  font-size: 0.9rem;
`;
