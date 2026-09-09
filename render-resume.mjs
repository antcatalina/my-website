/**
 * Renders src/files/Catalina_Resume.html to a single-page Letter PDF at
 * src/files/Catalina_Resume.pdf (the file linked from the site's nav).
 *
 * Playwright lives in the passportiq/frontend repo. Run from this directory:
 *   node render-resume.mjs
 */
import { createRequire } from 'module';
import { pathToFileURL, fileURLToPath } from 'url';
import { dirname, join } from 'path';

const here = dirname(fileURLToPath(import.meta.url));

// Resolve playwright from passportiq/frontend where it's actually installed.
const _require = createRequire(
  join(here, '..', 'passportiq', 'frontend', 'node_modules', 'playwright', 'package.json'),
);
const { chromium } = _require('playwright');

const htmlPath = join(here, 'src', 'files', 'Catalina_Resume.html');
const pdfPath = join(here, 'src', 'files', 'Catalina_Resume.pdf');

// Letter @ 0.5in margins => content area 7.5in x 10in = 720 x 960 css px.
const PAGE_BUDGET_PX = 960;

const browser = await chromium.launch();
// Short viewport so scrollHeight reports TRUE content height, not the viewport.
const page = await browser.newPage({ viewport: { width: 720, height: 100 } });
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });

const contentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
const pages = Math.ceil(contentHeight / PAGE_BUDGET_PX);
console.log(`Content height: ${contentHeight}px (budget ${PAGE_BUDGET_PX}/page) -> ${pages} page(s)`);
if (pages > 1) {
  console.warn('WARNING: Content exceeds one page -- tighten spacing/copy in Catalina_Resume.html.');
}

await page.pdf({ path: pdfPath, printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`Wrote ${pdfPath}`);
