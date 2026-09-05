'use client';

import { localeCookieName, localeRoutes } from './config';
import type { Locale } from './types';

type LanguageSwitcherProps = {
  activeLocale: Locale;
  label: string;
  ariaLabel: string;
  switchToPortuguese: string;
  switchToEnglish: string;
};

const languageOptions = [
  { locale: 'pt-BR' as const, shortLabel: 'PT' },
  { locale: 'en' as const, shortLabel: 'EN' },
];

export default function LanguageSwitcher({
  activeLocale,
  label,
  ariaLabel,
  switchToPortuguese,
  switchToEnglish,
}: LanguageSwitcherProps) {
  function rememberLanguage(locale: Locale) {
    const secureAttribute = window.location.protocol === 'https:' ? '; Secure' : '';
    // The preference cookie lets the server keep the language selected by the visitor.
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${secureAttribute}`;
  }

  return (
    <div className="language-switcher" role="group" aria-label={ariaLabel}>
      <span className="language-switcher-label">{label}</span>
      <span className="language-options">
        {languageOptions.map((option) => {
          const isActive = option.locale === activeLocale;
          const optionAriaLabel = option.locale === 'pt-BR' ? switchToPortuguese : switchToEnglish;

          if (isActive) {
            return (
              <span className="language-option active" lang={option.locale} aria-current="true" key={option.locale}>
                {option.shortLabel}
              </span>
            );
          }

          return (
            <a
              className="language-option"
              href={localeRoutes[option.locale]}
              hrefLang={option.locale}
              lang={option.locale}
              aria-label={optionAriaLabel}
              onClick={() => rememberLanguage(option.locale)}
              key={option.locale}
            >
              {option.shortLabel}
            </a>
          );
        })}
      </span>
    </div>
  );
}
