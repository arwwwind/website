import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import {
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  indexFollowRobots,
  pageOpenGraph,
  pageTwitter,
} from '@/lib/seo';
import { CvThemeProvider } from '@/components/cv/cv-theme';
import './cv.scss';

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

const title = 'CV — Arvind Narayan';
const description =
  'Staff AI/ML Engineer — CV. Production ML, hybrid RAG, GNNs, clinical analytics. GATC Health, Egen.ai, upGrad, Yahoo.';
const url = absoluteUrl('/cv');

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  robots: indexFollowRobots,
  openGraph: pageOpenGraph({
    title,
    description,
    url,
  }),
  twitter: pageTwitter({ title, description }),
  other: {
    'og:image': DEFAULT_OG_IMAGE,
  },
};

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var r=document.documentElement;r.setAttribute('data-cv-theme','light');r.classList.add('cv-theme-light');r.classList.remove('blog-theme-dark','blog-theme-light');document.body.style.setProperty('background-color','#f4f0ea','important');document.body.style.setProperty('color','#4a443f','important');document.body.classList.remove('dark');}catch(e){}})();`,
        }}
      />
      <CvThemeProvider>{children}</CvThemeProvider>
    </div>
  );
}
