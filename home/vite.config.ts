import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  build: {
    outDir: '../../dist',
  },
  plugins: [
    UnoCSS(),
  ],
})
