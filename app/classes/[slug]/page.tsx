import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, CircleAlert, ExternalLink, X } from 'lucide-react';
import { BackLink, PageIntro, StatusBadge } from '@/components/content-ui';
import { classes, getClassGuide } from '@/lib/content';

export function generateStaticParams() { return classes.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = getClassGuide((await params).slug);
  return guide ? { title: `Guia de ${guide.name}`, description: guide.summary } : {};
}

export default async function ClassGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getClassGuide((await params).slug);
  if (!guide) notFound();

  return (
    <main style={{ '--class-accent': guide.accent } as React.CSSProperties}>
      <PageIntro kicker="Guia de classe" title={guide.name} description={guide.summary} status={guide.status} updatedAt={guide.updatedAt} />
      <section className="page-frame class-dossier">
        <div className="dossier-lead"><span className="class-seal">{guide.name.slice(0, 2)}</span><blockquote>{guide.fantasy}</blockquote></div>
        <dl className="dossier-stats"><div><dt>Funções</dt><dd>{guide.roles.join(', ')}</dd></div><div><dt>Combate</dt><dd>{guide.combat}</dd></div><div><dt>Recurso</dt><dd>{guide.resource}</dd></div><div><dt>Ritmo</dt><dd>{guide.pace}</dd></div><div><dt>Gerenciamento</dt><dd>{guide.management}</dd></div><div><dt>Curva</dt><dd>{guide.difficulty}</dd></div></dl>
      </section>
      <section className="page-frame fit-grid detail-fit"><div><h2><Check aria-hidden="true" /> Combina com você se</h2><ul>{guide.likes.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h2><X aria-hidden="true" /> Pense duas vezes se</h2><ul>{guide.avoid.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
      <section className="page-frame guide-columns">
        <article className="guide-block"><div className="block-heading"><h2>{guide.rotation.title}</h2><StatusBadge status={guide.rotation.status} /></div><ol>{guide.rotation.steps.map((step) => <li key={step}>{step}</li>)}</ol></article>
        <article className="guide-block"><div className="block-heading"><h2>Macro inicial</h2><StatusBadge status="validating" /></div>{guide.macros.map((macro) => <div key={macro.name}><h3>{macro.name}</h3><pre><code>{macro.code}</code></pre><p>{macro.note}</p></div>)}</article>
        <article className="guide-block"><div className="block-heading"><h2>Consumíveis</h2><StatusBadge status={guide.consumables.status} /></div><ul>{guide.consumables.items.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </section>
      <section className="page-frame community-detail"><CircleAlert aria-hidden="true" /><div><StatusBadge status="community" /><p>{guide.communityNote}</p><a href={guide.communitySources[0]} target="_blank" rel="noreferrer">Abrir discussão original <ExternalLink aria-hidden="true" /></a></div></section>
      <div className="page-frame next-link"><BackLink href="/classes">Voltar para todas as classes</BackLink></div>
    </main>
  );
}
