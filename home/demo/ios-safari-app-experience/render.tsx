import { env } from 'cloudflare:workers'
import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <script
            type="module"
            src={env.ENVIRONMENT === 'production'
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="iOS Safari Demo" />
        <meta name="theme-color" content="#007AFF" />
        <title>iOS Safari App Experience Demo</title>
        <style>
            {`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                
                header {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(20px);
                    color: white;
                    padding: 12px 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    position: relative;
                }
                
                header h1 {
                    font-size: 17px;
                    font-weight: 600;
                    margin: 0;
                }
                
                main {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    overflow: hidden;
                }
                
                section {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px 16px 100px 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                article {
                    max-width: 80%;
                    padding: 12px 16px;
                    border-radius: 24px;
                    background: #007AFF;
                    color: white;
                    align-self: flex-end;
                    border-bottom-right-radius: 4px;
                }
                
                article p {
                    margin: 0;
                    font-size: 16px;
                    line-height: 1.4;
                    word-wrap: break-word;
                }
                
                footer {
                    font-size: 20px;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(255, 255, 255, 0.3);
                    padding: 16px 20px;
                    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1);
                }
                
                footer form {
                    display: flex;
                    align-items: flex-end;
                    gap: 12px;
                    width: 100%;
                }
                
                footer div {
                    flex: 1;
                    position: relative;
                }
                
                footer input {
                    width: 100%;
                    height: 48px;
                    background: rgba(255, 255, 255, 0.9);
                    border: 2px solid transparent;
                    border-radius: 12px;
                    padding: 0 20px;
                    font-family: inherit;
                    color: #2c3e50;
                    transition: all 0.3s ease;
                    outline: none;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    font-size: inherit;
                    box-sizing: border-box;
                    -webkit-appearance: none;
                    appearance: none;
                }
                
                footer input:focus {
                    background: white;
                    border-color: #667eea;
                }
                
                footer input::placeholder {
                    color: #95a5a6;
                }
                
                footer button {
                    height: 48px;
                    padding: 0 20px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    -webkit-appearance: none;
                    appearance: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
                    font-size: inherit;
                }
                
                footer button:hover {
                    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
                    border-color: rgba(255, 255, 255, 0.5);
                }
                
                footer button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }
                
                footer button span {
                    font-weight: bold;
                }
            `}
        </style>
    </>
);
