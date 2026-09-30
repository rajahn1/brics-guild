import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { PageIntro, StatusBadge } from '@/components/content-ui';
import { classes } from '@/lib/content';

export const metadata: Metadata = { title: 'Guias de classe' };

export default function ClassesPage() {
  return (
    <main>
      <PageIntro kicker="Guias de classe" title="Nove caminhos. Nenhuma tier list." description="Visão geral, gameplay, rota inicial, macros e consumíveis — sempre com o estado atual da informação visível." />
      <section className="page-frame class-directory">
        {classes.map((guide) => (
          <Link className="class-row" href={`/classes/${guide.slug}`} key={guide.slug} style={{ '--class-accent': guide.accent } as React.CSSProperties}>
            <span className="class-mark">{guide.name.slice(0, 2)}</span>
            <span className="class-main"><strong>{guide.name}</strong><small>{guide.fantasy}</small></span>
            <span className="role-tags">{guide.roles.slice(0, 3).map((role) => <em key={role}>{role}</em>)}</span>
            <StatusBadge status={guide.status} />
            <ChevronRight aria-hidden="true" />
          </Link>
        ))}
      </section>
      <section className="page-frame choice-callout"><div><p className="signal-line">Ainda em dúvida?</p><h2>Comece pelo jeito que você gosta de jogar.</h2></div><Link className="button button-primary" href="/classes/escolha-sua-classe">Comparar gameplays</Link></section>
    </main>
  );
}
