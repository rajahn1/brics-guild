# Como aplicar o design system da BRICS

Este documento registra a linguagem visual do portal. Use estas regras para manter novas páginas coerentes, legíveis e reconhecíveis como parte da BRICS.

## Direção visual

O conceito central é um quadro tático de raid. A interface combina disciplina, informação operacional e sinais visuais inspirados em marcações de combate.

A composição deve parecer direta e editorial:

- fundo preto e superfícies de carvão
- texto marfim com contraste alto
- vermelho reservado para ação e identidade
- linhas, grades e bordas em vez de cartões arredondados
- títulos condensados e expressivos
- blocos claros para informações que exigem atenção

Evite imitar a interface do jogo. O portal deve ter identidade própria e não depende de artes oficiais de Warcraft.

## Use o logo

O arquivo principal está em [`public/brics-logo.png`](../public/brics-logo.png). O cabeçalho mostra um recorte horizontal sobre fundo marfim.

Siga estas regras:

- mantenha área vazia ao redor do logo
- preserve as proporções da imagem
- use fundo marfim quando o recorte precisar de contraste
- não altere o vermelho do traço
- não aplique sombras, contornos ou gradientes no logo

O favicon está em [`public/favicon.svg`](../public/favicon.svg). Ele usa um gesto vermelho inspirado no traço da marca.

## Use a paleta oficial

Os tokens ficam em [`app/globals.css`](../app/globals.css). Use variáveis existentes antes de criar uma cor local.

| Token | Valor | Uso principal |
| --- | --- | --- |
| `--background` | `#0a0a0a` | Fundo da página |
| `--foreground` | `#f0e9de` | Texto principal |
| `--card` | `#151515` | Superfícies elevadas |
| `--primary` | `#e3261c` | Ações, foco e marca |
| `--secondary` | `#242321` | Superfícies secundárias |
| `--muted` | `#1b1a19` | Áreas discretas |
| `--muted-foreground` | `#a6a096` | Texto secundário |
| `--border` | `#34312e` | Divisores e contornos |
| `--bone` | `#f0e9de` | Blocos claros de destaque |
| `--red-deep` | `#8f130d` | Profundidade do vermelho |
| `--gold` | `#d6a84b` | Conteúdo de beta |
| `--green` | `#73a97b` | Conteúdo confirmado |
| `--blue` | `#789bcc` | Opinião da comunidade |

### Hierarquia de cor

Use marfim para leitura contínua e cinza quente para apoio. Reserve vermelho para ações, foco, ícones importantes e elementos de marca.

Não use apenas a cor para comunicar um estado. Sempre mostre o rótulo correspondente.

## Aplique a hierarquia tipográfica

O projeto carrega duas famílias em [`app/layout.tsx`](../app/layout.tsx):

- `Barlow Condensed`: títulos, números grandes e rótulos de impacto
- `Source Sans 3`: texto, navegação, tabelas e controles

O corpo usa `1rem` com altura de linha `1.6`. Textos principais não devem ficar abaixo de 16 px.

Use títulos curtos. A fonte condensada permite escala alta sem ocupar toda a largura disponível.

## Layout e espaçamento

O contêiner `.page-frame` limita o conteúdo a 1180 px. Ele mantém 20 px de margem lateral no desktop e 14 px no celular.

A interface usa dois pontos de quebra:

| Largura | Comportamento |
| --- | --- |
| Até `980px` | Navegação móvel e redução das grades principais |
| Até `640px` | Coluna única, botões largos e conteúdo compacto |

Prefira espaçamentos generosos entre seções e ritmos menores dentro de um bloco. As seções principais usam entre 70 px e 100 px no desktop.

Use bordas de 1 px para separar conteúdo. Cantos devem permanecer retos, salvo quando um componente acessível exigir outra forma.

## Componentes compartilhados

Reutilize os componentes antes de criar uma variação:

