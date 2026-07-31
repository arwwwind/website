import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BlogCover } from '@/components/blog/blog-cover';
import { BlogDropcap } from '@/components/blog/blog-dropcap';
import { BlogHook } from '@/components/blog/blog-hook';
import { MermaidDiagram } from '@/components/blog/mermaid-diagram';
import {
  formatPostDate,
  getPostBySlug,
  postUrl,
  SITE_URL,
} from '@/lib/blog-posts';

const SLUG = 'fixing-attention';
const post = getPostBySlug(SLUG)!;
const url = postUrl(SLUG);
const ogAbsolute = `${SITE_URL}${post.ogImage}`;
const publishedIso = `${post.date}T12:00:00.000Z`;
const IMG = '/blog/fixing-attention';

const SESSION_FLOW_CHART = `
flowchart TD
  A(["Session start"]) --> B{"Known learner?"}
  B -->|no| C["Cold start<br/>LLM difficulty prior<br/>from concept text"]
  B -->|yes| D[("Load memory state<br/>D, S, last_review<br/>per concept")]

  C --> E["Candidate generation"]
  D --> E

  E --> F["REVIEW pool<br/>due_at ≤ now ONLY"]
  E --> G["NEW pool<br/>unseen concepts<br/>in interest graph"]

  F --> H{{HARD CONSTRAINT<br/>drop anything<br/>not yet due}}
  H --> I["Ranker"]
  G --> I

  I --> J["Interleave<br/>new : review ratio<br/>per learner"]
  J --> K["Availability classifier<br/>is this the right slot?"]
  K --> L[["Session feed<br/>capped: 50 clips / 20 min"]]

  L --> M(["End screen — no autoplay"])
  M --> N["Quiz — 5 items<br/>over session concepts"]
  N --> O["Map response to<br/>FSRS grade G ∈ 1..4"]
  O --> P["FSRS update<br/>D′, S′, next due_at"]
  P -.->|write back| D
`;

