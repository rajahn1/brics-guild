import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendarDays, ChevronRight, UsersRound } from 'lucide-react';
import { PageIntro, StatusBadge } from '@/components/content-ui';
import { raids } from '@/lib/content';

export const metadata: Metadata = { title: 'Raids' };

export default function RaidsPage() {
  return (
    <main>
      <PageIntro kicker="Central de raids" title="Chegue preparado antes do primeiro pull." description="Informação confirmada, composição provisória e o que ainda precisa ser descoberto — sem preencher lacunas com estratégias antigas." />
      <section className="page-frame raid-list">
        {raids.map((raid, index) => (
          <Link className="raid-entry" href={`/raids/${raid.slug}`} key={raid.slug}>
            <span className="raid-index">{String(index + 1).padStart(2, '0')}</span>
            <div className="raid-title"><p>{raid.originalName}</p><h2>{raid.name}</h2><span>{raid.summary}</span></div>
            <div className="raid-facts"><span><UsersRound aria-hidden="true" />{raid.size}</span><span><CalendarDays aria-hidden="true" />{raid.releaseDate}</span><StatusBadge status={raid.status} /></div>
            <ChevronRight aria-hidden="true" />
          </Link>
        ))}
      </section>
      <section className="page-frame beta-warning"><strong>Progressão sem falsa certeza.</strong><p>Mecânicas, resistências e composições serão atualizadas quando houver dados verificados. Até lá, o site diferencia preparação universal de exigência específica.</p></section>
    </main>
  );
}
