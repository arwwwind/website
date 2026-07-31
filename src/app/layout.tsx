import { Metadata } from 'next';
import Script from 'next/script';
import { headers } from 'next/headers';
import { IBM_Plex_Mono } from 'next/font/google';
import './globals.scss';

import 'lineicons/web-font/lineicons.css';
import { SiteChrome } from '@/components/site-chrome';
import { CrawlModeProvider } from '@/components/ui/crawl-mode';
import { isBotUserAgent } from '@/lib/is-bot';

export const metadata: Metadata = {
  title: 'Arvind Narayan — Staff AI/ML Engineer',
  description:
    'Staff AI/ML Engineer with 9+ years at Yahoo, upGrad, Egen.ai, and GATC Health. Specializing in hybrid RAG systems, GNNs for molecular ML, clinical analytics, and LLM infrastructure at scale. Python, PyTorch, AWS, SageMaker.',
  keywords: [
    'Arvind Narayan',
    'arwwwind',
    'ML Engineer',
    'AI Engineer',
    'Machine Learning',
    'LLM Engineer',
    'Data Engineer',
    'Python',
    'PyTorch',
    'AWS SageMaker',
    'GraphQL',
    'Staff Engineer',
    'AI Systems',
    'Foundation Models',
  ],
  authors: [{ name: 'Arvind Narayan', url: 'https://arwwwind.com' }],
  creator: 'Arvind Narayan',
  metadataBase: new URL('https://arwwwind.com'),
  alternates: {
    canonical: 'https://arwwwind.com',
  },
  openGraph: {
    type: 'profile',
    url: 'https://arwwwind.com',
    title: 'Arvind Narayan — Staff AI/ML Engineer',
    description:
      'Staff ML & AI Engineer. Building production ML systems, LLM pipelines, and distributed data infrastructure at scale.',
    images: [
      {
        url: 'https://arwwwind.com/cover.png',
        width: 1200,
        height: 630,
        alt: 'Arvind Narayan — Staff ML & AI Engineer',
      },
    ],
    siteName: 'arwwwind',
    firstName: 'Arvind',
    lastName: 'Narayan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arvind Narayan — Staff AI/ML Engineer',
    description:
      'Staff ML & AI Engineer. Building production ML systems, LLM pipelines, and distributed data infrastructure.',
    images: ['https://arwwwind.com/cover.png'],
  },
};

const IBM = IBM_Plex_Mono({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-mono',
});

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://arwwwind.com/#person',
    name: 'Arvind Narayan',
    alternateName: 'arwwwind',
    url: 'https://arwwwind.com',
    email: 'hi@arwwwind.com',
    jobTitle: 'Staff AI/ML Engineer',
    description:
      'Staff AI/ML Engineer with 9+ years of experience building production ML systems, LLM pipelines, RAG platforms, and distributed data infrastructure. Currently at GATC Health.',
    worksFor: {
      '@type': 'Organization',
      name: 'GATC Health',
      url: 'https://gatchealth.com',
    },
    knowsAbout: [
      'Machine Learning',
      'Artificial Intelligence',
      'Large Language Models',
      'Retrieval-Augmented Generation',
      'Graph Neural Networks',
      'MLOps',
      'Data Engineering',
      'Python',
      'PyTorch',
      'scikit-learn',
      'AWS SageMaker',
      'GraphQL',
      'PostgreSQL',
      'Redis',
      'MongoDB',
      'Foundation Models',
      'Molecular Machine Learning',
      'Clinical Analytics',
    ],
    sameAs: [
      'https://www.linkedin.com/in/arwwwind/',
      'https://github.com/arwwwind',
    ],
    image: {
      '@type': 'ImageObject',
      url: 'https://arwwwind.com/avatar.png',
      width: 320,
      height: 320,
    },
    alumniOf: [
      { '@type': 'Organization', name: 'Egen.ai', url: 'https://egen.ai' },
      {
        '@type': 'Organization',
        name: 'Yahoo',
        url: 'https://www.advertising.yahooinc.com/',
      },
      { '@type': 'Organization', name: 'upGrad', url: 'https://www.upgrad.com' },
      { '@type': 'Organization', name: 'Fulfil.io', url: 'https://fulfil.io' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://arwwwind.com/#website',
    url: 'https://arwwwind.com',
    name: 'Arvind Narayan — Staff AI/ML Engineer',
    description:
      'Portfolio of Arvind Narayan, Staff AI/ML Engineer specializing in RAG systems, GNNs, LLM infrastructure, and production ML.',
    publisher: {
      '@id': 'https://arwwwind.com/#person',
    },
    inLanguage: 'en-US',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://arwwwind.com/#profilepage',
    url: 'https://arwwwind.com',
    name: 'Arvind Narayan',
    isPartOf: { '@id': 'https://arwwwind.com/#website' },
    about: { '@id': 'https://arwwwind.com/#person' },
    mainEntity: { '@id': 'https://arwwwind.com/#person' },
    dateModified: '2026-03-27T00:00:00.000Z',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://arwwwind.com',
      },
    ],
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ua = (await headers()).get('user-agent');
  const isBot = isBotUserAgent(ua);

  return (
    <html
      lang='en'
      className={`${IBM.className} ${IBM.variable}`}
      {...(isBot ? { 'data-crawl': '1' } : {})}
    >
      <body className='dark'>
        <CrawlModeProvider isBot={isBot}>
          {!isBot && (
            <>
              <Script
                src='https://www.googletagmanager.com/gtag/js?id=G-7WLY43XFNL'
                strategy='afterInteractive'
              />
              <Script id='google-analytics' strategy='afterInteractive'>
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-7WLY43XFNL');
                `}
              </Script>
            </>
          )}
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <SiteChrome isBot={isBot}>{children}</SiteChrome>
        </CrawlModeProvider>
      </body>
    </html>
  );
}
