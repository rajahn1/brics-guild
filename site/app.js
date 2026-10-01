const app = document.querySelector('#app');
const defaultDescription = 'Guias de classes, raids, preparação e regras da guilda BRICS em WoW: Forever.';
const statusLabels = { confirmed: 'Confirmada', beta: 'Beta', community: 'Opinião da comunidade', validating: 'Em validação' };

const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
const safeColor = (value) => /^#[0-9a-f]{6}$/i.test(value) ? value : '#e3261c';
const safeUrl = (value) => {
  try {
    const url = new URL(value, window.location.origin);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '#';
  } catch {
    return '#';
  }
};
const normalizePath = (path) => path !== '/' ? path.replace(/\/+$/, '') : '/';
const list = (items, className = '') => `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
const checkList = (items) => `<ul class="check-list">${items.map((item) => `<li><span aria-hidden="true">✓</span>${escapeHtml(item)}</li>`).join('')}</ul>`;
const statusBadge = (status) => `<span class="status-badge status-${escapeHtml(status)}">${escapeHtml(statusLabels[status] || status)}</span>`;
const formatDate = (value) => new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
const sourceLink = (url, label) => `<a class="source-link" href="${escapeHtml(safeUrl(url))}" target="_blank" rel="noreferrer">${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`;
const routeLink = (url, label, className = '') => `<a class="${className}" href="${url}" data-link>${escapeHtml(label)}</a>`;

function pageIntro({ kicker, title, description, status, updatedAt }) {
  return `<header class="page-intro page-frame"><p class="signal-line">${escapeHtml(kicker)}</p><h1>${escapeHtml(title)}</h1><p class="page-description">${escapeHtml(description)}</p>${status || updatedAt ? `<div class="editorial-meta">${status ? statusBadge(status) : ''}${updatedAt ? `<span>Revisado em ${formatDate(updatedAt)}</span>` : ''}</div>` : ''}</header>`;
}

const dataPromise = Promise.all([
  fetch('/data/classes.json').then((response) => response.json()),
  fetch('/data/raids.json').then((response) => response.json()),
  fetch('/data/rules.json').then((response) => response.json()),
]).then(([classes, raids, rules]) => ({ classes, raids, rules }));

function homePage() {
  const quickLinks = [
    ['/classes/escolha-sua-classe', '◎', 'Encontre sua classe', 'Compare função, ritmo de combate e curva de aprendizado.'],
    ['/raids', '⚔', 'Prepare a próxima raid', 'Tamanho, checklist, consumíveis e informações confirmadas.'],
    ['/regras', '◆', 'Entenda o DKP', 'Veja como presença, chefes e loot entram na conta.'],
  ];
  return {
    title: 'BRICS · Guilda WoW: Forever',
    description: defaultDescription,
    html: `<section class="hero-shell page-frame"><div class="hero-copy"><p class="signal-line">BRICS · Horda · Ruleset Normal</p><h1>Informação para entrar na raid sabendo o que fazer.</h1><p class="hero-lede">Cinco amigos, mais de dez anos de WoW e uma guilda feita para aprender, preparar e progredir juntos em WoW: Forever.</p><div class="hero-actions">${routeLink('/classes/escolha-sua-classe', 'Escolher minha classe', 'button button-primary')}${routeLink('/guilda', 'Conhecer a BRICS', 'button button-quiet')}</div></div><aside class="mission-board" aria-label="Situação atual"><div class="board-header"><span>Quadro de missão</span><span class="live-mark">Em atualização</span></div><div class="board-row"><span class="item-symbol" aria-hidden="true">◷</span><div><strong>04 nov. 2026</strong><span>Lançamento global</span></div></div><div class="board-row"><span class="item-symbol" aria-hidden="true">⚔</span><div><strong>09 dez. 2026</strong><span>Primeiras raids</span></div></div><div class="board-row"><span class="item-symbol" aria-hidden="true">◉</span><div><strong>Discord em breve</strong><span>Recrutamento será aberto aqui</span></div></div></aside></section><section class="quick-grid page-frame" aria-labelledby="comece-aqui"><div class="section-intro"><p class="signal-line">Comece por aqui</p><h2 id="comece-aqui">Menos dúvida. Mais jogo.</h2><p>Escolha uma rota e encontre informação direta, revisada e marcada pelo nível de confiança.</p></div><div class="route-list">${quickLinks.map(([href, icon, title, copy]) => `<a class="route-item" href="${href}" data-link><span class="item-symbol" aria-hidden="true">${icon}</span><span><strong>${title}</strong><small>${copy}</small></span><span class="route-chevron" aria-hidden="true">›</span></a>`).join('')}</div></section><section class="briefing-strip"><div class="page-frame briefing-inner"><span class="item-symbol" aria-hidden="true">▤</span><p><strong>Leitura honesta do beta.</strong> O que veio da Blizzard é marcado como confirmado; relatos de jogadores aparecem como opinião da comunidade; o que ainda muda fica em validação.</p>${routeLink('/wow-forever', 'Como tratamos as fontes')}</div></section>`,
  };
}

function guildPage() {
  const values = [
    ['◇', 'Compromisso sem transformar jogo em trabalho', 'Horários e combinados claros, com espaço para a vida fora de Azeroth.'],
    ['□', 'Erro vira informação', 'Analisamos pulls, ensinamos mecânicas e evitamos procurar culpados.'],
    ['△', 'Progressão consistente', 'Preparação, variedade de classes e melhoria coletiva acima de atalhos.'],
    ['◆', 'Ambiente seguro', 'Respeito é requisito. Assédio e discriminação não têm espaço na BRICS.'],
  ];
  return { title: 'A guilda | BRICS', description: 'Conheça a guilda BRICS, seus valores e sua experiência em World of Warcraft.', html: `${pageIntro({ kicker: 'A guilda', title: 'Experiência compartilhada. Progresso coletivo.', description: 'A BRICS nasceu da amizade de cinco jogadores que atravessaram mais de uma década de World of Warcraft juntos e querem construir uma casa duradoura em WoW: Forever.' })}<section class="page-frame split-feature"><div class="feature-statement"><span class="giant-number">5</span><p>amigos por trás da guilda</p></div><div class="prose-block"><h2>O que estamos construindo</h2><p>Uma guilda da <strong>Horda</strong>, no ruleset <strong>Normal</strong>, preparada para conteúdo PvE, raids e uma comunidade que acolha tanto veteranos quanto quem está começando agora.</p><p>Não publicamos personagens ou nomes dos fundadores sem autorização. Por enquanto, a história é coletiva, exatamente como a progressão que queremos fazer.</p></div></section><section class="page-frame content-section"><div class="section-heading"><p class="signal-line">Como jogamos</p><h2>Nossos combinados começam aqui.</h2></div><div class="value-grid">${values.map(([icon, title, copy]) => `<article class="value-item"><span class="item-symbol" aria-hidden="true">${icon}</span><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></section><section class="page-frame recruitment-panel"><span class="item-symbol" aria-hidden="true">◉</span><div><h2>Recrutamento abre em breve.</h2><p>O convite do Discord será publicado aqui quando os canais e o processo de entrada estiverem prontos.</p></div><span class="button button-disabled" aria-disabled="true">Discord em breve</span></section><div class="page-frame next-link">${routeLink('/regras', 'Ler regras e DKP')}</div>` };
}

function foreverPage() {
  const facts = [
    ['◷', '04 de novembro de 2026', 'Lançamento global anunciado pela Blizzard.'],
    ['⌖', 'Azeroth em expansão', 'A base do WoW original recebe novas zonas, histórias, masmorras e raids.'],
    ['◉', 'Rulesets em vez de realms', 'Normal, PvP e Roleplay no lançamento; Hardcore chega depois.'],
    ['▤', 'Legacy System', 'Progressão horizontal de conta ligada a exploração, profissões, masmorras e raids.'],
  ];
  const policies = [['confirmed', 'Informação publicada ou confirmada diretamente pela Blizzard.'], ['beta', 'Existe na versão de testes e pode mudar antes do lançamento.'], ['community', 'Experiência ou interpretação de jogadores; não é fato oficial.'], ['validating', 'Há sinais ou referências, mas ainda falta confirmação confiável.']];
  return { title: 'WoW: Forever | BRICS', description: 'Informações confirmadas, de beta e da comunidade sobre WoW: Forever.', html: `${pageIntro({ kicker: 'WoW: Forever', title: 'O mundo clássico continua. A informação também muda.', description: 'Este portal acompanha a nova Azeroth sem confundir anúncio oficial, teste de beta e opinião de jogador.', status: 'beta', updatedAt: '2026-09-29' })}<section class="page-frame fact-grid">${facts.map(([icon, title, copy]) => `<article class="fact-item"><span class="item-symbol" aria-hidden="true">${icon}</span><h2>${title}</h2><p>${copy}</p></article>`).join('')}</section><section class="page-frame editorial-policy"><div class="section-heading"><p class="signal-line">Política editorial</p><h2>Quatro marcas. Uma leitura simples.</h2></div><div class="policy-list">${policies.map(([status, copy]) => `<div>${statusBadge(status)}<p>${copy}</p></div>`).join('')}</div></section><section class="page-frame source-panel"><h2>Fontes principais</h2>${sourceLink('https://worldofwarcraft.blizzard.com/en-us/news/24304160/', 'Beta de WoW: Forever')}${sourceLink('https://news.blizzard.com/en-us/article/24303862/world-of-warcraft-forever-whats-next-panel-recap', "Resumo do painel What's Next")}${sourceLink('https://news.blizzard.com/en-us/article/24307383/get-to-know-the-world-of-warcraft-forever-legacy-system', 'Sistema de Legacy')}${sourceLink('https://news.blizzard.com/en-us/article/24302070/choose-your-ruleset-in-world-of-warcraft-forever', 'Rulesets oficiais')}</section>` };
}

function classesPage(classes) {
  return { title: 'Guias de classe | BRICS', description: 'Gameplay, macros e consumíveis para as nove classes de WoW: Forever.', html: `${pageIntro({ kicker: 'Guias de classe', title: 'Nove caminhos. Nenhuma tier list.', description: 'Visão geral, gameplay, rota inicial, macros e consumíveis, sempre com o estado atual da informação visível.' })}<section class="page-frame class-directory">${classes.map((guide) => `<a class="class-row" href="/classes/${escapeHtml(guide.slug)}" data-link style="--class-accent:${safeColor(guide.accent)}"><span class="class-mark">${escapeHtml(guide.name.slice(0, 2))}</span><span class="class-main"><strong>${escapeHtml(guide.name)}</strong><small>${escapeHtml(guide.fantasy)}</small></span><span class="role-tags">${guide.roles.slice(0, 3).map((role) => `<em>${escapeHtml(role)}</em>`).join('')}</span>${statusBadge(guide.status)}<span aria-hidden="true">›</span></a>`).join('')}</section><section class="page-frame choice-callout"><div><p class="signal-line">Ainda em dúvida?</p><h2>Comece pelo jeito que você gosta de jogar.</h2></div>${routeLink('/classes/escolha-sua-classe', 'Comparar gameplays', 'button button-primary')}</section>` };
}

function chooseClassPage(classes) {
  const cards = classes.map((guide) => `<article class="playstyle-card" style="--class-accent:${safeColor(guide.accent)}"><div class="playstyle-heading"><span class="class-mark">${escapeHtml(guide.name.slice(0, 2))}</span><div><h2>${escapeHtml(guide.name)}</h2><p>${escapeHtml(guide.fantasy)}</p></div>${statusBadge(guide.status)}</div><div class="playstyle-stats"><span><small>Combate</small>${escapeHtml(guide.combat)}</span><span><small>Solo</small>${escapeHtml(guide.solo)}</span><span><small>Curva</small>${escapeHtml(guide.difficulty)}</span></div><p class="playstyle-summary">${escapeHtml(guide.summary)}</p><div class="fit-grid"><div><h3><span aria-hidden="true">✓</span> Você pode gostar se</h3>${list(guide.likes)}</div><div><h3><span aria-hidden="true">×</span> Talvez não seja para você se</h3>${list(guide.avoid)}</div></div><div class="community-note">${statusBadge('community')}<p>${escapeHtml(guide.communityNote)}</p></div><div class="card-footer">${routeLink(`/classes/${guide.slug}`, 'Abrir guia completo')}${sourceLink(guide.communitySources[0], 'Ver discussão')}</div></article>`).join('');
  return { title: 'Escolha sua classe | BRICS', description: 'Compare funções, ritmo e dificuldade das classes de WoW: Forever.', html: `${pageIntro({ kicker: 'Para novos jogadores', title: 'Que tipo de herói combina com você?', description: 'Comece pela função que quer cumprir. Depois escolha a fantasia e o ritmo que você vai gostar de repetir durante toda a jornada.', status: 'community', updatedAt: '2026-09-29' })}<section class="page-frame role-compass"><div><strong>Quero proteger</strong><p>Procure Tank em Guerreiro, Paladino ou Druida. Caçador e Xamã ainda têm possibilidades em validação.</p></div><div><strong>Quero curar</strong><p>Sacerdote, Paladino, Xamã e Druida colocam você no centro da sobrevivência do grupo.</p></div><div><strong>Quero causar dano</strong><p>Todas as classes podem causar dano; escolha entre distância, corpo a corpo, pets, controle ou versatilidade.</p></div></section><section class="page-frame playstyle-list">${cards}</section><section class="page-frame beta-warning"><strong>Não escolha pela “melhor classe do beta”.</strong><p>O limite de nível e os ajustes frequentes impedem conclusões sobre o endgame. Use estas impressões para descobrir um estilo, não para prever uma tier list.</p></section>` };
}

function classDetailPage(guide) {
  const stat = (term, value) => `<div><dt>${term}</dt><dd>${escapeHtml(value)}</dd></div>`;
  return { title: `Guia de ${guide.name} | BRICS`, description: guide.summary, html: `<div style="--class-accent:${safeColor(guide.accent)}">${pageIntro({ kicker: 'Guia de classe', title: guide.name, description: guide.summary, status: guide.status, updatedAt: guide.updatedAt })}<section class="page-frame class-dossier"><div class="dossier-lead"><span class="class-seal">${escapeHtml(guide.name.slice(0, 2))}</span><blockquote>${escapeHtml(guide.fantasy)}</blockquote></div><dl class="dossier-stats">${stat('Funções', guide.roles.join(', '))}${stat('Combate', guide.combat)}${stat('Recurso', guide.resource)}${stat('Ritmo', guide.pace)}${stat('Gerenciamento', guide.management)}${stat('Curva', guide.difficulty)}</dl></section><section class="page-frame fit-grid detail-fit"><div><h2><span aria-hidden="true">✓</span> Combina com você se</h2>${list(guide.likes)}</div><div><h2><span aria-hidden="true">×</span> Pense duas vezes se</h2>${list(guide.avoid)}</div></section><section class="page-frame guide-columns"><article class="guide-block"><div class="block-heading"><h2>${escapeHtml(guide.rotation.title)}</h2>${statusBadge(guide.rotation.status)}</div><ol>${guide.rotation.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol></article><article class="guide-block"><div class="block-heading"><h2>Macro inicial</h2>${statusBadge('validating')}</div>${guide.macros.map((macro) => `<div><h3>${escapeHtml(macro.name)}</h3><pre><code>${escapeHtml(macro.code)}</code></pre><p>${escapeHtml(macro.note)}</p></div>`).join('')}</article><article class="guide-block"><div class="block-heading"><h2>Consumíveis</h2>${statusBadge(guide.consumables.status)}</div>${list(guide.consumables.items)}</article></section><section class="page-frame community-detail"><span aria-hidden="true">!</span><div>${statusBadge('community')}<p>${escapeHtml(guide.communityNote)}</p>${sourceLink(guide.communitySources[0], 'Abrir discussão original')}</div></section><div class="page-frame next-link">${routeLink('/classes', 'Voltar para todas as classes', 'back-link')}</div></div>` };
}

function raidsPage(raids) {
  return { title: 'Raids | BRICS', description: 'Preparação, composição e fontes das raids de WoW: Forever.', html: `${pageIntro({ kicker: 'Central de raids', title: 'Chegue preparado antes do primeiro pull.', description: 'Informação confirmada, composição provisória e o que ainda precisa ser descoberto, sem preencher lacunas com estratégias antigas.' })}<section class="page-frame raid-list">${raids.map((raid, index) => `<a class="raid-entry" href="/raids/${escapeHtml(raid.slug)}" data-link><span class="raid-index">${String(index + 1).padStart(2, '0')}</span><div class="raid-title"><p>${escapeHtml(raid.originalName)}</p><h2>${escapeHtml(raid.name)}</h2><span>${escapeHtml(raid.summary)}</span></div><div class="raid-facts"><span>◉ ${escapeHtml(raid.size)}</span><span>◷ ${escapeHtml(raid.releaseDate)}</span>${statusBadge(raid.status)}</div><span aria-hidden="true">›</span></a>`).join('')}</section><section class="page-frame beta-warning"><strong>Progressão sem falsa certeza.</strong><p>Mecânicas, resistências e composições serão atualizadas quando houver dados verificados. Até lá, o site diferencia preparação universal de exigência específica.</p></section>` };
}

function raidDetailPage(raid) {
  const video = raid.videos.length ? `<section class="page-frame video-panel"><div><span aria-hidden="true">▶</span><h2>Vídeo relacionado</h2></div>${raid.videos.map((item) => `<a href="${escapeHtml(safeUrl(item.url))}" target="_blank" rel="noreferrer"><span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.source)}</small></span><span aria-hidden="true">↗</span></a>`).join('')}</section>` : '';
  return { title: `${raid.name} | BRICS`, description: raid.summary, html: `${pageIntro({ kicker: raid.originalName, title: raid.name, description: raid.summary, status: raid.status, updatedAt: raid.updatedAt })}<section class="page-frame raid-summary-bar"><span><span aria-hidden="true">◉</span><small>Grupo</small><strong>${escapeHtml(raid.size)}</strong></span><span><span aria-hidden="true">◷</span><small>Disponibilidade</small><strong>${escapeHtml(raid.releaseDate)}</strong></span></section><section class="page-frame guide-columns raid-columns"><article class="guide-block"><div class="block-heading"><h2>Composição sugerida</h2>${statusBadge('validating')}</div>${list(raid.composition)}</article><article class="guide-block"><div class="block-heading"><h2>Checklist</h2>${statusBadge('confirmed')}</div>${checkList(raid.preparation)}</article><article class="guide-block"><div class="block-heading"><h2>Estratégia</h2>${statusBadge('validating')}</div>${list(raid.strategy)}</article></section>${video}<section class="page-frame source-panel"><h2>Fontes</h2>${raid.sources.map((source) => sourceLink(source.url, `${source.title} · ${source.origin}`)).join('')}</section><div class="page-frame next-link">${routeLink('/raids', 'Voltar para todas as raids', 'back-link')}</div>` };
}

