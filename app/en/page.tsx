import LandingPage from '../LandingPage';
import { createLandingMetadata } from '../i18n/metadata';

export const metadata = createLandingMetadata('en');

export default function EnglishPage() {
  return <LandingPage locale="en" />;
}
