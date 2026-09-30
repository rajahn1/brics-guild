# Portal da guilda BRICS

Este repositório contém o portal estático da guilda BRICS para WoW: Forever. Use este guia para instalar, executar, validar e publicar o projeto.

O site publicado está em [BRICS Guild](https://brics-guild.rafayuno.chatgpt.site). A publicação atual é privada.

## O que o portal contém

O portal reúne informações para membros novos e experientes:

- apresentação da guilda e dos seus valores
- guia para escolher entre as nove classes
- guias de gameplay, rotação, macros e consumíveis
- preparação e estratégias para raids
- regras de convivência e política Dragon Kill Points (DKP)
- fontes e estado editorial de cada informação

## Pré-requisitos

Instale estes programas antes de começar:

- Node.js 22.13.0 ou superior
- npm compatível com a versão instalada do Node.js

Confira as versões disponíveis no computador:

```bash
node --version
npm --version
```

## Como rodar localmente

Siga esta sequência no diretório do projeto:

1. Instale as dependências:

```bash
npm install
```

2. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

3. Abra o endereço exibido no terminal.

O servidor atualiza a página quando você salva um arquivo do projeto.

## Como validar uma alteração

Gere a versão de produção antes de publicar:

```bash
npm run build
```

O comando valida os dados e gera todas as rotas estáticas. Ele falha quando encontra slugs duplicados ou uma política DKP incompleta.

Execute a versão gerada localmente quando precisar testar o Worker de produção:

```bash
npm run start
```

Use os comandos abaixo para revisar código e formatação:

| Comando | Uso |
| --- | --- |
| `npm run lint` | Encontra problemas de código |
| `npm run format` | Formata os arquivos suportados |
| `npm run build` | Valida dados, rotas e artefatos de produção |

## Estrutura do projeto

Esta árvore mostra os diretórios que você editará com maior frequência:

```text
app/                 Rotas e estilos globais
components/          Componentes compartilhados
components/ui/       Componentes de interface instalados
content/             Classes, raids e regras em JSON
docs/                Documentação editorial e visual
lib/content.ts       Tipos, validações e consultas de conteúdo
public/              Logo, favicon e arquivos públicos
.openai/hosting.json Identificação do projeto publicado
```

## Rotas disponíveis

Use estas rotas para revisar cada área do portal:

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

## Como editar o conteúdo

Leia o [guia de conteúdo](docs/CONTENT_GUIDE.md) antes de alterar classes, raids ou regras. Ele explica os estados editoriais, os campos dos arquivos JSON e o processo de validação.

Os valores do DKP ficam em `content/rules.json`. Altere esse arquivo para atualizar regras e exemplos sem mudar componentes React.

## Como manter o visual

Consulte o [design system](docs/DESIGN_SYSTEM.md) antes de criar páginas ou componentes. O documento registra cores, tipografia, espaçamento, padrões de interface e critérios de acessibilidade.

## Como publicar

O projeto usa Sites e mantém a identificação em `.openai/hosting.json`. Publique pelo fluxo de Sites no Codex para preservar a URL e o acesso privado.

Não altere o `project_id` e não salve credenciais no repositório. A publicação precisa usar o mesmo commit validado pelo build.

## Limites desta versão

Esta versão não inclui banco de dados, autenticação, busca, comentários ou cadastro real de DKP. O convite do Discord continua marcado como `Discord em breve`.

O portal é um fan site independente. Ele não tem afiliação nem endosso da Blizzard Entertainment.
