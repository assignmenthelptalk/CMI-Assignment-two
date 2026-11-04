// Run with: npm test
// The start plan's pure functions: saved state, the plan model, the .txt text, and the rules that keep the script
// safe to write into the page (no imports, no closing script tag, no network calls, no analytics).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  MAX_NOTE_LENGTH,
  NOT_FILLED_IN,
  NO_OUTLINE,
  NO_WORD_SPLIT,
  STEP_IDS,
  buildPlanModel,
  parseSaved,
  planToText,
  serialiseSaved,
  storageKey,
} from './startplan.js';

const source = readFileSync(new URL('./startplan.js', import.meta.url), 'utf8');

const steps = (doneIds) =>
  [
    ['criteria', 'Read the criteria'],
    ['verbs', 'Mark the verbs'],
    ['example', 'Choose your workplace example'],
    ['budget', 'Set your word budget'],
    ['outline', 'Draft your outline'],
  ].map(([id, label]) => ({ id, label, done: doneIds.includes(id) }));
const notes = (answers = ['', '', '']) =>
  ['Which organisation or team?', 'What recent situation could you use?', 'What happened?'].map((question, i) => ({ question, answer: answers[i] }));
const verbs = [
  { verb: 'Describe', criteria: '1.1, 1.3', meaning: 'give a clear account of the subject, with an example from work.', depth: 'Show Knowledge' },
  { verb: 'Devise', criteria: '3.1', meaning: 'work out a method or plan that would suit the situation.', depth: '' },
];

test('the storage key is per unit', () => {
  assert.equal(storageKey('4008'), 'cmi-unit-tools:startplan:4008');
  assert.notEqual(storageKey('4008'), storageKey('307'));
});

test('saved state: ticks and notes round-trip, and nothing is saved when there is nothing to save', () => {
  const state = { steps: ['verbs', 'criteria'], notes: { organisation: 'A team', situation: '', happened: 'Something' } };
  const restored = parseSaved(serialiseSaved(state));
  assert.deepEqual(restored.steps, ['criteria', 'verbs']); // kept in step order
  assert.equal(restored.notes.organisation, 'A team');
  assert.equal(restored.notes.happened, 'Something');
  assert.equal(serialiseSaved({ steps: [], notes: { organisation: '  ', situation: '', happened: '' } }), null);
});

test('saved state: bad, odd or oversized storage is ignored instead of breaking the page', () => {
  const empty = { steps: [], notes: { organisation: '', situation: '', happened: '' } };
  for (const raw of [null, '', 'not json', '42', '"text"', '[]']) assert.deepEqual(parseSaved(raw), empty, String(raw));
  const odd = parseSaved(JSON.stringify({ steps: ['criteria', 'made-up', 7], notes: { organisation: 5, situation: 'x'.repeat(MAX_NOTE_LENGTH + 50) } }));
  assert.deepEqual(odd.steps, ['criteria']);
  assert.equal(odd.notes.organisation, '');
  assert.equal(odd.notes.situation.length, MAX_NOTE_LENGTH);
});

test('the plan has the five steps the brief names, in order', () => {
  assert.deepEqual(STEP_IDS, ['criteria', 'verbs', 'example', 'budget', 'outline']);
});

test('plan text: steps completed, verbs, the student\'s own notes, the word split and the outline', () => {
  const model = buildPlanModel({
    code: '4008',
    level: 4,
    steps: steps(['criteria', 'budget']),
    verbs,
    notes: notes(['Our operations team', '', 'I ran a feedback session\nand wrote it up']),
    words: { rows: [{ section: 'Introduction', criteria: '–', words: '300' }, { section: 'Total', criteria: '10', words: '3,000' }], range: 'Allowed range (plus or minus 10%): 2,700 to 3,300 words.' },
    outline: '1. Introduction\n   - Ask yourself: what is this assignment about?',
  });
  const text = planToText(model);
  assert.match(text, /^My start plan: CMI Unit 4008 \(Level 4\)/);
  assert.match(text, /Steps \(2 of 5 done\)/);
  assert.match(text, /\[x\] Step 1: Read the criteria/);
  assert.match(text, /\[ \] Step 2: Mark the verbs/);
  assert.match(text, /\[x\] Step 4: Set your word budget/);
  assert.match(text, /- Describe \(criteria 1\.1, 1\.3\): give a clear account.* Depth group: Show Knowledge\./);
  assert.match(text, /- Devise \(criteria 3\.1\): work out a method/);
  assert.ok(!/Devise[^\n]*Depth group/.test(text), 'no depth line for a verb the guide does not group');
  assert.match(text, /Which organisation or team\?\n  Our operations team/);
  assert.match(text, /What recent situation could you use\?\n  \(not filled in\)/);
  assert.match(text, /What happened\?\n  I ran a feedback session\n  and wrote it up/);
  assert.match(text, /- Introduction: 300 words\n/);
  assert.match(text, /- Total: 3,000 words \(10 criteria\)/);
  assert.match(text, /Allowed range \(plus or minus 10%\)/);
  assert.match(text, /Outline \(from the structure outline\)\n1\. Introduction/);
});

test('plan text: empty notes, no planner figures and no outline are said plainly, not invented', () => {
  const text = planToText(buildPlanModel({ code: '501', level: 5, steps: steps([]), verbs: [], notes: notes(), words: null, outline: '' }));
  assert.match(text, /Steps \(0 of 5 done\)/);
  assert.equal(text.split(NOT_FILLED_IN).length - 1, 3);
  assert.ok(text.includes(NO_WORD_SPLIT));
  assert.ok(text.includes(NO_OUTLINE));
  const emptyTable = buildPlanModel({ code: '501', level: null, steps: steps([]), verbs: [], notes: notes(), words: { rows: [], range: '' }, outline: 'x' });
  assert.equal(emptyTable.words, null);
  assert.match(emptyTable.title, /^My start plan: CMI Unit 501$/);
});

test('the plan only echoes what the student typed: the notes section holds their words and nothing else', () => {
  const typed = ['  My own words  ', '', ''];
  const text = planToText(buildPlanModel({ code: '307', level: 3, steps: steps([]), verbs: [], notes: notes(typed), words: null, outline: '' }));
  const section = text.split('Your workplace example (your own notes)\n')[1].split('\n\nWord split')[0];
  assert.equal(section, ['Which organisation or team?', '  My own words', 'What recent situation could you use?', '  (not filled in)', 'What happened?', '  (not filled in)'].join('\n'));
});

test('the script is safe to write into a page: no imports, no closing script tag, no network calls, no tracking', () => {
  assert.ok(!/^\s*import\s/m.test(source), 'no import statements');
  assert.ok(!/<\/script/i.test(source), 'no closing script tag');
  for (const forbidden of [/\bfetch\s*\(/, /XMLHttpRequest/, /sendBeacon/, /WebSocket/, /\bgtag\b/, /\banalytics\b/i, /new Image\(/]) {
    assert.ok(!forbidden.test(source), `found ${forbidden}`);
  }
});
