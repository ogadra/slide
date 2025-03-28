import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import devServer from '@hono/vite-dev-server'

export default defineConfig({
  build: {
    outDir: '../dist',
  },
  plugins: [
    UnoCSS(),
    devServer({
      entry: 'index.ts', // The file path of your application.
    }),
  ],
})
