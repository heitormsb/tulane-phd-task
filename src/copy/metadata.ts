import type { Metadata } from "next";
import { en } from "./en";
import { pt, type Copy } from "./pt";

export type Page = "home" | "pricing";

/** Title, description, canonical address and the other language's address for one page. */
export function pageMetadata(copy: Copy, page: Page): Metadata {
  const title = page === "home" ? copy.meta.homeTitle : copy.meta.pricingTitle;
  const description = page === "home" ? copy.meta.homeDescription : copy.meta.pricingDescription;
  const path = copy.paths[page];
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: path,
      languages: { "pt-BR": pt.paths[page], en: en.paths[page], "x-default": pt.paths[page] },
    },
    openGraph: { type: "website", url: path, siteName: "Tessila", title, description, locale: copy.ogLocale },
    twitter: { card: "summary_large_image", title, description },
  };
}
