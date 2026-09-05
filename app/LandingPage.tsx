/* eslint-disable @next/next/no-img-element */

import DemoApp from './components/landing/DemoApp';
import HeroNetwork from './components/landing/HeroNetwork';
import { siteCopy, type Locale } from './i18n';
import LanguageSwitcher from './i18n/LanguageSwitcher';

const scheduleUrl = 'https://calendar.app.google/AEpf5q75ekxHX1mP8';

function SourceDots() {
  return (
    <div className="source-dots" aria-hidden="true">
      <i /><i /><i /><i />
    </div>
  );
}

type LandingPageProps = {
  locale: Locale;
};

export default function LandingPage({ locale }: LandingPageProps) {
  const copy = siteCopy[locale];
  const numberFormatter = new Intl.NumberFormat(copy.htmlLang);
  const { faqs } = copy;
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: copy.htmlLang,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <header className="site-header">
        <a className="brand" href="#top" aria-label={locale === 'en' ? 'Tessila — home' : 'Tessila — início'}>
          <img src="/assets/tessila-logo.svg" alt="Tessila" />
        </a>
        <nav aria-label={locale === 'en' ? 'Main navigation' : 'Navegação principal'}>
          <a href="#como-funciona">{copy.nav.how}</a>
          <a href="#demonstracao">{copy.nav.demo}</a>
          <a href="#governanca">{copy.nav.governance}</a>
        </nav>
        <div className="header-actions">
          <a className="button button-small" href={scheduleUrl} target="_blank" rel="noopener noreferrer">{copy.nav.schedule}</a>
          <LanguageSwitcher
            activeLocale={locale}
            label={copy.switcher.label}
            ariaLabel={copy.switcher.ariaLabel}
            switchToPortuguese={copy.switcher.switchToPortuguese}
            switchToEnglish={copy.switcher.switchToEnglish}
          />
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> {copy.hero.eyebrow}</div>
          <h1>{copy.hero.title} <em>{copy.hero.emphasis}</em></h1>
          <p>{copy.hero.description}</p>
          <div className="hero-actions">
            <a className="button" href="#demonstracao">{copy.hero.tryDemo} <span>→</span></a>
            <a className="text-link" href="#como-funciona">{copy.hero.understand} <span>↓</span></a>
          </div>
          <div className="trust-row">
            <span><b>✓</b> {copy.hero.dataOrigin}</span>
            <span><b>✓</b> {copy.hero.governance}</span>
          </div>
        </div>
        <div className="hero-demo"><HeroNetwork copy={copy.heroNetwork} /><div className="demo-caption"><span /> {copy.hero.caption}</div></div>
      </section>

      <section className="plain-language" aria-label={copy.plain.ariaLabel}>
        <span className="plain-number">01</span>
        <p><strong>{copy.plain.title}</strong> {copy.plain.description}</p>
        <div className="plain-metrics">
          <span><b>3+</b> {copy.plain.sources}</span>
          <span><b>0</b> {copy.plain.copies}</span>
          <span><b>1</b> {copy.plain.answer}</span>
        </div>
      </section>

      <section className="section process-section" id="como-funciona">
        <div className="section-heading centered">
          <span className="section-label">{copy.process.label}</span>
          <h2>{copy.process.title} <em>{copy.process.emphasis}</em></h2>
          <p>{copy.process.description}</p>
        </div>

        <div className="process-grid">
          {copy.process.cards.map((card, index) => (
            <article className={`process-card ${index === 1 ? 'featured' : ''}`} key={card.title}>
              <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
              <div className={`step-icon ${index === 0 ? 'question-icon' : index === 1 ? 'route-icon' : 'answer-icon'}`} aria-hidden="true">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className="card-example">{card.example}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="demo-section" id="demonstracao">
        <div className="demo-section-heading">
          <div><span className="section-label">{copy.demoSection.label}</span><h2>{copy.demoSection.title} <em>{copy.demoSection.emphasis}</em></h2></div>
          <p>{copy.demoSection.description}</p>
        </div>
        <DemoApp copy={copy} />
      </section>

      <section className="section architecture-section" aria-labelledby="architecture-title">
        <div className="architecture-copy">
          <span className="section-label">{copy.architecture.label}</span>
          <h2 id="architecture-title">{copy.architecture.title} <em>{copy.architecture.emphasis}</em></h2>
          <p>{copy.architecture.description}</p>
          <ul className="check-list">
            {copy.architecture.checks.map((check) => <li key={check}><span>✓</span> {check}</li>)}
          </ul>
        </div>

        <div className="architecture-visual" aria-label={copy.architecture.ariaLabel}>
          <span className="architecture-map-label">{copy.architecture.mapLabel}</span>
          <div className="visual-sources">
            {copy.architecture.sources.map((source) => (
              <div className="visual-source" key={source.name}>
                <span className="mini-hospital" aria-hidden="true">{source.icon}</span>
                <div><strong>{source.name}</strong><small>{source.detail}</small></div>
                <SourceDots />
              </div>
            ))}
          </div>
          <div className="visual-connector"><span>{copy.architecture.question}</span><i /><i /><i /></div>
          <div className="visual-core">
            <img src="/assets/tessila-symbol.svg" alt="" />
            <strong>Tessila</strong>
            <small>{copy.architecture.federatedQuery}</small>
          </div>
          <div className="visual-arrow"><i /><span>{copy.architecture.answersOnly}</span></div>
          <div className="visual-result"><span>{copy.architecture.result}</span><strong>{numberFormatter.format(2847)}</strong><small>{copy.architecture.indicators}</small><b>{copy.architecture.noCopies}</b></div>
        </div>
      </section>

      <section className="governance-section" id="governanca">
        <div className="governance-inner">
          <div className="governance-heading">
            <div className="governance-copy">
              <span className="section-label light">{copy.governance.label}</span>
              <h2>{copy.governance.title} <em>{copy.governance.emphasis}</em></h2>
              <p>{copy.governance.description}</p>
            </div>
            <div className="governance-proof" aria-label={copy.governance.proofAria}>
              <div className="governance-proof-head"><span><i /> {copy.governance.query}</span><b>{copy.governance.authorized}</b></div>
              <div className="governance-proof-steps">
                {copy.governance.steps.map((step, index) => (
                  <div key={step.label}><span>{String(index + 1).padStart(2, '0')}</span><p>{step.label}</p><b>{step.status}</b></div>
                )).reduce<React.ReactNode[]>((nodes, step, index) => {
                  if (index > 0) nodes.push(<i aria-hidden="true" key={`connector-${index}`} />);
                  nodes.push(step);
                  return nodes;
                }, [])}
              </div>
              <div className="governance-proof-foot"><span>✓ {copy.governance.noCopy}</span><span>{copy.governance.auditTrail}</span></div>
            </div>
          </div>
          <div className="governance-grid">
            {copy.governance.cards.map((card, index) => <article key={card.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{card.title}</h3><p>{card.description}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section audience-section">
        <div className="section-heading split-heading">
          <div><span className="section-label">{copy.audience.label}</span><h2>{copy.audience.title} <em>{copy.audience.emphasis}</em></h2></div>
          <p>{copy.audience.description}</p>
        </div>
        <div className="audience-grid">
          {copy.audience.cards.map((card) => <article key={card.title}><span className="audience-tag">{card.tag}</span><h3>{card.title}</h3><p>{card.description}</p><b>{card.outcome}</b></article>)}
        </div>
      </section>

      <section className="values-section" id="sobre">
        <div className="values-mark"><img src="/assets/tessila-symbol.svg" alt="" /></div>
        <div className="values-copy"><span className="section-label">{copy.values.label}</span><h2>{copy.values.title}<br /><em>{copy.values.emphasis}</em></h2></div>
        <p>{copy.values.descriptionStart} <i>{copy.values.term}</i>{copy.values.descriptionEnd}</p>
      </section>

      <section className="section faq-section" id="perguntas-frequentes">
        <div className="faq-intro"><span className="section-label">{copy.faqSection.label}</span><h2>{copy.faqSection.title} <em>{copy.faqSection.emphasis}</em></h2><p>{copy.faqSection.description}</p></div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary><span>{String(index + 1).padStart(2, '0')}</span>{faq.question}<i aria-hidden="true">+</i></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-section" id="contato">
        <div className="cta-pattern" aria-hidden="true"><img src="/assets/tessila-symbol.svg" alt="" /></div>
        <div className="cta-copy"><span className="section-label light">{copy.cta.label}</span><h2>{copy.cta.title}</h2><p>{copy.cta.description}</p></div>
        <a className="button button-light" href={scheduleUrl} target="_blank" rel="noopener noreferrer">{copy.cta.action} <span>→</span></a>
      </section>

      <footer>
        <div className="footer-brand"><img src="/assets/tessila-logo.svg" alt="Tessila" /><p>{copy.footer.tagline}</p></div>
        <div className="footer-links"><a href="#como-funciona">{copy.footer.how}</a><a href="#governanca">{copy.footer.governance}</a><a href="#sobre">{copy.footer.about}</a><a href="#perguntas-frequentes">{copy.footer.faq}</a></div>
        <div className="footer-meta"><span>© 2026 Tessila</span><a href="mailto:contato@tessila.com">contato@tessila.com</a><span>{copy.footer.product}</span></div>
      </footer>
    </main>
  );
}
