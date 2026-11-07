# Unit page URLs: /cmi-<code>-assignment-help/ to /unit-<code>/

Requested by the site owner. All 89 unit pages moved, for example `/cmi-513-assignment-help/` is now `/unit-513/`.

## What changed
- **Folders.** `src/pages/cmi-<code>-assignment-help/` is now `src/pages/unit-<code>/` (89 folders, moved with `git mv`, content unchanged).
- **Canonicals.** Each unit page canonical is `https://www.cmiassignmenthelp.uk.com/unit-<code>/`.
- **References.** Every internal link, in the unit pages (sibling links), the hubs, the guides, the service pages and the structured data, points at the new URL, so no internal link goes through a redirect.
- **Code that builds or reads unit URLs.** `UnitFinder.astro` and `UnitList.astro` (page lookup and links), `Layout.astro` (breadcrumb trail), `UnitPageTools.astro` and `unit-tools-data.js` (unit code from the path), and the tests that read the unit files.
- **Redirects.** `vercel.json` has a permanent (301) redirect from each old URL, with and without the trailing slash, to the new one: 178 rules. The 8 existing redirects whose destination was an old unit URL now point straight at the new one (no chains).
- **Not changed.** Titles, descriptions, H1s and page text of the unit pages; the hub URLs (`/cmi-level-N-assignment-help/`); the image file names (for example `/images/headers/cmi-513-assignment-help.webp` is still that file); the legal pages.

## Checks
- A build of `main` against a build of this branch: the same 127 pages. Every page matches the baseline once the slug rename is applied, apart from the unit finder's inline script (it builds the new URL) and where the stylesheet link is placed on four hubs.
- The sitemap lists 123 URLs: 89 `/unit-<code>/` and none under the old names.
- No built file mentions an old unit URL, other than image file names.
- Link check on the build: 127 pages, 0 bad links.
- `src/lib/unit-slugs.test.mjs` fails if a unit folder, canonical or redirect goes missing, if a redirect points at an old URL, or if any source file links to an old unit URL.

## After it is live
- Old URLs should answer 301 to the new ones (spot-check with `curl -I`).
- In Search Console, submit the sitemap again and request indexing for a few unit pages (for example `/unit-501/`). Rankings for the unit pages can move for a few weeks while Google follows the redirects. Before the change they had 53 impressions and 0 clicks in the 90 days to 2 November 2026, so little is at stake.
