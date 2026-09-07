const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const base = process.env.TEST_URL || 'http://127.0.0.1:8766/experiencia-pratica-iv/html/index.html';
  const results = [];
  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['inicio', 'projetos', 'cadastro']) {
      await page.goto(`${base}#/${route}`);
      await page.locator('[v-cloak]').waitFor({ state: 'detached' });
      const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      results.push({ width, route, violations: scan.violations.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map((node) => node.target) })) });
    }
  }
  fs.mkdirSync(`${__dirname}/evidencias`, { recursive: true });
  fs.writeFileSync(`${__dirname}/evidencias/acessibilidade.json`, JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results));
  await browser.close();
  if (results.some((result) => result.violations.length)) process.exitCode = 1;
})().catch((error) => { console.error(error); process.exit(1); });
