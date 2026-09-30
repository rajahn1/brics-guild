import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ExternalLink, X } from 'lucide-react';
import { PageIntro, StatusBadge } from '@/components/content-ui';
import { classes } from '@/lib/content';

export const metadata: Metadata = { title: 'Escolha sua classe' };

export default function ChooseClassPage() {
  return (
    <main>
      <PageIntro kicker="Para novos jogadores" title="Que tipo de herói combina com você?" description="Comece pela função que quer cumprir. Depois escolha a fantasia e o ritmo que você vai gostar de repetir durante toda a jornada." status="community" updatedAt="2026-09-29" />

      <section className="page-frame role-compass">
        <div><strong>Quero proteger</strong><p>Procure Tank em Guerreiro, Paladino ou Druida. Caçador e Xamã ainda têm possibilidades em validação.</p></div>
        <div><strong>Quero curar</strong><p>Sacerdote, Paladino, Xamã e Druida colocam você no centro da sobrevivência do grupo.</p></div>
        <div><strong>Quero causar dano</strong><p>Todas as classes podem causar dano; escolha entre distância, corpo a corpo, pets, controle ou versatilidade.</p></div>
      </section>

      <section className="page-frame playstyle-list">
        {classes.map((guide) => (
          <article className="playstyle-card" key={guide.slug} style={{ '--class-accent': guide.accent } as React.CSSProperties}>
            <div className="playstyle-heading"><span className="class-mark">{guide.name.slice(0, 2)}</span><div><h2>{guide.name}</h2><p>{guide.fantasy}</p></div><StatusBadge status={guide.status} /></div>
            <div className="playstyle-stats"><span><small>Combate</small>{guide.combat}</span><span><small>Solo</small>{guide.solo}</span><span><small>Curva</small>{guide.difficulty}</span></div>
            <p className="playstyle-summary">{guide.summary}</p>
            <div className="fit-grid">
              <div><h3><Check aria-hidden="true" /> Você pode gostar se</h3><ul>{guide.likes.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h3><X aria-hidden="true" /> Talvez não seja para você se</h3><ul>{guide.avoid.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
            <div className="community-note"><StatusBadge status="community" /><p>{guide.communityNote}</p></div>
            <div className="card-footer"><Link href={`/classes/${guide.slug}`}>Abrir guia completo</Link><a href={guide.communitySources[0]} target="_blank" rel="noreferrer">Ver discussão <ExternalLink aria-hidden="true" /></a></div>
          </article>
        ))}
      </section>

      <section className="page-frame beta-warning"><strong>Não escolha pela “melhor classe do beta”.</strong><p>O limite de nível e os ajustes frequentes impedem conclusões sobre o endgame. Use estas impressões para descobrir um estilo, não para prever uma tier list.</p></section>
    </main>
  );
}
