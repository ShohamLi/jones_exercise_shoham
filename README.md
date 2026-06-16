# Jones Automation Exercise

Standalone Playwright automation for the callback form at [test.netlify.app](https://test.netlify.app/).

## Requirements

- Node.js 20 or later
- npm

## Installation

```bash
npm install
```

For a clean install from the lock file:

```bash
npm ci
```

## Install Chromium

Browser binaries are installed separately:

```bash
npm run install-browser
```

## Run

```bash
npm start
```

Run with a visible browser (local debugging):

```bash
HEADED=1 npm start
```

## Output

On success, the script:

- logs the generated lead data (name, email, phone)
- writes a full-page screenshot to `screenshots/before-submit.png` (before submit)
- prints `Successfully reached the thank-you page.`

On failure, the script prints a concise error and exits with code `1`.

The screenshot is overwritten on every successful run. Form values are generated automatically by `test-data/leadData.js` using Faker — no manual input is required.

## Project files

```text
main.js                                  # Part 1 automation
test-data/leadData.js                    # Faker-based lead data generator
screenshots/before-submit.png            # generated screenshot
README.md
package.json
package-lock.json
.gitignore
.github/workflows/playwright-automation.yml
doc/question-2-qa.md                     # Part 2 QA analysis
```
