# Jones Automation Exercise

A standalone Playwright automation that completes the callback form, selects `51-500` employees, captures a screenshot before submission, and confirms navigation to the thank-you page.

## Requirements

- Node.js 20 or later
- npm

## Installation

```bash
npm install
npm run install-browser
```

For a clean installation from the committed lock file, use:

```bash
npm ci
npm run install-browser
```

## Run

```bash
npm start
```

The automation creates `before-submit.png` in the project root and prints a success message after reaching the thank-you page.

## Project Files

- `main.js` - Playwright automation
- `before-submit.png` - screenshot generated before submission
- `billing-widget-analysis.md` - manual QA and product analysis
- `package.json` and `package-lock.json` - project dependencies
