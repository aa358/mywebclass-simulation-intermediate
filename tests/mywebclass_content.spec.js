// @ts-check
const { test, expect } = require('@playwright/test');

const baseUrl = 'http://localhost:3000';

test('Should have MyWebClass.org title', async ({ page }) => {
  await page.goto(baseUrl);
  await expect(page).toHaveTitle('MyWebClass.org');
});

test('test', async ({ page }) => {
  await page.goto(`${baseUrl}/src/index.html`);

  // Navigation
  await page.getByRole('listitem', { name: 'Our Story' }).click();
  await page.getByRole('link', { name: 'Privacy Policy' }).click();
  await page.getByRole('link', { name: 'Content Template' }).click();
  await page.getByRole('navigation', { name: 'Main navigation' }).click();
  await page.getByRole('link', { name: 'MyWebClass.org' }).click();
  await page.getByRole('heading', { name: 'Index of C:\\' }).click();

  // Consent banner
  await page.locator('#gdpr-consent-banner div').click();
  await page.getByText('This website uses cookies to ensure you get the best experience on our website.').click();
  await page.locator('#gdpr-consent-banner').click();

  // Content
  await page.getByText('MyWebClass.org About Content Template About MyWebClass MyWebClass is a project a').click();
  await page.getByText('Privacy Policy We at mywebclass.org are committed to protecting your privacy. Th').click();
  await page.getByRole('heading', { name: 'Information we collect' }).click();
  await page.getByRole('main').click();
  await page.getByRole('heading', { name: 'About Us' }).click();
  await page.getByRole('heading', { name: 'Our Resources' }).click();
  await page.getByRole('heading', { name: 'Our Story' }).click();
  await page.getByText('MyWebClass is a project aimed at providing educational resources for web develop').click();
  await page.getByRole('heading', { name: 'About MyWebClass' }).click();

  // GDPR
  await page.getByRole('contentinfo').getByText('This website uses cookies to ensure you get the best experience on our website.').click();
});
