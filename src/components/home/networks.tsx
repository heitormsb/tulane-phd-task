import type { Copy } from "@/copy/pt";
import { BRAND_NAMES, NETWORK_POST } from "@/content/library";
import { Icon } from "../icons";
import { NetworkIcon } from "../network-icon";
import { NETWORKS } from "../networks-data";
import { PostImage, postAlt } from "../post-image";

/** One post shown the way each network shows it, then every network Tessila publishes to. */
export function Networks({ copy }: { copy: Copy }) {
  const t = copy.networks;
  const alt = postAlt(copy, NETWORK_POST);
  const initial = BRAND_NAMES[NETWORK_POST.brand].charAt(0);
  return (
    <section className="sheet sheet-night networks section" id={copy.ids.networks} aria-labelledby="networks-title">
      <div className="wrap">
        <div className="section-intro is-centered">
          <h2 id="networks-title" className="heading">
            {t.title}
          </h2>
          <p className="lead">{t.lead}</p>
        </div>

        <div className="devices">
          <figure className="device device-instagram">
            <div className="phone">
              <div className="ig-head">
                <span className="avatar">{initial}</span>
                <strong>{t.handle}</strong>
                <Icon name="more" />
              </div>
              <PostImage id={NETWORK_POST.id} format="4x5" alt={alt} />
              <div className="ig-actions" aria-hidden="true">
                <Icon name="heart" />
                <Icon name="comment" />
                <Icon name="send" />
                <Icon name="bookmark" className="push" />
              </div>
              <p className="ig-caption">
                <strong>{t.handle}</strong> {t.caption}
              </p>
            </div>
            <figcaption>
              <NetworkIcon id="instagram" size="xs" />
              {t.devices.instagram}
            </figcaption>
          </figure>

          <figure className="device device-tiktok">
            <div className="phone phone-tall">
              <PostImage id={NETWORK_POST.id} format="9x16" alt={alt} />
              <div className="tt-rail" aria-hidden="true">
                <span className="avatar">{initial}</span>
                <Icon name="heart" />
                <Icon name="comment" />
                <Icon name="share" />
              </div>
              <div className="tt-caption">
                <strong>{`@${t.handle}`}</strong>
                <p className="tt-tags">{t.tags}</p>
              </div>
            </div>
            <figcaption>
              <NetworkIcon id="tiktok" size="xs" />
              {t.devices.tiktok}
            </figcaption>
          </figure>

          <figure className="device device-linkedin">
            <div className="li-card">
              <div className="li-head">
                <span className="avatar is-square">{initial}</span>
                <span className="li-who">
                  <strong>{t.name}</strong>
                  <span>{t.about}</span>
                  <span>{t.now}</span>
                </span>
              </div>
              <p className="li-text">
                {t.caption} <span className="li-more">{t.seeMore}</span>
              </p>
              <PostImage id={NETWORK_POST.id} format="1x1" alt={alt} />
              <div className="li-actions" aria-hidden="true">
                {t.liActions.map((action) => (
                  <span key={action}>{action}</span>
                ))}
              </div>
            </div>
            <figcaption>
              <NetworkIcon id="linkedin" size="xs" />
              {t.devices.linkedin}
            </figcaption>
          </figure>

          <figure className="device device-x">
            <div className="x-card">
              <span className="avatar">{initial}</span>
              <div className="x-body">
                <p className="x-who">
                  <strong>{t.name}</strong> <span>{`@${t.handle}`}</span>
                </p>
                <p className="x-text">{t.caption}</p>
                <PostImage id={NETWORK_POST.id} format="1x1" alt={alt} />
                <div className="x-actions" aria-hidden="true">
                  <Icon name="comment" />
                  <Icon name="repost" />
                  <Icon name="heart" />
                  <Icon name="bookmark" />
                </div>
              </div>
            </div>
            <figcaption>
              <NetworkIcon id="x" size="xs" />
              {t.devices.x}
            </figcaption>
          </figure>
        </div>

        <h3 className="minor-head networks-all">{t.allTitle}</h3>
        <ul className="net-grid">
          {NETWORKS.map((network) => (
            <li key={network.id}>
              <NetworkIcon id={network.id} size="lg" />
              <span>{network.name}</span>
            </li>
          ))}
        </ul>
        <p className="networks-note">{t.connect}</p>
      </div>
    </section>
  );
}
