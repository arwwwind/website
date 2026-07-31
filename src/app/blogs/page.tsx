import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BlogTimestamp } from '@/components/blog/blog-timestamp';
import { BlogCover } from '@/components/blog/blog-cover';
import { JsonLd } from '@/components/seo/json-ld';
import { formatPostDate, getAllPosts } from '@/lib/blog-posts';
import {
  BLOG_ID,
  DEFAULT_OG_IMAGE,
  PERSON_ID,
  SITE_URL,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbJsonLd,
  indexFollowRobots,
  pageOpenGraph,
  pageTwitter,
} from '@/lib/seo';

const title = 'Blog — Arvind Narayan';
const description =
  "Arvind Narayan's blog — engineering, AI, machine learning, and opinions I probably shouldn't say out loud at work.";
const url = absoluteUrl('/blogs');

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
    types: {
      'application/rss+xml': `${SITE_URL}/blogs/feed.xml`,
    },
  },
  robots: indexFollowRobots,
  openGraph: pageOpenGraph({
    title,
    description,
    url,
  }),
  twitter: pageTwitter({ title, description }),
};

export default function BlogsPage() {
  const posts = getAllPosts();

  const blogJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': BLOG_ID,
      url,
      name: 'Arvind Narayan — Blog',
      description,
      inLanguage: 'en-US',
      isPartOf: { '@id': WEBSITE_ID },
      publisher: { '@id': PERSON_ID },
      author: { '@id': PERSON_ID },
      image: DEFAULT_OG_IMAGE,
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        '@id': `${SITE_URL}/blogs/${post.slug}#article`,
        headline: post.title,
        url: `${SITE_URL}/blogs/${post.slug}`,
        datePublished: `${post.date}T12:00:00.000Z`,
        description: post.description,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${url}#collection`,
      url,
      name: title,
      description,
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: {
        '@type': 'ItemList',
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: posts.length,
        itemListElement: posts.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${SITE_URL}/blogs/${post.slug}`,
          name: post.title,
        })),
      },
    },
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blogs' },
    ]),
  ];

  return (
    <main className='blog-main'>
      <JsonLd data={blogJsonLd} />
      <article className='blog-intro'>
        <blockquote className='blog-intro__quote'>
          &ldquo;Reading a personal blog is like walking through the front door
          of someone&apos;s mind. Anyone who steps inside gets to see where they
          actually live.&rdquo;
        </blockquote>

        <BlogTimestamp />

        <div className='blog-intro__body'>
          <p>
            <span className='blog-dropcap' aria-hidden='true'>
              W
            </span>
            <span className='sr-only'>W</span>elcome to my blog. I write because it
            helps me think better - turns out you don&apos;t actually know what
            you believe until you try to put it into full sentences.
          </p>
          <p>
            I write for the joy of stumbling on facets of my own thoughts I
            rarely run into otherwise. I write so you can understand who I
            actually am - my hot takes, my opinions, my particular slant on
            things.
          </p>
          <p>
            Hopefully I don&apos;t sound like an old man rambling before his
            first coffee of the morning.
          </p>
        </div>

        <Image
          src='/blog/welcome.gif'
          alt='Welcome reaction gif'
          width={496}
          height={279}
          unoptimized
          className='blog-intro__gif'
          priority
        />
      </article>

      <section className='blog-index' aria-labelledby='blog-index-heading'>
        <h2 id='blog-index-heading' className='blog-index__heading'>
          Posts
        </h2>
        <ul className='blog-index__list'>
          {posts.map((post) => (
            <li key={post.slug} className='blog-index__item'>
              <Link
                href={`/blogs/${post.slug}`}
                className='blog-index__card'
              >
                <BlogCover
                  basePath={post.coverPath}
                  alt={post.coverAlt}
                  className='blog-index__cover'
                />
                <div className='blog-index__body'>
                  <p className='blog-index__meta'>
                    <time dateTime={post.date}>
                      {formatPostDate(post.date)}
                    </time>
                    <span aria-hidden='true'> · </span>
                    <span>{post.readingMinutes} min</span>
                  </p>
                  <h3 className='blog-index__title'>{post.title}</h3>
                  <p className='blog-index__desc'>{post.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
