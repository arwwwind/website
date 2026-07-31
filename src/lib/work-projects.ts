import type { Metadata } from 'next';
import {
  PERSON_ID,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbJsonLd,
  indexFollowRobots,
  pageOpenGraph,
  pageTwitter,
} from '@/lib/seo';

export type WorkProject = {
  slug: string;
  title: string;
  tagline: string;
  metaTitle: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  tags: string[];
  year: string;
  image: string;
  gradient: string;
  accentColor: string;
};

export const workProjects: WorkProject[] = [
  {
    slug: 'cohort-ai',
    title: 'Cohort AI',
    tagline:
      'AI recruitment platform that delivers 3 pre-vetted candidates in 72 hours.',
    metaTitle: 'Cohort AI — Case Study | Arvind Narayan',
    description:
      'How I architected the AI agent pipeline behind Cohort AI — a recruitment platform using SPEC agents (Sally, Pete, Eva, Charlie) to deliver pre-vetted technical talent in 72 hours.',
    ogTitle: 'Cohort AI — AI-Driven Technical Recruitment',
    ogDescription:
      'Case study: designing the multi-agent sourcing and evaluation pipeline behind Cohort AI.',
    tags: ['AI Agents', 'NLP', 'Personalization', 'Product'],
    year: '2024',
    image: '/CohortAI – Match – Candidates – High Fit.png',
    gradient: 'from-violet-950 via-indigo-950 to-black',
    accentColor: 'text-violet-400',
  },
  {
    slug: 'tickerlens',
    title: 'TickerLens',
    tagline: 'Conversational stock screening and AI-powered market intelligence.',
    metaTitle: 'TickerLens — Case Study | Arvind Narayan',
    description:
      'How I built TickerLens — a conversational stock screening platform using NLP and predictive ML to let investors "talk" to the market instead of fighting 50-filter dashboards.',
    ogTitle: 'TickerLens — AI Stock Intelligence Platform',
    ogDescription:
      'Case study: natural language stock screening, SWOT AI summaries, and probability-based forecasting.',
    tags: ['NLP', 'Predictive Analytics', 'FinTech', 'LLMs'],
    year: '2024',
    image: '/ticker-6.png',
    gradient: 'from-emerald-950 via-teal-950 to-black',
    accentColor: 'text-emerald-400',
  },
  {
    slug: 'yuni',
    title: 'Yuni',
    tagline:
      'Private multimodal AI platform for creatives with custom model training.',
    metaTitle: 'Yuni — Case Study | Arvind Narayan',
    description:
      'How I built Yuni — a private multimodal AI platform for creatives to train custom models on their own data, generate in their own voice, and own their intellectual property.',
    ogTitle: 'Yuni — Private Multimodal AI for Creatives',
    ogDescription:
      'Case study: custom model fine-tuning, privacy-first AI, and collaborative creative workspaces.',
    tags: ['Multimodal AI', 'Fine-Tuning', 'Creative Tools', 'Privacy'],
    year: '2024',
    image: '/Yuni_Desktop_Discover_Creations.png',
    gradient: 'from-rose-950 via-pink-950 to-black',
    accentColor: 'text-rose-400',
  },
  {
    slug: 'subclarity',
    title: 'Subclarity',
    tagline:
      'B2B platform automating IT subcontractor onboarding, contracts, and accounting.',
    metaTitle: 'Subclarity — Case Study | Arvind Narayan',
    description:
      'How I engineered Subclarity — an automated B2B platform replacing manual IT subcontractor onboarding, contract management, tax calculation, and compliance tracking with a single intelligent system.',
    ogTitle: 'Subclarity — IT Subcontracting Automation',
    ogDescription:
      'Case study: automated IT subcontractor workflows, compliance enforcement, and financial reporting at scale.',
    tags: ['B2B SaaS', 'Automation', 'Finance', 'Compliance'],
    year: '2023',
    image: '/sub.png',
    gradient: 'from-blue-950 via-slate-950 to-black',
    accentColor: 'text-blue-400',
  },
  {
    slug: 'upgrad-lms',
    title: 'upGrad LMS Rebuild',
    tagline: '75% Core Web Vitals improvement — LMS serving 3M+ active learners.',
    metaTitle: 'upGrad LMS Rebuild — Case Study | Arvind Narayan',
    description:
      "Led the full-stack rebuild of upGrad's Learning Management System — achieving 75% Core Web Vitals improvement, sub-200ms API response times, and offline-first PWA for 3M+ active learners across emerging markets.",
    ogTitle: 'upGrad LMS Rebuild — 75% Core Web Vitals Improvement',
    ogDescription:
      'Case study: architecting a PWA-first LMS for 3M+ active learners with offline-first support for 2G networks.',
    tags: ['React', 'Performance', 'PWA', 'Scale'],
    year: '2020–2021',
    image: '/lms.png',
    gradient: 'from-orange-950 via-amber-950 to-black',
    accentColor: 'text-orange-400',
  },
  {
    slug: 'upgrad-shorts',
    title: 'upGrad Shorts',
    tagline:
      'ML-powered micro-learning feed with spaced repetition and neural retention engine.',
    metaTitle: 'upGrad Shorts — Case Study | Arvind Narayan',
    description:
      'Engineered upGrad Shorts — a micro-learning feed with SM2 spaced repetition and a neural network classifier that predicts optimal review intervals per learner, delivering a 15% lift in retargeting and cross-sale experiments.',
    ogTitle: 'upGrad Shorts — ML-Driven Micro-Learning',
    ogDescription:
      'Case study: SM2 spaced repetition + neural network personalization for short-form learning.',
    tags: ['ML', 'Spaced Repetition', 'Personalization', 'EdTech'],
    year: '2020',
    image: '/masterclass.png',
    gradient: 'from-fuchsia-950 via-purple-950 to-black',
    accentColor: 'text-fuchsia-400',
  },
  {
    slug: 'pranaa',
    title: 'Praana Foods',
    tagline:
      'AI-native vegan meal subscription with monthly ML-driven nutrition recalibration.',
    metaTitle: 'Praana Foods — Case Study | Arvind Narayan',
    description:
      "Built the ML personalization engine behind Praana Foods — an AI-native vegan meal subscription that uses monthly health check-ins and a feedback loop to recalibrate each subscriber's macro and micronutrient plan.",
    ogTitle: 'Praana Foods — Precision Vegan Nutrition ML',
    ogDescription:
      'Case study: ML-driven nutritional recalibration, allergy guard, and life-stage personalization for a vegan meal subscription.',
    tags: ['ML', 'Personalization', 'Health Tech', 'Subscriptions'],
    year: '2022',
    image: '/pranaa.png',
    gradient: 'from-green-950 via-emerald-950 to-black',
    accentColor: 'text-green-400',
  },
  {
    slug: 'upgrad-lite',
    title: 'upGrad Lite',
    tagline: 'Offline-first lite LMS for 2G networks — 60% bundle reduction, full PWA.',
    metaTitle: 'upGrad Lite — Case Study | Arvind Narayan',
    description:
      "How I built a lightweight, offline-first lite version of upGrad's learner UI — cutting JS bundle size by 60%, enabling full PWA functionality on 2G networks, and reaching learners in low-bandwidth markets without degrading the product.",
    ogTitle: 'upGrad Lite — Offline-First LMS for Low-Bandwidth Markets',
    ogDescription:
      'Case study: 60% bundle reduction, service worker architecture, and progressive enhancement for emerging market users.',
    tags: ['PWA', 'Offline-First', 'Performance', 'Emerging Markets'],
    year: '2020',
    image: '/lms.png',
    gradient: 'from-cyan-950 via-sky-950 to-black',
    accentColor: 'text-cyan-400',
  },
];

