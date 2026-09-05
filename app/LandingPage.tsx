/* eslint-disable @next/next/no-img-element */
import DemoApp from './components/landing/DemoApp';
import HeroNetwork from './components/landing/HeroNetwork';
import { siteCopy, type Locale } from './i18n';
import LanguageSwitcher from './i18n/LanguageSwitcher';

const scheduleUrl = 'https://calendar.app.google/AEpf5q75ekxHX1mP8';

export default function LandingPage({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: copy.htmlLang,
    mainEntity: copy.faqs.map(faq => ({
      '@type': 'Question', name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <main className="landing-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <a className="skip-link" href="#top">{copy.nav.skip}</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={locale === 'en' ? 'Tessila — home' : 'Tessila — início'}>
          <img src="/assets/tessila-logo.svg" alt="Tessila" width="150" height="46" />
        </a>
        <nav aria-label={locale === 'en' ? 'Main navigation' : 'Navegação principal'}>
          <a href="#como-funciona">{copy.nav.how}</a>
          <a href="#demonstracao">{copy.nav.demo}</a>
          <a href="#governanca">{copy.nav.governance}</a>
        </nav>
        <div className="header-actions">
          <a className="button button-small" data-contact="header" href={scheduleUrl} target="_blank" rel="noopener noreferrer">{copy.nav.schedule}</a>
          <LanguageSwitcher activeLocale={locale} label={copy.switcher.label} ariaLabel={copy.switcher.ariaLabel} switchToPortuguese={copy.switcher.switchToPortuguese} switchToEnglish={copy.switcher.switchToEnglish} />
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> {copy.hero.eyebrow}</div>
          <h1>{copy.hero.title} <em>{copy.hero.emphasis}</em></h1>
          <p>{copy.hero.description}</p>
          <div className="hero-actions">
            <a className="button" data-contact="hero" href={scheduleUrl} target="_blank" rel="noopener noreferrer">{copy.hero.schedule} <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#demonstracao">{copy.hero.tryDemo} <span aria-hidden="true">↓</span></a>
          </div>
          <p className="meeting-note">{copy.hero.duration}</p>
          <div className="trust-row"><span><b>✓</b> {copy.hero.dataOrigin}</span><span><b>✓</b> {copy.hero.governance}</span></div>
        </div>
        <div className="hero-demo"><HeroNetwork copy={copy.heroNetwork} /><div className="demo-caption"><span /> {copy.hero.caption}</div></div>
      </section>

      <section className="plain-language" aria-label={copy.plain.ariaLabel}>
        <p><strong>{copy.plain.title}</strong> {copy.plain.description}</p>
        <div className="semantic-example">
          <div><span>{copy.plain.before}</span>{copy.plain.inputs.map(input => <b className="example-report" key={input}>{input}</b>)}</div>
          <b aria-hidden="true">→</b>
          <div><span>{copy.plain.after}</span><strong>{copy.plain.result}</strong></div>
        </div>
      </section>

      <section className="section audience-section" id="aplicacoes">
        <div className="section-heading split-heading">
          <div><span className="section-label">{copy.audience.label}</span><h2>{copy.audience.title} <em>{copy.audience.emphasis}</em></h2></div>
          <p>{copy.audience.description}</p>
        </div>
        <div className="audience-grid">
          {copy.audience.cards.map(card => <article key={card.title}><span className="audience-tag">{card.tag}</span><h3>{card.title}</h3><p>{card.description}</p><b>{card.outcome}</b></article>)}
        </div>
      </section>

      <section className="section process-section" id="como-funciona">
        <div className="section-heading centered">
          <span className="section-label">{copy.process.label}</span><h2>{copy.process.title} <em>{copy.process.emphasis}</em></h2><p>{copy.process.description}</p>
        </div>
        <div className="process-grid">
          {copy.process.cards.map((card, index) => <article className={`process-card ${index === 1 ? 'featured' : ''}`} key={card.title}><span className="step-number">{String(index + 1).padStart(2, '0')}</span><div className="step-icon" aria-hidden="true">{card.icon}</div><h3>{card.title}</h3><p>{card.description}</p><span className="card-example">{card.example}</span></article>)}
        </div>
      </section>

      <section className="demo-section" id="demonstracao">
        <div className="demo-section-heading"><div><span className="section-label">{copy.demoSection.label}</span><h2>{copy.demoSection.title} <em>{copy.demoSection.emphasis}</em></h2></div><p>{copy.demoSection.description}</p></div>
        <DemoApp copy={copy} />
        <div className="demo-next-step"><div><h3>{copy.demoSection.ctaTitle}</h3><p>{copy.demoSection.ctaDescription}</p></div><a className="button" data-contact="after_demo" href={scheduleUrl} target="_blank" rel="noopener noreferrer">{copy.demoSection.ctaAction}<span aria-hidden="true">↗</span></a></div>
      </section>

      <section className="governance-section" id="governanca">
        <div className="governance-inner">
          <div className="governance-heading">
            <div className="governance-copy"><span className="section-label light">{copy.governance.label}</span><h2>{copy.governance.title} <em>{copy.governance.emphasis}</em></h2><p>{copy.governance.description}</p></div>
            <div className="governance-proof" aria-label={copy.governance.proofAria}>
              <div className="governance-proof-head"><span><i />{copy.governance.query}</span><b>{copy.governance.authorized}</b></div>
              <div className="governance-proof-steps">{copy.governance.steps.map((step, index) => <div key={step.label}><span>{String(index + 1).padStart(2, '0')}</span><p>{step.label}</p><b>{step.status}</b></div>)}</div>
              <div className="governance-proof-foot"><span>{copy.governance.noCopy}</span><span>{copy.governance.auditTrail}</span></div>
            </div>
          </div>
          <div className="governance-grid">{copy.governance.cards.map((card, index) => <article key={card.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{card.title}</h3><p>{card.description}</p></article>)}</div>
        </div>
      </section>

      <section className="section evidence-section" id="sobre">
        <div className="evidence-main">
          <span className="section-label">{copy.evidence.label}</span>
          <h2>{copy.evidence.title} <em>{copy.evidence.emphasis}</em></h2>
          <p>{copy.evidence.description}</p>
          <div className="research-review"><h3>{copy.evidence.recognitionTitle}</h3><p>{copy.evidence.recognitionDescription}</p></div>
        </div>
        <aside className="about-tessila">
          <img src="/assets/tessila-symbol.svg" alt="" width="64" height="64" />
          <span className="section-label">{copy.evidence.aboutLabel}</span>
          <h3>{copy.evidence.aboutTitle}</h3><p>{copy.evidence.aboutDescription}</p><p>{copy.evidence.nameNote}</p>
          <a className="text-link" data-contact="about" href={scheduleUrl} target="_blank" rel="noopener noreferrer">{copy.evidence.aboutAction}<span aria-hidden="true"> ↗</span></a>
        </aside>
      </section>

      <section className="section faq-section" id="perguntas-frequentes">
        <div className="faq-intro"><span className="section-label">{copy.faqSection.label}</span><h2>{copy.faqSection.title} <em>{copy.faqSection.emphasis}</em></h2><p>{copy.faqSection.description}</p></div>
        <div className="faq-list">{copy.faqs.map((faq, index) => <details key={faq.question}><summary><span>{String(index + 1).padStart(2, '0')}</span>{faq.question}<i aria-hidden="true">+</i></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <section className="cta-section" id="contato">
        <div className="cta-pattern" aria-hidden="true"><img src="/assets/tessila-symbol.svg" alt="" /></div>
        <div className="cta-copy"><span className="section-label light">{copy.cta.label}</span><h2>{copy.cta.title}</h2><p>{copy.cta.description}</p></div>
        <div className="cta-actions"><a className="button button-light" data-contact="footer_cta" href={scheduleUrl} target="_blank" rel="noopener noreferrer">{copy.cta.action}<span aria-hidden="true">↗</span></a><p>{copy.cta.note}</p><a className="email-contact" data-contact="email" href="mailto:contato@tessila.com">{copy.cta.email} contato@tessila.com</a></div>
      </section>

      <footer>
        <div className="footer-brand"><img src="/assets/tessila-logo.svg" alt="Tessila" width="150" height="46" /><p>{copy.footer.tagline}</p></div>
        <div className="footer-links"><a href="#como-funciona">{copy.footer.how}</a><a href="#governanca">{copy.footer.governance}</a><a href="#sobre">{copy.footer.about}</a><a href="#perguntas-frequentes">{copy.footer.faq}</a></div>
        <div className="footer-meta"><span>© 2026 Tessila</span><a data-contact="footer_email" href="mailto:contato@tessila.com">contato@tessila.com</a><span>{copy.footer.product}</span></div>
      </footer>
    </main>
  );
}
