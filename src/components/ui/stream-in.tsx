'use client';

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { enqueueCryptic, getCrypticSpeed } from '@/lib/cryptic-orchestrator';
import { shouldSkipMotion } from '@/lib/is-bot';

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
  /**
   * Hold a slot in the global document-order queue so this stream only
   * advances when everything above it has finished. Default true.
   */
  queue?: boolean;
};

/**
 * Reveals `0..length` one step at a time — LLM-style streaming cadence.
 * By default joins the global cryptic queue so the whole page streams top→bottom.
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
    queue = true,
  }: StreamOptions = {}
): { ref: RefObject<HTMLDivElement>; count: number; done: boolean } {
  const ref = useRef<HTMLDivElement>(null!);
  const [visible, setVisible] = useState(!whenVisible);
  const [playing, setPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const pauseRef = useRef(pauseBefore);
  pauseRef.current = pauseBefore;
  const lengthRef = useRef(length);
  lengthRef.current = length;
  const finishTurnRef = useRef<(() => void) | null>(null);
  const finishedTurnRef = useRef(false);

  useEffect(() => {
    if (!whenVisible) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    if (shouldSkipMotion()) {
      setVisible(true);
      setPlaying(true);
      setCount(length);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [whenVisible, length]);

  // Take a turn in the global queue (or start immediately if queue=false).
  useEffect(() => {
    if (shouldSkipMotion()) {
      setPlaying(true);
      setCount(lengthRef.current);
      return;
    }
    if (!visible || !enabled) return;

    if (!queue) {
      setPlaying(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    finishedTurnRef.current = false;
    const handle = enqueueCryptic(node, (ctx) => {
      setPlaying(true);
      finishTurnRef.current = () => {
        if (finishedTurnRef.current) return;
        finishedTurnRef.current = true;
        finishTurnRef.current = null;
        ctx.complete();
      };

      // Empty stream — release the turn immediately.
      if (lengthRef.current <= 0) {
        finishTurnRef.current();
        return () => {};
      }

      return () => {
        // Orchestrator skip/dispose: dump remaining steps and release.
        setCount(lengthRef.current);
        finishTurnRef.current?.();
      };
    });
    handle.arm();

    return () => {
      handle.dispose();
      finishTurnRef.current = null;
      setPlaying(false);
    };
  }, [visible, enabled, queue, length]);

  // Step forward while we hold the queue turn.
  useEffect(() => {
    if (!playing || !enabled) return;

    if (count >= length) {
      finishTurnRef.current?.();
      return;
    }

    const pauses = pauseRef.current;
    let isPause = false;
    if (pauses != null) {
      isPause =
        pauses instanceof Set
          ? pauses.has(count)
          : (pauses as readonly number[]).includes(count);
    }

    const speed = Math.max(1, getCrypticSpeed());
    if (speed >= 24) {
      setCount(length);
      return;
    }

    const base =
      count === 0 ? startDelay : isPause ? pauseMs : intervalMs;
    const wait = Math.max(8, base / speed);
    const t = setTimeout(() => setCount((c) => c + 1), wait);
    return () => clearTimeout(t);
  }, [
    playing,
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
