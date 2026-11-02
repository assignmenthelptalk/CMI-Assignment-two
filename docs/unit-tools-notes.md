# Unit study tools: pilot notes

Three free, browser-only tools on unit pages: a criteria checklist, a word-count planner and a structure outline. Piloted on five units. Branch: `feat/unit-study-tools`.

## Where the data comes from

The brief expected the unit data in `src/data/units.json` and `src/data/cmiUnitsOfficial.js`. Those two files hold only unit codes and titles. The learning outcomes, criteria, command-verb meanings and word-count guideline are in each unit page's own markdown (`src/pages/cmi-<code>-assignment-help/index.md`).

Decision (confirmed): the tools read the unit page markdown at build time. There is no second data file, so the tools cannot drift from the page.

- `src/lib/unit-tools-data.js` parses a page into outcomes, criteria, verb meanings and the word-count guideline. It works for any unit page.
- It stops the build, naming the unit, if the parsed criteria or outcome count differs from the count the page states ("It has N learning outcomes and M assessment criteria"), if an outcome has no criteria, if a criterion line cannot be read, or if the page states no counts to check against. It never guesses or skips.
- `src/lib/unit-tools-data.test.mjs` covers pilot pages at Levels 3, 4, 5, 6 and 7, the failure cases, and parses all 86 selector units (`npm test`).

## Audit result (all 89 unit pages)

- Learning outcomes and criteria: complete on all 89 pages. Parsed counts match the counts each page states, on every page.
- Command-verb meanings: present for every criterion on all 89 pages (none missing).
- Word-count guideline: stated on 63 of 89 pages.

| Group | Pages | Word count stated |
|---|---|---|
| Level 3 | 21 | all (2,000 to 2,500 words) |
| Level 4 | 9 | all (3,000 words) |
| Level 4, Level 5-coded units (5001, 5012, 5014) | 3 | all (3,000 words) |
| Level 5 (501 to 526) | 26 | **none** |
| Level 6 | 14 | all (3,500 or 4,000 words) |
| Level 7 | 16 | all (3,500, 4,000 or 4,500 words) |

**The one data gap: no Level 5 unit page states a word-count guideline.** `docs/spec-versions.md` says the Level 5 syllabus gives a per-unit table (3,000 to 5,000 overall), but the pages do not carry it. The planner handles this: for Level 5 units the box starts empty with the note "This page does not state a word-count guideline for Unit N, so the box starts empty. Enter the figure your centre has given you." The figures were not invented. To close the gap, add the per-unit figure to each Level 5 page from the current CMI Level 5 syllabus, using the same sentence the other levels use ("The guideline word count for this unit is X words, with a 10% allowance..."). The parser then picks it up with no code change.

## Pilot units

| Level | Unit | Outcomes / criteria | Word count on page |
|---|---|---|---|
| 3 | 307 Developing the Knowledge, Skills and Abilities of Individuals and Teams | 4 / 10 | 2,000 to 2,500 (range) |
| 4 | 4001 Managerial Styles and Behaviours | 3 / 8 | 3,000 |
| 5 | 501 Principles of Management and Leadership in an Organisational Context | 3 / 12 | none (the gap above) |
| 6 | 611 Knowledge Management | 3 / 6 | 4,000 |
| 7 | 711 Entrepreneurial Practice | 2 / 5 | 4,000 |

Why these: all five have complete data and verb meanings for every criterion, and together they test every structure the tools must handle: a range word count (307), single figures (4001, 611, 711), no word count (501), two-word command verbs such as "Critically appraise" (611, 711), and from 2 to 4 learning outcomes. Level 5 had to be in the pilot (the brief asked for it) and none of its pages has a word count, so 501 is also the pilot for the empty-box path. 501 is the most-seen Level 5 unit page in Search Console (20 impressions); the impressions at every level are too small to rank on, so the choice rests on structure, not traffic. 4001 is the first Level 4 unit.

Gaps on the pilot pages after parsing: only 501's missing word count. Verb meanings are complete on all five (10/10, 8/8, 12/12, 6/6, 5/5).

## What was built

- `src/layouts/UnitPageTools.astro`: wraps `UnitPage.astro`, parses the page, and inserts the Study tools section after the page's opening block (heading, summary, quote button) and before its first "##" section.
- `src/components/unit-tools/`: `StudyTools.astro`, `study-tools.css`, `logic.js` (pure functions: word allocation, validation, outline), `tabs.js`, `checklist.js`, `planner.js`, `outline.js`, `config.js` (the WhatsApp number).
- Pilot pages: only their frontmatter `layout:` line changed (to `UnitPageTools.astro`). No titles, descriptions, canonicals, URLs or body text changed.
- No network calls, no analytics events, no third-party requests, no new dependencies. The only link out is the WhatsApp "Stuck on this criterion?" link, which uses the number already on the site (`logic.test.mjs` fails if it ever differs from the one in `Layout.astro`).
- The scripts and stylesheet load only on pages that use the tools. Every other page is byte-identical to the build before this branch (121 of 126 pages checked; only the five pilots differ).

