import type { ReactNode } from "react";
import { SiteAnalytics } from "./analytics";
import { display, text } from "./fonts";
import { STONE_PATHS } from "./stones";

/** The four stones as clip paths, so any element can take a stone's shape with `clip-path: url(#stone-N)`. */
function StoneDefs() {
  return (
    <svg className="stone-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        {STONE_PATHS.map((stone, i) => (
          <clipPath key={i} id={`stone-${i}`} clipPathUnits="objectBoundingBox">
            <path d={stone.d} />
          </clipPath>
        ))}
      </defs>
    </svg>
  );
}

/** The html and body shared by both languages' root layouts. */
export function Document({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <html lang={lang} className={`${display.variable} ${text.variable}`}>
      <body>
        <StoneDefs />
        {children}
        {/* only the live site counts; local runs and preview deployments don't */}
        {process.env.VERCEL_ENV === "production" ? <SiteAnalytics lang={lang} /> : null}
      </body>
    </html>
  );
}
