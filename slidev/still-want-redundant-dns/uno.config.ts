import { resolve } from 'path'
import { defineConfig } from 'vite-plugin-windicss'

// extend the base config
export default defineConfig({
  extract: {
    include: [
      resolve(__dirname, '**/*.{vue,ts}'),
    ],
  },
  shortcuts: {
    // custom the default background
    'bg-main': 'bg-[#FFFAED] text-[#222222]',
    'border-image': 'border border-[#222222] border-opacity-10 shadow-md shadow-[#222222]',
    'bg-barBottom': 'bg-[#222222] text-[#FFFFFF]',
    'bg-barBottomLeft': 'bg-[#EA5520] text-[#FFFFFF]',
  },
  theme: {
    extend: {
      // fonts can be replaced here, remember to update the web font links in `index.html`
      fontFamily: {
        sans: '"Zen Maru Gothic", "Hiragino Sans", ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
        mono: '"Fira Code", monospace',
      }
    },
  },
})
