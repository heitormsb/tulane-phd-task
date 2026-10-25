import Link from "next/link";
import type { Copy } from "@/copy/pt";
import { WALL } from "@/content/library";
import { Icon } from "../icons";
import { NetworkIcon } from "../network-icon";
import type { NetworkId } from "../networks-data";
import { PostImage } from "../post-image";
import { ScheduleLink } from "../schedule-link";

const HERO_NETWORKS: NetworkId[] = ["instagram", "tiktok", "linkedin", "facebook", "youtube", "x", "threads", "pinterest"];

/**
 * The first screen: the promise on the left, and on the right a living mosaic of real posts the Studio made for
 * example brands, drifting in three columns, with the product's states pinned on top.
 */
export function Hero({ copy }: { copy: Copy }) {
  const t = copy.hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-text">
          <h1 id="hero-title" className="display">
            {t.title}
          </h1>
          <p className="lead hero-lead">{t.lead}</p>
          <div className="actions">
            <ScheduleLink copy={copy} placement="hero">
              {copy.contact.schedule}
            </ScheduleLink>
            <Link className="text-link" href={copy.paths.pricing}>
              {t.secondary}
            </Link>
          </div>
          <a className="hero-networks" href={`#${copy.ids.networks}`}>
            <span className="net-stack">
              {HERO_NETWORKS.map((id) => (
                <NetworkIcon key={id} id={id} size="sm" />
              ))}
            </span>
            <span>{t.networks}</span>
          </a>
        </div>
        <div className="hero-stage">
          <div className="wall-frame" role="img" aria-label={t.wallLabel}>
            <div className="wall">
              {WALL.map((column, c) => (
                <div key={c} className={`wall-col wall-col-${c}`}>
                  <div className="wall-track">
                    {[...column, ...column].map((post, i) => (
                      <PostImage
                        key={i}
                        id={post.id}
                        alt=""
                        eager={i < 3}
                        className="wall-post"
                        lang={post.bilingual ? copy.postsLang : undefined}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="status-card" aria-label={t.status.label}>
            <div className="status-head">
              <PostImage id="7e0389fd" alt="" lang={copy.postsLang} className="status-thumb" />
              <p className="status-who">
                <strong>{t.status.title}</strong>
                <span>
                  <NetworkIcon id="instagram" size="xs" />
                  {t.status.handle}
                </span>
              </p>
            </div>
            <ol className="status-steps">
              {t.status.steps.map((step, i) => (
                <li key={step} className={i === t.status.steps.length - 1 ? "is-next" : undefined}>
                  <span className="status-mark" aria-hidden="true">
                    <Icon name={i === t.status.steps.length - 1 ? "clock" : "check"} />
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </section>
  );
}
