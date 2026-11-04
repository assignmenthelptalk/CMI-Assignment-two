// Run with: npm test
// The "Chat with us" button is a round icon on phones. The words must stay in the page (visually hidden, not removed)
// so screen readers and voice control still find a button called "Chat with us".
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('./ChatWidget.astro', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
const css = source.slice(source.indexOf('<style'));
const phoneRules = [...css.matchAll(/@media \(max-width: 640px\) \{([\s\S]*?)\n  \}/g)].map((match) => match[1]).join('\n');

test('the button keeps its words in a label span and an aria-label, so it is still named "Chat with us"', () => {
  assert.match(source, /<button[^>]*id="chat-trigger"[^>]*aria-label="Chat with us"[^>]*>/);
  assert.match(source, /<button[^>]*id="chat-trigger"[\s\S]*?<span class="chat-trigger-label">Chat with us<\/span>[\s\S]*?<\/button>/);
});

test('on phones the button is a 48px round icon and the label is clipped, not removed', () => {
  assert.match(phoneRules, /\.chat-trigger \{[^}]*width: 48px/);
  assert.match(phoneRules, /\.chat-trigger \{[^}]*padding: 0/);
  const label = phoneRules.match(/\.chat-trigger-label \{([^}]*)\}/)[1];
  assert.match(label, /clip: rect\(0, 0, 0, 0\)/);
  assert.match(label, /position: absolute/);
  assert.ok(!/display:\s*none|visibility:\s*hidden|font-size:\s*0/.test(label), 'the label must stay in the accessibility tree');
});

test('the button keeps its tap size, its position and the cookie banner rule', () => {
  const base = css.match(/\.chat-trigger \{([^}]*)\}/)[1];
  assert.match(base, /min-height: 48px/);
  assert.match(base, /position: fixed/);
  assert.match(base, /right: 20px/);
  assert.match(base, /bottom: 20px/);
  assert.match(css, /body:has\(\.cookie-banner:not\(\[hidden\]\)\) \.chat-trigger \{ bottom: 14rem; \}/);
});

test('the desktop button still shows its words (the label is only hidden inside the phone rule)', () => {
  const outsidePhone = css.replace(/@media \(max-width: 640px\) \{[\s\S]*?\n  \}/g, '');
  assert.ok(!/\.chat-trigger-label/.test(outsidePhone), 'no label rule outside the phone media query');
});
