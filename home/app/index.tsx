/** @jsx jsx */
/** @jsxImportSource hono/jsx */

import { type Context } from 'hono'

export const Index = (c: Context) => {
    return c.html(
        <html>
            <p>Hono!</p>
        </html>
    )
}
