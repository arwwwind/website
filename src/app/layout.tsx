import { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.scss';

import 'lineicons/web-font/lineicons.css';
import { NavLinks } from '@/components/ui/nav-scroll';
import { MagneticButton } from '@/components/ui/magnetic-button';

export const metadata: Metadata = {
  title: 'Arvind Narayan — Staff ML & AI Engineer',
  description:
    'Staff ML & AI Engineer with 9+ years at Yahoo, upGrad, Egen.ai, and GATC Health. Building production AI systems: hybrid RAG platforms, GNNs for molecular ML, clinical analytics, and LLM infrastructure. Python, PyTorch, AWS, GraphQL. Founder at Superscaled.',
  keywords: [
    'Arvind Narayan',
    'arwwwind',
    'ML Engineer',
    'AI Engineer',
    'Machine Learning',
    'LLM Engineer',
    'Data Engineer',
    'Python',
    'PyTorch',
    'AWS SageMaker',
    'GraphQL',
    'Staff Engineer',
    'AI Systems',
    'Foundation Models',
  ],
  authors: [{ name: 'Arvind Narayan', url: 'https://arwwwind.com' }],
  creator: 'Arvind Narayan',
  metadataBase: new URL('https://arwwwind.com'),
  alternates: {
    canonical: 'https://arwwwind.com',
  },
  openGraph: {
    type: 'profile',
    url: 'https://arwwwind.com',
    title: 'Arvind Narayan — Staff ML & AI Engineer',
    description:
      'Staff ML & AI Engineer. Building production ML systems, LLM pipelines, and distributed data infrastructure at scale.',
    images: [
      {
        url: 'https://arwwwind.com/cover.png',
        width: 1200,
        height: 630,
        alt: 'Arvind Narayan — Staff ML & AI Engineer',
      },
    ],
    siteName: 'arwwwind',
    firstName: 'Arvind',
    lastName: 'Narayan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arvind Narayan — Staff ML & AI Engineer',
    description:
      'Staff ML & AI Engineer. Building production ML systems, LLM pipelines, and distributed data infrastructure.',
    images: ['https://arwwwind.com/cover.png'],
  },
};

const IBM = IBM_Plex_Mono({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const currentYear = new Date().getFullYear();

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arvind Narayan',
  alternateName: 'arwwwind',
  url: 'https://arwwwind.com',
  email: 'hi@arwwwind.com',
  jobTitle: 'Staff ML & AI Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'GATC Health',
  },
  knowsAbout: [
    'Machine Learning',
    'Artificial Intelligence',
    'LLMs',
    'Data Engineering',
    'Python',
    'PyTorch',
    'scikit-learn',
    'AWS',
    'GraphQL',
    'PostgreSQL',
    'Redis',
    'MongoDB',
    'GNNs',
    'Foundation Models',
  ],
  sameAs: [
    'https://www.linkedin.com/in/arwwwind/',
    'https://github.com/arwwwind',
  ],
  image: 'https://arwwwind.com/avatar.png',
  alumniOf: [
    { '@type': 'Organization', name: 'Egen.ai' },
    { '@type': 'Organization', name: 'Yahoo' },
    { '@type': 'Organization', name: 'upGrad' },
    { '@type': 'Organization', name: 'Fulfil.io' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={IBM.className}>
      <body className='dark'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
            <div className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
              <MagneticButton>
                <a
                  href='mailto:hi@arwwwind.com?subject=Hello%20Arvind%2C'
                  className='hover:underline me-4 md:me-6'
                >
                  <button
                    type='button'
                    className='text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center bg-gradient-to-b from-rose-600 to-rose-900 hover:from-rose-600 hover:to-purple-900 transition ease-in-out'
                  >
                    Get in touch
                  </button>
                </a>
              </MagneticButton>
            </div>
          </div>
        </nav>
        <div className='pt-[70px]'>{children}</div>
        <SpeedInsights />
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
              <span className='text-gray-500 text-xs italic'>
                Built with TypeScript, Next.js, and too much coffee.
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
      </body>
    </html>
  );
}
