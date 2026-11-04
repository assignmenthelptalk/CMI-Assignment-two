// The CMI syllabus version each level was last checked against, for the "Last reviewed" line on the cleaned-up
// unit pages. These are the values in docs/spec-versions.md (the date is its single "Last verified" date, and the
// versions are the Version column). src/data/specVersions.test.mjs fails if the two drift apart.
// There is no per-unit review date in the repo, so every unit of a level shows the same line.

export const specReviewed = 'October 2026';

export const specVersions = {
  3: 'v16',
  4: 'v12',
  5: 'v26',
  6: 'v09',
  7: 'v10',
};

/** "Last reviewed October 2026 against the CMI Level 4 specification v12." Null when the level has no version on record. */
export function reviewedLine(level) {
  const version = specVersions[level];
  if (!version) return null;
  return `Last reviewed ${specReviewed} against the CMI Level ${level} specification ${version}.`;
}
