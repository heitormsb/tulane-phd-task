"use client";

import { useState } from "react";
import type { Format, Layer } from "@/content/library";
import { Icon } from "../icons";
import { PostImage } from "../post-image";

const FORMATS: Format[] = ["1x1", "4x5", "9x16"];
const LAYERS: Layer[] = ["title", "art", "date", "price", "background"];
const KIND: Record<Layer, "text" | "image" | "background"> = {
  title: "text",
  art: "image",
  date: "text",
  price: "text",
  background: "background",
};

type Labels = {
  canvas: string;
  formats: string;
  layersTitle: string;
  layers: Record<Layer, string>;
  tools: { text: string[]; image: string[]; background: string[] };
  saved: string;
  captionLabel: string;
  caption: string;
  captionTags: string;
};

/** A small copy of the editor: switch the format, pick a layer, and the selection follows. */
export function EditorDemo({
  postId,
  alt,
  boxes,
  labels,
}: {
  postId: string;
  alt: string;
  boxes: Record<Format, Record<Layer, [number, number, number, number]>>;
  labels: Labels;
}) {
  const [format, setFormat] = useState<Format>("4x5");
  const [layer, setLayer] = useState<Layer>("title");
  const [x, y, w, h] = boxes[format][layer];
  const tools = labels.tools[KIND[layer]];

  return (
    <div className="editor" role="group" aria-label={labels.canvas}>
      <div className="editor-bar">
        <div className="segmented" role="radiogroup" aria-label={labels.formats}>
          {FORMATS.map((f) => (
            <button key={f} type="button" role="radio" aria-checked={f === format} onClick={() => setFormat(f)}>
              {f.replace("x", ":")}
            </button>
          ))}
        </div>
        <span className="editor-saved">
          <Icon name="check" />
          {labels.saved}
        </span>
        <span className="editor-undo" aria-hidden="true">
          <Icon name="undo" />
        </span>
      </div>
      <div className="editor-body">
        <div className="editor-layers">
          <p className="editor-layers-title">
            <Icon name="layers" />
            {labels.layersTitle}
          </p>
          <ul>
            {LAYERS.map((l) => (
              <li key={l}>
                <button type="button" aria-pressed={l === layer} onClick={() => setLayer(l)}>
                  <span className={`layer-glyph layer-${KIND[l]}`} aria-hidden="true" />
                  {labels.layers[l]}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="editor-canvas">
          <div className={`canvas-art canvas-${format}`} key={format}>
            <PostImage id={postId} format={format} alt={alt} />
            <div className="selection" style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }} aria-hidden="true">
              <span className="handle" />
              <span className="handle" />
              <span className="handle" />
              <span className="handle" />
              <span className={`toolbar${y < 12 ? " is-inside" : ""}`}>
                {tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </span>
            </div>
          </div>
        </div>
        <div className="editor-caption">
          <p className="editor-layers-title">{labels.captionLabel}</p>
          <p className="editor-caption-text">{labels.caption}</p>
          <p className="editor-caption-tags">{labels.captionTags}</p>
        </div>
      </div>
    </div>
  );
}
