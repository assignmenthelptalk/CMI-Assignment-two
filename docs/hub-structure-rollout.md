# Level 3, 4, 6 and 7 hubs: Level 5 structure and link cleanup

The Level 5 hub (`docs/hub-link-audit.md`) was restructured and its links reduced. This applies the same to the Level 3, 4, 6 and 7 hubs. The Level 5 page is unchanged and its built HTML is byte-identical to `main` at `4be7636`.

"Body" means everything inside `<main>`. The header, footer and cookie banner are counted separately and were not changed. Counts come from the built HTML of `main` (before) and of this branch (after).

## What changed on each hub

Page order is now: intro, unit finder, text-only quote link, "On this page", facts strip, the explanatory sections, "How to get help", featured units, FAQ, "Other CMI levels", closing call to action.

- Hero buttons and the header image removed (Level 4 also lost its second hero button and its three hero badges, which became the facts strip). The hero note moved under the quote link.
- Unit finder moved up to sit directly under the intro. Its heading is the existing "Find Your CMI Level N Unit" h2 (same id). The text that sat in the lead paragraph is split around the finder with no wording changed.
- "See all N units" button removed from the featured units, as on Level 5. The finder keeps its own no-JavaScript link to the all-units page.
- "On this page": a short list of six existing h2s (same ids and text), open on wide screens, collapsed under 768px. It replaces the shared "In This Article" list on these four pages only; the shared component is unchanged.
- Facts strip: the unit count (counted from `src/data/units.json`: 21, 12, 14, 16), "L3/L4/L6/L7 RQF Level" and "Pass or Refer Grading". The RQF level and Pass or Refer are stated in each page's own copy.
- Featured units block moved to just above the FAQ.
- Removed the "Related ... services/resources" block and the "Guides for CMI Level N" block on each hub, and made the in-text site links plain text, except the command verbs guide (kept on every hub) and the NHS management guide (kept on Level 7 only, in its NHS section, as on Level 5 and before this change). The words of every sentence are unchanged.
- Level 6: the two "CMI Level 5/7 assignment help →" buttons in the comparison cards were removed, because the same hubs are linked once in "Other CMI levels".
- Level 4: the "Level 5 coded units in the Level 4 Diploma" heading, paragraph and unit list moved with the featured units (above the FAQ). Its paragraph links to the all Level 4 units page, which is also the finder's no-JavaScript fallback, so that page is linked twice in the HTML (one of the two is hidden when JavaScript runs).

Titles, meta descriptions, canonicals, H1s and JSON-LD are identical to before on all four pages. Every h2 that stays has the same id and text.

New hub-only components: `HubContents`, `HubQuoteLink`, `HubFacts` (scoped styles copied from the Level 5 page). Only these four pages import them.

## Link counts

| Hub | Body before | Body after | Whole page before | Whole page after |
|---|--:|--:|--:|--:|
| Level 3 | 27 | 18 | 49 | 40 |
| Level 4 | 34 | 19 | 56 | 41 |
| Level 6 | 33 | 18 | 55 | 40 |
| Level 7 | 35 | 19 | 57 | 41 |
| Level 5 (reference) | 20 | 20 | 42 | 42 |

Body links by type, before to after:

| Type | L3 | L4 | L6 | L7 |
|---|---|---|---|---|
| Other level hubs | 6 to 4 | 10 to 4 | 10 to 4 | 6 to 4 |
| Unit pages | 3 to 3 | 3 to 3 | 3 to 3 | 3 to 3 |
| All-units list | 2 to 1 | 3 to 2 | 2 to 1 | 2 to 1 |
| Guides | 10 to 1 | 10 to 1 | 12 to 1 | 17 to 2 |
| Service pages | 2 to 0 | 4 to 0 | 2 to 0 | 3 to 0 |
| Home page | 1 to 0 | 1 to 0 | 1 to 0 | 1 to 0 |
| WhatsApp | 3 to 3 | 3 to 3 | 3 to 3 | 3 to 3 |
| Anchors on the page | 0 to 6 | 0 to 6 | 0 to 6 | 0 to 6 |

No target is linked more than once in the body, except the Level 4 all-units page (see above). The four "Other CMI levels" cards on each hub are the only hub links.

## Inbound links

No page was left without an internal link pointing to it: no target that had links from other pages before has none now. Targets whose total inbound count fell are all linked from at least 4 other pages. The lowest after the change:

| Target | Links from other pages | From pages |
|---|--:|--:|
| Report writing help | 5 | 4 |
| Resubmission guide | 7 | 6 |
| NHS management guide | 14 | 13 |
| Assignment structure guide | 16 | 11 |
| Reflective practice guide | 16 | 14 |

Everything else is linked from at least 16 other pages, most from every page through the header or footer.

## Facts strip: where each figure comes from

| Figure | Source |
|---|---|
| 21, 12, 14, 16 (units) | `units['3'].length`, `units['4'].length`, `units['6'].length`, `units['7'].length` in `src/data/units.json`, counted at build time. `src/data/featuredUnits.js` agrees (`levelInfo[n].count`). Level 4's 12 is nine Level 4 coded units plus three Level 5 coded units, as the page states. |
| L3, L4, L6, L7 (RQF Level) | Not a computed figure: each page's copy says "RQF Level N". |
| Pass or Refer | Not a number: each page's copy says "graded Pass or Refer". |

## Checks

- Build: 126 pages, no errors. Link check: 0 broken.
- Byte comparison with `main`: 129 files compared, 4 differ (the four hubs); every other page, the sitemap and robots are identical.
- Browser: at 1280 px and 375 px, no sideways scroll; the unit finder button ends inside the first 812 px on all four hubs at 375 px; "On this page" is open on wide screens and collapsed on phones; every jump link lands its heading about 80 px from the top, clear of the sticky header; no console errors.