export const metadata: Metadata = {
  title: `${post.title} — Arvind Narayan`,
  description: post.description,
  keywords: [
    ...post.tags,
    'attention is all you need',
    'FSRS',
    'SM-2',
    'spaced repetition',
    'desirable difficulties',
    'upGrad Shorts',
    'learning feed',
    'kids screen time',
    'recommender systems',
    'Arvind Narayan',
  ],
  authors: [{ name: 'Arvind Narayan', url: SITE_URL }],
  creator: 'Arvind Narayan',
  publisher: 'Arvind Narayan',
  category: 'Machine Learning',
  alternates: {
    canonical: url,
    types: {
      'application/rss+xml': `${SITE_URL}/blogs/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'article',
    url,
    title: post.title,
    description: post.description,
    siteName: 'arwwwind',
    locale: 'en_US',
    publishedTime: publishedIso,
    modifiedTime: publishedIso,
    authors: ['Arvind Narayan'],
    tags: post.tags,
    section: 'Machine Learning',
    images: [
      {
        url: ogAbsolute,
        width: 1200,
        height: 630,
        alt: post.coverAlt,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.description,
    images: [ogAbsolute],
    creator: '@arwwwind',
  },
  other: {
    'article:published_time': publishedIso,
    'article:modified_time': publishedIso,
    'article:author': SITE_URL,
    'article:section': 'Machine Learning',
    'article:tag': post.tags.join(','),
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    name: post.title,
    description: post.description,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    datePublished: publishedIso,
    dateModified: publishedIso,
    inLanguage: 'en-US',
    wordCount: post.wordCount,
    timeRequired: `PT${post.readingMinutes}M`,
    keywords: post.tags.join(', '),
    articleSection: 'Machine Learning',
    image: [
      {
        '@type': 'ImageObject',
        url: ogAbsolute,
        width: 1200,
        height: 630,
      },
      {
        '@type': 'ImageObject',
        url: `${SITE_URL}${post.coverPath}/cover-1200.jpg`,
        width: 1200,
        height: 669,
      },
    ],
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Arvind Narayan',
      url: SITE_URL,
      jobTitle: 'Staff AI/ML Engineer',
    },
    publisher: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Arvind Narayan',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': `${SITE_URL}/blogs#blog`,
      name: 'Arvind Narayan — Blog',
      url: `${SITE_URL}/blogs`,
    },
    about: [
      ...post.tags.map((tag) => ({
        '@type': 'Thing',
        name: tag.replace(/-/g, ' '),
      })),
      {
        '@type': 'CreativeWork',
        name: 'upGrad Shorts',
        url: `${SITE_URL}/work/upgrad-shorts`,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blogs`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  },
];

export default function FixingAttentionPostPage() {
  return (
    <main className='blog-main blog-main--article'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article
        className='blog-article'
        itemScope
        itemType='https://schema.org/BlogPosting'
      >
        <link itemProp='mainEntityOfPage' href={url} />
        <meta itemProp='author' content='Arvind Narayan' />
        <meta itemProp='datePublished' content={publishedIso} />
        <meta itemProp='dateModified' content={publishedIso} />
        <meta itemProp='headline' content={post.title} />
        <meta itemProp='description' content={post.description} />
        <meta itemProp='image' content={ogAbsolute} />

        <nav className='blog-article__crumb' aria-label='Breadcrumb'>
          <ol>
            <li>
              <Link href='/blogs'>Blog</Link>
            </li>
            <li aria-current='page'>{post.title}</li>
          </ol>
        </nav>

        <header className='blog-article__header'>
          <p className='blog-article__meta'>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden='true'> · </span>
            <span>{post.readingMinutes} min read</span>
          </p>
          <h1 className='blog-article__title' itemProp='name'>
            {post.title}
          </h1>
          <p className='blog-article__dek'>{post.description}</p>
          <ul className='blog-article__tags' aria-label='Tags'>
            {post.tags.map((tag) => (
              <li key={tag}>
                <span>#{tag}</span>
              </li>
            ))}
          </ul>
        </header>

        <figure className='blog-article__cover'>
          <BlogCover
            basePath={post.coverPath}
            alt={post.coverAlt}
            priority
            className='blog-article__cover-img'
          />
          <figcaption className='sr-only'>{post.coverAlt}</figcaption>
        </figure>

        <div className='blog-prose' itemProp='articleBody'>
          <p className='blog-prose__lede'>
            <BlogDropcap word='It' /> started as low-grade irritation with the
            society I live in.
          </p>

          <p>
            Everywhere I go, heads are down. Which — fine. Do whatever you like
            on your own time. But my cab driver doomscrolls Instagram Reels at 60
            km/h while I sit in the back quietly re-reading my life insurance
            policy. The hospital staff watch Reels, loudly, outside the operation
            theatre. The metro is a carriage of bowed necks and leaking audio,
            forty people half-present and nobody fully anywhere.
          </p>

          <p>
            This is not a vibes problem. It has a body count waiting to happen.
            The distracted driver eventually meets a divider. The distracted
            nurse eventually misses a handover. The patient on pain management
            gets to recover to the soundtrack of somebody else&apos;s algorithm.
            What&apos;s next — a neurosurgeon in Meta Ray-Bans, resecting a
            glioma while catching up on his feed between sutures? Efficiency!
            Multitasking! Very 2026.
          </p>

          <p>
            The peak of the irritation arrived after I became a father.
          </p>

          <p>
            Routine check-up. Hospital waiting room. The staff are scrolling. The
            parents are scrolling. And then the part that actually landed
            somewhere in my chest: the toddlers are scrolling. Or propped in
            front of something loud and strobing and expertly engineered, by a
            system that has never once been asked whether this particular child
            should be watching this particular thing.
          </p>

          <p>
            My wife and I had done the reading before that day, so none of it was
            news. Kids under two learn shockingly little from a screen —
            researchers call it the{' '}
            <a
              href='https://www.apa.org/monitor/2020/04/cover-kids-screens'
              target='_blank'
              rel='noopener noreferrer'
            >
              transfer deficit
            </a>
            , and it shows up in imitation, in language, in emotional learning. A
            toddler who watches a person stack blocks on a screen just does not
            pick it up the way a toddler who watches you do it in the room does.
            Screens for the very young mostly displace the thing that actually
            works, which is a face.
          </p>

          <p>
            So: irritated father, engineer&apos;s brain, long drive home. And
            somewhere on that drive I had to admit the uncomfortable part.
          </p>

          <p>I helped build the problem.</p>

          <p>
            Back at upGrad, my friend Adarsh and I built a thing called{' '}
            <strong>
              <Link href='/work/upgrad-shorts'>upGrad Shorts</Link>
            </strong>
            . A TikTok-style vertical feed of short learning videos. It worked,
            in the way these things work. Decent audience, growing. NPS was fine.
            Watch time was good. People swiped for a while and said nice things
            about it in surveys.
          </p>

          <p>Then I looked at the metric that actually mattered.</p>

          <p>
            upGrad&apos;s north star is <strong>transition rate</strong> — did
            the learner&apos;s career actually move after the course? A promotion
            or a job upgrade is a positive. No change is a negative. It&apos;s a
            brutal, honest metric, because it is completely immune to how much
            you enjoyed the videos. Transition rate wasn&apos;t great before
            Shorts. Shorts launched. Transition rate stayed exactly where it was.
          </p>

          <p>
            We had built something people watched. We had not built something
            people learned from. Those are different products that happen to look
            identical inside a phone-shaped rectangle.
          </p>

          <p>
            So we tried again — at a hackathon, which is where all honest
            engineering happens. Same short-form format, but bolt on{' '}
            <strong>SM-2 spaced repetition</strong>. Content chunks tagged to a
            course. A quiz at the end of the session. The quiz result feeds a
            scheduler, and the scheduler decides what you see next. Remember
            something well and it goes away for a while. Fumble it and it comes
            back sooner.
          </p>

          <p>
            We won. There was a cheque. There was applause. And then the roadmap
            ate us both and the thing went into the drawer where good hackathon
            projects go to be quietly composted.
          </p>

          <p>
            That was five years ago. The drawer has been bugging me ever since,
            and the hospital waiting room reopened it.
          </p>

          <p>
            So: can we take the weapons of mass distraction built by our AI
            overlords and point them somewhere that isn&apos;t a
            seven-year-old&apos;s dopamine system?
          </p>

          <h2>The idea</h2>

          <p>
            Nobody needs another app. I am not going to build another app. The
            distribution already exists — YouTube Kids, Duolingo, whatever
            Instagram is calling itself this quarter. Every one of them already
            has the infra: a vertical player, a recommender, a CDN, an events
            pipeline. What they don&apos;t have is a corner of the product where
            the goal is different.
          </p>

          <figure className='blog-prose__figure'>
            <Image
              src={`${IMG}/duolingo-practice-weak-skills.png`}
              alt='Four Duolingo screens: a French skill map with Practice Weak Skills, a Weakest words list for gerunds with a Strengthen button, a correct quiz answer, and an incorrect answer with a grammar correction explaining tu-form es vs il/elle est'
              width={2022}
              height={954}
              className='blog-prose__img'
              sizes='(max-width: 672px) 100vw, 672px'
            />
            <figcaption>
              Platforms that already own the player and the habit loop — Duolingo
              included — are the distribution. What&apos;s missing is a corner
              where the scheduler, not the engagement ranker, decides what comes
              next.
            </figcaption>
          </figure>

          <p>
            So, <strong>Phase 0</strong>, deliberately unambitious:
          </p>

          <ul>
            <li>
              A short-form education section inside an app the kid already uses.
            </li>
            <li>
              Topics they actually pick. Marine mammals and their migrations.
              Constellations. Why Jupiter has more moons than you have opinions.
            </li>
            <li>
              <strong>A hard session cap.</strong> Fifty clips, or twenty
              minutes, whichever comes first. Then the feed <em>ends</em>. It
              shows an end screen. There is no next.
            </li>
            <li>Every clip is tagged to a concept.</li>
            <li>A short quiz at the end of the session.</li>
            <li>
              The quiz is not a grade. Nobody sees a score. It is fuel for a
              scheduler.
            </li>
          </ul>

          <p>
            That&apos;s it. Existing platform, existing player, one new table and
            one new service.
          </p>

          <p>
            Now, the part that makes this a different product rather than a
            re-skin:
          </p>

          <blockquote>
            The most engaging next item and the most educational next item are
            frequently not the same item.
          </blockquote>

          <p>
            Every feed you have ever used resolves that tension in favour of
            engagement, because engagement is what it can measure today and
            learning is what it could measure in a month if anybody bothered.
            This one resolves it the other way, on purpose, and eats the
            watch-time hit.
          </p>

          <h3>Why &ldquo;engaging&rdquo; is a trap</h3>

          <p>
            This isn&apos;t a moral position, it&apos;s a memory-science one, and
            it&apos;s older than the phone.
          </p>

          <p>
            Robert and Elizabeth Bjork&apos;s{' '}
            <a
              href='https://www.researchgate.net/publication/281322665'
              target='_blank'
              rel='noopener noreferrer'
            >
              New Theory of Disuse
            </a>{' '}
            splits memory into two quantities that everybody conflates:{' '}
            <strong>storage strength</strong> (how well-learned a thing is) and{' '}
            <strong>retrieval strength</strong> (how easily you can get at it{' '}
            <em>right now</em>). The non-obvious bit is that they&apos;re
            independent — and the biggest gains in storage strength happen
            exactly when retrieval strength is low. Recalling something you&apos;d
            half-forgotten builds it far more than reviewing something still warm
            in your hands. The struggle isn&apos;t a side effect of the learning.
            The struggle <em>is</em> the learning. The Bjorks named the design
            principle that falls out of this:{' '}
            <a
              href='https://burrell.edu/wp-content/uploads/2020/09/EBjorkRBjork_FABBSchapter2014-2nd-ed._WithCoverPage.pdf'
              target='_blank'
              rel='noopener noreferrer'
            >
              <strong>desirable difficulties</strong>
            </a>
            .
          </p>

          <p>
            Which means fluency is a liar. When something feels easy — because
            you watched it forty minutes ago and it&apos;s still sitting in the
            front of your head — your brain reads that ease as{' '}
            <em>I know this</em>. It is usually wrong.
          </p>

          <p>
            Roediger and Karpicke{' '}
            <a
              href='https://journals.sagepub.com/doi/abs/10.1111/j.1467-9280.2006.01693.x'
              target='_blank'
              rel='noopener noreferrer'
            >
              demonstrated this with some cruelty
            </a>{' '}
            in 2006. Students who re-read a passage did better on an immediate
            test than students who practised retrieving it. A week later the
            ordering flipped hard: the retrieval group held onto roughly 61% of
            the material, the re-readers about 40%. And here&apos;s the knife —
            the re-readers were <em>more confident</em>. They felt like they knew
            it. They didn&apos;t. Feeling good about material and having learned
            it are close to unrelated.
          </p>

          <p>
            Stack that against a watch-time feed and the conflict is total. The
            engagement-maximising move — serve the familiar, fluent, just-saw-it
            thing that reliably gets the tap — is precisely the move that
            manufactures the illusion of competence and produces nothing durable.
            A short-form learning feed optimised for engagement isn&apos;t
            neutral. It is actively, mechanically anti-learning.
          </p>

          <p>
            Timing isn&apos;t arbitrary either. The spacing effect is one of the
            sturdiest findings in the whole field — Cepeda and colleagues&apos;{' '}
            <a
              href='https://augmentingcognition.com/assets/Cepeda2006.pdf'
              target='_blank'
              rel='noopener noreferrer'
            >
              2006 meta-analysis
            </a>{' '}
            swept 839 assessments across 317 experiments — and their{' '}
            <a
              href='https://laplab.ucsd.edu/articles/Cepeda%20et%20al%202008_psychsci.pdf'
              target='_blank'
              rel='noopener noreferrer'
            >
              2008 follow-up
            </a>{' '}
            with 1,354 participants found the optimal gap between sessions scales
            with how long you need the memory to survive: roughly 20–40% of a
            one-week retention interval, dropping to about 5–10% for a one-year
            one. Want it for a week? Review in a day or two. Want it for a year?
            Wait weeks. Get the gap wrong in either direction and you&apos;ve
            burned a review for nothing.
          </p>

          <figure className='blog-prose__figure'>
            <Image
              src={`${IMG}/ebbinghaus-spacing-effect.png`}
              alt='Two panels: (a) a single Ebbinghaus forgetting curve decaying from recall probability 1 to near 0 over time, marked at half-life h; (b) a 30-day student-word learning trace where each review spikes recall back to 1 and successive decay curves flatten as stability grows'
              width={2022}
              height={672}
              className='blog-prose__img'
              sizes='(max-width: 672px) 100vw, 672px'
            />
            <figcaption>
              Forgetting after one exposure, and the same memory under spaced
              reviews. Each successful recall buys a flatter curve — which is
              exactly what a scheduler is for.
            </figcaption>
          </figure>

          <p>
            So the scheduler isn&apos;t a nice-to-have bolted onto the feed. The
            scheduler <em>is</em> the feed.
          </p>

          <h2>SM-2</h2>

          <p>
            The scheduling core, in the hackathon version, was{' '}
            <strong>SM-2</strong> — the 1987 SuperMemo algorithm by Piotr
            Woźniak. It is older than Python. It predates the web. It runs
            comfortably on a pocket calculator, and it still holds its own
            against a distressing number of things with &ldquo;neural&rdquo; in
            the name.
          </p>

          <p>
            It&apos;s almost embarrassingly simple. Each item carries an easiness
            factor (E-Factor, starting at 2.5). You rate your recall 0–5 after
            each review. The interval grows by multiplying. The E-Factor update
            is one line:
          </p>

          <p className='blog-prose__formula' role='math'>
            EF′ = EF + (0.1 − (5 − q)(0.08 + (5 − q) · 0.02)), EF′ ≥ 1.3
          </p>

          <p>
            Rate an item easy and the interval stretches. Rate it hard and the
            E-Factor sags and the item comes back sooner. That&apos;s basically
            the entire algorithm.
          </p>

          <pre>
            <code>{`from dataclasses import dataclass

@dataclass
class Card:
    ef: float = 2.5      # easiness factor
    interval: int = 0    # days
    reps: int = 0        # consecutive successful reviews

def sm2(card: Card, q: int) -> Card:
    """q in 0..5. q >= 3 counts as recall."""
    if q >= 3:
        if card.reps == 0:
            card.interval = 1
        elif card.reps == 1:
            card.interval = 6
        else:
            card.interval = round(card.interval * card.ef)
        card.reps += 1
    else:
        card.reps = 0
        card.interval = 1          # back to square one. brutal.

    card.ef = max(1.3, card.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))
    return card`}</code>
          </pre>

          <p>
            In our product the 0–5 grade was never a number the learner saw. It
            was a swipe — right for &ldquo;got it&rdquo;, left for
            &ldquo;hard&rdquo; — plus the quiz result. Nobody wants to
            self-assess on a six-point scale. Six-year-olds{' '}
            <em>definitely</em> don&apos;t.
          </p>

          <p>
            <strong>Where SM-2 falls over</strong>, and I&apos;ll be honest about
            it because these weaknesses are what motivated everything after:
          </p>

          <ul>
            <li>
              It&apos;s a hand-tuned heuristic. Those magic constants — 0.1,
              0.08, 0.02, 1.3, 6 — aren&apos;t fitted to anything. They&apos;re
              one man&apos;s excellent intuition from 1987.
            </li>
            <li>
              Every card starts at EF 2.5 regardless of the item <em>or</em> the
              learner. A card about photosynthesis and a card about the Krebs
              cycle begin life as equals, which they are emphatically not.
            </li>
            <li>
              There&apos;s no per-user model. SM-2 knows things about the card.
              It knows nothing about you.
            </li>
            <li>
              <strong>Ease hell.</strong> The Anki community&apos;s term, and
              it&apos;s a real failure mode: repeated lapses drag the E-Factor
              toward the 1.3 floor and you end up grinding the same card at
              ever-shorter intervals forever, with no mechanism to climb back
              out.
            </li>
            <li>
              A lapse resets you to a one-day interval no matter how stable the
              memory was. Forgetting a card you&apos;ve known for eight months
              and forgetting a card you learned yesterday are treated
              identically. They&apos;re not the same event.
            </li>
          </ul>

          <p>
            None of which stops it from being a perfectly reasonable default. It
            just means someone was eventually going to fit the curve properly.
          </p>

          <h2>FSRS</h2>

          <p>Someone did.</p>

          <p>
            <strong>FSRS</strong> — the Free Spaced Repetition Scheduler, built
            by Jarrett Ye and the{' '}
            <a
              href='https://github.com/open-spaced-repetition'
              target='_blank'
              rel='noopener noreferrer'
            >
              open-spaced-repetition
            </a>{' '}
            community — is now the default scheduler in Anki. It grew out of the{' '}
            <a
              href='https://www.maimemo.com/paper/'
              target='_blank'
              rel='noopener noreferrer'
            >
              DHP model from MaiMemo
            </a>
            , a variant of the <strong>DSR</strong> model, and it replaces
            SM-2&apos;s single ease number with three quantities that each mean
            something:
          </p>

          <ul>
            <li>
              <strong>D — Difficulty</strong>, on [1, 10]. How hard this item is
              for this learner.
            </li>
            <li>
              <strong>S — Stability</strong>, in days. The interval at which
              recall probability has decayed to 90%.
            </li>
            <li>
              <strong>R — Retrievability</strong>. Probability you&apos;d recall
              it right now.
            </li>
          </ul>

          <p>
            Grades collapse to four: <code>1 = again</code>,{' '}
            <code>2 = hard</code>, <code>3 = good</code>,{' '}
            <code>4 = easy</code>. Which maps beautifully onto a kids&apos; quiz
            — wrong, slow-and-right, right, instant-right — without ever showing
            a child a number.
          </p>

          <figure className='blog-prose__figure'>
            <Image
              src={`${IMG}/power-function-forgetting-curves.png`}
              alt='Fan of 105 multicolored power-function forgetting curves plotting recall probability against days since study, all starting at 1.0 and decaying at different rates over 30 days'
              width={1068}
              height={684}
              className='blog-prose__img'
              sizes='(max-width: 672px) 100vw, 672px'
            />
            <figcaption>
              One size does not forget all. Material difficulty, learner ability,
              and interference produce wildly different curves — which is why a
              single E-Factor for every card was always a lie of convenience.
            </figcaption>
          </figure>

          <h3>The actual math</h3>

          <p>
            In FSRS-6 the forgetting curve is a power law with a{' '}
            <em>trainable</em> decay:
          </p>

          <p className='blog-prose__formula' role='math'>
            R(t, S) = (1 + factor · t/S)^(−w₂₀), factor = 0.9^(−1/w₂₀) − 1
          </p>

          <p>
            The <code>factor</code> term exists purely to guarantee R(S, S) =
            90% — that is, stability keeps its definition no matter what decay
            the optimiser lands on. Invert it and you get the scheduling rule,
            which is the whole reason this is better than a multiplier:
          </p>

          <p className='blog-prose__formula' role='math'>
            I(r, S) = (S / factor) · (r^(−1/w₂₀) − 1)
          </p>

          <p>
            Read that carefully, because <code>r</code> —{' '}
            <strong>desired retention</strong> — is a knob. It&apos;s a{' '}
            <em>product decision</em> expressed as a number. Set it to 0.9 and
            you get frequent reviews and high retention. Set it to 0.8 and you
            get fewer reviews and more forgetting. SM-2 has no such knob; you get
            whatever the multiplier gives you and you like it.
          </p>

          <p>Stability after a successful review:</p>

          <p className='blog-prose__formula' role='math'>
            S&apos;ᵣ = S · (e^(w₈) · (11 − D) · S^(−w₉) · (e^(w₁₀(1−R)) − 1) ·
            w₁₅^[G=2] · w₁₆^[G=4] + 1)
          </p>

          <p>
            Ugly, but the behaviour it encodes is genuinely elegant. Let SInc =
            S′ᵣ / S (Anki&apos;s &ldquo;factor&rdquo;, morally). Three properties
            fall out:
          </p>

          <ol>
            <li>
              <strong>Higher D → smaller SInc.</strong> Hard material stabilises
              more slowly. Obviously.
            </li>
            <li>
              <strong>Higher S → smaller SInc.</strong> The better you already
              know something, the harder it is to know it <em>more</em>.
              Diminishing returns, built in.
            </li>
            <li>
              <strong>Lower R → larger SInc.</strong> The closer you were to
              forgetting, the more the successful recall buys you.
            </li>
          </ol>

          <p>
            Property 3 is the spacing effect. Not bolted on as a heuristic — it
            falls straight out of the equation. The math and Bjork&apos;s
            psychology agree without anyone having to force them to. That&apos;s
            the moment I stopped wanting to write my own scheduler.
          </p>

          <p>
            Post-lapse stability, which is where SM-2&apos;s crude reset gets
            replaced with something that has actually thought about it:
          </p>

          <p className='blog-prose__formula' role='math'>
            S′𝒻 = w₁₁ · D^(−w₁₂) · ((S+1)^(w₁₃) − 1) · e^(w₁₄(1−R))
          </p>

          <p>
            Forget a card with S = 100 and you land around 3 days. Forget one
            with S = 1 and you land around 0.3. The system remembers that you
            used to know it.
          </p>

          <p>
            And difficulty, with mean reversion — the direct fix for ease hell:
          </p>

          <p className='blog-prose__formula' role='math'>
            D₀(G) = w₄ − e^(w₅(G−1)) + 1, ΔD = −w₆(G−3), D′ = D + ΔD · (10 −
            D)/9
          </p>

          <p className='blog-prose__formula' role='math'>
            D″ = w₇ · D₀(4) + (1 − w₇) · D′
          </p>

          <p>
            That last line is the whole trick. Difficulty is continuously pulled
            back toward a sane anchor, so no card can spiral to the floor and
            stay there. The linear damping term (10 − D)/9 means difficulty moves
            less as it approaches its ceiling. Ease hell doesn&apos;t get
            patched; it gets designed out.
          </p>

          <p>
            FSRS-6 fits <strong>21 parameters</strong>, whose defaults were{' '}
            <cite>
              trained on roughly 700 million reviews from about 10,000 Anki users
            </cite>
            . On the{' '}
            <a
              href='https://github.com/open-spaced-repetition/srs-benchmark'
              target='_blank'
              rel='noopener noreferrer'
            >
              open-spaced-repetition benchmark
            </a>{' '}
            it predicts recall more accurately than SM-2 for about 99.5% of users
            tested, and simulations put the review savings at roughly a fifth to
            a third fewer reviews for the same retention.
          </p>

          <p>
            Full formulas for every version, if you want to implement it:{' '}
            <a
              href='https://github.com/open-spaced-repetition/awesome-fsrs/wiki/The-Algorithm'
              target='_blank'
              rel='noopener noreferrer'
            >
              The Algorithm wiki
            </a>
            . Gentler version:{' '}
            <a
              href='https://expertium.github.io/Algorithm.html'
              target='_blank'
              rel='noopener noreferrer'
            >
              expertium.github.io/Algorithm.html
            </a>
            .
          </p>

          <h2>Further up the ladder: what else is out there</h2>

          <p>
            I read the scheduling literature properly before writing any of this,
            and the honest summary is: <strong>
              the fancy methods are real, and they beat well-tuned classical
              baselines by less than the marketing implies.
            </strong>
          </p>

          <div
            className='blog-table-wrap'
            role='region'
            aria-label='Spaced repetition approaches compared'
          >
            <table>
              <thead>
                <tr>
                  <th scope='col'>Approach</th>
                  <th scope='col'>What it adds over SM-2</th>
                  <th scope='col'>Data needed</th>
                  <th scope='col'>Honest verdict</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>SM-2</strong> (Woźniak, 1987)
                  </td>
                  <td>Per-item ease heuristic</td>
                  <td>Almost none</td>
                  <td>Still a fine default</td>
                </tr>
                <tr>
                  <td>
                    <strong>FSRS / DSR</strong> (Ye, 2022–)
                  </td>
                  <td>
                    Fitted forgetting curve, per-card D/S/R, tunable target
                    retention
                  </td>
                  <td>Big population + your history</td>
                  <td>Real. Worth it. Use this.</td>
                </tr>
                <tr>
                  <td>
                    <strong>Half-Life Regression</strong> (
                    <a
                      href='https://research.duolingo.com/papers/settles.acl16.pdf'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Settles &amp; Meeder, ACL 2016
                    </a>
                    )
                  </td>
                  <td>Learns memory half-life from features</td>
                  <td>Millions of traces</td>
                  <td>Great — at Duolingo scale</td>
                </tr>
                <tr>
                  <td>
                    <strong>DASH / MCM</strong> (Mozer &amp; Lindsey)
                  </td>
                  <td>
                    Item difficulty + learner ability + study history on a
                    psychological memory model
                  </td>
                  <td>Moderate</td>
                  <td>
                    Principled; step-function forgetting is awkward
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>MEMORIZE</strong> (
                    <a
                      href='https://www.pnas.org/doi/10.1073/pnas.1815156116'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Tabibian et al., PNAS 2019
                    </a>
                    )
                  </td>
                  <td>
                    Optimal review times via stochastic optimal control of point
                    processes
                  </td>
                  <td>A model of memory</td>
                  <td>Elegant proof, modest empirical edge</td>
                </tr>
                <tr>
                  <td>
                    <strong>RL / KT schedulers</strong> (
                    <a
                      href='https://arxiv.org/abs/1602.07227'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Reddy 2016
                    </a>
                    ;{' '}
                    <a
                      href='https://www.mdpi.com/2076-3417/14/13/5591'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      DRL-SRS 2024
                    </a>
                    )
                  </td>
                  <td>Learns a policy over review timing</td>
                  <td>Large data + a good simulator</td>
                  <td>Promising, brittle, hard to serve</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>A few of these deserve more than a table row.</p>

          <p>
            <strong>Half-Life Regression</strong> is the one everybody cites, and
            deservedly. Settles and Meeder modelled a memory&apos;s half-life as
            a log-linear function of features and fit it on Duolingo&apos;s
            trace data, <cite>reducing error by 45%+</cite> against several
            baselines at predicting recall, with a reported ~12% lift in daily
            engagement in an operational study. Real gains. Also: fit on a volume
            of interaction data that your Phase 0 education tab will not have for
            two years.
          </p>

          <figure className='blog-prose__figure'>
            <Image
              src={`${IMG}/mcm-review-schedules.png`}
              alt='Three panels from MCM simulations: good review schedule keeping recall probability high across ten weekly material blocks, poor review schedule with steeper decay, and cumulative exam performance where good review beats poor review beats no review'
              width={2090}
              height={684}
              className='blog-prose__img'
              sizes='(max-width: 672px) 100vw, 672px'
            />
            <figcaption>
              MCM activation traces under good vs poor review schedules, and the
              cumulative-exam consequence. Spacing is not a vibe — it shows up in
              the score.
            </figcaption>
          </figure>

          <p>
            <strong>MEMORIZE</strong> is the most beautiful piece of work in the
            pile. Tabibian and colleagues formulate review timing as stochastic
            optimal control of temporal point processes and derive an optimal
            reviewing intensity in closed form. It is genuinely lovely
            mathematics. Its practical edge over a well-tuned threshold policy
            is... modest. This is a recurring theme.
          </p>

          <figure className='blog-prose__figure'>
            <Image
              src={`${IMG}/memorize-vs-baselines.png`}
              alt='Three bar charts comparing Threshold, MEMORIZE, and Uniform schedulers across 2–7 reviews at time horizons of roughly 3, 5, and 7 days; MEMORIZE bars are consistently lower on the error metric with significance stars'
              width={1280}
              height={333}
              className='blog-prose__img'
              sizes='(max-width: 672px) 100vw, 672px'
            />
            <figcaption>
              Tabibian et al. — MEMORIZE beats Threshold and Uniform across
              horizons. Real, statistically significant, and still smaller than
              the elegance of the math suggests.
            </figcaption>
          </figure>

          <figure className='blog-prose__figure'>
            <Image
              src={`${IMG}/memorize-correlation.png`}
              alt='Scatter plot with error bars of Pearson correlation coefficient versus number of repetitions from 2 to 7, all correlations negative and strongest around three repetitions'
              width={1280}
              height={614}
              className='blog-prose__img'
              sizes='(max-width: 672px) 100vw, 672px'
            />
            <figcaption>
              Negative correlation across early repetitions — another reminder
              that the timing of reviews and the outcome you care about are not
              the same as &ldquo;keep them tapping.&rdquo;
            </figcaption>
          </figure>

          <p>
            Speaking of which — two findings kept me humble and should keep you
            humble too.
          </p>

          <p>
            First: Khajah, Lindsey and Mozer showed that the dumb heuristic —{' '}
            <em>
              review the item whose predicted recall is nearest a fixed threshold
            </em>{' '}
            — performs only slightly worse than exhaustive policy search. The
            expensive optimisation barely beats the cheap rule. Which, second, is
            exactly Bjork wearing a different hat: scheduling a review for the
            moment recall has decayed to your target retention <strong>
              is
            </strong>{' '}
            engineering a desirable difficulty. Set <code>r = 0.9</code> and you
            have operationalised a 1992 psychology paper as a single float.
          </p>

          <figure className='blog-prose__figure'>
            <Image
              src={`${IMG}/threshold-scheduler-rank.png`}
              alt='Six-panel figure comparing MCM and ACT-R recall probability across schedules ranked by performance for 1-, 2-, and 3-week review delays, with markers for no-review, mu-back heuristics, and optimal theta-threshold schedulers'
              width={2102}
              height={1030}
              className='blog-prose__img'
              sizes='(max-width: 672px) 100vw, 672px'
            />
            <figcaption>
              Across models and delays, the θ-threshold scheduler (green) sits at
              the top of the ranked schedule space — barely above cheap
              heuristics.
            </figcaption>
          </figure>

          <figure className='blog-prose__figure'>
            <Image
              src={`${IMG}/threshold-heuristic-performance.png`}
              alt='Two graphs: (a) relative performance of the theta-threshold heuristic peaking near 90–95% around theta 0.3–0.4 for MCM and ACT-R; (b) relative performance of a 2-back schedule across sorted learning scenarios'
              width={1034}
              height={850}
              className='blog-prose__img'
              sizes='(max-width: 672px) 100vw, 672px'
            />
            <figcaption>
              Khajah et al. — pick a sensible threshold and you capture most of
              what exhaustive search would buy you. The expensive policy search is
              not where the value lives.
            </figcaption>
          </figure>

          <p>
            <strong>
              The reinforcement learning literature is where ambition outruns
              deployability.
            </strong>{' '}
            Reddy et al. framed review scheduling as a POMDP; more recent work
            like DRL-SRS uses a Transformer to estimate recall and a deep
            Q-network to pick intervals. Legitimately interesting, and they
            report gains. But they need a decent memory simulator to train
            against — you&apos;re optimising a policy against a model of a
            person, and the model is the weakest link — and a policy that assumes
            the learner is available exactly when the schedule says is a policy
            that breaks on first contact with a real weekend.
          </p>

          <p>Hold that last thought. It comes back.</p>

          <h2>Counter-arguments</h2>

          <p>
            Every one of these got thrown at me, mostly by me, usually at 1 a.m.
            Some of them land.
          </p>

          <p>
            <strong>
              &ldquo;Screens for small kids are bad, full stop. You&apos;re
              rationalising.&rdquo;
            </strong>
          </p>

          <p>
            Partly true, and the guidance is not ambiguous. The AAP and WHO both
            say no screen media under 18–24 months except video chat, and about
            an hour a day of high-quality, co-viewed content for ages 2–5.
            Notably, the{' '}
            <a
              href='https://health.choc.org/updated-aap-recommendations-for-screen-time/'
              target='_blank'
              rel='noopener noreferrer'
            >
              AAP moved in 2026
            </a>{' '}
            away from rigid hour caps toward a framework about content, context,
            co-viewing and conversation — which is a helpful shift, because it
            says the <em>what</em> and the <em>how</em> matter at least as much
            as the <em>how long</em>.
          </p>

          <p>
            My honest answer: this is harm reduction, not a health intervention.
            If you can keep your kid off feeds entirely, do that, close this tab,
            you&apos;ve already won. I&apos;m arguing about what&apos;s on the
            screen that&apos;s already in their hands, because that&apos;s the
            fight most parents are actually in.
          </p>

          <p>
            <strong>
              &ldquo;You&apos;re still building a slot machine. You&apos;ve just
              put vitamins in it.&rdquo;
            </strong>
          </p>

          <p>
            Fair, and I&apos;d rather concede it than dress it up. It is still a
            feed. It still uses a ranker. The differences are structural rather
            than spiritual: the session has a hard ending, there&apos;s no
            autoplay into the next one, and the scheduler will deliberately serve
            something less immediately fun than it could. That&apos;s a
            meaningfully different machine. It is not a different{' '}
            <em>category</em> of machine, and anyone telling you their engagement
            product is fundamentally virtuous is selling something.
          </p>

          <p>
            <strong>
              &ldquo;Educational short-form already exists. #LearnOnTikTok. It
              doesn&apos;t work.&rdquo;
            </strong>
          </p>

          <p>
            Correct, and for a reason that&apos;s easy to state:{' '}
            <strong>watching is not learning.</strong> Guo, Kim and Rubin&apos;s{' '}
            <a
              href='https://dl.acm.org/doi/10.1145/2556325.2566239'
              target='_blank'
              rel='noopener noreferrer'
            >
              analysis of 6.9M MOOC video sessions
            </a>{' '}
            found engagement collapses past about six minutes — and engagement
            was the <em>good</em> case. The fluency illusion does the rest. You
            watch a crisp two-minute explainer on orbital mechanics, it feels
            lucid, you feel smarter, and you retain approximately nothing.
          </p>

          <p>
            The delta here isn&apos;t the video. It&apos;s the retrieval and the
            schedule. Video is the delivery mechanism; the quiz and the interval
            are where the learning actually happens. Any version of this without
            a retrieval step is entertainment with a documentary accent.
          </p>

          <p>
            <strong>
              &ldquo;Spaced repetition works for flashcards, not for
              understanding.&rdquo;
            </strong>
          </p>

          <p>
            This is the strongest objection and I don&apos;t have a clean answer.
            The evidence for SR is excellent on declarative material —
            vocabulary, facts, formulas, named entities. Conceptual transfer and
            reasoning are much shakier ground, and the field knows it.
          </p>

          <p>
            So: scope it honestly. Constellations, orbital periods, migration
            routes, the names and order of things — factual scaffolding that a
            curious kid can then hang understanding on. Don&apos;t claim it
            teaches critical thinking. It doesn&apos;t, and pretending otherwise
            is how ed-tech earns its reputation.
          </p>

          <p>
            <strong>&ldquo;The quiz will kill the product.&rdquo;</strong>
          </p>

          <p>
            Yes. In the short term, absolutely. Friction reduces sessions,
            reduces watch time, reduces every number the growth dashboard is
            wired to. That is the trade, made deliberately: you are exchanging
            engagement for outcome. If your organisation measures only the first
            one, this feature dies in its first quarterly review, and no amount
            of clean architecture saves it. This is a political problem wearing a
            technical costume.
          </p>

          <p>
            <strong>
              &ldquo;Attention spans aren&apos;t actually shrinking. You&apos;re
              moralising with bad data.&rdquo;
            </strong>
          </p>

          <p>
            Partly fair, and I want to be careful here because the popular
            version is straightforwardly bunk. The &ldquo;human attention span
            has dropped to 8 seconds, worse than a goldfish&rdquo; line traces
            back to a 2015 Microsoft Canada marketing report citing a firm called
            Statistics Brain, with no peer-reviewed basis, and it has been{' '}
            <a
              href='https://edspace.american.edu/thecfebeat/2025/01/01/the-myth-of-the-shrinking-attention-span-shed-siliman/'
              target='_blank'
              rel='noopener noreferrer'
            >
              debunked repeatedly
            </a>
            . The goldfish thing isn&apos;t even true about goldfish.
          </p>

          <p>
            The real research is Gloria Mark&apos;s, and it&apos;s more
            interesting: average sustained attention on a single screen has
            fallen from around 2.5 minutes in 2004 to roughly{' '}
            <a
              href='https://www.apa.org/news/podcasts/speaking-of-psychology/attention-spans'
              target='_blank'
              rel='noopener noreferrer'
            >
              47 seconds today
            </a>
            . That&apos;s a genuine behavioural shift. But it&apos;s a story
            about <strong>switching</strong>, not about damaged brains. Which is
            an argument for designing around switching — short sessions, clean
            endings, state that survives an interruption — not for lecturing
            anyone about goldfish.
          </p>

          <p>
            <strong>&ldquo;Who pays for it?&rdquo;</strong>
          </p>

          <p>
            And here&apos;s the one that actually kills it. An education tab that{' '}
            <em>ends</em> is revenue-negative inside an ad-funded app. Every
            minute it succeeds is a minute not spent in the profitable part of
            the product. That is not a design flaw in my idea, it is the complete
            and sufficient explanation for why this doesn&apos;t already exist.
          </p>

          <p>
            Three ways out, none free: regulatory pressure (kids&apos; codes and
            age-appropriate design rules are tightening globally), a paid tier
            where parents are the customer rather than the product, or a platform
            whose business model already <em>is</em> learning — which is why
            Duolingo is the obvious host and the ad-funded incumbents are not.
          </p>

          <h2>The finalised system</h2>

          <h3>The decision</h3>

          <p>
            <strong>Use FSRS. Don&apos;t write your own scheduler.</strong> I
            wrote my own scheduler. Learn from me.
          </p>

          <p>Working through the ladder honestly:</p>

          <ul>
            <li>
              <strong>SM-2</strong> — a fine baseline, and if you shipped it
              tomorrow you&apos;d get most of the value. But ease hell is real,
              the lapse handling is crude, and within a year you&apos;d be
              patching your way toward a worse version of FSRS.
            </li>
            <li>
              <strong>FSRS</strong> — fitted forgetting curve, principled lapse
              handling, ease hell designed out, open source, benchmarked at
              scale, and it hands you desired retention as an explicit product
              lever. The lever alone justifies it.
            </li>
            <li>
              <strong>HLR</strong> — excellent, and needs Duolingo-scale traces
              you won&apos;t have on day one.
            </li>
            <li>
              <strong>DASH / MCM</strong> — principled, but you&apos;d be taking
              on modelling work FSRS has already done and validated.
            </li>
            <li>
              <strong>MEMORIZE</strong> — gorgeous, modest edge, assumes
              continuous-time availability that children conspicuously do not
              have.
            </li>
            <li>
              <strong>RL / KT</strong> — needs a simulator, brittle in
              production, and the field&apos;s own benchmarks (more on this
              below) say the gains are smaller than the abstracts claim.
            </li>
          </ul>

          <p>
            <strong>
              But keep a neural component — narrowly, and pointed at a different
              problem.
            </strong>
          </p>

          <p>
            Here&apos;s the correction to what I built at upGrad. At upGrad I
            let a classifier tug on the <em>interval itself</em>, which meant a
            model with modest evidence behind it was overriding a memory model
            with a century of evidence behind it. That was the wrong seam.
          </p>

          <p>
            The right seam is this: <strong>
              FSRS tells you when in memory-time. It does not tell you when in
              wall-clock time.
            </strong>{' '}
            FSRS says &ldquo;review this in six days.&rdquo; It has no idea that
            this kid gets the tablet after dinner on weekdays and disappears
            entirely into a football pitch on Saturdays. That&apos;s not a memory
            problem, it&apos;s an availability problem — and it&apos;s a much
            easier, much better-posed one.
          </p>

          <p>So:</p>

          <ul>
            <li>
              <strong>FSRS owns the interval.</strong> When in memory-time.
            </li>
            <li>
              <strong>A small classifier owns the slot.</strong> When in
              wall-clock time, within the day FSRS picked.
            </li>
            <li>
              <strong>The classifier never moves the due date.</strong> It picks
              which session the due item surfaces in. If the due date passes
              unclaimed, FSRS handles the overdue case natively — which, unlike
              SM-2, it does gracefully, because stability converges to a bound
              rather than growing linearly with your negligence.
            </li>
          </ul>

          <p>
            That separation is the actual design contribution here, and it&apos;s
            the thing I got wrong the first time. Remember the RL critique —{' '}
            <em>
              a policy that assumes the learner is available exactly when the
              schedule says breaks on contact with real weekends
            </em>
            ? This is that gap, patched by the smallest model that can patch it,
            and nothing more.
          </p>

          <h3>The hard constraint</h3>

          <p>Over the top of all ranking sits one non-negotiable rule:</p>

          <blockquote>
            Never surface a concept for review meaningfully before its scheduled
            date — regardless of predicted engagement.
          </blockquote>

          <p>
            Engagement affinity may reorder what you see. It may never override
            the spacing. If the model is certain a kid will love re-watching the
            whale migration clip they saw yesterday, the system&apos;s answer is
            no.
          </p>

          <h3>Serving a &ldquo;no&rdquo; at low latency</h3>

          <p>
            The interesting engineering problem with a hard constraint is that
            it&apos;s a <strong>negative</strong>, and negatives sit awkwardly in
            a two-stage recommender. The standard shape is candidate generation
            (millions → hundreds) then ranking (score the hundreds), often with a{' '}
            <a
              href='https://arxiv.org/pdf/2405.12327'
              target='_blank'
              rel='noopener noreferrer'
            >
              re-ranking stage
            </a>{' '}
            for diversity via MMR or DPP.
          </p>

          <p>
            A &ldquo;never show X before date D&rdquo; rule looks like a
            business-rule filter, and the naive instinct is to bolt it on at the
            very end, after ranking. That&apos;s wrong twice over: you burn
            ranking compute scoring candidates you&apos;re forbidden to show, and
            on a bad day you filter so aggressively that you under-fill the feed
            and have nothing to serve.
          </p>

          <p>
            So the constraint lives <strong>at retrieval, not at ranking</strong>
            . An item whose scheduled date is in the future is simply never a
            candidate. The ranker doesn&apos;t see it, doesn&apos;t score it,
            can&apos;t be tempted by it. New content and due reviews are pulled
            as separate candidate pools and interleaved at a per-learner ratio,
            which conveniently also gives you a clean dedup and cooldown
            boundary.
          </p>

          <p>
            The original was flag-controlled top to bottom — every scoring
            component independently toggleable and reweightable per cohort,
            events into Amplitude, several simultaneous experiments with
            assignment-level bucketing so they didn&apos;t contaminate each
            other. The stack was deliberately boring: Python with scikit-learn
            and PyTorch for models, Node/React/TypeScript on the product, Redis
            and PostgreSQL for state, Lambda for the scoring path. Boring stacks
            are a feature when the interesting part is the policy.
          </p>

          <h2>System design</h2>

          <MermaidDiagram
            chart={SESSION_FLOW_CHART}
            aria-label='Session system flow'
          />

          <p>Four things worth pointing at in that diagram:</p>

          <ol>
            <li>
              The hard constraint sits <strong>before</strong> the ranker, not
              after it.
            </li>
            <li>
              The availability classifier operates on ordering and timing only —
              it never touches <code>due_at</code>.
            </li>
            <li>
              The session has a terminal state. There is an end screen and
              nothing after it.
            </li>
            <li>
              The quiz result is the <em>only</em> thing that writes back to
              memory state. Watch time writes nothing. Watch time is not
              evidence of anything.
            </li>
          </ol>

          <h3>FSRS core</h3>

          <pre>
            <code>{`import math
from dataclasses import dataclass

# FSRS-6 defaults, trained on ~700M reviews
W = [0.212, 1.2931, 2.3065, 8.2956, 6.4133, 0.8334, 3.0194, 0.001,
     1.8722, 0.1666, 0.796, 1.4835, 0.0614, 0.2629, 1.6483, 0.6014,
     1.8729, 0.5425, 0.0912, 0.0658, 0.1542]

@dataclass
class Memory:
    stability: float      # days until R = 0.9
    difficulty: float     # 1..10

def _factor(w=W):
    return 0.9 ** (-1.0 / w[20]) - 1.0

def retrievability(elapsed_days: float, s: float, w=W) -> float:
    return (1.0 + _factor(w) * elapsed_days / s) ** (-w[20])

def next_interval(s: float, desired_retention: float = 0.9, w=W) -> float:
    """desired_retention is a PRODUCT decision, not a hyperparameter."""
    return (s / _factor(w)) * (desired_retention ** (-1.0 / w[20]) - 1.0)

def update(m: Memory, g: int, elapsed_days: float, w=W) -> Memory:
    """g: 1=again 2=hard 3=good 4=easy"""
    r = retrievability(elapsed_days, m.stability, w)

    # difficulty, with mean reversion -> no ease hell
    d0_easy = w[4] - math.exp(w[5] * 3) + 1
    d_prime = m.difficulty + (-w[6] * (g - 3)) * (10 - m.difficulty) / 9
    d_new = min(10.0, max(1.0, w[7] * d0_easy + (1 - w[7]) * d_prime))

    if g == 1:                                    # lapse
        s_new = (w[11]
                 * d_new ** (-w[12])
                 * ((m.stability + 1) ** w[13] - 1)
                 * math.exp(w[14] * (1 - r)))
    else:                                          # recall
        bonus = w[15] if g == 2 else (w[16] if g == 4 else 1.0)
        s_new = m.stability * (
            math.exp(w[8])
            * (11 - d_new)
            * m.stability ** (-w[9])
            * (math.exp(w[10] * (1 - r)) - 1)
            * bonus
            + 1
        )

    return Memory(stability=max(0.01, s_new), difficulty=d_new)`}</code>
          </pre>

          <h3>Mapping a kid&apos;s quiz to a grade</h3>

          <p>
            The child never sees a rating scale. We infer it, and we use latency
            because hesitation is signal — a slow correct answer is a memory on
            its way out.
          </p>

          <pre>
            <code>{`def to_grade(correct: bool, response_ms: int, median_ms: int) -> int:
    if not correct:
        return 1                      # again
    if response_ms > 2.0 * median_ms:
        return 2                      # hard — right, but it cost them
    if response_ms < 0.6 * median_ms:
        return 4                      # easy — instant
    return 3                          # good`}</code>
          </pre>

          <h3>The constraint filter</h3>

          <pre>
            <code>{`REVIEW_CANDIDATES = """
    SELECT concept_id, stability, difficulty, due_at
    FROM memory_state
    WHERE learner_id = %(learner)s
      AND due_at <= %(now)s          -- the whole thesis, one predicate
    ORDER BY due_at ASC
    LIMIT 200
"""

def review_candidates(db, learner_id, now):
    rows = db.query(REVIEW_CANDIDATES, learner=learner_id, now=now)
    # belt and braces: this must never fire, and if it does I want a page
    assert all(r.due_at <= now for r in rows), "early resurfacing"
    return rows`}</code>
          </pre>

          <p>
            That <code>assert</code> is not decorative. It is the one invariant
            of the entire system, and I&apos;d rather 500 the request than
            quietly ship a feed that has started optimising for engagement behind
            my back.
          </p>

          <h3>The availability classifier</h3>

          <p>
            Small on purpose. It answers one question: <em>
              given this learner&apos;s history, how likely are they to start a
              session in slot h?
            </em>{' '}
            Nothing about memory. Nothing about intervals.
          </p>

          <pre>
            <code>{`import torch
import torch.nn as nn

class SlotAvailability(nn.Module):
    """P(session start | hour-of-week slot). 168 slots. That's it."""
    def __init__(self, n_learners: int, emb: int = 16, hidden: int = 32):
        super().__init__()
        self.learner = nn.Embedding(n_learners, emb)
        self.gru = nn.GRU(input_size=4, hidden_size=hidden, batch_first=True)
        self.head = nn.Sequential(
            nn.Linear(hidden + emb, 64), nn.ReLU(), nn.Linear(64, 168)
        )

    def forward(self, learner_ids, recent_sessions):
        # recent_sessions: (B, T, 4) = [sin_h, cos_h, dow_norm, duration_norm]
        _, h = self.gru(recent_sessions)
        z = torch.cat([h.squeeze(0), self.learner(learner_ids)], dim=-1)
        return self.head(z)            # logits over 168 hour-of-week slots

def pick_slot(logits, due_day_slots):
    """Only ever choose among slots on or after the FSRS due date."""
    mask = torch.full_like(logits, float("-inf"))
    mask[:, due_day_slots] = 0.0
    return (logits + mask).argmax(dim=-1)`}</code>
          </pre>

          <p>
            Note <code>pick_slot</code>. The mask is the contract. The classifier
            can express any preference it likes and the constraint still holds,
            structurally, in the type of the operation rather than in
            someone&apos;s discipline.
          </p>

          <p>
            Cold start, since it&apos;s the weakest point in any of these
            systems: SM-2&apos;s flat 2.5 and FSRS&apos;s population defaults are
            both worst on brand-new items, at exactly the moment you have zero
            signal. An LLM can produce a serviceable difficulty prior from the
            concept text alone — &ldquo;photosynthesis, ages 8–10, three
            sub-steps&rdquo; is enough to guess that this is harder than
            &ldquo;the Moon orbits the Earth.&rdquo; It&apos;s the one place in
            this design where a language model earns its keep, and it&apos;s a
            place nobody thinks to put one.
          </p>

          <h2>Does it work?</h2>

          <p>
            The upGrad case study reports a{' '}
            <strong>
              15% lift in retargeting and cross-sell experiments
            </strong>{' '}
            tied to Shorts, measured by holdout — learners with Shorts disabled
            versus enabled, conversion to new program enrollment as the primary
            metric — sustained across multiple experiment cycles.
          </p>

          <p>
            I want to be precise about what that number is and, more importantly,
            what it isn&apos;t.
          </p>

          <p>
            It&apos;s a <strong>business</strong> metric. Re-engagement and
            cross-sell. It is not a measurement of long-term knowledge retention,
            and I&apos;d be misrepresenting my own work if I let it stand in for
            one. The mechanism we believed was driving it was the
            spaced-repetition cadence pulling learners back on a regular rhythm,
            which handed the Growth team a high-intent, active audience. The fact
            that it held across cycles is decent evidence that it was the cadence
            rather than novelty — novelty decays, and this didn&apos;t.
          </p>

          <p>
            But plainly: <strong>
              we never ran the controlled delayed-recall test that would prove
              the feed made anyone remember more.
            </strong>{' '}
            I believe it did, on the strength of the theory and the shape of the
            engagement curves. I cannot show you the retention curve, because we
            didn&apos;t measure one.
          </p>

          <p>
            If I ran this again, the experiment I&apos;d insist on before writing
            a single line of scheduler:
          </p>

          <ul>
            <li>
              <strong>Delayed recall, held out.</strong> Same content, two arms —
              schedule-driven versus engagement-driven ordering. Surprise
              retrieval test at 7 and 30 days, on concepts <em>not</em> in the
              recent review window. If the constraint doesn&apos;t beat the
              engagement ranker there, the entire thesis is wrong and I&apos;d
              want to find that out in week six rather than year two.
            </li>
            <li>
              <strong>
                Session-count cost, measured and stated up front.
              </strong>{' '}
              The quiz will cost you sessions. Know the number before someone in
              a review meeting discovers it and frames it as a regression.
            </li>
            <li>
              <strong>
                An outcome metric, which is the genuinely hard part.
              </strong>{' '}
              upGrad had transition rate — brutal, lagging, and completely immune
              to whether you enjoyed the videos. What is the equivalent for a
              nine-year-old learning about Jupiter&apos;s moons? Nobody has a
              good answer. And the absence of a credible outcome metric is
              precisely why watch time wins by default: it&apos;s the only number
              available on Monday morning.
            </li>
          </ul>

          <p>
            That last bullet is not a footnote. It&apos;s the whole reason
            we&apos;re here.
          </p>

          <h3>A caution about the shiny thing</h3>

          <p>
            One more, because it&apos;s the most seductive branch and the one
            I&apos;d most likely have chased at 28.
          </p>

          <p>
            Knowledge tracing runs from{' '}
            <a
              href='https://arxiv.org/pdf/1506.05908'
              target='_blank'
              rel='noopener noreferrer'
            >
              Deep Knowledge Tracing
            </a>{' '}
            (Piech et al., NeurIPS 2015) — an LSTM over interaction sequences
            that posted big AUC jumps over Bayesian Knowledge Tracing, roughly
            0.86 against 0.69 on ASSISTments — through the self-attention era:{' '}
            <a
              href='https://arxiv.org/abs/1907.06837'
              target='_blank'
              rel='noopener noreferrer'
            >
              SAKT
            </a>{' '}
            (2019),{' '}
            <a
              href='https://arxiv.org/abs/2002.07033'
              target='_blank'
              rel='noopener noreferrer'
            >
              SAINT/SAINT+
            </a>{' '}
            (Riiid, on the 70M-interaction EdNet dataset),{' '}
            <a
              href='https://arxiv.org/abs/2007.12324'
              target='_blank'
              rel='noopener noreferrer'
            >
              AKT
            </a>{' '}
            (KDD 2020, with a monotonic attention that explicitly models
            forgetting). Each one beats the last, if you read only the abstracts.
          </p>

          <p>
            Then the{' '}
            <a
              href='https://arxiv.org/pdf/2206.11460'
              target='_blank'
              rel='noopener noreferrer'
            >
              pyKT benchmark
            </a>{' '}
            (Liu et al., NeurIPS 2022) standardised the evaluation and found two
            things worth tattooing somewhere visible. First, much of the reported
            improvement over plain DKT is <cite>minimal</cite>. Second — and
            this is the ugly one — a widely used evaluation setup leaks
            ground-truth labels and inflates AUC, by around 8.4% on
            ASSISTments2009 and 13% on Algebra2005. Independent reproductions{' '}
            <a
              href='https://theophilegervet.github.io/assets/pdf/gervet2020deep.pdf'
              target='_blank'
              rel='noopener noreferrer'
            >
              couldn&apos;t confirm
            </a>{' '}
            that SAKT beats vanilla DKT at all, and Gervet et al. showed a
            well-tuned logistic regression stays competitive with deep KT
            everywhere except the very largest datasets.
          </p>

          <p>
            Same lesson as the schedulers, one rung up the ladder: the
            sophisticated thing wins by less than its title suggests, and
            occasionally it wins only because the evaluation was broken. Ship
            FSRS. Run KT as an experiment with a control you trust. Not the other
            way around.
          </p>

          <h2>Conclusion</h2>

          <p>
            The paper that gave us all of this was called{' '}
            <em>Attention Is All You Need</em>. It described a mechanism inside a
            model for deciding which parts of an input deserve weight. Nine years
            later, the same idea, industrialised, decides which parts of the
            world reach my son.
          </p>

          <p>
            That&apos;s the joke, and it isn&apos;t especially funny. Attention
            really is all you need — it&apos;s the substrate under every single
            thing a person will ever learn — and we have spent a decade building
            extraordinarily capable machinery for spending it as fast as
            possible, on nothing, at a rate of 47 seconds a hop.
          </p>

          <p>
            None of what I&apos;ve described here is hard. SM-2 is a 1987
            algorithm you could implement on a napkin. FSRS is open source,
            benchmarked to death, and free. The retrieval filter is one predicate
            in a WHERE clause. The availability model is a GRU with an embedding
            table and a Tuesday afternoon of work. The whole thing fits inside
            infrastructure that four different companies already own and operate
            at planetary scale.
          </p>

          <p>
            The hard part was never the engineering. The hard part is that
            nobody&apos;s compensation is tied to whether a nine-year-old
            remembers what a moon is. Watch time has a dashboard. Learning has a
            research budget and a two-year lag. Given those incentives, every
            ranker on earth converges to the same answer, and it isn&apos;t a
            conspiracy — it&apos;s just a gradient, and everyone is standing on
            it.
          </p>

          <p>
            So the design is really one sentence long, and everything else in
            this post is implementation detail:
          </p>

          <blockquote>
            Build a feed that will, when it matters, refuse to give you what you
            want right now — because it is trying to give you something
            you&apos;ll be glad you have later.
          </blockquote>

          <p>
            That&apos;s it. A hard constraint, an ending, and a question at the
            end.
          </p>

          <p>
            Will I build it? I don&apos;t know. It needs a platform, and the
            platforms have no reason to want it until a regulator or a paying
            parent gives them one. But I&apos;m no longer willing to pretend the
            default is neutral, because I&apos;ve now sat in a hospital waiting
            room and watched what the default does to a room full of toddlers.
          </p>

          <p>
            We won a hackathon for this five years ago and put it in a drawer.
            The drawer has been open for a while now.
          </p>

          <Image
              src={`${IMG}/image.png`}
              alt='reel back in the drawer'
              width={2022}
              height={954}
              className='blog-prose__img'
              sizes='(max-width: 672px) 100vw, 672px'
            />

          <h2>Research appendix — sources &amp; key findings</h2>

          <h3>Primary source (my own work)</h3>
          <ul className='blog-prose__refs'>
            <li>
              <Link href='/work/upgrad-shorts'>upGrad Shorts case study</Link>{' '}
              — micro-learning feed with SM-2 spaced repetition and a neural
              classifier predicting optimal review intervals per learner; 15%
              lift in retargeting and cross-sell experiments. Source of the
              constraint, swipe-grade UX, urgency/novelty/affinity blend, stack,
              Amplitude harness, and Growth positioning.
            </li>
            <li>
              <Link href='/work/upgrad-lms'>upGrad LMS rebuild</Link> — tenure
              Dec 2019–Sept 2021, 3M+ learners, Tier 2/3 India context.
            </li>
            <li>
              <Link href='/work'>Work index</Link> — dates Shorts to 2020.
            </li>
          </ul>

          <h3>Learning science</h3>
          <ul className='blog-prose__refs'>
            <li>
              Bjork &amp; Bjork, <em>A New Theory of Disuse</em> (1992) —{' '}
              <a
                href='https://www.researchgate.net/publication/281322665'
                target='_blank'
                rel='noopener noreferrer'
              >
                link
              </a>
            </li>
            <li>
              Bjork &amp; Bjork, desirable difficulties —{' '}
              <a
                href='https://burrell.edu/wp-content/uploads/2020/09/EBjorkRBjork_FABBSchapter2014-2nd-ed._WithCoverPage.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                PDF
              </a>
            </li>
            <li>
              Roediger &amp; Karpicke, <em>Test-Enhanced Learning</em> (2006) —{' '}
              <a
                href='https://journals.sagepub.com/doi/abs/10.1111/j.1467-9280.2006.01693.x'
                target='_blank'
                rel='noopener noreferrer'
              >
                link
              </a>
            </li>
            <li>
              Cepeda et al. (2006) meta-analysis —{' '}
              <a
                href='https://augmentingcognition.com/assets/Cepeda2006.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                PDF
              </a>
              ; Cepeda et al. (2008) spacing ridgeline —{' '}
              <a
                href='https://laplab.ucsd.edu/articles/Cepeda%20et%20al%202008_psychsci.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                PDF
              </a>
            </li>
            <li>
              Guo, Kim &amp; Rubin, video engagement (L@S 2014) —{' '}
              <a
                href='https://dl.acm.org/doi/10.1145/2556325.2566239'
                target='_blank'
                rel='noopener noreferrer'
              >
                ACM
              </a>
            </li>
          </ul>

          <h3>Schedulers</h3>
          <ul className='blog-prose__refs'>
            <li>
              SM-2 —{' '}
              <a
                href='https://www-beta.supermemo.com/archives1990-2015/english/ol/sm2'
                target='_blank'
                rel='noopener noreferrer'
              >
                SuperMemo archives
              </a>
              ;{' '}
              <a
                href='https://help.supermemo.org/wiki/SuperMemo_Algorithm'
                target='_blank'
                rel='noopener noreferrer'
              >
                algorithm help
              </a>
            </li>
            <li>
              FSRS formulas —{' '}
              <a
                href='https://github.com/open-spaced-repetition/awesome-fsrs/wiki/The-Algorithm'
                target='_blank'
                rel='noopener noreferrer'
              >
                The Algorithm wiki
              </a>
              ;{' '}
              <a
                href='https://expertium.github.io/Algorithm.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                explainer
              </a>
              ;{' '}
              <a
                href='https://github.com/open-spaced-repetition/srs-benchmark'
                target='_blank'
                rel='noopener noreferrer'
              >
                benchmark
              </a>
            </li>
            <li>
              Settles &amp; Meeder, HLR (ACL 2016) —{' '}
              <a
                href='https://research.duolingo.com/papers/settles.acl16.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                PDF
              </a>
            </li>
            <li>
              Khajah, Lindsey &amp; Mozer threshold heuristic —{' '}
              <a
                href='https://home.cs.colorado.edu/~mozer/Research/Selected%20Publications/reprints/KhajahLindseyMozer2013.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                PDF
              </a>
            </li>
            <li>
              Tabibian et al., MEMORIZE (PNAS 2019) —{' '}
              <a
                href='https://www.pnas.org/doi/10.1073/pnas.1815156116'
                target='_blank'
                rel='noopener noreferrer'
              >
                link
              </a>
            </li>
            <li>
              Reddy et al. (2016) —{' '}
              <a
                href='https://arxiv.org/abs/1602.07227'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv
              </a>
              ; DRL-SRS (2024) —{' '}
              <a
                href='https://www.mdpi.com/2076-3417/14/13/5591'
                target='_blank'
                rel='noopener noreferrer'
              >
                MDPI
              </a>
            </li>
          </ul>

          <h3>Kids, screens, and the attention myth</h3>
          <ul className='blog-prose__refs'>
            <li>
              AAP 2026 digital media guidance —{' '}
              <a
                href='https://health.choc.org/updated-aap-recommendations-for-screen-time/'
                target='_blank'
                rel='noopener noreferrer'
              >
                CHOC summary
              </a>
            </li>
            <li>
              Transfer / video deficit —{' '}
              <a
                href='https://www.apa.org/monitor/2020/04/cover-kids-screens'
                target='_blank'
                rel='noopener noreferrer'
              >
                APA Monitor
              </a>
            </li>
            <li>
              Attention-span myth debunked —{' '}
              <a
                href='https://edspace.american.edu/thecfebeat/2025/01/01/the-myth-of-the-shrinking-attention-span-shed-siliman/'
                target='_blank'
                rel='noopener noreferrer'
              >
                link
              </a>
              ; Gloria Mark / APA —{' '}
              <a
                href='https://www.apa.org/news/podcasts/speaking-of-psychology/attention-spans'
                target='_blank'
                rel='noopener noreferrer'
              >
                speaking of psychology
              </a>
            </li>
          </ul>

          <h3>Recommender systems &amp; knowledge tracing</h3>
          <ul className='blog-prose__refs'>
            <li>
              ByteDance Monolith —{' '}
              <a
                href='https://arxiv.org/abs/2209.07663'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv
              </a>
              ; Covington et al., YouTube recommendations —{' '}
              <a
                href='https://cseweb.ucsd.edu/classes/fa17/cse291-b/reading/p191-covington.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                PDF
              </a>
            </li>
            <li>
              Stray et al. on values in recommenders —{' '}
              <a
                href='https://arxiv.org/abs/2107.10939'
                target='_blank'
                rel='noopener noreferrer'
              >
                2021
              </a>
              ,{' '}
              <a
                href='https://arxiv.org/abs/2207.10192'
                target='_blank'
                rel='noopener noreferrer'
              >
                2022
              </a>
            </li>
            <li>
              Piech et al., Deep Knowledge Tracing —{' '}
              <a
                href='https://arxiv.org/pdf/1506.05908'
                target='_blank'
                rel='noopener noreferrer'
              >
                PDF
              </a>
              ; pyKT —{' '}
              <a
                href='https://arxiv.org/pdf/2206.11460'
                target='_blank'
                rel='noopener noreferrer'
              >
                PDF
              </a>
              ; Gervet et al. —{' '}
              <a
                href='https://theophilegervet.github.io/assets/pdf/gervet2020deep.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                PDF
              </a>
            </li>
          </ul>
        </div>

        <BlogHook />

        <footer className='blog-article__footer'>
          <p>
            Written by{' '}
            <a href={SITE_URL} rel='author'>
              Arvind Narayan
            </a>
            .{' '}
            <Link href='/work/upgrad-shorts'>upGrad Shorts case study →</Link>
          </p>
          <Link href='/blogs' className='blog-article__back'>
            ← All posts
          </Link>
        </footer>
      </article>
    </main>
  );
}
