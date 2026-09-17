// @ts-check
import { defineConfig } from 'astro/config';

// The site reads `product-context` at build time. It never copies it.
// See ADR-1 — content is generated from source, never hand-maintained.
export default defineConfig({
  srcDir: './src',
  outDir: './dist',
  build: {
    // Inline every stylesheet into the page that uses it.
    //
    // The published build is opened from a folder, and in some viewers — Box's
    // web preview among them — a page is sandboxed and cannot load sibling
    // files. An external stylesheet then silently fails and the page renders
    // unstyled. Inlining removes the dependency; each page carries its own CSS.
    inlineStylesheets: 'always',
  },
  vite: {
    server: {
      fs: {
        // Allow the dev server to read the sibling content repo.
        allow: ['..'],
      },
    },
  },
});
