import type { Copy } from "@/copy/pt";
import { Closing, SiteFooter } from "./closing";
import { NetworkIcon } from "./network-icon";
import { NETWORKS } from "./networks-data";
import { ScheduleLink } from "./schedule-link";
import { SiteHeader } from "./site-header";

// The middle plan is the one most teams start with.
const FEATURED = 1;

export function PricingPage({ copy }: { copy: Copy }) {
  const t = copy.pricing;
  return (
    <>
      <SiteHeader copy={copy} page="pricing" />
      <main id={copy.ids.main}>
        <section className="pricing wrap grid" aria-labelledby="pricing-title">
          <div className="pricing-intro">
            <h1 id="pricing-title" className="display">
              {t.title}
            </h1>
            <p className="lead">{t.lead}</p>
          </div>
          <ul className="plans">
            {t.plans.map((plan, i) => (
              <li key={plan.name} className={`plan${i === FEATURED ? " is-featured" : ""}`}>
                {i === FEATURED ? <p className="plan-flag">{t.featured}</p> : null}
                <h2 className="plan-name">{plan.name}</h2>
                <p className="plan-for">{plan.for}</p>
                <p className="plan-price">{t.price}</p>
                <ul className="stone-list plan-units">
                  {plan.units.map((unit) => (
                    <li key={unit}>{unit}</li>
                  ))}
                </ul>
                <ScheduleLink copy={copy} className={`button${i === FEATURED ? "" : " button-ink"}`}>
                  {t.choose}
                </ScheduleLink>
              </li>
            ))}
          </ul>
          <div className="plans-networks">
            <p className="minor-head">{t.networksTitle}</p>
            <ul className="net-row">
              {NETWORKS.map((network) => (
                <li key={network.id}>
                  <NetworkIcon id={network.id} size="md" label />
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="counts wrap grid section" aria-labelledby="counts-title">
          <h2 id="counts-title" className="heading counts-head">
            {t.countsTitle}
          </h2>
          <dl className="counts-list">
            {t.counts.map((count) => (
              <div key={count.name}>
                <dt className="minor-head">{count.name}</dt>
                <dd>{count.text}</dd>
              </div>
            ))}
          </dl>
        </section>
        <Closing copy={copy} />
      </main>
      <SiteFooter copy={copy} page="pricing" />
    </>
  );
}
