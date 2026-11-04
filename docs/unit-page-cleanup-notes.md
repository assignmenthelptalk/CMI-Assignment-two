# Unit page cleanup: pilot notes

Branch `feat/unit-page-cleanup-pilot`, started from `main` at `ef3b703`. Pilot units: **307, 4008, 501, 611, 711**. Every other unit page must stay byte-identical.

This file is written in the order of the brief. Section 0 is the audit, committed before any page was changed. The later sections are added with the changes.

## 0. Audit (nothing was changed to produce this)

Measured on a build of `main` at `ef3b703` (126 pages) and on the source files. Built output was read from `dist/`; browser checks used the built preview at 375px and 1280px.

### 0.1 Links on the five pilot pages, by target type

"Body" is everything inside `<article>` (the markdown content plus the study tools). "Chrome" is everything outside it: header, mobile menu, footer.

| Target type | 307 body | 4008 body | 501 body | 611 body | 711 body | Chrome (same on all five) |
|---|--:|--:|--:|--:|--:|--:|
| Sibling units (same level) | 3 | 3 | 3 | 3 | 3 | 0 |
| Own-level hub and unit list | 2 | 2 | 2 | 2 | 2 | 1 (header nav) |
| Other levels (hub pages) | 0 | 0 | 0 | 0 | 0 | 4 (header nav) |
| Guides | 2 | 2 | 5 | 3 | 3 | 5 (header nav) |
| Service pages | 1 | 1 | 1 | 1 | 1 | 3 (header nav: writing service, tutoring, coursework help) |
| WhatsApp | 13 | 13 | 15 | 9 | 8 | 2 ("WhatsApp Us" in the header and in the mobile menu) |
| External | 0 | 0 | 0 | 0 | 0 | 1 (`mailto:` contact in the footer) |
| Anchors (`#...`) | 0 | 0 | 0 | 0 | 0 | 0 |
| Home, legal and policy | 0 | 0 | 0 | 0 | 0 | 6 (home, privacy policy twice, terms, refund policy, academic integrity) |
| **Total** | 21 | 21 | 26 | 18 | 17 | 22 |

Where the body WhatsApp links come from: one "Get a Unit N Quote on WhatsApp" link under the title, one link in the intro paragraph, one "Stuck on this criterion?" link per criterion row (10, 10, 12, 6 and 5 rows), and one link under the FAQ answer. 307 and 4008 therefore have 13, 501 has 15, 611 has 9 and 711 has 8.

The body service-page link on every pilot is "CMI Assignment Writing Service" in the "Related CMI Level N units" list. The body guide links are the command verbs guide (in the related list) plus the guides under "More on this unit's topics".

### 0.2 The floating "Chat with us" widget

- **What adds it:** `src/components/ChatWidget.astro`, rendered by `src/layouts/Layout.astro` (line 100, `<ChatWidget />`). It is a tawk.to live chat. The component sets `Tawk_API`, adds a real `<button id="chat-trigger" class="chat-trigger">Chat with us</button>`, and loads `https://embed.tawk.to/<property>/<widget>` (a script from tawk.to, which then loads `twk-main.js` and creates two "Chat widget" iframes). tawk.to's own bubble is hidden with `hideWidget()` once it has loaded, and the site's own button is shown instead.
- **Which pages:** every page that uses `Layout.astro`, so all pages, including all unit pages. The component's own comment says it loads whatever the cookie banner choice is, and that the Privacy Policy discloses it.
- **Behaviour:** hidden until tawk.to's `onLoad` fires; click hides the button and opens the chat window; minimising the chat brings the button back. `position: fixed; right: 20px; bottom: 20px; z-index: 240`, 48px high, about 148px wide.
- **Overlap at 375px (Unit 4008, measured):** it overlaps content. The button sits over the right-hand part of the page text column at every scroll position tested (49 of 49 positions down the 10,487px page; the element under it was body text each time). In the screenshot of the top of the page it covers part of the intro paragraph ("u...", "pla..."). With the cookie banner showing, the site's own rule lifts it to `bottom: 14rem` on phones (it sat at 540 to 588px of the 812px screen), so it also floats mid-screen over text until the banner is dismissed. No horizontal overflow is caused by it.
- **At 1280px:** no overlap with the 860px article column (it sits in the right margin).
- **Proposed fix (not applied, as instructed):** on screens under 640px show an icon-only 48px round button (keep the visible text for screen readers with `aria-label="Chat with us"` or visually hidden text), and keep it in the bottom-right. That cuts the covered area from about 148px to 48px wide. Optionally add `padding-bottom` of about 72px to the page content on phones so the last line of the footer is never under it. If it must stay as it is, the fallback is to leave it and rely on the fact that the page can be scrolled so text moves from under it. Changing `ChatWidget.astro` changes every page, so it needs its own roll-out and byte-compare.

### 0.3 Are the FAQ answers in structured data (JSON-LD)?

No, not on unit pages. Each pilot page has three JSON-LD blocks, all from `Layout.astro`: Organization, WebSite and BreadcrumbList. None of them is a `FAQPage`, and the FAQ text does not appear in any of them. The unit pages are markdown and pass no page schema, so there is no FAQ answer to keep in step. **Step 1a therefore changes no structured data.** (The guides and service pages do have `FAQPage` schema; they are not touched.)

### 0.4 Where command verb definitions exist, and which verbs the pilots use

Definitions in the repo:

1. **Each unit page's own section "What the command verbs ask for in this unit"** (all 89 pages): one plain-English line per verb, listing the criteria that use it. This is what `src/lib/unit-tools-data.js` already reads for the "In plain English" lines. It is the source for the legend and the verb panel.
2. **`src/pages/guides/cmi-command-verbs-explained/index.astro`:** longer explanations of Identify, Describe, Explain, Discuss, Analyse, Examine, Evaluate, Justify, Assess, the "Critically" verbs, and Develop, Propose and Recommend, plus a three-group hierarchy (lines 84 to 106): **Show Knowledge** (Identify, Define, Describe, Outline, Explain, Summarise), **Analyse and Judge** (Discuss, Analyse, Examine, Assess, Evaluate, Justify) and **Critique and Build** (Critically appraise, Critically assess, Critically evaluate, Develop, Propose, Recommend). This is the only place the repo says anything like "depth expected".
3. `docs/spec-versions.md` has verb counts per level (not definitions).

Verbs used by each pilot, with where a definition and a depth group exist:

