import Link from 'next/link';
import Image from 'next/image';
import { BlogTimestamp } from '@/components/blog/blog-timestamp';
import { BlogCover } from '@/components/blog/blog-cover';
import { formatPostDate, getAllPosts } from '@/lib/blog-posts';

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <main className='blog-main'>
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
