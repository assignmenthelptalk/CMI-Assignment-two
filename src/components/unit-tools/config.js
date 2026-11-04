// Which unit pages get the study tools is set on the page itself: its frontmatter says
//   layout: ../../layouts/UnitPageTools.astro
// instead of UnitPage.astro. See docs/unit-tools-notes.md for the pilot units and for rolling out.

// Unit pages that get the cleaned-up unit page (disclosure for the full criteria, verb legend, no repeated
// "In plain English" lines, start plan, verb panel, no header image; see docs/unit-page-cleanup-notes.md).
// Every other unit page keeps its current output, byte for byte. To roll out, add a unit code here and
// make the markdown edits for that page listed in the notes.
export const cleanupPilotUnits = ['307', '4008', '501', '611', '711'];
export const isCleanupUnit = (code) => cleanupPilotUnits.includes(String(code));

// The number the site already uses everywhere (same value as `whatsappUrl` in src/layouts/Layout.astro).
// logic.test.mjs fails if the two drift apart.
export const whatsappUrl = 'https://wa.me/447916696894';
