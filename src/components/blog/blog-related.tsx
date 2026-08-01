import Link from 'next/link';
import {
  getEndRelated,
  getMidRelated,
  getSeriesNav,
  type RelatedCard,
} from '@/lib/related-content';

function RelatedCardLink({
  card,
  variant = 'ad',
}: {
  card: RelatedCard;
  variant?: 'ad' | 'compact';
}) {
  return (
    <Link
      href={card.href}
      className={
        variant === 'ad' ? 'blog-related blog-related--ad' : 'blog-related blog-related--compact'
      }
    >
      <span className='blog-related__eyebrow'>{card.eyebrow}</span>
      <span className='blog-related__title'>{card.title}</span>
      <span className='blog-related__blurb'>{card.description}</span>
      <span className='blog-related__cta'>
        {card.cta}
        <span aria-hidden> →</span>
      </span>
    </Link>
  );
}

/** Mid-article ad-like interstitial for a curated related piece. */
export function BlogRelatedAd({ slug }: { slug: string }) {
  const card = getMidRelated(slug);
  if (!card) return null;
  return (
    <aside className='blog-related-wrap' aria-label='Related reading'>
      <RelatedCardLink card={card} variant='ad' />
    </aside>
  );
}

/** Series banner under the header — next/prev in the rope-sellers series, etc. */
export function BlogSeriesBanner({ slug }: { slug: string }) {
  const nav = getSeriesNav(slug);
  if (!nav) return null;

  const { series, prev, next } = nav;
  const continueTo = next ?? prev;
  if (!continueTo) return null;

  const isNext = Boolean(next);
  const partLabel = isNext
    ? `Part ${series.part + 1}`
    : `Part ${series.part - 1}`;

  return (
    <aside className='blog-series' aria-label={`${series.label} series`}>
      <p className='blog-series__eyebrow'>
        {series.label}
        <span aria-hidden> · </span>
        {partLabel}
      </p>
      <Link href={`/blogs/${continueTo.slug}`} className='blog-series__link'>
        <span className='blog-series__label'>
          {isNext ? 'Continue the series' : 'Start with part 1'}
        </span>
        <span className='blog-series__title'>{continueTo.title}</span>
        <span className='blog-series__cta'>
          Read more
          <span aria-hidden> →</span>
        </span>
      </Link>
    </aside>
  );
}

/** End-of-article related stack, placed before BlogHook. */
export function BlogContinueReading({ slug }: { slug: string }) {
  const cards = getEndRelated(slug);
  if (cards.length === 0) return null;

  return (
    <aside className='blog-continue' aria-label='Continue reading'>
      <p className='blog-continue__eyebrow'>Continue reading</p>
      <ul className='blog-continue__list'>
        {cards.map((card) => (
          <li key={card.href}>
            <RelatedCardLink card={card} variant='compact' />
          </li>
        ))}
      </ul>
    </aside>
  );
}
