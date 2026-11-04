// Start in 15 minutes (the start plan): five tick boxes, three workplace questions, "Print my start plan" and "Download as .txt".
//
// This file is self-contained on purpose. StartPlan.astro writes it into the page as an inline module, only on the
// cleaned-up pilot pages, so it must not import anything (and it must not contain the closing script tag).
// Nothing here makes a network request or sends anything anywhere. Progress and notes are kept in this browser's
// localStorage, for this unit only, and every storage call is wrapped so the page works with storage blocked.
// The plan never writes sentences for the student: it holds their own ticks and notes, the verbs, the planner's
// figures and the outline's questions.

export const STEP_IDS = ['criteria', 'verbs', 'example', 'budget', 'outline'];
export const NOTE_KEYS = ['organisation', 'situation', 'happened'];
export const MAX_NOTE_LENGTH = 600;
export const storageKey = (code) => `cmi-unit-tools:startplan:${code}`;

/** What is saved: which steps are ticked and the three notes. Anything unexpected in storage is ignored. */
export function parseSaved(raw) {
  const empty = { steps: [], notes: { organisation: '', situation: '', happened: '' } };
  try {
    const data = JSON.parse(raw || 'null');
    if (!data || typeof data !== 'object') return empty;
    const steps = Array.isArray(data.steps) ? STEP_IDS.filter((id) => data.steps.includes(id)) : [];
    const notes = { ...empty.notes };
    for (const key of NOTE_KEYS) {
      if (data.notes && typeof data.notes[key] === 'string') notes[key] = data.notes[key].slice(0, MAX_NOTE_LENGTH);
    }
    return { steps, notes };
  } catch {
    return empty;
  }
}

/** The JSON that is saved, or null when there is nothing to save (so the key can be removed). */
export function serialiseSaved(state) {
  const hasNotes = NOTE_KEYS.some((key) => state.notes[key].trim() !== '');
  if (state.steps.length === 0 && !hasNotes) return null;
  return JSON.stringify({ steps: state.steps, notes: state.notes });
}

/**
 * Gathers everything the print view and the .txt file show into one object.
 * @param {{
 *   code: string, level: number | null,
 *   steps: { id: string, label: string, done: boolean }[],
 *   verbs: { verb: string, criteria: string, meaning: string, depth: string }[],
 *   notes: { question: string, answer: string }[],
 *   words: { rows: { section: string, criteria: string, words: string }[], range: string } | null,
 *   outline: string,
 * }} input
 */
export function buildPlanModel(input) {
  const doneCount = input.steps.filter((step) => step.done).length;
  return {
    title: `My start plan: CMI Unit ${input.code}${input.level ? ` (Level ${input.level})` : ''}`,
    intro: 'A planning summary of your own ticks and notes. It is not part of an assignment.',
    stepsHeading: `Steps (${doneCount} of ${input.steps.length} done)`,
    steps: input.steps,
    verbs: input.verbs,
    notes: input.notes.map((note) => ({ question: note.question, answer: note.answer.trim() })),
    words: input.words && input.words.rows.length > 0 ? input.words : null,
    outline: input.outline.trim(),
  };
}

export const NOT_FILLED_IN = '(not filled in)';
export const NO_WORD_SPLIT = '(No word split yet. Open the word planner and enter your word count.)';
export const NO_OUTLINE = '(No outline yet.)';

/** One verb as a line of text: "Describe (criteria 1.1, 1.3): meaning. Depth group: Show Knowledge." */
export function verbLine(verb) {
  const meaning = verb.meaning ? `: ${verb.meaning}` : '';
  const depth = verb.depth ? ` Depth group: ${verb.depth}.` : '';
  return `${verb.verb} (criteria ${verb.criteria})${meaning}${depth}`;
}

/** One planner row as a line of text. The criteria column holds a count, or a dash for the introduction and conclusion. */
export function wordsLine(row) {
  const count = /^[0-9]+$/.test(row.criteria) ? ` (${row.criteria} ${row.criteria === '1' ? 'criterion' : 'criteria'})` : '';
  return `${row.section}: ${row.words} words${count}`;
}

