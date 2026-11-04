// Pass checklist: remembers ticks in this browser (localStorage, this unit only), counts them,
// clears them and prints the list. Every storage call is wrapped, so the page works with storage blocked.
const root = document.querySelector('[data-ut]');
const panel = root?.querySelector('[data-ut-checklist]');

if (panel) {
  const key = `cmi-unit-tools:checklist:${root.dataset.unit}`;
  const boxes = [...panel.querySelectorAll('input[type="checkbox"]')];
  const status = panel.querySelector('[data-ut-status]');
  const storageNote = panel.querySelector('[data-ut-storage-note]');

  const readTicks = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const saveTicks = () => {
    const ticked = boxes.filter((box) => box.checked).map((box) => box.dataset.id);
    try {
      if (ticked.length) localStorage.setItem(key, JSON.stringify(ticked));
      else localStorage.removeItem(key);
      storageNote.hidden = true;
    } catch {
      storageNote.hidden = false;
    }
  };

  const countText = () => `${boxes.filter((box) => box.checked).length} of ${boxes.length} criteria ticked.`;

  const saved = readTicks();
  boxes.forEach((box) => {
    box.checked = saved.includes(box.dataset.id);
    box.addEventListener('change', () => {
      saveTicks();
      status.textContent = countText();
    });
  });
  status.textContent = countText();

  panel.querySelector('[data-ut-clear]').addEventListener('click', () => {
    boxes.forEach((box) => (box.checked = false));
    saveTicks();
    status.textContent = `All ticks cleared. ${countText()}`;
  });

  // "Print checklist" marks <html> so the print stylesheet shows the checklist alone.
  const page = document.documentElement;
  panel.querySelector('[data-ut-print]').addEventListener('click', () => {
    page.classList.add('ut-printing');
    window.print();
  });
  window.addEventListener('afterprint', () => page.classList.remove('ut-printing'));
}
