'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';

/** Glyphs that flicker while a character is still decrypting. */
export const CRYPTIC_GLYPHS = '$#%@&*+=?!<>/\\|[]{}01XxAaZz';

export type CrypticOptions = {
  /**
   * Base characters-per-second for short strings (~18 chars).
   * Effective speed scales up automatically with text length.
   */
  cps?: number;
  /** Random flips each unresolved char gets before locking. Default 3 (fewer on long text). */
  flipsPerChar?: number;
  /** How many unresolved glyphs trail the reveal front. Default scales with length. */
  scrambleWindow?: number;
  /** Delay before starting (ms). */
  delay?: number;
  /**
   * `grow` — string length expands as it types (default; headings / FlipWords).
   * `fill` — full length reserved; glyphs resolve in place (ASCII diagrams).
   */
  mode?: 'grow' | 'fill';
  /** Called once the full string has resolved. */
  onComplete?: () => void;
};

function randomGlyph(): string {
  return CRYPTIC_GLYPHS[(Math.random() * CRYPTIC_GLYPHS.length) | 0];
}

/** Non-whitespace length drives speed — longer copy resolves faster. */
function adaptiveParams(
  target: string,
  opts: Pick<CrypticOptions, 'cps' | 'flipsPerChar' | 'scrambleWindow'>
) {
  const solid = target.replace(/\s/g, '').length || 1;
  const baseCps = opts.cps ?? 18;
  // ~1× at 18 chars, ~2× at 72, ~4× at 288 (sqrt curve — snappy, not frantic)
  const lengthScale = Math.max(1, Math.sqrt(solid / 18));
  const cps = baseCps * lengthScale;

  const baseFlips = opts.flipsPerChar ?? 3;
  // Long passages need fewer lock-flips or total time still balloons
  const flipsPerChar =
    solid > 120
      ? Math.max(1, Math.round(baseFlips * 0.4))
      : solid > 50
        ? Math.max(1, Math.round(baseFlips * 0.65))
        : baseFlips;

  const scrambleWindow =
    opts.scrambleWindow ?? Math.min(8, 3 + Math.floor(solid / 50));

  return { cps, flipsPerChar, scrambleWindow };
}

/**
 * Cryptographic typewriter: length grows while unresolved chars scramble
 * through symbols until they lock onto the real character.
 *
 * e.g. "Arvind" → `$` → `$#` → `%$D` → `A@5` → `A#D4` → `Ar` → …
 * Speed auto-scales with text length (longer → faster).
 */
