import type { Metadata } from 'next';
import { Check, Gavel, Shield, Swords, UsersRound } from 'lucide-react';
import { PageIntro, StatusBadge } from '@/components/content-ui';
import { guildRules } from '@/lib/content';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = { title: 'Regras e DKP' };

export default function RulesPage() {
  const { dkp } = guildRules;
  return (
    <main>
      <PageIntro kicker={`Regras · versão ${guildRules.version}`} title="Clareza antes do loot cair." description="Esta é a política inicial da BRICS. Ela existe para alinhar expectativas e será refinada com a experiência real da guilda." status={guildRules.status} updatedAt={guildRules.updatedAt} />
      <section className="page-frame rules-grid">
        <article><Shield aria-hidden="true" /><h2>Convivência</h2><ul>{guildRules.conduct.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></article>
        <article><UsersRound aria-hidden="true" /><h2>Participação em raids</h2><ul>{guildRules.raidParticipation.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></article>
      </section>

      <section className="dkp-section">
        <div className="page-frame">
          <div className="dkp-heading"><div><p className="signal-line">DKP BRICS</p><h2>Versão inicial {guildRules.version}</h2><p>Pontos pessoais, não transferíveis e sem saldo negativo.</p></div><div className="dkp-basics"><span><small>Saldo inicial</small><strong>{dkp.startingBalance}</strong></span><span><small>Lance mínimo</small><strong>{dkp.minimumBid}</strong></span></div></div>
          <div className="earn-grid">{dkp.earnings.map((earning) => <article key={earning.label}><strong>+{earning.points}</strong><span>{earning.label}</span></article>)}</div>
        </div>
      </section>

      <section className="page-frame loot-process">
        <div className="section-heading"><p className="signal-line">Distribuição de loot</p><h2>Do anúncio ao vencedor.</h2></div>
        <ol>{dkp.lootRules.map((rule, index) => <li key={rule}><span>{index + 1}</span><p>{rule}</p></li>)}</ol>
        <div className="no-penalty"><Gavel aria-hidden="true" /><p><strong>Sem multas nesta versão.</strong> {dkp.penalties}</p></div>
      </section>

      <section className="page-frame dkp-example">
        <div className="block-heading"><div><p className="signal-line">Exemplo ilustrativo</p><h2>Como o saldo se movimenta</h2></div><StatusBadge status="beta" /></div>
        <Table>
          <TableHeader><TableRow><TableHead>Evento</TableHead><TableHead>Movimento</TableHead><TableHead>Saldo</TableHead></TableRow></TableHeader>
          <TableBody>{dkp.example.map((row) => <TableRow key={row.event}><TableCell>{row.event}</TableCell><TableCell>{row.change}</TableCell><TableCell>{row.balance}</TableCell></TableRow>)}</TableBody>
        </Table>
        <p>Não é um ranking real. A primeira versão do site documenta o sistema; o registro público de pontos será definido depois.</p>
      </section>
      <section className="page-frame beta-warning"><Swords aria-hidden="true" /><div><strong>Exceções precisam vir antes da raid.</strong><p>Itens lendários, de missão ou materiais estratégicos terão uma regra específica anunciada antes do início, nunca depois do drop.</p></div></section>
    </main>
  );
}
