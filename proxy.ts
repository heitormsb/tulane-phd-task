import { NextResponse, type NextRequest } from 'next/server';
import { isLocale, localeCookieName, localeFromAcceptLanguage, localeFromPathname, localeHeaderName, localeRoutes } from './app/i18n';

const crawlerPattern = /(bot|crawler|spider|crawling|slurp)/i;

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const routeLocale = localeFromPathname(pathname);
  const savedLocale = request.cookies.get(localeCookieName)?.value;
  const isCrawler = crawlerPattern.test(request.headers.get('user-agent') ?? '');

  if (pathname === '/' && !isCrawler) {
    const preferredLocale = isLocale(savedLocale)
      ? savedLocale
      : localeFromAcceptLanguage(request.headers.get('accept-language'));

    if (preferredLocale === 'en') {
      const redirectResponse = NextResponse.redirect(new URL(localeRoutes.en, request.url));
      redirectResponse.headers.set('Vary', 'Accept-Language, Cookie');
      return redirectResponse;
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(localeHeaderName, routeLocale);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Language', routeLocale);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|assets/|.*\\..*).*)'],
};
