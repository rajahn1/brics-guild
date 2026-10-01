# Como manter o conteúdo do portal

Este guia explica como editar classes, raids e regras sem alterar a interface. Use os arquivos JavaScript Object Notation (JSON) em `site/data/` como fonte principal do portal.

## Entenda os estados editoriais

Cada página informativa usa um estado que indica o nível de confiança do conteúdo:

| Valor no JSON | Rótulo no site | Quando usar |
| --- | --- | --- |
| `confirmed` | Confirmada | Uma fonte oficial confirmou a informação |
| `beta` | Beta | A informação veio de uma versão de testes |
| `community` | Opinião da comunidade | O texto sintetiza relatos ou discussões de jogadores |
| `validating` | Em validação | A equipe ainda precisa confirmar a recomendação |

Nunca apresente uma opinião do Reddit como confirmação oficial. Evite conclusões sobre desempenho final enquanto o jogo estiver em beta.

## Siga o fluxo editorial

Faça cada atualização nesta ordem:

1. Edite o arquivo JSON do assunto.
2. Atualize `updatedAt` no formato `AAAA-MM-DD`.
3. Defina o estado editorial de cada informação alterada.
4. Adicione uma fonte quando a afirmação depender de material externo.
5. Execute `npm run build`.
6. Revise a página em tela pequena e tela grande.

Use slugs com letras minúsculas, números e hífens. Não altere um slug publicado sem atualizar todos os links que apontam para ele.

## Edite as classes

O arquivo [`site/data/classes.json`](../site/data/classes.json) contém exatamente nove classes. A função de validação em [`scripts/validate.mjs`](../scripts/validate.mjs) confere a quantidade e os slugs.

Cada classe precisa destes grupos de dados:

- identidade: `slug`, `name`, `accent`, `fantasy` e `summary`
- editorial: `status`, `updatedAt` e `communitySources`
- gameplay: `roles`, `combat`, `resource`, `pace` e `management`
- experiência: `solo`, `difficulty`, `likes`, `avoid` e `communityNote`
- guia: `rotation`, `macros` e `consumables`

Use esta estrutura inicial ao adicionar ou revisar uma classe:

```json
{
  "slug": "nome-da-classe",
  "name": "Nome da classe",
  "accent": "#ffffff",
  "status": "validating",
  "updatedAt": "2026-09-29",
  "roles": ["Dano à distância"],
  "combat": "Descrição curta",
  "resource": "Mana",
  "pace": "Cadenciado",
  "management": "Médio",
  "solo": "Bom",
  "difficulty": "Intermediária"
}
```

Complete também os campos narrativos e os blocos de guia. O build falha quando o catálogo não contém nove slugs únicos.

### Escreva rotações e macros com cautela

Mantenha rotações e consumíveis como `validating` até confirmar nomes, efeitos e disponibilidade no cliente atual.

Para macros:

- use `#showtooltip` quando o cliente aceitar a diretiva
- informe quando o jogador precisa substituir o nome de uma habilidade
- não prometa compatibilidade sem testar no cliente PT-BR
- mantenha cada macro curta e explique sua finalidade em `note`

## Edite as raids

O arquivo [`site/data/raids.json`](../site/data/raids.json) alimenta o diretório e cada rota `/raids/[slug]`.

Cada raid precisa destes campos:

- identificação: `slug`, `name` e `originalName`
- editorial: `status`, `updatedAt` e `sources`
- disponibilidade: `size` e `releaseDate`
- orientação: `summary`, `composition`, `preparation` e `strategy`
- mídia: `videos`

Use `Aguardando informação verificada` quando uma mecânica não tiver fonte confiável. Não copie automaticamente estratégias de versões anteriores do jogo.

Cada fonte segue esta forma:

```json
{
  "title": "Título da fonte",
  "url": "https://example.com/artigo",
  "origin": "Publicador"
}
```

Prefira notícias e páginas oficiais para disponibilidade, tamanho e regras do conteúdo. Use fontes comunitárias apenas para impressões e experiências práticas.

## Edite regras e DKP

O arquivo [`site/data/rules.json`](../site/data/rules.json) centraliza conduta, participação em raids e a política Dragon Kill Points (DKP).

Atualize estes campos quando a guilda refinar o sistema:

| Campo | Efeito no site |
| --- | --- |
| `version` | Mostra a versão pública da política |
| `conduct` | Lista as regras de convivência |
| `raidParticipation` | Lista os compromissos de quem participa |
| `dkp.startingBalance` | Define o saldo inicial |
| `dkp.minimumBid` | Define o menor lance aceito |
| `dkp.earnings` | Define os ganhos por evento |
| `dkp.lootRules` | Explica prioridade, lance e desempate |
| `dkp.penalties` | Explica multas ou a ausência delas |
| `dkp.example` | Monta a tabela demonstrativa |

Mude `version` e `updatedAt` quando a política entrar em vigor. Registre a decisão no canal oficial da guilda antes da próxima raid.

O build exige um lance mínimo positivo e pelo menos quatro formas de ganho. Essa validação protege a página contra uma política incompleta.

## Revise fontes externas

Confira cada link antes de publicar:

- o endereço abre sem autenticação inesperada
- o título corresponde ao conteúdo da página
- a origem está identificada corretamente
- a fonte sustenta a afirmação associada
- a data editorial foi atualizada

Links do Reddit representam opiniões da comunidade. O texto do site deve deixar essa condição explícita.

## Checklist de publicação

Confirme estes pontos antes de publicar:

- os arquivos JSON continuam válidos
- as nove classes aparecem no diretório
- todos os slugs são únicos
- datas usam `AAAA-MM-DD`
- links externos abrem em uma nova aba
- conteúdo incerto usa `beta`, `community` ou `validating`
- `npm run build` termina sem erros
