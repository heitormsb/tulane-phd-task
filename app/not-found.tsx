/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  description: 'A página que você tentou acessar não foi encontrada.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <header className="not-found-nav">
        <Link href="/" aria-label="Tessila — página inicial">
          <img src="/assets/tessila-logo.svg" alt="Tessila" />
        </Link>
        <Link className="not-found-nav-link" href="/#contato">Falar com a Tessila</Link>
      </header>

      <section className="not-found-content">
        <div className="not-found-copy">
          <span className="not-found-kicker"><i /> Erro 404</span>
          <h1>Essa peça não faz parte deste mosaico.</h1>
          <p>A página pode ter mudado de endereço ou o link está incorreto. A landing page da Tessila continua logo no início.</p>
          <div className="not-found-actions">
            <Link className="button" href="/">Voltar para o início <span>→</span></Link>
            <Link className="text-link" href="/#demonstracao">Ver a demonstração</Link>
          </div>
        </div>

        <div className="not-found-visual" aria-hidden="true">
          <span className="not-found-number">4</span>
          <div className="not-found-symbol">
            <img src="/assets/tessila-symbol.svg" alt="" />
          </div>
          <span className="not-found-number">4</span>
          <i className="lost-tile tile-one" />
          <i className="lost-tile tile-two" />
          <i className="lost-tile tile-three" />
        </div>
      </section>

      <footer className="not-found-footer">
        <span>© 2026 Tessila</span>
        <span>Uma visão única dos dados, sem mover nenhuma peça.</span>
      </footer>
    </main>
  );
}
