// @ts-check
import { defineConfig } from 'astro/config';

// The site reads `product-context` at build time. It never copies it.
// See ADR-1 — content is generated from source, never hand-maintained.
export default defineConfig({
  srcDir: './src',
  outDir: './dist',
  vite: {
    server: {
      fs: {
        // Allow the dev server to read the sibling content repo.
        allow: ['..'],
      },
    },
  },
});
