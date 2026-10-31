// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The four legal pages stay out of the sitemap while their [bracketed] placeholders are unresolved.
// When the owner has filled them in: set this to true and remove `noindex: true` from each page's frontmatter.
const LEGAL_PAGES_READY = false;
const LEGAL_PATHS = ['/privacy-policy/', '/terms-and-conditions/', '/academic-integrity/', '/refund-policy/'];

// https://astro.build/config
export default defineConfig({
  site: 'https://www.cmiassignmenthelp.uk.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => LEGAL_PAGES_READY || !LEGAL_PATHS.some((path) => page.endsWith(path)),
    }),
  ],
});
