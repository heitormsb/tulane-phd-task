import Link from "next/link";
import type { Copy } from "@/copy/pt";
import type { Page } from "@/copy/metadata";
import { EMAIL } from "@/copy/site";
import { CLOSING_POSTS } from "@/content/library";
import { PostImage } from "./post-image";
import { ScheduleLink } from "./schedule-link";
import { Logo } from "./site-header";

/** The ending: the invitation to a demo beside a hand of posts, fanned like cards. */
export function Closing({ copy }: { copy: Copy }) {
  return (
    <section className="sheet sheet-lime closing" aria-labelledby="closing-title">
      <div className="wrap closing-body">
        <div className="closing-text">
          <h2 id="closing-title" className="heading">
            {copy.cta.title}
          </h2>
          <p className="lead">{copy.cta.lead}</p>
          <div className="actions">
            <ScheduleLink copy={copy} className="button button-ink">
              {copy.contact.schedule}
            </ScheduleLink>
          </div>
          <p className="closing-email">
            {copy.contact.emailPrefix} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>
        <div className="hand" aria-hidden="true">
          {CLOSING_POSTS.map((post, i) => (
            <span key={post.id} className="hand-card" style={{ "--i": i - (CLOSING_POSTS.length - 1) / 2 } as React.CSSProperties}>
              <PostImage id={post.id} alt="" lang={post.bilingual ? copy.postsLang : undefined} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ copy, page }: { copy: Copy; page: Page }) {
  return (
    <footer className="site-footer wrap">
      <Link href={copy.paths.home} className="brand" aria-label={copy.nav.home}>
        <Logo height={26} />
      </Link>
      <p className="footer-tagline">{copy.footer.tagline}</p>
      <nav className="footer-nav" aria-label={copy.nav.footerLabel}>
        <Link href={copy.paths.pricing}>{copy.nav.pricing}</Link>
        <a href={copy.other[page]} hrefLang={copy.other.lang} lang={copy.other.lang}>
          {copy.other.name}
        </a>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </nav>
      <p className="footer-legal">
        © {new Date().getFullYear()} {copy.footer.rights}
      </p>
    </footer>
  );
}
