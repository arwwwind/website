'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AuroraBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const AuroraBackground = ({ children, className }: AuroraBackgroundProps) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Layer 1: Rose/purple slow sweep */}
      <motion.div
        className='pointer-events-none absolute inset-0 z-0'
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(225,29,72,0.18), transparent),' +
            'radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139,92,246,0.14), transparent)',
          backgroundSize: '400% 400%',
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      {/* Layer 2: Indigo/cyan subtle pulse */}
      <motion.div
        className='pointer-events-none absolute inset-0 z-0'
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 60% 20%, rgba(79,70,229,0.12), transparent)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Layer 3: Warm rose glow bottom */}
      <motion.div
        className='pointer-events-none absolute inset-0 z-0'
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(190,18,60,0.10), transparent)',
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <div className='relative z-10'>{children}</div>
    </div>
  );
};
