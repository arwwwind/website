'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({
  from = 0,
  to,
  suffix = '',
  duration = 1.8,
  className,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const node = ref.current;
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        node.textContent = Math.round(value) + suffix;
      },
    });
    return () => controls.stop();
  }, [isInView, from, to, suffix, duration]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {from}{suffix}
    </span>
  );
};
