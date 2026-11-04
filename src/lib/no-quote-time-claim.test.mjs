// Run with: npm test
// The site makes no claim about how fast a quote arrives. Fails if "2 hours" or "two hours" comes back on any page.
// (Other times, such as "48 to 72 hours" or "12 hours of delay" in the refund policy, are not covered by this check.)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const pagesDir = fileURLToPath(new URL('../pages/', import.meta.url));
const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});

test('no page source promises a quote, plan or reply in 2 hours', () => {
  const found = [];
  for (const file of walk(pagesDir).filter((path) => /\.(astro|md)$/.test(path))) {
    const text = readFileSync(file, 'utf8');
    if (/\b(?:2|two)[- ]hours?\b/i.test(text)) found.push(file.slice(pagesDir.length));
  }
  assert.deepEqual(found, []);
});
