import type { MetadataRoute } from "next";
import { en } from "@/copy/en";
import type { Page } from "@/copy/metadata";
import { pt } from "@/copy/pt";
import { SITE_URL } from "@/copy/site";

const PAGES: Page[] = ["home", "pricing"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((page) =>
    [pt, en].map((copy) => ({
      url: `${SITE_URL}${copy.paths[page]}`,
      changeFrequency: "monthly" as const,
      priority: page === "home" ? 1 : 0.8,
      alternates: { languages: { "pt-BR": `${SITE_URL}${pt.paths[page]}`, en: `${SITE_URL}${en.paths[page]}` } },
    })),
  );
}
