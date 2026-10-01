# Portal da guilda BRICS

Este repositório contém o portal estático da guilda BRICS para WoW: Forever. O navegador executa apenas HTML, CSS e JavaScript, sem framework ou etapa de compilação.

## O que o portal contém

- apresentação da guilda e dos seus valores
- comparação das nove classes
- gameplay, rotações, macros e consumíveis
- preparação e estratégias para raids
- regras de convivência e política Dragon Kill Points (DKP)
- fontes e estados editoriais

## Como rodar localmente

Instale Node.js 22 ou superior e execute:

```bash
npm run dev
```

Abra `http://127.0.0.1:4173`. O servidor local redireciona todas as rotas para a aplicação estática.

## Como validar

Execute a validação antes de publicar:

```bash
npm run build
```

O comando verifica arquivos obrigatórios, nove classes, slugs únicos, raids e a política DKP. Não gera arquivos novos.

## Estrutura do projeto

```text
site/index.html       Estrutura compartilhada do portal
site/styles.css       Design system e responsividade
site/app.js           Roteamento e renderização das páginas
site/assets/          Logo e favicon
site/data/            Classes, raids e regras em JSON
scripts/validate.mjs  Validação executada no build
server.mjs            Servidor local com fallback de rotas
netlify.toml           Configuração do deploy estático
docs/                 Documentação editorial e visual
```

## Rotas disponíveis

| Rota | Conteúdo |
| --- | --- |
| `/` | Página inicial |
| `/guilda` | História, valores e recrutamento |
| `/wow-forever` | Informações editoriais sobre o jogo |
| `/classes` | Diretório dos guias de classe |
| `/classes/escolha-sua-classe` | Ajuda para jogadores novos |
| `/classes/[slug]` | Guia detalhado de uma classe |
| `/raids` | Diretório de raids |
| `/raids/[slug]` | Preparação e estratégia de uma raid |
| `/preparacao` | Checklist geral para raids |
| `/regras` | Conduta, participação e DKP |

## Como editar conteúdo

Leia o [guia de conteúdo](docs/CONTENT_GUIDE.md) antes de alterar os arquivos em `site/data/`. Os valores de DKP ficam em `site/data/rules.json`.

Consulte o [design system](docs/DESIGN_SYSTEM.md) antes de mudar `site/styles.css` ou criar um padrão visual.

## Como publicar na Netlify

Importe o repositório na Netlify e use a raiz do repositório como **Base directory**. O arquivo `netlify.toml` já define:

- Build Command: `npm run build`
- Publish directory: `site`
- redirecionamento de todas as rotas para `site/index.html`

Não configure `site` como Base directory: ela é somente o diretório publicado. O redirecionamento evita erro 404 ao abrir diretamente rotas como `/regras`, `/classes/druida` ou `/raids/barrow-deeps`.

## Limites desta versão

Esta versão não inclui banco de dados, autenticação, busca, comentários ou cadastro real de DKP. O convite do Discord continua marcado como `Discord em breve`.

O portal é um fan site independente. Ele não tem afiliação nem endosso da Blizzard Entertainment.
