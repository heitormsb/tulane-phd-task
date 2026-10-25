"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "../icons";
import { NetworkIcon } from "../network-icon";
import type { NetworkId } from "../networks-data";
import { PostImage } from "../post-image";
import { useInView, useReducedMotion } from "./use-in-view";

type QueueItem = {
  id: string;
  alt: string;
  brand: string;
  network: NetworkId;
  networkName: string;
  day: number;
  time: string;
  caption: string;
};
type Entry = { key: string; id: string; alt: string; network: NetworkId; day: number; time: string; published: boolean; fresh?: boolean };
type Labels = {
  queue: string;
  week: string;
  days: string[];
  approve: string;
  edit: string;
  skip: string;
  scheduled: string;
  published: string;
  done: string;
  again: string;
  left: string;
};

const LEAVE_MS = 420;
const AUTO_MS = 2600;
const RESET_MS = 4200;

/**
 * The review queue beside the week's calendar. While on screen it reviews by itself, approving one post at a time;
 * any click hands control to the visitor. With reduced motion nothing moves on its own.
 */
export function ApprovalDemo({ queue, start, editHref, labels }: { queue: QueueItem[]; start: Entry[]; editHref: string; labels: Labels }) {
  const [index, setIndex] = useState(0);
  const [entries, setEntries] = useState<Entry[]>(start);
  const [leaving, setLeaving] = useState<"approve" | "skip" | null>(null);
  const [auto, setAuto] = useState(true);
  const [ref, { inView }] = useInView<HTMLDivElement>(0.4);
  const reduced = useReducedMotion();
  const done = index >= queue.length;

  const act = useCallback(
    (kind: "approve" | "skip") => {
      if (leaving || index >= queue.length) return;
      const item = queue[index];
      const commit = () => {
        if (kind === "approve") {
          setEntries((list) => [
            ...list.map((e) => ({ ...e, fresh: false })),
            {
              key: `${item.id}-${index}`,
              id: item.id,
              alt: item.alt,
              network: item.network,
              day: item.day,
              time: item.time,
              published: false,
              fresh: true,
            },
          ]);
        }
        setIndex((i) => i + 1);
        setLeaving(null);
      };
      if (reduced) return commit();
      setLeaving(kind);
      window.setTimeout(commit, LEAVE_MS);
    },
    [index, leaving, queue, reduced],
  );

  const reset = useCallback(() => {
    setIndex(0);
    setEntries(start);
    setLeaving(null);
  }, [start]);

  // Plays on its own while visible, until the visitor takes over.
  useEffect(() => {
    if (!auto || reduced || !inView || leaving) return;
    const timer = window.setTimeout(() => (done ? reset() : act("approve")), done ? RESET_MS : AUTO_MS);
    return () => window.clearTimeout(timer);
  }, [auto, reduced, inView, leaving, done, act, reset]);

  const byUser = (fn: () => void) => () => {
    setAuto(false);
    fn();
  };

  const visible = queue.slice(index, index + 3);

  return (
    <div className="approval-app" ref={ref}>
      <div className="queue">
        <p className="app-label">
          {labels.queue}
          <span className="app-count">{done ? "" : labels.left.replace("{n}", String(queue.length - index))}</span>
        </p>
        <div className="card-stack">
          {done ? (
            <div className="stack-done">
              <span className="done-mark">
                <Icon name="check" />
              </span>
              <p>{labels.done}</p>
              <button type="button" className="button button-small button-ink" onClick={byUser(reset)}>
                {labels.again}
              </button>
            </div>
          ) : (
            visible
              .map((item, i) => (
                <article
                  key={`${item.id}-${index + i}`}
                  className={`review-card depth-${i}${i === 0 && leaving ? ` is-leaving-${leaving}` : ""}`}
                  aria-hidden={i > 0}
                >
                  <PostImage id={item.id} alt={item.alt} />
                  <div className="review-body">
                    <p className="review-who">
                      <strong>{item.brand}</strong>
                      <span className="review-where">
                        <NetworkIcon id={item.network} size="xs" />
                        {item.networkName}
                      </span>
                    </p>
                    <p className="review-when">
                      <Icon name="clock" />
                      {`${labels.days[item.day]}, ${item.time}`}
                    </p>
                    <p className="review-caption">{item.caption}</p>
                  </div>
                  {i === 0 ? (
                    <div className="review-actions">
                      <button type="button" className="ghost" onClick={byUser(() => act("skip"))}>
                        {labels.skip}
                      </button>
                      <a className="ghost" href={editHref} onClick={() => setAuto(false)}>
                        {labels.edit}
                      </a>
                      <button
                        type="button"
                        className={`button button-small${leaving === "approve" ? " is-pressed" : ""}`}
                        onClick={byUser(() => act("approve"))}
                      >
                        <Icon name="check" />
                        {labels.approve}
                      </button>
                    </div>
                  ) : null}
                </article>
              ))
              .reverse()
          )}
        </div>
      </div>

      <div className="week">
        <p className="app-label">{labels.week}</p>
        <ol className="week-grid">
          {labels.days.map((day, d) => (
            <li key={day} className="week-day">
              <span className="week-day-name">{day}</span>
              {entries
                .filter((e) => e.day === d)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((e) => (
                  <span key={e.key} className={`slot${e.fresh ? " is-fresh" : ""}`}>
                    <PostImage id={e.id} alt={e.alt} />
                    <span className="slot-meta">
                      <NetworkIcon id={e.network} size="xs" />
                      {e.time}
                    </span>
                    <span className={`slot-status${e.published ? " is-published" : ""}`}>
                      {e.published ? <Icon name="check" /> : <Icon name="clock" />}
                      {e.published ? labels.published : labels.scheduled}
                    </span>
                  </span>
                ))}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
