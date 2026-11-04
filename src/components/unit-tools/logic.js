// Pure functions shared by the study tools. They have no DOM access, so the same code runs
// at build time (the outline is written into the page) and in the browser (the planner),
// and the tests can call it directly.

/** Share of the entered word count that the allowed range extends either side. */
export const ALLOWANCE = 0.1;
export const DEFAULT_INTRO_PERCENT = 10;
export const DEFAULT_CONCLUSION_PERCENT = 8;

export const LIMITS = {
  totalMin: 500,
  totalMax: 20000,
  shareMin: 0,
  shareMax: 30,
  sharesTogetherMax: 50,
};

const roundToTen = (value) => Math.round(value / 10) * 10;

export const formatNumber = (value) => value.toLocaleString('en-GB');

/**
 * Checks the planner inputs and returns a friendly message for each one that is not usable.
 * Inputs arrive as the raw strings from the form fields.
 */
export function validatePlannerInputs({ total, introPercent, conclusionPercent }) {
  const errors = {};
  const totalValue = Number(total);
  if (String(total).trim() === '' || !Number.isFinite(totalValue)) {
    errors.total = 'Enter your word count as a number, for example 3000.';
  } else if (totalValue < LIMITS.totalMin || totalValue > LIMITS.totalMax) {
    errors.total = `Enter a word count between ${formatNumber(LIMITS.totalMin)} and ${formatNumber(LIMITS.totalMax)}.`;
  }

  for (const [key, label, raw] of [
    ['intro', 'introduction', introPercent],
    ['conclusion', 'conclusion', conclusionPercent],
  ]) {
    const value = Number(raw);
    if (String(raw).trim() === '' || !Number.isFinite(value)) {
      errors[key] = `Enter the ${label} share as a number, for example 10.`;
    } else if (value < LIMITS.shareMin || value > LIMITS.shareMax) {
      errors[key] = `Enter a ${label} share between ${LIMITS.shareMin} and ${LIMITS.shareMax} per cent.`;
    }
  }
  if (!errors.intro && !errors.conclusion && Number(introPercent) + Number(conclusionPercent) > LIMITS.sharesTogetherMax) {
    errors.conclusion = `The introduction and conclusion together can be at most ${LIMITS.sharesTogetherMax} per cent.`;
  }
  return errors;
}

/**
 * Splits a word count between the introduction, the conclusion and the learning outcomes.
 * The learning outcomes share what is left in proportion to their number of criteria.
 * Every figure is rounded to the nearest 10 and the figures add up to `target`.
 *
 * @param {{ total: number, introPercent: number, conclusionPercent: number, criteriaPerOutcome: number[] }} input
 */
export function allocateWords({ total, introPercent, conclusionPercent, criteriaPerOutcome }) {
  const target = roundToTen(total);
  const intro = roundToTen((total * introPercent) / 100);
  const conclusion = roundToTen((total * conclusionPercent) / 100);
  const remainingTens = Math.max(0, (target - intro - conclusion) / 10);

  const weightTotal = criteriaPerOutcome.reduce((sum, count) => sum + count, 0);
  const exact = criteriaPerOutcome.map((count) => (remainingTens * count) / weightTotal);
  const tens = exact.map(Math.floor);
  let leftover = remainingTens - tens.reduce((sum, value) => sum + value, 0);

  // Largest remainder method: hand the leftover tens to the outcomes that lost the most to rounding down.
  const byRemainder = exact
    .map((value, index) => ({ index, remainder: value - Math.floor(value) }))
    .sort((a, b) => b.remainder - a.remainder || a.index - b.index);
  for (const { index } of byRemainder) {
    if (leftover <= 0) break;
    tens[index] += 1;
    leftover -= 1;
  }

  return {
    target,
    intro,
    conclusion,
    outcomes: tens.map((value) => value * 10),
    allowedMin: Math.round(total * (1 - ALLOWANCE)),
    allowedMax: Math.round(total * (1 + ALLOWANCE)),
  };
}

/** The figure the planner starts with: the page's guideline, or the middle of a range. Null when the page states none. */
export function defaultWordCount(wordCount) {
  if (!wordCount) return null;
  return roundToTen((wordCount.min + wordCount.max) / 2);
}

/** The prompt for one criterion. It only asks a question about the criterion's own wording. */
export function criterionPrompt(criterion) {
  return `Ask yourself: what does "${criterion.verb} ${criterion.text}" need you to show, and what evidence will you use?`;
}

/** The plain-text heading skeleton offered for copying and download. */
export function buildOutline(unit) {
  const level = unit.level ? ` (Level ${unit.level})` : '';
  const lines = [
    `CMI Unit ${unit.code} structure outline${level}`,
    "A planning skeleton built from the unit's assessment criteria. It holds prompts, not answers: write the content yourself and follow your centre's brief.",
    '',
    '1. Introduction',
    '   - Ask yourself: what is this assignment about, and how will you structure it?',
    '',
  ];

  unit.outcomes.forEach((outcome, index) => {
    lines.push(`${index + 2}. Learning outcome ${outcome.number}: ${outcome.title}`);
    lines.push(`   Criteria: ${outcome.criteria.map((criterion) => criterion.id).join(', ')}`);
    for (const criterion of outcome.criteria) {
      lines.push(`   - ${criterion.id} ${criterionPrompt(criterion)}`);
    }
    lines.push('');
  });

  const conclusionNumber = unit.outcomes.length + 2;
  lines.push(`${conclusionNumber}. Conclusion`);
  lines.push('   - Ask yourself: which points from each learning outcome come together, and what follows from them?');
  lines.push('');
  lines.push(`${conclusionNumber + 1}. References`);
  lines.push("   - List the sources you cited, in the referencing style your centre asks for.");
  return lines.join('\n');
}

/** A WhatsApp link to the number the site already uses, with the message prefilled and URL-encoded. */
export function stuckLink(whatsappUrl, { code, level, criterionId }) {
  const levelText = level ? ` (Level ${level})` : '';
  const message = `Hi, I'm working on CMI Unit ${code}${levelText}, criterion ${criterionId}. Source: checklist-${code}.`;
  return `${whatsappUrl}?text=${encodeURIComponent(message)}`;
}
