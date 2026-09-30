import type { Metadata } from 'next';
import { Check, Headphones, PackageCheck, ScrollText, ShieldCheck, TimerReset, Wrench } from 'lucide-react';
import { PageIntro, StatusBadge } from '@/components/content-ui';

export const metadata: Metadata = { title: 'Preparação' };

const checklist = [
  { icon: Wrench, title: 'Equipamento', items: ['Repare tudo antes de viajar', 'Encante peças definitivas', 'Leve equipamento alternativo da sua função'] },
  { icon: PackageCheck, title: 'Bolsas', items: ['Separe reagentes de classe', 'Deixe espaço para loot', 'Confirme munição, venenos ou fragmentos'] },
  { icon: ShieldCheck, title: 'Consumíveis', items: ['Comida do atributo correto', 'Frasco ou elixir da função', 'Poções de vida, mana e combate'] },
  { icon: ScrollText, title: 'Estratégia', items: ['Leia o resumo de cada chefe', 'Assista ao vídeo indicado', 'Saiba sua responsabilidade antes do pull'] },
  { icon: Headphones, title: 'Comunicação', items: ['Entre no canal de voz', 'Configure push-to-talk', 'Deixe chamadas prioritárias audíveis'] },
  { icon: TimerReset, title: 'Pontualidade', items: ['Esteja no local antes do convite', 'Avise atrasos com antecedência', 'Reserve o tempo completo da raid'] },
];

export default function PreparationPage() {
  return (
    <main>
      <PageIntro kicker="Preparação geral" title="A raid começa antes do convite." description="Um checklist simples para reduzir pausas, evitar esquecimentos e usar o tempo do grupo em progressão." />
      <section className="page-frame prep-grid">{checklist.map(({ icon: Icon, title, items }) => <article className="prep-card" key={title}><Icon aria-hidden="true" /><h2>{title}</h2><ul>{items.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></article>)}</section>
      <section className="page-frame addon-panel"><div><p className="signal-line">Addons recomendados</p><h2>Função primeiro. Lista depois.</h2></div><div className="addon-list"><span><strong>Temporizadores</strong><small>Avisos claros de habilidades e fases.</small></span><span><strong>Ameaça</strong><small>Leitura de aggro para tanks e DPS.</small></span><span><strong>Debuffs</strong><small>Visualização de efeitos que precisam de resposta.</small></span></div><StatusBadge status="validating" /><p className="addon-note">Os nomes dos addons serão publicados quando houver versões confirmadas para WoW: Forever.</p></section>
    </main>
  );
}
