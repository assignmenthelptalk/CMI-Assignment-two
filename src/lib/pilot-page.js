// Helpers for the cleaned-up unit page (the pilot units in src/components/unit-tools/config.js).
// Pure functions with no DOM access, so the same code runs at build time and in the tests.
// See docs/unit-page-cleanup-notes.md.

export class PilotPageError extends Error {
  constructor(code, message) {
    super(`Unit page cleanup, unit ${code}: ${message}`);
    this.name = 'PilotPageError';
  }
}

const CRITERIA_HEADING_HTML = /<h2[^>]*>\s*Learning outcomes and assessment criteria\s*<\/h2>/i;

const NAMED_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

/**
 * Text as a reader sees it, folded so the rendered page and the markdown source can be compared:
 * tags removed, entities decoded, typographic quotes, dashes and ellipses folded to plain ones,
 * white space collapsed. (Astro's markdown renderer turns ' into a curly quote.)
 */
export function normaliseText(value) {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&(?:#(\d+)|#x([0-9a-f]+)|([a-z]+));/gi, (match, dec, hex, name) => {
      if (dec) return String.fromCodePoint(Number(dec));
      if (hex) return String.fromCodePoint(parseInt(hex, 16));
      return NAMED_ENTITIES[name.toLowerCase()] ?? match;
    })
    .replace(/[‘’‚‛′]/g, "'")
    .replace(/[“”„‟″]/g, '"')
    .replace(/[‐-―−]/g, '-')
    .replace(/…/g, '...')
    .replace(/ /g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Puts everything under the "Learning outcomes and assessment criteria" heading (up to the next
 * "##" heading) inside a closed <details> whose summary reads "Full criteria text". The heading
 * itself stays outside it. The content is still in the HTML.
 *
 * @returns {{ html: string, inner: string }} the new HTML and the HTML that went inside the disclosure
 */
export function wrapCriteriaDisclosure(code, html) {
  const heading = html.match(CRITERIA_HEADING_HTML);
  if (!heading) {
    throw new PilotPageError(code, 'no "Learning outcomes and assessment criteria" heading found to put the disclosure under.');
  }
  const start = heading.index + heading[0].length;
  const rest = html.slice(start);
  const next = rest.search(/<h2[\s>]/i);
  const inner = next === -1 ? rest : rest.slice(0, next);
  const after = next === -1 ? '' : rest.slice(next);
  const wrapped = `\n<details class="ut-full-criteria">\n<summary>Full criteria text</summary>\n<div class="ut-full-criteria-body">${inner}</div>\n</details>\n`;
  return { html: html.slice(0, start) + wrapped + after, inner };
}

/** The outcome headings and criteria lines in the disclosure's HTML, as plain text. */
export function criteriaFromHtml(inner) {
  const outcomes = [...inner.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map((match) => normaliseText(match[1]));
  const criteria = [...inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((match) => normaliseText(match[1]));
  return { outcomes, criteria };
}

/** The same lines built from the parsed unit, which is what the checklist is built from. */
export function criteriaFromUnit(unit) {
  return {
    outcomes: unit.outcomes.map((outcome) => normaliseText(`Learning outcome ${outcome.number}: ${outcome.title}`)),
    criteria: unit.outcomes.flatMap((outcome) =>
      outcome.criteria.map((criterion) => normaliseText(`${criterion.id} ${criterion.verb} ${criterion.text}`))
    ),
  };
}

/**
 * Returns a list of differences between the criteria text in the disclosure and the checklist
 * (empty when they agree). The build stops on any difference.
 */
export function criteriaDifferences(unit, inner) {
  const expected = criteriaFromUnit(unit);
  const found = criteriaFromHtml(inner);
  const differences = [];
  for (const key of ['outcomes', 'criteria']) {
    const label = key === 'outcomes' ? 'learning outcome heading' : 'criterion';
    if (expected[key].length !== found[key].length) {
      differences.push(`the checklist has ${expected[key].length} ${label}s but the full criteria text has ${found[key].length}.`);
    }
    const length = Math.min(expected[key].length, found[key].length);
    for (let i = 0; i < length; i++) {
      if (expected[key][i] !== found[key][i]) {
        differences.push(`${label} ${i + 1} differs. Checklist: "${expected[key][i]}". Full criteria text: "${found[key][i]}".`);
      }
    }
  }
  return differences;
}

/** Throws, naming the unit, if the disclosure and the checklist disagree. */
export function assertCriteriaInSync(code, unit, inner) {
  const differences = criteriaDifferences(unit, inner);
  if (differences.length) {
    throw new PilotPageError(code, `the checklist and the "Full criteria text" disclosure disagree: ${differences.join(' ')}`);
  }
}

const slugify = (verb) => verb.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/**
 * Each distinct verb in the unit's criteria, once, in the order it first appears, with the meaning
 * the unit page gives it and the criteria that use it. A verb the page gives no meaning for is
 * listed with `meaning: null` and named in `gaps`.
 *
 * @returns {{ entries: { verb: string, slug: string, meaning: string | null, criteria: string[] }[], gaps: string[] }}
 */
export function verbLegend(unit) {
  const byVerb = new Map();
  const gaps = [];
  for (const outcome of unit.outcomes) {
    for (const criterion of outcome.criteria) {
      const key = criterion.verb.toLowerCase();
      if (!byVerb.has(key)) {
        byVerb.set(key, { verb: criterion.verb, slug: slugify(criterion.verb), meaning: null, criteria: [] });
      }
      const entry = byVerb.get(key);
      entry.criteria.push(criterion.id);
      const meaning = unit.verbMeanings[criterion.id] ?? null;
      if (meaning === null) continue;
      if (entry.meaning === null) entry.meaning = meaning;
      else if (entry.meaning !== meaning) {
        gaps.push(`The page gives "${entry.verb}" more than one meaning; the first is shown (criterion ${criterion.id} differs).`);
      }
    }
  }
  const entries = [...byVerb.values()];
  for (const entry of entries) {
    if (entry.meaning === null) gaps.push(`No meaning on the page for the verb "${entry.verb}". Listed without a meaning.`);
  }
  return { entries, gaps };
}
