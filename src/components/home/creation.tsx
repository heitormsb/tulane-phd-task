import type { Copy } from "@/copy/pt";
import { BRAND_NAMES, CREATION } from "@/content/library";
import { CreationDemo, type CreationSet } from "./creation-demo";

/** How posts are made: one brand, six posts with their own requests and goals, in one identity. */
export function Creation({ copy }: { copy: Copy }) {
  const t = copy.create;
  const sets: CreationSet[] = CREATION.map(({ brand, posts }) => {
    const { about, briefs } = t.sets[brand];
    let next = 0;
    return {
      brand,
      name: BRAND_NAMES[brand],
      about,
      posts: posts.map((post) => {
        const brief = post.sameAsFirst ? briefs[0] : briefs[next++];
        return {
          id: post.id,
          goal: post.goal,
          brief,
          sameAsFirst: Boolean(post.sameAsFirst),
          alt: `${BRAND_NAMES[brand]}: ${brief}`,
        };
      }),
    };
  });
  return (
    <section className="creation section" id={copy.ids.create} aria-labelledby="create-title">
      <div className="wrap">
        <div className="section-intro creation-intro">
          <h2 id="create-title" className="heading">
            {t.title}
          </h2>
          <div>
            <p className="lead">{t.lead}</p>
            <p className="sources">
              <span>{t.sourcesLabel}</span>
              {t.sources.map((source) => (
                <span key={source} className="source-chip">
                  {source}
                </span>
              ))}
            </p>
          </div>
        </div>
        <CreationDemo
          sets={sets}
          lang={copy.postsLang}
          labels={{
            tabs: t.tabsLabel,
            posts: t.postsLabel,
            brief: t.briefLabel,
            goal: t.goalLabel,
            goals: t.goals,
            sameRequest: t.sameRequest,
            button: t.button,
            result: t.resultLabel,
            variety: t.variety,
            examples: copy.examples,
          }}
        />
      </div>
    </section>
  );
}
