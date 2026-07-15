'use client';

import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { runCrypticReveal } from '@/components/ui/cryptic-text';

/**
 * Cycles through words with a cryptographic decrypt transition —
 * symbols scramble and lock left-to-right into each new phrase.
 */
export const FlipWords = ({
  words,
  duration = 3000,
  className,
  waitForBoot = false,
}: {
  words: string[];
  duration?: number;
  className?: string;
  /** Wait for homepage boot loader before the first decrypt. */
  waitForBoot?: boolean;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0] ?? '');
  const [display, setDisplay] = useState('');
  const [busy, setBusy] = useState(true);
  const [armed, setArmed] = useState(!waitForBoot);

  useEffect(() => {
    if (!waitForBoot) return;
    if (window.__booted) {
      setArmed(true);
      return;
    }
    const onBoot = () => setArmed(true);
    window.addEventListener('boot:done', onBoot, { once: true });
    const t = setTimeout(() => setArmed(true), 4500);
    return () => {
      window.removeEventListener('boot:done', onBoot);
      clearTimeout(t);
    };
  }, [waitForBoot]);

  const advance = useCallback(() => {
    const idx = words.indexOf(currentWord);
    const next = words[(idx + 1) % words.length] ?? words[0];
    setBusy(true);
    setCurrentWord(next);
  }, [currentWord, words]);

  useEffect(() => {
    if (!armed || busy) return;
    const t = setTimeout(advance, duration);
    return () => clearTimeout(t);
  }, [armed, busy, duration, advance]);

  useEffect(() => {
    if (!armed) return;
    const stop = runCrypticReveal(currentWord, setDisplay, {
      cps: 28,
      flipsPerChar: 2,
      scrambleWindow: 3,
      onComplete: () => setBusy(false),
    });
    return stop;
  }, [armed, currentWord]);

  const sizer = words.reduce((a, b) => (a.length >= b.length ? a : b), '');

  return (
    <span
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
