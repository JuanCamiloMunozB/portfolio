import { defineConfig } from 'astro/config';

// Project site: https://juancamilomunozb.github.io/portfolio/
export default defineConfig({
  site: 'https://juancamilomunozb.github.io',
  base: '/portfolio',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
