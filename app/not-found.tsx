import type { Metadata } from 'next';
import LocalizedNotFound from './components/LocalizedNotFound';
import { siteCopy } from './i18n';

const copy = siteCopy['pt-BR'].notFound;

export const metadata: Metadata = {
  title: copy.metaTitle,
  description: copy.metaDescription,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <LocalizedNotFound locale="pt-BR" />;
}
