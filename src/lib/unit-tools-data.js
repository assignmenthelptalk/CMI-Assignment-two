// Reads a unit page's markdown and returns its learning outcomes, criteria, command-verb
// meanings and word-count guideline, for the study tools on unit pages.
//
// The unit page is the single source of truth: nothing here is typed in a second place.
// The helper never guesses. If what it finds does not agree with what the page itself says
// (for example the stated number of criteria), it throws a UnitDataError, which stops the
// build with a message that names the unit and the problem.
//
// It reads the format every unit page already uses:
//
//   It has 3 learning outcomes and 11 assessment criteria, ...
//   ## Learning outcomes and assessment criteria
//   ### Learning outcome 1: Understand ...
//   - 1.1 **Evaluate** the use of ...
//   ## What the command verbs ask for in this unit
//   - **Evaluate** (1.1, 2.1): weigh strengths against limitations ...
//   The guideline word count for this unit is 3,000 words, with a 10% allowance ...
//
// Fields a page does not state (verb meanings, word count) come back empty and are listed in
// `gaps`, so the tools can hide that feature for the unit rather than invent anything.

export class UnitDataError extends Error {
  constructor(code, message) {
    super(`Assignment tools data, unit ${code}: ${message}`);
    this.name = 'UnitDataError';
  }
}

const CRITERIA_HEADING = /^##\s+Learning outcomes and assessment criteria\s*$/im;
const VERBS_HEADING = /^##\s+What the command verbs ask for in this unit\s*$/im;
const OUTCOME_LINE = /^###\s+Learning outcome\s+(\d+):\s*(.+?)\s*$/;
const CRITERION_LINE = /^-\s+(\d+)\.(\d+)\s+\*\*([^*]+)\*\*\s+(.+?)\s*$/;
const VERB_LINE = /^-\s+\*\*([^*]+)\*\*\s+\(([^)]*)\):\s*(.+?)\s*$/;
const STATED_COUNTS = /It has (\d+) learning outcomes? and (\d+) assessment criteri(?:a|on)/i;
const WORD_COUNT = /guideline word count for this unit is ([\d,]+)(?:\s+to\s+([\d,]+))?\s+words/gi;
const LEVEL = /According to the CMI Level (\d) syllabus/i;

/** Markdown without a leading frontmatter block (Astro's rawContent() already omits it). */
function withoutFrontmatter(raw) {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
}