const indent = (text) => text.split(/\r?\n/).map((line) => `  ${line}`).join('\n');

/** The plain-text version used for "Download as .txt". */
export function planToText(model) {
  const lines = [model.title, model.intro, '', model.stepsHeading];
  model.steps.forEach((step, index) => lines.push(`[${step.done ? 'x' : ' '}] Step ${index + 1}: ${step.label}`));

  lines.push('', 'Verbs in this unit');
  for (const verb of model.verbs) lines.push(`- ${verbLine(verb)}`);

  lines.push('', 'Your workplace example (your own notes)');
  for (const note of model.notes) lines.push(note.question, indent(note.answer || NOT_FILLED_IN));

  lines.push('', 'Word split (from the word planner)');
  if (model.words) {
    for (const row of model.words.rows) lines.push(`- ${wordsLine(row)}`);
    if (model.words.range) lines.push(model.words.range);
  } else {
    lines.push(NO_WORD_SPLIT);
  }

  lines.push('', 'Outline (from the structure outline)', model.outline ? model.outline : NO_OUTLINE, '');
  return lines.join('\n');
}

/** Builds the print view (headings, lists, paragraphs) from the model, using textContent only. */
export function renderPrintView(doc, container, model) {
  const add = (tag, text, parent = container) => {
    const element = doc.createElement(tag);
    element.textContent = text;
    parent.append(element);
    return element;
  };
  const addList = (items, tag = 'ul') => {
    const list = doc.createElement(tag);
    for (const text of items) add('li', text, list);
    container.append(list);
  };

  container.replaceChildren();
  add('h2', model.title);
  add('p', model.intro);
  add('h3', model.stepsHeading);
  addList(model.steps.map((step, index) => `${step.done ? 'Done' : 'Not done'}: Step ${index + 1}, ${step.label}`));
  add('h3', 'Verbs in this unit');
  addList(model.verbs.map(verbLine));
  add('h3', 'Your workplace example (your own notes)');
  for (const note of model.notes) {
    add('h4', note.question);
    add('p', note.answer || NOT_FILLED_IN);
  }
  add('h3', 'Word split (from the word planner)');
  if (model.words) {
    addList(model.words.rows.map(wordsLine));
    if (model.words.range) add('p', model.words.range);
  } else {
    add('p', NO_WORD_SPLIT);
  }
  add('h3', 'Outline (from the structure outline)');
  add('pre', model.outline || NO_OUTLINE);
}

