// Run with: npm test
// Unit pages live at /unit-<code>/. The old /cmi-<code>-assignment-help/ URLs only exist as permanent redirects in vercel.json,
// and nothing on the site links to them (a link through a redirect wastes a hop and splits the signal).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const srcDir = fileURLToPath(new URL('../', import.meta.url));
const pagesDir = join(srcDir, 'pages');
const vercel = JSON.parse(readFileSync(fileURLToPath(new URL('../../vercel.json', import.meta.url)), 'utf8'));
const SITE = 'https://www.cmiassignmenthelp.uk.com';

const unitFolders = readdirSync(pagesDir).filter((name) => /^unit-\d{3,4}$/.test(name));
const codes = unitFolders.map((name) => name.slice('unit-'.length));

const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});

test('all 89 unit pages are in /unit-<code>/ folders and none is left under the old name', () => {
  assert.equal(codes.length, 89);
  assert.deepEqual(readdirSync(pagesDir).filter((name) => /^cmi-\d{3,4}-assignment-help$/.test(name)), []);
});

test('every unit page canonical is its own /unit-<code>/ URL', () => {
  const wrong = [];
  for (const code of codes) {
    const text = readFileSync(join(pagesDir, `unit-${code}`, 'index.md'), 'utf8');
    const canonical = (text.match(/^canonical:\s*"([^"]+)"/m) || [])[1];
    if (canonical !== `${SITE}/unit-${code}/`) wrong.push(`${code}: ${canonical}`);
  }
  assert.deepEqual(wrong, []);
});

test('every old unit URL, with and without the trailing slash, redirects permanently to the new one', () => {
  const missing = [];
  for (const code of codes) {
    for (const source of [`/cmi-${code}-assignment-help/`, `/cmi-${code}-assignment-help`]) {
      const rule = vercel.redirects.find((r) => r.source === source);
      if (!rule || rule.destination !== `/unit-${code}/` || rule.permanent !== true) missing.push(source);
    }
  }
  assert.deepEqual(missing, []);
});

test('no redirect points at an old unit URL, so there are no chains', () => {
  assert.deepEqual(vercel.redirects.filter((r) => /^\/cmi-\d{3,4}-assignment-help\/?$/.test(r.destination)), []);
});

test('no source file links to an old unit URL (image file names are not URLs and are allowed)', () => {
  const found = [];
  for (const file of walk(srcDir).filter((path) => /\.(astro|md|js)$/.test(path))) {
    readFileSync(file, 'utf8').split(/\r?\n/).forEach((line, index) => {
      const stripped = line.replace(/\/images\/[\w./-]*cmi-\d{3,4}-assignment-help\.\w+/g, '');
      if (/cmi-\d{3,4}-assignment-help/.test(stripped)) found.push(`${file.slice(srcDir.length)}:${index + 1}`);
    });
  }
  assert.deepEqual(found, []);
});
