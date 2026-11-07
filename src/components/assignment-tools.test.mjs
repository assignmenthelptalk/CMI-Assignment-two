// Run with: npm test
// Source-level checks for the Assignment Tools page, its menu item and the renamed tool labels.
// See docs/assignment-tools-notes.md.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { levels, guides, toolsLink } from '../data/navMenu.js';
import { reviewedLine } from '../data/specVersions.js';

const read = (relative) => readFileSync(new URL(relative, import.meta.url), 'utf8').replace(/\r\n/g, '\n');
const page = read('../pages/assignment-tools/index.astro');
const layout = read('../layouts/Layout.astro');

test('the page has the agreed title, meta description and self-referencing canonical', () => {
  assert.match(page, /title="Free CMI Assignment Tools - Pass Checklist, Word Planner, Outline \| CMIAssignmentHelp\.uk\.com"/);
  assert.match(page, /description="Choose your CMI unit to open a free pass checklist, word planner and structure outline\. Built from the unit criteria\. No sign-up\."/);
  assert.match(page, /canonical=\{`\$\{siteUrl\}\/assignment-tools\/`\}/);
  assert.match(page, /const siteUrl = 'https:\/\/www\.cmiassignmenthelp\.uk\.com';/);
});

test('the page carries the agreed copy and nothing else on offer', () => {
  assert.match(page, /<h1>Free CMI Assignment Tools<\/h1>/);
  assert.ok(page.includes('Choose your CMI unit to open its free pass checklist, word planner and outline.'));
  assert.ok(page.includes('What you get on every unit page'));
  assert.ok(page.includes('Your ticks are saved in your own browser and are not sent to us.'));
  assert.ok(page.includes('Browse by level'));
  assert.ok(page.includes('Not sure what a command verb means? See the'));
  for (const text of [
    'every assessment criterion in plain English',
    'Split your word count across the learning outcomes and see your allowed range.',
    "A heading skeleton built from your unit's criteria, ready to copy or download.",
  ]) {
    assert.ok(page.toLowerCase().includes(text.toLowerCase()), text);
  }
  assert.doesNotMatch(page, /start plan|verb panel/i, 'the start plan and verb panel are not on every unit page');
  assert.doesNotMatch(page, /wa\.me|whatsapp|writing-service|tutoring|coursework-help|guarantee|submission-ready/i);
});

test('the only links on the page are the finder, the level hubs and the command verbs guide', () => {
  const hrefs = [...page.matchAll(/href=\{(`[^`]*`|[^}]+)\}/g)].map((match) => match[1]);
  assert.deepEqual(hrefs, ['`${siteUrl}/`', 'level.slug', 'commandVerbsGuide.slug']);
  assert.match(page, /<UnitFinder \/>/);
  assert.equal(levels.length, 5);
  assert.ok(levels.every((level) => /\/cmi-level-\d-assignment-help\/$/.test(level.slug)));
  assert.ok(guides.some((guide) => guide.slug.endsWith('/guides/cmi-command-verbs-explained/')));
});

test('the "Last reviewed" lines come from the same function as the unit pages, one per level, with nothing typed on the page', () => {
  assert.match(page, /import \{ reviewedLine \} from '\.\.\/\.\.\/data\/specVersions\.js';/);
  assert.match(page, /levels\.map\(\(level\) => reviewedLine\(level\.num\)\)/);
  assert.doesNotMatch(page, /October 2026|specification v\d/);
  assert.deepEqual(
    levels.map((level) => reviewedLine(level.num)),
    [3, 4, 5, 6, 7].map((n) => `Last reviewed October 2026 against the CMI Level ${n} specification ${{ 3: 'v16', 4: 'v12', 5: 'v26', 6: 'v09', 7: 'v10' }[n]}.`)
  );
});

test('the menu item sits after Services and before the WhatsApp button, as a plain link', () => {
  assert.equal(toolsLink.title, 'Assignment Tools');
  assert.equal(toolsLink.slug, 'https://www.cmiassignmenthelp.uk.com/assignment-tools/');
  const services = layout.indexOf('Services <span');
  const item = layout.indexOf('href={toolsLink.slug}');
  const whatsapp = layout.indexOf('class="btn btn-whatsapp"');
  assert.ok(services > 0 && item > services && whatsapp > item);
  assert.match(layout, /<li class="nav-item">\s*<a href=\{toolsLink\.slug\}/);
  assert.match(layout, /\.main-nav \.nav-item:not\(\.has-dropdown\) > a/, 'the mobile menu copies plain links');
});

test('the tool labels use the new names and the old names are gone from the components', () => {
  const files = ['StudyTools.astro', 'StartPlan.astro', 'startplan.js', 'logic.js', 'planner.js', 'checklist.js', 'study-tools-cleanup.css'];
  const text = files.map((file) => read(`./unit-tools/${file}`)).join('\n');
  for (const wanted of [
    'Assignment tools for Unit {unit.code}',
    "label: 'Pass checklist'",
    "label: 'Word planner'",
    "label: 'Structure outline'",
    'Start in 15 minutes',
    '>What the verbs mean</h3>',
    'from the word planner',
  ]) {
    assert.ok(text.includes(wanted), wanted);
  }
  for (const old of ['Study tools for', 'Criteria checklist', 'Word-count planner', 'word-count planner', '15-minute start plan', 'What the verbs mean in this unit', 'study outline']) {
    assert.ok(!text.includes(old), `still present: ${old}`);
  }
});

test('the ids and anchors that were already in use still exist', () => {
  assert.ok(read('./unit-tools/StudyTools.astro').includes('id="study-tools"'));
  assert.ok(read('./unit-tools/VerbPanel.astro').includes('id="command-verbs"'));
});

test('each of the five level hubs links once to the Assignment Tools page, and no other content page source does', () => {
  const link = 'href="https://www.cmiassignmenthelp.uk.com/assignment-tools/"';
  for (const level of [3, 4, 5, 6, 7]) {
    const hub = read(`../pages/cmi-level-${level}-assignment-help/index.astro`);
    assert.equal(hub.split(link).length - 1, 1, `Level ${level} hub`);
    assert.ok(hub.includes('Each unit page has a free pass checklist, word planner and structure outline.'));
    assert.match(hub, /\.hub-tools-link a \{ text-decoration: underline;/, 'in-text link is underlined');
  }
  for (const other of ['../pages/index.astro', '../pages/unit-701/index.md', '../pages/cmi-level-3-units/index.astro', '../layouts/UnitPageTools.astro']) {
    assert.ok(!read(other).includes('/assignment-tools/'), other);
  }
});
