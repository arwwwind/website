'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { runCrypticReveal } from '@/components/ui/cryptic-text';
import { enqueueCryptic } from '@/lib/cryptic-orchestrator';
import { shouldSkipMotion } from '@/lib/is-bot';
import { useCrawlMode } from '@/components/ui/crawl-mode';

/**
 * Cycles through words with a cryptographic decrypt transition.
 * The first reveal joins the global page queue so the hero streams
 * top→bottom; later cycles run independently.
 */
export const FlipWords = ({
  words,
  duration = 3000,
  className,
  waitForBoot = false,
  /** Join the global LLM stream queue for the first reveal. Default true. */
  queue = true,
}: {
  words: string[];
  duration?: number;
  className?: string;
  waitForBoot?: boolean;
  queue?: boolean;
}) => {
  const isBot = useCrawlMode();
  const rootRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(isBot ? (words[0] ?? '') : '');
  const [busy, setBusy] = useState(!isBot);
  /** True once the first (queued) reveal has finished. */
  const [live, setLive] = useState(isBot || !queue);
  /** Bootstrap already painted index 0 — skip one reveal effect. */
  const skipRevealRef = useRef(true);
  const currentWord = words[index] ?? words[0] ?? '';

  // Boot + first reveal (optionally queued).
  useEffect(() => {
    if (isBot || shouldSkipMotion()) {
      setDisplay(words[0] ?? '');
      setBusy(false);
      setLive(true);
      return;
    }

    const node = rootRef.current;
    if (!node) return;

    let cancelBoot: (() => void) | undefined;
    let handle: ReturnType<typeof enqueueCryptic> | null = null;
    let stopLocal: (() => void) | undefined;
    const first = words[0] ?? '';

    const afterBoot = (fn: () => void) => {
      if (!waitForBoot) {
        fn();
        return;
      }
      if (window.__booted) {
        fn();
        return;
      }
      const onBoot = () => fn();
      window.addEventListener('boot:done', onBoot, { once: true });
      const t = setTimeout(fn, 4500);
      return () => {
        window.removeEventListener('boot:done', onBoot);
        clearTimeout(t);
      };
    };

    if (queue) {
      handle = enqueueCryptic(node, (ctx) => {
        let settled = false;
        const settle = () => {
          if (settled) return;
          settled = true;
          setDisplay(first);
          setBusy(false);
          setLive(true);
          ctx.complete();
        };
        setBusy(true);
        const stop = runCrypticReveal(first, setDisplay, {
          cps: 28,
          flipsPerChar: 2,
          scrambleWindow: 3,
          getSpeed: ctx.getSpeed,
          onComplete: settle,
        });
        return () => {
          stop();
          settle();
        };
      });
      cancelBoot = afterBoot(() => handle?.arm()) ?? undefined;
    } else {
      cancelBoot =
        afterBoot(() => {
          setBusy(true);
          stopLocal = runCrypticReveal(first, setDisplay, {
            cps: 28,
            flipsPerChar: 2,
            scrambleWindow: 3,
            onComplete: () => {
              setBusy(false);
              setLive(true);
            },
          });
        }) ?? undefined;
    }

    return () => {
      cancelBoot?.();
      handle?.dispose();
      stopLocal?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBot, waitForBoot, queue]);

  const advance = useCallback(() => {
    setBusy(true);
    setIndex((i) => (i + 1) % Math.max(words.length, 1));
  }, [words.length]);

  // Hold on each word, then advance.
  useEffect(() => {
    if (isBot || shouldSkipMotion()) return;
    if (!live || busy) return;
    const t = setTimeout(advance, duration);
    return () => clearTimeout(t);
  }, [live, busy, duration, advance, isBot]);

  // Decrypt on index changes after the first queued reveal.
  useEffect(() => {
    if (isBot || shouldSkipMotion()) return;
    if (!live) return;
    if (skipRevealRef.current) {
      skipRevealRef.current = false;
      return;
    }

    const stop = runCrypticReveal(currentWord, setDisplay, {
      cps: 28,
      flipsPerChar: 2,
      scrambleWindow: 3,
      onComplete: () => setBusy(false),
    });
    return stop;
  }, [index, live, currentWord, isBot]);

  const sizer = words.reduce((a, b) => (a.length >= b.length ? a : b), '');

  if (isBot) {
    return (
      <span
        className={cn(
          'inline-block text-left text-neutral-900 dark:text-neutral-100 px-2',
          className
        )}
      >
        {words[0]}
      </span>
    );
  }

  return (
    <span
      ref={rootRef}
      className={cn(
        'relative z-10 inline-block text-left text-neutral-900 dark:text-neutral-100 px-2',
        className
      )}
      aria-label={currentWord}
    >
      <span
        aria-hidden='true'
        className='invisible pointer-events-none whitespace-nowrap'
      >
        {sizer}
      </span>
      <span
        aria-hidden='true'
        className='absolute left-2 top-0 whitespace-nowrap'
      >
        {display}
      </span>
    </span>
  );
};
