import { headers } from 'next/headers';
import './globals.css';
import { defaultLocale, isLocale, localeHeaderName } from './i18n';
import { createLandingMetadata } from './i18n/metadata';
import ConversionAnalytics from './components/landing/ConversionAnalytics';

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
      description: 'Tecnologia para conectar, organizar e compartilhar dados de saúde para análise e pesquisa.',
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
      description: 'Dados para análise e pesquisa em saúde.',
      inLanguage: ['pt-BR', 'en'],
      publisher: { '@id': 'https://www.tessila.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://www.tessila.com/#software',
      name: 'Tessila',
      url: 'https://www.tessila.com/',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Dados para análise e pesquisa em saúde',
      operatingSystem: 'Web',
      inLanguage: ['pt-BR', 'en'],
      description: 'Plataforma para conectar informações de diferentes sistemas, organizar dados de saúde e compartilhá-los com equipes autorizadas para análise e pesquisa.',
      provider: { '@id': 'https://www.tessila.com/#organization' },
      audience: {
        '@type': 'Audience',
        audienceType: 'Hospitais, clínicas, laboratórios, gestores públicos e centros de pesquisa',
      },
      featureList: [
        'Consulta aos dados na origem por padrão',
        'Análise conjunta de informações de diferentes sistemas',
        'Organização de informações com critérios comuns',
        'Conjuntos de dados preparados apenas a pedido da equipe',
        'Preservação da versão usada em uma pesquisa',
        'Compartilhamento com destinatários autorizados e registros de acesso',
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
        <ConversionAnalytics enabled={process.env.NODE_ENV === 'production' && process.env.TESSILA_ANALYTICS_ENABLED === 'true'} locale={locale} />
      </body>
    </html>
  );
}
