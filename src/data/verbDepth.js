// The "depth expected" for a command verb: the group the command verbs guide puts it in
// (src/pages/guides/cmi-command-verbs-explained/index.astro, "How the Verbs Group"). The wording is the guide's own.
// src/data/verbDepth.test.mjs fails if this list stops matching the guide.
// A verb the guide does not group (for example Compare, Devise, Provide, Investigate, Formulate) has no depth here.

export const verbGroups = [
  { name: 'Show Knowledge', verbs: ['Identify', 'Define', 'Describe', 'Outline', 'Explain', 'Summarise'] },
  { name: 'Analyse and Judge', verbs: ['Discuss', 'Analyse', 'Examine', 'Assess', 'Evaluate', 'Justify'] },
  {
    name: 'Critique and Build',
    verbs: ['Critically appraise', 'Critically assess', 'Critically evaluate', 'Develop', 'Propose', 'Recommend'],
  },
];

/** The guide's group name for a verb, or null when the guide does not group it. */
export function depthGroupFor(verb) {
  const wanted = verb.trim().toLowerCase();
  const group = verbGroups.find((candidate) => candidate.verbs.some((name) => name.toLowerCase() === wanted));
  return group ? group.name : null;
}
