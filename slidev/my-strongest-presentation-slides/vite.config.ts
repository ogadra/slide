import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/bunshin': {
        target: 'http://localhost:80',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bunshin/, '/api'),
      },
    },
  },
})
