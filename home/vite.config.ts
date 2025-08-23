import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from 'vite';
import adapter from '@hono/vite-dev-server/cloudflare'
import serverAdapter from "hono-react-router-adapter/vite";
import UnoCSS from 'unocss/vite';


export default defineConfig({
  build: {
    outDir: '../dist',
  },
  plugins: [
    UnoCSS(),
    reactRouter(),
    serverAdapter({
      adapter,
      entry: 'server/index.ts',
    }),
  ],
})
