import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import { BlogThemeProvider } from '@/components/blog/blog-theme';
import { BlogNav } from '@/components/blog/blog-nav';
import { DEFAULT_OG_IMAGE, SITE_URL, indexFollowRobots } from '@/lib/seo';
import './blogs.scss';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Blog — Arvind Narayan',
    template: '%s',
  },
  description:
    "Arvind Narayan's blog — engineering, AI, machine learning, and opinions I probably shouldn't say out loud at work.",
  keywords: [
    'Arvind Narayan blog',
    'arwwwind',
    'machine learning',
    'AI engineering',
    'XGBoost',
    'tabular ML',
    'Staff AI Engineer',
  ],
  authors: [{ name: 'Arvind Narayan', url: SITE_URL }],
  creator: 'Arvind Narayan',
  alternates: {
    types: {
      'application/rss+xml': `${SITE_URL}/blogs/feed.xml`,
    },
  },
  robots: indexFollowRobots,
  openGraph: {
    siteName: 'arwwwind',
    locale: 'en_US',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Arvind Narayan — Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@arwwwind',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('arwwwind-blog-theme');if(t!=='light'&&t!=='dark')t='dark';var r=document.documentElement;r.setAttribute('data-blog-theme',t);r.classList.add(t==='light'?'blog-theme-light':'blog-theme-dark');r.classList.remove(t==='light'?'blog-theme-dark':'blog-theme-light');document.body.style.setProperty('background-color',t==='light'?'#f4f0ea':'#1e1b18','important');document.body.style.setProperty('color',t==='light'?'#4a443f':'#d2c9bf','important');}catch(e){}})();`,
        }}
      />
      <BlogThemeProvider>
        <BlogNav />
        {children}
        <footer className='blog-footer'>
          <a href='/'>← arwwwind</a>
          <span aria-hidden='true'> · </span>
          writing, not marketing
        </footer>
      </BlogThemeProvider>
    </div>
  );
}