function preparationPage() {
  const checklist = [
    ['⚒', 'Equipamento', ['Repare tudo antes de viajar', 'Encante peças definitivas', 'Leve equipamento alternativo da sua função']],
    ['▣', 'Bolsas', ['Separe reagentes de classe', 'Deixe espaço para loot', 'Confirme munição, venenos ou fragmentos']],
    ['◆', 'Consumíveis', ['Comida do atributo correto', 'Frasco ou elixir da função', 'Poções de vida, mana e combate']],
    ['▤', 'Estratégia', ['Leia o resumo de cada chefe', 'Assista ao vídeo indicado', 'Saiba sua responsabilidade antes do pull']],
    ['◉', 'Comunicação', ['Entre no canal de voz', 'Configure push-to-talk', 'Deixe chamadas prioritárias audíveis']],
    ['◷', 'Pontualidade', ['Esteja no local antes do convite', 'Avise atrasos com antecedência', 'Reserve o tempo completo da raid']],
  ];
  return { title: 'Preparação | BRICS', description: 'Checklist geral de preparação para raids da guilda BRICS.', html: `${pageIntro({ kicker: 'Preparação geral', title: 'A raid começa antes do convite.', description: 'Um checklist direto para reduzir pausas, evitar esquecimentos e usar o tempo do grupo em progressão.' })}<section class="page-frame prep-grid">${checklist.map(([icon, title, items]) => `<article class="prep-card"><span class="item-symbol" aria-hidden="true">${icon}</span><h2>${title}</h2>${checkList(items)}</article>`).join('')}</section><section class="page-frame addon-panel"><div><p class="signal-line">Addons recomendados</p><h2>Função primeiro. Lista depois.</h2></div><div class="addon-list"><span><strong>Temporizadores</strong><small>Avisos claros de habilidades e fases.</small></span><span><strong>Ameaça</strong><small>Leitura de aggro para tanks e DPS.</small></span><span><strong>Debuffs</strong><small>Visualização de efeitos que precisam de resposta.</small></span></div>${statusBadge('validating')}<p class="addon-note">Os nomes dos addons serão publicados quando houver versões confirmadas para WoW: Forever.</p></section>` };
}