Why a wrapper layout and not a change to `UnitPage.astro`: importing the tools into `UnitPage.astro` changed the stylesheet output of all 99 pages that use that layout, even with the import deferred. The wrapper keeps every other page untouched.

## Behaviour

- Checklist: ticks saved in localStorage under `cmi-unit-tools:checklist:<code>` (that unit only), with try/catch so the page works with storage blocked (a note appears if saving fails). "Clear ticks" and "Print checklist" buttons. Print shows only the heading and checklist. Each row has the verb highlighted, a plain-English meaning (from the page) and a "Stuck on this criterion?" WhatsApp link with prefilled text, e.g. "Hi, I'm working on CMI Unit 307 (Level 3), criterion 1.1. Source: checklist-307."
- Word-count planner: introduction 10% and conclusion 8% by default (adjustable); learning outcomes share the rest in proportion to their number of criteria; every figure rounded to the nearest 10 and the table adds up (largest-remainder rounding). Allowed range is plus or minus 10% of the entered figure. Inputs are validated (500 to 20,000 words; shares 0 to 30% each, 50% together) with friendly messages.
- Outline: Introduction, one section per learning outcome (criterion numbers plus one question per criterion built only from its wording), Conclusion, References. Copy and Download as .txt. Prompts are questions ("Ask yourself: what does '...' need you to show, and what evidence will you use?"), never content.
- Without JavaScript (or if it fails): the tab bar stays hidden, a note says the tabs need JavaScript, and the full checklist stays visible. The planner and outline are off.

## Decisions to review

1. **Starting word count for a range.** Unit 307 (Level 3) states a range (2,000 to 2,500). The box starts at the middle, 2,250, and the note says so. Change `defaultWordCount()` in `logic.js` if you would rather it start empty.
2. **Allowed range.** The brief said plus or minus 10%. It is applied to the figure the student enters (so 2,250 gives 2,025 to 2,475), not to the syllabus range.
3. **Extra control.** A "Print checklist" button was added next to "Clear ticks", because a plain print of the whole page cannot be made to print only the checklist. It is a tool control, not a call to action.
4. **Level in the WhatsApp text** is the qualification level the page is filed under (from "According to the CMI Level N syllabus"), so Level 4 qualification units coded 5001, 5012 and 5014 say Level 4.
5. **Local preview config.** Previews in this workspace read `C:\Users\lenevo\53O\.claude\launch.json`; a `cmi-tmp-preview` entry pointing at this repo was added there. An untracked `.claude/launch.json` was also created inside the repo and is not committed.

## Testing done

- `npm test`: 21 tests, all passing (parser, failure modes, allocation, validation, outline, WhatsApp number).
- `npm run build`: 126 pages, no errors. Internal link check: 126 pages, 0 broken links.
- Non-pilot pages byte-identical to the previous build (121 of 126); pilot pages differ only by the inserted section, the stylesheet and script tags, and a few bytes of whitespace.
- Browser, built preview, desktop and 375px: all five pilot pages render with no horizontal overflow; tick, reload, persist and clear; arrow, Home and End keys move through the tabs; planner arithmetic, rounding and every validation message; outline text, Copy (real click) and download; the Level 5 empty-box path.
- Accessibility measured on Unit 307: every text and control combination passes 4.5:1 (lowest 5.86:1), all inputs labelled, no duplicate ids, tabs wired to panels (`aria-controls` / `aria-labelledby`, roving tabindex), three polite live regions, in-text links underlined, tap targets at least 44px, visible focus ring on inputs and buttons.
- Not tested: a real print preview (the print rules were applied on screen and checked), screen readers, and other browsers.

## Rolling out to all units

1. In each unit page's frontmatter, change `layout: ../../layouts/UnitPage.astro` to `layout: ../../layouts/UnitPageTools.astro`. For all 89:
   `sed -i 's#^layout: ../../layouts/UnitPage.astro#layout: ../../layouts/UnitPageTools.astro#' src/pages/cmi-*-assignment-help/index.md`
2. `npm test`, then `npm run build`. The build stops with a message naming the unit if any page's criteria disagree with its stated counts. (The tests already parse all 86 selector units successfully today.)
3. Re-run the link check, and compare the build with the previous one to confirm only unit pages changed.
4. Roll out by level if you prefer, and add the Level 5 word-count figures first so the planner can start filled in.
5. To switch a unit off, change its `layout:` line back.

## Follow-ups (not done here)

- **Privacy policy:** it should mention that the checklist saves a list of ticked criterion numbers in the visitor's own browser (localStorage, key `cmi-unit-tools:checklist:<code>`), that it never leaves the device, and how to clear it ("Clear ticks" or clearing site data). The legal pages and cookie banner were not edited.
- Add word-count guidelines to the 26 Level 5 unit pages (see the data gap).
- Review the Level 3 range handling (decisions 1 and 2) once real students have used the planner.
