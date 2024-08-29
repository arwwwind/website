import { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import './globals.scss';

import 'lineicons/web-font/lineicons.css';

export const metadata: Metadata = {
  title: 'arwwwind | Software Developer, Problem Solver, Human and Dog Dad',
  description: `I’m a Senior Software Engineer and Solutions Architect with a strong specialization in frontend and backend development. I bring years of experience working with large enterprises, small businesses, and startups, delivering high-impact, scalable solutions tailored to business needs. My expertise includes modern technologies such as React, Next.js, Python, Node.js, Django, Flask, Express, and AWS. Whether it's developing robust web applications, API integration, or cloud-based solutions, I’m committed to creating efficient, scalable, and maintainable systems that drive business success.`,
  openGraph: {
    type: 'website',
    url: 'https://arwwwind.com',
    title: 'arwwwind | Software Developer, Problem Solver, Human and Dog Dad',
    description: `I’m a Senior Software Engineer and Solutions Architect with a strong specialization in frontend and backend development. I bring years of experience working with large enterprises, small businesses, and startups, delivering high-impact, scalable solutions tailored to business needs. My expertise includes modern technologies such as React, Next.js, Python, Node.js, Django, Flask, Express, and AWS. Whether it's developing robust web applications, API integration, or cloud-based solutions, I’m committed to creating efficient, scalable, and maintainable systems that drive business success.`,
    images: '/cover.png',
  },
};

const IBM = IBM_Plex_Mono({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const currentYear = new Date().getFullYear();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={IBM.className}>
      <body className={`dark`}>
        <nav className='backdrop-blur fixed w-full z-20 top-0 start-0 border-b border-gray-600 dark:border-gray-800'>
          <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
            <a
              href='https://arwwwind.com/?ref=nav'
              className='flex items-center space-x-3 rtl:space-x-reverse'
            >
              <img src='/logo.png' className='h-5 md:h-8' alt='arwwwind Logo' />
            </a>
            <div className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
              <a
                href='mailto:hi@arwwwind.com?subject=Hello%20Arvind%2C'
                className='hover:underline me-4 md:me-6'
              >
                <button
                  type='button'
                  className='text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center bg-gradient-to-b from-rose-600 to-rose-900 hover:from-rose-600 hover:to-purple-900 transition ease-in-out delay-150 hover:scale-110'
                >
                  Get in touch
                </button>
              </a>
            </div>
            <div
              className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
              id='navbar-sticky'
            >
              <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0'>
                <li>
                  <a
                    href='#timeline'
                    className='block py-2 px-3 text-gray-300 rounded hover:bg-rose-600 md:hover:bg-transparent hover:underline md:hover:text-rose-700 md:p-0'
                    aria-current='page'
                  >
                    Experience
                  </a>
                </li>
                <li>
                  <a
                    href='#work'
                    className='block py-2 px-3 text-gray-300 rounded hover:bg-rose-600 md:hover:bg-transparent hover:underline md:hover:text-rose-700 md:p-0'
                  >
                    Work
                  </a>
                </li>
                <li>
                  <a
                    href='#posts'
                    className='block py-2 px-3 text-gray-300 rounded hover:bg-rose-600 md:hover:bg-transparent hover:underline md:hover:text-rose-700 md:p-0'
                  >
                    Posts
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className='pt-[70px]'>{children}</div>
        <footer className='bg-slate-950 rounded-lg shadow m-4 dark:bg-neutral-950'>
          <div className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
            <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400 flex'>
              {`© ${currentYear} `}{' '}
              <a
                href='https://arwwwind.com/?ref=footer'
                className='hover:underline px-2'
              >
                {` arwwwind `}
              </a>
            </span>
            <span className='text-gray-400 text-sm'>
              <i>See you on the other side!</i>
            </span>
            <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
              <li>
                <a
                  className='hover:underline me-4 md:me-6'
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
                  className='hover:underline me-4 md:me-6'
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/arwwwind'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline me-4 md:me-6'
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}
