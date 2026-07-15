'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AsciiFigure } from '@/components/ui/ascii-figure';
import { CrypticText } from '@/components/ui/cryptic-text';
import { cn } from '@/lib/utils';

export type CapabilityFigure = {
  caption: string;
  lines: string[];
};

export type Capability = {
  id: string;
  label: string;
  title: string;
  lead: string;
  detail?: string;
  outcome: string;
  /** Short points that fill the sticky visual column */
  highlights: string[];
  figures: CapabilityFigure[];
};

function CapChapter({
  cap,
  active,
  setRef,
}: {
  cap: Capability;
  active: boolean;
  setRef: (el: HTMLElement | null) => void;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (active) setUnlocked(true);
  }, [active]);

  return (
    <article
      id={`cap-${cap.id}`}
      ref={setRef}
      className='scroll-mt-28 border-t border-neutral-900/80 pt-12 md:pt-16'
    >
      {/* Title band — full content width */}
      <div data-cap-block className='mb-8 md:mb-10 max-w-4xl'>
        <p
          className={cn(
            'text-sm font-medium tracking-wide mb-3 transition-colors duration-500',
            active || unlocked ? 'text-teal-400' : 'text-neutral-500'
          )}
        >
          {cap.label}
        </p>
        <h3 className='text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.12] tracking-tight'>
          {unlocked ? (
            <CrypticText
              text={cap.title}
              cps={16}
              flipsPerChar={2}
              scrambleWindow={4}
              onComplete={() => setPhase((p) => Math.max(p, 1))}
            />
          ) : (
            <span className='invisible' aria-hidden>
              {cap.title}
            </span>
          )}
        </h3>
      </div>

      {/* Dense two-column body — copy + sticky visual */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start'>
        <div className='lg:col-span-6 space-y-5'>
          <div>
            {phase >= 1 ? (
              <CrypticText
                as='p'
                text={cap.lead}
                delay={60}
                cps={48}
                flipsPerChar={1}
                scrambleWindow={4}
                className='text-neutral-200 text-base md:text-lg leading-relaxed'
                onComplete={() => setPhase((p) => Math.max(p, 2))}
              />
            ) : (
              <p className='invisible text-base md:text-lg leading-relaxed' aria-hidden>
                {cap.lead}
              </p>
            )}
          </div>

          {phase >= 2 && (
            <div
              className='space-y-5'
              style={{
                animation:
                  'stream-cell-in 420ms cubic-bezier(0.16, 1, 0.3, 1) both',
              }}
            >
              {cap.detail && (
                <p className='text-neutral-400 text-base md:text-[17px] leading-relaxed'>
                  {cap.detail}
                </p>
              )}
              <p className='text-base md:text-lg text-teal-400 font-medium border-l-2 border-teal-600/60 pl-4'>
                {cap.outcome}
              </p>
            </div>
          )}
        </div>

        <aside
          data-cap-visual
          className='lg:col-span-6 lg:sticky lg:top-28 space-y-5'
        >
          {cap.figures.map((fig) => (
            <AsciiFigure
              key={fig.caption}
              caption={fig.caption}
              lines={fig.lines}
              armed={unlocked}
              size='lg'
            />
          ))}

          {phase >= 2 && (
            <ul
              className='grid grid-cols-1 sm:grid-cols-2 gap-3'
              style={{
                animation:
                  'stream-cell-in 480ms cubic-bezier(0.16, 1, 0.3, 1) both',
              }}
            >
              {cap.highlights.map((h) => (
                <li
                  key={h}
                  className='rounded-lg border border-neutral-800/90 bg-neutral-950/60 px-3.5 py-3 text-sm text-neutral-300 leading-snug'
                >
                  <span className='text-teal-500/80 mr-1.5' aria-hidden>
                    ▸
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </article>
  );
}

export function CapabilitiesShowcase({ items }: { items: Capability[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);
  const articleRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setActive(0);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      articleRefs.current.forEach((el, i) => {
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 45%',
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });

        const visual = el.querySelector('[data-cap-visual]');
        if (visual) {
          gsap.fromTo(
            visual,
            { y: 28, opacity: 0.45 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                end: 'top 42%',
                scrub: 0.7,
              },
            }
          );
        }
      });
    }, sectionRef);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [items.length]);

  const scrollTo = (i: number) => {
    articleRefs.current[i]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      ref={sectionRef}
      id='what-i-do'
      aria-label='AI engineering capabilities — RAG, molecular ML, clinical analytics, edtech, and production MLOps'
      className='relative border-t border-neutral-900 py-16 md:py-24'
    >
      <div className='max-w-screen-xl mx-auto px-4'>
        <header className='max-w-4xl mb-12 md:mb-16'>
          <p className='text-sm font-semibold tracking-widest text-teal-400 uppercase mb-4'>
            Capabilities
          </p>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-5'>
            <CrypticText
              text='Production AI for science, learning, and scale.'
              whenVisible
              cps={14}
              flipsPerChar={3}
              scrambleWindow={4}
            />
          </h2>
          <CrypticText
            as='p'
            whenVisible
            delay={280}
            cps={40}
            flipsPerChar={2}
            text='Staff AI/ML engineering across hybrid RAG platforms, graph neural networks for drug discovery, clinical trial analytics, personalized edtech, and LLM infrastructure — built to ship and stay in production.'
            className='text-neutral-300 text-lg md:text-xl leading-relaxed max-w-3xl'
          />
        </header>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12'>
          <nav aria-label='Capability topics' className='hidden lg:block lg:col-span-2'>
            <ul className='sticky top-28 space-y-0.5'>
              {items.map((cap, i) => {
                const on = i === active;
                return (
                  <li key={cap.id}>
                    <button
                      type='button'
                      onClick={() => scrollTo(i)}
                      className={cn(
                        'relative w-full text-left pl-3 pr-2 py-2.5 rounded-md text-sm leading-snug transition-all duration-300',
                        on
                          ? 'text-white font-medium'
                          : 'text-neutral-500 hover:text-neutral-300'
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full bg-teal-400 transition-all duration-300',
                          on ? 'h-5 opacity-100' : 'h-0 opacity-0'
                        )}
                      />
                      {cap.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className='lg:col-span-10'>
            {items.map((cap, i) => (
              <CapChapter
                key={cap.id}
                cap={cap}
                active={active === i}
                setRef={(el) => {
                  articleRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
