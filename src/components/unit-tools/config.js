// Which unit pages get the study tools is set on the page itself: its frontmatter says
//   layout: ../../layouts/UnitPageTools.astro
// instead of UnitPage.astro. See docs/unit-tools-notes.md for the pilot units and for rolling out.

// The number the site already uses everywhere (same value as `whatsappUrl` in src/layouts/Layout.astro).
// logic.test.mjs fails if the two drift apart.
export const whatsappUrl = 'https://wa.me/447916696894';