function rulesPage(rules) {
  const { dkp } = rules;
  return { title: 'Regras e DKP | BRICS', description: 'Regras de convivência, participação e distribuição de loot da guilda BRICS.', html: `${pageIntro({ kicker: `Regras · versão ${rules.version}`, title: 'Clareza antes do loot cair.', description: 'Esta é a política inicial da BRICS. Ela existe para alinhar expectativas e será refinada com a experiência real da guilda.', status: rules.status, updatedAt: rules.updatedAt })}<section class="page-frame rules-grid"><article><span class="item-symbol" aria-hidden="true">◆</span><h2>Convivência</h2>${checkList(rules.conduct)}</article><article><span class="item-symbol" aria-hidden="true">◉</span><h2>Participação em raids</h2>${checkList(rules.raidParticipation)}</article></section><section class="dkp-section"><div class="page-frame"><div class="dkp-heading"><div><p class="signal-line">DKP BRICS</p><h2>Versão inicial ${escapeHtml(rules.version)}</h2><p>Pontos pessoais, não transferíveis e sem saldo negativo.</p></div><div class="dkp-basics"><span><small>Saldo inicial</small><strong>${dkp.startingBalance}</strong></span><span><small>Lance mínimo</small><strong>${dkp.minimumBid}</strong></span></div></div><div class="earn-grid">${dkp.earnings.map((earning) => `<article><strong>+${earning.points}</strong><span>${escapeHtml(earning.label)}</span></article>`).join('')}</div></div></section><section class="page-frame loot-process"><div class="section-heading"><p class="signal-line">Distribuição de loot</p><h2>Do anúncio ao vencedor.</h2></div><ol>${dkp.lootRules.map((rule, index) => `<li><span>${index + 1}</span><p>${escapeHtml(rule)}</p></li>`).join('')}</ol><div class="no-penalty"><span aria-hidden="true">◇</span><p><strong>Sem multas nesta versão.</strong> ${escapeHtml(dkp.penalties)}</p></div></section><section class="page-frame dkp-example"><div class="block-heading"><div><p class="signal-line">Exemplo ilustrativo</p><h2>Como o saldo se movimenta</h2></div>${statusBadge('beta')}</div><div class="table-wrap"><table><thead><tr><th>Evento</th><th>Movimento</th><th>Saldo</th></tr></thead><tbody>${dkp.example.map((row) => `<tr><td>${escapeHtml(row.event)}</td><td>${escapeHtml(row.change)}</td><td>${escapeHtml(row.balance)}</td></tr>`).join('')}</tbody></table></div><p>Não é um ranking real. A primeira versão do site documenta o sistema; o registro público de pontos será definido depois.</p></section><section class="page-frame beta-warning"><span aria-hidden="true">⚔</span><div><strong>Exceções precisam vir antes da raid.</strong><p>Itens lendários, de missão ou materiais estratégicos terão uma regra específica anunciada antes do início, nunca depois do drop.</p></div></section>` };
}

