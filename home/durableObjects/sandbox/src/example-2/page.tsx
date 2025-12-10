import type { Context } from "hono";
import { css, Style } from "hono/css";

export const Page = (c: Context) => {
  const count = c.get("count");
  return c.html(
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hono Sandbox</title>
        <Style />
      </head>
      <body class={bodyClass}>
        <div class={containerClass}>
          <h1 class={h1Class}>🔥 Hello Hono!</h1>
          <p class={pClass}>Cloudflare Workers Sandbox</p>
          <span class={badgeClass}>Running on port 7070</span>
          <div class={counterClass}>{count}</div>
          <div class={counterLabelClass}>visits</div>
        </div>
      </body>
    </html>
  );
};

const bodyClass = css`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const containerClass = css`
  background: white;
  padding: 2rem 2rem;
  border-radius: 10px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

const h1Class = css`
  color: #1a202c;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const pClass = css`
  color: #718096;
  font-size: 1rem;
`;

const badgeClass = css`
  display: inline-block;
  background: #333;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const counterClass = css`
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: bold;
  color: #4a5568;
`;

const counterLabelClass = css`
  font-size: 0.875rem;
  color: #a0aec0;
`;
