import type { Metadata } from "next";
import { Document } from "@/components/document";
import { NotFoundPage } from "@/components/not-found-page";
import { en } from "@/copy/en";
import { pt } from "@/copy/pt";
import { LANGUAGE_COOKIE } from "@/copy/site";
import "./globals.css";

// Next streams the title in after the page, so it can't follow the language picked below; the code reads in both.
export const metadata: Metadata = { title: "404 · Tessila", robots: { index: false } };

// One static page answers every unknown address, so it carries both languages and this picks one before the page
// paints: /en addresses are English; elsewhere the language picked on the site wins, then the browser's (as in proxy.ts).
const PICK_LANGUAGE = `(function () {
  try {
    var path = location.pathname;
    var picked = (document.cookie.match(/(?:^|; )${LANGUAGE_COOKIE}=([^;]*)/) || [])[1];
    var english = path === "/en" || path.indexOf("/en/") === 0 || (picked ? picked === "en" : !/^pt/i.test(navigator.language || "pt"));
    if (english) document.documentElement.lang = "en";
  } catch (e) {}
})();`;

/** Any address that matches no page, in the visitor's language. */
export default function GlobalNotFound() {
  return (
    <Document lang={pt.lang}>
      <script dangerouslySetInnerHTML={{ __html: PICK_LANGUAGE }} />
      <NotFoundPage copy={pt} />
      <NotFoundPage copy={en} />
    </Document>
  );
}
