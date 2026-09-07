# Rede Aurora — Experiência Prática III

SPA acadêmica em Vue 3.5.21, com módulos JavaScript nativos. Organização fictícia;
nenhuma inscrição, doação ou comunicação real é realizada.

## Executar

Na pasta do projeto, execute `python3 -m http.server 8000` e acesse
`http://localhost:8000/html/index.html`. Módulos ES precisam de HTTP;
abrir por `file://` não é suportado. Não é necessário instalar dependências.

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
Não houve auditoria completa com leitores de tela, outros navegadores ou backend.

## Fontes e créditos

- [Vue — documentação oficial](https://vuejs.org/guide/quick-start.html).
- Foto de voluntários: [RDNE Stock Project/Pexels](https://www.pexels.com/photo/volunteers-giving-donations-6646923/).
- Educação: [Anastasia Shuraeva/Pexels](https://www.pexels.com/photo/students-inside-a-classroom-8466902/).
- Alimentos: [Julia M Cameron/Pexels](https://www.pexels.com/photo/people-donating-food-to-a-charity-6995220/).
- Horta: [Alfo Medeiros/Pexels](https://www.pexels.com/photo/man-and-woman-watering-the-plants-12916211/).

Implementação, documentação e testes desenvolvidos com apoio de IA.
DreamShaper: perguntas disponíveis concluídas (100%). Esse indicador não é nota
nem comprovação de registro final no Blackboard.
