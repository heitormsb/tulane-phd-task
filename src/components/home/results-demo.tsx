"use client";

import { useId, useState } from "react";
import type { Copy } from "@/copy/pt";
import { Icon } from "../icons";
import { PostImage } from "../post-image";
import { useInView } from "./use-in-view";

type GoalId = "audience" | "trust" | "demand";

// The chart's drawing box; the SVG scales to its column.
const W = 640;
const H = 250;
const PAD = { left: 48, right: 18, top: 16, bottom: 30 };

/** Clean axis ticks: about four steps of 1, 2, 2.5 or 5 times a power of ten. */
function ticks(min: number, max: number) {
  const raw = (max - min) / 3;
  const power = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * power).find((s) => s >= raw) ?? raw;
  const low = Math.floor(min / step) * step;
  const high = Math.ceil(max / step) * step;
  const out: number[] = [];
  for (let v = low; v <= high + step / 2; v += step) out.push(v);
  return out;
}

/** The results panel: pick the account's goal and the chart, tiles and finding follow it. */
export function ResultsDemo({
  lang,
  series,
  posts,
  t,
  examples,
}: {
  lang: string;
  series: Record<GoalId, number[]>;
  posts: { id: string; alt: string }[];
  t: Copy["results"];
  examples: string;
}) {
  const [goalIndex, setGoalIndex] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [ref, view] = useInView<HTMLDivElement>(0.3);
  const base = useId();
  const goal = t.goals[goalIndex];
  const values = series[goal.id as GoalId];
  const number = new Intl.NumberFormat(lang);

  const axis = ticks(Math.min(...values), Math.max(...values));
  const [lo, hi] = [axis[0], axis[axis.length - 1]];
  const x = (i: number) => PAD.left + (i * (W - PAD.left - PAD.right)) / (values.length - 1);
  const y = (v: number) => PAD.top + ((hi - v) * (H - PAD.top - PAD.bottom)) / (hi - lo);
  const line = values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(values.length - 1)} ${H - PAD.bottom} L${x(0)} ${H - PAD.bottom} Z`;

  function onMove(event: React.PointerEvent<SVGRectElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const position = ((event.clientX - box.left) / box.width) * (W - PAD.left - PAD.right);
    const step = (W - PAD.left - PAD.right) / (values.length - 1);
    setHover(Math.max(0, Math.min(values.length - 1, Math.round(position / step))));
  }

  return (
    <div className={`results-demo${view.measured && !view.seen ? " is-waiting" : ""}`} ref={ref}>
      <div className="results-head">
        <div className="section-intro">
          <h2 id="results-title" className="heading">
            {t.title}
          </h2>
          <p className="lead">{t.lead}</p>
        </div>
        <div className="goal-picker">
          <p className="app-label">{t.goalsLabel}</p>
          <div className="segmented segmented-night" role="radiogroup" aria-label={t.goalsLabel}>
            {t.goals.map((g, i) => (
              <button key={g.id} type="button" role="radio" aria-checked={i === goalIndex} onClick={() => setGoalIndex(i)}>
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="results-grid">
        <figure className="panel chart-panel">
          <figcaption className="chart-head">
            <span className="chart-title">{goal.metric}</span>
            <span className="chart-sub">
              {t.account}
              <span className="examples-tag">{examples}</span>
            </span>
          </figcaption>
          <div className="chart-box">
            <svg className="chart" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" key={goal.id}>
              {axis.map((v) => (
                <g key={v} className="tick">
                  <line x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} />
                  <text x={PAD.left - 10} y={y(v)} dy="0.32em" textAnchor="end">
                    {number.format(v)}
                  </text>
                </g>
              ))}
              {values.map((_, i) => (
                <text key={i} className="tick-x" x={x(i)} y={H - 8} textAnchor="middle">
                  {i + 1}
                </text>
              ))}
              <path className="area" d={area} />
              <path className="line" d={line} pathLength={1} />
              {hover !== null ? <line className="crosshair" x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={H - PAD.bottom} /> : null}
              {values.map((v, i) => (
                <circle key={i} className={`dot${hover === i ? " is-active" : ""}`} cx={x(i)} cy={y(v)} r={hover === i ? 6 : 4.5} />
              ))}
              <rect
                className="hit"
                x={PAD.left}
                y={PAD.top}
                width={W - PAD.left - PAD.right}
                height={H - PAD.top - PAD.bottom}
                onPointerMove={onMove}
                onPointerLeave={() => setHover(null)}
              />
            </svg>
            {hover !== null ? (
              <div
                className="chart-tip"
                style={{ left: `${(x(hover) / W) * 100}%`, top: `${(y(values[hover]) / H) * 100}%` }}
                aria-hidden="true"
              >
                <PostImage id={posts[hover].id} alt="" />
                <span>
                  <strong>{number.format(values[hover])}</strong>
                  {t.week.replace("{n}", String(hover + 1))}
                </span>
              </div>
            ) : null}
          </div>
          <ol className="chart-posts" aria-hidden="true">
            {posts.map((post, i) => (
              <li key={post.id} style={{ left: `${(x(i) / W) * 100}%` }} className={hover === i ? "is-active" : undefined}>
                <PostImage id={post.id} alt="" />
              </li>
            ))}
          </ol>
          <table className="sr-only" id={`${base}-table`}>
            <caption>{`${goal.metric}, ${t.account}`}</caption>
            <tbody>
              {values.map((v, i) => (
                <tr key={i}>
                  <th scope="row">{t.week.replace("{n}", String(i + 1))}</th>
                  <td>{number.format(v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>

        <div className="tiles" key={goal.id}>
          {goal.tiles.map((tile) => (
            <div key={tile.label} className="panel tile">
              <span className="tile-label">{tile.label}</span>
              <span className="tile-value">{tile.value}</span>
              <span className="tile-note">{tile.note}</span>
            </div>
          ))}
          <div className="panel tile is-missing">
            <span className="tile-label">{t.missing.label}</span>
            <span className="tile-value">{t.missing.value}</span>
            <span className="tile-note">{t.missing.note}</span>
          </div>
        </div>

        <div className="panel insight" key={`insight-${goal.id}`}>
          <p className="panel-label">
            <Icon name="sparkle" />
            {t.insightLabel}
          </p>
          <p className="insight-text">{goal.insight}</p>
          <div className="meter">
            <span className="meter-label">{t.certainty}</span>
            <span className="meter-track">
              <span className="meter-fill" style={{ "--value": goal.certainty / 100 } as React.CSSProperties} />
            </span>
            <span className="meter-value">{`${goal.certainty}%`}</span>
          </div>
        </div>

        <div className="panel test">
          <p className="panel-label">{t.test.label}</p>
          <p className="panel-title">{t.test.title}</p>
          <p className="panel-text">{t.test.text}</p>
          <div className="ab" aria-hidden="true">
            <span className="ab-a">
              <PostImage id={posts[1].id} alt="" />
              <PostImage id={posts[2].id} alt="" />
              <PostImage id={posts[3].id} alt="" />
            </span>
            <span className="ab-vs">vs</span>
            <span className="ab-b">
              <PostImage id={posts[5].id} alt="" />
            </span>
          </div>
        </div>

        <div className="panel report">
          <p className="panel-label">
            <Icon name="clock" />
            {t.report.label}
          </p>
          <p className="panel-title">{t.report.title}</p>
          <p className="panel-text">{t.report.text}</p>
        </div>
      </div>
    </div>
  );
}