| Unit | Verb | Meaning on the unit page | Section in the guide | Depth group in the guide |
|---|---|---|---|---|
| 307 | Explain | yes | yes | Show Knowledge |
| 307 | Discuss | yes | yes | Analyse and Judge |
| 307 | Summarise | yes | no (named in the group only) | Show Knowledge |
| 307 | Outline | yes | no (named in the group only) | Show Knowledge |
| 307 | Compare | yes | no | none |
| 4008 | Describe | yes | yes | Show Knowledge |
| 4008 | Discuss | yes | yes | Analyse and Judge |
| 4008 | Analyse | yes | yes | Analyse and Judge |
| 4008 | Devise | yes | no | none |
| 4008 | Identify | yes | yes | Show Knowledge |
| 4008 | Provide | yes | no | none |
| 501 | Examine | yes | yes | Analyse and Judge |
| 501 | Analyse | yes | yes | Analyse and Judge |
| 501 | Discuss | yes | yes | Analyse and Judge |
| 501 | Evaluate | yes | yes | Analyse and Judge |
| 501 | Assess | yes | yes | Analyse and Judge |
| 501 | Develop | yes | yes | Critique and Build |
| 611 | Investigate | yes | no | none |
| 611 | Critically appraise | yes | yes | Critique and Build |
| 611 | Evaluate | yes | yes | Analyse and Judge |
| 611 | Develop | yes | yes | Critique and Build |
| 611 | Recommend | yes | yes | Critique and Build |
| 711 | Critically appraise | yes | yes | Critique and Build |
| 711 | Assess | yes | yes | Analyse and Judge |
| 711 | Formulate | yes | no | none |
| 711 | Propose | yes | yes | Critique and Build |

Gaps: every verb has a meaning on its own unit page, so none needs to be listed without a meaning. Five verbs have no depth group anywhere in the repo: **Compare** (307), **Devise** and **Provide** (4008), **Investigate** (611) and **Formulate** (711). Their panel entries show the meaning but no depth line.

### 0.5 "Last reviewed" and specification-version information

- `docs/spec-versions.md` holds it: "Last verified: **31 October 2026** (all rows below)", with versions Level 3 **v16**, Level 4 **v12**, Level 5 **v26**, Level 6 **v09** (main document plus the Group B units document) and Level 7 **v10**, and the document dates (October 2024, July 2026, June 2026, July 2026, August 2026).
- Each unit page already says "According to the CMI Level N syllabus (Month Year)", which is the syllabus document date. No unit page carries a version number or a "last reviewed" line. No per-unit review date exists; the 31 October 2026 date is a single verification date for every level.
- So a "Last reviewed October 2026 against the CMI Level N specification vNN" line can be written for all five pilots from repo values. The date is the one verification date, not a per-unit date; this is flagged in the decisions section.

### 0.6 Other facts the audit turned up

- **The FAQ question text does not match the brief.** The brief names the question "What does Unit [code] assignment help on this unit include?". On all five pages it reads "What does Unit [code] assignment help from us include?". The brief also says to keep the question unchanged, so the existing wording is kept.
- **There is no separate closing call to action on the unit pages.** `Layout.astro` has a `.cta-section` style but unit pages do not use it. The only call to action at the bottom of a unit page today is the FAQ answer and the WhatsApp link under it. Steps 1a and 4 turn the FAQ answer into plain text with no link, so after this branch the bottom of the page carries no WhatsApp link of its own (the header button, the mobile menu link, the per-criterion links and the floating widget remain). Nothing was invented to fill the gap. See the decisions section.
- **The header image on 4008 still says "Unit 408".** The image text is from the old numbering (`cmi-4008-assignment-help.webp` shows "CMI Unit 408 Assignment Help"). Removing the image on the pilots (step 6) also removes that inconsistency.
- **The meta descriptions carry the claims.** Every pilot description ends "UK CMI writers, quote in 2 hours.", and `Layout.astro` line 33 describes the organisation as an "Independent UK-based CMI assignment writing and tutoring service". The brief does not allow metadata or sitewide changes, so these are reported, not changed.

### 0.7 Inbound internal links before any change

Distinct pages that link to each target, counted from the built site (125 other pages exist). "Elsewhere" is every page except the pilot articles' bodies, so it includes the header, footer, hub pages and the other unit pages.

| Target | Pages linking to it | From the five pilot bodies | Elsewhere |
|---|--:|--:|--:|
| /cmi-assignment-writing-service/ | 125 | 5 | 125 (header nav on every page) |
| /guides/cmi-command-verbs-explained/ | 125 | 5 | 125 (header nav) |
| /guides/harvard-referencing-cmi/ | 95 | 5 | 90 |
| /guides/management-theory-cmi-assignments/ | 50 | 3 | 47 |
| /guides/cmi-level-5-vs-level-7/ | 125 | 1 | 125 (header nav) |
| /guides/cmi-membership-levels-acmi-mcmi-fcmi/ | 125 | 1 | 125 (header nav) |

### 0.8 The same claims elsewhere in the repo (reported, not changed)

Searched `src` and `public` for the five phrases in the brief ("UK-based CMI-qualified", "fixed quote", "within 2 hours", "submission-ready", "written to your unit criteria") and, separately, close variants. The type is a heuristic from the line: meta description, structured data, FAQ answer, title or page copy. Line numbers are for `main` at `ef3b703`. Pilot lines are listed too, because they are changed on this branch.

### Claim phrases named in the brief (exact)

#### Exact phrases

**Pilot unit pages (changed on this branch)** (20 matching lines)

- "UK-based CMI-qualified": 5 files
  - `src/pages/cmi-307-assignment-help/index.md`: lines 101 (FAQ answer)
  - `src/pages/cmi-4008-assignment-help/index.md`: lines 98 (FAQ answer)
  - `src/pages/cmi-501-assignment-help/index.md`: lines 114 (FAQ answer)
  - `src/pages/cmi-611-assignment-help/index.md`: lines 101 (FAQ answer)
  - `src/pages/cmi-711-assignment-help/index.md`: lines 94 (FAQ answer)
- "fixed quote": 5 files
  - `src/pages/cmi-307-assignment-help/index.md`: lines 101 (FAQ answer)
  - `src/pages/cmi-4008-assignment-help/index.md`: lines 98 (FAQ answer)
  - `src/pages/cmi-501-assignment-help/index.md`: lines 114 (FAQ answer)
  - `src/pages/cmi-611-assignment-help/index.md`: lines 101 (FAQ answer)
  - `src/pages/cmi-711-assignment-help/index.md`: lines 94 (FAQ answer)
- "within 2 hours": 5 files
  - `src/pages/cmi-307-assignment-help/index.md`: lines 101 (FAQ answer)
  - `src/pages/cmi-4008-assignment-help/index.md`: lines 98 (FAQ answer)
  - `src/pages/cmi-501-assignment-help/index.md`: lines 114 (FAQ answer)
  - `src/pages/cmi-611-assignment-help/index.md`: lines 101 (FAQ answer)
  - `src/pages/cmi-711-assignment-help/index.md`: lines 94 (FAQ answer)
- "submission-ready": 5 files
  - `src/pages/cmi-307-assignment-help/index.md`: lines 113 (page copy)
  - `src/pages/cmi-4008-assignment-help/index.md`: lines 110 (page copy)
  - `src/pages/cmi-501-assignment-help/index.md`: lines 126 (page copy)
  - `src/pages/cmi-611-assignment-help/index.md`: lines 113 (page copy)
  - `src/pages/cmi-711-assignment-help/index.md`: lines 106 (page copy)

**Other unit pages (not changed)** (336 matching lines)

