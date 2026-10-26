"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/next";

/**
 * Vercel Web Analytics: page views, plus a "contact_click" (the previous site's event name) for every link marked
 * `data-contact`, with the page's language (read at the click, since the 404 page picks it in the browser) and the
 * link's place. Addresses are sent without query or hash.
 */
export function SiteAnalytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[data-contact]") : null;
      if (link) track("contact_click", { locale: document.documentElement.lang, placement: link.dataset.contact ?? "" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return <Analytics mode="production" beforeSend={(event) => ({ ...event, url: event.url.split(/[?#]/)[0] })} />;
}
