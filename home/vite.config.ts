import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig(({ mode, command }) => {
  if (command === 'build') {
    if (mode === 'client') {
      return {
        plugins: [cloudflare()],
        esbuild: { jsxImportSource: 'hono/jsx/dom' },
        build: {
          copyPublicDir: true,
          rollupOptions: {
            input: ['./demo/ios-safari-app-experience/app.tsx'],
            output: { entryFileNames: 'demo/ios-safari-app-experience/app.js' }
          },
          outDir: 'dist'
        }
      }
    }
    if (mode === 'server') {
      return {
        plugins: [cloudflare()],
        build: {
          ssr: 'server.ts',
          outDir: '.cloudflare/worker'
        },
        ssr: { target: 'webworker' },
      }
    }
    return {}
  } else {
    return {
      plugins: [cloudflare()],
      environments: {
        hono_jsx_spa: {
          define: {
            ENVIRONMENT: JSON.stringify("dev"),
          },
        },
      },
      server: {
        host: '0.0.0.0',
      },
    };
  };
})
