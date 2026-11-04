// Run with: npm test
// Covers the cleaned-up unit page: the "Full criteria text" disclosure and its sync check with the checklist,
// the verb legend, the pilot list, and the wording rules for the pilot pages' markdown.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { parseUnitMarkdown } from './unit-tools-data.js';
import {
  PilotPageError,
  assertCriteriaInSync,
  criteriaDifferences,
  criteriaFromHtml,
  normaliseText,
  verbLegend,
  wrapCriteriaDisclosure,
} from './pilot-page.js';
import { cleanupPilotUnits, isCleanupUnit } from '../components/unit-tools/config.js';

const pagePath = (code) => new URL(`../pages/cmi-${code}-assignment-help/index.md`, import.meta.url);
const pageSource = (code) => readFileSync(pagePath(code), 'utf8');
const unitOf = (code) => parseUnitMarkdown(pageSource(code), { code });

const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/'/g, '&#39;');
const curly = (text) => text.replace(/'/g, '’');

/** HTML shaped like Astro's rendering of the criteria section (curly quotes, h3 per outcome, one list each). */
function renderedCriteriaSection(unit, { tamper } = {}) {
  const parts = ['<h2 id="learning-outcomes-and-assessment-criteria">Learning outcomes and assessment criteria</h2>'];
  for (const outcome of unit.outcomes) {
    parts.push(`<h3 id="lo-${outcome.number}">Learning outcome ${outcome.number}: ${escapeHtml(curly(outcome.title))}</h3>`);
    parts.push('<ul>');
    for (const criterion of outcome.criteria) {
      parts.push(`<li>${criterion.id} <strong>${criterion.verb}</strong> ${escapeHtml(curly(criterion.text))}</li>`);
    }
    parts.push('</ul>');
  }
  let html = parts.join('\n') + '\n';
  if (tamper) html = tamper(html);
  return `<p>Intro</p>\n${html}<h2 id="next">What the command verbs ask for in this unit</h2>\n<p>After</p>\n`;
}

test('the pilot list is in the tools config and every pilot is a unit page that uses the tools layout', () => {
  assert.deepEqual(cleanupPilotUnits, ['307', '4008', '501', '611', '711']);
  assert.ok(isCleanupUnit('4008'));
  assert.ok(!isCleanupUnit('4007'));
  assert.ok(!isCleanupUnit('502'));
  for (const code of cleanupPilotUnits) {
    assert.match(pageSource(code), /^layout: \.\.\/\.\.\/layouts\/UnitPageTools\.astro/m, `unit ${code}`);
  }
});

test('normaliseText folds curly quotes, entities and tags so rendered and source text compare equal', () => {
  assert.equal(normaliseText('1.1 <strong>Describe</strong> individuals&#39; background &amp; beliefs'), "1.1 Describe individuals' background & beliefs");
  assert.equal(normaliseText('individuals’ “background” – and…'), 'individuals\' "background" - and...');
  assert.equal(normaliseText('a\n   b c'), 'a b c');
});

test('the disclosure keeps the heading outside, is closed by default, and keeps all the criteria text in the HTML', () => {
  const unit = unitOf('4008');
  const source = renderedCriteriaSection(unit);
  const { html, inner } = wrapCriteriaDisclosure('4008', source);

  const heading = '<h2 id="learning-outcomes-and-assessment-criteria">Learning outcomes and assessment criteria</h2>';
  assert.ok(html.includes(heading), 'the heading text is unchanged');
  assert.ok(html.indexOf(heading) < html.indexOf('<details'), 'the heading is outside the disclosure');
  assert.match(html, /<details class="ut-full-criteria">\s*<summary>Full criteria text<\/summary>/);
  assert.ok(!/<details[^>]*\sopen/.test(html), 'closed by default');
  assert.ok(html.indexOf('</details>') < html.indexOf('<h2 id="next">'), 'the next section stays outside');
  assert.ok(html.includes('<p>Intro</p>') && html.includes('<p>After</p>'));
  for (const outcome of unit.outcomes) {
    for (const criterion of outcome.criteria) {
      assert.ok(normaliseText(inner).includes(normaliseText(`${criterion.id} ${criterion.verb} ${criterion.text}`)), criterion.id);
    }
  }
});

test('the disclosure also works when the criteria section is the last section on the page', () => {
  const unit = unitOf('711');
  const source = renderedCriteriaSection(unit).replace(/<h2 id="next">[\s\S]*$/, '');
  const { html } = wrapCriteriaDisclosure('711', source);
  assert.ok(html.trimEnd().endsWith('</details>'));
});

test('wrapping fails, naming the unit, when the criteria heading is missing', () => {
  assert.throws(() => wrapCriteriaDisclosure('307', '<h2>Something else</h2>'), (error) => error instanceof PilotPageError && /unit 307/.test(error.message));
});

test('sync check: the disclosure agrees with the checklist for every pilot unit', () => {
  for (const code of cleanupPilotUnits) {
    const unit = unitOf(code);
    const { inner } = wrapCriteriaDisclosure(code, renderedCriteriaSection(unit));
    assert.deepEqual(criteriaDifferences(unit, inner), [], code);
    assert.doesNotThrow(() => assertCriteriaInSync(code, unit, inner));
  }
});

test('sync check: a changed word, a missing criterion, an extra criterion, a reorder or a changed heading all fail the build', () => {
  const unit = unitOf('4008');
  const run = (tamper) => wrapCriteriaDisclosure('4008', renderedCriteriaSection(unit, { tamper })).inner;
  const changedWord = run((html) => html.replace('Describe</strong> the need', 'Describe</strong> the needs'));
  const missing = run((html) => html.replace(/<li>1\.2 [\s\S]*?<\/li>\n/, ''));
  const extra = run((html) => html.replace('</ul>', '<li>9.9 <strong>Explain</strong> something new</li>\n</ul>'));
  const swapped = run((html) => html.replace(/(<li>1\.1 [^\n]*\n)(<li>1\.2 [^\n]*\n)/, '$2$1'));
  const heading = run((html) => html.replace('Learning outcome 2:', 'Learning outcome 2 -'));

  for (const [name, inner] of Object.entries({ changedWord, missing, extra, swapped, heading })) {
    assert.ok(criteriaDifferences(unit, inner).length > 0, `${name} should be reported`);
    assert.throws(() => assertCriteriaInSync('4008', unit, inner), (error) => error instanceof PilotPageError && /unit 4008/.test(error.message), name);
  }
});

test('legend: each distinct verb once, in order of first use, with its meaning and the criteria that use it', () => {
  const { entries, gaps } = verbLegend(unitOf('4008'));
  assert.deepEqual(entries.map((entry) => entry.verb), ['Describe', 'Discuss', 'Analyse', 'Devise', 'Identify', 'Provide']);
  assert.deepEqual(entries[0].criteria, ['1.1', '1.3', '2.1', '2.2']);
  assert.ok(entries.every((entry) => entry.meaning && entry.slug));
  assert.deepEqual(gaps, []);
});

test('legend: a two-word verb is one entry, and the verb legend never invents a meaning', () => {
  const { entries } = verbLegend(unitOf('611'));
  assert.ok(entries.some((entry) => entry.verb === 'Critically appraise'));
  assert.equal(entries.find((entry) => entry.verb === 'Critically appraise').criteria.length, 2);

  const unit = unitOf('307');
  const stripped = { ...unit, verbMeanings: { ...unit.verbMeanings } };
  delete stripped.verbMeanings['3.1']; // Outline is only used in 3.1
  const result = verbLegend(stripped);
  const outline = result.entries.find((entry) => entry.verb === 'Outline');
  assert.equal(outline.meaning, null);
  assert.ok(result.gaps.some((gap) => gap.includes('"Outline"')));
});

test('pilot pages: the FAQ answer is the agreed text, and none of the removed wording is left in the page body', () => {
  const answer =
    'If you would like support with this unit, message us on WhatsApp with your unit code, your brief and your deadline, and we will tell you what we can offer.';
  const banned = [/UK-based CMI-qualified/i, /fixed quote/i, /within 2 hours/i, /submission-ready/i, /written to your unit criteria/i];
  for (const code of cleanupPilotUnits) {
    const body = pageSource(code).replace(/\r\n/g, '\n').replace(/^---\n[\s\S]*?\n---\n/, '');
    assert.ok(body.includes(`**What does Unit ${code} assignment help from us include?**\n\n${answer}\n`), `unit ${code} FAQ`);
    for (const pattern of banned) assert.ok(!pattern.test(body), `unit ${code} still has ${pattern}`);
  }
});

test('pilot pages: no WhatsApp links in the markdown, no service-page links, tidy related and topics lists', () => {
  const servicePage = /cmi-(?:assignment-writing-service|assignment-examples|homework-help|essay-writing-help|coursework-help|assignment-tutoring|assignment-answers|assignment-help-online|report-writing-help)\/|cheap-cmi-assignment-help|pay-someone-to-do-my-cmi-assignment/;
  const verbsGuide = '/guides/cmi-command-verbs-explained/';
  for (const code of cleanupPilotUnits) {
    const body = pageSource(code).replace(/\r\n/g, '\n').replace(/^---\n[\s\S]*?\n---\n/, '');
    assert.ok(!/wa\.me/.test(body), `unit ${code}: a WhatsApp link is left in the markdown`);
    assert.ok(!/Quote on WhatsApp/.test(body), `unit ${code}: quote link`);
    assert.ok(!/If you want support with this unit/.test(body), `unit ${code}: intro sentence`);
    assert.ok(!servicePage.test(body), `unit ${code}: service-page link`);

    const related = body.match(/## Related CMI Level \d units\n\n([\s\S]*?)\n## /)[1];
    assert.ok(!related.includes('/guides/'), `unit ${code}: guide link left in the related units list`);

    const topics = body.match(/## More on this unit's topics\n\n([\s\S]*)$/)[1];
    const guides = [...topics.matchAll(/\]\((https:\/\/www\.cmiassignmenthelp\.uk\.com\/guides\/[^)]+)\)/g)].map((match) => match[1]);
    assert.ok(guides.length <= 2, `unit ${code}: ${guides.length} guide links under "More on this unit's topics"`);
    assert.ok(guides.some((href) => href.endsWith(verbsGuide)), `unit ${code}: the command verbs guide link is under "More on this unit's topics"`);
  }
});

test('built pilot pages (when dist exists): the checklist and the full criteria text carry the same criteria', (t) => {
  const built = (code) => new URL(`../../dist/cmi-${code}-assignment-help/index.html`, import.meta.url);
  if (!cleanupPilotUnits.every((code) => existsSync(built(code)))) {
    t.skip('run `npm run build` first to check the built pages');
    return;
  }
  for (const code of cleanupPilotUnits) {
    const html = readFileSync(built(code), 'utf8');
    const disclosure = html.match(/<details class="ut-full-criteria">([\s\S]*?)<\/details>/);
    assert.ok(disclosure, `unit ${code} has the disclosure`);
    assert.match(disclosure[1], /<summary>Full criteria text<\/summary>/);
    assert.ok(!/<details class="ut-full-criteria"[^>]*\sopen/.test(html), 'closed by default');

    const fromDisclosure = criteriaFromHtml(disclosure[1]);
    const panel = html.match(/data-ut-checklist>([\s\S]*?)<div class="ut-panel" role="tabpanel"/)[1];
    const checklist = [...panel.matchAll(/<span class="ut-id">([^<]+)<\/span>\s*<span class="ut-criterion">([\s\S]*?)<\/span>\s*<\/label>/g)].map(
      (match) => normaliseText(`${match[1]} ${match[2]}`)
    );
    assert.equal(checklist.length, fromDisclosure.criteria.length, `unit ${code} count`);
    assert.deepEqual(checklist, fromDisclosure.criteria, `unit ${code} text`);
  }
});
