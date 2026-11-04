// Which unit pages get the study tools is set on the page itself: its frontmatter says
//   layout: ../../layouts/UnitPageTools.astro
// instead of UnitPage.astro. See docs/unit-tools-notes.md for the pilot units and for rolling out.

// Unit pages that get the cleaned-up unit page (disclosure for the full criteria, verb legend, no repeated
// "In plain English" lines, start plan, verb panel, no header image; see docs/unit-page-cleanup-notes.md).
// A unit page whose code is not listed here keeps its previous output, byte for byte. This is the one list that
// controls it: it started as five pilot units (307, 4008, 501, 611, 711) and now holds every unit page.
// A new unit page needs its code added here and the same markdown edits as the others (see the notes);
// unit-cleanup-all.test.mjs fails if a unit page is missing from the list.
export const cleanupUnits = [
  // Level 3
  '301', '302', '303', '304', '305', '306', '307', '308', '309', '310', '311', '312', '313', '314', '315', '316', '317', '318', '319', '320', '321',
  // Level 4
  '4001', '4002', '4003', '4004', '4005', '4006', '4007', '4008', '4009',
  // Level 5
  '501', '502', '503', '504', '505', '506', '507', '508', '509', '510', '511', '512', '513', '514', '515', '516', '517', '518', '519', '520', '521', '522', '523', '524', '525', '526',
  // Units coded 5001, 5012 and 5014
  '5001', '5012', '5014',
  // Level 6
  '601', '602', '603', '604', '605', '606', '607', '608', '609', '610', '611', '612', '613', '614',
  // Level 7
  '701', '702', '703', '704', '705', '706', '707', '708', '709', '710', '711', '712', '713', '714', '715', '716',
];
export const isCleanupUnit = (code) => cleanupUnits.includes(String(code));

// The number the site already uses everywhere (same value as `whatsappUrl` in src/layouts/Layout.astro).
// logic.test.mjs fails if the two drift apart.
export const whatsappUrl = 'https://wa.me/447916696894';
