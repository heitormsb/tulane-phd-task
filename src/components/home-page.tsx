import type { Copy } from "@/copy/pt";
import { Closing, SiteFooter } from "./closing";
import { Approval } from "./home/approval";
import { Creation } from "./home/creation";
import { Editing } from "./home/editing";
import { Hero } from "./home/hero";
import { Networks } from "./home/networks";
import { Results } from "./home/results";
import { SiteHeader } from "./site-header";

/** The home page follows a post's life: made, shown on every network, adjusted, approved, measured. */
export function HomePage({ copy }: { copy: Copy }) {
  return (
    <>
      <SiteHeader copy={copy} page="home" />
      <main id={copy.ids.main}>
        <Hero copy={copy} />
        <Networks copy={copy} />
        <Creation copy={copy} />
        <Editing copy={copy} />
        <Approval copy={copy} />
        <Results copy={copy} />
        <Closing copy={copy} />
      </main>
      <SiteFooter copy={copy} page="home" />
    </>
  );
}