- "UK-based CMI-qualified": 84 files
  - (FAQ answer): 84 files, e.g. src/pages/cmi-301-assignment-help/index.md
  - every file and line: see the appendix list below
- "fixed quote": 84 files
  - (FAQ answer): 84 files, e.g. src/pages/cmi-301-assignment-help/index.md
  - every file and line: see the appendix list below
- "within 2 hours": 84 files
  - (FAQ answer): 84 files, e.g. src/pages/cmi-301-assignment-help/index.md
  - every file and line: see the appendix list below
- "submission-ready": 84 files
  - (page copy): 84 files, e.g. src/pages/cmi-301-assignment-help/index.md
  - every file and line: see the appendix list below

**Level hub pages** (38 matching lines)

- "fixed quote": 5 files
  - `src/pages/cmi-level-3-assignment-help/index.astro`: lines 97 (page copy), 206 (page copy), 268 (page copy)
  - `src/pages/cmi-level-4-assignment-help/index.astro`: lines 140 (page copy), 406 (page copy), 566 (page copy)
  - `src/pages/cmi-level-5-assignment-help/index.astro`: lines 91 (structured data), 143 (page copy), 416 (page copy), 507 (page copy), 608 (FAQ answer), 654 (page copy)
  - `src/pages/cmi-level-6-assignment-help/index.astro`: lines 118 (page copy), 316 (page copy), 409 (page copy)
  - `src/pages/cmi-level-7-assignment-help/index.astro`: lines 127 (page copy), 361 (page copy), 460 (page copy)
- "within 2 hours": 5 files
  - `src/pages/cmi-level-3-assignment-help/index.astro`: lines 206 (page copy)
  - `src/pages/cmi-level-4-assignment-help/index.astro`: lines 408 (page copy)
  - `src/pages/cmi-level-5-assignment-help/index.astro`: lines 507 (page copy), 509 (page copy)
  - `src/pages/cmi-level-6-assignment-help/index.astro`: lines 118 (page copy), 316 (page copy)
  - `src/pages/cmi-level-7-assignment-help/index.astro`: lines 84 (structured data), 121 (page copy), 127 (page copy), 361 (page copy), 420 (FAQ answer)
- "submission-ready": 5 files
  - `src/pages/cmi-level-3-assignment-help/index.astro`: lines 207 (page copy)
  - `src/pages/cmi-level-4-assignment-help/index.astro`: lines 390 (page copy), 415 (page copy)
  - `src/pages/cmi-level-5-assignment-help/index.astro`: lines 516 (page copy)
  - `src/pages/cmi-level-6-assignment-help/index.astro`: lines 317 (page copy)
  - `src/pages/cmi-level-7-assignment-help/index.astro`: lines 362 (page copy)
- "UK-based CMI-qualified": 2 files
  - `src/pages/cmi-level-4-assignment-help/index.astro`: lines 40 (structured data)
  - `src/pages/cmi-level-5-assignment-help/index.astro`: lines 31 (structured data)
- "written to your unit criteria": 1 file
  - `src/pages/cmi-level-4-assignment-help/index.astro`: lines 140 (page copy)

**Guides** (11 matching lines)

- "submission-ready": 1 file
  - `src/pages/guides/cmi-assignment-structure/index.astro`: lines 336 (page copy)
- "fixed quote": 3 files
  - `src/pages/guides/cmi-command-verbs-explained/index.astro`: lines 353 (page copy)
  - `src/pages/guides/cmi-membership-levels-acmi-mcmi-fcmi/index.astro`: lines 295 (page copy)
  - `src/pages/guides/nhs-management-cmi-qualifications/index.astro`: lines 45 (structured data), 287 (page copy), 320 (FAQ answer), 368 (page copy)
- "within 2 hours": 3 files
  - `src/pages/guides/cmi-resubmission-guide/index.md`: lines 129 (page copy), 161 (FAQ answer)
  - `src/pages/guides/is-cmi-qualification-worth-it/index.md`: lines 141 (FAQ answer)
  - `src/pages/guides/management-theory-cmi-assignments/index.md`: lines 172 (FAQ answer)

**Service and other pages** (129 matching lines)

- "fixed quote": 12 files
  - `src/pages/cheap-cmi-assignment-help/index.astro`: lines 42 (structured data), 114 (page copy), 199 (page copy), 247 (page copy), 303 (FAQ answer), 345 (page copy)
  - `src/pages/cmi-assignment-answers/index.astro`: lines 42 (structured data), 50 (structured data), 81 (meta description), 99 (page copy), 291 (page copy), 349 (FAQ answer), 392 (page copy)
  - `src/pages/cmi-assignment-examples/index.astro`: lines 102 (page copy), 289 (page copy)
  - `src/pages/cmi-assignment-help-online/index.astro`: lines 17 (structured data), 49 (structured data), 79 (meta description), 97 (page copy), 140 (page copy), 283 (page copy), 346 (FAQ answer), 393 (page copy)
  - `src/pages/cmi-assignment-tutoring/index.astro`: lines 41 (structured data), 57 (structured data), 93 (page copy), 308 (page copy), 330 (FAQ answer), 377 (page copy)
  - `src/pages/cmi-assignment-writing-service/index.astro`: lines 26 (structured data), 99 (page copy), 364 (page copy), 404 (FAQ answer), 488 (page copy)
  - `src/pages/cmi-coursework-help/index.astro`: lines 99 (page copy), 254 (page copy), 362 (page copy)
  - `src/pages/cmi-essay-writing-help/index.astro`: lines 95 (page copy), 283 (page copy), 389 (page copy)
  - `src/pages/cmi-homework-help/index.astro`: lines 50 (structured data), 91 (page copy), 165 (page copy), 201 (page copy), 282 (FAQ answer), 316 (page copy)
  - `src/pages/cmi-report-writing-help/index.astro`: lines 98 (page copy), 351 (page copy), 425 (page copy)
  - `src/pages/index.astro`: lines 128 (page copy), 275 (page copy), 312 (page copy), 555 (page copy)
  - `src/pages/pay-someone-to-do-my-cmi-assignment/index.astro`: lines 18 (structured data), 50 (structured data), 95 (page copy), 100 (page copy), 226 (page copy), 284 (page copy), 303 (FAQ answer), 340 (FAQ answer), 363 (page copy), 381 (page copy)
- "within 2 hours": 12 files
  - `src/pages/cheap-cmi-assignment-help/index.astro`: lines 114 (page copy), 247 (page copy)
  - `src/pages/cmi-assignment-answers/index.astro`: lines 99 (page copy), 291 (page copy)
  - `src/pages/cmi-assignment-examples/index.astro`: lines 102 (page copy), 289 (page copy)
  - `src/pages/cmi-assignment-help-online/index.astro`: lines 79 (meta description), 97 (page copy), 283 (page copy)
  - `src/pages/cmi-assignment-tutoring/index.astro`: lines 93 (page copy), 308 (page copy)
  - `src/pages/cmi-assignment-writing-service/index.astro`: lines 26 (structured data), 99 (page copy), 364 (page copy)
  - `src/pages/cmi-coursework-help/index.astro`: lines 99 (page copy), 254 (page copy)
  - `src/pages/cmi-essay-writing-help/index.astro`: lines 95 (page copy), 283 (page copy)
  - `src/pages/cmi-homework-help/index.astro`: lines 91 (page copy), 201 (page copy), 316 (page copy)
  - `src/pages/cmi-report-writing-help/index.astro`: lines 98 (page copy), 351 (page copy)
  - `src/pages/index.astro`: lines 128 (page copy), 275 (page copy)
  - `src/pages/pay-someone-to-do-my-cmi-assignment/index.astro`: lines 95 (page copy), 100 (page copy), 226 (page copy)
