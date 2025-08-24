/** @jsx jsx */
/** @jsxImportSource hono/jsx */

import { type Context } from "hono";

export const App = (c: Context) => {
    return c.html(
        <html lang="ja">
            <Header />
            <Body />
        </html>
    )
}

const Header = () => (
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Demo Pages - ogadra's slides</title>
        <link rel="stylesheet" cross-origin href="../style.css" />
    </head>
)

const Body = () => {
    return (
        <body>
            <header>
                <h1>Demo Pages</h1>
            </header>
            <main>
                <div>
                    <h2>利用可能なデモ</h2>
                    <ul>
                        <li>
                            <a href="/demo/ios-safari-app-experience">iOS Safari App Experience</a>
                        </li>
                    </ul>
                </div>
                <p><a href="/">← トップページに戻る</a></p>
            </main>
        </body>
    )
}

