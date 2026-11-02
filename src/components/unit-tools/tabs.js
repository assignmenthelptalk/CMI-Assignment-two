// Turns the study-tool panels into an accessible tab set (arrow keys, Home and End all work).
// Until this runs, the tab bar stays hidden and only the checklist shows, with a note saying so.
const root = document.querySelector('[data-ut]');

if (root) {
  const tablist = root.querySelector('[data-ut-tablist]');
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

  const select = (index, moveFocus = false) => {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (moveFocus) tabs[index].focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', (event) => {
      const target = {
        ArrowRight: (index + 1) % tabs.length,
        ArrowLeft: (index - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      }[event.key];
      if (target === undefined) return;
      event.preventDefault();
      select(target, true);
    });
  });

  tablist.hidden = false;
  root.querySelector('[data-ut-nojs]')?.remove();
  select(0);
}
