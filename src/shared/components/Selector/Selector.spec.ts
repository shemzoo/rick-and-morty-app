import { expect, test } from '@playwright/test';

const getPageURL = (storyId: string) =>
  `http://localhost:6006/iframe.html?id=${storyId}&viewMode=story`;

const disableAnimations = async (page: any) => {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
      }
    `
  });
};

test.describe('Selector screenshot tests', () => {
  test('Large variant, closed', async ({ page }) => {
    await page.goto(getPageURL('shared-selector--large'));
    await disableAnimations(page);
    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot('large-closed.png');
  });

  test('Large variant, opened', async ({ page }) => {
    await page.goto(getPageURL('shared-selector--large'));
    await disableAnimations(page);
    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await page.getByTestId('selector-header').click();
    await expect(root).toHaveScreenshot('large-opened.png');
  });

  test('Small, selected', async ({ page }) => {
    await page.goto(getPageURL('shared-selector--small-selected'));
    await disableAnimations(page);
    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot('small-selected.png');
  });

  test('With Custom Option Renderer', async ({ page }) => {
    await page.goto(getPageURL('shared-selector--with-custom-option-renderer'));
    await disableAnimations(page);
    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot('custom-renderer.png');
  });
});