export function runCrypticReveal(
  target: string,
  onFrame: (display: string) => void,
  options: CrypticOptions = {}
): () => void {
  const { delay = 0, mode = 'grow', onComplete } = options;
  const { cps, flipsPerChar, scrambleWindow } = adaptiveParams(target, options);

  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    onFrame(target);
    onComplete?.();
    return () => {};
  }

  let raf = 0;
  let delayTimer: ReturnType<typeof setTimeout> | null = null;
  let cancelled = false;
  let revealed = 0;
  let flipBudget = flipsPerChar;
  let lastTs = 0;
  const msPerChar = 1000 / Math.max(cps, 1);
  const chars = target.split('');

  const paint = () => {
    if (mode === 'fill') {
      const out = chars.map((c, i) => {
        if (/\s/.test(c)) return c;
        if (i < revealed) return c;
        if (i < revealed + scrambleWindow) return randomGlyph();
        return ' ';
      });
      onFrame(out.join(''));
      return;
    }

    // grow: only paint through the scramble frontier
    const frontier = Math.min(revealed + scrambleWindow, chars.length);
    const out: string[] = [];
    for (let i = 0; i < frontier; i++) {
      const c = chars[i];
      if (/\s/.test(c)) out.push(c);
      else if (i < revealed) out.push(c);
      else out.push(randomGlyph());
    }
    onFrame(out.join(''));
  };

  const skipWhitespace = () => {
    while (revealed < chars.length && /\s/.test(chars[revealed])) {
      revealed += 1;
    }
  };

  const tick = (ts: number) => {
    if (cancelled) return;
    if (!lastTs) lastTs = ts;
    const elapsed = ts - lastTs;

    paint();

    if (elapsed >= msPerChar) {
      lastTs = ts;
      skipWhitespace();
      if (revealed >= chars.length) {
        onFrame(target);
        onComplete?.();
        return;
      }
      flipBudget -= 1;
      if (flipBudget <= 0) {
        revealed += 1;
        flipBudget = flipsPerChar;
        skipWhitespace();
      }
    }

    if (revealed >= chars.length) {
      onFrame(target);
      onComplete?.();
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  const start = () => {
    if (cancelled) return;
    if (!target) {
      onFrame('');
      onComplete?.();
      return;
    }
    paint();
    raf = requestAnimationFrame(tick);
  };

  if (delay > 0) {
    delayTimer = setTimeout(start, delay);
  } else {
    start();
  }

  return () => {
    cancelled = true;
    if (delayTimer != null) clearTimeout(delayTimer);
    cancelAnimationFrame(raf);
  };
}

type CrypticTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div';
  /** Re-run when this changes (e.g. FlipWords cycle). */
  replayKey?: string | number;
  /** Start only when scrolled into view. Default false (play on mount). */
  whenVisible?: boolean;
  /** Play immediately if already in view / after boot. Default true when !whenVisible. */
  autoPlay?: boolean;
  /** Wait for the homepage boot loader (`boot:done`) before starting. */
  waitForBoot?: boolean;
} & CrypticOptions;

/**
 * Declarative cryptographic text reveal. Reserves layout with an invisible
 * copy of the final string so the line doesn't jump while typing.
 */
export function CrypticText({
  text,
  className,
  style,
  as: Tag = 'span',
  replayKey,
  whenVisible = false,
  autoPlay = !whenVisible,
  waitForBoot = false,
  cps,
  flipsPerChar,
  scrambleWindow,
  delay,
  mode,
  onComplete,
}: CrypticTextProps) {
  const [display, setDisplay] = useState('');
  const rootRef = useRef<HTMLElement | null>(null);
  const startedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    startedRef.current = false;
    setDisplay('');

    let stop: (() => void) | undefined;
    let io: IntersectionObserver | null = null;
    let bootTimer: ReturnType<typeof setTimeout> | null = null;

    const play = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      stop = runCrypticReveal(text, setDisplay, {
        cps,
        flipsPerChar,
        scrambleWindow,
        delay,
        mode,
        onComplete: () => onCompleteRef.current?.(),
      });
    };

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
      bootTimer = setTimeout(fn, 4500);
      return () => {
        window.removeEventListener('boot:done', onBoot);
        if (bootTimer != null) clearTimeout(bootTimer);
      };
    };

    let cancelBoot: (() => void) | undefined;

    if (whenVisible) {
      const node = rootRef.current;
      if (!node) return;
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            cancelBoot = afterBoot(play) ?? undefined;
            io?.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      io.observe(node);
    } else if (autoPlay) {
      cancelBoot = afterBoot(play) ?? undefined;
    }

    return () => {
      stop?.();
      io?.disconnect();
      cancelBoot?.();
    };
  }, [
    text,
    replayKey,
    whenVisible,
    autoPlay,
    waitForBoot,
    cps,
    flipsPerChar,
    scrambleWindow,
    delay,
    mode,
  ]);

  return (
    <Tag
      ref={rootRef as never}
      className={cn(
        'relative',
        Tag === 'span' ? 'inline-block' : 'block'
      )}
      style={style}
      aria-label={text}
    >
      <span
        aria-hidden='true'
        className={cn(
          'invisible pointer-events-none',
          Tag === 'span' ? undefined : 'block',
          className
        )}
      >
        {text}
      </span>
      <span
        aria-hidden='true'
        className={cn(
          'absolute inset-0 whitespace-pre-wrap',
          className
        )}
      >
        {display}
      </span>
    </Tag>
  );
}
