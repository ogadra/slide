import { resolve } from 'path'
import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  extract: {
    include: [
      resolve(__dirname, '**/*.{vue,ts}'),
    ],
  },
  shortcuts: {
    'bg-paper': 'bg-[#ffffff] text-[#111111]',
    'bg-hazard': 'bg-[#ffd400] text-[#111111]',
    'bg-barBottom': 'bg-[#111111] text-[#ffffff]',
    'bg-barBottomLeft': 'bg-[#ffd400] text-[#111111]',
  },
  theme: {
    extend: {
      fontFamily: {
        sans: '"Noto Sans JP", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        mono: '"Noto Sans JP", ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
      }
    },
  },
})
