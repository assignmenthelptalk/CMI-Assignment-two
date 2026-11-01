// The only unit pages each level hub links to. Every other unit is reached through the hub's
// "Find your unit" selector (not a link) and the level's "all units" page.
// Order is the order the tiles appear in. Picks: the units with the most Search Console impressions
// (29 Jul to 27 Oct 2026), then the first units in the sequence where there is no data.
export const featuredUnits = {
  3: ['307', '301', '302'],
  4: ['4001', '4002', '4003'],
  5: ['501', '502', '507'],
  6: ['611', '601', '602'],
  7: ['711', '705', '701'],
};

// Facts for the "all units" page of each level: name, how many units and the code range.
export const levelInfo = {
  3: { qualification: 'Principles of Management and Leadership', count: 21, range: '301 to 321' },
  4: { qualification: 'Management and Leadership', count: 12, range: '4001 to 4009, plus the Level 5 coded units 5001, 5012 and 5014' },
  5: { qualification: 'Management and Leadership', count: 26, range: '501 to 526' },
  6: { qualification: 'Professional Management and Leadership', count: 14, range: '601 to 614' },
  7: { qualification: 'Strategic Management and Leadership', count: 16, range: '701 to 716' },
};

export const allUnitsPath = (level) => `/cmi-level-${level}-units/`;
