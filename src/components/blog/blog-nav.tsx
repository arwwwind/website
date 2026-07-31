'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/blog/theme-toggle';

export function BlogNav() {
  return (
    <header className='blog-nav'>
      <div className='blog-nav__inner'>
        <Link href='/' className='blog-nav__logo' aria-label='arwwwind home'>
          <img src='/logo.png' alt='arwwwind' className='blog-nav__logo-img' />
        </Link>

        <div className='blog-nav__actions'>
          <ThemeToggle />
          <Link href='/#hero' className='blog-nav__cta'>
            Get in touch
          </Link>
        </div>
      </div>
    </header>
  );
}
