// Run with: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseUnitMarkdown } from '../../lib/unit-tools-data.js';
import {
  allocateWords,
  buildOutline,
  criterionPrompt,
  defaultWordCount,
  stuckLink,
  validatePlannerInputs,
} from './logic.js';
import { whatsappUrl } from './config.js';

const unit = (code) =>
  parseUnitMarkdown(readFileSync(new URL(`../../pages/cmi-${code}-assignment-help/index.md`, import.meta.url), 'utf8'), { code });
const sum = (values) => values.reduce((a, b) => a + b, 0);

test('allocation adds up to the rounded total and every figure is a multiple of 10', () => {
  for (const code of ['307', '4001', '501', '611', '711']) {
    const criteriaPerOutcome = unit(code).outcomes.map((outcome) => outcome.criteria.length);
    for (const total of [2250, 3000, 3333, 4500, 12345]) {
      const plan = allocateWords({ total, introPercent: 10, conclusionPercent: 8, criteriaPerOutcome });
      const figures = [plan.intro, plan.conclusion, ...plan.outcomes];
      assert.ok(figures.every((figure) => figure % 10 === 0), `${code} ${total}`);
      assert.equal(sum(figures), plan.target, `${code} ${total}`);
    }
  }
});

test('learning outcomes with more criteria get more words', () => {
  const plan = allocateWords({ total: 3000, introPercent: 10, conclusionPercent: 8, criteriaPerOutcome: [2, 6] });
  assert.equal(plan.intro, 300);
  assert.equal(plan.conclusion, 240);
  // 2,460 words remain. Shared 2:6 that is 615 and 1,845; the extra 5 words round up to the first outcome.
  assert.deepEqual(plan.outcomes, [620, 1840]);
  assert.equal(sum(plan.outcomes), 3000 - 300 - 240);
});

test('the allowed range is plus or minus 10 per cent of the entered figure', () => {
  const plan = allocateWords({ total: 3000, introPercent: 10, conclusionPercent: 8, criteriaPerOutcome: [1] });
  assert.equal(plan.allowedMin, 2700);
  assert.equal(plan.allowedMax, 3300);
});

test('validation gives a friendly message for each unusable input', () => {
  assert.deepEqual(validatePlannerInputs({ total: '3000', introPercent: '10', conclusionPercent: '8' }), {});
  assert.match(validatePlannerInputs({ total: '', introPercent: '10', conclusionPercent: '8' }).total, /as a number/);
  assert.match(validatePlannerInputs({ total: 'abc', introPercent: '10', conclusionPercent: '8' }).total, /as a number/);
  assert.match(validatePlannerInputs({ total: '50', introPercent: '10', conclusionPercent: '8' }).total, /between 500 and 20,000/);
  assert.match(validatePlannerInputs({ total: '3000', introPercent: '-1', conclusionPercent: '8' }).intro, /between 0 and 30/);
  assert.match(validatePlannerInputs({ total: '3000', introPercent: '30', conclusionPercent: '30' }).conclusion, /at most 50/);
});

test('the default word count is the guideline, the middle of a range, or nothing', () => {
  assert.equal(defaultWordCount({ min: 3000, max: 3000 }), 3000);
  assert.equal(defaultWordCount({ min: 2000, max: 2500 }), 2250);
  assert.equal(defaultWordCount(null), null);
});

test('the outline has an introduction, one section per outcome, a conclusion and references', () => {
  const data = unit('611');
  const outline = buildOutline(data);
  assert.match(outline, /^CMI Unit 611 structure outline \(Level 6\)/);
  assert.match(outline, /1\. Introduction/);
  data.outcomes.forEach((outcome) => assert.match(outline, new RegExp(`Learning outcome ${outcome.number}: `)));
  assert.match(outline, /Conclusion/);
  assert.match(outline, /References\n/);
  for (const criterion of data.outcomes.flatMap((outcome) => outcome.criteria)) {
    assert.ok(outline.includes(`${criterion.id} Ask yourself:`), criterion.id);
  }
});

test('prompts are questions that quote the criterion and never contain model answers', () => {
  const prompt = criterionPrompt({ id: '1.1', verb: 'Evaluate', text: 'the use of theoretical models' });
  assert.equal(prompt, 'Ask yourself: what does "Evaluate the use of theoretical models" need you to show, and what evidence will you use?');
});

test('the stuck link uses the site number and URL-encodes the prefilled message', () => {
  const link = stuckLink('https://wa.me/447916696894', { code: '307', level: 3, criterionId: '1.2' });
  assert.ok(link.startsWith('https://wa.me/447916696894?text='));
  assert.equal(
    decodeURIComponent(link.split('?text=')[1]),
    "Hi, I'm working on CMI Unit 307 (Level 3), criterion 1.2. Source: checklist-307."
  );
  assert.ok(!link.includes(' '));
});

test('the study tools use the same WhatsApp number as the rest of the site', () => {
  const layout = readFileSync(new URL('../../layouts/Layout.astro', import.meta.url), 'utf8');
  assert.ok(layout.includes(`const whatsappUrl = '${whatsappUrl}';`));
});