function notFoundPage() {
  return { title: 'Página não encontrada | BRICS', description: defaultDescription, html: `<section class="page-frame not-found"><p class="signal-line">Erro 404</p><h1>Esta rota saiu do mapa.</h1><p>O conteúdo pode ter mudado de endereço.</p>${routeLink('/', 'Voltar ao início', 'button button-primary')}</section>` };
}

function resolveRoute(path, data) {
  if (path === '/') return homePage();
  if (path === '/guilda') return guildPage();
  if (path === '/wow-forever') return foreverPage();
  if (path === '/classes') return classesPage(data.classes);
  if (path === '/classes/escolha-sua-classe') return chooseClassPage(data.classes);
  if (path === '/raids') return raidsPage(data.raids);
  if (path === '/preparacao') return preparationPage();
  if (path === '/regras') return rulesPage(data.rules);
  if (path.startsWith('/classes/')) {
    const guide = data.classes.find((item) => item.slug === path.split('/')[2]);
    return guide ? classDetailPage(guide) : notFoundPage();
  }
  if (path.startsWith('/raids/')) {
    const raid = data.raids.find((item) => item.slug === path.split('/')[2]);
    return raid ? raidDetailPage(raid) : notFoundPage();
  }
  return notFoundPage();
}

async function render({ focus = false } = {}) {
  try {
    const data = await dataPromise;
    const route = resolveRoute(normalizePath(window.location.pathname), data);
    app.innerHTML = route.html;
    document.title = route.title;
    document.querySelector('meta[name="description"]').setAttribute('content', route.description || defaultDescription);
    document.querySelectorAll('[data-link]').forEach((link) => link.toggleAttribute('aria-current', normalizePath(link.pathname) === normalizePath(window.location.pathname)));
    document.querySelector('.mobile-nav')?.removeAttribute('open');
    if (focus) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      app.focus({ preventScroll: true });
    }
  } catch (error) {
    console.error(error);
    app.innerHTML = `<section class="page-frame not-found"><p class="signal-line">Falha de conteúdo</p><h1>Não foi possível carregar o portal.</h1><p>Atualize a página ou tente novamente em alguns instantes.</p></section>`;
  }
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-link]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (link.origin !== window.location.origin) return;
  event.preventDefault();
  const nextPath = normalizePath(link.pathname);
  if (nextPath !== normalizePath(window.location.pathname)) history.pushState({}, '', nextPath);
  render({ focus: true });
});

window.addEventListener('popstate', () => render({ focus: true }));
render();
