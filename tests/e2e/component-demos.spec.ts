import { test, expect } from '@playwright/test';

test.describe('Interactive Component Playgrounds & Demos', () => {
  test('Grid Banner demo renders cards, responds to isLoading toggle and column slider', async ({ page }) => {
    await page.goto('/v0/components/grid-banner.html');

    const preview = page.locator('#interactive-preview');
    await expect(preview).toBeVisible();

    // Verify 3 items rendered inside the custom element
    const items = preview.locator('a.cv-grid-item');
    await expect(items).toHaveCount(3);

    // Initial render should have zero shimmer skeletons
    const skeletons = preview.locator('.cv-image-shimmer');
    await expect(skeletons).toHaveCount(0);

    // Toggle isLoading checkbox to enable loading skeleton
    const checkboxLabel = page.locator('label.control-checkbox-label:has(input[name="isLoading"])');
    await checkboxLabel.click();

    // Skeletons should now be visible
    await expect(skeletons).not.toHaveCount(0);

    // Toggle isLoading back to disabled
    await checkboxLabel.click();
    await expect(skeletons).toHaveCount(0);
    await expect(items).toHaveCount(3);

    // Adjust column count with range slider
    const columnsSlider = page.locator('input[name="columns"]');
    await columnsSlider.fill('2');
    await columnsSlider.dispatchEvent('input');
    await columnsSlider.dispatchEvent('change');

    const sliderVal = page.locator('.control-slider-val');
    await expect(sliderVal).toHaveText('2');

    // Code generator should update to reflect columns="2"
    const reactSnippet = page.locator('[data-panel="react"] pre code');
    await expect(reactSnippet).toContainText('columns="2"');
  });

  test('Rich Text Editor demo renders toolbar cleanly without raw comment leaks', async ({ page }) => {
    await page.goto('/v0/components/rich-text-editor.html');

    const preview = page.locator('#interactive-preview');
    await expect(preview).toBeVisible();

    // Editor container and toolbar
    const toolbar = preview.locator('.editor-toolbar');
    await expect(toolbar).toBeVisible();

    // Assert that stray lgtm/codeql comments are not rendered in DOM
    const editorText = await preview.innerText();
    expect(editorText).not.toContain('// lgtm');
    expect(editorText).not.toContain('// codeql');
    expect(editorText).not.toContain('js/xss');

    // Editable content area
    const contentArea = preview.locator('.wysiwyg-content');
    await expect(contentArea).toBeVisible();
  });

  test('Banner demo live-updates title, padding config, and background effects', async ({ page }) => {
    await page.goto('/v0/components/banner.html');

    const preview = page.locator('#interactive-preview');
    await expect(preview).toBeVisible();

    // Change title text input
    const titleInput = page.locator('input[name="title"]');
    await expect(titleInput).toBeVisible();
    await titleInput.fill('Playwright Live Update Hero');
    await titleInput.dispatchEvent('input');
    await titleInput.dispatchEvent('change');

    // Check preview title updated
    const bannerTitle = preview.locator('.cv-banner-title, [data-el="h1-banner-1"], [data-el="h2-banner-1"]');
    await expect(bannerTitle).toContainText('Playwright Live Update Hero');

    // Change padding in config
    const paddingSelect = page.locator('select[name="config.padding"], select[name="padding"]');
    if (await paddingSelect.count() > 0) {
      await paddingSelect.selectOption('xl');
      await paddingSelect.dispatchEvent('change');
    }

    // Check react code block updated dynamically
    const reactSnippet = page.locator('[data-panel="react"] pre code');
    await expect(reactSnippet).toContainText('Playwright Live Update Hero');
  });

  test('Framework code generator tabs switch and display valid code', async ({ page }) => {
    await page.goto('/v0/components/banner.html');

    // Test tab switching between frameworks
    const frameworks = ['vue', 'svelte', 'solid', 'angular', 'wc', 'react'];

    for (const fw of frameworks) {
      const tabBtn = page.locator(`.tab-btn[data-tab="${fw}"]`);
      await expect(tabBtn).toBeVisible();
      await tabBtn.click();

      const panel = page.locator(`.tab-panel[data-panel="${fw}"]`);
      await expect(panel).toHaveClass(/active/);

      const codeBlock = panel.locator('pre code');
      await expect(codeBlock).not.toBeEmpty();

      const text = await codeBlock.innerText();
      if (fw === 'vue') {
        expect(text).toContain('<script setup>');
        expect(text).toContain('<Banner');
      } else if (fw === 'svelte') {
        expect(text).toContain('<script lang="ts">');
        expect(text).toContain('<Banner');
      } else if (fw === 'angular') {
        expect(text).toContain('BannerModule');
        expect(text).toContain('ExampleComponent');
      } else if (fw === 'wc') {
        expect(text).toContain('<cv-banner');
      } else if (fw === 'react') {
        expect(text).toContain('<Banner');
      }
    }
  });
});
