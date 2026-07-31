import { Metadata } from 'next';
import Script from 'next/script';
import { headers } from 'next/headers';
import { IBM_Plex_Mono } from 'next/font/google';
import './globals.scss';

import 'lineicons/web-font/lineicons.css';
import { SiteChrome } from '@/components/site-chrome';
import { CrawlModeProvider } from '@/components/ui/crawl-mode';
import { JsonLd } from '@/components/seo/json-ld';
import { isBotUserAgent } from '@/lib/is-bot';
import {
  DEFAULT_OG_IMAGE,
  SITE_URL,
  indexFollowRobots,
  personJsonLd,
  websiteJsonLd,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: {
    default: 'Arvind Narayan — Staff AI/ML Engineer',
    template: '%s',
  },
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
  authors: [{ name: 'Arvind Narayan', url: SITE_URL }],
  creator: 'Arvind Narayan',
  metadataBase: new URL(SITE_URL),
  robots: indexFollowRobots,
  openGraph: {
    siteName: 'arwwwind',
    locale: 'en_US',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Arvind Narayan — Staff ML & AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@arwwwind',
    images: [DEFAULT_OG_IMAGE],
  },
};

const IBM = IBM_Plex_Mono({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-mono',
});

const siteJsonLd = [personJsonLd(), websiteJsonLd()];

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
          <JsonLd data={siteJsonLd} />
          <SiteChrome isBot={isBot}>{children}</SiteChrome>
        </CrawlModeProvider>
      </body>
    </html>
  );
}
