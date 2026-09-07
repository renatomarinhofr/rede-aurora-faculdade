const fs = require('node:fs/promises');
const path = require('node:path');
const esbuild = require('esbuild');
const { minify } = require('html-minifier-terser');
(async () => {
  const root = __dirname;
  const out = path.join(root, 'dist');
  await fs.mkdir(out, { recursive: true });
  await esbuild.build({ entryPoints: [path.join(root, 'js/main.js')], outfile: path.join(out, 'js/main.js'), bundle: true, minify: true, format: 'esm', target: ['es2020'], legalComments: 'eof' });
  await fs.mkdir(path.join(out, 'css'), { recursive: true });
  for (const name of ['styles', 'components', 'app']) {
    const input = await fs.readFile(path.join(root, `css/${name}.css`), 'utf8');
    const result = await esbuild.transform(input, { loader: 'css', minify: true });
    await fs.writeFile(path.join(out, `css/${name}.css`), result.code);
  }
  const source = (await fs.readFile(path.join(root, 'html/index.html'), 'utf8')).replaceAll('../', './');
  await fs.writeFile(path.join(out, 'index.html'), await minify(source, { collapseWhitespace: true, removeComments: true, keepClosingSlash: true, caseSensitive: true }));
  await fs.cp(path.join(root, 'imagens'), path.join(out, 'imagens'), { recursive: true });
  await fs.copyFile(path.join(root, 'js/vendor/LICENSE-Vue'), path.join(out, 'LICENSE-Vue.txt'));
  await fs.writeFile(path.join(out, '.nojekyll'), '');
  console.log('Build concluído: dist/index.html, JS/CSS/HTML minificados e imagens locais.');
})().catch((error) => { console.error(error); process.exit(1); });