| Componente | Arquivo | Finalidade |
| --- | --- | --- |
| `SiteShell` | `components/site-shell.tsx` | Cabeçalho, navegação e rodapé |
| `PageIntro` | `components/content-ui.tsx` | Título, resumo e metadados editoriais |
| `StatusBadge` | `components/content-ui.tsx` | Estado de confiança do conteúdo |
| `SourceLink` | `components/content-ui.tsx` | Fonte externa com indicação visual |
| `BackLink` | `components/content-ui.tsx` | Retorno ao diretório relacionado |

Use os componentes em `components/ui/` quando houver correspondência semântica. Não altere esses arquivos para aplicar estilos de uma única página.

## Estados editoriais

Os rótulos editoriais usam texto, borda e cor:

| Estado | Rótulo | Cor |
| --- | --- | --- |
| `confirmed` | Confirmada | `--green` |
| `beta` | Beta | `--gold` |
| `community` | Opinião da comunidade | `--blue` |
| `validating` | Em validação | Cinza quente |

Use `StatusBadge` para manter os rótulos consistentes. Não crie abreviações para esses estados.

## Padrões de interface

### Abertura de página

Comece páginas editoriais com `PageIntro`. Use um kicker curto, um título direto e uma descrição que explique a utilidade da página.

### Listas de diretório

Classes e raids usam linhas com bordas. Cada linha precisa mostrar nome, resumo e estado antes de abrir o detalhe.

### Blocos operacionais

Use grades para checklists, regras e fatos comparáveis. Mantenha o alinhamento entre itens e reduza para uma coluna no celular.

### Ações

O botão principal usa fundo vermelho e texto branco. A ação secundária mantém fundo escuro e borda visível.

Os controles devem ter pelo menos 48 px de altura quando forem ações principais. Use rótulos objetivos e evite ícones sem texto em ações críticas.

### Fontes externas

Mostre fontes externas com `SourceLink`. O componente abre a fonte em outra aba e inclui um ícone de saída.

## Mantenha o movimento discreto

Use transições curtas para indicar resposta ao cursor. O projeto limita o movimento a deslocamentos pequenos, mudanças de cor e feedback de foco.

As folhas de estilo em cascata (CSS) respeitam `prefers-reduced-motion`. Novas animações precisam manter uma alternativa sem movimento.

## Preserve a acessibilidade

Cada alteração visual precisa atender estes critérios:

- navegação completa por teclado
- foco visível com contorno vermelho
- texto principal com 16 px ou mais
- conteúdo utilizável com ampliação de texto em 200%
- estado comunicado por texto e não apenas por cor
- ícones decorativos com `aria-hidden="true"`
- links e botões com nomes acessíveis
- ausência de rolagem horizontal em 320 px de largura

Mantenha a ordem do documento igual à ordem visual. Use elementos de HyperText Markup Language (HTML) semânticos para cabeçalhos, navegação, listas e tabelas.

## O que fazer

Use estas práticas para ampliar o portal sem perder sua identidade:

- reutilize tokens e componentes existentes
- mantenha o vermelho como sinal, não como fundo dominante
- preserve grades, linhas e superfícies retas
- teste desktop, tablet e celular
- mostre fonte, estado e data em conteúdo editorial
- escreva textos em PT-BR com linguagem direta

## O que evitar

Evite decisões que diluam a identidade ou prejudiquem a leitura:

- cartões arredondados em todas as seções
- gradientes decorativos sem função
- sombras suaves que removam o caráter tático
- texto cinza com contraste baixo
- animações longas ou contínuas
- imagens oficiais sem contexto ou permissão
- cores de classe fora de páginas relacionadas à classe

## Checklist para um novo componente

Confirme estes pontos antes de publicar:

1. O componente usa um token existente sempre que possível.
2. A tipografia segue a hierarquia definida.
3. O foco aparece durante a navegação por teclado.
4. O layout funciona abaixo de 640 px.
5. O texto continua legível com ampliação de 200%.
6. Estados importantes têm rótulo textual.
7. O componente respeita a preferência de movimento reduzido.
