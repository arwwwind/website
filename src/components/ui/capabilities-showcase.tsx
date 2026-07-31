'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AsciiFigure } from '@/components/ui/ascii-figure';
import { CrypticText } from '@/components/ui/cryptic-text';
import { StreamCell, useSequentialStream } from '@/components/ui/stream-in';
import { shouldSkipMotion } from '@/lib/is-bot';
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
  highlights: string[];
  figures: CapabilityFigure[];
};

function CapHighlights({
  items,
  active,
}: {
  items: string[];
  active: boolean;
}) {
  const { ref, count } = useSequentialStream(items.length, {
    whenVisible: false,
    enabled: active,
    intervalMs: 70,
    startDelay: 40,
  });

  return (
    <div ref={ref} className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
      {items.slice(0, count).map((h) => (
        <StreamCell key={h}>
          <div className='rounded-lg border border-neutral-800/90 bg-neutral-950/60 px-3 py-2.5 text-xs text-neutral-300 leading-snug'>
            <span className='text-teal-500/80 mr-1.5' aria-hidden>
              ▸
            </span>
            {h}
          </div>
        </StreamCell>
      ))}
    </div>
  );
}

function TiltPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 180,
    damping: 22,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 180,
    damping: 22,
  });
  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], [0, 100]), {
    stiffness: 120,
    damping: 20,
  });
  const glowY = useSpring(useTransform(my, [-0.5, 0.5], [0, 100]), {
    stiffness: 120,
    damping: 20,
  });
  const glow = useMotionTemplate`radial-gradient(480px circle at ${glowX}% ${glowY}%, rgba(45,212,191,0.18), transparent 55%)`;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className={cn('w-full', className)} style={{ perspective: 1100 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className='relative overflow-hidden rounded-2xl border border-neutral-800/90 bg-neutral-950 will-change-transform'
      >
        <motion.div
          aria-hidden
          className='pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover/feature:opacity-100'
          style={{ background: glow }}
        />
        <div className='relative' style={{ transform: 'translateZ(18px)' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Capabilities — same sticky featured + scroll-linked rail UX as Writing.
 * Content (copy, figures, highlights, outcomes) is unchanged.
 */
export function CapabilitiesShowcase({ items }: { items: Capability[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const hoverLock = useRef(false);
  const [active, setActive] = useState(0);
  const activeCap = items[active] ?? items[0];

  useEffect(() => {
    if (shouldSkipMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => {
            if (!hoverLock.current) setActive(i);
          },
          onEnterBack: () => {
            if (!hoverLock.current) setActive(i);
          },
        });

        gsap.fromTo(
          el,
          { y: 28, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 55%',
              scrub: 0.6,
            },
          }
        );
      });

      const section = sectionRef.current;
      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          end: 'bottom 40%',
          onUpdate(self) {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        });
      }
    }, sectionRef);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [items.length]);

  useEffect(() => {
    if (counterRef.current) {
      counterRef.current.textContent = String(active + 1).padStart(2, '0');
    }
  }, [active]);

  const activate = (i: number) => {
    hoverLock.current = true;
    setActive(i);
    itemRefs.current[i]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    window.setTimeout(() => {
      hoverLock.current = false;
    }, 700);
  };

  if (!activeCap) return null;

  return (
    <section
      ref={sectionRef}
      id='what-i-do'
      aria-label='AI engineering capabilities — RAG, molecular ML, clinical analytics, edtech, and production MLOps'
      className='relative border-t border-neutral-900 overflow-x-clip'
    >
      <div
        aria-hidden
        data-drift='32'
        className='pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-teal-500/[0.08] blur-3xl'
      />
      <div
        aria-hidden
        data-drift='-24'
        className='pointer-events-none absolute top-1/3 -left-20 h-96 w-96 rounded-full bg-rose-500/[0.06] blur-3xl'
      />
      <div
        aria-hidden
        data-scrub-x
        className='pointer-events-none select-none absolute -bottom-4 md:-bottom-10 left-0 whitespace-nowrap font-black leading-none tracking-tighter text-[4.5rem] md:text-[8.5rem] text-white/[0.03] will-change-transform'
      >
        CAPABILITIES&nbsp;&nbsp;CAPABILITIES&nbsp;&nbsp;CAPABILITIES
      </div>

      <div className='relative max-w-screen-xl mx-auto px-4 py-16 md:py-24'>
        <div className='mb-10 md:mb-14' data-reveal>
          <div className='mb-2'>
            <span className='text-xs font-semibold tracking-widest text-teal-400 uppercase'>
              <CrypticText
                text='Capabilities'
                whenVisible
                cps={20}
                flipsPerChar={2}
                scrambleWindow={3}
              />
            </span>
          </div>
          <div className='flex flex-wrap items-end justify-between gap-4'>
            <div className='max-w-2xl'>
              <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
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
                cps={40}
                flipsPerChar={2}
                scrambleWindow={4}
                text='Staff AI/ML engineering across hybrid RAG platforms, graph neural networks for drug discovery, clinical trial analytics, personalized edtech, and LLM infrastructure — built to ship and stay in production.'
                className='mt-3 text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl'
              />
            </div>
            <div className='hidden md:flex items-center gap-3 shrink-0 pb-1'>
              <span className='text-xs font-mono text-neutral-500 tabular-nums'>
                <span ref={counterRef}>01</span>
                <span className='text-neutral-700'>
                  {' '}
                  / {String(items.length).padStart(2, '0')}
                </span>
              </span>
              <div className='w-36 h-px bg-neutral-800 overflow-hidden'>
                <div
                  ref={progressRef}
                  className='h-full w-full origin-left scale-x-0 bg-gradient-to-r from-teal-400 to-rose-400'
                />
              </div>
            </div>
          </div>
        </div>

        {/* desktop: sticky feature + capability rail */}
        <div className='hidden lg:grid lg:grid-cols-12 gap-10 xl:gap-14 items-start'>
          <div className='lg:col-span-6 xl:col-span-7 lg:sticky lg:top-28 group/feature'>
            <div
              id={`cap-${activeCap.id}`}
              className='rounded-2xl focus-within:ring-2 focus-within:ring-teal-500/60'
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeCap.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                    filter: 'blur(6px)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                  }}
                  exit={{
                    opacity: 0,
                    y: -14,
                    filter: 'blur(4px)',
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className='space-y-4'
                >
                  <TiltPanel>
                    <div className='p-0.5'>
                      {activeCap.figures.map((fig) => (
                        <AsciiFigure
                          key={fig.caption}
                          caption={fig.caption}
                          lines={fig.lines}
                          armed
                          size='lg'
                        />
                      ))}
                    </div>
                  </TiltPanel>

                  <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-neutral-500'>
                    <span className='text-teal-500/80'>{activeCap.label}</span>
                    <span aria-hidden>·</span>
                    <span>
                      {String(active + 1).padStart(2, '0')} /{' '}
                      {String(items.length).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className='text-2xl xl:text-[1.75rem] font-bold text-white leading-tight group-hover/feature:text-teal-100 transition-colors'>
                    {activeCap.title}
                  </h3>
                  <p className='text-neutral-300 text-sm leading-relaxed max-w-xl line-clamp-3'>
                    {activeCap.lead}
                  </p>
                  <p className='text-sm text-teal-400 font-medium border-l-2 border-teal-600/60 pl-4'>
                    {activeCap.outcome}
                  </p>
                  <CapHighlights
                    key={activeCap.id + '-hl'}
                    items={activeCap.highlights}
                    active
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className='lg:col-span-6 xl:col-span-5'>
            <ul className='space-y-3' role='list' aria-label='Capability topics'>
              {items.map((cap, i) => {
                const on = i === active;
                return (
                  <li
                    key={cap.id}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                  >
                    <button
                      type='button'
                      onMouseEnter={() => {
                        hoverLock.current = true;
                        setActive(i);
                      }}
                      onMouseLeave={() => {
                        hoverLock.current = false;
                      }}
                      onFocus={() => activate(i)}
                      onClick={() => activate(i)}
                      className={cn(
                        'group/rail relative block w-full text-left rounded-2xl border px-4 py-4 transition-all duration-300',
                        on
                          ? 'border-teal-700/50 bg-teal-950/25 shadow-[0_0_48px_-16px_rgba(45,212,191,0.5)]'
                          : 'border-neutral-800/80 bg-neutral-950/40 hover:border-neutral-700 hover:bg-neutral-900/50'
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'absolute left-0 top-3.5 bottom-3.5 w-0.5 rounded-full transition-all duration-300 origin-center',
                          on
                            ? 'bg-teal-400 scale-y-100'
                            : 'bg-transparent scale-y-50'
                        )}
                      />
                      <div className='flex items-baseline justify-between gap-3 mb-1.5 pr-6'>
                        <span
                          className={cn(
                            'font-mono text-[11px] tabular-nums transition-colors',
                            on ? 'text-teal-400' : 'text-neutral-600'
                          )}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={cn(
                            'text-[11px] font-mono transition-colors',
                            on ? 'text-teal-500/80' : 'text-neutral-600'
                          )}
                        >
                          {cap.label}
                        </span>
                      </div>
                      <p
                        className={cn(
                          'text-[15px] font-semibold leading-snug transition-colors pr-6',
                          on
                            ? 'text-white'
                            : 'text-neutral-400 group-hover/rail:text-neutral-200'
                        )}
                      >
                        {cap.title}
                      </p>
                      <p className='mt-1.5 text-xs text-neutral-600 line-clamp-2 leading-relaxed pr-4'>
                        {cap.lead}
                      </p>
                      <div
                        className={cn(
                          'grid transition-[grid-template-rows] duration-300 ease-out',
                          on && cap.detail
                            ? 'grid-rows-[1fr] mt-2'
                            : 'grid-rows-[0fr]'
                        )}
                      >
                        <div className='overflow-hidden'>
                          {cap.detail && (
                            <p className='text-xs text-neutral-500 leading-relaxed pr-4 pb-0.5'>
                              {cap.detail}
                            </p>
                          )}
                        </div>
                      </div>
                      <p
                        className={cn(
                          'mt-2 text-[11px] font-medium transition-colors line-clamp-1',
                          on ? 'text-teal-500/70' : 'text-neutral-700'
                        )}
                      >
                        {cap.outcome}
                      </p>
                      <span
                        className={cn(
                          'absolute right-4 top-1/2 -translate-y-1/2 text-teal-400 transition-all duration-300',
                          on
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 -translate-x-2 group-hover/rail:opacity-70 group-hover/rail:translate-x-0'
                        )}
                      >
                        →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* mobile stack — full content retained */}
        <div className='lg:hidden space-y-6' data-reveal-group>
          {items.map((cap, i) => (
            <article
              key={cap.id}
              id={`cap-m-${cap.id}`}
              className='rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950'
            >
              <div className='border-b border-neutral-800/80'>
                {cap.figures.map((fig) => (
                  <AsciiFigure
                    key={fig.caption}
                    caption={fig.caption}
                    lines={fig.lines}
                    armed
                    size='lg'
                  />
                ))}
              </div>
              <div className='p-5 space-y-4'>
                <div className='flex items-baseline justify-between gap-3'>
                  <span className='font-mono text-[11px] text-teal-400'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className='text-[11px] font-mono text-neutral-500'>
                    {cap.label}
                  </span>
                </div>
                <h3 className='text-xl font-bold text-white leading-tight'>
                  {cap.title}
                </h3>
                <p className='text-neutral-300 text-sm leading-relaxed'>
                  {cap.lead}
                </p>
                {cap.detail && (
                  <p className='text-neutral-500 text-sm leading-relaxed'>
                    {cap.detail}
                  </p>
                )}
                <p className='text-sm text-teal-400 font-medium border-l-2 border-teal-600/60 pl-4'>
                  {cap.outcome}
                </p>
                <ul className='grid grid-cols-1 gap-2'>
                  {cap.highlights.map((h) => (
                    <li
                      key={h}
                      className='rounded-lg border border-neutral-800/90 bg-neutral-950/60 px-3 py-2.5 text-xs text-neutral-300 leading-snug'
                    >
                      <span className='text-teal-500/80 mr-1.5' aria-hidden>
                        ▸
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
