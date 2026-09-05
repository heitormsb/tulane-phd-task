import type { Metadata } from 'next';
import { localeRoutes } from './config';
import { siteCopy } from './index';
import type { Locale } from './types';

const siteUrl = 'https://www.tessila.com';

export function createLandingMetadata(locale: Locale): Metadata {
  const copy = siteCopy[locale];
  const isEnglish = locale === 'en';
  const pageUrl = localeRoutes[locale];
  const socialImage = isEnglish ? '/og-en.png' : '/og.png';

  return {
    metadataBase: new URL(siteUrl),
    title: { absolute: copy.metadata.title },
    description: copy.metadata.description,
    applicationName: 'Tessila',
    creator: 'Tessila',
    publisher: 'Tessila',
    category: copy.metadata.category,
    alternates: {
      canonical: pageUrl,
      languages: { 'pt-BR': '/', en: '/en', 'x-default': '/' },
    },
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
      shortcut: '/favicon.svg',
      apple: '/favicon.svg',
    },
    manifest: isEnglish ? '/site-en.webmanifest' : '/site.webmanifest',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: isEnglish ? 'en_US' : 'pt_BR',
      alternateLocale: [isEnglish ? 'pt_BR' : 'en_US'],
      url: pageUrl,
      siteName: 'Tessila',
      title: copy.metadata.title,
      description: copy.metadata.socialDescription,
      images: [{ url: socialImage, width: 1200, height: 630, alt: copy.metadata.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.metadata.title,
      description: copy.metadata.twitterDescription,
      images: [socialImage],
    },
  };
}
