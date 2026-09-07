# Rede Aurora — Experiência Prática IV

SPA acadêmica em Vue 3.5.21, com módulos JavaScript nativos. Organização fictícia;
nenhuma inscrição, doação ou comunicação real é realizada.

[Abrir site](https://renatomarinhofr.github.io/rede-aurora-faculdade/) ·
[Repositório](https://github.com/renatomarinhofr/rede-aurora-faculdade)

## Executar

Na pasta do projeto, execute `python3 -m http.server 8000` e acesse
`http://localhost:8000/html/index.html`. Módulos ES precisam de HTTP;
abrir por `file://` não é suportado. Para executar o fonte não é necessário
instalar dependências. Para build/testes: Node.js 22+, `npm ci`, `npm run build`.
O diretório `dist/` contém a versão publicável; sirva-o via HTTP e abra `index.html`.

## Publicação e manutenção

GitHub Pages publica o artefato `dist/` pelo workflow `.github/workflows/pages.yml`
em pushes para `main`. O workflow instala pelo lockfile, compila e envia o artefato.
Não há segredos de serviço ou credenciais no código; a publicação usa o token
temporário de Actions com permissões explícitas de Pages.

GitFlow: `main` estável, `develop` integração, `feature/acessibilidade-deploy`
para a evolução e `release/1.0.0` para lançamento. Alterações entram por pull
request. Trabalho individual: revisão técnica assistida, sem simular aprovação
independente. Commits semânticos `feat`, `fix`, `docs`; versão inicial `v1.0.0`.

Para atualizar conteúdo, edite `js/modules/projects.js`. Para regras de validação,
edite `validation.js`. Preserve a chave versionada de preferências ou implemente
migração explícita. Nunca salve dados pessoais no armazenamento deste protótipo.
Antes de integrar: execute testes, revise o diff e gere o build. Para reverter
uma versão publicada, use um commit de reversão e uma nova versão PATCH,
preservando o histórico.

## Organização e fluxos

- `html/`: documento e templates declarativos.
- `css/`: base visual, componentes e ajustes da SPA.
- `imagens/`: fotos WebP e logo local.
- `js/main.js`: composição da aplicação e eventos.
- `js/modules/`: rotas, dados, validação e armazenamento separados.
- `js/vendor/`: Vue 3.5.21, distribuição de produção, licença MIT incluída.
- `evidencias/`: capturas reais dos testes.

Rotas: `#/inicio`, `#/projetos`, `#/cadastro`. Busca e filtro de categoria
combináveis; favoritos persistidos na chave `rede-aurora:preferencias:v1`.
Nome e e-mail não são gravados. Apagar preferências remove somente essa chave,
após confirmação. Falhas de armazenamento produzem orientação visível.

## Verificação

Em 06/09/2026, o teste Chrome passou: rotas, filtro/vazio, persistência após
reload, quatro erros no formulário vazio, validação de dados fictícios,
ausência de e-mail no storage, rota inválida, nove combinações rota/largura
(375, 768, 1280px), recuperação de JSON corrompido e zero erros JS não tratados.
Na versão IV, a mesma suíte passou também sobre o build minificado. O axe-core
não encontrou violações automatizadas WCAG 2 A/AA e 2.1 A/AA nas três rotas,
em 375 e 1280px. Relatório em `evidencias/acessibilidade.json`.
Na evolução 1.1.0, a auditoria cobre os modos normal e alto contraste
(12 combinações), e a suíte verifica Enter/Tab/Escape no menu e no modal,
retorno de foco e alternância visual real do contraste por Espaço.
Isso não certifica conformidade integral: não houve auditoria completa com
leitores de tela, outros navegadores, usuários ou backend.

Para repetir, sirva o projeto e defina `TEST_URL` com a URL do index desejado;
execute `npm test` e `npm run test:a11y`. Os scripts usam Chrome instalado.
Para outra porta/caminho, ajuste somente `TEST_URL`.

## Acessibilidade e desempenho

Landmarks, títulos, labels, alt, link de salto, `aria-current`, `aria-expanded`,
`aria-invalid`, descrições de erro e região `role=status` compõem a semântica.
Troca de rota foca main; Escape no menu devolve o foco ao botão; o dialog nativo
contém a interação modal e permite cancelar. Movimento reduzido é respeitado.
Texto não depende apenas da cor para comunicar seleção ou erro.

O botão Alto contraste ativa fundo preto, texto branco (21:1) e ações amarelas
(19,56:1), com foco e bordas explícitas. O estado acompanha as rotas da sessão,
mas não persiste após recarregar. Há suporte CSS a forced-colors. As proporções
foram calculadas por luminância relativa; as telas foram auditadas com axe.

O build usa esbuild para empacotar/minificar JavaScript e minificar CSS, além de
html-minifier-terser para HTML. WebP local foi redimensionado para 1200px (hero)
e 1000px (projetos). Não se alega um resultado Lighthouse não medido.

## Fontes e créditos

- [Vue — documentação oficial](https://vuejs.org/guide/quick-start.html).
- Foto de voluntários: [RDNE Stock Project/Pexels](https://www.pexels.com/photo/volunteers-giving-donations-6646923/).
- Educação: [Anastasia Shuraeva/Pexels](https://www.pexels.com/photo/students-inside-a-classroom-8466902/).
- Alimentos: [Julia M Cameron/Pexels](https://www.pexels.com/photo/people-donating-food-to-a-charity-6995220/).
- Horta: [Alfo Medeiros/Pexels](https://www.pexels.com/photo/man-and-woman-watering-the-plants-12916211/).

Implementação, documentação e testes desenvolvidos com apoio de IA.
O progresso pedagógico no DreamShaper é separado de nota e de registro final
no Blackboard. Consulte o AVA para confirmar avaliação e situação acadêmica.
