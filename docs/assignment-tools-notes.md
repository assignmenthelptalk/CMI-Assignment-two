# Assignment Tools page: audit and notes

Branch `feat/assignment-tools-page`, from `main` at `f929099` (4 November 2026).

## 0. Audit (done before any change)

### 0.1 Main nav and mobile menu

- **Where items are defined.** The header markup is in `src/layouts/Layout.astro` (lines 108 to 143). It is a `<nav class="main-nav">` with one `<ul class="nav-list">` holding three `li.nav-item.has-dropdown` entries: Levels, Guides, Services. Each is a `<button class="nav-toggle">` followed by a `.dropdown`. The links come from `src/data/navMenu.js` (`levels`, `guides`, `services`), all as absolute `https://www.cmiassignmenthelp.uk.com/...` URLs. After the nav comes the "WhatsApp Us" button (the contact item), then the hamburger.
- **Mobile menu.** `<nav id="mobile-nav">` has an empty `<ul id="mobile-nav-list">` in the HTML on purpose, so crawlers see one set of nav links. `buildMobileNav()` (inline script in `Layout.astro`, lines 227 to 250) fills it on first open. It only walks `.main-nav .nav-item.has-dropdown`, so **a plain link item would not reach the mobile menu without a change to that function**.
- **Plain-link styling already exists.** The CSS has `.nav-item > a` styled the same as `.nav-toggle` (hover, padding, size). No nav item uses it yet.
- **Active state.** None exists. No nav item sets `aria-current`, and no CSS styles one.
- **Focus.** One global rule gives `a`, `button`, `select` and `summary` a 3px `--focus-ring` outline (`Layout.astro` line 334). A new link inherits it.
- **Tests.** No test covers the nav.

### 0.2 Where the tool names appear

Components (all under `src/components/unit-tools/` unless stated):

| File | Old text |
|---|---|
| `StudyTools.astro` | file comment; `<h2>Study tools for Unit {code}</h2>`; `aria-label="Study tools"` on the tab list; tab labels `Criteria checklist`, `Word-count planner`, `Structure outline`; panel `<h3>` `Word-count planner` and `Structure outline`; no-JavaScript note "The word-count planner and the structure outline are switched off"; legend `<h3>What the verbs mean in this unit</h3>` |
| `StartPlan.astro` | `<h3>15-minute start plan</h3>`; step links "Open the criteria checklist", "Open the word-count planner", "Open the structure outline"; file comment |
| `startplan.js` | file comment; `.txt` and print headings "Word split (from the word-count planner)" and "Outline (from the structure outline)"; `NO_WORD_SPLIT` text "Open the word-count planner" |
| `logic.js` | the outline text (also the `.txt` download header, first line) reads `CMI Unit 611 study outline (Level 6)` |
| `checklist.js`, `planner.js`, `outline.js` | file comments only |
| `src/layouts/UnitPageTools.astro`, `src/lib/unit-tools-data.js` | comment and error text "Study tools" (build-time messages, not shown to visitors) |
| `study-tools-cleanup.css` | comments only |

Print views: the checklist print view prints the section `<h2>` plus the checklist, so it changes with the heading. The start plan print view and `.txt` are built in `startplan.js` (above). The checklist has no `.txt` download. The outline `.txt` download header is the first line of the outline text in `logic.js`.

Tests: `logic.test.mjs` line 65 asserts `/^CMI Unit 611 study outline \(Level 6\)/`. `startplan.test.mjs` line 89 asserts `Outline (from the structure outline)`. No test asserts the other old names.

Docs: `docs/unit-tools-notes.md`, `docs/unit-page-cleanup-notes.md`, `docs/unit-cleanup-rollout-notes.md` describe the old names. They are history; see decisions in section 2.

Anchors and ids: the section has `id="study-tools"` (used only by one CSS selector, `#study-tools .ut-panel`). Nothing in `src/pages` links to it. `#command-verbs` is linked from the start plan. The per-unit ids (`ut-<code>-heading`, `-tab-checklist`, `-panel-planner`, and so on) are keyed on internal names, not labels.

### 0.3 Unit finder reuse

