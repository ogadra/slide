import { resolve } from 'path'
import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  extract: {
    include: [
      resolve(__dirname, '**/*.{vue,ts}'),
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: '"Noto Sans JP", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
      }
    },
  },
})
