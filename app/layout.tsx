import type { Metadata } from 'next';
import { Barlow_Condensed, Source_Sans_3 } from 'next/font/google';
import { SiteShell } from '@/components/site-shell';
import './globals.css';

const display = Barlow_Condensed({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const body = Source_Sans_3({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'BRICS — Guilda WoW: Forever',
    template: '%s | BRICS',
  },
  description:
    'Guias de classes, raids, preparação e regras da guilda BRICS em WoW: Forever.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable}`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
