import Link from 'next/link';
import {
  BookOpenText,
  CalendarDays,
  ChevronRight,
  Crosshair,
  ShieldCheck,
  Swords,
  UsersRound,
} from 'lucide-react';

const quickLinks = [
  {
    href: '/classes/escolha-sua-classe',
    icon: Crosshair,
    title: 'Encontre sua classe',
    copy: 'Compare função, ritmo de combate e curva de aprendizado.',
  },
  {
    href: '/raids',
    icon: Swords,
    title: 'Prepare a próxima raid',
    copy: 'Tamanho, checklist, consumíveis e informações confirmadas.',
  },
  {
    href: '/regras',
    icon: ShieldCheck,
    title: 'Entenda o DKP',
    copy: 'Veja como presença, chefes e loot entram na conta.',
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero-shell page-frame">
        <div className="hero-copy">
          <p className="signal-line">BRICS · Horda · Ruleset Normal</p>
          <h1>Informação para entrar na raid sabendo o que fazer.</h1>
          <p className="hero-lede">
            Cinco amigos, mais de dez anos de WoW e uma guilda feita para
            aprender, preparar e progredir juntos em WoW: Forever.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/classes/escolha-sua-classe">
              Escolher minha classe
            </Link>
            <Link className="button button-quiet" href="/guilda">
              Conhecer a BRICS
            </Link>
          </div>
        </div>

        <aside className="mission-board" aria-label="Situação atual">
          <div className="board-header">
            <span>Quadro de missão</span>
            <span className="live-mark">Em atualização</span>
          </div>
          <div className="board-row">
            <CalendarDays aria-hidden="true" />
            <div>
              <strong>04 nov. 2026</strong>
              <span>Lançamento global</span>
            </div>
          </div>
          <div className="board-row">
            <Swords aria-hidden="true" />
            <div>
              <strong>09 dez. 2026</strong>
              <span>Primeiras raids</span>
            </div>
          </div>
          <div className="board-row">
            <UsersRound aria-hidden="true" />
            <div>
              <strong>Discord em breve</strong>
              <span>Recrutamento será aberto aqui</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="quick-grid page-frame" aria-labelledby="comece-aqui">
        <div className="section-intro">
          <p className="signal-line">Comece por aqui</p>
          <h2 id="comece-aqui">Menos dúvida. Mais jogo.</h2>
          <p>
            Escolha uma rota e encontre informação direta, revisada e marcada
            pelo nível de confiança.
          </p>
        </div>
        <div className="route-list">
          {quickLinks.map(({ href, icon: Icon, title, copy }) => (
            <Link className="route-item" href={href} key={href}>
              <Icon aria-hidden="true" />
              <span>
                <strong>{title}</strong>
                <small>{copy}</small>
              </span>
              <ChevronRight aria-hidden="true" className="route-chevron" />
            </Link>
          ))}
        </div>
      </section>

      <section className="briefing-strip">
        <div className="page-frame briefing-inner">
          <BookOpenText aria-hidden="true" />
          <p>
            <strong>Leitura honesta do beta.</strong> O que veio da Blizzard é
            marcado como confirmado; relatos de jogadores aparecem como opinião
            da comunidade; o que ainda muda fica em validação.
          </p>
          <Link href="/wow-forever">Como tratamos as fontes</Link>
        </div>
      </section>
    </main>
  );
}
