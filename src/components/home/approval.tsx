import type { Copy } from "@/copy/pt";
import { APPROVAL, BRAND_NAMES, CALENDAR_START } from "@/content/library";
import { networkById } from "../networks-data";
import { postAlt } from "../post-image";
import { ApprovalDemo } from "./approval-demo";

export function Approval({ copy }: { copy: Copy }) {
  const t = copy.approve;
  const queue = APPROVAL.map((item, i) => ({
    id: item.post.id,
    alt: postAlt(copy, item.post),
    brand: BRAND_NAMES[item.post.brand],
    network: item.network,
    networkName: networkById(item.network).name,
    day: item.day,
    time: item.time,
    caption: t.captions[i],
  }));
  const start = CALENDAR_START.map((item) => ({
    key: item.post.id,
    id: item.post.id,
    alt: postAlt(copy, item.post),
    network: item.network,
    day: item.day,
    time: item.time,
    published: item.published,
  }));
  return (
    <section className="approval section" id={copy.ids.approve} aria-labelledby="approve-title">
      <div className="wrap">
        <div className="section-intro approval-intro">
          <h2 id="approve-title" className="heading">
            {t.title}
          </h2>
          <p className="lead">{t.lead}</p>
        </div>
        <ApprovalDemo
          queue={queue}
          start={start}
          editHref={`#${copy.ids.edit}`}
          labels={{
            queue: t.queueLabel,
            week: t.weekLabel,
            days: t.days,
            approve: t.approve,
            edit: t.edit,
            skip: t.skip,
            scheduled: t.scheduled,
            published: t.published,
            done: t.done,
            again: t.again,
            left: t.left,
          }}
        />
      </div>
    </section>
  );
}
