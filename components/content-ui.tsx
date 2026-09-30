import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { ContentStatus } from '@/lib/content';

const labels: Record<ContentStatus, string> = {
  confirmed: 'Confirmada',
  beta: 'Beta',
  community: 'Opinião da comunidade',
  validating: 'Em validação',
};

export function StatusBadge({ status }: { status: ContentStatus }) {
  return <span className={`status-badge status-${status}`}>{labels[status]}</span>;
}

export function PageIntro({
  kicker,
  title,
  description,
  status,
  updatedAt,
}: {
  kicker: string;
  title: string;
  description: string;
  status?: ContentStatus;
  updatedAt?: string;
}) {
  return (
    <header className="page-intro page-frame">
      <p className="signal-line">{kicker}</p>
      <h1>{title}</h1>
      <p className="page-description">{description}</p>
      {(status || updatedAt) && (
        <div className="editorial-meta">
          {status && <StatusBadge status={status} />}
          {updatedAt && <span>Revisado em {formatDate(updatedAt)}</span>}
        </div>
      )}
    </header>
  );
}

export function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="source-link" href={href} target="_blank" rel="noreferrer">
      {children}
      <ExternalLink aria-hidden="true" />
    </a>
  );
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="back-link" href={href}>
      {children}
    </Link>
  );
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
}