`src/components/UnitFinder.astro` is self-contained: its own data (`units.json`), script and scoped styles. With no props it renders an `<h2 id="uf-title">Find Your CMI Unit</h2>`, a level select, a unit select and a "Go to unit page" button. It sends the existing `find_unit_click` event when `gtag` is present; that is unchanged behaviour, not new tracking. Without JavaScript the form stays hidden and plain links to the five level hubs show. It can be dropped onto the new page as `<UnitFinder />`. It has fixed ids (`uf-level`, `uf-unit`, `uf-title`), so it can appear only once per page, which is fine here.

### 0.4 Sitemap

Generated automatically by `@astrojs/sitemap` (`astro.config.mjs`), with a filter that only removes the four legal pages. A new page is included without any edit. The sitemap is not hand-edited.

### 0.5 "Last reviewed"

Source: `src/data/specVersions.js`. `reviewedLine(level)` returns `Last reviewed ${specReviewed} against the CMI Level ${level} specification ${version}.` (for example "Last reviewed October 2026 against the CMI Level 4 specification v12."). It needs a level and returns null without one. The date and versions are checked against `docs/spec-versions.md` by `startPlanData.test.mjs`. `UnitPageTools.astro` calls it with the unit's level.

The new page covers all five levels, so there is no single level or version to put in that sentence. See decision D3.

### 0.6 Other findings

- The site has **no visible breadcrumb anywhere**. `Layout.astro` only emits a `BreadcrumbList` JSON-LD block, built from the page path and title (Home, then the page). See decision D2.
- Layout builds that JSON-LD name from the title up to the first " - ", `|` or dash, so for the new page it reads "Free CMI Assignment Tools".

## 1. Changes

Commits, in order: meta description fix, audit, new page, menu item, renames, tests.

- **Meta descriptions (requested first).** The 89 unit pages ended their meta description with "UK CMI writers, quote in 2 hours." (86 pages) or "Quote in 2 hours." (3 pages, units 5001, 5012, 5014). That trailing sentence is removed; nothing else in any description changed. Titles, canonicals and structured data are untouched. The `Layout.astro` line 33 "UK-based ... writing and tutoring service" text is Organization JSON-LD, not a meta description, so it was left alone.
- **New page** `src/pages/assignment-tools/index.astro`, served at `/assignment-tools/`. Title, meta description and canonical are exactly as briefed. Content top to bottom: breadcrumb, H1, intro line, `UnitFinder` (unchanged component), "What you get on every unit page" (three items), the privacy sentence, "Browse by level" (five level hub links from `navMenu.js`), the command verbs guide sentence. No service links, no WhatsApp link, no other calls to action.
- **Menu.** `toolsLink` in `src/data/navMenu.js`; one plain `li.nav-item` in `Layout.astro` after Services and before the WhatsApp button. `buildMobileNav()` now also copies plain links, so the mobile menu shows it too, after Services. No dropdown.
- **Renames** (unit pages): "Study tools for Unit X" is "Assignment tools for Unit X"; tab and panel labels "Pass checklist", "Word planner", "Structure outline" (unchanged); on every unit page that has the start plan, "15-minute start plan" is "Start in 15 minutes" and "What the verbs mean in this unit" is "What the verbs mean". Also updated: the tab list `aria-label`, the no-JavaScript note, the start plan step links ("Open the pass checklist", "Open the word planner"), the start plan print view and `.txt` headings ("from the word planner"), the outline `.txt` first line, comments, and the two tests that asserted the old text.
- **Tests.** `src/components/assignment-tools.test.mjs` (new, 6 tests): page title, meta description, canonical; agreed copy; only the allowed links; menu position and mobile copy; new names present and old names gone; `#study-tools` and `#command-verbs` still exist.

## 2. Decisions

