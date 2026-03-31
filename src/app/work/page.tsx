import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SectionGridBackground } from '@/components/ui/section-grid-background';
import { GradientText } from '@/components/ui/gradient-text';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Selected Work — Arvind Narayan',
  description:
    'Case studies from Arvind Narayan — Staff ML/AI Engineer. AI-driven recruitment, stock intelligence, molecular ML, edtech, and enterprise SaaS products built for millions of users.',
  openGraph: {
    title: 'Selected Work — Arvind Narayan',
    description:
      'Case studies from Arvind Narayan — Staff ML/AI Engineer. AI-driven recruitment, stock intelligence, molecular ML, edtech, and enterprise SaaS products built for millions of users.',
    url: 'https://arwwwind.com/work',
  },
};

const projects = [
  {
    slug: 'cohort-ai',
    title: 'Cohort AI',
    tagline: 'AI recruitment platform that delivers 3 pre-vetted candidates in 72 hours.',
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
    tags: ['NLP', 'Predictive Analytics', 'FinTech', 'LLMs'],
    year: '2024',
    image: '/ticker-6.png',
    gradient: 'from-emerald-950 via-teal-950 to-black',
    accentColor: 'text-emerald-400',
  },
  {
    slug: 'yuni',
    title: 'Yuni',
    tagline: 'Private multimodal AI platform for creatives with custom model training.',
    tags: ['Multimodal AI', 'Fine-Tuning', 'Creative Tools', 'Privacy'],
    year: '2024',
    image: '/Yuni_Desktop_Discover_Creations.png',
    gradient: 'from-rose-950 via-pink-950 to-black',
    accentColor: 'text-rose-400',
  },
  {
    slug: 'subclarity',
    title: 'Subclarity',
    tagline: 'B2B platform automating IT subcontractor onboarding, contracts, and accounting.',
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
    tags: ['React', 'Performance', 'PWA', 'Scale'],
    year: '2020–2021',
    image: '/lms.png',
    gradient: 'from-orange-950 via-amber-950 to-black',
    accentColor: 'text-orange-400',
  },
  {
    slug: 'upgrad-shorts',
    title: 'upGrad Shorts',
    tagline: 'ML-powered micro-learning feed with spaced repetition and neural retention engine.',
    tags: ['ML', 'Spaced Repetition', 'Personalization', 'EdTech'],
    year: '2020',
    image: '/masterclass.png',
    gradient: 'from-fuchsia-950 via-purple-950 to-black',
    accentColor: 'text-fuchsia-400',
  },
  {
    slug: 'pranaa',
    title: 'Praana Foods',
    tagline: 'AI-native vegan meal subscription with monthly ML-driven nutrition recalibration.',
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
    tags: ['PWA', 'Offline-First', 'Performance', 'Emerging Markets'],
    year: '2020',
    image: '/lms.png',
    gradient: 'from-cyan-950 via-sky-950 to-black',
    accentColor: 'text-cyan-400',
  },
];

export default function WorkPage() {
  return (
    <div className='min-h-screen bg-black'>
      <SectionGridBackground>
        <div className='max-w-screen-xl mx-auto px-4 py-24'>

          {/* Back */}
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-neutral-500 hover:text-teal-400 text-sm transition-colors mb-12'
          >
            ← Back
          </Link>

          {/* Header */}
          <div className='mb-4'>
            <span className='text-xs font-semibold tracking-widest text-teal-400 uppercase'>
              Portfolio
            </span>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            <GradientText>Selected Work</GradientText>
          </h1>
          <p className='text-neutral-400 text-base mb-16 md:w-[60%]'>
            Products shipped, platforms scaled, and ML systems deployed — from AI recruitment
            agents to molecular property prediction. Each project is a case study in building
            things that actually work.
          </p>

          {/* Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className='group relative rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60'
              >
                {/* Image or gradient hero */}
                <div className={`relative h-48 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className='object-cover object-top opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500'
                    />
                  ) : (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <span className={`text-5xl font-black ${p.accentColor} opacity-20 group-hover:opacity-30 transition-opacity tracking-tight`}>
                        {p.title.split(' ')[0]}
                      </span>
                    </div>
                  )}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent' />
                  <span className='absolute bottom-3 right-3 text-xs text-neutral-500 font-mono'>
                    {p.year}
                  </span>
                </div>

                {/* Content */}
                <div className='p-5 bg-neutral-950'>
                  <h2 className={`text-lg font-bold text-white mb-1 group-hover:${p.accentColor} transition-colors`}>
                    {p.title}
                  </h2>
                  <p className='text-neutral-400 text-sm mb-4 leading-relaxed'>{p.tagline}</p>
                  <div className='flex flex-wrap gap-1.5'>
                    {p.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant='outline'
                        className='text-xs border-neutral-800 text-neutral-500'
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className='absolute top-4 right-4 w-7 h-7 rounded-full bg-black/50 border border-neutral-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                  <span className='text-white text-xs'>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SectionGridBackground>
    </div>
  );
}
