const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
  fs.mkdirSync(`${__dirname}/evidencias`, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const base = process.env.TEST_URL || 'http://127.0.0.1:8766/experiencia-pratica-iv/html/index.html';
  await page.goto(base);
  await page.getByRole('link', { name: 'Conhecer projetos' }).click();
  await page.getByLabel('Buscar projeto').fill('Caderno');
  assert.equal(await page.locator('article').count(), 1);
  await page.getByRole('button', { name: 'Salvar favorito' }).click();
  await page.reload();
  await page.getByRole('button', { name: 'Remover dos favoritos' }).waitFor();
  assert.equal(await page.getByRole('button', { name: 'Remover dos favoritos' }).count(), 1);
  await page.getByLabel('Buscar projeto').fill('inexistente');
  await page.getByText('Nenhum projeto corresponde aos filtros.', { exact: false }).waitFor();
  await page.getByLabel('Buscar projeto').fill('');
  await page.locator('article').first().screenshot({ path: `${__dirname}/evidencias/projeto-dinamico.png` });
  await page.getByRole('link', { name: 'Quero participar', exact: true }).click();
  await page.getByRole('button', { name: 'Validar cadastro de teste' }).click();
  assert.equal(await page.locator('[aria-invalid="true"]').count(), 4);
  await page.screenshot({ path: `${__dirname}/evidencias/formulario-erros.png` });
  await page.getByLabel('Nome completo fictício').fill('Aluno Teste');
  await page.getByLabel('E-mail de teste').fill('aluno@example.com');
  await page.getByLabel('Frente de atuação').selectOption('educacao');
  await page.getByLabel('Estou usando dados fictícios').check();
  await page.getByRole('button', { name: 'Validar cadastro de teste' }).click();
  await page.getByText('Cadastro de teste validado.', { exact: false }).waitFor();
  assert(!(await page.evaluate(() => JSON.stringify(localStorage))).includes('aluno@example.com'));
  await page.goto(`${base}#/naoexiste`);
  await page.getByRole('heading', { name: 'Página não encontrada' }).waitFor();
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['inicio', 'projetos', 'cadastro']) {
      await page.goto(`${base}#/${route}`);
      await page.locator('[v-cloak]').waitFor({ state: 'detached' });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}: overflow ${width}`);
    }
  }
  await page.evaluate(() => localStorage.setItem('rede-aurora:preferencias:v1', '{invalid'));
  await page.reload();
  await page.getByText('Não foi possível recuperar as preferências.', { exact: false }).waitFor();
  assert.deepEqual(errors, []);
  console.log('PASS: rotas, filtro e vazio, favorito após reload, 4 erros de formulário, preenchimento válido, ausência de dados pessoais no storage, rota inválida, 9 layouts, JSON corrompido e zero erros JS.');
  await browser.close();
})().catch((error) => { console.error(error); process.exit(1); });
