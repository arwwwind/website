'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogCover } from '@/components/blog/blog-cover';
import { CrypticText } from '@/components/ui/cryptic-text';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { formatPostDate, getAllPosts, type BlogPost } from '@/lib/blog-posts';
import { pickRandom } from '@/lib/related-content';

const HOME_POST_LIMIT = 4;
const allPosts = getAllPosts();

/**
 * Home Writing section — exactly 4 random essays + CTA to /blogs.
 */
export function BlogShowcase() {
  const [posts, setPosts] = useState<BlogPost[]>(() =>
    allPosts.slice(0, HOME_POST_LIMIT)
  );

  useEffect(() => {
    setPosts(pickRandom(allPosts, HOME_POST_LIMIT));
  }, []);

  return (
    <section
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
            <span className='hidden md:inline text-xs font-mono text-neutral-600 tabular-nums pb-1'>
              {String(posts.length).padStart(2, '0')} of{' '}
              {String(allPosts.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <ul
          className='grid grid-cols-1 sm:grid-cols-2 gap-5'
          role='list'
          data-reveal-group
        >
          {posts.slice(0, HOME_POST_LIMIT).map((post, i) => (
            <li key={post.slug}>
              <Link
                href={`/blogs/${post.slug}`}
                className='group block h-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 hover:border-teal-800/50 transition-colors'
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
                  <h3 className='text-lg font-bold text-white mb-1.5 group-hover:text-teal-100 transition-colors leading-snug'>
                    {post.title}
                  </h3>
                  <p className='text-neutral-500 text-sm leading-relaxed line-clamp-2'>
                    {post.description}
                  </p>
                  <span className='inline-flex items-center gap-1 mt-3 text-sm text-teal-400 font-medium'>
                    Read more
                    <span className='transition-transform duration-300 group-hover:translate-x-1'>
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className='mt-8 flex justify-center' data-reveal>
          <MagneticButton strength={0.15}>
            <Link
              href='/blogs'
              className='group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-teal-800/50 bg-teal-950/30 text-sm text-teal-300 hover:text-teal-200 hover:border-teal-700/70 hover:bg-teal-950/50 transition-colors'
            >
              <span>View all blogs</span>
              <span className='text-xs group-hover:translate-x-1 transition-transform'>
                →
              </span>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
