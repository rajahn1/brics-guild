import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CalendarDays, Check, ExternalLink, Play, UsersRound } from 'lucide-react';
import { BackLink, PageIntro, SourceLink, StatusBadge } from '@/components/content-ui';
import { getRaidGuide, raids } from '@/lib/content';

export function generateStaticParams() { return raids.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const raid = getRaidGuide((await params).slug);
  return raid ? { title: raid.name, description: raid.summary } : {};
}

export default async function RaidGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const raid = getRaidGuide((await params).slug);
  if (!raid) notFound();
  return (
    <main>
      <PageIntro kicker={raid.originalName} title={raid.name} description={raid.summary} status={raid.status} updatedAt={raid.updatedAt} />
      <section className="page-frame raid-summary-bar"><span><UsersRound aria-hidden="true" /><small>Grupo</small><strong>{raid.size}</strong></span><span><CalendarDays aria-hidden="true" /><small>Disponibilidade</small><strong>{raid.releaseDate}</strong></span></section>
      <section className="page-frame guide-columns raid-columns">
        <article className="guide-block"><div className="block-heading"><h2>Composição sugerida</h2><StatusBadge status="validating" /></div><ul>{raid.composition.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article className="guide-block"><div className="block-heading"><h2>Checklist</h2><StatusBadge status="confirmed" /></div><ul className="check-list">{raid.preparation.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></article>
        <article className="guide-block"><div className="block-heading"><h2>Estratégia</h2><StatusBadge status="validating" /></div><ul>{raid.strategy.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </section>
      {raid.videos.length > 0 && <section className="page-frame video-panel"><div><Play aria-hidden="true" /><h2>Vídeo relacionado</h2></div>{raid.videos.map((video) => <a href={video.url} target="_blank" rel="noreferrer" key={video.url}><span><strong>{video.title}</strong><small>{video.source}</small></span><ExternalLink aria-hidden="true" /></a>)}</section>}
      <section className="page-frame source-panel"><h2>Fontes</h2>{raid.sources.map((source) => <SourceLink href={source.url} key={source.url}>{source.title} · {source.origin}</SourceLink>)}</section>
      <div className="page-frame next-link"><BackLink href="/raids">Voltar para todas as raids</BackLink></div>
    </main>
  );
}