- **D1. Menu position.** The main menu has no separate "unit" items, only the Levels, Guides and Services dropdowns, then the WhatsApp button as the contact item. "Assignment Tools" goes after Services and before WhatsApp.
- **D2. Breadcrumb.** The site has no visible breadcrumb anywhere, only `BreadcrumbList` JSON-LD. I added a small visible one (`nav aria-label="Breadcrumb"`, an ordered list, "Home > Assignment Tools") using the site's tokens and an underlined link. The JSON-LD that `Layout.astro` generates for the new page names the second item "Free CMI Assignment Tools" (taken from the title). The visible crumb says "Assignment Tools". I did not change `Layout.astro` to align them.
- **D3. "Last reviewed" (added afterwards, on request).** The unit pages' wording is per level ("... against the CMI Level N specification vNN"), and the new page covers all five levels, so it shows the same sentence once per level, Level 3 to Level 7, at the bottom of the page under the command verbs sentence. It calls `reviewedLine()` from `src/data/specVersions.js`, the function and data (checked against `docs/spec-versions.md` by `startPlanData.test.mjs`) that the unit pages use. No date or version is typed on the page. The text is the muted grey the unit pages use for it (4.8:1 on white).
- **D4. Active state.** No nav item had an active state. I set `aria-current="page"` on the new item only when the page is `/assignment-tools/`, with a darker text colour and weight 600 on desktop and an underline in the mobile menu. Focus style is the existing global 3px ring; nothing new.
- **D5. Names not in your list.** "Start in 15 minutes" is the heading only. The buttons "Print my start plan", "Download as .txt", the print and `.txt` title "My start plan: ..." and "Start plan downloaded." still say "start plan". I changed "study outline" to "structure outline" in the outline text file's first line, because it is the one place the old family name "study" showed in the download header and the tab is called "Structure outline". Say if you want any of those handled differently.
- **D6. Anchors.** `#study-tools` (section id) and `#command-verbs` are unchanged. Nothing linked to `#study-tools`, so no extra anchor was added.
- **D7. Docs.** `unit-tools-notes.md`, `unit-page-cleanup-notes.md` and `unit-cleanup-rollout-notes.md` still use the old names, as a record of what was built then. I did not rewrite them.
- **D8. Finder.** Reused as it is, including its heading "Find Your CMI Unit" and its existing `find_unit_click` analytics call (no new tracking).

## 3. Checks (4 November 2026)

- `npm test`: 57 passed, 0 failed (51 before, plus the 6 new).
- `npm run build`: 127 pages (126 plus the new one).
- Link check: 127 pages, 0 bad links.
- **Comparison with the build of `main` at `f929099`** (line endings and whitespace between tags normalised, hashed asset names normalised): see the report for the page-by-page result.
  - New page: `assignment-tools/index.html`.
  - 37 non-unit pages: the nav item only (plus the inline menu script, which now copies plain links).
  - 89 unit pages: the nav item, the renamed labels and the shorter meta description.
  - No page removed, no other difference.
- **Sitemap:** `sitemap-0.xml` gains one line, `https://www.cmiassignmenthelp.uk.com/assignment-tools/`. `sitemap-index.xml` and `robots.txt` are identical to `main`. Nothing hand-edited.
- **Browser (local preview of the build):** 1280px and 375px, no horizontal overflow (scroll width equals viewport width), no console messages. Keyboard: Tab reaches "Assignment Tools" in the desktop nav with the 3px focus ring; the level and unit selects work with the arrow keys and Enter on "Go to unit page" opens the unit page. Mobile menu opens, shows the new item after Services, item marked current. The chat button at 375px is still the 48px round icon named "Chat with us".
- Screenshots: `docs/assignment-tools-shots/` (`desktop-1280.png`, `mobile-375.png`, `mobile-menu-open-375.png`). The cookie banner shows in the full-page captures because nothing was accepted or rejected.

## 4. Link from the level hubs (added on request)

- Each of the five level hub pages (`/cmi-level-3-assignment-help/` to `/cmi-level-7-assignment-help/`) now has one sentence directly under the unit finder: "Each unit page has a free pass checklist, word planner and structure outline. See all the Assignment Tools." The last two words link to `/assignment-tools/`, underlined in the text, in the muted body colour of the hub.
- This is the first link to the page from a content page. The menu item was the only link before. No unit page, guide, the home page or the footer links to it.
- Not changed: the hubs' other text. The Level 6 hub still says writers are "senior manager" qualified, the Level 7 hub still says "quote within 2 hours", and the hubs' quote line still says "Fixed quote in 2 hours". These are existing claims outside this request.
- The wording reuses the Assignment Tools page's own description of the tools, so nothing new is claimed. "Each unit page" matches "every unit page" on the new page.

## 5. Remaining "2 hours" claims removed (on request)

