# CMI syllabus versions used on this site

The official CMI syllabus PDFs are the source for every grading, word-count and command-verb figure on the site. The PDFs are not stored in this repository. Re-download them from CMI before re-verifying.

Last verified: **31 October 2026** (all rows below).

| Level | Syllabus document | Version | Document date | Last verified |
|---|---|---|---|---|
| 3 | CMI Level 3 syllabus | v16 | October 2024 | 2026-10-31 |
| 4 | CMI Level 4 syllabus | v12 | July 2026 | 2026-10-31 |
| 5 | CMI Level 5 syllabus | v26 | June 2026 | 2026-10-31 |
| 6 | CMI Level 6 syllabus, main document plus the Group B units document | v09 | July 2026 | 2026-10-31 |
| 7 | CMI Level 7 syllabus | v10 | August 2026 | 2026-10-31 |

An older Level 5 PDF (v09, April 2018) was downloaded during research and is superseded. Nothing on the site relies on it.

## What was checked in each document

| Fact on the site | Where it comes from |
|---|---|
| Grading is "Pass/Refer", with no Merit or Distinction | The "Assessment Grading" section of each syllabus |
| Guideline word counts, with a 10% allowance above and below | The "Word Count" section of each syllabus. L3 gives one range for all units (2,000-2,500). L4-L7 give a per-unit table. |
| Resulting level ranges | L3 2,000-2,500; L4 3,000; L5 3,000-5,000; L6 3,000-4,000; L7 3,500-4,500 |
| "Appropriate use of evidence, examples and references to support conclusions and recommendations" | Levels 4 to 7 only. The Level 3 syllabus has no equivalent sentence, so the Level 3 pages do not use it. |
| No minimum number of sources | No syllabus states a source count. This is an absence, so site copy says "the unit specifications don't set a minimum number of sources". |
| No referencing style named | None of the five syllabuses names a style. |
| Command-verb counts per level | Counted by us from the assessment criteria in the parsed syllabus data, not stated by CMI |

## Command-verb counts (counted from the criteria)

| Level | Criteria | Leading verbs |
|---|---|---|
| 3 | 257 | Explain 112, Identify 38, Outline 33, Discuss 27 |
| 4 | 85 | Describe 16, Discuss 12, Identify 11, Explain 10 |
| 5 | 248 | Analyse 66, Examine 51, Evaluate 48, Assess 22 |
| 6 | 75 | Critically appraise 12, Critically assess 9, Discuss 8, Recommend 7 (29 begin with Critically) |
| 7 | 80 | Critically appraise 18, Discuss 9, Develop 8, Critically assess 7 (37 begin with Critically; none uses Critically analyse) |

## Re-verifying

1. Download the current syllabus PDF for each level from CMI.
2. Compare the version and date in the table above. If a version has changed, re-check the grading line, the word-count section and the unit lists, then update this file.
3. Update the "Last verified" date even when nothing has changed.

## Selector data

`src/data/units.json` feeds the homepage "Find my unit" selector. It holds the 86 own-level units (L3 21, L4 9, L5 26, L6 14, L7 16): codes come from the parsed syllabus data, and titles from `src/data/cmiUnitsOfficial.js`, whose titles were each checked against the syllabus text on 2026-10-31. Whether a unit has a page is worked out at build time from the unit pages that exist, so the selector cannot link to a page that was not built. Units that only count towards another level (Level 4: 5001, 5012, 5014; shared Level 6 and 7 units) are not listed in the selector.