- "submission-ready": 9 files
  - `src/pages/cmi-assignment-answers/index.astro`: lines 18 (structured data), 119 (page copy), 319 (FAQ answer), 374 (page copy)
  - `src/pages/cmi-assignment-examples/index.astro`: lines 138 (page copy)
  - `src/pages/cmi-assignment-help-online/index.astro`: lines 364 (page copy), 384 (page copy)
  - `src/pages/cmi-assignment-tutoring/index.astro`: lines 33 (structured data), 122 (page copy), 326 (FAQ answer), 355 (page copy)
  - `src/pages/cmi-assignment-writing-service/index.astro`: lines 60 (structured data), 92 (page copy), 106 (page copy), 369 (page copy)
  - `src/pages/cmi-essay-writing-help/index.astro`: lines 287 (page copy)
  - `src/pages/cmi-homework-help/index.astro`: lines 85 (page copy), 298 (page copy)
  - `src/pages/index.astro`: lines 29 (page copy), 134 (page copy), 231 (page copy), 277 (page copy)
  - `src/pages/pay-someone-to-do-my-cmi-assignment/index.astro`: lines 60 (structured data), 115 (page copy), 235 (page copy)
- "UK-based CMI-qualified": 4 files
  - `src/pages/cmi-assignment-answers/index.astro`: lines 89 (FAQ answer)
  - `src/pages/cmi-assignment-writing-service/index.astro`: lines 60 (structured data), 81 (meta description), 89 (FAQ answer), 94 (page copy), 488 (page copy)
  - `src/pages/index.astro`: lines 29 (page copy), 283 (meta description), 556 (page copy)
  - `src/pages/pay-someone-to-do-my-cmi-assignment/index.astro`: lines 60 (structured data), 81 (meta description), 92 (page copy)
- "written to your unit criteria": 1 file
  - `src/pages/cmi-report-writing-help/index.astro`: lines 356 (page copy)


### Close variants (listed so nothing is missed; not named in the brief)

#### Variants

**Pilot unit pages (changed on this branch)** (20 matching lines)

- "quote in 2 hours": 5 files
  - `src/pages/cmi-307-assignment-help/index.md`: lines 4 (meta description)
  - `src/pages/cmi-4008-assignment-help/index.md`: lines 4 (meta description)
  - `src/pages/cmi-501-assignment-help/index.md`: lines 4 (meta description)
  - `src/pages/cmi-611-assignment-help/index.md`: lines 4 (meta description)
  - `src/pages/cmi-711-assignment-help/index.md`: lines 4 (meta description)
- "UK CMI writers / UK-based CMI writers": 5 files
  - `src/pages/cmi-307-assignment-help/index.md`: lines 4 (meta description)
  - `src/pages/cmi-4008-assignment-help/index.md`: lines 4 (meta description)
  - `src/pages/cmi-501-assignment-help/index.md`: lines 4 (meta description)
  - `src/pages/cmi-611-assignment-help/index.md`: lines 4 (meta description)
  - `src/pages/cmi-711-assignment-help/index.md`: lines 4 (meta description)
- "2 hours (other)": 5 files
  - `src/pages/cmi-307-assignment-help/index.md`: lines 4 (meta description), 101 (FAQ answer)
  - `src/pages/cmi-4008-assignment-help/index.md`: lines 4 (meta description), 98 (FAQ answer)
  - `src/pages/cmi-501-assignment-help/index.md`: lines 4 (meta description), 114 (FAQ answer)
  - `src/pages/cmi-611-assignment-help/index.md`: lines 4 (meta description), 101 (FAQ answer)
  - `src/pages/cmi-711-assignment-help/index.md`: lines 4 (meta description), 94 (FAQ answer)

**Other unit pages (not changed)** (333 matching lines)

- "quote in 2 hours": 84 files
  - (meta description): 84 files, e.g. src/pages/cmi-301-assignment-help/index.md
  - every file and line: see the appendix list below
- "UK CMI writers / UK-based CMI writers": 81 files
  - (meta description): 81 files, e.g. src/pages/cmi-301-assignment-help/index.md
  - every file and line: see the appendix list below
- "2 hours (other)": 84 files
  - (meta description): 84 files, e.g. src/pages/cmi-301-assignment-help/index.md
  - (FAQ answer): 84 files, e.g. src/pages/cmi-301-assignment-help/index.md
  - every file and line: see the appendix list below

**Level hub pages** (52 matching lines)

- "UK CMI writers / UK-based CMI writers": 5 files
  - `src/pages/cmi-level-3-assignment-help/index.astro`: lines 39 (structured data), 66 (meta description), 73 (FAQ answer), 268 (page copy)
  - `src/pages/cmi-level-4-assignment-help/index.astro`: lines 101 (meta description), 112 (page copy)
  - `src/pages/cmi-level-5-assignment-help/index.astro`: lines 100 (meta description), 111 (page copy)
  - `src/pages/cmi-level-6-assignment-help/index.astro`: lines 86 (meta description)
  - `src/pages/cmi-level-7-assignment-help/index.astro`: lines 95 (meta description)
- "quote in 2 hours": 5 files
  - `src/pages/cmi-level-3-assignment-help/index.astro`: lines 66 (meta description), 97 (page copy), 268 (page copy)
  - `src/pages/cmi-level-4-assignment-help/index.astro`: lines 101 (meta description), 140 (page copy), 566 (page copy)
  - `src/pages/cmi-level-5-assignment-help/index.astro`: lines 100 (meta description), 143 (page copy), 416 (page copy), 654 (page copy)
  - `src/pages/cmi-level-6-assignment-help/index.astro`: lines 86 (meta description), 409 (page copy)
  - `src/pages/cmi-level-7-assignment-help/index.astro`: lines 95 (meta description), 460 (page copy)
- "2 hours (other)": 5 files
  - `src/pages/cmi-level-3-assignment-help/index.astro`: lines 66 (meta description), 97 (page copy), 206 (page copy), 268 (page copy)
  - `src/pages/cmi-level-4-assignment-help/index.astro`: lines 101 (meta description), 140 (page copy), 408 (page copy), 566 (page copy)
  - `src/pages/cmi-level-5-assignment-help/index.astro`: lines 100 (meta description), 143 (page copy), 416 (page copy), 507 (page copy), 509 (page copy), 654 (page copy)
  - `src/pages/cmi-level-6-assignment-help/index.astro`: lines 86 (meta description), 118 (page copy), 316 (page copy), 409 (page copy)
  - `src/pages/cmi-level-7-assignment-help/index.astro`: lines 84 (structured data), 95 (meta description), 121 (page copy), 127 (page copy), 361 (page copy), 420 (FAQ answer), 460 (page copy)
