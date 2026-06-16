const fs = require('fs');
const { chromium } = require('playwright');
const path = require('path');
const { createLeadData } = require('./test-data/leadData');

const TARGET_URL = 'https://test.netlify.app/';
const EXPECTED_EMPLOYEES = '51-500';
const SCREENSHOT_PATH = path.join(__dirname, 'screenshots', 'before-submit.png');

function verifySubmittedQueryParams(pageUrl, submitted) {
  const params = new URL(pageUrl).searchParams;

  const expected = {
    name: submitted.name,
    email: submitted.email,
    phone: submitted.phone,
    company: submitted.company,
    website: submitted.website,
    number_of_employees: submitted.employees,
  };

  for (const [key, value] of Object.entries(expected)) {
    if (params.get(key) !== value) {
      throw new Error(
        `Query parameter "${key}" expected "${value}" but got "${params.get(key)}"`
      );
    }
  }
}

async function run() {
  const browser = await chromium.launch({ headless: process.env.HEADED !== '1' });

  try {
    const page = await browser.newPage();
    await page.goto(TARGET_URL);

    const leadData = createLeadData();
    console.log(`Using lead: ${leadData.name}, ${leadData.email}, ${leadData.phone}`);

    await page.getByLabel('Name *', { exact: true }).fill(leadData.name);
    await page.getByLabel('Email *', { exact: true }).fill(leadData.email);
    await page.getByLabel('Phone *', { exact: true }).fill(leadData.phone);
    await page.getByLabel('Company', { exact: true }).fill(leadData.company);
    await page.getByLabel('Website', { exact: true }).fill(leadData.website);

    const employeesSelect = page.getByLabel('Number of Employees');
    await employeesSelect.selectOption(EXPECTED_EMPLOYEES);

    const selectedEmployees = await employeesSelect.inputValue();
    if (selectedEmployees !== EXPECTED_EMPLOYEES) {
      throw new Error(
        `Expected "${EXPECTED_EMPLOYEES}" to be selected, but got "${selectedEmployees}"`
      );
    }

    fs.mkdirSync(path.dirname(SCREENSHOT_PATH), { recursive: true });
    await page.screenshot({
      path: SCREENSHOT_PATH,
      fullPage: true,
    });
    console.log(`Screenshot saved to: ${SCREENSHOT_PATH}`);

    await Promise.all([
      page.waitForURL('**/thank-you.html**'),
      page.getByRole('button', { name: 'Request a call back' }).click(),
    ]);

    await page
      .getByRole('heading', { name: 'Thank You!' })
      .waitFor({ state: 'visible' });

    verifySubmittedQueryParams(page.url(), {
      ...leadData,
      employees: EXPECTED_EMPLOYEES,
    });

    console.log('Successfully reached the thank-you page.');
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error('Automation failed:', error.message);
  process.exit(1);
});
