'use client';

import { AnimatedCounter } from '@/components/ui/animated-counter';
import { StreamCell, useSequentialStream } from '@/components/ui/stream-in';
import { CrypticText } from '@/components/ui/cryptic-text';
import { useEffect, useRef } from 'react';

const STATS = [
  { to: 9, suffix: '+', label: 'Years Engineering' },
  { to: 20, suffix: 'M+', label: 'Users Impacted' },
  { to: 150, suffix: '+', label: 'ML Models Trained & Deployed' },
] as const;

export const HeroStats = ({
  active = false,
  onComplete,
}: {
  active?: boolean;
  onComplete?: () => void;
}) => {
  const { ref, count, done } = useSequentialStream(STATS.length, {
    whenVisible: false,
    enabled: active,
    intervalMs: 140,
    startDelay: 100,
  });
  const fired = useRef(false);

  useEffect(() => {
    if (done && active && !fired.current) {
      fired.current = true;
      onComplete?.();
    }
  }, [done, active, onComplete]);

  if (!active && count === 0) {
    return <div ref={ref} className='px-2 mt-8 min-h-[3.5rem]' aria-hidden />;
  }

  return (
    <div ref={ref} className='flex flex-wrap gap-8 px-2 mt-8'>
      {STATS.slice(0, count).map((stat) => (
        <StreamCell key={stat.label}>
          <div className='flex flex-col'>
            <span className='text-3xl font-bold text-white'>
              <AnimatedCounter to={stat.to} suffix={stat.suffix} />
            </span>
            <span className='text-xs text-neutral-500 mt-0.5'>
              <CrypticText
                text={stat.label}
                cps={24}
                flipsPerChar={2}
                scrambleWindow={3}
              />
            </span>
          </div>
        </StreamCell>
      ))}
    </div>
  );
};
