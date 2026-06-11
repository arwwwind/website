'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

/**
 * Cursor-reactive hero portrait. Unlike the old hover-only 3D card, this
 * tracks the pointer across the whole viewport: the portrait tilts and
 * drifts toward the cursor with GSAP inertia while the glow behind it
 * moves the opposite way for parallax depth. Touch devices and
 * reduced-motion users get the static portrait.
 */
export function HeroAvatar() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const root = rootRef.current;
    const tilt = tiltRef.current;
    const glow = glowRef.current;
    if (!root || !tilt || !glow) return;

    gsap.set(tilt, { transformPerspective: 900 });

    // quickTo gives each axis its own smoothed tween — re-targeted on
    // every pointermove without allocating new tweens
    const to = {
      rx: gsap.quickTo(tilt, 'rotationX', { duration: 0.7, ease: 'power3' }),
      ry: gsap.quickTo(tilt, 'rotationY', { duration: 0.7, ease: 'power3' }),
      x: gsap.quickTo(tilt, 'x', { duration: 0.8, ease: 'power3' }),
      y: gsap.quickTo(tilt, 'y', { duration: 0.8, ease: 'power3' }),
      gx: gsap.quickTo(glow, 'x', { duration: 1.1, ease: 'power3' }),
      gy: gsap.quickTo(glow, 'y', { duration: 1.1, ease: 'power3' }),
    };

    const clamp = gsap.utils.clamp(-1, 1);

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      // normalized pointer offset from the portrait centre; reaches full
      // strength about half a viewport away
      const dx = clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth * 0.5));
      const dy = clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight * 0.5));
      to.ry(dx * 14);
      to.rx(-dy * 10);
      to.x(dx * 16);
      to.y(dy * 12);
      to.gx(-dx * 24);
      to.gy(-dy * 18);
    };

    const onLeave = () => {
      to.ry(0);
      to.rx(0);
      to.x(0);
      to.y(0);
      to.gx(0);
      to.gy(0);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf([tilt, glow]);
    };
  }, []);

  return (
    <div ref={rootRef} className='relative py-20 flex items-center justify-center'>
      {/* counter-moving glow for parallax depth */}
      <div
        ref={glowRef}
        aria-hidden='true'
        className='pointer-events-none absolute w-[240px] h-[240px] md:w-[360px] md:h-[360px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.16),rgba(251,113,133,0.05)_55%,transparent_72%)] blur-2xl will-change-transform'
      />
      <div ref={tiltRef} className='relative mt-4 will-change-transform'>
        <Image
          className='inline-block h-[200px] w-auto md:h-[320px] rounded-full ring-[3px] ring-teal-600/70 shadow-[0_0_40px_rgba(20,184,166,0.2)]'
          width={320}
          height={320}
          src='/avatar.png'
          alt='Arvind Narayan — Staff AI/ML Engineer'
          priority
        />
      </div>
    </div>
  );
}
