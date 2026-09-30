import type { Metadata } from 'next';
import { CalendarDays, Layers3, Map, UsersRound } from 'lucide-react';
import { PageIntro, SourceLink, StatusBadge } from '@/components/content-ui';

export const metadata: Metadata = { title: 'WoW: Forever' };

const facts = [
  { icon: CalendarDays, title: '04 de novembro de 2026', copy: 'Lançamento global anunciado pela Blizzard.' },
  { icon: Map, title: 'Azeroth em expansão', copy: 'A base do WoW original recebe novas zonas, histórias, masmorras e raids.' },
  { icon: UsersRound, title: 'Rulesets em vez de realms', copy: 'Normal, PvP e Roleplay no lançamento; Hardcore chega depois.' },
  { icon: Layers3, title: 'Legacy System', copy: 'Progressão horizontal de conta ligada a exploração, profissões, masmorras e raids.' },
];

export default function ForeverPage() {
  return (
    <main>
      <PageIntro kicker="WoW: Forever" title="O mundo clássico continua. A informação também muda." description="Este portal acompanha a nova Azeroth sem confundir anúncio oficial, teste de beta e opinião de jogador." status="beta" updatedAt="2026-09-29" />
      <section className="page-frame fact-grid">
        {facts.map(({ icon: Icon, title, copy }) => <article className="fact-item" key={title}><Icon aria-hidden="true" /><h2>{title}</h2><p>{copy}</p></article>)}
      </section>
      <section className="page-frame editorial-policy">
        <div className="section-heading"><p className="signal-line">Política editorial</p><h2>Quatro marcas. Uma leitura simples.</h2></div>
        <div className="policy-list">
          <div><StatusBadge status="confirmed" /><p>Informação publicada ou confirmada diretamente pela Blizzard.</p></div>
          <div><StatusBadge status="beta" /><p>Existe na versão de testes e pode mudar antes do lançamento.</p></div>
          <div><StatusBadge status="community" /><p>Experiência ou interpretação de jogadores; não é fato oficial.</p></div>
          <div><StatusBadge status="validating" /><p>Há sinais ou referências, mas ainda falta confirmação confiável.</p></div>
        </div>
      </section>
      <section className="page-frame source-panel">
        <h2>Fontes principais</h2>
        <SourceLink href="https://worldofwarcraft.blizzard.com/en-us/news/24304160/">Beta de WoW: Forever</SourceLink>
        <SourceLink href="https://news.blizzard.com/en-us/article/24303862/world-of-warcraft-forever-whats-next-panel-recap">Resumo do painel What's Next</SourceLink>
        <SourceLink href="https://news.blizzard.com/en-us/article/24307383/get-to-know-the-world-of-warcraft-forever-legacy-system">Sistema de Legacy</SourceLink>
        <SourceLink href="https://news.blizzard.com/en-us/article/24302070/choose-your-ruleset-in-world-of-warcraft-forever">Rulesets oficiais</SourceLink>
      </section>
    </main>
  );
}
