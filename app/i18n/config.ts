import type { Locale } from './types';

export const defaultLocale: Locale = 'pt-BR';
export const localeCookieName = 'tessila-language';
export const localeHeaderName = 'x-tessila-locale';
export const localeRoutes: Record<Locale, string> = {
  'pt-BR': '/',
  en: '/en',
};

export function isLocale(value: string | undefined): value is Locale {
  return value === 'pt-BR' || value === 'en';
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : defaultLocale;
}

export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;

  const preferredLanguage = header
    .split(',')
    .map((entry) => {
      const [language, ...parameters] = entry.trim().split(';');
      const quality = parameters.find((parameter) => parameter.trim().startsWith('q='));
      return { language: language.toLowerCase(), quality: quality ? Number(quality.split('=')[1]) || 0 : 1 };
    })
    .sort((left, right) => right.quality - left.quality)[0]?.language;

  return preferredLanguage?.startsWith('pt') ? 'pt-BR' : 'en';
}
