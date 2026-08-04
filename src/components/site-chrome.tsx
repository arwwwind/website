'use client';

import { usePathname } from 'next/navigation';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NavLinks } from '@/components/ui/nav-scroll';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { BootLoader } from '@/components/ui/boot-loader';
import { SmoothScroll } from '@/components/ui/smooth-scroll';
import { Cursor } from '@/components/ui/cursor';
import { AnalyticsEvents } from '@/components/analytics-events';

const currentYear = new Date().getFullYear();

export function SiteChrome({
  children,
  isBot,
}: {
  children: React.ReactNode;
  isBot: boolean;
}) {
  const pathname = usePathname();
  const isBlog = pathname?.startsWith('/blogs') ?? false;
  const isCv = pathname === '/cv' || pathname?.startsWith('/cv/') === true;
  const isMinimal = isBlog || isCv;

  if (isMinimal) {
    return (
      <>
        {!isBot && <AnalyticsEvents />}
        {children}
        {!isBot && <SpeedInsights />}
      </>
    );
  }

  return (
    <>
      {!isBot && (
        <>
          <BootLoader />
          <SmoothScroll />
          <Cursor />
          <AnalyticsEvents />
          <div className='grain' aria-hidden='true' />
        </>
      )}
      <nav className='backdrop-blur-md bg-black/60 fixed w-full z-50 top-0 start-0 border-b border-neutral-800/50'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <a
            href='https://arwwwind.com/?ref=nav'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <img src='/logo.png' className='h-5 md:h-8' alt='arwwwind Logo' />
          </a>
          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
            id='navbar-sticky'
          >
            <NavLinks />
          </div>
          <div className='flex md:order-2 items-center gap-2 sm:gap-3'>
            <MagneticButton>
              <a href='mailto:hi@arwwwind.com?subject=Hello%20Arvind%2C'>
                <button
                  type='button'
                  className='text-white ring-2 ring-rose-500/50 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-gradient-to-b from-rose-600 to-rose-900 hover:from-rose-500 hover:to-rose-800 transition-all'
                >
                  Get in touch
                </button>
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href='/cv' target='_blank' rel='noopener noreferrer'>
                <button
                  type='button'
                  className='text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-700 ring-2 ring-neutral-700 hover:ring-teal-700/50 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center transition-all'
                >
                  CV
                </button>
              </a>
            </MagneticButton>
          </div>
        </div>
      </nav>
      <div className='w-full max-w-none pt-[70px]'>{children}</div>
      {!isBot && <SpeedInsights />}
      <footer className='bg-neutral-950 border-t border-neutral-800 mt-8'>
        <div className='w-full mx-auto max-w-screen-xl p-6 md:p-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <span className='text-sm text-gray-500 flex items-center gap-1'>
              {`© ${currentYear} `}
              <a
                href='https://arwwwind.com/?ref=footer'
                className='hover:underline px-1 text-gray-400'
              >
                arwwwind
              </a>
            </span>
            <span className='text-gray-500 text-xs'>
              Designed &amp; coded by Arvind Narayan.
            </span>
            <ul className='flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500'>
              <li>
                <a
                  className='hover:text-rose-400 transition-colors'
                  href='mailto:hi@arwwwind.com?subject=Hello%20Arvind%2C'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href='https://www.linkedin.com/in/arwwwind/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-rose-400 transition-colors'
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/arwwwind'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-rose-400 transition-colors'
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
