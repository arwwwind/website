'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { runCrypticReveal } from '@/components/ui/cryptic-text';

interface AsciiFigureProps {
  lines: string[];
  caption: string;
  className?: string;
  /**
   * When false, stays blank until flipped true (for stacked/pinned panels
   * that all share the same viewport intersection).
   */
  armed?: boolean;
  /** Larger type + padding for capability showcase panels. */
  size?: 'sm' | 'lg';
}

/**
 * Monospace diagram that decrypts into view when scrolled in —
 * characters resolve left-to-right with symbol-flipping ahead of the front.
 */
export function AsciiFigure({
  lines,
  caption,
  className,
  armed = true,
  size = 'sm',
}: AsciiFigureProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const capRef = useRef<HTMLElement>(null);
  const full = lines.join('\n');
  const startedRef = useRef(false);
  const large = size === 'lg';

  useEffect(() => {
    const pre = preRef.current;
    const cap = capRef.current;
    if (!pre) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pre.textContent = full;
      if (cap) cap.style.opacity = '1';
      return;
    }

    pre.textContent = full.replace(/\S/g, ' ');
    if (cap) cap.style.opacity = '0';
    startedRef.current = false;

    let stop: (() => void) | undefined;
    let io: IntersectionObserver | null = null;

    const play = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      stop = runCrypticReveal(
        full,
        (display) => {
          pre.textContent = display;
        },
        {
          mode: 'fill',
          cps: 90,
          flipsPerChar: 1,
          scrambleWindow: 10,
          onComplete: () => {
            if (cap) {
              cap.style.transition = 'opacity 0.6s ease';
              cap.style.opacity = '1';
            }
          },
        }
      );
    };

    if (!armed) {
      return () => {
        stop?.();
      };
    }

    io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        play();
        io?.disconnect();
      },
      { threshold: 0.2 }
    );
    io.observe(pre);

    return () => {
      io?.disconnect();
      stop?.();
    };
  }, [full, armed]);

  return (
    <figure className={cn('min-w-0', className)}>
      <div
        className={cn(
          'rounded-lg border border-neutral-800/80 bg-neutral-900/40 overflow-x-auto',
          large ? 'px-5 py-5 md:px-6 md:py-6' : 'px-4 py-3'
        )}
      >
        <pre
          ref={preRef}
          aria-label={caption}
          className={cn(
            'text-neutral-400 whitespace-pre',
            large
              ? 'text-[11px] md:text-[13px] leading-[1.75]'
              : 'text-[10px] md:text-[11px] leading-[1.65]'
          )}
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
        className={cn(
          'mt-2 font-mono tracking-[0.18em] text-neutral-600 uppercase',
          large ? 'text-[10px] md:text-[11px]' : 'text-[9px] md:text-[10px]'
        )}
      >
        {caption}
      </figcaption>
    </figure>
  );
}
