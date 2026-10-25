import { NextResponse, type NextRequest } from "next/server";
import { LANGUAGE_COOKIE } from "@/copy/site";

// Search engines always get the address they asked for, so each language is indexed at its own page.
const CRAWLER = /(bot|crawler|spider|crawling|slurp)/i;

/** The browser's first language, by weight: Portuguese stays on the Portuguese home, anything else reads English. */
function browserLanguage(header: string | null) {
  if (!header) return "pt-BR";
  const first = header
    .split(",")
    .map((entry) => {
      const [tag, ...params] = entry.trim().split(";");
      const q = params.find((param) => param.trim().startsWith("q="));
      return { tag: tag.toLowerCase(), q: q ? Number(q.split("=")[1]) || 0 : 1 };
    })
    .sort((a, b) => b.q - a.q)[0]?.tag;
  return !first || first === "*" || first.startsWith("pt") ? "pt-BR" : "en";
}

/** The home page in the visitor's language: a language picked on the site wins, then the browser's. */
export function proxy(request: NextRequest) {
  if (CRAWLER.test(request.headers.get("user-agent") ?? "")) return NextResponse.next();
  const picked = request.cookies.get(LANGUAGE_COOKIE)?.value;
  const language = picked === "pt-BR" || picked === "en" ? picked : browserLanguage(request.headers.get("accept-language"));
  if (language === "pt-BR") return NextResponse.next();
  const response = NextResponse.redirect(new URL("/en", request.url));
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = { matcher: "/" };
