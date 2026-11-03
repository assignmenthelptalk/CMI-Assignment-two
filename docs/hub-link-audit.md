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
