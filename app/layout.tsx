import { headers } from 'next/headers';
import './globals.css';
import { defaultLocale, isLocale, localeHeaderName } from './i18n';
import { createLandingMetadata } from './i18n/metadata';

export const metadata = createLandingMetadata('pt-BR');

const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.tessila.com/#organization',
      name: 'Tessila',
      url: 'https://www.tessila.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.tessila.com/assets/tessila-symbol.svg',
      },
      image: 'https://www.tessila.com/og.png',
      email: 'contato@tessila.com',
      description: 'Empresa de tecnologia que oferece uma camada federada para consultar dados de saúde onde eles já estão, preservando governança e controle institucional.',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'contato@tessila.com',
        contactType: 'comercial',
        availableLanguage: ['Portuguese', 'English'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.tessila.com/#website',
      url: 'https://www.tessila.com/',
      name: 'Tessila',
      description: 'Data fabric federado para saúde.',
      inLanguage: ['pt-BR', 'en'],
      publisher: { '@id': 'https://www.tessila.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://www.tessila.com/#software',
      name: 'Tessila',
      url: 'https://www.tessila.com/',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Data fabric federado para saúde',
      operatingSystem: 'Web',
      inLanguage: ['pt-BR', 'en'],
      description: 'Plataforma de consulta federada que conecta dados de instituições de saúde e outras fontes autorizadas sem criar uma base centralizada.',
      provider: { '@id': 'https://www.tessila.com/#organization' },
      audience: {
        '@type': 'Audience',
        audienceType: 'Instituições de saúde, redes hospitalares e centros de pesquisa',
      },
      featureList: [
        'Consulta federada de dados',
        'Dados permanecem na origem',
        'Políticas de acesso locais',
        'Resultados consolidados',
        'Rastreabilidade de consultas',
      ],
    },
  ],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get(localeHeaderName) ?? undefined;
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return (
    <html lang={locale}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }} />
        {children}
      </body>
    </html>
  );
}
