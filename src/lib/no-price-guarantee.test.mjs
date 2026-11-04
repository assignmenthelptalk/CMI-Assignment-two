// Run with: npm test
// The site does not promise a fixed price, "no hidden fees", or that a quote will not change. A quote is offered on WhatsApp
// and its figure is explained, nothing more. Fails if one of those promises comes back on a page body.
// Not covered: title= / description= lines (not changed without an explicit request) and the legal pages.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const pagesDir = fileURLToPath(new URL('../pages/', import.meta.url));
const LEGAL_PAGES = ['terms-and-conditions', 'refund-policy', 'privacy-policy', 'academic-integrity', 'cookie-policy'];
const PROMISES = /(?<!no single )fixed[ -](?:whatsapp )?(?:quote|price)s?|hidden fees?|(?:quote|price) (?:will|does) not change|price is fixed|no surprise charges|no revision surcharges?/i;
const META_LINE = /^\s*(?:title|description)=|^\s*(?:title|description):/;

const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});

test('no page body promises a fixed quote, no hidden fees or an unchanging price', () => {
  const found = [];
  for (const file of walk(pagesDir).filter((path) => /\.(astro|md)$/.test(path))) {
    const relative = file.slice(pagesDir.length).replace(/\\/g, '/');
    if (LEGAL_PAGES.some((name) => relative.startsWith(`${name}/`))) continue;
    readFileSync(file, 'utf8').split(/\r?\n/).forEach((line, index) => {
      if (!META_LINE.test(line) && PROMISES.test(line)) found.push(`${relative}:${index + 1}: ${line.trim().slice(0, 100)}`);
    });
  }
  assert.deepEqual(found, []);
});
