'use client';

import { AnimatedCounter } from '@/components/ui/animated-counter';

export const HeroStats = () => {
  return (
    <div className='flex flex-wrap gap-8 px-2 mt-8'>
      <div className='flex flex-col'>
        <span className='text-3xl font-bold text-white'>
          <AnimatedCounter to={9} suffix='+' />
        </span>
        <span className='text-xs text-neutral-500 mt-0.5'>Years Engineering</span>
      </div>
      <div className='flex flex-col'>
        <span className='text-3xl font-bold text-white'>
          <AnimatedCounter to={20} suffix='M+' />
        </span>
        <span className='text-xs text-neutral-500 mt-0.5'>Users Impacted</span>
      </div>
      <div className='flex flex-col'>
        <span className='text-3xl font-bold text-white'>
          <AnimatedCounter to={27} suffix='B' />
        </span>
        <span className='text-xs text-neutral-500 mt-0.5'>Models In Production</span>
      </div>
    </div>
  );
};
