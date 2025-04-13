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
    'bg-main': 'bg-[#1E1E1E] text-[#D4D4D4]',
    'border-image': 'border border-[#121212] border-opacity-10 shadow-md shadow-[#121212]',
    'bg-barBottom': 'bg-[#007ACC] text-[#FFFFFF]',
    'bg-barBottomLeft': 'bg-[#16825D] text-[#FFFFFF]',
  },
  theme: {
    extend: {
      fontFamily: {
        mono: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
      }
    },
  },
})
