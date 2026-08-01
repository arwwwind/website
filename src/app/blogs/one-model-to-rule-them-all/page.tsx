import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BlogCover } from '@/components/blog/blog-cover';
import { BlogDropcap } from '@/components/blog/blog-dropcap';
import { BlogHook } from '@/components/blog/blog-hook';
import {
  BlogContinueReading,
  BlogRelatedAd,
} from '@/components/blog/blog-related';
import {
  formatPostDate,
  getPostBySlug,
  postDocumentTitle,
  postUrl,
  SITE_URL,
} from '@/lib/blog-posts';

const SLUG = 'one-model-to-rule-them-all';
const post = getPostBySlug(SLUG)!;
const url = postUrl(SLUG);
const ogAbsolute = `${SITE_URL}${post.ogImage}`;
const publishedIso = `${post.date}T12:00:00.000Z`;
const IMG = '/blog/one-model-to-rule-them-all';

export const metadata: Metadata = {
  title: postDocumentTitle(post),
  description: post.description,
  keywords: [
    ...post.tags,
    'XGBoost vs neural networks',
    'tabular machine learning',
    'TabPFN',
    'TabFM',
    'feature engineering',
    'data cascades',
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
    about: post.tags.map((tag) => ({
      '@type': 'Thing',
      name: tag.replace(/-/g, ' '),
    })),
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

export default function OneModelToRuleThemAllPostPage() {
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
          <h2>Introduction</h2>

          <p className='blog-prose__lede'>
            <BlogDropcap word='One' /> fine morning, whilst sipping on the
            coffee I&apos;d brewed on my AeroPress, I found myself doing that
            thing where you audit your entire career before 9 AM. Specific
            question: which single piece of technology have I used the most?
          </p>

          <p>Turns out it&apos;s XGBoost.</p>

          <p>
            I started using it at Yahoo, building regression models to pre-fill
            data for advertising campaigns. Even now, when I&apos;m building
            graph neural networks for bio-chemistry, the first thing I reach for
            is an XGBoost baseline. In my three and a half years at Egen, almost
            everything we shipped was built on XGBoost or another boosting
            algorithm. Sometimes a Random Forest, sometimes a soft-voting
            ensemble, occasionally something more exotic. We shipped these to
            Fortune 500 companies and they worked.
          </p>

          <p>
            Fifteen-year-old technology. Runs on a laptop. Still paying the
            bills.
          </p>

          <p>
            This got me thinking about something that&apos;s been bothering me.
            A lot of companies talk and preach about AI adoption, but what most
            of them are actually doing is outsourcing grunt work to LLMs.
            It&apos;s the 1990s all over again, except instead of shipping the
            boring parts to an IBM mainframe and a services contract, we&apos;re
            shipping them to a context window and a per-token bill.
          </p>

          <p>
            LLMs are excellent generalists. But for specific problems you want
            specific models. You don&apos;t want a general practitioner
            performing your surgery, no matter how well-read he is.
          </p>

          <p>
            And a lot of teams would benefit enormously from just using boosting
            algorithms — XGBoost, LightGBM, CatBoost — to transfer tribal
            knowledge into machines. That&apos;s the actual unglamorous
            opportunity sitting in most organisations right now. Not agents. Not
            fine-tuning. Just taking the twenty rules that live in one senior
            person&apos;s head and the fourteen exceptions nobody wrote down,
            and turning them into something that runs every night at 2 AM.
          </p>

          <h2>The Research</h2>

          <p>
            Where boosting shines is tabular data, and almost every business on
            earth runs on tabular data. An Excel sheet, a Postgres table, a
            warehouse, a CSV somebody emails around. That&apos;s the substrate.
          </p>

          <p>
            Even now, working on problems in molecular biology and
            bio-chemistry, our XGBoost baselines land around F1 ~0.82 and AUC
            ~0.86. That&apos;s quite good. For a lot of problems that is not the
            baseline — that&apos;s the answer, and everything after it is
            diminishing returns you&apos;ll spend two quarters chasing.
          </p>

          <p>
            This isn&apos;t just me being stubborn, incidentally. On the
            Therapeutics Data Commons ADMET benchmarks — molecular property
            prediction, exactly the domain where you&apos;d expect graph
            networks to dominate — a large share of state-of-the-art results
            still come from gradient-boosted trees on molecular fingerprints. A{' '}
            <a
              href='https://arxiv.org/abs/2508.06199'
              target='_blank'
              rel='noopener noreferrer'
            >
              2025 benchmark of 25 pretrained molecular embedding models
            </a>{' '}
            found that nearly all of them showed negligible improvement over a
            plain ECFP fingerprint baseline. In chemistry. Where the molecules
            are literally graphs. I found that genuinely humbling.
          </p>

          <p>
            Then there&apos;s everything that has nothing to do with accuracy:
          </p>

          <ul>
            <li>
              Trains in seconds to minutes, so nightly retraining is a cron job,
              not a platform initiative.
            </li>
            <li>
              Runs fine on CPU for medium-sized data. No GPU in the serving
              path, no CUDA version in your postmortems.
            </li>
            <li>
              A small server handles many parallel inference requests. For
              on-device use cases, a decent model runs on a Raspberry Pi or a
              phone.
            </li>
            <li>
              Explainability that&apos;s predictable and that a compliance
              reviewer will actually accept.
            </li>
            <li>
              It fails loudly rather than strangely. A tree that&apos;s never
              seen a region says something dumb and obvious. A network says
              something confident and wrong.
            </li>
          </ul>

          <p>
            XGBoost is the Toyota Hilux of machine learning. Nobody puts it on a
            conference poster. It starts.
          </p>

          <p>
            The literature backs this up more than the discourse suggests. The{' '}
            <a
              href='https://arxiv.org/abs/2207.08815'
              target='_blank'
              rel='noopener noreferrer'
            >
              Grinsztajn et al. benchmark
            </a>{' '}
            put tree ensembles against a spread of tabular-specific neural
            architectures across 45 datasets, with a tuning budget for everyone,
            and found trees still state of the art on medium-sized data — around
            10K samples. The diagnosis was the interesting part: networks get
            dragged down by uninformative features, and their rotation
            invariance actively works against them when the meaningful structure{' '}
            <em>is</em> the individual columns.{' '}
            <a
              href='https://www.sciencedirect.com/science/article/abs/pii/S1566253521002360'
              target='_blank'
              rel='noopener noreferrer'
            >
              Shwartz-Ziv and Armon
            </a>{' '}
            arrived at the same place from a different direction.
          </p>

          <p>
            The one I&apos;d actually point you to, though, is{' '}
            <a
              href='https://arxiv.org/abs/2305.02997'
              target='_blank'
              rel='noopener noreferrer'
            >
              McElfresh et al.
            </a>{' '}
            — 19 algorithms across 176 datasets. Their conclusion is a knife
            aimed at both camps: the neural-nets-versus-trees debate is
            overemphasised, and for a large fraction of datasets the difference
            is negligible, or light hyperparameter tuning on a gradient-boosted
            tree matters more than which family you picked in the first place.
          </p>

          <p>
            Sit with that for a second. A benchmark paper&apos;s finding is that
            the argument everyone is having is mostly not the thing that
            determines the outcome.
          </p>

          <figure className='blog-prose__figure'>
            <Image
              src={`${IMG}/grinsztajn-fig1-numerical.png`}
              alt='Grinsztajn et al. Figure 1: on medium-sized numerical-only datasets, XGBoost and RandomForest outperform neural architectures (FT Transformer, ResNet, MLP, SAINT) across random-search iterations for both classification and regression'
              width={2398}
              height={1430}
              className='blog-prose__img'
              sizes='(max-width: 672px) 100vw, 672px'
            />
            <figcaption>
              Grinsztajn et al. — medium-sized datasets, numerical features
              only. Tree ensembles sit above the neural architectures even after
              hundreds of tuning iterations.
            </figcaption>
          </figure>

          <figure className='blog-prose__figure'>
            <Image
              src={`${IMG}/grinsztajn-fig2-mixed.png`}
              alt='Grinsztajn et al. Figure 2: on medium-sized datasets with numerical and categorical features, HistGradientBoosting, RandomForest and XGBoost again dominate FT Transformer, ResNet and SAINT'
              width={2180}
              height={1100}
              className='blog-prose__img'
              sizes='(max-width: 672px) 100vw, 672px'
            />
            <figcaption>
              Same benchmark with mixed numerical and categorical features. The
              gap widens — neural nets rarely reach the{' '}
              <em>starting</em> score of the best trees.
            </figcaption>
          </figure>

          <figure className='blog-prose__figure'>
            <Image
              src={`${IMG}/grinsztajn-fig3-smoothing.png`}
              alt='Grinsztajn et al. Figure 3: as tabular data is smoothed with a Gaussian kernel, tree-model advantage shrinks and neural nets catch up — evidence that trees win because real tables are irregular, not smooth'
              width={2180}
              height={1100}
              className='blog-prose__img'
              sizes='(max-width: 672px) 100vw, 672px'
            />
            <figcaption>
              Smooth the irregular structure out of the table and the
              tree advantage collapses. Trees win because real tabular data is
              jagged — not because of a magic algorithm.
            </figcaption>
          </figure>

          <BlogRelatedAd slug={SLUG} />

          <h2>The Implementation for Most Problems</h2>

          <blockquote>
            Complexity is expensive and only gets harder. Simplicity is cheap,
            and you can always climb from there.
          </blockquote>

          <p>
            So we&apos;ve established that boosting models and tree ensembles
            are simple and solve most problems, and that we&apos;re fine starting
            simple and letting probability do us a favour. If we fail or outgrow
            the model, we iterate upwards. That&apos;s a much better position
            than discovering in month four that your transformer was never the
            problem.
          </p>

          <p>
            The other thing worth saying: you don&apos;t need PhDs or AI
            researchers for this. Most engineers and analysts with a decent
            understanding of the problem can build these models. Heck, even
            curious business people who aren&apos;t technical can get there with
            an LLM and a bit of guidance. That&apos;s not a knock on the work —
            it&apos;s the entire point. The scarce input here isn&apos;t
            modelling talent. It&apos;s someone who knows what the data means.
          </p>

          <p>Here&apos;s roughly how I run it:</p>

          <ol>
            <li>
              <strong>Data analysis.</strong> Understand the shape of the data
              and the relationships between features. Do a proper EDA —
              patterns, outliers, missing values, cardinality, distributions.
              Sit with it longer than feels productive.
            </li>
            <li>
              <strong>Data refinement.</strong> Clean it. Handle missing values,
              outliers, categoricals, numericals. Decide what missing actually{' '}
              <em>means</em> — missing-because-not-collected and
              missing-because-not-applicable are two different features.
            </li>
            <li>
              <strong>Baseline immediately.</strong> Before any of the clever
              stuff, train a default-parameter model. This is your floor and
              your leak detector. If you&apos;re sitting at 0.99 AUC on day one,
              congratulations, you&apos;ve found a bug, not a model.
            </li>
            <li>
              <strong>Feature importance study.</strong> Understand which
              features matter and how they relate. PCA, t-SNE, UMAP as needed —
              but treat these as exploration, not evidence.
            </li>
            <li>
              <strong>Feature engineering.</strong> Create new features, drop
              dead ones. This is where the real gains live, and it&apos;s the
              step that requires knowing the business rather than knowing the
              library.
            </li>
            <li>
              <strong>Feature selection.</strong> Either start with everything
              and trim, or start small and add. Both work. Pick one and be
              disciplined about it.
            </li>
            <li>
              <strong>Split properly.</strong> Split by time and by entity, not
              randomly. Most spectacular validation scores are just a random
              split quietly leaking the future into the past.{' '}
              <a
                href='https://www.sciencedirect.com/science/article/pii/S2666389923001599'
                target='_blank'
                rel='noopener noreferrer'
              >
                Leakage is a documented reproducibility crisis
              </a>{' '}
              across seventeen scientific fields, and I promise your pipeline is
              not the exception.
            </li>
            <li>
              <strong>Train.</strong> XGBoost, LightGBM, CatBoost, Random
              Forest. Pick one, they&apos;re all fine.
            </li>
            <li>
              <strong>Evaluate.</strong> RMSE, MAE, R², F1, AUC — whatever
              matches the decision the model feeds. This is your honest
              baseline.
            </li>
            <li>
              <strong>Hyperparameter tuning.</strong> Grid search, random
              search, Bayesian optimisation. I use Optuna. Note that random
              search beats grid search at equal budget, which{' '}
              <a
                href='https://www.jmlr.org/papers/v13/bergstra12a.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                Bergstra and Bengio showed in 2012
              </a>{' '}
              and half the industry still hasn&apos;t internalised. Then walk
              away and let it run — this is the part of the job you should be
              delegating to a machine, not savouring.
            </li>
            <li>
              <strong>Iterate on the gap.</strong> Ensembling, stacking,
              blending. Push F1 and AUC where it&apos;s worth pushing.
            </li>
            <li>
              <strong>Calibrate.</strong> If a human or a threshold consumes
              your score, calibrate it. An uncalibrated 0.7 that actually means
              0.4 will cost you more than three points of AUC ever will.
            </li>
            <li>
              <strong>Explainability.</strong> SHAP values, permutation
              importance. Use it to understand the model <em>and</em> to catch
              the feature that&apos;s secretly a proxy for the label.
            </li>
            <li>
              <strong>Deployment.</strong> Docker, Kubernetes, whatever your org
              already runs. The model is a file. Don&apos;t overthink it.
            </li>
            <li>
              <strong>Monitoring.</strong> Simple logging on CloudWatch or
              Prometheus. Watch for drift and performance decay.
            </li>
          </ol>

          <p>Iterate and iterate and iterate.</p>

          <p>
            Notice how much of that list isn&apos;t modelling. Steps 1, 2, 4, 5,
            6, 7 and 13 are data work and business logic wearing an ML costume.
            The actual &ldquo;machine learning&rdquo; is step 8, and step 8 is
            one line.
          </p>

          <h2>Real-World Example</h2>

          <p>
            At Egen I worked with large Fortune 500 companies — giant retailers,
            insurance providers, non-banking financial institutions. We were
            almost always solving data problems, not model problems.
          </p>

          <p>
            A lot of those systems already had a predefined if-this-then-that
            chain of logic buried in them, built up over a decade by people who
            had mostly left. Our job was to capture the complex relationships
            and patterns that logic was gesturing at. That was a win-win: the
            client got a solid model, and the team learned an enormous amount
            about the business and the data — which, it turns out, is the same
            thing.
          </p>

          <p>
            We rarely hit hiccups on accuracy or performance. Most of the time
            an ensemble got us there. Only if we were still unsatisfied would we
            start exploring deep learning, and honestly, that conversation
            didn&apos;t come up often.
          </p>

          <p>
            The takeaway I keep returning to: most teams need to solve data
            problems, not model problems. Model problems are hard, expensive,
            and require deep expertise. Data problems are also hard — but
            they&apos;re hard in a way your organisation is actually equipped to
            solve, because the knowledge required already exists inside the
            building. It&apos;s just sitting in someone&apos;s head instead of
            in a column.
          </p>

          <p>
            There&apos;s good research on why teams avoid this. Sambasivan et
            al. studied it directly in a paper with the best title in the field:{' '}
            <a
              href='https://research.google/pubs/everyone-wants-to-do-the-model-work-not-the-data-work-data-cascades-in-high-stakes-ai/'
              target='_blank'
              rel='noopener noreferrer'
            >
              &ldquo;Everyone wants to do the model work, not the data
              work.&rdquo;
            </a>{' '}
            They found 92% of practitioners hit at least one data cascade, and
            45% hit two or more in a single project. Cascades are opaque,
            delayed, and largely avoidable — and they persist because of
            incentives. Nobody gets promoted for a well-specified label.
          </p>

          <p>
            Booking.com{' '}
            <a
              href='https://dl.acm.org/doi/10.1145/3292500.3330744'
              target='_blank'
              rel='noopener noreferrer'
            >
              documented the business end of this
            </a>{' '}
            across roughly 150 models validated with randomised trials, and
            their headline finding should be printed on a mug: improving offline
            model performance does not reliably translate into business value.
            You can win the leaderboard and lose the quarter.
          </p>

          <h2>Where You Might Fail</h2>

          <p>
            I&apos;d be selling you something if I stopped here. Boosting has
            real limits, and some of them aren&apos;t fixable with cleverness.
          </p>

          <p>
            First, let me correct a thing I believed for years:{' '}
            <strong>it&apos;s not about row count.</strong> Gradient boosting
            handles millions of rows perfectly well. In fact, in recent
            head-to-head benchmarks, large numeric datasets are exactly where
            tuned XGBoost still ranks at or near the top. If anything, the
            regime under threat right now is <em>small</em> data, which
            we&apos;ll get to.
          </p>

          <p>
            It&apos;s about <strong>shape</strong>.
          </p>

          <ul>
            <li>
              <strong>When the table is destroying the structure.</strong>{' '}
              Molecules are graphs. Fraud rings are graphs. Sessions are
              sequences with order and timing. Images are images. If you&apos;re
              flattening the object into 200 hand-rolled descriptors, you&apos;ve
              already thrown away the thing that determines the answer. My
              caveat from earlier stands — for many 2D property-prediction
              endpoints, fingerprints plus a booster are still at the top. But
              for 3D geometry, conformers and docking, a graph network isn&apos;t
              a flex, it&apos;s the correct data structure.
            </li>
            <li>
              <strong>Extrapolation.</strong> A tree is piecewise-constant.
              Outside the range it trained on, it flatlines, confidently.
              Anything with a trend in it — prices, load, growth curves — will
              quietly disappoint you at precisely the moment it matters.
            </li>
            <li>
              <strong>Anything semantic.</strong> Free text, resumes, support
              tickets, audio, product photos. Boosting can split on a signal; it
              cannot interpret one. The production answer here isn&apos;t
              &ldquo;switch to deep learning,&rdquo; it&apos;s the hybrid that
              nobody writes blog posts about: use a network to turn the
              unstructured thing into an embedding, then feed that embedding
              into your gradient booster alongside the tabular features. Most
              strong systems I&apos;ve built look exactly like this.
            </li>
            <li>
              <strong>Learned interactions at scale.</strong> Recommenders,
              high-cardinality behavioural data, anything where the interaction
              surface is combinatorial. You <em>can</em> make trees work with
              enough feature engineering. Past a certain point, though, the
              feature engineering <em>is</em> a neural network — assembled by
              hand, at greater cost, worse.
            </li>
          </ul>

          <p>
            If you find yourself at this crossroads, that&apos;s fine. Either
            you started simple and genuinely outgrew it, or you&apos;re in the
            niche that needed the complex thing from day one. Either way you
            have a baseline, which means you can prove the complex thing is
            worth it instead of assuming.
          </p>

          <p>
            The best account of what that transition actually costs is
            Airbnb&apos;s{' '}
            <a
              href='https://arxiv.org/abs/1810.09591'
              target='_blank'
              rel='noopener noreferrer'
            >
              &ldquo;Applying Deep Learning to Airbnb Search&rdquo;
            </a>
            . Read the failures. Their first production neural network was a
            single hidden layer with 32 ReLUs, and it came out <em>neutral</em>{' '}
            against the GBDT it replaced. Listing-ID embeddings failed outright,
            because a listing can be booked at most 365 times a year and there
            was never enough interaction data to learn them. They quote
            Karpathy&apos;s &ldquo;don&apos;t be a hero,&rdquo; which is a very
            expensive lesson to arrive at via a KDD paper. The{' '}
            <a
              href='https://arxiv.org/abs/2002.05515'
              target='_blank'
              rel='noopener noreferrer'
            >
              sequel a year later
            </a>{' '}
            is the one people skip: they&apos;d lost the ability to reason about
            how the model used price, and had to structurally remove price from
            the network to get it back.
          </p>

          <p>
            Neural networks learn complex relationships and nuanced patterns
            between features in a way trees genuinely can&apos;t. They handle
            large and diverse data well. They&apos;re the surgeon. They also
            come with compute, training time, inference latency, hosting, and a
            permanent tax on explainability. That&apos;s the price of the
            complexity, and sometimes it&apos;s absolutely worth paying.
          </p>

          <h3>The counterargument I can&apos;t dismiss</h3>

          <p>
            In fairness, there&apos;s a version of this post that&apos;s wrong,
            and it&apos;s worth stating properly.
          </p>

          <p>
            Rich Sutton&apos;s{' '}
            <a
              href='http://www.incompleteideas.net/IncIdeas/BitterLesson.html'
              target='_blank'
              rel='noopener noreferrer'
            >
              &ldquo;The Bitter Lesson&rdquo;
            </a>{' '}
            argues that across sixty years of AI, methods that leverage general
            learning and raw computation have consistently beaten methods that
            encode human domain knowledge — and that the human-knowledge
            approaches feel better right up until the moment they lose. My
            entire argument here is &ldquo;encode human domain knowledge into
            features.&rdquo; That is exactly the pattern Sutton says loses.
          </p>

          <p>
            My honest read is that his lesson holds hardest where you can
            generate or collect effectively unlimited data for the task, and
            holds much more weakly where the binding constraint is that your
            label definition is wrong. No amount of computation fixes a target
            column that&apos;s measuring the wrong thing. But I&apos;d be lying
            if I said I found that fully reassuring, and the next section is
            why.
          </p>

          <h2>The Future</h2>

          <p>
            The interesting shift isn&apos;t that the models got better. It&apos;s
            that the number of people who can build one went up by about two
            orders of magnitude, and the minimum viable dataset came down by
            three. Those two things together open up a category of problem that
            has been sitting untouched for twenty years because it was never
            worth staffing a data science team for.
          </p>

          <p>
            <strong>Tabular foundation models.</strong> Start with the part that
            moves the ground under everything else.
          </p>

          <p>
            TabPFN{' '}
            <a
              href='https://www.nature.com/articles/s41586-024-08328-6'
              target='_blank'
              rel='noopener noreferrer'
            >
              landed in <em>Nature</em>
            </a>{' '}
            in early 2025 with an odd proposition: pretrain a transformer on
            enormous quantities of <em>synthetic</em> tables generated from
            structural causal models, and it learns a prior over how tables tend
            to behave. Supervised learning becomes in-context learning. No
            fitting — the forward pass does the reasoning.
          </p>

          <p>
            That line kept moving through TabPFN-2.5 and TabICLv2, and on 30
            June 2026{' '}
            <a
              href='https://research.google/blog/introducing-tabfm-a-zero-shot-foundation-model-for-tabular-data/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Google shipped TabFM
            </a>
            : hybrid row/column attention, hundreds of millions of synthetic
            training datasets, zero-shot classification and regression in a
            single forward pass, reported to outperform heavily tuned tree
            ensembles on the TabArena suite. It&apos;s going into BigQuery
            behind a SQL <code>AI.PREDICT</code> call, which means your analyst
            may well ship a model before your platform team finishes the
            Terraform.
          </p>

          <p>
            The caveats are real and worth stating plainly.{' '}
            <a
              href='https://yashrajpandey.com/writing/breaking-google-tabfm/'
              target='_blank'
              rel='noopener noreferrer'
            >
              An independent reproduction
            </a>{' '}
            found genuine zero-shot wins over Optuna-tuned XGBoost on
            small-to-mid tables — and then demoted a couple of those wins to
            ties after checking across random seeds. The released weights carry
            a non-commercial licence. Classification caps at ten classes.
            Inference economics are nowhere near a tree ensemble on CPU. If
            you&apos;re serving fifty thousand predictions a second, this
            isn&apos;t your architecture yet.
          </p>

          <p>
            But notice which regime they&apos;re winning: small data. Five
            thousand to fifty thousand rows.
          </p>

          <h3>The long tail finally becomes reachable</h3>

          <p>
            That regime is the whole story, and I don&apos;t think people have
            absorbed it yet.
          </p>

          <p>
            For twenty years the unspoken entry fee for machine learning was
            tens of thousands of clean labelled rows. That fee quietly excluded
            almost every real business problem, because most of them are small.
            A 40-branch NBFC has maybe 6,000 loans that went bad. A hospital
            chain does 900 of a particular surgery a year. A factory has 200
            recorded failures of the machine that matters. A specialty chemicals
            firm has 1,100 batches. A logistics company has 4,000 detention
            events.
          </p>

          <p>
            Every one of those is a genuine, expensive, unsolved problem. Every
            one of them was below the waterline. That waterline just dropped,
            and nobody has gone looking in the newly exposed territory yet.
          </p>

          <h3>The mundane problems nobody has touched</h3>

          <p>
            Here&apos;s the part that I think is genuinely underrated. Walk into
            almost any mid-sized company and you&apos;ll find a dozen decisions
            being made by a spreadsheet, a rule from 2014, and a person&apos;s
            gut. Not exotic decisions. Boring, repetitive, expensive ones:
          </p>

          <ul>
            <li>
              <strong>Accounts payable exception routing.</strong> Which
              invoices need a human, which can straight-through process.
              Somebody is manually eyeballing 400 a day.
            </li>
            <li>
              <strong>Collections prioritisation.</strong> Which delinquent
              accounts to call first. Most NBFCs still work this by
              days-past-due, which is roughly the least informative feature
              available.
            </li>
            <li>
              <strong>No-shows.</strong> Clinics, salons, diagnostic labs,
              restaurants, service centres. A no-show rate of 18% is a
              business-model problem, and the data to predict it is sitting in
              the booking system.
            </li>
            <li>
              <strong>Returns likelihood at the point of purchase.</strong>{' '}
              E-commerce companies know this per-SKU. Almost none of them know
              it per-order-per-customer, which is where the money is.
            </li>
            <li>
              <strong>Warranty and claim fraud triage.</strong> Not catching
              fraud — just ranking what a human should look at first.
            </li>
            <li>
              <strong>Field service first-time-fix.</strong> Which technician,
              which part on the van. Every failed first visit is a truck roll
              you paid for twice.
            </li>
            <li>
              <strong>Dead stock and reorder points.</strong> Still done with a
              moving average and a safety factor somebody chose in a meeting.
            </li>
            <li>
              <strong>Shift absenteeism in warehouses and plants.</strong>{' '}
              Predictable a week out, and it wrecks the roster every time.
            </li>
            <li>
              <strong>Learner churn in ed-tech.</strong> Which student stops
              showing up in week three, which is worth an intervention.
              I&apos;ve watched this one get solved with a spreadsheet and a lot
              of hope.
            </li>
            <li>
              <strong>Machine failure from process parameters.</strong>{' '}
              Temperature, pressure, vibration, cycle counts. Tabular. Boring.
              Worth crores.
            </li>
          </ul>

          <p>
            None of these will get you a conference talk. Every single one has a
            rupee value that somebody in finance can compute in about four
            minutes. That asymmetry is the opportunity.
          </p>

          <h3>SQL becomes the interface</h3>

          <p>
            The <code>AI.PREDICT</code>-style shift matters more than the
            accuracy numbers. When the model is a SQL function, the person who
            ships it is the analyst who already writes the quarterly report —
            someone who understands the business, knows which column is
            unreliable, and remembers why that flag exists.
          </p>

          <p>
            That&apos;s the correct person to be building these. It&apos;s just
            never been the achievable person before.
          </p>

          <p>
            The obvious catch: bad models will now ship faster than ever, too.
            Somebody still needs to know what a leaky feature looks like and why
            a random split flatters you. The bottleneck moves from modelling to
            governance, which is a better problem to have but is still a
            problem, and I&apos;d rather say so now than write the follow-up
            post in two years.
          </p>

          <h3>Tribal knowledge gets a front door</h3>

          <p>
            The hardest step in that 15-step list isn&apos;t the model. It&apos;s
            getting what the domain expert knows into a column. The guy who
            knows that orders from the Hosur warehouse on Fridays are always
            entered wrong. The underwriter who can tell you which self-declared
            income figures to distrust and why.
          </p>

          <p>
            LLMs are turning out to be a decent front door for this.{' '}
            <a
              href='https://arxiv.org/abs/2305.03403'
              target='_blank'
              rel='noopener noreferrer'
            >
              CAAFE
            </a>{' '}
            — context-aware automated feature engineering — takes a dataset
            plus a plain-language description and proposes semantically
            meaningful features, verifying each against cross-validation. It
            improved 11 of 14 datasets in the original paper, lifting mean ROC
            AUC from 0.798 to 0.822. That&apos;s roughly the gain you&apos;d get
            from swapping logistic regression for a random forest, obtained by
            reading the schema and thinking about it.
          </p>

          <p>
            Note the awkward implication, which I flagged earlier: this is the
            same research group automating both the tuning and the feature
            engineering. My honest position is that an LLM can propose good
            features from what&apos;s in the schema, and cannot invent the
            column that was never collected. That gap is real but it&apos;s
            narrower than I&apos;d like.
          </p>

          <h3>Specialist models as tools for agents</h3>

          <p>
            Imagine building simple, specialist tools that an agent can call. An
            LLM that reaches for a purpose-built model instead of reasoning its
            way to a number is a much better system than an LLM alone — the
            model gives you a calibrated, deterministic, auditable answer, and
            the LLM handles everything around it.
          </p>

          <p>
            Concretely: a support agent that calls a churn model before deciding
            what retention offer to make. An ops copilot that queries a delay
            model before promising a delivery window. An underwriting assistant
            that pulls a risk score rather than free-associating about it.
          </p>

          <p>
            The boosting model becomes a tool in a toolbox rather than a product
            in itself, which is honestly where most of them belonged anyway. And
            it fixes the thing that makes agents unusable in serious contexts —
            that they&apos;re confidently unquantified. A model that outputs
            0.31 with a calibration curve behind it can be reasoned about. A
            paragraph cannot.
          </p>

          <h3>On-edge and offline</h3>

          <p>
            With a Raspberry Pi and a few sensors you can deploy real solutions
            in agriculture, healthcare, energy and water. This is where
            boosting&apos;s efficiency stops being a convenience and becomes the
            whole reason the thing is possible. There&apos;s no GPU in a field
            in Karnataka, and there&apos;s frequently no connectivity either.
          </p>

          <p>
            Irrigation scheduling from soil moisture and weather. Cold chain
            excursion prediction for vaccines and dairy. Transformer load and
            distribution loss detection for discoms. Water pump failure. Grain
            moisture and spoilage risk. Every one of these is a small tabular
            model that has to run offline on cheap hardware, forever, without a
            maintenance contract — which rules out essentially everything except
            a tree ensemble.
          </p>

          <h3>The regulated corner where boosting wins outright</h3>

          <p>
            This one is a growing moat, not a shrinking one.
          </p>

          <p>
            In lending, insurance, hiring and clinical triage, you need
            monotonic constraints, stable feature attributions, reproducibility
            across runs, and an audit trail a regulator will accept. Gradient
            boosting gives you all four almost for free. You cannot put a model
            with a non-commercial licence, a ten-class cap, and no stable
            explanation story into an underwriting pipeline — not because
            it&apos;s worse, but because you can&apos;t defend it in a room with
            a compliance officer in it.
          </p>

          <p>
            As AI regulation tightens, the explainable, deterministic,
            locally-run model gets more valuable, not less. That&apos;s the
            opposite of the direction everyone assumes things are moving.
          </p>

          <h3>The India-shaped version of all of this</h3>

          <p>
            I&apos;ll say the obvious local thing, because I think it&apos;s the
            largest version of the opportunity and it&apos;s underwritten.
          </p>

          <p>
            MSME lending on GST and UPI transaction history. Kirana-level demand
            forecasting on ONDC data. Crop advisory and yield prediction. Discom
            loss and theft detection. Claims triage for the newly insured.
            Dropout risk in state education systems. Health worker triage
            prioritisation at the last mile.
          </p>

          <p>
            All of it tabular. All of it small-to-medium data. All of it messy,
            high-variance, and worth an enormous amount. None of it needs a
            frontier model — it needs someone who will sit with the data for a
            week and knows what a good split looks like.
          </p>

          <h2>Conclusion</h2>

          <p>
            Here&apos;s the thing I find genuinely funny about the timing.
          </p>

          <p>
            If a frozen model that has never heard of your company, trained
            entirely on synthetic tables, can match six weeks of your careful
            hyperparameter tuning — then the tuning was never your edge. It was
            always the commodity. The foundation models aren&apos;t refuting the
            argument in this post; they&apos;re automating the exact half of the
            job I&apos;ve been telling people to stop hoarding.
          </p>

          <p>
            What they can&apos;t automate is the rest of it. The label
            definition you argued about for two days. The leakage you caught in
            week one because a column was only populated <em>after</em> the
            outcome. The feature that encoded the actual physical mechanism
            causing the delay. The decision to split by time and entity, which
            is the difference between a model and a story about a model. The
            conversation with the operations lead who mentions, offhand, the
            thing that explains your entire residual.
          </p>

          <p>
            There is no pretrained prior over your business being wrong about
            what it&apos;s measuring.
          </p>

          <p>
            So: start boring. Get a baseline up in the first hour. Spend the
            week on the data, because that&apos;s where the ceiling is.
            Delegate the tuning to Optuna and go do something with a higher
            return. Add a tabular foundation model to your bake-off, because
            it&apos;s cheap and it&apos;s an honest check on whether your effort
            bought anything a stranger&apos;s prior couldn&apos;t. And when your
            data genuinely has structure a table is destroying — you&apos;ll
            know, and you&apos;ll be able to justify the complicated thing in
            one sentence instead of a slide deck.
          </p>

          <p>
            Fifteen years on, the most useful thing in my toolkit is still a
            gradient-boosted tree and a week spent understanding the data. I
            don&apos;t think that&apos;s nostalgia. I think most of us have been
            solving the wrong problem, very impressively.
          </p>

          <h2>References</h2>

          <h3>The benchmark literature</h3>
          <ul className='blog-prose__refs'>
            <li>
              Grinsztajn, Oyallon &amp; Varoquaux (2022) —{' '}
              <em>
                Why do tree-based models still outperform deep learning on
                typical tabular data?
              </em>{' '}
              NeurIPS D&amp;B.{' '}
              <a
                href='https://arxiv.org/abs/2207.08815'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2207.08815
              </a>
            </li>
            <li>
              McElfresh et al. (2023) —{' '}
              <em>
                When Do Neural Nets Outperform Boosted Trees on Tabular Data?
              </em>{' '}
              NeurIPS.{' '}
              <a
                href='https://arxiv.org/abs/2305.02997'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2305.02997
              </a>
            </li>
            <li>
              Shwartz-Ziv &amp; Armon (2022) —{' '}
              <em>Tabular Data: Deep Learning is Not All You Need.</em>{' '}
              Information Fusion 81.{' '}
              <a
                href='https://www.sciencedirect.com/science/article/abs/pii/S1566253521002360'
                target='_blank'
                rel='noopener noreferrer'
              >
                ScienceDirect
              </a>
            </li>
            <li>
              Borisov et al. (2024) —{' '}
              <em>Deep Neural Networks and Tabular Data: A Survey.</em> IEEE
              TNNLS.
            </li>
            <li>
              Holzmüller, Grinsztajn &amp; Steinwart (2024) —{' '}
              <em>
                Better by Default: Strong Pre-tuned MLPs and Boosted Trees on
                Tabular Data.
              </em>{' '}
              NeurIPS.{' '}
              <a
                href='https://arxiv.org/abs/2407.04491'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2407.04491
              </a>
            </li>
          </ul>

          <h3>The algorithms</h3>
          <ul className='blog-prose__refs'>
            <li>
              Friedman (2001) —{' '}
              <em>
                Greedy Function Approximation: A Gradient Boosting Machine.
              </em>{' '}
              Annals of Statistics.
            </li>
            <li>
              Chen &amp; Guestrin (2016) —{' '}
              <em>XGBoost: A Scalable Tree Boosting System.</em> KDD.{' '}
              <a
                href='https://arxiv.org/abs/1603.02754'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:1603.02754
              </a>
            </li>
            <li>
              Ke et al. (2017) —{' '}
              <em>
                LightGBM: A Highly Efficient Gradient Boosting Decision Tree.
              </em>{' '}
              NeurIPS.
            </li>
            <li>
              Prokhorenkova et al. (2018) —{' '}
              <em>CatBoost: unbiased boosting with categorical features.</em>{' '}
              NeurIPS.
            </li>
          </ul>

          <h3>Data quality, leakage, and why this all matters</h3>
          <ul className='blog-prose__refs'>
            <li>
              Sambasivan et al. (2021) —{' '}
              <em>
                &ldquo;Everyone wants to do the model work, not the data
                work&rdquo;: Data Cascades in High-Stakes AI.
              </em>{' '}
              CHI.{' '}
              <a
                href='https://research.google/pubs/everyone-wants-to-do-the-model-work-not-the-data-work-data-cascades-in-high-stakes-ai/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Google Research
              </a>
            </li>
            <li>
              Kapoor &amp; Narayanan (2023) —{' '}
              <em>
                Leakage and the reproducibility crisis in machine-learning-based
                science.
              </em>{' '}
              Patterns 4(9).{' '}
              <a
                href='https://www.sciencedirect.com/science/article/pii/S2666389923001599'
                target='_blank'
                rel='noopener noreferrer'
              >
                ScienceDirect
              </a>
            </li>
            <li>
              Sculley et al. (2015) —{' '}
              <em>Hidden Technical Debt in Machine Learning Systems.</em>{' '}
              NeurIPS.{' '}
              <a
                href='https://papers.nips.cc/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                Paper
              </a>
            </li>
            <li>
              Zinkevich —{' '}
              <em>
                Rules of Machine Learning: Best Practices for ML Engineering.
              </em>{' '}
              <a
                href='https://developers.google.com/machine-learning/guides/rules-of-ml'
                target='_blank'
                rel='noopener noreferrer'
              >
                Google Developers
              </a>
            </li>
          </ul>

          <h3>Industry case studies</h3>
          <ul className='blog-prose__refs'>
            <li>
              Bernardi, Mavridis &amp; Estevez (2019) —{' '}
              <em>
                150 Successful Machine Learning Models: 6 Lessons Learned at
                Booking.com.
              </em>{' '}
              KDD.{' '}
              <a
                href='https://dl.acm.org/doi/10.1145/3292500.3330744'
                target='_blank'
                rel='noopener noreferrer'
              >
                ACM
              </a>
            </li>
            <li>
              Haldar et al. (2019) —{' '}
              <em>Applying Deep Learning to Airbnb Search.</em> KDD.{' '}
              <a
                href='https://arxiv.org/abs/1810.09591'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:1810.09591
              </a>
            </li>
            <li>
              Haldar et al. (2020) —{' '}
              <em>Improving Deep Learning for Airbnb Search.</em> KDD.{' '}
              <a
                href='https://arxiv.org/abs/2002.05515'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2002.05515
              </a>
            </li>
            <li>
              Makridakis, Spiliotis &amp; Assimakopoulos —{' '}
              <em>
                The M5 Accuracy Competition: Results, findings and conclusions.
              </em>{' '}
              International Journal of Forecasting. (LightGBM was the method of
              choice among winners.)
            </li>
          </ul>

          <h3>Tuning</h3>
          <ul className='blog-prose__refs'>
            <li>
              Bergstra &amp; Bengio (2012) —{' '}
              <em>Random Search for Hyper-Parameter Optimization.</em> JMLR
              13.{' '}
              <a
                href='https://www.jmlr.org/papers/v13/bergstra12a.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                JMLR
              </a>
            </li>
            <li>
              Akiba et al. (2019) —{' '}
              <em>
                Optuna: A Next-generation Hyperparameter Optimization Framework.
              </em>{' '}
              KDD.
            </li>
            <li>
              Erickson et al. (2020) — <em>AutoGluon-Tabular.</em>
            </li>
          </ul>

          <h3>Tabular foundation models</h3>
          <ul className='blog-prose__refs'>
            <li>
              Hollmann et al. (2025) —{' '}
              <em>
                Accurate predictions on small data with a tabular foundation
                model.
              </em>{' '}
              <a
                href='https://www.nature.com/articles/s41586-024-08328-6'
                target='_blank'
                rel='noopener noreferrer'
              >
                Nature 637:319–326
              </a>
            </li>
            <li>
              Qu et al. (2025) —{' '}
              <em>
                TabICL: A Tabular Foundation Model for In-Context Learning on
                Large Data.
              </em>{' '}
              <a
                href='https://arxiv.org/abs/2502.05564'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2502.05564
              </a>
            </li>
            <li>
              Erickson et al. (2025) —{' '}
              <em>
                TabArena: A Living Benchmark for Machine Learning on Tabular
                Data.
              </em>{' '}
              <a
                href='https://arxiv.org/abs/2506.16791'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2506.16791
              </a>
            </li>
            <li>
              Google Research (2026) — <em>Introducing TabFM.</em>{' '}
              <a
                href='https://research.google/blog/introducing-tabfm-a-zero-shot-foundation-model-for-tabular-data/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Blog
              </a>
            </li>
            <li>
              Pandey (2026) — independent TabFM reproduction.{' '}
              <a
                href='https://yashrajpandey.com/writing/breaking-google-tabfm/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Writeup
              </a>
            </li>
          </ul>

          <h3>Molecular ML</h3>
          <ul className='blog-prose__refs'>
            <li>
              <em>
                Benchmarking Pretrained Molecular Embedding Models for Molecular
                Representation Learning
              </em>{' '}
              (2025).{' '}
              <a
                href='https://arxiv.org/abs/2508.06199'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2508.06199
              </a>
            </li>
            <li>
              Gilmer et al. (2017) —{' '}
              <em>Neural Message Passing for Quantum Chemistry.</em> ICML.
            </li>
            <li>
              García-Ortegón et al. (2021) — <em>DOCKSTRING.</em>{' '}
              <a
                href='https://arxiv.org/abs/2110.15486'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2110.15486
              </a>
            </li>
          </ul>

          <h3>The counterargument</h3>
          <ul className='blog-prose__refs'>
            <li>
              Sutton (2019) — <em>The Bitter Lesson.</em>{' '}
              <a
                href='http://www.incompleteideas.net/IncIdeas/BitterLesson.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                incompleteideas.net
              </a>
            </li>
            <li>
              Hollmann et al. (2023) —{' '}
              <em>CAAFE: Context-Aware Automated Feature Engineering.</em>{' '}
              NeurIPS.{' '}
              <a
                href='https://arxiv.org/abs/2305.03403'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2305.03403
              </a>
            </li>
          </ul>
        </div>

        <BlogContinueReading slug={SLUG} />
        <BlogHook />

        <footer className='blog-article__footer'>
          <p>
            Written by{' '}
            <a href={SITE_URL} rel='author'>
              Arvind Narayan
            </a>
            .
          </p>
          <Link href='/blogs' className='blog-article__back'>
            ← All posts
          </Link>
        </footer>
      </article>
    </main>
  );
}
