import { test, expect } from '@playwright/test';

test('проверка отображения элементов навигации хэдера', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'GitHub repository' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Discord server' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Switch between dark and light' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Search (Ctrl+K)' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
});

test('проверка корректных названий элементов навигации хэдера', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText('Playwright');
  await expect(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
  await expect(page.getByRole('link', { name: 'API' })).toContainText('API');
  await expect(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
  await expect(page.getByLabel('Main', { exact: true })).toContainText('Community');
});

test('проверка атрибутов href хэддера ', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute('href', '/');
  await expect(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href','/docs/intro');
  await expect(page.getByRole('link', { name: 'API' })).toHaveAttribute('href','/docs/api/class-playwright');
  await expect(page.getByRole('link', { name: 'Community' })).toHaveAttribute('href','/community/welcome');
});

test('проверка переключения лайв мода', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByLabel('Switch between dark and light').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByLabel('Switch between dark and light').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('проверка заголовка страницы', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText('Playwright enables reliable end-to-end testing for modern web apps.');
});

test('проверка кнопки getStarted страницы', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect.soft(page.getByRole('banner')).toContainText('Get started');
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href','/docs/intro');
});