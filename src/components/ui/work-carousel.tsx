'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    slug: 'cohort-ai',
    title: 'Cohort AI',
    tagline: 'AI recruitment agents that source, vet, and close — top 3 candidates in 72 hours.',
    tags: ['Multi-Agent', 'NLP', 'LangGraph'],
    year: '2024',
    image: '/CohortAI_Match_Candidates_High_Fit.png',
    gradient: 'from-violet-950 via-indigo-950 to-neutral-950',
    accent: 'text-violet-400',
    border: 'hover:border-violet-800/60',
  },
  {
    slug: 'tickerlens',
    title: 'TickerLens',
    tagline: 'Conversational stock screening — type what you want to find, not which filters to set.',
    tags: ['FinTech', 'LLMs', 'Predictive ML'],
    year: '2024',
    image: '/ticker-2.png',
    gradient: 'from-emerald-950 via-teal-950 to-neutral-950',
    accent: 'text-emerald-400',
    border: 'hover:border-emerald-800/60',
  },
  {
    slug: 'yuni',
    title: 'Yuni',
    tagline: 'Private multimodal AI for creatives — fine-tune on your own work, own every output.',
    tags: ['LoRA Fine-Tuning', 'Multimodal', 'Privacy'],
    year: '2024',
    image: '/Yuni_Desktop_Discover_Creations.png',
    gradient: 'from-rose-950 via-pink-950 to-neutral-950',
    accent: 'text-rose-400',
    border: 'hover:border-rose-800/60',
  },
  {
    slug: 'subclarity',
    title: 'Subclarity',
    tagline: 'B2B platform that automates IT subcontractor onboarding, contracts, and accounting.',
    tags: ['B2B SaaS', 'Automation', 'Compliance'],
    year: '2023',
    image: '/sub.png',
    gradient: 'from-blue-950 via-slate-950 to-neutral-950',
    accent: 'text-blue-400',
    border: 'hover:border-blue-800/60',
  },
  {
    slug: 'upgrad-lms',
    title: 'upGrad LMS',
    tagline: '75% Core Web Vitals improvement — PWA rebuild for 3M+ active learners.',
    tags: ['React', 'PWA', 'Offline-First'],
    year: '2020–2021',
    image: '/lms.png',
    gradient: 'from-orange-950 via-amber-950 to-neutral-950',
    accent: 'text-orange-400',
    border: 'hover:border-orange-800/60',
  },
  {
    slug: 'upgrad-shorts',
    title: 'upGrad Shorts',
    tagline: 'SM2 + neural network micro-learning feed — 15% lift in retargeting experiments.',
    tags: ['ML', 'Spaced Repetition', 'EdTech'],
    year: '2020',
    image: '/masterclass.png',
    gradient: 'from-fuchsia-950 via-purple-950 to-neutral-950',
    accent: 'text-fuchsia-400',
    border: 'hover:border-fuchsia-800/60',
  },
  {
    slug: 'pranaa',
    title: 'Praana Foods',
    tagline: 'Monthly ML recalibration for vegan nutrition — zero wearables, fully personalized.',
    tags: ['ML Personalization', 'Health Tech'],
    year: '2022',
    image: '/pranaa.png',
    gradient: 'from-green-950 via-emerald-950 to-neutral-950',
    accent: 'text-green-400',
    border: 'hover:border-green-800/60',
  },
  {
    slug: 'upgrad-lite',
    title: 'upGrad Lite',
    tagline: '60% smaller bundle, offline course playback, sub-3s load on 2G.',
    tags: ['PWA', 'Performance', 'Emerging Markets'],
    year: '2020',
    image: '/upgrad-learn.png',
    gradient: 'from-cyan-950 via-sky-950 to-neutral-950',
    accent: 'text-cyan-400',
    border: 'hover:border-cyan-800/60',
  },
];

export function WorkCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.75;
    trackRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <div className='relative'>
      {/* Scroll track */}
      <div
        ref={trackRef}
        className='flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className='flex-none w-[280px] md:w-[320px] snap-start'
          >
            <Link
              href={`/work/${p.slug}`}
              className={`group block rounded-xl overflow-hidden border border-neutral-800 ${p.border} transition-all duration-300 hover:-translate-y-1 h-full bg-neutral-950`}
            >
              {/* Image or gradient */}
              <div className={`h-40 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes='320px'
                    className='object-cover object-top opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500'
                  />
                ) : (
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <span className={`text-4xl font-black ${p.accent} opacity-15 group-hover:opacity-25 transition-opacity tracking-tight`}>
                      {p.title.split(' ')[0]}
                    </span>
                  </div>
                )}
                <div className='absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent' />
                <span className='absolute top-3 right-3 text-xs text-neutral-600 font-mono'>{p.year}</span>
              </div>

              {/* Content */}
              <div className='p-4'>
                <h3 className={`text-sm font-bold text-white mb-1 group-hover:${p.accent} transition-colors`}>
                  {p.title}
                </h3>
                <p className='text-neutral-500 text-xs leading-relaxed mb-3'>{p.tagline}</p>
                <div className='flex flex-wrap gap-1'>
                  {p.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant='outline'
                      className='text-[10px] border-neutral-800 text-neutral-600 px-1.5 py-0'
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* View all card */}
        <div className='flex-none w-[200px] snap-start flex items-center justify-center'>
          <Link
            href='/work'
            className='group w-full h-full min-h-[220px] rounded-xl border border-neutral-800 hover:border-teal-800/60 bg-neutral-950 hover:bg-teal-950/20 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-6'
          >
            <span className='text-3xl text-teal-600 group-hover:text-teal-400 transition-colors'>→</span>
            <span className='text-xs text-neutral-500 group-hover:text-teal-400 transition-colors text-center leading-relaxed'>
              View all<br />case studies
            </span>
          </Link>
        </div>
      </div>

      {/* Scroll controls */}
      <div className='flex gap-2 mt-4'>
        <button
          onClick={() => scroll('left')}
          aria-label='Scroll left'
          className='w-8 h-8 rounded-full border border-neutral-800 hover:border-neutral-600 bg-neutral-950 flex items-center justify-center text-neutral-500 hover:text-white transition-all text-sm'
        >
          ←
        </button>
        <button
          onClick={() => scroll('right')}
          aria-label='Scroll right'
          className='w-8 h-8 rounded-full border border-neutral-800 hover:border-neutral-600 bg-neutral-950 flex items-center justify-center text-neutral-500 hover:text-white transition-all text-sm'
        >
          →
        </button>
      </div>
    </div>
  );
}
