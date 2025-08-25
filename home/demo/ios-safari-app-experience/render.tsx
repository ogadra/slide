import { env } from 'cloudflare:workers'
import { jsxRenderer } from 'hono/jsx-renderer'
import { css, Style } from 'hono/css'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ja" class={htmlClass}>
      <head>
        <script
            type="module"
            src={env.ENVIRONMENT !== 'dev'
                ? '/client/demo/ios-safari-app-experience/app.js'
                : './ios-safari-app-experience/app.tsx'
            }></script>
        <Header />
      </head>
      <body>{children}</body>
    </html>
  )
})

const Header = () => (
    <>
        <meta charset="UTF-8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="iOS Safari Demo" />
        <meta name="theme-color" content="#007AFF" />
        <title>iOS Safari App Experience Demo</title>
        <Style />
    </>
);

const htmlClass = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`
