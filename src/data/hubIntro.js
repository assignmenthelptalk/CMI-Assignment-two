import units from './units.json';

// The unit range quoted in a level hub's intro, e.g. "501 to 526", taken from src/data/units.json.
// Returns null when the level's codes are not one unbroken run (Level 4 is 4001 to 4009 plus 5001, 5012 and 5014),
// so the hub drops the bracketed range instead of quoting a range that includes codes that are not units.
export function hubUnitRange(level) {
  const codes = units[String(level)].map((unit) => Number(unit[0])).sort((a, b) => a - b);
  const isUnbroken = codes.every((code, i) => i === 0 || code === codes[i - 1] + 1);
  return isUnbroken ? `${codes[0]} to ${codes[codes.length - 1]}` : null;
}
