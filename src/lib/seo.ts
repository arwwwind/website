import type { Metadata } from 'next';

export const SITE_URL = 'https://arwwwind.com';
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PROFILE_PAGE_ID = `${SITE_URL}/#profilepage`;
export const BLOG_ID = `${SITE_URL}/blogs#blog`;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/cover.png`;
export const LOGO_URL = `${SITE_URL}/logo.png`;
export const AVATAR_URL = `${SITE_URL}/avatar.png`;

export function absoluteUrl(path = '/'): string {
  if (!path || path === '/') return SITE_URL;
  return path.startsWith('http')
    ? path
    : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Arvind Narayan',
    alternateName: 'arwwwind',
    url: SITE_URL,
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
      url: AVATAR_URL,
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
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: 'Arvind Narayan — Staff AI/ML Engineer',
    description:
      'Portfolio of Arvind Narayan, Staff AI/ML Engineer specializing in RAG systems, GNNs, LLM infrastructure, and production ML.',
    publisher: { '@id': PERSON_ID },
    inLanguage: 'en-US',
  };
}

export function profilePageJsonLd(dateModified = '2026-03-27T00:00:00.000Z') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': PROFILE_PAGE_ID,
    url: SITE_URL,
    name: 'Arvind Narayan',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
    mainEntity: { '@id': PERSON_ID },
    dateModified,
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const indexFollowRobots: NonNullable<Metadata['robots']> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

type OgImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
};

export function pageOpenGraph({
  title,
  description,
  url,
  type = 'website',
  images,
}: {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article' | 'profile';
  images?: OgImage[];
}): NonNullable<Metadata['openGraph']> {
  return {
    type,
    url,
    title,
    description,
    siteName: 'arwwwind',
    locale: 'en_US',
    images: images ?? [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };
}

export function pageTwitter({
  title,
  description,
  images,
}: {
  title: string;
  description: string;
  images?: string[];
}): NonNullable<Metadata['twitter']> {
  return {
    card: 'summary_large_image',
    title,
    description,
    creator: '@arwwwind',
    images: images ?? [DEFAULT_OG_IMAGE],
  };
}
