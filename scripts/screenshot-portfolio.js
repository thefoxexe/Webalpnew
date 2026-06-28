#!/usr/bin/env node
/**
 * Usage: node scripts/screenshot-portfolio.js "https://goldenbulls.ch" goldenbulls
 *        node scripts/screenshot-portfolio.js "https://example.com" project-name
 */
const { chromium } = require('/tmp/pw_temp/node_modules/playwright');
const path = require('path');

const [,, url, slug] = process.argv;

if (!url || !slug) {
  console.error('Usage: node scripts/screenshot-portfolio.js <url> <slug>');
  process.exit(1);
}

(async () => {
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy || ''
  const proxyArgs = proxy ? [`--proxy-server=${proxy}`] : []

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors', ...proxyArgs],
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2500);
    const outPath = path.join(__dirname, '../public/portfolio', `${slug}.jpg`);
    await page.screenshot({ path: outPath, type: 'jpeg', quality: 92 });
    console.log(`✓ Saved: ${outPath}`);
  } catch (e) {
    console.error(`✗ Failed: ${e.message}`);
    process.exit(1);
  }

  await browser.close();
})();
