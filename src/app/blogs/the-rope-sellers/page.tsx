import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogCover } from '@/components/blog/blog-cover';
import { BlogDropcap } from '@/components/blog/blog-dropcap';
import { BlogHook } from '@/components/blog/blog-hook';
import {
  BlogContinueReading,
  BlogRelatedAd,
  BlogSeriesBanner,
} from '@/components/blog/blog-related';
import {
  formatPostDate,
  getPostBySlug,
  postDocumentTitle,
  postUrl,
  SITE_URL,
} from '@/lib/blog-posts';

const SLUG = 'the-rope-sellers';
const post = getPostBySlug(SLUG)!;
const url = postUrl(SLUG);
const ogAbsolute = `${SITE_URL}${post.ogImage}`;
const publishedIso = `${post.date}T12:00:00.000Z`;

export const metadata: Metadata = {
  title: postDocumentTitle(post),
  description: post.description,
  keywords: [
    ...post.tags,
    'Big 4',
    'McKinsey',
    'BCG',
    'Bain',
    'TCS',
    'Infosys',
    'audit',
    'BigLaw',
    'AI discount',
    'billable pyramid',
    'Arvind Narayan',
  ],
  authors: [{ name: 'Arvind Narayan', url: SITE_URL }],
  creator: 'Arvind Narayan',
  publisher: 'Arvind Narayan',
  category: 'AI & Professional Services',
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
    section: 'AI & Professional Services',
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
    'article:section': 'AI & Professional Services',
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
    articleSection: 'AI & Professional Services',
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

export default function TheRopeSellersPostPage() {
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
            <span aria-hidden='true'> · </span>
            <span>Bengaluru</span>
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

        <BlogSeriesBanner slug={SLUG} />

        <div className='blog-prose' itemProp='articleBody'>
          <p className='blog-prose__lede'>
            <BlogDropcap word="Here's" /> a fun thing that happened in October
            2025. Bloomberg reported that close to 150 former consultants from
            McKinsey, Bain, and BCG had been quietly contracted — through a
            project code-named Argentum, run by a data-labeling startup,
            reportedly for OpenAI — to train AI models on how to do entry-level
            consulting work. Market sizing. First-draft decks. The grunt stuff.
            The pay was $110 an hour, for up to 19 hours a week.
          </p>

          <p>
            Read that again slowly. The people who used to bill six figures a
            year to build slide 14 of a 60-slide deck are now moonlighting at
            $110 an hour to teach a machine how to build slide 14, so the
            machine can do it instead of the next batch of them. Lenin
            supposedly said the capitalists would sell you the rope you hang
            them with. He never imagined the capitalists would show up, hourly,
            to teach the rope how to tie the knot.
          </p>

          <p>
            That&apos;s the whole story, really. But let&apos;s do the numbers,
            because the numbers are where it gets interesting — and where the
            comfortable narrative (&ldquo;AI is just a tool, we&apos;ll all be
            fine, it frees us up for higher-value work&rdquo;) falls apart.
          </p>

          <h2>The pyramid was always the product</h2>

          <p>
            The Big 4, the strategy shops, and the Indian IT giants are wildly
            different businesses that all secretly run the exact same machine.
            Call it the billable pyramid. You hire an enormous base of cheap
            juniors, you bill them out by the hour at a markup that would make a
            loan shark blush, and a thin layer of partners at the top pockets
            the spread. The junior does the work; the partner sells the
            relationship and signs the invoice. Leverage — the ratio of cheap
            bodies to expensive names — is the entire business model.
          </p>

          <p>
            Agentic AI is dangerous to this model in a way that spreadsheets and
            offshoring never were, because it attacks both inputs of the pyramid
            at once. It doesn&apos;t just replace the juniors (the bodies). It
            compresses the hours (the unit you sell). Research, synthesis, first
            drafts, document review, reconciliation, journal-entry testing —
            that&apos;s 60 to 70% of what a junior professional does, and
            it&apos;s precisely the stuff a decent model now eats for breakfast.
            When the work gets faster <em>and</em> needs fewer people,
            you&apos;re not looking at a productivity boost. You&apos;re looking
            at the collapse of the thing you were charging for.
          </p>

          <p>
            And clients have noticed. This is the part firms hoped nobody would
            say out loud. PwC&apos;s Chief AI Officer Dan Priest admitted to
            Bloomberg that clients &ldquo;would hear us talking about using AI
            and say, &lsquo;We want our fair share of those
            efficiencies.&rsquo;&rdquo; There&apos;s now an actual phenomenon of
            enterprise buyers asking the Big 4 for an &ldquo;AI
            discount.&rdquo; My favorite instance: KPMG — a Big 4 firm — leaned
            on <em>its own</em> auditor, Grant Thornton, to pass along AI
            savings, and got its audit fee cut 14%, from $416,000 to $357,000
            (per UK Companies House filings surfaced in early 2026). KPMG saved
            fifty-nine grand and, in the process, handed every client on earth
            the script for demanding the same thing. When the arsonist starts
            running fire-safety seminars, you should probably listen.
          </p>

          <p>
            An HFS Research survey of 1,002 senior executives across 16
            industries and 14 countries, published in November 2025, put the
            mood in numbers: 65% said traditional consulting models fail to
            deliver real value, only 13% rated traditional consulting
            &ldquo;highly effective,&rdquo; and while 49% of contracts today are
            still tied to headcount, only 16% of leaders expect to be using that
            model within two years. HFS president Saurabh Gupta didn&apos;t
            hedge: &ldquo;Consulting as we&apos;ve known it is over. AI has
            blown up the model where armies of consultants spend months
            producing recommendations no one implements. If your consulting
            partner can&apos;t deliver measurable outcomes at the speed of AI,
            they&apos;re obsolete.&rdquo;
          </p>

          <p>
            Okay. So who survives, and why? Here&apos;s the thesis, and
            it&apos;s almost boringly simple once you see it:{' '}
            <strong>
              survival isn&apos;t predicted by how good your AI is. It&apos;s
              predicted by whether a government forces a specific, named human
              being to be personally, legally accountable for the output.
            </strong>{' '}
            Capability is cheap and getting cheaper. Accountability is a moat.
            Let&apos;s walk the ranking.
          </p>

          <h2>
            Big 4: audit is a fortress, advisory is standing in a field naked
          </h2>

          <p>
            The Big 4 aren&apos;t one business, they&apos;re two businesses in a
            trench coat, and AI is treating the two halves very differently.
          </p>

          <p>
            The audit half has a moat that has nothing to do with technology and
            everything to do with the law. A public company <em>must</em> be
            audited, and a specific engagement partner <em>must</em> personally
            sign off, staking their license and their firm&apos;s liability on
            the opinion. You cannot fire the requirement. AI is genuinely
            transforming how the work gets done — EY&apos;s Helix, PwC&apos;s
            Halo and GL.ai now let auditors test 100% of transactions instead of
            pulling a 5–10% sample, and a PCAOB board member acknowledged in a
            2025 speech that full-population testing beats manual sampling on
            coverage. But notice what that does. It makes audit{' '}
            <em>better and cheaper</em> without making it <em>optional</em>.
            Audit survives — as a regulated utility. Commoditized,
            margin-squeezed, AI-run, but structurally un-killable because the
            state says so. A boring fortress is still a fortress.
          </p>

          <p>
            The advisory half has no such luck. Advisory is consulting wearing
            an accounting firm&apos;s lanyard, and it is standing in an open
            field with no moat, no mandate, and no signature requirement. Which
            is exactly why the cuts are landing there. KPMG cut about 4% of its
            US advisory staff, shut its federal audit practice (~450 roles), and
            — in the genuinely startling move — axed roughly 10% of its US{' '}
            <em>audit partners</em>, around 100 people, a level of seniority Big
            4 firms almost never touch. Over September 2024 to May 2025, KPMG
            shed more than 3,300 US roles. Deloitte, posting a healthy 8% US
            revenue growth, still decided to slash benefits for its internal
            &ldquo;Center&rdquo; staff: parental leave halved from 16 weeks to
            8, PTO down 5–10 days, a $50,000 IVF-and-adoption fund killed, and
            pension accruals frozen after 2026. When a firm growing at 8% is
            cutting your parental leave, that&apos;s not about this year&apos;s
            revenue. That&apos;s a firm quietly redrawing the line between
            who&apos;s inside the long-term contract and who&apos;s a cost to be
            optimized.
          </p>

          <p>
            The tell is at the bottom of the pyramid, in graduate hiring. In the
            UK, KPMG slashed its graduate scheme 29% (1,399 down to 942),
            Deloitte 18%, EY 11%, PwC 6%. Accountancy graduate job adverts fell
            44% year over year. Australian Big 4 partner ranks are down 15% —
            about 500 partners, of whom fewer than half were replaced — in two
            years. The base of the pyramid is being kicked out, and I&apos;ll
            come back to why that&apos;s the scariest number in this whole
            essay.
          </p>

          <h2>
            MBB: the brand is the moat, and the brand is quietly eating itself
          </h2>

          <p>
            Strategy consulting — McKinsey, Bain, BCG — has no regulatory moat
            at all. Nobody is legally required to hire McKinsey. What they have
            instead is brand-as-insurance (&ldquo;nobody ever got fired for
            hiring McKinsey&rdquo;) and access to the CEO&apos;s ear. That&apos;s
            a real moat. It&apos;s just not a <em>technological</em> one, which
            means AI can&apos;t kill it but also can&apos;t be sold as the
            reason it survives.
          </p>

          <p>
            So the Big Three are doing something fascinating: they&apos;re
            cannibalizing themselves as fast as possible and calling it
            strategy. BCG reported $14.4 billion in 2025 revenue, up 7% (its
            22nd straight growth year), with 25% of that — roughly $3.6 billion
            — coming directly from AI work, and tech-and-AI services now north
            of 40% of the total. CEO Christoph Schweizer&apos;s line:
            &ldquo;AI has turned out to be highly value accretive and not
            dilutive for BCG.&rdquo; Bain says AI- and tech-enabled work is
            about 30% of revenue, heading for 50%. McKinsey&apos;s internal AI,
            Lilli, runs over 500,000 prompts a month, has 72% of the firm using
            it, and reportedly delivers up to 30% time savings on knowledge
            work.
          </p>

          <p>
            Here&apos;s the catch nobody at these firms enjoys discussing. If
            Lilli saves 30% of the time, and three associates plus Lilli now do
            what ten associates used to do, the firm needs fewer associates.
            Full stop. McKinsey trimmed around 200 tech roles in late 2025, and
            reports point to larger reductions ahead as it
            &ldquo;right-sizes&rdquo; back-office and non-client functions over
            the next two years. The associate factory — the thing that made
            these firms money-printing machines — is shrinking.
          </p>

          <p>
            And the pricing model is confessing the crime. About 25% of
            McKinsey&apos;s global fees now come from outcome-based pricing
            rather than hours. McKinsey&apos;s UK managing partner Michael
            Birshan says &ldquo;we&apos;re doing more performance-based
            arrangements with our clients,&rdquo; and the firm&apos;s own AI
            leader Kate Smaje admits &ldquo;many of the fundamentals of the
            professional services model are coming under challenge.&rdquo;
            Translate that from consultant into English:{' '}
            <em>the client no longer believes the hour is the product.</em> When
            you switch from billing hours to billing outcomes, you&apos;re not
            innovating on pricing. You&apos;re admitting that the hour — the
            entire historical unit of value — has been exposed as a fiction.
            Outcome pricing is the ransom note the industry is writing to
            itself.
          </p>

          <h2>
            Indian IT: the purest pyramid, the thinnest moat, the biggest human
            cost
          </h2>

          <p>
            Now the part that matters most, because it involves the most people
            and the least protection.
          </p>

          <p>
            If the billable pyramid has a spiritual homeland, it&apos;s
            Bengaluru, Hyderabad, Pune, and Chennai. TCS, Infosys, Wipro,
            HCLTech, Tech Mahindra, Cognizant, LTIMindtree — this is the pyramid
            in its purest, most beautiful, most exposed form. It was never about
            a signature or a license or a relationship with the CEO. It was
            about bodies and hours: take a huge supply of Indian engineering
            graduates, train them, bill them to a Western client at a fat
            markup, and repeat a few hundred thousand times. Labor arbitrage.
            That was the miracle, and it lifted millions of Indian families into
            the middle class.
          </p>

          <p>
            Ask the accountability question here and the answer is brutal: there
            is no moat. Nobody is legally required to use TCS. There&apos;s no
            signing partner staking a license. Which makes Indian IT arguably
            the most exposed of all five industries in this essay —{' '}
            <em>and</em> the fastest to sell the rope, because when your whole
            business is &ldquo;we&apos;ll do the labor cheaply,&rdquo; pivoting
            to &ldquo;we&apos;ll do the AI-delivery cheaply&rdquo; is a lateral
            move, not a reinvention.
          </p>

          <p>
            Watch the decoupling, because it&apos;s the whole story in one
            motion. In July 2025 TCS announced it would cut about 12,200 roles —
            roughly 2% of its 613,000-strong workforce — its largest reduction
            ever, primarily middle and senior management, even as revenue held.
            CEO K. Krithivasan went out of his way to insist &ldquo;this is not
            because of AI giving some 20% productivity gains. We are not doing
            that… It is not because that we need less people&rdquo; — which is
            exactly the kind of triple-denial that makes you check your wallet.
            Infosys paused fresher onboarding; Wipro turned cautious. Across the
            top five firms, reportedly 80,000+ roles vanished in the eighteen
            months to mid-2025. Revenue steady, headcount falling,
            revenue-per-employee rising. For twenty years those lines moved
            together. Now they&apos;ve divorced, and only one of them got the
            house.
          </p>

          <p>
            Then there&apos;s the quieter, crueler number. Entry-level pay at
            TCS and Infosys — that famous ₹3.5 lakh fresher package — has barely
            moved in nearly two decades. TCS still starts freshers around ₹3.36
            lakh; Infosys around ₹3.6 lakh. Inflation has roughly halved the
            real value of that number since the late 2000s. Indian outlets now
            run the genuinely humiliating comparison that a skilled plumber in
            an Indian metro can out-earn a fresh engineering graduate at a
            marquee IT firm. The escalator that carried a generation upward
            hasn&apos;t just slowed. It&apos;s frozen, and the machine that made
            it move is being unplugged.
          </p>

          <p>
            The final indignity comes from the clients themselves. The Global
            Capability Center — the captive in-house tech center multinationals
            run directly in India — is eating the outsourcers&apos; lunch from
            both ends. In FY26, GCCs added a net ~200,000 people in India versus
            ~110,000 for the whole IT services sector, the third straight year
            GCCs out-hired the industry that trained their talent (per Xpheno
            data). There are around 1,700–1,800 of them, employing 500,000+
            professionals, paying (per NASSCOM/EY benchmarks) 25–40% more than
            equivalent IT-services roles at the mid-senior level, and projected
            to be a $100 billion sector employing 2.5 million people by 2030.
            When Goldman Sachs runs its own 9,000-person operation in Bengaluru,
            that work simply never becomes a TCS contract. Clients figured out
            they can hire the arbitrage directly and skip the middleman&apos;s
            markup. The middleman built the talent pool; the client is now
            shopping in it — and paying more to poach from it.
          </p>

          <p>
            Accenture is the bellwether, and the bell is loud. In one
            three-month stretch of 2025 it cut 11,000+ people (791,000 down to
            779,000) in an $865 million restructuring, with GenAI bookings of
            $5.9 billion for FY2025 — nearly double the prior year. CEO Julie
            Sweet&apos;s line will age like milk or like prophecy: the firm is
            &ldquo;exiting on a compressed timeline people where reskilling,
            based on our experience, is not a viable path for the skills we
            need.&rdquo; Bodies out, AI bookings up. That&apos;s the template,
            and every Indian IT major is being measured against it.
          </p>

          <BlogRelatedAd slug={SLUG} />

          <h2>The counterexample that proves the rule: BigLaw</h2>

          <p>
            Now compare all of that to the one profession getting{' '}
            <em>richer</em> during peak AI adoption. Am Law 100 profits per
            lawyer are up 53.7% since 2019, per Thomson Reuters and Georgetown
            Law&apos;s 2026 Report on the State of the US Legal Market. The
            fiscal-2024 numbers were obscene — $158.3 billion in revenue, up
            13.3%, profits per equity partner of $3.15 million — and 2025 was
            better still. Law firms are adopting AI aggressively; legal AI
            startup Harvey went from $100 million ARR in August 2025 to roughly
            $190 million by year-end and a $200 million raise at an $11 billion
            valuation (co-led by GIC and Sequoia) in March 2026, now used across
            most of the Am Law 100. Its CEO Winston Weinberg says AI
            &ldquo;isn&apos;t just assisting lawyers. It&apos;s becoming the
            system through which legal work gets done.&rdquo;
          </p>

          <p>
            So why is law thriving while consulting sweats? Because a lawyer
            signs the brief, carries personal liability, can be sanctioned or
            disbarred, and operates in an adversarial system where the other
            side is <em>paid</em> to catch your AI&apos;s mistakes. When judges
            started sanctioning lawyers for AI-hallucinated citations, they
            weren&apos;t slowing AI down — they were hard-coding the requirement
            that a licensed human verify every word. Accountability is the moat.
            You can&apos;t hallucinate your way past a bar association.
          </p>

          <p>Here&apos;s the whole essay in one table:</p>

          <div
            className='blog-table-wrap'
            role='region'
            aria-label='Accountability moat by industry'
          >
            <table>
              <thead>
                <tr>
                  <th scope='col'>Industry</th>
                  <th scope='col'>Accountability moat</th>
                  <th scope='col'>What AI does to it</th>
                  <th scope='col'>Verdict</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>BigLaw</strong>
                  </td>
                  <td>
                    Highest — licensure, personal liability, disbarment,
                    adversarial stakes
                  </td>
                  <td>
                    Amplifies the lawyer; hallucination sanctions{' '}
                    <em>enforce</em> human review
                  </td>
                  <td>Thriving — profits per lawyer +53.7% since 2019</td>
                </tr>
                <tr>
                  <td>
                    <strong>Big 4 — Audit</strong>
                  </td>
                  <td>
                    High — mandatory audits, engagement-partner signature
                  </td>
                  <td>
                    Full-population testing makes it cheaper, not optional
                  </td>
                  <td>Survives as a commoditized regulated utility</td>
                </tr>
                <tr>
                  <td>
                    <strong>MBB / Strategy</strong>
                  </td>
                  <td>
                    Medium — brand-as-insurance, CEO access (no legal moat)
                  </td>
                  <td>
                    Self-cannibalizes; associate factory shrinks; outcome
                    pricing
                  </td>
                  <td>Revenue holds, headcount doesn&apos;t</td>
                </tr>
                <tr>
                  <td>
                    <strong>Big 4 — Advisory</strong>
                  </td>
                  <td>Low — no mandate, no signature</td>
                  <td>Directly automates the deliverable</td>
                  <td>Naked and exposed — first to get cut</td>
                </tr>
                <tr>
                  <td>
                    <strong>Indian IT</strong>
                  </td>
                  <td>Essentially none — pure bodies-for-hours</td>
                  <td>
                    Attacks the entire value proposition; GCCs insource the rest
                  </td>
                  <td>
                    Revenue may adapt; the employment model is being demolished
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Notice the ranking is almost perfectly ordered by one variable, and
            it isn&apos;t AI capability. Law firms don&apos;t have better AI
            than McKinsey. They have better <em>law</em>.
          </p>

          <h2>
            The problem every single one of them is pretending not to have
          </h2>

          <p>
            Here&apos;s where I stop being glib, because there&apos;s one thing
            all five share, and it&apos;s genuinely frightening in a
            slow-moving way.
          </p>

          <p>
            The partners, principals, signing auditors, and lead architects of
            2035 were supposed to be doing grunt work <em>right now</em>.
            That&apos;s the whole point of the pyramid — it was never just a
            profit machine, it was an apprenticeship. You did four years of
            soul-crushing document review or deck-building or bug-fixing, and
            somewhere in that misery you absorbed judgment. You learned what a
            weird transaction smells like, why a client is actually angry, when
            the model is confidently wrong. Nobody teaches that in a seminar.
            You catch it, like a cold, from proximity to hard, boring work.
          </p>

          <p>
            AI just ate the hard, boring work. So the industries are gleefully
            cutting the exact cohort that was supposed to become the expensive,
            irreplaceable seniors — the accountability layer — a decade from
            now. The Big 4 cut grads by up to 29% into a demographic cliff where
            the AICPA estimates 75% of US CPAs are within 15 years of retirement
            and CPA exam candidates have fallen 43% since 2016. BigLaw runs
            entry-level hiring roughly flat and lets lateral hires (49% of
            associate hires in 2025) outnumber fresh graduates (38%) while
            everyone assumes the senior pipeline refills itself by magic. Indian
            IT freezes fresher intake. Consulting contracts its associate
            factory and pays the ones it let go $110 an hour to train the
            replacement.
          </p>

          <p>
            Every one of them is optimizing a beautiful short-term margin by
            quietly eating its own seed corn. AI can draft the memo, run the
            population test, and build the deck. It cannot yet be the named
            human who stakes a license, a reputation, and a liability on the
            answer being right — and that named human is exactly the person
            these firms have stopped growing. The moat that protects the
            survivors is <em>made of accountable senior humans</em>, and the
            industry just defunded the factory that produces them.
          </p>

          <p>
            The rope sellers, it turns out, aren&apos;t just teaching the rope
            to tie the knot. They&apos;re also declining to raise the next
            generation of people who&apos;d know when not to pull it.
          </p>
        </div>

        <BlogContinueReading slug={SLUG} />
        <BlogHook />

        <footer className='blog-article__footer'>
          <p>
            Written by{' '}
            <a href={SITE_URL} rel='author'>
              Arvind Narayan
            </a>
            . Bengaluru, July 2026.
          </p>
          <Link href='/blogs' className='blog-article__back'>
            ← All posts
          </Link>
        </footer>
      </article>
    </main>
  );
}
