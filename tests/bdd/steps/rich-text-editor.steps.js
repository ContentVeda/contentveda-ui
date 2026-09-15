const { When, Then } = require('@cucumber/cucumber');
const assert = require('node:assert/strict');

// Regression coverage for the stale-selection-ref bug: savedRange used to live
// in useStore state (async setState on the React target), so saveSelection()
// -> restoreSelection() called back-to-back around this blocking prompt()
// read a stale/null value and the insert silently failed. See
// src/components/RichTextEditor.lite.tsx (savedRangeRef).
When('I will answer any prompt dialog with {string}', function (answer) {
  this.page.once('dialog', (dialog) => dialog.accept(answer));
});

When('I click the toolbar button titled {string}', async function (title) {
  await this.subject().locator(`button[title="${title}"]`).click();
});

// A toolbar insert needs a live selection/cursor inside the contentEditable
// region to restore into -- exactly like a real author clicking into the
// editor before using a toolbar button. Without this, there is nothing for
// saveSelection()/restoreSelection() to save or restore, and the insert is
// (correctly) a no-op, regardless of the stale-ref bug this suite guards
// against elsewhere.
When('I click into the editable content', async function () {
  await this.subject().locator('.wysiwyg-content').click();
});

// Drags the resize handle that appears after clicking a resizable element
// (image/video/audio/social-embed/widget). Exercises the real mouse
// down/move/up sequence the drag depends on, rather than calling the
// underlying state method directly, since the bug this guards against
// (handle positioned off-element -- see updateResizeHandlePosition) only
// shows up when the handle's rendered screen position is used.
When('I drag the resize handle right by {int}px and down by {int}px', async function (dx, dy) {
  const handle = this.subject().locator('.cv-resize-handle');
  await handle.waitFor({ state: 'visible', timeout: 5000 });
  const box = await handle.boundingBox();
  const startX = box.x + box.width / 2;
  const startY = box.y + box.height / 2;
  await this.page.mouse.move(startX, startY);
  await this.page.mouse.down();
  await this.page.mouse.move(startX + dx, startY + dy, { steps: 10 });
  await this.page.mouse.up();
});

Then('the saved content should include {string}', async function (expectedSubstring) {
  const html = await this.subject().evaluate((el) => el.state.getCanonicalHtml());
  assert.ok(html.includes(expectedSubstring), `Expected saved content to include "${expectedSubstring}", got:\n${html}`);
});

Then('the saved content should not include {string}', async function (unexpectedSubstring) {
  const html = await this.subject().evaluate((el) => el.state.getCanonicalHtml());
  assert.ok(!html.includes(unexpectedSubstring), `Expected saved content NOT to include "${unexpectedSubstring}", got:\n${html}`);
});

// Regression coverage for the CSS-specificity bug where the source textarea
// stayed visible underneath the visual editor at the same time (a base rule
// on .editor-source forced display:flex !important at higher specificity
// than the .cv-mode-src-visual toggle). Both panes must never be visible
// together.
Then('exactly one of the visual editor or the source view should be visible', async function () {
  const visualVisible = await this.subject().locator('.editor-content .wysiwyg-content').isVisible();
  const sourceVisible = await this.subject().locator('.editor-source textarea').isVisible();
  assert.notEqual(visualVisible, sourceVisible, `Expected exactly one of visual/source to be visible, got visual=${visualVisible} source=${sourceVisible}`);
});
