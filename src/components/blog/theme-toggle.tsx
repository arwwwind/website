'use client';

import { useBlogTheme } from '@/components/blog/blog-theme';

export function ThemeToggle() {
  const { theme, toggle } = useBlogTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type='button'
      onClick={() => {
        toggle();
      }}
      className='blog-theme-toggle'
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className='blog-theme-toggle__track' aria-hidden='true'>
        <span
          className={`blog-theme-toggle__thumb ${
            isDark
              ? 'blog-theme-toggle__thumb--dark'
              : 'blog-theme-toggle__thumb--light'
          }`}
        />
      </span>
      <span className='blog-theme-toggle__label'>
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
}
