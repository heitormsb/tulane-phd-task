"use client";

import { LANGUAGE_COOKIE } from "@/copy/site";

/** A link to the other language that remembers the choice, so the home page stops following the browser's language. */
export function LanguageLink({
  href,
  lang,
  className,
  children,
}: {
  href: string;
  lang: string;
  className?: string;
  children: React.ReactNode;
}) {
  function remember() {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${LANGUAGE_COOKIE}=${lang}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  }
  return (
    <a className={className} href={href} hrefLang={lang} lang={lang} onClick={remember}>
      {children}
    </a>
  );
}
