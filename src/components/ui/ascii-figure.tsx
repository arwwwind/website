'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/** glyphs that flicker just ahead of the reveal front, like tokens resolving */
const GLYPHS = '.:+*#%@01';

interface AsciiFigureProps {
  lines: string[];
  caption: string;
  className?: string;
}

/**
 * Monospace diagram that "types itself out" when scrolled into view —
 * characters resolve left-to-right with a short scramble window ahead of
 * the front, like a generative model streaming its output.
 */
export function AsciiFigure({ lines, caption, className }: AsciiFigureProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const capRef = useRef<HTMLElement>(null);
  const full = lines.join('\n');

  useEffect(() => {
    const pre = preRef.current;
    const cap = capRef.current;
    if (!pre) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // blank out non-whitespace so the box keeps its final size
    pre.textContent = full.replace(/\S/g, ' ');
    if (cap) cap.style.opacity = '0';

    let raf = 0;
    let started = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();

        const chars = full.split('');
        const solid: number[] = [];
        chars.forEach((c, i) => {
          if (!/\s/.test(c)) solid.push(i);
        });

        const SCRAMBLE = 8; // glyphs flickering ahead of the front
        const SPEED = 3; // glyphs resolved per frame
        let revealed = 0;

        const tick = () => {
          revealed = Math.min(revealed + SPEED, solid.length);
          const out = chars.map((c) => (/\s/.test(c) ? c : ' '));
          for (let k = 0; k < revealed; k++) {
            out[solid[k]] = chars[solid[k]];
          }
          const scrambleEnd = Math.min(revealed + SCRAMBLE, solid.length);
          for (let k = revealed; k < scrambleEnd; k++) {
            out[solid[k]] = GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }
          pre.textContent = out.join('');

          if (revealed < solid.length) {
            raf = requestAnimationFrame(tick);
          } else if (cap) {
            cap.style.transition = 'opacity 0.6s ease';
            cap.style.opacity = '1';
          }
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );
    io.observe(pre);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [full]);

  return (
    <figure className={cn('min-w-0', className)}>
      <div className='rounded-lg border border-neutral-800/80 bg-neutral-900/40 px-4 py-3 overflow-x-auto'>
        <pre
          ref={preRef}
          aria-label={caption}
          className='text-[10px] md:text-[11px] leading-[1.65] text-neutral-400 whitespace-pre'
          style={{
            fontFamily:
              'var(--font-plex-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontVariantLigatures: 'none',
            fontFeatureSettings: '"liga" 0, "calt" 0',
            letterSpacing: 0,
            tabSize: 2,
          }}
        >
          {full}
        </pre>
      </div>
      <figcaption
        ref={capRef}
        className='mt-2 font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-neutral-600 uppercase'
      >
        {caption}
      </figcaption>
    </figure>
  );
}
