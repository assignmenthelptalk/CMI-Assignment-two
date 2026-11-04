// Word planner. Validates the three inputs, then splits the word count between the
// introduction, the conclusion and the learning outcomes (see logic.js). No network calls.
import { allocateWords, formatNumber, validatePlannerInputs } from './logic.js';

const root = document.querySelector('[data-ut]');
const panel = root?.querySelector('[data-ut-planner]');

if (panel) {
  const outcomes = JSON.parse(root.dataset.plan);
  const fields = {
    total: panel.querySelector('[data-ut-total]'),
    intro: panel.querySelector('[data-ut-intro]'),
    conclusion: panel.querySelector('[data-ut-conclusion]'),
  };
  const status = panel.querySelector('[data-ut-planner-status]');
  const range = panel.querySelector('[data-ut-range]');
  const tableWrap = panel.querySelector('[data-ut-table-wrap]');
  const rows = panel.querySelector('[data-ut-rows]');

  const addRow = (section, criteria, words, isTotal = false) => {
    const row = rows.insertRow();
    const heading = document.createElement('th');
    heading.scope = 'row';
    heading.textContent = section;
    row.append(heading);
    row.insertCell().textContent = criteria;
    row.insertCell().textContent = formatNumber(words);
    if (isTotal) row.className = 'ut-total-row';
  };

  const render = (announce) => {
    const errors = validatePlannerInputs({
      total: fields.total.value,
      introPercent: fields.intro.value,
      conclusionPercent: fields.conclusion.value,
    });
    for (const [name, field] of Object.entries(fields)) {
      const message = errors[name] ?? '';
      panel.querySelector(`[data-ut-error="${name}"]`).textContent = message;
      field.setAttribute('aria-invalid', String(Boolean(message)));
    }

    rows.replaceChildren();
    if (Object.keys(errors).length) {
      tableWrap.hidden = true;
      range.textContent = '';
      if (announce) status.textContent = 'Some entries need changing before the plan can be shown.';
      return;
    }

    const total = Number(fields.total.value);
    const plan = allocateWords({
      total,
      introPercent: Number(fields.intro.value),
      conclusionPercent: Number(fields.conclusion.value),
      criteriaPerOutcome: outcomes.map((outcome) => outcome.criteria),
    });

    addRow('Introduction', '–', plan.intro);
    outcomes.forEach((outcome, index) => addRow(`Learning outcome ${outcome.number}`, String(outcome.criteria), plan.outcomes[index]));
    addRow('Conclusion', '–', plan.conclusion);
    addRow('Total', String(outcomes.reduce((sum, outcome) => sum + outcome.criteria, 0)), plan.target, true);

    tableWrap.hidden = false;
    range.textContent = `Allowed range (plus or minus 10%): ${formatNumber(plan.allowedMin)} to ${formatNumber(plan.allowedMax)} words.`;
    if (announce) {
      status.textContent =
        plan.target === total
          ? `Plan updated for ${formatNumber(total)} words.`
          : `Plan updated. Figures are rounded to the nearest 10, so they add up to ${formatNumber(plan.target)}.`;
    }
  };

  // The table follows every keystroke; the screen-reader announcement waits until the entry is finished.
  Object.values(fields).forEach((field) => {
    field.addEventListener('input', () => render(false));
    field.addEventListener('change', () => render(true));
  });
  panel.querySelector('[data-ut-form]').addEventListener('submit', (event) => event.preventDefault());
  if (fields.total.value) render(false);
}
