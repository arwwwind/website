'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid = ({ children, className, ...props }: BentoGridProps) => (
  <div
    className={cn('bento-grid grid grid-cols-1 md:grid-cols-3 gap-4', className)}
    {...props}
  >
    {children}
  </div>
);

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  gradient?: string;
}

export const BentoCard = ({
  title,
  description,
  icon,
  className,
  gradient,
}: BentoCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // mouse-tracking spotlight, written as CSS vars so paint stays cheap
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'bento-card group relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 p-6 md:p-8 cursor-default',
        'transition-all duration-300 hover:border-neutral-700 hover:-translate-y-1',
        className
      )}
    >
      {/* gradient wash on hover */}
      {gradient && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100',
            gradient
          )}
        />
      )}
      {/* spotlight that follows the cursor */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        style={{
          background:
            'radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(45,212,191,0.07), transparent 70%)',
        }}
      />

      <div className='relative z-10 flex h-full flex-col'>
        <div className='flex items-start justify-between mb-5'>
          <div className='w-10 h-10 rounded-lg border border-neutral-800 bg-neutral-900/80 flex items-center justify-center'>
            {icon}
          </div>
          <span
            aria-hidden='true'
            className='bento-num text-xs font-mono text-neutral-700 group-hover:text-neutral-500 transition-colors'
          />
        </div>
        <h3 className='mb-2.5 text-lg md:text-xl font-bold text-white leading-tight'>
          {title}
        </h3>
        <p className='text-xs md:text-sm text-neutral-400 leading-relaxed'>
          {description}
        </p>
      </div>
    </div>
  );
};
