'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
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
import { BlogCover } from '@/components/blog/blog-cover';
import { CrypticText } from '@/components/ui/cryptic-text';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { formatPostDate, getAllPosts, type BlogPost } from '@/lib/blog-posts';
import { shouldSkipMotion } from '@/lib/is-bot';
import { cn } from '@/lib/utils';

const posts = getAllPosts();

function TiltCover({
  post,
  priority,
}: {
  post: BlogPost;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 180,
    damping: 22,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
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
  const glow = useMotionTemplate`radial-gradient(520px circle at ${glowX}% ${glowY}%, rgba(45,212,191,0.22), transparent 55%)`;

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
    <div className='h-full w-full' style={{ perspective: 1100 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className='relative h-full w-full overflow-hidden rounded-2xl border border-neutral-800/90 bg-neutral-950 will-change-transform'
      >
        <motion.div
          aria-hidden
          className='pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover/feature:opacity-100'
          style={{ background: glow }}
        />
        <div
          className='absolute inset-0 scale-[1.03]'
          style={{ transform: 'translateZ(24px)' }}
        >
          <BlogCover
            basePath={post.coverPath}
            alt={post.coverAlt}
            priority={priority}
            className='h-full w-full object-cover'
          />
        </div>
        <div className='absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent' />
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay'
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)',
          }}
        />
      </motion.div>
    </div>
  );
}

/**
 * Writing section — sticky featured stage + scroll-linked essay rail.
 * GSAP ScrollTrigger drives the active index; Framer handles cover morphs
 * and magnetic tilt. Mobile gets a staggered card stack.
 */