export function getWorkProject(slug: string): WorkProject | undefined {
  return workProjects.find((p) => p.slug === slug);
}

export function workProjectUrl(slug: string): string {
  return absoluteUrl(`/work/${slug}`);
}

export function workProjectMetadata(slug: string): Metadata {
  const project = getWorkProject(slug);
  if (!project) {
    throw new Error(`Unknown work project: ${slug}`);
  }

  const url = workProjectUrl(slug);
  const image = absoluteUrl(project.image);

  return {
    title: project.metaTitle,
    description: project.description,
    alternates: {
      canonical: url,
    },
    robots: indexFollowRobots,
    openGraph: pageOpenGraph({
      title: project.ogTitle,
      description: project.ogDescription,
      url,
      type: 'article',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    }),
    twitter: pageTwitter({
      title: project.ogTitle,
      description: project.ogDescription,
      images: [image],
    }),
  };
}

export function workProjectJsonLd(slug: string) {
  const project = getWorkProject(slug);
  if (!project) {
    throw new Error(`Unknown work project: ${slug}`);
  }

  const url = workProjectUrl(slug);
  const image = absoluteUrl(project.image);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': url,
      url,
      name: project.metaTitle,
      description: project.description,
      inLanguage: 'en-US',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      author: { '@id': PERSON_ID },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
      },
      mainEntity: {
        '@type': 'CreativeWork',
        '@id': `${url}#case-study`,
        name: project.title,
        headline: project.ogTitle,
        description: project.description,
        url,
        image,
        keywords: project.tags.join(', '),
        dateCreated: `${project.year.slice(0, 4)}-01-01`,
        author: { '@id': PERSON_ID },
        creator: { '@id': PERSON_ID },
        about: project.tags.map((tag) => ({
          '@type': 'Thing',
          name: tag,
        })),
      },
    },
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Work', path: '/work' },
      { name: project.title, path: `/work/${slug}` },
    ]),
  ];
}

export function workIndexMetadata(): Metadata {
  const title = 'Selected Work — Arvind Narayan';
  const description =
    'Case studies from Arvind Narayan — Staff ML/AI Engineer. AI-driven recruitment, stock intelligence, molecular ML, edtech, and enterprise SaaS products built for millions of users.';
  const url = absoluteUrl('/work');

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: indexFollowRobots,
    openGraph: pageOpenGraph({
      title,
      description,
      url,
    }),
    twitter: pageTwitter({ title, description }),
  };
}

export function workIndexJsonLd() {
  const url = absoluteUrl('/work');

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': url,
      url,
      name: 'Selected Work — Arvind Narayan',
      description:
        'Case studies from Arvind Narayan — Staff ML/AI Engineer.',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      mainEntity: {
        '@type': 'ItemList',
        itemListOrder: 'https://schema.org/ItemListUnordered',
        numberOfItems: workProjects.length,
        itemListElement: workProjects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: workProjectUrl(project.slug),
          name: project.title,
        })),
      },
    },
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Work', path: '/work' },
    ]),
  ];
}
