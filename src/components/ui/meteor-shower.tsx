'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Meteor {
  id: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
  width: number;
}

interface MeteorShowerProps {
  count?: number;
}

export const MeteorShower = ({ count = 18 }: MeteorShowerProps) => {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    setMeteors(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.floor(Math.random() * 100)}%`,
        top: `${Math.floor(Math.random() * 40)}%`,
        delay: Math.random() * 6,
        duration: 2.5 + Math.random() * 3,
        width: 60 + Math.random() * 80,
      }))
    );
  }, [count]);

  return (
    <div className='pointer-events-none absolute inset-0 overflow-hidden'>
      {meteors.map((m) => (
        <motion.span
          key={m.id}
          className='absolute h-px rounded-full bg-gradient-to-r from-white via-white/80 to-transparent'
          style={{
            left: m.left,
            top: m.top,
            width: `${m.width}px`,
            rotate: '215deg',
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, 200, 350, 500],
            y: [0, 200, 350, 500],
          }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            repeatDelay: 2 + Math.random() * 4,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};
