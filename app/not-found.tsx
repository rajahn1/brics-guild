import Link from 'next/link';

export default function NotFound() {
  return <main className="page-frame not-found"><p className="signal-line">Rota desconhecida</p><h1>Esta trilha ainda não foi aberta.</h1><p>O guia pode ter mudado de endereço ou ainda não existe.</p><Link className="button button-primary" href="/">Voltar ao início</Link></main>;
}
