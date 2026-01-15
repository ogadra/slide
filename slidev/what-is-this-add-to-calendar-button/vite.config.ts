import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '/fonts': resolve(__dirname, '../../home/fonts'),
    },
  },
})
