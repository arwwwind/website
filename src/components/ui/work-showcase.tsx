'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    slug: 'cohort-ai',
    title: 'Cohort AI',
    tagline: 'AI recruitment agents that source, vet, and close — top 3 candidates in 72 hours.',
    tags: ['Multi-Agent', 'NLP', 'LangGraph'],
    year: '2024',
    image: '/CohortAI – Match – Candidates – High Fit.png',
    gradient: 'from-violet-950 via-indigo-950 to-neutral-950',
    accent: 'text-violet-400',
    border: 'hover:border-violet-800/60',
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
];

/**
 * Pinned horizontal scroll gallery (desktop): the section pins while the
 * card track scrubs sideways with the scroll — the signature Lenis +
 * ScrollTrigger move. Mobile and reduced-motion fall back to a native
 * swipe carousel.
 */
export function WorkShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;

      // desktop: the track is driven by the pin scrub, not native overflow
      track.classList.remove('overflow-x-auto', 'snap-x', 'snap-mandatory');
      track.classList.add('overflow-visible');

      const getDist = () =>
        Math.max(track.scrollWidth - wrap.clientWidth + 48, 1);

      const tween = gsap.to(track, {
        x: () => -getDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => '+=' + getDist(),
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            if (counterRef.current) {
              const idx = Math.min(
                projects.length,
                Math.max(1, Math.round(self.progress * (projects.length - 1)) + 1)
              );
              counterRef.current.textContent = String(idx).padStart(2, '0');
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: 'x' });
        track.classList.add('overflow-x-auto', 'snap-x', 'snap-mandatory');
        track.classList.remove('overflow-visible');
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className='overflow-x-clip md:h-screen md:flex md:flex-col md:justify-center py-12 md:py-0'
    >
      {/* heading row */}
      <div className='w-full max-w-screen-xl mx-auto px-4 mb-8 md:mb-10'>
        <div data-reveal className='mb-2'>
          <span className='text-xs font-semibold tracking-widest text-teal-400 uppercase'>
            Selected Work
          </span>
        </div>
        <div className='flex items-end justify-between gap-6'>
          <h2 data-split className='text-3xl md:text-4xl font-bold text-white'>
            Products &amp; Case Studies
          </h2>
          <div className='hidden md:flex items-center gap-3 shrink-0 pb-1'>
            <span className='text-xs font-mono text-neutral-500 tabular-nums'>
              <span ref={counterRef}>01</span>
              <span className='text-neutral-700'> / {String(projects.length).padStart(2, '0')}</span>
            </span>
            <div className='w-40 h-px bg-neutral-800 overflow-hidden'>
              <div
                ref={progressRef}
                className='h-full w-full origin-left scale-x-0 bg-gradient-to-r from-teal-400 to-rose-400'
              />
            </div>
          </div>
        </div>
      </div>

      {/* card track */}
      <div
        ref={trackRef}
        className='flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 scrollbar-none pl-4 md:pl-[max(1rem,calc((100vw-80rem)/2+1rem))] pr-4 will-change-transform'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className={`work-card group flex-none w-[300px] md:w-[420px] snap-start rounded-2xl overflow-hidden border border-neutral-800 ${p.border} bg-neutral-950 transition-all duration-300 hover:-translate-y-1.5`}
          >
            {/* image */}
            <div className={`h-44 md:h-60 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes='(min-width: 768px) 420px, 300px'
                className='object-cover object-top opacity-60 group-hover:opacity-80 group-hover:scale-[1.04] transition-all duration-700 ease-out'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent' />
              <span className='absolute top-4 right-4 text-xs text-neutral-400 font-mono bg-neutral-950/60 backdrop-blur px-2 py-0.5 rounded'>
                {p.year}
              </span>
              <span className='absolute bottom-3 left-4 text-[11px] font-mono text-neutral-500'>
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {/* content */}
            <div className='p-5 md:p-6'>
              <div className='flex items-center justify-between mb-1.5'>
                <h3 className='text-base md:text-lg font-bold text-white'>
                  {p.title}
                </h3>
                <span
                  className={`text-lg ${p.accent} opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`}
                >
                  →
                </span>
              </div>
              <p className='text-neutral-500 text-xs md:text-sm leading-relaxed mb-4'>
                {p.tagline}
              </p>
              <div className='flex flex-wrap gap-1.5'>
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
        ))}

        {/* view-all card */}
        <Link
          href='/work'
          className='group flex-none w-[220px] md:w-[280px] snap-start rounded-2xl border border-neutral-800 hover:border-teal-800/60 bg-neutral-950 hover:bg-teal-950/20 transition-all duration-300 flex flex-col items-center justify-center gap-4 p-6'
        >
          <span className='text-4xl text-teal-600 group-hover:text-teal-400 group-hover:translate-x-1.5 transition-all duration-300'>
            →
          </span>
          <span className='text-xs text-neutral-500 group-hover:text-teal-400 transition-colors text-center leading-relaxed'>
            View all
            <br />
            case studies
          </span>
        </Link>
      </div>

      {/* mobile swipe hint */}
      <div className='md:hidden px-4 mt-1 text-[11px] text-neutral-600 font-mono'>
        ← swipe →
      </div>
    </div>
  );
}
