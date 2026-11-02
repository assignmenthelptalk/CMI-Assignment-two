// Structure outline: Copy and Download as .txt for the outline text already written into the page.
// The download is built in the browser from the text on screen; nothing is requested or sent.
const root = document.querySelector('[data-ut]');
const panel = root?.querySelector('[data-ut-outline]');

if (panel) {
  const text = panel.querySelector('[data-ut-outline-text]');
  const status = panel.querySelector('[data-ut-outline-status]');

  panel.querySelector('[data-ut-copy]').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(text.value);
      status.textContent = 'Outline copied.';
    } catch {
      text.select();
      status.textContent = document.execCommand?.('copy')
        ? 'Outline copied.'
        : 'Copying was blocked. The outline is selected, so you can copy it yourself.';
    }
  });

  const download = panel.querySelector('[data-ut-download]');
  download.addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([text.value], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = download.dataset.filename;
    link.click();
    URL.revokeObjectURL(url);
    status.textContent = 'Outline downloaded.';
  });
}
