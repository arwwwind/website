'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function track(event: string, params: Record<string, string> = {}) {
  window.gtag?.('event', event, params);
}

/**
 * Site-wide GA4 event tracking via one delegated click listener — no
 * per-link wiring needed. Complements enhanced measurement (which already
 * covers scroll depth, outbound clicks, and file downloads) with named,
 * report-friendly events for the interactions that matter:
 *
 *  book_call        — Calendly links (hero + anywhere)
 *  email_click      — mailto: links (hero, nav "Get in touch", footer)
 *  social_click     — LinkedIn / GitHub, with `network` param
 *  superscaled_click— superscaled.com links
 *  case_study_click — /work/<slug> cards, with `slug` param
 *  cv_download      — cv.pdf
 *  nav_click        — in-page anchor nav, with `target` param
 *
 * Every event carries `section`: the id of the enclosing <section>, so you
 * can tell a hero email click from a footer one.
 */
export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href]') as
        | HTMLAnchorElement
        | null;
      if (!a) return;

      const href = a.getAttribute('href') ?? '';
      const section =
        a.closest('section[id]')?.id ??
        (a.closest('footer') ? 'footer' : a.closest('nav') ? 'nav' : 'page');

      if (href.includes('calendly.com')) {
        track('book_call', { section });
      } else if (href.startsWith('mailto:')) {
        track('email_click', { section });
      } else if (href.includes('linkedin.com')) {
        track('social_click', { network: 'linkedin', section });
      } else if (href.includes('github.com')) {
        track('social_click', { network: 'github', section });
      } else if (href.includes('superscaled.com')) {
        track('superscaled_click', { section });
      } else if (href.startsWith('/work/')) {
        track('case_study_click', { slug: href.replace('/work/', ''), section });
      } else if (href.endsWith('cv.pdf')) {
        track('cv_download', { section });
      } else if (href.startsWith('#')) {
        track('nav_click', { target: href.slice(1), section });
      }
    };

    document.addEventListener('click', onClick, { capture: true, passive: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
