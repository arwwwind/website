import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import { BlogThemeProvider } from '@/components/blog/blog-theme';
import { BlogNav } from '@/components/blog/blog-nav';
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
  authors: [{ name: 'Arvind Narayan', url: 'https://arwwwind.com' }],
  creator: 'Arvind Narayan',
  alternates: {
    canonical: 'https://arwwwind.com/blogs',
    types: {
      'application/rss+xml': 'https://arwwwind.com/blogs/feed.xml',
    },
  },
  openGraph: {
    title: 'Blog — Arvind Narayan',
    description:
      "Arvind Narayan's blog — engineering, AI, machine learning, and opinions I probably shouldn't say out loud at work.",
    url: 'https://arwwwind.com/blogs',
    type: 'website',
    siteName: 'arwwwind',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Arvind Narayan',
    description:
      "Engineering, AI, machine learning, and opinions from Arvind Narayan.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': 'https://arwwwind.com/blogs#blog',
  url: 'https://arwwwind.com/blogs',
  name: 'Arvind Narayan — Blog',
  description:
    "Arvind Narayan's blog — engineering, AI, machine learning, and opinions.",
  inLanguage: 'en-US',
  publisher: {
    '@type': 'Person',
    '@id': 'https://arwwwind.com/#person',
    name: 'Arvind Narayan',
    url: 'https://arwwwind.com',
  },
  author: {
    '@id': 'https://arwwwind.com/#person',
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
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
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