- "written to your brief / criteria": 3 files
  - `src/pages/cmi-level-3-assignment-help/index.astro`: lines 207 (page copy)
  - `src/pages/cmi-level-6-assignment-help/index.astro`: lines 317 (page copy)
  - `src/pages/cmi-level-7-assignment-help/index.astro`: lines 362 (page copy)

**Guides** (13 matching lines)

- "2 hours (other)": 6 files
  - `src/pages/guides/cmi-command-verbs-explained/index.astro`: lines 353 (page copy)
  - `src/pages/guides/cmi-membership-levels-acmi-mcmi-fcmi/index.astro`: lines 295 (page copy)
  - `src/pages/guides/cmi-resubmission-guide/index.md`: lines 14 (page copy), 129 (page copy), 161 (FAQ answer)
  - `src/pages/guides/is-cmi-qualification-worth-it/index.md`: lines 141 (FAQ answer)
  - `src/pages/guides/management-theory-cmi-assignments/index.md`: lines 172 (FAQ answer)
  - `src/pages/guides/nhs-management-cmi-qualifications/index.astro`: lines 45 (structured data), 288 (page copy), 320 (FAQ answer), 368 (page copy)
- "written to your brief / criteria": 1 file
  - `src/pages/guides/harvard-referencing-cmi/index.md`: lines 190 (FAQ answer)
- "UK CMI writers / UK-based CMI writers": 1 file
  - `src/pages/guides/nhs-management-cmi-qualifications/index.astro`: lines 368 (page copy)

**Service and other pages** (75 matching lines)

- "2 hours (other)": 12 files
  - `src/pages/cheap-cmi-assignment-help/index.astro`: lines 42 (structured data), 95 (meta description), 114 (page copy), 199 (page copy), 247 (page copy), 303 (FAQ answer), 345 (page copy)
  - `src/pages/cmi-assignment-answers/index.astro`: lines 50 (structured data), 81 (meta description), 99 (page copy), 291 (page copy), 360 (FAQ answer), 392 (page copy)
  - `src/pages/cmi-assignment-examples/index.astro`: lines 102 (page copy), 289 (page copy)
  - `src/pages/cmi-assignment-help-online/index.astro`: lines 49 (structured data), 79 (meta description), 97 (page copy), 140 (page copy), 283 (page copy), 346 (FAQ answer), 393 (page copy)
  - `src/pages/cmi-assignment-tutoring/index.astro`: lines 41 (structured data), 93 (page copy), 308 (page copy), 330 (FAQ answer), 377 (page copy)
  - `src/pages/cmi-assignment-writing-service/index.astro`: lines 26 (structured data), 99 (page copy), 364 (page copy), 405 (FAQ answer), 488 (page copy)
  - `src/pages/cmi-coursework-help/index.astro`: lines 99 (page copy), 254 (page copy), 362 (page copy)
  - `src/pages/cmi-essay-writing-help/index.astro`: lines 77 (meta description), 95 (page copy), 283 (page copy), 389 (page copy)
  - `src/pages/cmi-homework-help/index.astro`: lines 50 (structured data), 73 (meta description), 91 (page copy), 201 (page copy), 282 (FAQ answer), 316 (page copy)
  - `src/pages/cmi-report-writing-help/index.astro`: lines 80 (meta description), 98 (page copy), 351 (page copy), 425 (page copy)
  - `src/pages/index.astro`: lines 128 (page copy), 275 (page copy), 312 (page copy), 555 (page copy)
  - `src/pages/pay-someone-to-do-my-cmi-assignment/index.astro`: lines 95 (page copy), 100 (page copy), 226 (page copy), 381 (page copy)
- "quote in 2 hours": 11 files
  - `src/pages/cheap-cmi-assignment-help/index.astro`: lines 95 (meta description), 345 (page copy)
  - `src/pages/cmi-assignment-answers/index.astro`: lines 81 (meta description), 392 (page copy)
  - `src/pages/cmi-assignment-help-online/index.astro`: lines 393 (page copy)
  - `src/pages/cmi-assignment-tutoring/index.astro`: lines 377 (page copy)
  - `src/pages/cmi-assignment-writing-service/index.astro`: lines 488 (page copy)
  - `src/pages/cmi-coursework-help/index.astro`: lines 362 (page copy)
  - `src/pages/cmi-essay-writing-help/index.astro`: lines 77 (meta description), 389 (page copy)
  - `src/pages/cmi-homework-help/index.astro`: lines 73 (meta description)
  - `src/pages/cmi-report-writing-help/index.astro`: lines 80 (meta description), 425 (page copy)
  - `src/pages/index.astro`: lines 312 (page copy), 555 (page copy)
  - `src/pages/pay-someone-to-do-my-cmi-assignment/index.astro`: lines 381 (page copy)
- "written to your brief / criteria": 1 file
  - `src/pages/cmi-report-writing-help/index.astro`: lines 89 (page copy)
- "UK CMI writers / UK-based CMI writers": 1 file
  - `src/pages/index.astro`: lines 294 (page copy)


### Appendix: other unit pages, exact phrases, file and line numbers

