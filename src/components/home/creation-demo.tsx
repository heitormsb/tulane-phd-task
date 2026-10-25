"use client";

import { useId, useState } from "react";
import type { Goal } from "@/content/library";
import { Icon } from "../icons";
import { PostImage } from "../post-image";

export type CreationSet = {
  brand: string;
  name: string;
  about: string;
  posts: { id: string; goal: Goal; brief: string; sameAsFirst: boolean; alt: string }[];
};

type Labels = {
  tabs: string;
  posts: string;
  brief: string;
  goal: string;
  goals: Record<Goal, string>;
  sameRequest: string;
  button: string;
  result: string;
  variety: string;
  examples: string;
};

/** Pick an example brand, then one of its posts: the request and the goal behind that post show on the left. */
export function CreationDemo({ sets, lang, labels }: { sets: CreationSet[]; lang: "pt" | "en"; labels: Labels }) {
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState(0);
  const base = useId();
  const set = sets[active];
  const post = set.posts[picked];

  function choose(index: number) {
    setActive(index);
    setPicked(0);
  }

  // Arrow keys move between tabs, as tab lists do.
  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + sets.length) % sets.length;
    choose(next);
    document.getElementById(`${base}-tab-${next}`)?.focus();
  }

  return (
    <div className="creator">
      <div className="brand-tabs" role="tablist" aria-label={labels.tabs} onKeyDown={onKeyDown}>
        {sets.map((s, i) => (
          <button
            key={s.brand}
            id={`${base}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`${base}-panel`}
            tabIndex={i === active ? 0 : -1}
            className="brand-tab"
            onClick={() => choose(i)}
          >
            {s.name}
          </button>
        ))}
        <span className="brand-tabs-note">{labels.examples}</span>
      </div>

      <div className="creator-stage" role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${active}`}>
        <div className="creator-box" key={`box-${set.brand}-${picked}`} aria-live="polite">
          <div className="creator-who">
            <span className="who-avatar" aria-hidden="true">
              {set.name.charAt(0)}
            </span>
            <span>
              <strong>{set.name}</strong>
              <span>{set.about}</span>
            </span>
          </div>
          <p className="creator-label">{labels.brief}</p>
          <p className="creator-brief">{post.brief}</p>
          {post.sameAsFirst ? <p className="creator-same">{labels.sameRequest}</p> : null}
          <div className="creator-foot">
            <span className={`goal-chip goal-${post.goal}`}>
              <span className="sr-only">{labels.goal} </span>
              {labels.goals[post.goal]}
            </span>
            <span className="fake-button" aria-hidden="true">
              <Icon name="sparkle" />
              {labels.button}
            </span>
          </div>
          <svg className="creator-arrow" viewBox="0 0 120 60" aria-hidden="true" focusable="false">
            <path d="M4 50 C 40 52, 70 40, 108 12" pathLength={1} />
            <path d="M94 10 L 109 11 L 104 25" pathLength={1} />
          </svg>
        </div>

        <ul className="fan" key={`fan-${set.brand}`} aria-label={labels.posts}>
          {set.posts.map((p, i) => (
            <li key={p.id} style={{ "--i": i } as React.CSSProperties}>
              <button type="button" className="fan-post" aria-pressed={i === picked} onClick={() => setPicked(i)}>
                <PostImage id={p.id} alt={p.alt} lang={lang} />
                <span className={`goal-chip goal-${p.goal}`}>{labels.goals[p.goal]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="fan-caption">
        <strong>{labels.result.replace("{n}", String(set.posts.length))}</strong> {labels.variety}
      </p>
    </div>
  );
}
