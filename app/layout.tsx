import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tessila.com'),
  title: {
    default: 'Tessila | Data fabric federado para saúde',
    template: '%s | Tessila',
  },
  description: 'A Tessila é um data fabric federado para saúde que consulta dados em hospitais e outras fontes sem centralizá-los, com governança e rastreabilidade.',
  applicationName: 'Tessila',
  creator: 'Tessila',
  publisher: 'Tessila',
  category: 'Tecnologia para saúde',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
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
    locale: 'pt_BR',
    url: '/',
    siteName: 'Tessila',
    title: 'Tessila | Data fabric federado para saúde',
    description: 'Consulte dados de hospitais e outras fontes onde eles já estão. Cada instituição mantém o controle e nenhuma base precisa ser centralizada.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Tessila — Uma visão única dos dados, sem mover nenhuma peça.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tessila | Data fabric federado para saúde',
    description: 'Consulta federada de dados para instituições de saúde, sem centralizar nenhuma base.',
    images: ['/og.png'],
  },
};

const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://tessila.com/#organization',
      name: 'Tessila',
      url: 'https://tessila.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tessila.com/assets/tessila-symbol.svg',
      },
      image: 'https://tessila.com/og.png',
      email: 'contato@tessila.com',
      description: 'Empresa de tecnologia que oferece uma camada federada para consultar dados de saúde onde eles já estão, preservando governança e controle institucional.',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'contato@tessila.com',
        contactType: 'comercial',
        availableLanguage: ['Portuguese'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://tessila.com/#website',
      url: 'https://tessila.com/',
      name: 'Tessila',
      description: 'Data fabric federado para saúde.',
      inLanguage: 'pt-BR',
      publisher: { '@id': 'https://tessila.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://tessila.com/#software',
      name: 'Tessila',
      url: 'https://tessila.com/',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Data fabric federado para saúde',
      operatingSystem: 'Web',
      inLanguage: 'pt-BR',
      description: 'Plataforma de consulta federada que conecta dados de instituições de saúde e outras fontes autorizadas sem criar uma base centralizada.',
      provider: { '@id': 'https://tessila.com/#organization' },
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }} />
        {children}
      </body>
    </html>
  );
}
