import { defineConfig } from 'unocss'

export default defineConfig({
    content: {
      pipeline: {
        include: [
          /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
          '*.{js,ts}',
          '**/*.{js,ts}',
        ],
      },
    },
  })