- `src/pages/cmi-301-assignment-help/index.md`: UK-based CMI-qualified: 106; fixed quote: 106; within 2 hours: 106; submission-ready: 118
- `src/pages/cmi-302-assignment-help/index.md`: UK-based CMI-qualified: 117; fixed quote: 117; within 2 hours: 117; submission-ready: 129
- `src/pages/cmi-303-assignment-help/index.md`: UK-based CMI-qualified: 106; fixed quote: 106; within 2 hours: 106; submission-ready: 118
- `src/pages/cmi-304-assignment-help/index.md`: UK-based CMI-qualified: 101; fixed quote: 101; within 2 hours: 101; submission-ready: 113
- `src/pages/cmi-305-assignment-help/index.md`: UK-based CMI-qualified: 107; fixed quote: 107; within 2 hours: 107; submission-ready: 119
- `src/pages/cmi-306-assignment-help/index.md`: UK-based CMI-qualified: 110; fixed quote: 110; within 2 hours: 110; submission-ready: 122
- `src/pages/cmi-308-assignment-help/index.md`: UK-based CMI-qualified: 110; fixed quote: 110; within 2 hours: 110; submission-ready: 122
- `src/pages/cmi-309-assignment-help/index.md`: UK-based CMI-qualified: 97; fixed quote: 97; within 2 hours: 97; submission-ready: 109
- `src/pages/cmi-310-assignment-help/index.md`: UK-based CMI-qualified: 100; fixed quote: 100; within 2 hours: 100; submission-ready: 112
- `src/pages/cmi-311-assignment-help/index.md`: UK-based CMI-qualified: 111; fixed quote: 111; within 2 hours: 111; submission-ready: 123
- `src/pages/cmi-312-assignment-help/index.md`: UK-based CMI-qualified: 103; fixed quote: 103; within 2 hours: 103; submission-ready: 115
- `src/pages/cmi-313-assignment-help/index.md`: UK-based CMI-qualified: 107; fixed quote: 107; within 2 hours: 107; submission-ready: 119
- `src/pages/cmi-314-assignment-help/index.md`: UK-based CMI-qualified: 103; fixed quote: 103; within 2 hours: 103; submission-ready: 115
- `src/pages/cmi-315-assignment-help/index.md`: UK-based CMI-qualified: 100; fixed quote: 100; within 2 hours: 100; submission-ready: 112
- `src/pages/cmi-316-assignment-help/index.md`: UK-based CMI-qualified: 97; fixed quote: 97; within 2 hours: 97; submission-ready: 109
- `src/pages/cmi-317-assignment-help/index.md`: UK-based CMI-qualified: 110; fixed quote: 110; within 2 hours: 110; submission-ready: 122
- `src/pages/cmi-318-assignment-help/index.md`: UK-based CMI-qualified: 103; fixed quote: 103; within 2 hours: 103; submission-ready: 115
- `src/pages/cmi-319-assignment-help/index.md`: UK-based CMI-qualified: 102; fixed quote: 102; within 2 hours: 102; submission-ready: 114
- `src/pages/cmi-320-assignment-help/index.md`: UK-based CMI-qualified: 110; fixed quote: 110; within 2 hours: 110; submission-ready: 122
- `src/pages/cmi-321-assignment-help/index.md`: UK-based CMI-qualified: 104; fixed quote: 104; within 2 hours: 104; submission-ready: 116
- `src/pages/cmi-4001-assignment-help/index.md`: UK-based CMI-qualified: 98; fixed quote: 98; within 2 hours: 98; submission-ready: 110
- `src/pages/cmi-4002-assignment-help/index.md`: UK-based CMI-qualified: 89; fixed quote: 89; within 2 hours: 89; submission-ready: 101
- `src/pages/cmi-4003-assignment-help/index.md`: UK-based CMI-qualified: 98; fixed quote: 98; within 2 hours: 98; submission-ready: 110
- `src/pages/cmi-4004-assignment-help/index.md`: UK-based CMI-qualified: 110; fixed quote: 110; within 2 hours: 110; submission-ready: 122
- `src/pages/cmi-4005-assignment-help/index.md`: UK-based CMI-qualified: 94; fixed quote: 94; within 2 hours: 94; submission-ready: 106
- `src/pages/cmi-4006-assignment-help/index.md`: UK-based CMI-qualified: 93; fixed quote: 93; within 2 hours: 93; submission-ready: 105
- `src/pages/cmi-4007-assignment-help/index.md`: UK-based CMI-qualified: 92; fixed quote: 92; within 2 hours: 92; submission-ready: 104
- `src/pages/cmi-4009-assignment-help/index.md`: UK-based CMI-qualified: 102; fixed quote: 102; within 2 hours: 102; submission-ready: 114
- `src/pages/cmi-5001-assignment-help/index.md`: UK-based CMI-qualified: 110; fixed quote: 110; within 2 hours: 110; submission-ready: 122
- `src/pages/cmi-5012-assignment-help/index.md`: UK-based CMI-qualified: 104; fixed quote: 104; within 2 hours: 104; submission-ready: 116
- `src/pages/cmi-5014-assignment-help/index.md`: UK-based CMI-qualified: 105; fixed quote: 105; within 2 hours: 105; submission-ready: 117
- `src/pages/cmi-502-assignment-help/index.md`: UK-based CMI-qualified: 119; fixed quote: 119; within 2 hours: 119; submission-ready: 131
- `src/pages/cmi-503-assignment-help/index.md`: UK-based CMI-qualified: 104; fixed quote: 104; within 2 hours: 104; submission-ready: 116
- `src/pages/cmi-504-assignment-help/index.md`: UK-based CMI-qualified: 89; fixed quote: 89; within 2 hours: 89; submission-ready: 101
- `src/pages/cmi-505-assignment-help/index.md`: UK-based CMI-qualified: 108; fixed quote: 108; within 2 hours: 108; submission-ready: 120
- `src/pages/cmi-506-assignment-help/index.md`: UK-based CMI-qualified: 110; fixed quote: 110; within 2 hours: 110; submission-ready: 122
- `src/pages/cmi-507-assignment-help/index.md`: UK-based CMI-qualified: 112; fixed quote: 112; within 2 hours: 112; submission-ready: 124
- `src/pages/cmi-508-assignment-help/index.md`: UK-based CMI-qualified: 95; fixed quote: 95; within 2 hours: 95; submission-ready: 107
- `src/pages/cmi-509-assignment-help/index.md`: UK-based CMI-qualified: 93; fixed quote: 93; within 2 hours: 93; submission-ready: 105
- `src/pages/cmi-510-assignment-help/index.md`: UK-based CMI-qualified: 93; fixed quote: 93; within 2 hours: 93; submission-ready: 105
- `src/pages/cmi-511-assignment-help/index.md`: UK-based CMI-qualified: 92; fixed quote: 92; within 2 hours: 92; submission-ready: 104
- `src/pages/cmi-512-assignment-help/index.md`: UK-based CMI-qualified: 90; fixed quote: 90; within 2 hours: 90; submission-ready: 102
- `src/pages/cmi-513-assignment-help/index.md`: UK-based CMI-qualified: 102; fixed quote: 102; within 2 hours: 102; submission-ready: 114
- `src/pages/cmi-514-assignment-help/index.md`: UK-based CMI-qualified: 106; fixed quote: 106; within 2 hours: 106; submission-ready: 118
- `src/pages/cmi-515-assignment-help/index.md`: UK-based CMI-qualified: 103; fixed quote: 103; within 2 hours: 103; submission-ready: 115
- `src/pages/cmi-516-assignment-help/index.md`: UK-based CMI-qualified: 99; fixed quote: 99; within 2 hours: 99; submission-ready: 111
- `src/pages/cmi-517-assignment-help/index.md`: UK-based CMI-qualified: 85; fixed quote: 85; within 2 hours: 85; submission-ready: 97
- `src/pages/cmi-518-assignment-help/index.md`: UK-based CMI-qualified: 87; fixed quote: 87; within 2 hours: 87; submission-ready: 99
- `src/pages/cmi-519-assignment-help/index.md`: UK-based CMI-qualified: 109; fixed quote: 109; within 2 hours: 109; submission-ready: 121
- `src/pages/cmi-520-assignment-help/index.md`: UK-based CMI-qualified: 92; fixed quote: 92; within 2 hours: 92; submission-ready: 104
- `src/pages/cmi-521-assignment-help/index.md`: UK-based CMI-qualified: 95; fixed quote: 95; within 2 hours: 95; submission-ready: 107
- `src/pages/cmi-522-assignment-help/index.md`: UK-based CMI-qualified: 96; fixed quote: 96; within 2 hours: 96; submission-ready: 108
- `src/pages/cmi-523-assignment-help/index.md`: UK-based CMI-qualified: 90; fixed quote: 90; within 2 hours: 90; submission-ready: 102
- `src/pages/cmi-524-assignment-help/index.md`: UK-based CMI-qualified: 97; fixed quote: 97; within 2 hours: 97; submission-ready: 109
- `src/pages/cmi-525-assignment-help/index.md`: UK-based CMI-qualified: 100; fixed quote: 100; within 2 hours: 100; submission-ready: 112
- `src/pages/cmi-526-assignment-help/index.md`: UK-based CMI-qualified: 110; fixed quote: 110; within 2 hours: 110; submission-ready: 122
- `src/pages/cmi-601-assignment-help/index.md`: UK-based CMI-qualified: 93; fixed quote: 93; within 2 hours: 93; submission-ready: 105
- `src/pages/cmi-602-assignment-help/index.md`: UK-based CMI-qualified: 96; fixed quote: 96; within 2 hours: 96; submission-ready: 108
- `src/pages/cmi-603-assignment-help/index.md`: UK-based CMI-qualified: 94; fixed quote: 94; within 2 hours: 94; submission-ready: 106
- `src/pages/cmi-604-assignment-help/index.md`: UK-based CMI-qualified: 97; fixed quote: 97; within 2 hours: 97; submission-ready: 109
- `src/pages/cmi-605-assignment-help/index.md`: UK-based CMI-qualified: 99; fixed quote: 99; within 2 hours: 99; submission-ready: 111
- `src/pages/cmi-606-assignment-help/index.md`: UK-based CMI-qualified: 94; fixed quote: 94; within 2 hours: 94; submission-ready: 106
- `src/pages/cmi-607-assignment-help/index.md`: UK-based CMI-qualified: 95; fixed quote: 95; within 2 hours: 95; submission-ready: 107
- `src/pages/cmi-608-assignment-help/index.md`: UK-based CMI-qualified: 93; fixed quote: 93; within 2 hours: 93; submission-ready: 105
- `src/pages/cmi-609-assignment-help/index.md`: UK-based CMI-qualified: 96; fixed quote: 96; within 2 hours: 96; submission-ready: 108
- `src/pages/cmi-610-assignment-help/index.md`: UK-based CMI-qualified: 92; fixed quote: 92; within 2 hours: 92; submission-ready: 104
- `src/pages/cmi-612-assignment-help/index.md`: UK-based CMI-qualified: 99; fixed quote: 99; within 2 hours: 99; submission-ready: 111
- `src/pages/cmi-613-assignment-help/index.md`: UK-based CMI-qualified: 96; fixed quote: 96; within 2 hours: 96; submission-ready: 108
- `src/pages/cmi-614-assignment-help/index.md`: UK-based CMI-qualified: 97; fixed quote: 97; within 2 hours: 97; submission-ready: 109
- `src/pages/cmi-701-assignment-help/index.md`: UK-based CMI-qualified: 94; fixed quote: 94; within 2 hours: 94; submission-ready: 106
- `src/pages/cmi-702-assignment-help/index.md`: UK-based CMI-qualified: 98; fixed quote: 98; within 2 hours: 98; submission-ready: 110
- `src/pages/cmi-703-assignment-help/index.md`: UK-based CMI-qualified: 93; fixed quote: 93; within 2 hours: 93; submission-ready: 105
- `src/pages/cmi-704-assignment-help/index.md`: UK-based CMI-qualified: 91; fixed quote: 91; within 2 hours: 91; submission-ready: 103
- `src/pages/cmi-705-assignment-help/index.md`: UK-based CMI-qualified: 98; fixed quote: 98; within 2 hours: 98; submission-ready: 110
- `src/pages/cmi-706-assignment-help/index.md`: UK-based CMI-qualified: 92; fixed quote: 92; within 2 hours: 92; submission-ready: 104
- `src/pages/cmi-707-assignment-help/index.md`: UK-based CMI-qualified: 95; fixed quote: 95; within 2 hours: 95; submission-ready: 107
- `src/pages/cmi-708-assignment-help/index.md`: UK-based CMI-qualified: 92; fixed quote: 92; within 2 hours: 92; submission-ready: 104
- `src/pages/cmi-709-assignment-help/index.md`: UK-based CMI-qualified: 90; fixed quote: 90; within 2 hours: 90; submission-ready: 102
- `src/pages/cmi-710-assignment-help/index.md`: UK-based CMI-qualified: 97; fixed quote: 97; within 2 hours: 97; submission-ready: 109
- `src/pages/cmi-712-assignment-help/index.md`: UK-based CMI-qualified: 95; fixed quote: 95; within 2 hours: 95; submission-ready: 107
- `src/pages/cmi-713-assignment-help/index.md`: UK-based CMI-qualified: 96; fixed quote: 96; within 2 hours: 96; submission-ready: 108
- `src/pages/cmi-714-assignment-help/index.md`: UK-based CMI-qualified: 95; fixed quote: 95; within 2 hours: 95; submission-ready: 107
- `src/pages/cmi-715-assignment-help/index.md`: UK-based CMI-qualified: 99; fixed quote: 99; within 2 hours: 99; submission-ready: 111
- `src/pages/cmi-716-assignment-help/index.md`: UK-based CMI-qualified: 95; fixed quote: 95; within 2 hours: 95; submission-ready: 107


