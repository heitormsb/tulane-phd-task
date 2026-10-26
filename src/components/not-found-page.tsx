import Link from "next/link";
import type { Copy } from "@/copy/pt";
import { SiteFooter } from "./closing";
import { SiteHeader } from "./site-header";
import { LOGO_STONES } from "./stones";

const SLOT = LOGO_STONES.findIndex((stone) => stone.accent);

/** The logo's mosaic with its lavender stone fallen out beside it; a dashed outline and the code mark the empty place. */
function MissingStone() {
  return (
    <svg className="nf-mosaic" viewBox="0 0 146 118" aria-hidden="true" focusable="false">
      <path className="nf-slot" d={LOGO_STONES[SLOT].d} />
      <text className="nf-code" x="71.8" y="28.6">
        {404}
      </text>
      {LOGO_STONES.map((stone, i) => (i === SLOT ? null : <path key={i} d={stone.d} />))}
      <ellipse className="nf-shadow" cx="117.5" cy="112.5" rx="17" ry="2.2" />
      <path className="nf-fallen" d={LOGO_STONES[SLOT].d} />
    </svg>
  );
}

/** The page for an address that matches nothing, in one language; global-not-found.tsx shows the visitor's. */
export function NotFoundPage({ copy }: { copy: Copy }) {
  const t = copy.notFound;
  const home = copy.paths.home;
  const shortcuts = [
    { id: copy.ids.networks, label: copy.nav.networks },
    { id: copy.ids.create, label: copy.nav.create },
    { id: copy.ids.approve, label: copy.nav.approve },
    { id: copy.ids.results, label: copy.nav.results },
  ];
  return (
    <div className="nf-version" lang={copy.lang}>
      <SiteHeader copy={copy} page="home" />
      <main id={copy.ids.main} className="nf wrap grid">
        <div className="nf-text">
          <p className="nf-eyebrow">{t.eyebrow}</p>
          <h1 className="display">{t.heading}</h1>
          <p className="lead">{t.lead}</p>
          <div className="actions">
            <Link className="button" href={home}>
              {t.home}
            </Link>
            <Link className="text-link" href={copy.paths.pricing}>
              {t.pricing}
            </Link>
          </div>
          <nav className="nf-shortcuts" aria-labelledby={`nf-shortcuts-${copy.postsLang}`}>
            <p id={`nf-shortcuts-${copy.postsLang}`}>{t.shortcuts}</p>
            <ul>
              {shortcuts.map((s) => (
                <li key={s.id}>
                  <Link href={`${home}#${s.id}`}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="nf-stage">
          <MissingStone />
        </div>
      </main>
      <SiteFooter copy={copy} page="home" />
    </div>
  );
}