Every remaining "quote in / within 2 hours" (and "two hours") on the site is removed, 93 mentions in 23 page sources: the five level hubs, the home page, the eleven service-style pages (writing service, tutoring, coursework, essay, report, homework, answers, examples, help online, cheap, pay someone) and six guides (command verbs, membership, NHS, worth it, management theory, resubmission). The unit pages were done earlier.

- **Rule.** Only the time phrase goes; the rest of each sentence stays. "Fixed quote within 2 hours" is now "Fixed quote". "Receive a fixed quote within 2 hours." is "Receive a fixed quote." "within 2 hours of receiving your brief" is "after receiving your brief", and "within two hours of sending your brief" is "after you send your brief".
- **Meta descriptions.** The five hub descriptions ended "UK-based CMI writers, quote in 2 hours.". That whole sentence is removed, as on the unit pages. The service-style page descriptions that ended "quote in 2 hours" now end "quote" (for example "WhatsApp quote."). Titles, canonicals and the structured-data fields other than FAQ answer text are untouched. The FAQ answers in the structured data are changed in step with the visible FAQ text.
- **Guides.** "A quote is returned within 2 hours" is "A quote is returned"; the resubmission guide's "Get a Plan in 2 Hours" link text is "Get a Plan".
- **Test.** `src/lib/no-quote-time-claim.test.mjs` fails if "2 hours" or "two hours" returns to any page source.
- **Not changed (outside this request).** "Fixed quote" itself, "UK-based CMI writers", other turnaround figures such as "48 to 72 hours" and "5 to 10 days", and the refund policy's "12 hours of delay". These are separate claims; say if you want them reviewed next.

## 6. Price promises softened (on request)

Request: "fix claims quote". Choices made with the owner: soften the price guarantees, and cover quote claims only (not the writer or turnaround claims).

- **"Fixed quote" is now "quote".** Hero notes read "WhatsApp quote"; steps read "Receive a quote"; the stand-alone "Fixed quote." sentences in the closing calls to action are removed. 20 pages: the home page, the five level hubs, the service and support pages (cheap, pay-someone, writing service, tutoring, coursework, essay, report, homework, answers, examples, online), and three guides.
- **Promises removed.** "No hidden fees", "no scope creep", "no surprise charges", "the price is fixed, no revision surcharges", "no open-ended pricing", and "the quote will not change once you confirm the order unless you change the brief, word count or deadline".
- **Kept.** "No payment is required to receive a quote" (a statement about the process, not a price promise), the sentences saying what a quote covers, and "Revision is included as standard ... at no additional cost" (the revision policy; only the sentence tying it to "the fixed quote" was removed).
- **FAQ structured data** follows the visible FAQ text on the ten pages that carry it, so the two still match. The cheap page's FAQ question "Can I get a fixed price before I confirm my order?" is now "Can I get a price before I confirm my order?".
- **Not changed.** Titles, canonicals, URLs, redirects, sitemap, legal pages. Three meta descriptions still end "fixed quote" or "fixed WhatsApp quote" (cheap, answers, online) because meta descriptions are not changed without an explicit request.
- **Test.** `src/lib/no-price-guarantee.test.mjs` fails if "fixed quote", "fixed price", "hidden fees", "price is fixed", "no surprise charges" or "quote will not change" returns to a page body (title= / description= lines and the legal pages are skipped). "There is no single fixed price" on the pay-someone page is allowed because it says the opposite.
- **Left alone (outside this request).** "UK-based CMI writers" and similar writer claims, the turnaround figures, and the refund policy's money-back guarantee.

## 7. Meta descriptions finished (on request)

Request: "fix meta descriptions", after section 6. The three descriptions that still said "fixed quote" now read:

- Cheap page: "... (level, word count, deadline) and get a WhatsApp quote."
- Answers page: "... Unit-specific written answers, Levels 3 to 7, WhatsApp quote."
- Online page: "... Remote expert support via WhatsApp, digital delivery, all levels 3 to 7." (the quote clause is dropped because the sentence already says WhatsApp)

Only those three description strings changed. Titles, canonicals, URLs and structured data are as they were after section 6. `src/lib/no-price-guarantee.test.mjs` now covers title and description lines too, so section 6's note that they were skipped no longer applies.
