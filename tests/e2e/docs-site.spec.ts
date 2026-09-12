import { test, expect } from '@playwright/test';

const COMPONENT_SLUGS = [
  'banner',
  'announcement-bar',
  'grid-banner',
  'media-grid',
  'row-scrollable',
  'sliding-banner',
  'alternating-slider',
  'timer-widget',
  'wysiwyg-renderer',
  'rich-text-editor',
];

test.describe('Documentation Site Health & Navigation', () => {
  test('landing page loads with navigation and brand lockup', async ({ page }) => {
    await page.goto('/v0/index.html');
    await expect(page).toHaveTitle(/ContentVeda UI/);

    const brand = page.locator('.cv-brand');
    await expect(brand).toBeVisible();

    const heading = page.locator('h1');
    await expect(heading).toContainText(/A modern UI kit library/i);

    // Sidebar should list component links
    for (const slug of COMPONENT_SLUGS) {
      const link = page.locator(`aside.docs-sidebar a[href="components/${slug}.html"]`);
      await expect(link).toBeAttached();
    }
  });

  test('theme toggle switches between dark and light modes', async ({ page }) => {
    await page.goto('/v0/index.html');

    const html = page.locator('html');
    const themeBtn = page.locator('#theme-toggle');
    await expect(themeBtn).toBeVisible();

    const initialTheme = await html.getAttribute('data-theme') || 'dark';
    const targetTheme = initialTheme === 'dark' ? 'light' : 'dark';

    await themeBtn.click();
    await expect(html).toHaveAttribute('data-theme', targetTheme);

    // Verify localStorage persistence
    const storedTheme = await page.evaluate(() => localStorage.getItem('contentveda-theme'));
    expect(storedTheme).toBe(targetTheme);
  });

  for (const slug of COMPONENT_SLUGS) {
    test(`component page /v0/components/${slug}.html loads with zero console errors`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('pageerror', err => {
        pageErrors.push(err.message);
      });

      await page.goto(`/v0/components/${slug}.html`);

      // Verify page title and custom element presence
      await expect(page.locator(`cv-${slug}`)).toBeAttached();

      expect(pageErrors, `Page errors on ${slug}: ${pageErrors.join(', ')}`).toHaveLength(0);
      expect(consoleErrors, `Console errors on ${slug}: ${consoleErrors.join(', ')}`).toHaveLength(0);
    });
  }
});