---

## 1 to 7. What changed on the pilot pages

Section 0 above is the audit and was committed before anything changed. Everything below describes the finished branch. The pilot list lives in one place: `cleanupPilotUnits` in `src/components/unit-tools/config.js`.

### Step 1: FAQ answer and claims

- The FAQ answer on all five pilots is now exactly: "If you would like support with this unit, message us on WhatsApp with your unit code, your brief and your deadline, and we will tell you what we can offer." The question text is unchanged.
- **Structured data: no change.** The old answer was never in JSON-LD (section 0.3), so there was nothing to keep in step. The built head of every pilot was compared with the baseline: title, meta description, canonical, H1 and all three JSON-LD blocks are identical.
- **Removed from the pilot bodies (each pilot, same text):**
  1. The old FAQ answer sentences "A written assignment to your brief and the criteria above, prepared by a UK-based CMI-qualified writer, or tutoring if you prefer to write it yourself. Send your brief and deadline by WhatsApp and you get a fixed quote within 2 hours." (replaced by the exact text above). This held "UK-based CMI-qualified", "fixed quote" and "within 2 hours".
  2. The related-units list item "CMI Assignment Writing Service, submission-ready assignments across all levels" (held "submission-ready").
  - "written to your unit criteria" does not occur on any pilot page.
  - No wrapper was left empty, so no wrapper was removed.
- The same claims on other pages are listed by file and line in 0.8. None of those files was edited.

### Step 2: criteria disclosure

The H2 "Learning outcomes and assessment criteria" stays outside and unchanged. Everything under it, up to the next H2, is wrapped in `<details class="ut-full-criteria">` (closed) with the summary "Full criteria text". The text stays in the HTML. The checklist is kept.

