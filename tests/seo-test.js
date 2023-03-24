const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Replace 'http://localhost:3000' with the URL of your website.
  await page.goto('http://localhost:3000');

  await Promise.all([
    page.waitForNavigation(),
    page.click('text=Accept'),
  ]);

  // Run the Lighthouse SEO audit.
  const lighthouse = await page.lighthouse({
    output: 'html',
    extraHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
    },
    emulatedFormFactor: 'desktop',
    onlyCategories: ['seo'],
  });

  // Save the Lighthouse report to a file.
  await lighthouse.report({ format: 'html', savePath: 'lighthouse-report.html' });

  await browser.close();
})();