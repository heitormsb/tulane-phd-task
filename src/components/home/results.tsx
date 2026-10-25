import type { Copy } from "@/copy/pt";
import { RESULTS_POSTS, RESULTS_SERIES } from "@/content/library";
import { postAlt } from "../post-image";
import { ResultsDemo } from "./results-demo";

export function Results({ copy }: { copy: Copy }) {
  const t = copy.results;
  return (
    <section className="sheet sheet-night results section" id={copy.ids.results} aria-labelledby="results-title">
      <div className="wrap">
        <ResultsDemo
          lang={copy.lang}
          series={RESULTS_SERIES}
          posts={RESULTS_POSTS.map((id) => ({ id, alt: postAlt(copy, { id, brand: "pulso" }) }))}
          t={t}
          examples={copy.examples}
        />
      </div>
    </section>
  );
}