**Sync check:** `assertCriteriaInSync` in `src/lib/pilot-page.js` compares the criteria found in the disclosure with the criteria the checklist is built from, after normalising tags, entities, curly quotes and spaces. If they differ, or a count in the page does not match, the build throws and names the unit. `src/lib/pilot-page.test.mjs` covers the pass and fail cases and, after a build, checks the five built pages.

### Step 3: verb legend

The repeated "In plain English" line is gone from every row (0 occurrences on the pilots). A "What the verbs mean in this unit" list sits directly above the checklist and lists each distinct verb once, with the meaning the unit page already gives. Each row keeps its highlighted verb, and the row's checkbox points at the legend entry through `aria-describedby`, so keyboard and screen reader behaviour is kept. No verb lacked a meaning, so none is listed bare.

### Step 4: WhatsApp links

Removed: the "Get a Unit N Quote on WhatsApp" link under the title, the WhatsApp link in the intro and the WhatsApp link under the FAQ answer. Kept: one "Stuck on this criterion?" link per criterion row, restyled as a plain underlined text link (still 44px tall) and unchanged in target. The header and mobile menu "WhatsApp Us" links and the floating widget are untouched.

### Step 5: related units and topics

- Sibling links are kept (3 per pilot).
- "More on this unit's topics" now holds at most two guide links, one of which is the command verbs guide.
- Every service-page link is gone from the body (the only one was the writing service item above).

### Step 6: header image

The header image is not rendered on the pilots (the layout passes no image for them). The image file `cmi-4008-assignment-help.webp` and the other four are kept in the repo. H1 and intro are unchanged.

### Step 7: verb panel, start plan, review line

- **`#command-verbs` panel:** each distinct verb once with its unit-page meaning, the criteria that use it and, where the command verbs guide groups it, the depth group; one link to the guide. Focus moves to the panel when the anchor is followed.
- **15-minute start plan** above the tabs: five steps with tick boxes saved per unit, the three workplace questions saved per unit (600 characters each), "Clear", "Print my start plan" and "Download as .txt". It stays hidden until the script runs. It never writes sentences: the print view and the text file hold the student's own notes, the verbs, the planner rows and the outline text, and say so plainly when a part is empty.
- **Review line:** "Last reviewed October 2026 against the CMI Level N specification vNN." from `docs/spec-versions.md` via `src/data/specVersions.js`; a test keeps the two in step.

## 8. Link counts after (article body, per pilot)

| Target type | 307 | 4008 | 501 | 611 | 711 | Before (307, 4008, 501, 611, 711) |
|---|--:|--:|--:|--:|--:|---|
| Sibling units | 3 | 3 | 3 | 3 | 3 | 3 each |
| Own-level hub and unit list | 2 | 2 | 2 | 2 | 2 | 2 each |
| Guides (topics block plus the verb panel link) | 3 | 3 | 3 | 3 | 3 | 2, 2, 5, 3, 3 |
| Service pages | 0 | 0 | 0 | 0 | 0 | 1 each |
| WhatsApp ("Stuck on this criterion?" only) | 10 | 10 | 12 | 6 | 5 | 13, 13, 15, 9, 8 |
| Anchors (`#...`, start plan and panel) | 4 | 4 | 4 | 4 | 4 | 0 |

Outside the article (header, footer) nothing changed: 22 links on every pilot, as before. The command verbs guide appears twice in the body on purpose: once in the topics block, once in the verb panel.

### Inbound links, before and after

| Target | Pages linking before | After | Change |
|---|--:|--:|---|
| /cmi-assignment-writing-service/ | 125 | 125 | none (header nav on every page; the 5 pilot body links are gone) |
| /guides/cmi-command-verbs-explained/ | 125 | 125 | none (the 5 pilot bodies still link to it) |
| /guides/harvard-referencing-cmi/ | 95 | 92 | -3 (dropped on 501, 611, 711); still linked from 90 other pages and from the 307 and 4008 bodies |
| /guides/management-theory-cmi-assignments/ | 50 | 50 | none |
| /guides/cmi-level-5-vs-level-7/ | 125 | 125 | none (header nav) |
| /guides/cmi-membership-levels-acmi-mcmi-fcmi/ | 125 | 125 | none (header nav) |

Every removed target keeps many other inbound links, so no page is orphaned.

## 9. Gaps

- **Depth groups:** Compare (307), Devise and Provide (4008), Investigate (611) and Formulate (711) are in no depth group in the repo. They show their meaning and no depth line. No group was invented.
- **Review date:** the repo has one verification date (31 October 2026) for all levels, not a per-unit date. The line says "October 2026" for that reason.
- **Closing call to action:** unit pages never had a separate block (0.6). Nothing was invented, so the bottom of the page has no WhatsApp link of its own. This needs your decision (see below).

## 10. Floating "Chat with us" widget

Not removed or changed. Findings and the proposed fix are in 0.2. Seen again on the finished branch at 375px: it still covers part of the text column (it covers the right of the intro on 4008). At 1280px it sits in the margin.

## 11. Decisions made

1. FAQ question text kept as it is on the site ("...assignment help from us include?"), because the brief says to keep it and the wording in the brief differs (0.6).
2. The whole intro sentence "If you want support with this unit, message us on WhatsApp with your brief and deadline." was removed with its link, rather than leaving a sentence without its link.
3. The command verbs guide moved from the related-units list into "More on this unit's topics"; the second guide is Harvard (307, 4008) or management theory (501, 611, 711). Harvard was dropped from 501, 611 and 711, and the Level 5 vs 7 and membership items from 501, to stay at two.
4. Meta descriptions ("quote in 2 hours") and `Layout.astro` line 33 were not changed (the brief does not allow it); they are listed in 0.6 and 0.8.
5. Pilot-only code is written into the page as raw text and its stylesheet is linked only on the pilots, so the other 121 unit pages build byte-identical.

## 12. Checks run

- `npm test`: 46 tests, all passing.
- `npm run build`: 126 pages. Compared with the build of `main`: one new file (the pilot stylesheet) and exactly five changed files, the five pilot pages.
- Link check: 126 pages, 0 broken.
- Built preview at 375px and 1280px on Unit 4008: no horizontal overflow; no console errors apart from four `ERR_NAME_NOT_RESOLVED` from the chat widget's host, which the offline test setup cannot reach; every control in the tools is at least 44px tall; ticks and notes survive a reload; the planner and outline still work; the start plan's print view shows only the plan.
- Duplicate ids 0, broken `aria` references 0, dead `#` anchors 0 on all five pilots.

## 13. Rolling out to more units

Add the unit codes to `cleanupPilotUnits` and make the same markdown edits as commits 2 and 3 (FAQ answer, the writing-service list item, the quote link, the intro sentence, the FAQ WhatsApp link, and the topics block cut to two guides including the command verbs guide). The build then fails by itself if a page's disclosure and checklist disagree.

## 14. Roll-out

Done for all 89 unit pages on branch `feat/unit-cleanup-all-units`; see `docs/unit-cleanup-rollout-notes.md`. `cleanupPilotUnits` is now `cleanupUnits` and holds every unit code.
