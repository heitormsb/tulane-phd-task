import type { Metadata } from 'next';
import LocalizedNotFound from '../components/LocalizedNotFound';
import { siteCopy } from '../i18n';

const copy = siteCopy.en.notFound;

export const metadata: Metadata = {
  title: { absolute: `${copy.metaTitle} | Tessila` },
  description: copy.metaDescription,
  robots: { index: false, follow: true },
};

export default function EnglishNotFound() {
  return <LocalizedNotFound locale="en" />;
}
