const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'https://test.netlify.app/';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
const SCREENSHOT_PATH = path.join(SCREENSHOT_DIR, 'before-submit.png');

const formData = {
  name: 'Shoham Liebermann',
  email: 'shoham.liebermann@acmetech.test',
  phone: '+972-50-000-0000',
  company: 'Acme Technologies Ltd.',
  website: 'https://www.acmetech-solutions.test',
  employees: '51-500',
};

async function run() {
  const browser = await chromium.launch();

  try {
    const page = await browser.newPage();
    await page.goto(TARGET_URL);

    await page.getByLabel('Name').fill(formData.name);
    await page.getByLabel('Email').fill(formData.email);
    await page.getByLabel('Phone').fill(formData.phone);
    await page.getByLabel('Company').fill(formData.company);
    await page.getByLabel('Website').fill(formData.website);

    const employeesSelect = page.getByLabel('Number of Employees');
    await employeesSelect.selectOption(formData.employees);

    const selectedEmployees = await employeesSelect.inputValue();
    if (selectedEmployees !== formData.employees) {
      throw new Error(
        `Expected "${formData.employees}" to be selected, but got "${selectedEmployees}"`
      );
    }

    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

    await page.screenshot({
      path: SCREENSHOT_PATH,
      fullPage: true,
    });
    console.log(`Screenshot saved to: ${SCREENSHOT_PATH}`);

    await Promise.all([
      page.waitForURL('**/thank-you.html**'),
      page.getByRole('button', { name: 'Request a call back' }).click(),
    ]);

    console.log('Successfully reached the thank-you page.');
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error('Automation failed:', error);
  process.exitCode = 1;
});