/** Wires the start plan to the page. Does nothing on a page without one. */
export function initStartPlan(doc, win) {
  const root = doc.querySelector('[data-sp]');
  if (!root) return;
  const tools = root.closest('[data-ut]');
  const code = root.dataset.unit;
  const level = root.dataset.level ? Number(root.dataset.level) : null;
  const key = storageKey(code);

  const boxes = [...root.querySelectorAll('input[data-sp-step]')];
  const fields = Object.fromEntries(NOTE_KEYS.map((name) => [name, root.querySelector(`[data-sp-note="${name}"]`)]));
  const status = root.querySelector('[data-sp-status]');
  const storageNote = root.querySelector('[data-sp-storage-note]');
  const printView = root.querySelector('[data-sp-printview]');

  const readSaved = () => {
    try {
      return parseSaved(win.localStorage.getItem(key));
    } catch {
      return parseSaved(null);
    }
  };
  const currentState = () => ({
    steps: STEP_IDS.filter((id) => boxes.some((box) => box.dataset.spStep === id && box.checked)),
    notes: Object.fromEntries(NOTE_KEYS.map((name) => [name, fields[name].value])),
  });
  const save = () => {
    try {
      const json = serialiseSaved(currentState());
      if (json === null) win.localStorage.removeItem(key);
      else win.localStorage.setItem(key, json);
      storageNote.hidden = true;
    } catch {
      storageNote.hidden = false;
    }
  };
  const countText = () => `${boxes.filter((box) => box.checked).length} of ${boxes.length} steps done.`;

  const saved = readSaved();
  boxes.forEach((box) => {
    box.checked = saved.steps.includes(box.dataset.spStep);
    box.addEventListener('change', () => {
      save();
      status.textContent = countText();
    });
  });
  for (const name of NOTE_KEYS) {
    fields[name].value = saved.notes[name];
    fields[name].addEventListener('input', save);
  }
  status.textContent = countText();

  root.querySelector('[data-sp-clear-notes]').addEventListener('click', () => {
    for (const name of NOTE_KEYS) fields[name].value = '';
    save();
    status.textContent = `Workplace notes cleared. ${countText()}`;
    fields[NOTE_KEYS[0]].focus();
  });

  // Links to the three tools: open the tab if the tabs are running, otherwise follow the link to the panel.
  root.querySelectorAll('[data-sp-tab]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const tab = doc.getElementById(link.dataset.spTab);
      const tablist = tab && tab.closest('[data-ut-tablist]');
      if (!tab || !tablist || tablist.hidden) return;
      event.preventDefault();
      tab.click();
      tab.focus();
      const panel = doc.getElementById(tab.getAttribute('aria-controls'));
      if (panel) panel.scrollIntoView({ block: 'start' });
    });
  });
  // The verb panel is a plain anchor; move focus to it so keyboard and screen reader users land there.
  root.querySelectorAll('a[href="#command-verbs"]').forEach((link) => {
    link.addEventListener('click', () => doc.getElementById('command-verbs')?.focus({ preventScroll: true }));
  });

  const collect = () => {
    const verbs = [...tools.querySelectorAll('[data-ut-verbs] [data-verb]')].map((item) => ({
      verb: item.dataset.verb,
      criteria: item.dataset.criteria,
      meaning: item.querySelector('[data-meaning]')?.textContent.trim() ?? '',
      depth: item.dataset.depth ?? '',
    }));
    const rows = [...tools.querySelectorAll('[data-ut-planner] [data-ut-rows] tr')].map((row) => ({
      section: row.children[0].textContent.trim(),
      criteria: row.children[1].textContent.trim(),
      words: row.children[2].textContent.trim(),
    }));
    const tableShown = !tools.querySelector('[data-ut-planner] [data-ut-table-wrap]')?.hidden;
    return buildPlanModel({
      code,
      level,
      steps: boxes.map((box) => ({ id: box.dataset.spStep, label: box.dataset.label, done: box.checked })),
      verbs,
      notes: NOTE_KEYS.map((name) => ({ question: fields[name].dataset.question, answer: fields[name].value })),
      words: tableShown ? { rows, range: tools.querySelector('[data-ut-planner] [data-ut-range]')?.textContent.trim() ?? '' } : null,
      outline: tools.querySelector('[data-ut-outline-text]')?.value ?? '',
    });
  };

  const page = doc.documentElement;
  root.querySelector('[data-sp-print]').addEventListener('click', () => {
    renderPrintView(doc, printView, collect());
    page.classList.add('ut-printing-plan');
    win.print();
  });
  win.addEventListener('afterprint', () => {
    page.classList.remove('ut-printing-plan');
    printView.replaceChildren();
  });

  const download = root.querySelector('[data-sp-download]');
  download.addEventListener('click', () => {
    const url = win.URL.createObjectURL(new win.Blob([planToText(collect())], { type: 'text/plain;charset=utf-8' }));
    const link = doc.createElement('a');
    link.href = url;
    link.download = download.dataset.filename;
    link.click();
    win.URL.revokeObjectURL(url);
    status.textContent = 'Start plan downloaded.';
  });

  root.hidden = false;
}

if (typeof document !== 'undefined' && typeof window !== 'undefined') initStartPlan(document, window);
