import Link from "next/link";
import type { Copy } from "@/copy/pt";
import type { Page } from "@/copy/metadata";
import { ScheduleLink } from "./schedule-link";

// The logo files' own proportions (identidade/01_logo).
const LOGO_RATIO = 7223.4 / 1754.6;

export function Logo({ dark = false, height = 30 }: { dark?: boolean; height?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- a small static SVG, no resizing needed
    <img
      className="logo"
      src={dark ? "/marca/tessila-escuro.svg" : "/marca/tessila.svg"}
      alt=""
      width={Math.round(height * LOGO_RATIO)}
      height={height}
    />
  );
}

export function SiteHeader({ copy, page }: { copy: Copy; page: Page }) {
  const home = copy.paths.home;
  return (
    <header className="site-header wrap">
      <a className="skip-link" href={`#${copy.ids.main}`}>
        {copy.nav.skip}
      </a>
      <Link href={home} className="brand" aria-label={copy.nav.home}>
        <Logo />
      </Link>
      <nav className="site-nav" aria-label={copy.nav.label}>
        <Link href={`${home}#${copy.ids.networks}`}>{copy.nav.networks}</Link>
        <Link href={`${home}#${copy.ids.create}`}>{copy.nav.create}</Link>
        <Link href={`${home}#${copy.ids.approve}`}>{copy.nav.approve}</Link>
        <Link href={`${home}#${copy.ids.results}`}>{copy.nav.results}</Link>
        <Link href={copy.paths.pricing} aria-current={page === "pricing" ? "page" : undefined}>
          {copy.nav.pricing}
        </Link>
      </nav>
      <a className="lang-link" href={copy.other[page]} hrefLang={copy.other.lang} lang={copy.other.lang}>
        {copy.other.name}
      </a>
      <ScheduleLink copy={copy} className="button button-small">
        <span className="only-wide">{copy.nav.schedule}</span>
        <span className="only-narrow">{copy.nav.scheduleShort}</span>
      </ScheduleLink>
    </header>
  );
}
