import { Hono } from "hono";
import { html } from "hono/html";

const app = new Hono();

app.get("/", (c) => {
	return c.html(html`
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hono Sandbox</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container {
            background: white;
            padding: 2rem 2rem;
            border-radius: 10px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            text-align: center;
          }
          h1 {
            color: #1a202c;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          }
          p {
            color: #718096;
            font-size: 1rem;
          }
          .badge {
            display: inline-block;
            background: #333;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-size: 0.875rem;
            margin-top: 1rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🔥 Hello Hono!</h1>
          <p>Cloudflare Workers Sandbox</p>
          <span class="badge">Running on port 7070</span>
        </div>
      </body>
    </html>
  `);
});
export default app;
