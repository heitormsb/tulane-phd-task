import type { Copy } from "@/copy/pt";
import { EDITOR_BOXES, EDITOR_POST } from "@/content/library";
import { postAlt } from "../post-image";
import { EditorDemo } from "./editor-demo";

export function Editing({ copy }: { copy: Copy }) {
  const t = copy.edit;
  return (
    <section className="sheet sheet-lavender editing section" id={copy.ids.edit} aria-labelledby="edit-title">
      <div className="wrap edit-grid">
        <div className="edit-text">
          <h2 id="edit-title" className="heading">
            {t.title}
          </h2>
          <p className="lead">{t.lead}</p>
          <ul className="stone-list">
            {t.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <EditorDemo
          postId={EDITOR_POST.id}
          alt={postAlt(copy, EDITOR_POST)}
          boxes={EDITOR_BOXES}
          labels={{
            canvas: t.canvasLabel,
            formats: t.formatsLabel,
            layersTitle: t.layersLabel,
            layers: t.layers,
            tools: t.tools,
            saved: t.saved,
            captionLabel: t.captionLabel,
            caption: t.caption,
            captionTags: t.captionTags,
          }}
        />
      </div>
    </section>
  );
}
