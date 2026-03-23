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

test.describe('TextInput screenshot tests', () => {
  test('Underlined variant', async ({ page }) => {
    await page.goto(getPageURL('shared-textinput--underlined'));
    await disableAnimations(page);
    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot('underlined.png');
  });

  test('Bordered variant', async ({ page }) => {
    await page.goto(getPageURL('shared-textinput--bordered'));
    await disableAnimations(page);
    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot('bordered.png');
  });

  test('With Icon', async ({ page }) => {
    await page.goto(getPageURL('shared-textinput--with-icon'));
    await disableAnimations(page);
    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot('with-icon.png');
  });

  test('With Value', async ({ page }) => {
    await page.goto(getPageURL('shared-textinput--with-value'));
    await disableAnimations(page);
    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot('with-value.png');
  });
});
