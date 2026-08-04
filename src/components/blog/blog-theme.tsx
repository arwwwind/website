'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

export type BlogTheme = 'dark' | 'light';

type BlogThemeContextValue = {
  theme: BlogTheme;
  toggle: () => void;
  setTheme: (theme: BlogTheme) => void;
};

const BlogThemeContext = createContext<BlogThemeContextValue | null>(null);

const STORAGE_KEY = 'arwwwind-blog-theme';

function readStoredTheme(): BlogTheme {
  if (typeof window === 'undefined') return 'light';
  try {
    const fromDom = document.documentElement.getAttribute('data-blog-theme');
    if (fromDom === 'light' || fromDom === 'dark') return fromDom;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* ignore */
  }
  return 'light';
}

function syncDom(theme: BlogTheme) {
  const root = document.documentElement;
  const body = document.body;

  root.setAttribute('data-blog-theme', theme);
  root.classList.toggle('blog-theme-light', theme === 'light');
  root.classList.toggle('blog-theme-dark', theme === 'dark');

  // Portfolio chrome uses Tailwind `dark` on <body>; keep it aligned on blog pages.
  body.classList.toggle('dark', theme === 'dark');

  const bg = theme === 'light' ? '#f4f0ea' : '#1e1b18';
  const fg = theme === 'light' ? '#4a443f' : '#d2c9bf';
  body.style.setProperty('background-color', bg, 'important');
  body.style.setProperty('color', fg, 'important');
}

function clearDom() {
  const root = document.documentElement;
  const body = document.body;
  root.removeAttribute('data-blog-theme');
  root.classList.remove('blog-theme-light', 'blog-theme-dark');
  body.classList.add('dark');
  body.style.removeProperty('background-color');
  body.style.removeProperty('color');
}

const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function BlogThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<BlogTheme>('light');
  const [ready, setReady] = useState(false);

  useIsoLayoutEffect(() => {
    const initial = readStoredTheme();
    setThemeState(initial);
    syncDom(initial);
    setReady(true);
    return () => clearDom();
  }, []);

  useIsoLayoutEffect(() => {
    if (!ready) return;
    syncDom(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme, ready]);

  const setTheme = useCallback((next: BlogTheme) => {
    setThemeState(next);
  }, []);

  const toggle = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <BlogThemeContext.Provider value={{ theme, toggle, setTheme }}>
      <div
        className={`blog-shell blog-shell--${theme}`}
        data-theme={theme}
        suppressHydrationWarning
      >
        {children}
      </div>
    </BlogThemeContext.Provider>
  );
}

export function useBlogTheme() {
  const ctx = useContext(BlogThemeContext);
  if (!ctx) {
    throw new Error('useBlogTheme must be used within BlogThemeProvider');
  }
  return ctx;
}
