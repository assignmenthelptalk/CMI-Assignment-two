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

(Filled in as the work lands; see the sections below.)

## 2. Decisions

(Filled in as the work lands.)
