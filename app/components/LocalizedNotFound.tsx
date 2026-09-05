/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { localeRoutes, siteCopy, type Locale } from '../i18n';
import LanguageSwitcher from '../i18n/LanguageSwitcher';

const scheduleUrl = 'https://calendar.app.google/AEpf5q75ekxHX1mP8';

export default function LocalizedNotFound({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const homeUrl = localeRoutes[locale];

  return (
    <main className="not-found-page">
      <header className="not-found-nav">
        <Link href={homeUrl} aria-label={copy.notFound.homeAria}>
          <img src="/assets/tessila-logo.svg" alt="Tessila" />
        </Link>
        <div className="header-actions">
          <a className="not-found-nav-link" href={scheduleUrl} target="_blank" rel="noopener noreferrer">{copy.notFound.schedule}</a>
          <LanguageSwitcher
            activeLocale={locale}
            label={copy.switcher.label}
            ariaLabel={copy.switcher.ariaLabel}
            switchToPortuguese={copy.switcher.switchToPortuguese}
            switchToEnglish={copy.switcher.switchToEnglish}
          />
        </div>
      </header>

      <section className="not-found-content">
        <div className="not-found-copy">
          <span className="not-found-kicker"><i /> {copy.notFound.error}</span>
          <h1>{copy.notFound.title}</h1>
          <p>{copy.notFound.description}</p>
          <div className="not-found-actions">
            <Link className="button" href={homeUrl}>{copy.notFound.back} <span>→</span></Link>
            <Link className="text-link" href={`${homeUrl}#demonstracao`}>{copy.notFound.demo}</Link>
          </div>
        </div>

        <div className="not-found-visual" aria-hidden="true">
          <span className="not-found-number">4</span>
          <div className="not-found-symbol"><img src="/assets/tessila-symbol.svg" alt="" /></div>
          <span className="not-found-number">4</span>
          <i className="lost-tile tile-one" />
          <i className="lost-tile tile-two" />
          <i className="lost-tile tile-three" />
        </div>
      </section>

      <footer className="not-found-footer">
        <span>© 2026 Tessila</span>
        <a href="mailto:contato@tessila.com">contato@tessila.com</a>
        <span>{copy.footer.tagline}</span>
      </footer>
    </main>
  );
}
