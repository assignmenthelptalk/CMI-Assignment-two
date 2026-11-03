# Level 5 hub: link audit

Page: `/cmi-level-5-assignment-help/` ("CMI Level 5 Assignment Help | Management and Leadership Diploma"), source `src/pages/cmi-level-5-assignment-help/index.astro`.

The audit reads the built HTML of the hub from `main` at `875bac2` (before this branch). "Body" means everything inside `<main>`; the header, footer and cookie banner are counted separately and are not changed.

## Before: link counts by target type

| Target type | Body | Header and footer | Whole page |
|---|---:|---:|---:|
| Other level hub pages | 7 | 5 | 12 |
| Unit pages | 3 | 0 | 3 |
| "All Level 5 units" list page | 1 | 0 | 1 |
| Guide pages | 17 | 5 | 22 |
| Service pages | 6 | 8 | 14 |
| Home page | 1 | 1 | 2 |
| WhatsApp | 4 | 2 | 6 |
| Anchors (on this page) | 6 | 0 | 6 |
| External (mailto) | 0 | 1 | 1 |
| **Total** | **45** | **22** | **67** |

Service pages in the body: report writing help (3 links), assignment tutoring (2), assignment writing service (1). In the header and footer: writing service, tutoring, coursework help, privacy policy, terms, refund policy, academic integrity (the legal pages are counted as service/other by the script).

## Before: links in the body, in page order

| # | Section | Target | Type |
|---|---|---|---|
| 1 | Unit finder (shown only without JavaScript) | `/cmi-level-5-units/` | all-units list |
| 2 | Quote link under the finder | WhatsApp | WhatsApp |
| 3-8 | On this page | six anchors | anchor |
| 9-11 | Featured units (501, 502, 507) | unit pages | unit |
| 12 | What is the CMI Level 5 qualification | home page | home |
| 13 | What is the CMI Level 5 qualification | Level 5 vs Level 7 guide | guide |
| 14 | How units are assessed | assignment structure guide | guide |
| 15 | How units are assessed | report writing help | service |
| 16 | Command verbs | command verbs guide | guide |
| 17 | Grading | resubmission guide | guide |
| 18 | Mid-page call to action | WhatsApp | WhatsApp |
| 19 | NHS managers | NHS management guide | guide |
| 20-21 | Pathway | Level 6 hub, Level 7 hub | hub |
| 22-23 | Pathway | membership grades guide, Level 5 vs Level 7 guide | guide |
| 24 | How to get help | WhatsApp | WhatsApp |
| 25 | How to get help | assignment tutoring | service |
| 26-34 | Resources and related pages (9 cards) | writing service, tutoring, report writing help, command verbs, assignment structure, Level 5 vs 7, NHS, Level 4 hub, report writing help again | 4 service, 4 guide, 1 hub |
| 35 | Guides for CMI Level 5 (lead) | membership grades guide | guide |
| 36-39 | Guides for CMI Level 5 (4 cards) | Harvard referencing, management theory, reflective practice, is CMI worth it | guide |
| 40 | Other CMI levels (lead) | CMI qualification levels explained | guide |
| 41-44 | Other CMI levels (4 cards) | Level 3, 4, 6, 7 hubs | hub |
| 45 | Closing call to action | WhatsApp | WhatsApp |

## Before: targets linked more than once in the body

| Target | Times | Sections that create the duplicate |
|---|---:|---|
| Level 5 vs Level 7 guide | 3 | What is the qualification, Pathway, Resources cards |
| Report writing help | 3 | How units are assessed, Resources cards (twice, two different cards) |
| Assignment structure guide | 2 | How units are assessed, Resources cards |
| Command verbs guide | 2 | Command verbs, Resources cards |
| NHS management guide | 2 | NHS managers, Resources cards |
| Membership grades guide | 2 | Pathway, Guides lead |
| Assignment tutoring | 2 | How to get help, Resources cards |
| Level 6 hub | 2 | Pathway, Other CMI levels |
| Level 7 hub | 2 | Pathway, Other CMI levels |
| Level 4 hub | 2 | Resources cards, Other CMI levels |

No unit page is linked more than once: the featured units (501, 502, 507) each have one link, and the finder is a dropdown with no links.

## Inbound links from the rest of the site (before)

Counted over every other page in the build (header, footer and body), so a target in the main navigation shows 125 pages. This is what decides whether a link can be removed from the hub without leaving a page orphaned.

| Target | Links from other pages | From how many pages |
|---|---:|---:|
| Home page | 140 | 125 |
| Level 5 vs Level 7 guide | 144 | 125 |
| Membership grades guide | 145 | 125 |
| Assignment tutoring | 144 | 125 |
| Assignment writing service | 245 | 125 |
| Is CMI worth it guide | 135 | 125 |
| Qualification levels explained guide | 137 | 125 |
| Command verbs guide | 247 | 125 |
| Level 3, 4, 6, 7 hubs | 162 to 177 | 125 |
| Harvard referencing guide | 101 | 99 |
| Management theory guide | 54 | 54 |
| Assignment structure guide | 21 | 15 |
| Reflective practice guide | 18 | 16 |
| NHS management guide | 15 | 14 |
| Resubmission guide | 11 | 10 |
| Report writing help | 7 | 6 |
| "All Level 5 units" list | 30 | 30 |
| Unit 501, 502, 507 | 13, 8, 4 | 13, 8, 4 |

