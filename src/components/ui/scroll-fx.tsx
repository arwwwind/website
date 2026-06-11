'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

declare global {
  interface Window {
    __booted?: boolean;
  }
}

/**
 * Landing-page motion choreography, driven by data attributes so the page
 * markup (and its content) stays untouched:
 *
 *  data-hero          — staggered entrance after the boot loader exits
 *  data-hero-avatar   — scale-in + idle float
 *  data-hero-parallax — drifts up / fades as the hero scrolls away
 *  data-split         — heading split into masked words, revealed on scroll
 *  data-reveal        — single fade-up on scroll
 *  data-reveal-group  — children stagger-fade on scroll
 *  data-reveal-chips  — fast micro-stagger for dense chip grids
 */
export function ScrollFX() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── hero entrance (waits for the boot loader) ──────────────────
      const heroEls = gsap.utils.toArray<HTMLElement>('[data-hero]');
      const avatar = document.querySelector<HTMLElement>('[data-hero-avatar]');

      const intro = gsap.timeline({ paused: true });
      if (heroEls.length) {
        intro.fromTo(
          heroEls,
          { y: 30, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.09,
            clearProps: 'filter',
            immediateRender: true,
          },
          0.05
        );
      }
      if (avatar) {
        intro.fromTo(
          avatar,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            immediateRender: true,
          },
          0.15
        );
        intro.add(() => {
          gsap.to(avatar, {
            y: -10,
            duration: 3.2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        });
      }

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        intro.play();
      };
      if (window.__booted) {
        play();
      } else {
        window.addEventListener('boot:done', play, { once: true });
        // safety net if the loader never fires (e.g. unmounted early)
        setTimeout(play, 4500);
      }

      // ── hero parallax on scroll-away ───────────────────────────────
      const parallax = document.querySelector('[data-hero-parallax]');
      if (parallax) {
        gsap.to(parallax, {
          yPercent: -9,
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '45% top',
            scrub: 0.4,
          },
        });
      }

      // ── masked word reveals for headings ───────────────────────────
      document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
        const text = el.textContent ?? '';
        if (!text.trim()) return;
        el.setAttribute('aria-label', text);
        el.innerHTML = text
          .split(/\s+/)
          .filter(Boolean)
          .map(
            (w) =>
              `<span class="sw" aria-hidden="true"><span class="swi">${w}</span></span>`
          )
          .join(' ');
        gsap.fromTo(
          el.querySelectorAll('.swi'),
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 0.85,
            ease: 'power4.out',
            stagger: 0.05,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });

      // ── generic fade-up reveals ────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 87%', once: true },
          }
        );
      });

      // ── staggered groups (bento cards, etc.) ───────────────────────
      gsap.utils
        .toArray<HTMLElement>('[data-reveal-group]')
        .forEach((groupEl) => {
          const items = Array.from(groupEl.children) as HTMLElement[];
          if (!items.length) return;
          gsap.fromTo(
            items,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: 'power3.out',
              stagger: 0.09,
              scrollTrigger: { trigger: groupEl, start: 'top 84%', once: true },
            }
          );
        });

      // ── dense chip grids: fast micro-stagger ───────────────────────
      gsap.utils
        .toArray<HTMLElement>('[data-reveal-chips]')
        .forEach((groupEl) => {
          const items = Array.from(groupEl.children) as HTMLElement[];
          if (!items.length) return;
          gsap.fromTo(
            items,
            { y: 12, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.45,
              ease: 'power2.out',
              stagger: 0.022,
              scrollTrigger: { trigger: groupEl, start: 'top 90%', once: true },
            }
          );
        });

      // ── scroll-scrubbed horizontal drift (e.g. watermark text) ─────
      gsap.utils.toArray<HTMLElement>('[data-scrub-x]').forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: 0 },
          {
            xPercent: -16,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      });

      // ── scroll-scrubbed vertical drift (decorative glows) ──────────
      gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((el) => {
        const amt = parseFloat(el.dataset.drift || '40');
        gsap.fromTo(
          el,
          { y: amt },
          {
            y: -amt,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      });

      // ── scroll progress bar ────────────────────────────────────────
      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div
      aria-hidden='true'
      className='scroll-progress fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left scale-x-0 bg-gradient-to-r from-teal-400 via-teal-300 to-rose-400'
    />
  );
}
