// Run with: npm test
// Uses the real pilot pages, so the tests also catch a unit page that drifts from the format the parser reads.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseUnitMarkdown, unitCodeFromPath, UnitDataError } from './unit-tools-data.js';

const page = (code) =>
  readFileSync(new URL(`../pages/unit-${code}/index.md`, import.meta.url), 'utf8');
const parse = (code) => parseUnitMarkdown(page(code), { code });
const criteriaCount = (unit) => unit.outcomes.reduce((sum, outcome) => sum + outcome.criteria.length, 0);

test('Level 3 unit 307: 4 outcomes, 10 criteria, word-count range, verb meanings', () => {
  const unit = parse('307');
  assert.equal(unit.level, 3);
  assert.equal(unit.outcomes.length, 4);
  assert.equal(criteriaCount(unit), 10);
  assert.deepEqual(unit.stated, { outcomes: 4, criteria: 10 });
  assert.deepEqual(unit.wordCount, { min: 2000, max: 2500 });
  assert.equal(unit.outcomes[0].criteria[0].id, '1.1');
  assert.ok(unit.verbMeanings['1.1']);
});

test('Level 5 unit 501: 3 outcomes, 12 criteria, no word-count guideline on the page', () => {
  const unit = parse('501');
  assert.equal(unit.level, 5);
  assert.equal(unit.outcomes.length, 3);
  assert.equal(criteriaCount(unit), 12);
  assert.equal(unit.wordCount, null);
  assert.ok(unit.gaps.includes('No word-count guideline on the page.'));
});

test('Level 6 unit 611: a two-word command verb is read as one verb', () => {
  const unit = parse('611');
  assert.equal(unit.level, 6);
  assert.equal(criteriaCount(unit), unit.stated.criteria);
  const verbs = unit.outcomes.flatMap((outcome) => outcome.criteria).map((criterion) => criterion.verb);
  assert.ok(verbs.some((verb) => verb.includes(' ')), 'expected a verb such as "Critically appraise"');
});

test('Level 4 unit 4001 and Level 7 unit 711 parse with a single word-count figure', () => {
  const level4 = parse('4001');
  assert.equal(level4.level, 4);
  assert.deepEqual(level4.wordCount, { min: 3000, max: 3000 });
  const level7 = parse('711');
  assert.equal(level7.level, 7);
  assert.deepEqual(level7.wordCount, { min: 4000, max: 4000 });
});

test('every unit page on the site parses (so rolling out to all units needs no parser change)', () => {
  const codes = readFileSync(new URL('../data/units.json', import.meta.url), 'utf8').match(/"(\d{3,4})"/g).map((s) => s.replaceAll('"', ''));
  assert.ok(codes.length >= 86);
  for (const code of codes) {
    const unit = parse(code);
    assert.equal(criteriaCount(unit), unit.stated.criteria, `unit ${code}`);
  }
});

test('fails the build when the parsed criteria count differs from the count the page states', () => {
  const broken = page('307').replace(/It has 4 learning outcomes and 10 assessment criteria/, 'It has 4 learning outcomes and 11 assessment criteria');
  assert.throws(() => parseUnitMarkdown(broken, { code: '307' }), (error) => {
    assert.ok(error instanceof UnitDataError);
    assert.match(error.message, /unit 307/);
    assert.match(error.message, /states 11 criteria but 10 were parsed/);
    return true;
  });
});

test('fails the build when the stated number of learning outcomes differs', () => {
  const broken = page('307').replace(/It has 4 learning outcomes/, 'It has 5 learning outcomes');
  assert.throws(() => parseUnitMarkdown(broken, { code: '307' }), /states 5 learning outcomes but 4 were parsed/);
});

test('fails the build when a learning outcome has no criteria', () => {
  const broken = page('307').replace(/^- 2\.\d .*\r?\n/gm, '');
  assert.throws(() => parseUnitMarkdown(broken, { code: '307' }), /learning outcome 2 has no criteria/);
});

test('fails rather than skipping a criterion line it cannot read', () => {
  const broken = page('307').replace('- 1.1 **', '- 1.1 *');
  assert.throws(() => parseUnitMarkdown(broken, { code: '307' }), /could not read this line as a criterion/);
});

test('fails when the page states no counts to check against', () => {
  const broken = page('307').replace(/It has \d+ learning outcomes and \d+ assessment criteria/, '');
  assert.throws(() => parseUnitMarkdown(broken, { code: '307' }), /does not state its number/);
});

test('a missing verb meaning leaves that criterion without one and records a gap', () => {
  const withoutVerbs = page('307').replace(/^## What the command verbs ask for in this unit[\s\S]*?(?=^## )/m, '');
  const unit = parseUnitMarkdown(withoutVerbs, { code: '307' });
  assert.deepEqual(unit.verbMeanings, {});
  assert.ok(unit.gaps.some((gap) => gap.startsWith('No verb meaning on the page for criterion 1.1')));
});

test('unitCodeFromPath recognises unit pages only', () => {
  assert.equal(unitCodeFromPath('/unit-502/'), '502');
  assert.equal(unitCodeFromPath('/unit-4001'), '4001');
  assert.equal(unitCodeFromPath('/cmi-level-5-assignment-help/'), null);
  assert.equal(unitCodeFromPath('/guides/cmi-assignment-structure/'), null);
});