Every target has at least 7 links from at least 6 other pages, so none loses its last inbound link if the hub stops linking to it.

## After: link counts by target type

Built from `feat/level5-hub-cleanup`. Header, footer and cookie banner are unchanged.

| Target type | Body before | Body after | Whole page before | Whole page after |
|---|---:|---:|---:|---:|
| Other level hub pages | 7 | 4 | 12 | 9 |
| Unit pages | 3 | 3 | 3 | 3 |
| "All Level 5 units" list page | 1 | 1 | 1 | 1 |
| Guide pages | 17 | 2 | 22 | 7 |
| Service pages | 6 | 0 | 14 | 8 |
| Home page | 1 | 0 | 2 | 1 |
| WhatsApp | 4 | 4 | 6 | 6 |
| Anchors (on this page) | 6 | 6 | 6 | 6 |
| External (mailto, footer) | 0 | 0 | 1 | 1 |
| **Total** | **45** | **20** | **67** | **42** |

No target is linked more than once in the body any more.

Body links after, in page order: the finder's no-JavaScript fallback (all Level 5 units), the quote link, six anchors, the command verbs guide (Command verbs section), the mid-page WhatsApp button, the NHS management guide (NHS section), the "Order on WhatsApp" button, the three featured unit pages (501, 502, 507), the Level 3, 4, 6 and 7 hubs (Other CMI levels), and the closing WhatsApp button.

## Page order after

Intro, unit finder, quote link, "On this page", facts strip, What is the qualification, How units are assessed, Command verbs, Grading, mid-page call to action, NHS managers, Pathway, How to get help, Featured units, FAQ, Other CMI levels, closing call to action.

## What was removed

- The "CMI Level 5 Resources and Related Pages" block (9 cards) and the "Guides for CMI Level 5" block (4 cards and a lead paragraph). That is two h2 headings, 13 h3 card titles and the card descriptions. No link in either block was the last inbound link to its target.
- Links inside body sentences to the home page, Level 5 vs Level 7 guide (twice), assignment structure guide, report writing help, resubmission guide, Level 6 and Level 7 hubs (in the Pathway paragraph), membership grades guide, assignment tutoring and the qualification levels guide. The words stay as plain text; no sentence was changed.
- The links to the command verbs guide and the NHS management guide stay, one each, in the section where they are relevant.

## Pages whose inbound links changed

Only the hub changed, so only the links coming from the hub changed. "Other pages" is the number of links from the rest of the site, which did not change.

| Target | From the hub, before | From the hub, after | From other pages |
|---|---:|---:|---|
| Home page | 1 | 0 | 140 links, 125 pages |
| Assignment tutoring | 2 | 0 | 144, 125 |
| Assignment writing service | 1 | 0 | 245, 125 |
| Report writing help | 3 | 0 | 7, 6 |
| Assignment structure guide | 2 | 0 | 21, 15 |
| Level 5 vs Level 7 guide | 3 | 0 | 144, 125 |
| Membership grades guide | 2 | 0 | 145, 125 |
| Qualification levels explained guide | 1 | 0 | 137, 125 |
| Reflective practice guide | 1 | 0 | 18, 16 |
| Resubmission guide | 1 | 0 | 11, 10 |
| Harvard referencing guide | 1 | 0 | 101, 99 |
| Management theory guide | 1 | 0 | 54, 54 |
| Is CMI worth it guide | 1 | 0 | 135, 125 |
| Level 4 hub | 2 | 1 | 162, 125 |
| Level 6 hub | 2 | 1 | 163, 125 |
| Level 7 hub | 2 | 1 | 177, 125 |
| Command verbs guide | 2 | 1 | 247, 125 |
| NHS management guide | 2 | 1 | 15, 14 |

No page was left with zero internal links pointing to it. The lowest remaining counts are report writing help (7 links from 6 pages), the resubmission guide (11 from 10), the NHS guide (15 from 14) and the reflective practice guide (18 from 16).

## Facts strip: where each figure comes from

| Figure | Source |
|---|---|
| 26 (Level 5 units) | Counted at build time from `src/data/units.json` (`units['5'].length`, 26 entries, 501 to 526). `src/data/featuredUnits.js` also says 26 (`levelInfo[5].count`). |
| fCMgr | Not a number. The page's own copy states it ("eligible for Foundation Chartered Manager (fCMgr)" in the qualification and Pathway sections). |
| Pass / Refer | Not a number. The page's own copy states it ("graded Pass or Refer" in the Grading section). |

"Fixed quote in 2 hours" is not in the strip, but it appears in the intro, the note under the quote link, the mid-page call to action and the "How to get help" steps. No file in the repo holds it as data, so it cannot be traced; it is existing copy and was left as it was.

## Decisions

- Kept the featured units block (501, 502, 507) as the one unit list. The finder is a dropdown with no links, so nothing duplicates the featured block.
- Kept the finder's no-JavaScript fallback link to the all-units page. It is part of the finder component and is hidden when JavaScript runs.
- Removed the home page link from the "part of CMI Assignment Help UK" sentence, because it is not one of the allowed link types. The header logo and footer still link home.
- Kept all four WhatsApp links (quote link, mid-page button, order button, closing call to action). They are contact links, not outbound navigation.
- There is no visible breadcrumb on this page (only structured data), and none was added.
- The Level 4 hub card in the removed Resources block was a duplicate of the one in "Other CMI levels", which stays.
