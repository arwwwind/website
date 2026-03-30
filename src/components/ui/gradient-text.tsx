'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}

export const GradientText = ({
  children,
  className,
  as: Tag = 'span',
}: GradientTextProps) => {
  return (
    <motion.span
      className={cn(
        'inline-block bg-gradient-to-r from-teal-400 via-rose-300 to-teal-400 bg-[length:200%_auto] bg-clip-text text-transparent',
        className
      )}
      animate={{ backgroundPosition: ['0% center', '200% center'] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      // Render as the semantic tag via style override if needed — span wrapper is fine
    >
      {children}
    </motion.span>
  );
};