/** The lines under a "## " heading, up to the next "## " heading. Empty array if the heading is absent. */
function sectionLines(body, headingPattern) {
  const lines = body.split(/\r?\n/);
  const start = lines.findIndex((line) => headingPattern.test(line));
  if (start === -1) return [];
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((line) => /^##\s/.test(line));
  return end === -1 ? rest : rest.slice(0, end);
}

function toNumber(text) {
  return Number(text.replace(/,/g, ''));
}

/** The text as the page shows it: a backslash in front of punctuation only keeps that character literal in markdown. */
function unescapeMarkdown(text) {
  return text.replace(/\\([!-/:-@[-`{-~])/g, '$1');
}

function parseOutcomes(code, body) {
  const lines = sectionLines(body, CRITERIA_HEADING);
  if (lines.length === 0) {
    throw new UnitDataError(code, 'no "Learning outcomes and assessment criteria" section found.');
  }

  const outcomes = [];
  for (const line of lines) {
    const outcomeMatch = line.match(OUTCOME_LINE);
    if (outcomeMatch) {
      outcomes.push({ number: Number(outcomeMatch[1]), title: outcomeMatch[2], criteria: [] });
      continue;
    }
    if (!line.startsWith('- ')) continue;

    const criterionMatch = line.match(CRITERION_LINE);
    if (!criterionMatch) {
      throw new UnitDataError(code, `could not read this line as a criterion: "${line}".`);
    }
    const current = outcomes[outcomes.length - 1];
    if (!current) {
      throw new UnitDataError(code, `criterion "${line}" appears before any learning outcome heading.`);
    }
    const [, outcomeNumber, criterionNumber, verb, text] = criterionMatch;
    if (Number(outcomeNumber) !== current.number) {
      throw new UnitDataError(
        code,
        `criterion ${outcomeNumber}.${criterionNumber} sits under learning outcome ${current.number}.`
      );
    }
    if (Number(criterionNumber) !== current.criteria.length + 1) {
      throw new UnitDataError(
        code,
        `criterion ${outcomeNumber}.${criterionNumber} is out of sequence (expected ${outcomeNumber}.${current.criteria.length + 1}).`
      );
    }
    current.criteria.push({ id: `${outcomeNumber}.${criterionNumber}`, verb: verb.trim(), text: unescapeMarkdown(text) });
  }

  outcomes.forEach((outcome, index) => {
    if (outcome.number !== index + 1) {
      throw new UnitDataError(code, `learning outcome ${outcome.number} found where ${index + 1} was expected.`);
    }
    if (outcome.criteria.length === 0) {
      throw new UnitDataError(code, `learning outcome ${outcome.number} has no criteria.`);
    }
  });
  if (outcomes.length === 0) {
    throw new UnitDataError(code, 'no learning outcome headings found.');
  }
  return outcomes;
}

/** Checks the parsed totals against the totals the page states about itself. */
function checkStatedCounts(code, body, outcomes) {
  const stated = body.match(STATED_COUNTS);
  if (!stated) {
    throw new UnitDataError(
      code,
      'the page does not state its number of learning outcomes and criteria ("It has N learning outcomes and M assessment criteria"), so the parsed data cannot be checked.'
    );
  }
  const statedOutcomes = Number(stated[1]);
  const statedCriteria = Number(stated[2]);
  const parsedCriteria = outcomes.reduce((sum, outcome) => sum + outcome.criteria.length, 0);
  if (statedOutcomes !== outcomes.length) {
    throw new UnitDataError(code, `the page states ${statedOutcomes} learning outcomes but ${outcomes.length} were parsed.`);
  }
  if (statedCriteria !== parsedCriteria) {
    throw new UnitDataError(code, `the page states ${statedCriteria} criteria but ${parsedCriteria} were parsed.`);
  }
  return { outcomes: statedOutcomes, criteria: statedCriteria };
}

/** Attaches each "what the verb asks for" line to the criteria it names. Returns { meanings, gaps }. */
function parseVerbMeanings(code, body, outcomes) {
  const meanings = {};
  const gaps = [];
  const byId = new Map(outcomes.flatMap((outcome) => outcome.criteria).map((criterion) => [criterion.id, criterion]));

  for (const line of sectionLines(body, VERBS_HEADING)) {
    const match = line.match(VERB_LINE);
    if (!match) continue;
    const [, verb, ids, meaning] = match;
    for (const id of ids.split(',').map((part) => part.trim())) {
      const criterion = byId.get(id);
      if (!criterion) {
        gaps.push(`The verb list names criterion ${id}, which is not in the criteria list. Meaning left out.`);
      } else if (criterion.verb.toLowerCase() !== verb.trim().toLowerCase()) {
        gaps.push(`The verb list gives "${verb.trim()}" for criterion ${id}, which uses "${criterion.verb}". Meaning left out.`);
      } else {
        meanings[id] = meaning;
      }
    }
  }
  for (const criterion of byId.values()) {
    if (!(criterion.id in meanings)) gaps.push(`No verb meaning on the page for criterion ${criterion.id}.`);
  }
  return { meanings, gaps };
}

function parseWordCount(code, body) {
  const found = [...body.matchAll(WORD_COUNT)].map((match) => ({
    min: toNumber(match[1]),
    max: toNumber(match[2] ?? match[1]),
  }));
  if (found.length === 0) return null;
  const distinct = new Set(found.map((range) => `${range.min}-${range.max}`));
  if (distinct.size > 1) {
    throw new UnitDataError(code, 'the page states more than one word-count guideline.');
  }
  return found[0];
}

/**
 * @param {string} raw   the unit page's markdown (with or without frontmatter)
 * @param {{code: string}} options   the unit code, used in error messages and by the tools
 * @returns {{
 *   code: string,
 *   level: number | null,
 *   outcomes: { number: number, title: string, criteria: { id: string, verb: string, text: string }[] }[],
 *   stated: { outcomes: number, criteria: number },
 *   verbMeanings: Record<string, string>,
 *   wordCount: { min: number, max: number } | null,
 *   gaps: string[],
 * }}
 */
export function parseUnitMarkdown(raw, { code }) {
  const body = withoutFrontmatter(raw);
  const outcomes = parseOutcomes(code, body);
  const stated = checkStatedCounts(code, body, outcomes);
  const { meanings, gaps } = parseVerbMeanings(code, body, outcomes);
  const wordCount = parseWordCount(code, body);
  if (!wordCount) gaps.push('No word-count guideline on the page.');
  const levelMatch = body.match(LEVEL);

  return {
    code,
    level: levelMatch ? Number(levelMatch[1]) : null,
    outcomes,
    stated,
    verbMeanings: meanings,
    wordCount,
    gaps,
  };
}

/** The unit code from a unit page URL such as /cmi-502-assignment-help/, or null for any other page. */
export function unitCodeFromPath(pathname) {
  const match = pathname.match(/^\/cmi-(\d+)-assignment-help\/?$/);
  return match ? match[1] : null;
}