export function BlogShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const hoverLock = useRef(false);
  const [active, setActive] = useState(0);
  const activePost = posts[active] ?? posts[0];

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
  }, []);

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

  return (
    <section
      ref={sectionRef}
      id='writing'
      aria-label='Writing and essays'
      className='relative border-t border-neutral-900 overflow-x-clip'
    >
      <div
        aria-hidden
        data-drift='28'
        className='pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-teal-500/[0.08] blur-3xl'
      />
      <div
        aria-hidden
        data-drift='-22'
        className='pointer-events-none absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-rose-500/[0.06] blur-3xl'
      />
      <div
        aria-hidden
        data-scrub-x
        className='pointer-events-none select-none absolute -bottom-4 md:-bottom-10 left-0 whitespace-nowrap font-black leading-none tracking-tighter text-[5rem] md:text-[9.5rem] text-white/[0.03] will-change-transform'
      >
        WRITING&nbsp;&nbsp;WRITING&nbsp;&nbsp;WRITING
      </div>

      <div className='relative max-w-screen-xl mx-auto px-4 py-16 md:py-24'>
        <div className='mb-10 md:mb-14' data-reveal>
          <div className='mb-2'>
            <span className='text-xs font-semibold tracking-widest text-teal-400 uppercase'>
              <CrypticText
                text='Writing'
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
                  text='Essays from the workshop.'
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
                text='Agentic systems, attention, tabular ML, and the odd consulting roast — notes from building production AI.'
                className='mt-3 text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl'
              />
            </div>
            <div className='hidden md:flex items-center gap-3 shrink-0 pb-1'>
              <span className='text-xs font-mono text-neutral-500 tabular-nums'>
                <span ref={counterRef}>01</span>
                <span className='text-neutral-700'>
                  {' '}
                  / {String(posts.length).padStart(2, '0')}
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

        {/* desktop: sticky feature + essay rail */}
        <div className='hidden lg:grid lg:grid-cols-12 gap-10 xl:gap-14 items-start'>
          <div className='lg:col-span-6 xl:col-span-7 lg:sticky lg:top-28 group/feature'>
            <Link
              href={`/blogs/${activePost.slug}`}
              className='block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 rounded-2xl'
            >
              <div className='relative aspect-[16/10] w-full'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activePost.slug}
                    initial={{ opacity: 0, y: 24, scale: 0.97, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, scale: 0.98, filter: 'blur(4px)' }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className='absolute inset-0'
                  >
                    <TiltCover post={activePost} priority={active === 0} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence mode='wait'>
                <motion.div
                  key={activePost.slug + '-meta'}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className='mt-5'
                >
                  <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-neutral-500 mb-2'>
                    <time dateTime={activePost.date}>
                      {formatPostDate(activePost.date)}
                    </time>
                    <span aria-hidden>·</span>
                    <span>{activePost.readingMinutes} min read</span>
                    <span aria-hidden>·</span>
                    <span className='text-teal-500/80'>
                      {activePost.tags.slice(0, 2).join(' · ')}
                    </span>
                  </div>
                  <h3 className='text-2xl xl:text-3xl font-bold text-white leading-tight mb-2 group-hover/feature:text-teal-100 transition-colors'>
                    {activePost.title}
                  </h3>
                  <p className='text-neutral-400 text-sm leading-relaxed line-clamp-3 max-w-xl'>
                    {activePost.description}
                  </p>
                  <span className='inline-flex items-center gap-1.5 mt-4 text-sm text-teal-400 font-medium'>
                    Read essay
                    <span className='transition-transform duration-300 group-hover/feature:translate-x-1'>
                      →
                    </span>
                  </span>
                </motion.div>
              </AnimatePresence>
            </Link>
          </div>

          <div className='lg:col-span-6 xl:col-span-5'>
            <ul className='space-y-3' role='list'>
              {posts.map((post, i) => {
                const on = i === active;
                return (
                  <li
                    key={post.slug}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                  >
                    <Link
                      href={`/blogs/${post.slug}`}
                      onMouseEnter={() => {
                        hoverLock.current = true;
                        setActive(i);
                      }}
                      onMouseLeave={() => {
                        hoverLock.current = false;
                      }}
                      onFocus={() => activate(i)}
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
                          on ? 'bg-teal-400 scale-y-100' : 'bg-transparent scale-y-50'
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
                        <span className='text-[11px] text-neutral-600 font-mono'>
                          {post.readingMinutes} min
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
                        {post.title}
                      </p>
                      <p className='mt-1.5 text-xs text-neutral-600 line-clamp-2 leading-relaxed pr-4'>
                        {post.description}
                      </p>
                      <p className='mt-2 text-[11px] text-neutral-600 font-mono'>
                        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
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
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className='mt-8'>
              <MagneticButton strength={0.2}>
                <Link
                  href='/blogs'
                  className='group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-800 bg-neutral-950/80 text-sm text-neutral-300 hover:text-teal-300 hover:border-teal-800/60 transition-colors'
                >
                  <span>All essays</span>
                  <span className='text-xs group-hover:translate-x-1 transition-transform'>
                    →
                  </span>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* mobile stack */}
        <div className='lg:hidden space-y-5' data-reveal-group>
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className='group block rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 hover:border-teal-800/50 transition-colors'
            >
              <div className='relative aspect-[16/9] overflow-hidden'>
                <BlogCover
                  basePath={post.coverPath}
                  alt={post.coverAlt}
                  priority={i === 0}
                  className='h-full w-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-700 ease-out'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent' />
                <span className='absolute top-3 left-3 font-mono text-[11px] text-neutral-400 bg-neutral-950/55 backdrop-blur px-2 py-0.5 rounded'>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className='p-5'>
                <p className='text-[11px] font-mono text-neutral-500 mb-1.5'>
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span aria-hidden> · </span>
                  <span>{post.readingMinutes} min</span>
                </p>
                <h3 className='text-lg font-bold text-white mb-1.5 group-hover:text-teal-100 transition-colors'>
                  {post.title}
                </h3>
                <p className='text-neutral-500 text-sm leading-relaxed line-clamp-2'>
                  {post.description}
                </p>
              </div>
            </Link>
          ))}

          <MagneticButton strength={0.15} className='w-full'>
            <Link
              href='/blogs'
              className='flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border border-neutral-800 text-sm text-neutral-300 hover:text-teal-300 hover:border-teal-800/60 transition-colors'
            >
              All essays →
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
