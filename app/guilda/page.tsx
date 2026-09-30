import type { Metadata } from 'next';
import Link from 'next/link';
import { Handshake, MessagesSquare, Shield, Trophy, UsersRound } from 'lucide-react';
import { PageIntro } from '@/components/content-ui';

export const metadata: Metadata = { title: 'A guilda' };

const values = [
  { icon: Handshake, title: 'Compromisso sem transformar jogo em trabalho', copy: 'Horários e combinados claros, com espaço para a vida fora de Azeroth.' },
  { icon: MessagesSquare, title: 'Erro vira informação', copy: 'Analisamos pulls, ensinamos mecânicas e evitamos procurar culpados.' },
  { icon: Trophy, title: 'Progressão consistente', copy: 'Preparação, variedade de classes e melhoria coletiva acima de atalhos.' },
  { icon: Shield, title: 'Ambiente seguro', copy: 'Respeito é requisito. Assédio e discriminação não têm espaço na BRICS.' },
];

export default function GuildPage() {
  return (
    <main>
      <PageIntro kicker="A guilda" title="Experiência compartilhada. Progresso coletivo." description="A BRICS nasceu da amizade de cinco jogadores que atravessaram mais de uma década de World of Warcraft juntos — e querem construir uma casa duradoura em WoW: Forever." />

      <section className="page-frame split-feature">
        <div className="feature-statement">
          <span className="giant-number">5</span>
          <p>amigos por trás da guilda</p>
        </div>
        <div className="prose-block">
          <h2>O que estamos construindo</h2>
          <p>Uma guilda da <strong>Horda</strong>, no ruleset <strong>Normal</strong>, preparada para conteúdo PvE, raids e uma comunidade que acolha tanto veteranos quanto quem está começando agora.</p>
          <p>Não publicamos personagens ou nomes dos fundadores sem autorização. Por enquanto, a história é coletiva — exatamente como a progressão que queremos fazer.</p>
        </div>
      </section>

      <section className="page-frame content-section">
        <div className="section-heading"><p className="signal-line">Como jogamos</p><h2>Nossos combinados começam aqui.</h2></div>
        <div className="value-grid">
          {values.map(({ icon: Icon, title, copy }) => (
            <article className="value-item" key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-frame recruitment-panel">
        <UsersRound aria-hidden="true" />
        <div><h2>Recrutamento abre em breve.</h2><p>O convite do Discord será publicado aqui quando os canais e o processo de entrada estiverem prontos.</p></div>
        <span className="button button-disabled" aria-disabled="true">Discord em breve</span>
      </section>
      <div className="page-frame next-link"><Link href="/regras">Ler regras e DKP</Link></div>
    </main>
  );
}
