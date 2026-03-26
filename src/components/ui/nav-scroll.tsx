'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const SECTIONS = ['hero', 'what-i-do', 'timeline'];

const links = [
  { id: 'what-i-do', label: 'What I Do' },
  { id: 'timeline', label: 'Experience' },
];

export const NavLinks = () => {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers = SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const threshold = id === 'timeline' ? 0.1 : 0.4;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <ul className='flex items-center gap-6'>
      {links.map((link) => (
        <li key={link.id} className='relative'>
          <a
            href={`#${link.id}`}
            className={cn(
              'block py-1 text-sm transition-colors duration-200',
              active === link.id
                ? 'text-white'
                : 'text-neutral-400 hover:text-neutral-200'
            )}
          >
            {link.label}
          </a>
          {active === link.id && (
            <motion.span
              layoutId='nav-underline'
              className='absolute -bottom-0.5 left-0 right-0 h-px bg-rose-500'
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </li>
      ))}
    </ul>
  );
};
