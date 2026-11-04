// Run with: npm test
// Keeps the data behind the cleaned-up unit page in step with the files it is copied from:
// docs/spec-versions.md (the "Last reviewed" line) and the command verbs guide (the depth groups).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { reviewedLine, specReviewed, specVersions } from './specVersions.js';
import { depthGroupFor, verbGroups } from './verbDepth.js';
import { parseUnitMarkdown } from '../lib/unit-tools-data.js';
import { verbLegend } from '../lib/pilot-page.js';
import { cleanupPilotUnits } from '../components/unit-tools/config.js';

const read = (relative) => readFileSync(new URL(relative, import.meta.url), 'utf8').replace(/\r\n/g, '\n');

test('spec versions match docs/spec-versions.md', () => {
  const doc = read('../../docs/spec-versions.md');
  for (const [level, version] of Object.entries(specVersions)) {
    const row = doc.match(new RegExp(`^\\|\\s*${level}\\s*\\|[^|]*\\|\\s*(v\\d+)\\s*\\|`, 'm'));
    assert.ok(row, `no row for Level ${level} in docs/spec-versions.md`);
    assert.equal(row[1], version, `Level ${level}`);
  }
  const verified = doc.match(/Last verified: \*\*(\d{1,2}) (\w+ \d{4})\*\*/);
  assert.ok(verified, 'the "Last verified" line is missing');
  assert.equal(verified[2], specReviewed);
});

test('the "Last reviewed" line uses only the values on record and is left out for an unknown level', () => {
  assert.equal(reviewedLine(4), 'Last reviewed October 2026 against the CMI Level 4 specification v12.');
  assert.equal(reviewedLine(7), 'Last reviewed October 2026 against the CMI Level 7 specification v10.');
  assert.equal(reviewedLine(null), null);
  assert.equal(reviewedLine(8), null);
});

test('depth groups match the command verbs guide', () => {
  const guide = read('../pages/guides/cmi-command-verbs-explained/index.astro');
  const cards = [...guide.matchAll(/<h3 class="tier-name">([^<]+)<\/h3>[\s\S]*?<p class="tier-verbs">([^<]+)<\/p>/g)].map((match) => ({
    name: match[1].trim(),
    verbs: match[2].split('&middot;').map((verb) => verb.trim()),
  }));
  assert.deepEqual(cards, verbGroups);
});

test('depth group lookup is case-insensitive and gives null for verbs the guide does not group', () => {
  assert.equal(depthGroupFor('Describe'), 'Show Knowledge');
  assert.equal(depthGroupFor('critically appraise'), 'Critique and Build');
  assert.equal(depthGroupFor('Evaluate'), 'Analyse and Judge');
  for (const verb of ['Compare', 'Devise', 'Provide', 'Investigate', 'Formulate']) assert.equal(depthGroupFor(verb), null, verb);
});

test('every verb the pilot units use has a meaning on its unit page; the ones without a depth group are the five known gaps', () => {
  const noDepth = new Set();
  for (const code of cleanupPilotUnits) {
    const unit = parseUnitMarkdown(read(`../pages/cmi-${code}-assignment-help/index.md`), { code });
    const { entries, gaps } = verbLegend(unit);
    assert.deepEqual(gaps, [], `unit ${code}`);
    for (const entry of entries) {
      assert.ok(entry.meaning, `${code} ${entry.verb}`);
      if (!depthGroupFor(entry.verb)) noDepth.add(entry.verb);
    }
  }
  assert.deepEqual([...noDepth].sort(), ['Compare', 'Devise', 'Formulate', 'Investigate', 'Provide']);
});
