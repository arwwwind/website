'use client';

import { useEffect, useLayoutEffect } from 'react';

function applyCvTheme() {
  const root = document.documentElement;
  const body = document.body;

  root.setAttribute('data-cv-theme', 'light');
  root.classList.add('cv-theme-light');
  root.classList.remove('blog-theme-dark', 'blog-theme-light');
  body.classList.remove('dark');
  body.style.setProperty('background-color', '#f4f0ea', 'important');
  body.style.setProperty('color', '#4a443f', 'important');
}

function clearCvTheme() {
  const root = document.documentElement;
  const body = document.body;

  root.removeAttribute('data-cv-theme');
  root.classList.remove('cv-theme-light');
  body.classList.add('dark');
  body.style.removeProperty('background-color');
  body.style.removeProperty('color');
}

const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Applies CV light theme and restores the portfolio dark chrome on leave. */
export function CvThemeProvider({ children }: { children: React.ReactNode }) {
  useIsoLayoutEffect(() => {
    applyCvTheme();
    return () => clearCvTheme();
  }, []);

  return (
    <div className='cv-shell' data-theme='light'>
      {children}
    </div>
  );
}
