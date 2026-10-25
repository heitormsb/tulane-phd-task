import type { Metadata } from "next";
import { Document } from "@/components/document";
import { Logo } from "@/components/site-header";
import { en } from "@/copy/en";
import { pt } from "@/copy/pt";
import "./globals.css";

export const metadata: Metadata = { title: `${pt.notFound.title} · Tessila`, robots: { index: false } };

/** Any address that matches no page, in both languages. */
export default function GlobalNotFound() {
  return (
    <Document lang="pt-BR">
      <main className="not-found wrap">
        <a href={pt.paths.home} aria-label={pt.nav.home}>
          <Logo />
        </a>
        <div className="not-found-body">
          <h1 className="heading">{pt.notFound.title}</h1>
          <a className="text-link" href={pt.paths.home}>
            {pt.notFound.home}
          </a>
          <p className="heading not-found-other" lang="en">
            {en.notFound.title}
          </p>
          <a className="text-link" href={en.paths.home} lang="en">
            {en.notFound.home}
          </a>
        </div>
      </main>
    </Document>
  );
}
