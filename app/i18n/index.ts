import en from './messages/en';
import ptBR, { type SiteCopy } from './messages/pt-BR';
import type { Locale } from './types';

export { defaultLocale, isLocale, localeCookieName, localeFromAcceptLanguage, localeFromPathname, localeHeaderName, localeRoutes } from './config';
export type { Locale } from './types';
export type { SiteCopy } from './messages/pt-BR';

export const siteCopy: Record<Locale, SiteCopy> = {
  'pt-BR': ptBR,
  en,
};
