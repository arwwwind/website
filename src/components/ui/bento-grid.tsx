'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid = ({ children, className }: BentoGridProps) => (
  <div
    className={cn(
      'grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[13rem]',
      className
    )}
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
}: BentoCardProps) => (
  <motion.div
    className={cn(
      'group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-6 cursor-default',
      className
    )}
    whileHover={{ scale: 1.02, y: -3 }}
    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
  >
    {/* Gradient overlay on hover */}
    {gradient && (
      <div
        className={cn(
          'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100',
          gradient
        )}
      />
    )}
    <div className='relative z-10 flex h-full flex-col justify-between'>
      <div className='mb-3 w-8 h-8'>{icon}</div>
      <div>
        <h3 className='mb-2 text-base md:text-lg font-bold text-white leading-tight'>
          {title}
        </h3>
        <p className='text-xs md:text-sm text-neutral-400 leading-relaxed'>
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);
