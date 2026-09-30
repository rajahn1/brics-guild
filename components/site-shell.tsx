import Link from 'next/link';
import { Menu, Radio, Shield } from 'lucide-react';

const navigation = [
  { href: '/', label: 'Início' },
  { href: '/guilda', label: 'A guilda' },
  { href: '/classes/escolha-sua-classe', label: 'Escolha sua classe' },
  { href: '/classes', label: 'Guias de classe' },
  { href: '/raids', label: 'Raids' },
  { href: '/preparacao', label: 'Preparação' },
  { href: '/regras', label: 'Regras' },
];

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="BRICS — página inicial">
      <span className="brand-crop" aria-hidden="true">
        <img src="/brics-logo.png" alt="" />
      </span>
    </Link>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <span className="header-status">
            <Radio aria-hidden="true" />
            Discord em breve
          </span>
          <details className="mobile-nav">
            <summary aria-label="Abrir menu">
              <Menu aria-hidden="true" />
            </summary>
            <nav aria-label="Navegação móvel">
              {navigation.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="page-frame footer-grid">
          <div>
            <Brand />
            <p>Informação clara para uma progressão sem ruído.</p>
          </div>
          <div>
            <strong>Guilda</strong>
            <Link href="/guilda">Quem somos</Link>
            <Link href="/regras">Regras e DKP</Link>
          </div>
          <div>
            <strong>Jogo</strong>
            <Link href="/classes">Classes</Link>
            <Link href="/raids">Raids</Link>
          </div>
          <div className="fan-note">
            <Shield aria-hidden="true" />
            <p>
              Fan site independente. Não afiliado ou endossado pela Blizzard
              Entertainment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
