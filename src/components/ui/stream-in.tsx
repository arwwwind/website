'use client';

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';

type StreamOptions = {
  /** Ms between normal steps. */
  intervalMs?: number;
  /** Extra pause before the first step. */
  startDelay?: number;
  /** Longer pause before indices in `pauseBefore` (e.g. new categories). */
  pauseMs?: number;
  pauseBefore?: ReadonlySet<number> | readonly number[];
  /** Gate streaming until the ref scrolls into view. Default true. */
  whenVisible?: boolean;
  enabled?: boolean;
};

/**
 * Reveals `0..length` one step at a time — LLM-style streaming cadence.
 */
export function useSequentialStream(
  length: number,
  {
    intervalMs = 48,
    startDelay = 120,
    pauseMs = 220,
    pauseBefore,
    whenVisible = true,
    enabled = true,
  }: StreamOptions = {}
): { ref: RefObject<HTMLDivElement>; count: number; done: boolean } {
  const ref = useRef<HTMLDivElement>(null!);
  const [armed, setArmed] = useState(!whenVisible);
  const [count, setCount] = useState(0);
  const pauseRef = useRef(pauseBefore);
  pauseRef.current = pauseBefore;

  useEffect(() => {
    if (!whenVisible) {
      setArmed(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setArmed(true);
      setCount(length);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [whenVisible, length]);

  useEffect(() => {
    if (!armed || !enabled || count >= length) return;

    const pauses = pauseRef.current;
    let isPause = false;
    if (pauses != null) {
      isPause =
        pauses instanceof Set
          ? pauses.has(count)
          : (pauses as readonly number[]).includes(count);
    }

    const wait =
      count === 0 ? startDelay : isPause ? pauseMs : intervalMs;
    const t = setTimeout(() => setCount((c) => c + 1), wait);
    return () => clearTimeout(t);
  }, [
    armed,
    enabled,
    count,
    length,
    intervalMs,
    startDelay,
    pauseMs,
  ]);

  return { ref, count, done: count >= length };
}

/** Fade/slide a cell in — fast token-like appearance. */
export function StreamCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        animation: 'stream-cell-in 180ms cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      {children}
    </div>
  );
}
