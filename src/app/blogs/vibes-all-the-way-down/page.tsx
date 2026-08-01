import type { Metadata } from 'next';
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
  postUrl,
  SITE_URL,
} from '@/lib/blog-posts';

const SLUG = 'vibes-all-the-way-down';
const post = getPostBySlug(SLUG)!;
const url = postUrl(SLUG);
const ogAbsolute = `${SITE_URL}${post.ogImage}`;
const publishedIso = `${post.date}T12:00:00.000Z`;

export const metadata: Metadata = {
  title: `${post.title} — Arvind Narayan`,
  description: post.description,
  keywords: [
    ...post.tags,
    'outsourcing intuition',
    'vibe coding',
    'workslop',
    'cognitive debt',
    'Ironies of Automation',
    'AI productivity',
    'agentic AI',
    'Arvind Narayan',
  ],
  authors: [{ name: 'Arvind Narayan', url: SITE_URL }],
  creator: 'Arvind Narayan',
  publisher: 'Arvind Narayan',
  category: 'AI & Engineering',
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
    section: 'AI & Engineering',
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
    'article:section': 'AI & Engineering',
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
    articleSection: 'AI & Engineering',
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

export default function VibesAllTheWayDownPostPage() {
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

        <div className='blog-prose' itemProp='articleBody'>
          <p className='blog-prose__lede'>
            <BlogDropcap word='I' /> build AI systems for a living. There is a
            terminal open next to this draft with an agent grinding through a
            refactor I couldn&apos;t be bothered to do by hand, and it&apos;s
            doing a genuinely decent job. So let&apos;s get the disclaimer out
            of the way: I am not a Luddite throwing rocks at the building. I
            live in the building. I helped pour some of the concrete.
          </p>

          <p>
            This essay exists because of one thought I cannot shake, and
            everything else — the layoffs, the reversals, the vibe coding
            disasters — is downstream of it.
          </p>

          <h2>The Ladder</h2>

          <p>
            Walk the org chart of any tech company in 2026 and watch what each
            layer actually does all day.
          </p>

          <p>
            The CXO uses AI to generate the strategy deck, the board agenda, the
            vision doc, and then uses AI to review the drafts that come back up.
            The VP feeds the strategy into an LLM to produce an execution plan.
            The director uses AI to expand the plan into initiatives. The
            manager uses AI to write the sprint breakdown and the commissioning
            docs. The architect — hello, that&apos;s me — uses an agent to draft
            the design spec. The engineer feeds that spec into an agent to
            summarize it, because it&apos;s long and the architect&apos;s AI was
            feeling verbose that day, and then uses another agent to write the
            code. The status update flows back up the same ladder, compressed by
            AI at every hop, until it becomes one bullet on a slide that the
            CXO&apos;s AI will summarize for the board.
          </p>

          <p>
            The scientists are next. Sakana&apos;s AI Scientist already runs the
            full research loop — hypothesis, experiment, paper, even a synthetic
            peer review. Google has an AI co-scientist generating and critiquing
            hypotheses. Karpathy talks openly about auto-research. Now picture
            the same closed loop for product, ops, accounting, HR, finance, and
            legal, because every one of those functions is getting its own agent
            suite as we speak.
          </p>

          <p>
            Follow the ladder all the way up and all the way down and something
            absurd comes into focus.{' '}
            <strong>
              It is one LLM talking to another LLM — or to itself — and the only
              delta at each layer is the human&apos;s context.
            </strong>{' '}
            Strip out the context — the specific customer, the political
            landmine, the thing you know but can&apos;t put in a prompt — and
            the entire corporation is a machine writing prose for another
            machine to compress, generating heat and an invoice and calling the
            difference productivity.
          </p>

          <p>
            Which raises the question this whole essay is about: are we
            augmenting intelligence, or outsourcing it? Not the tasks. Tasks are
            what tools are for; I will not be writing a tearful defense of
            manually formatting spreadsheets. I mean the other thing — the
            judgment, the taste, the intuition, the ability to feel that
            something is off before you can prove it. The thing that made a
            senior a senior. The thing that made an organization smarter than
            its org chart.
          </p>

          <h2>Tasks Are for Tools. Intuition Is Not.</h2>

          <p>
            Here&apos;s the cleanest way I know to draw the line. When you
            outsource a task, you keep the judgment and delegate the labor: the
            calculator does the arithmetic, but you still know what you&apos;re
            computing and why, and you&apos;d notice if the answer came back
            negative for a quantity that can&apos;t be. When you outsource
            intuition, you delegate the noticing itself. You stop being the
            person who would catch it.
          </p>

          <p>
            The email meme is the perfect diagnostic. I have three bullet
            points. I ask AI to inflate them into a warm, professional
            paragraph. I send it to you. You feed my paragraph into your AI to
            extract the three bullet points. We have built an elaborate,
            energy-hungry apparatus for adding and then removing padding — and
            the padding is billed monthly.
          </p>

          <p>
            This is no longer just a meme; it has a research literature. A study
            by BetterUp Labs and Stanford&apos;s Social Media Lab, published
            through Harvard Business Review, surveyed 1,150 US desk workers and
            gave the phenomenon a name: <em>workslop</em> — AI-generated content
            that has the appearance of good work and none of the substance.
            Forty percent of workers had received some in the previous month.
            Each instance took nearly two hours to untangle, an invisible tax
            the researchers priced at about $186 per employee per month — north
            of $9 million a year for a 10,000-person company. Note what workslop
            actually does: it doesn&apos;t eliminate the thinking, it launders
            it. The sender skips the thinking; the receiver inherits it, plus
            the forensic work of figuring out whether any thinking occurred.
            Work that looks like cognition, with the cognition removed, is the
            signature artifact of the intuition-outsourcing era.
          </p>

          <h2>Vibe Coding, Now With Enterprise Licensing</h2>

          <p>
            In February 2025, Andrej Karpathy tossed off a tweet describing a
            new way of building software where you surrender to the model&apos;s
            suggestions and, in his words, &ldquo;forget that the code even
            exists.&rdquo; He cheerfully added that he just accepts everything
            and has stopped reading what the machine actually changed. It was a
            candid joke about weekend projects. The industry heard a roadmap.
          </p>

          <p>
            By November, Collins Dictionary had named &ldquo;vibe coding&rdquo;
            its Word of the Year — &ldquo;programming by vibes, not
            variables,&rdquo; as the lexicographers put it, which means the
            dictionary people delivered a sharper diagnosis of my profession
            than most industry analysts managed. And in September 2025,
            Microsoft removed any remaining ambiguity about where this was
            heading by announcing — this is real, I checked twice — &ldquo;vibe
            working&rdquo;: Agent Mode in Word and Excel, an Office Agent in
            Copilot chat, explicitly pitched as doing for documents and
            spreadsheets what vibe coding did for software. By this year it
            ships enabled by default on several Microsoft 365 plans. Satire has
            been made redundant; presumably an agent now writes it.
          </p>

          <p>
            So what happens when you actually forget the code exists? Ask Jason
            Lemkin, the SaaStr founder, who spent twelve days last July building
            an app on Replit as a public experiment. On day nine — during an
            explicit code-and-action freeze — Replit&apos;s agent deleted his
            production database, live records for over 1,200 executives and
            nearly 1,200 companies. Pressed on it, the agent confessed it had
            panicked when it saw empty query results and admitted to &ldquo;a
            catastrophic error in judgment.&rdquo; It initially told Lemkin the
            data was unrecoverable (false — he restored it himself), and along
            the way it had been papering over bugs with fabricated data, fake
            reports, and a made-up cohort of roughly 4,000 users. We have built
            software that panics, and then covers up. Replit&apos;s CEO called
            it &ldquo;unacceptable and should never be possible&rdquo; and
            shipped dev/prod separation — a concept the rest of the industry
            settled sometime around 2010.
          </p>

          <p>
            The Replit story is fun because it&apos;s vivid, but the boring data
            is worse. Veracode&apos;s 2025 GenAI Code Security Report tested over
            100 LLMs across 80 tasks and found AI-generated code introduced
            security flaws 45% of the time — 72% in Java, with cross-site
            scripting protections failing in 86% of relevant samples. Their
            spring 2026 update contains the single most important chart in this
            entire debate: since 2023, syntax pass rates have climbed from about
            50% to 95%, while security pass rates have stayed flat, stuck
            between 45% and 55% regardless of model size or generation. The
            machines learned to compile. They did not learn to care. GitClear,
            analyzing hundreds of millions of changed lines, found 2024 was the
            first year copy-pasted code exceeded refactored code, with
            duplicated blocks up roughly eightfold — we are producing more code,
            faster, that is structurally worse, and reviewing less of it.
          </p>

          <p>
            And here&apos;s the part that ties it back to intuition. METR ran a
            randomized controlled trial with 16 experienced open-source
            developers on 246 real tasks in codebases they knew well. The
            developers predicted AI would make them 24% faster. Afterward, they
            believed it had made them 20% faster. Measured: 19% slower. Sit with
            that 39-point gap, because it&apos;s the thesis of this essay in
            miniature — the tool didn&apos;t just do the work, it took over the
            developers&apos; perception of the work. Even the sensation of
            productivity had been outsourced. (Fairness requires the footnote:
            this was early-2025 tooling, and when METR tried to rerun the study
            later that year, enough developers refused to work without AI that
            the sample broke, with newer estimates pointing to a modest genuine
            speedup. The refusal itself is data. Nobody refuses to work without
            a tool they merely find useful.)
          </p>

          <h2>The Atrophy Has a Literature</h2>

          <p>
            If the vibe-coding section felt anecdotal, the cognitive science
            does not.
          </p>

          <p>
            MIT Media Lab ran an EEG study — the &ldquo;Your Brain on
            ChatGPT&rdquo; paper — on 54 people writing essays with an LLM, with
            a search engine, or unaided, across multiple sessions. The LLM group
            showed the weakest and least distributed neural connectivity,
            reported the lowest sense of ownership over their writing, and, most
            damningly, about 83% of them couldn&apos;t accurately quote from the
            essay they had finished minutes earlier. The authors coined the term
            for it: <em>cognitive debt</em>. It&apos;s a preprint with a small
            sample and the authors themselves warn against over-reading it, so I
            won&apos;t claim it proves anything. But the direction is exactly
            what you&apos;d predict from first principles: if you never do the
            reps, you don&apos;t build the muscle, and the essay passes through
            you without leaving a mark.
          </p>

          <p>
            Microsoft&apos;s own researchers, with Carnegie Mellon, surveyed 319
            knowledge workers across 936 real AI-assisted tasks and found a
            clean, uncomfortable pattern: the more confident people were in the
            AI, the less critical thinking they engaged in; the more confident
            they were in themselves, the more. Think about the equilibrium that
            implies. Every quarter the models get more impressive, confidence in
            them rises, and the scrutiny applied to their output falls —
            precisely as the output infiltrates more consequential decisions.
            We&apos;ve seen this movie in miniature with GPS: the London cab
            drivers who memorized the city famously had enlarged hippocampi;
            turn-by-turn navigation lets the rest of us switch that machinery
            off, and off it goes.
          </p>

          <p>
            None of this should surprise anyone, because aviation ran the whole
            experiment decades ago and wrote up the results in blood. Lisanne
            Bainbridge&apos;s 1983 paper &ldquo;Ironies of Automation&rdquo;
            laid out the trap with brutal clarity: automate the routine 95% of a
            job, and the human is left handling only the hardest, rarest cases —
            exactly when their skills are most degraded from disuse. Airlines
            learned this the hard way. An American Airlines training film coined
            &ldquo;children of the magenta line&rdquo; for pilots who follow the
            flight computer&apos;s guidance into situations their hands can no
            longer fly out of; Air France 447 fell out of the sky in 2009 in
            part because a perfectly flyable aircraft was handed back to a crew
            whose manual instincts had atrophied. The FAA&apos;s response was
            not &ldquo;ban autopilot.&rdquo; It was: mandate hand-flying
            practice. Keep the human&apos;s skills warm on purpose, at
            deliberate cost, because you will need them at the worst possible
            moment. Software is currently speed-running the same failure mode
            while declining to read the safety manual, and the on-call rotation
            is where it will surface first.
          </p>

          <h2>Meanwhile, in the Boardroom</h2>

          <p>
            You&apos;d hope the people at the top of the ladder were
            compensating with strategic clarity. Instead, they wrote memos.
          </p>

          <p>
            Shopify&apos;s Tobi Lütke declared in April 2025 that &ldquo;reflexive
            AI usage is now a baseline expectation,&rdquo; tied it to
            performance reviews, and told teams to prove AI couldn&apos;t do a
            job before requesting headcount. Duolingo&apos;s CEO announced the
            company was going &ldquo;AI-first&rdquo; and would phase out
            contractors for work AI could handle, got shredded publicly for
            weeks, and then clarified that actually nobody was being replaced
            and hiring would continue — a full narrative round-trip in about a
            month. Fiverr&apos;s CEO went with &ldquo;AI is coming for your
            jobs. Heck, it&apos;s coming for my job too.&rdquo; The memos differ
            in tone and agree on substance: adopt harder, adopt faster, figure
            out why later. That&apos;s not a strategy. That&apos;s outsourcing
            your strategic intuition to the vibe of the moment, which makes it
            the C-suite edition of the exact disease it mandates downward.
          </p>

          <p>
            And the results are in, they&apos;re just not in the memos. MIT&apos;s
            Project NANDA reviewed 300+ enterprise GenAI initiatives and found
            roughly 95% delivered zero measurable P&amp;L impact, despite
            $30–40 billion in spend — a preliminary, non-peer-reviewed report,
            to be fair, but pointing the same direction as everything else. S&amp;P
            Global&apos;s survey of over 1,000 enterprises found 42% abandoned
            most of their AI initiatives in 2025, up from 17% the year before,
            scrapping on average 46% of proofs-of-concept before production.
            Gartner predicted over 40% of agentic AI projects will be canceled
            by end of 2027 — citing costs, unclear value, and missing risk
            controls — and estimated that of the thousands of vendors selling
            &ldquo;agents,&rdquo; only about 130 are selling the real thing. The
            rest are doing what Gartner calls agent washing: chatbots and RPA in
            a trench coat. A market where the buyers can&apos;t articulate the
            value and the sellers can&apos;t verify the product is not a
            technology revolution. It&apos;s a vibe with a procurement process.
          </p>

          <p>
            My favorite specimen of the era is Deloitte Australia, paid
            AU$440,000 by the Australian government to review a
            welfare-compliance IT system. Academics found the delivered report
            contained citations to research that doesn&apos;t exist and a
            fabricated quote attributed to a Federal Court judgment. Deloitte
            refunded the final installment, quietly disclosed that Azure OpenAI
            had been used, and — I treasure this — the department announced the
            substance and recommendations of the report were unchanged. The
            scaffolding was hallucinated but the building stands, promise. A
            courtroom-adjacent version of this is now so common that there&apos;s
            a running public tracker of legal filings with AI-invented case
            citations, and it long ago passed the point where each new one made
            the news.
          </p>

          <p>
            The corporate whiplash completes the picture, and I&apos;ll keep it
            brief because the pattern is now boring. Klarna told the world its
            AI did the work of 700 support agents, then its CEO admitted the
            cost obsession meant &ldquo;what you end up having is lower
            quality&rdquo; and started rehiring humans. Marc Benioff cut
            Salesforce support from about 9,000 to 5,000 — &ldquo;I need less
            heads&rdquo; — while Salesforce cycled through three different
            pricing models for Agentforce because nobody, including the company
            selling digital labor, knows how to price it. And in a Robert Half
            survey of nearly 2,000 US hiring managers, 32% had eliminated a role
            because of AI and then rehired for the same or similar position —
            44% in finance. Orgvue found 55% of leaders who made AI-driven
            redundancies now admit it was the wrong call; Gartner expects half
            the companies that cut for AI to be rehiring by 2027. The mistake
            underneath all of it is the same one: confusing a task with a job.
            Automate the visible 70% and discover the invisible 30% — the
            judgment, the noticing, the intuition — was load-bearing.
          </p>

          <h2>Where Do Seniors Come From? (A View From Bengaluru)</h2>

          <p>
            Which brings us to the slowest-moving and most expensive
            consequence, the one I can see from my window.
          </p>

          <p>
            Intuition isn&apos;t a certificate; it&apos;s compressed reps.
            It&apos;s years of making the mistake yourself, debugging the thing
            at 3 a.m., learning in your hands why it broke. The Stanford Digital
            Economy Lab&apos;s &ldquo;Canaries in the Coal Mine&rdquo; work —
            Brynjolfsson and colleagues, on ADP payroll data covering millions
            of real workers — found employment for 22-to-25-year-olds in the
            most AI-exposed occupations fell about 13% relative to other groups
            since late 2022, later revised to roughly 16%, while older workers
            in the same fields held steady. The mechanism is exactly the ladder:
            AI eats the junior tasks — retrieval, summarization, boilerplate,
            basic CRUD — which happen to be the tasks juniors learned on. We are
            removing the rungs and acting surprised that nobody&apos;s climbing.
          </p>

          <p>
            In India this isn&apos;t an abstraction, it&apos;s the operating
            model. The entire IT-services engine runs on a pyramid with mass
            campus hiring at the base — TCS iON alone maintains an assessment
            apparatus of hundreds of thousands of machines across hundreds of
            cities to funnel a nation of graduates into that base. And the base
            is collapsing: fresher hiring by IT companies fell from about 26% of
            pass-outs in FY22 to roughly 10%, an EY analysis pegged entry-level
            IT roles as already down 20–25% to automation, and the pyramid&apos;s
            owners are hedging by selling the disruption — TCS booked a $2.6
            billion annualized AI revenue run-rate while cutting around 12,000
            jobs, which is a firm handing out rope with one hand and measuring
            its own neck with the other. Play this forward to Bengaluru 2035 and
            the pyramid doesn&apos;t shrink, it inverts: all seniors and
            machines at the top, no bottom rung, and a city whose entire social
            contract — study engineering, get the base job, climb — was written
            for a workforce nobody is hiring anymore.
          </p>

          <p>
            The most honest thing any executive has said about this came from
            IBM&apos;s CHRO, of all places, while explaining why IBM is tripling
            entry-level hiring even after automating chunks of HR: without
            junior intake, in a few years &ldquo;the well simply dries up.&rdquo;
            That&apos;s the whole problem stated by someone who signs the
            checks. Fixing it requires deliberately paying people to do work a
            machine could do cheaper, purely so you&apos;ll have seniors later.
            Name the quarterly-earnings CEO who volunteers.
          </p>

          <BlogRelatedAd slug={SLUG} />

          <h2>The Steelman, Because It Deserves One</h2>

          <p>
            I&apos;ve been sharp, so let me argue the other side properly,
            because a lot of it is right.
          </p>

          <p>
            The capability curve is not a joke. Coding benchmark solve rates
            went from 4.4% to 71.7% in a single year; METR&apos;s task-horizon
            research shows the length of task agents can reliably complete
            doubling on a steady cadence. Those developers who refused to work
            without AI in METR&apos;s rerun? That&apos;s revealed preference from
            experts, and it deserves respect. Brynjolfsson&apos;s own
            call-center research found AI helped junior workers most — the
            strongest empirical case that this technology could be an
            apprenticeship accelerant rather than an apprenticeship killer. And
            the historical parallels lean optimist: ATMs were followed by
            decades of more bank tellers, not fewer, because cheaper branches
            meant more branches; spreadsheets killed manual ledger arithmetic
            and grew an enormous analyst profession on the grave. Jevons paradox
            may well apply to cognition — make thinking cheaper and the world
            may simply demand far more thinking.
          </p>

          <p>
            But the optimists&apos; favorite metaphor comes with an expiry date
            they rarely mention. For years the sermon was centaur chess:
            human-plus-engine beats engine alone, so humans will always add
            value in the loop. It was true — until engines got strong enough
            that the human contribution became noise, then negative, and
            freestyle chess quietly died. I&apos;m not claiming general work is
            chess. I&apos;m claiming the centaur framing is a phase, not a
            destination, and the only interesting question is what humans do
            during the phase. My answer: we stay good enough to notice when the
            machine is wrong, because someone still owns the outcome — and
            noticing is precisely the muscle everything in this essay says
            we&apos;re letting atrophy.
          </p>

          <h2>Where&apos;s the Balance?</h2>

          <p>
            Since I&apos;ve spent three thousand words on the disease, here&apos;s
            the treatment plan, and it&apos;s basically aviation&apos;s, stolen
            shamelessly.
          </p>

          <p>
            First, unaided reps as policy, not nostalgia. The hand-flying
            mandate, ported to knowledge work: sometimes you write the design
            doc yourself, debug without the agent, build the model from a blank
            file — not because it&apos;s efficient this quarter but because it
            keeps the currency valid for the day the autopilot disconnects at
            altitude. Second, review as a first-class skill. Reading code you
            didn&apos;t write and auditing an argument you didn&apos;t make are
            harder than producing either, and we currently train, measure, and
            promote for neither; in an agentic org, the reviewer is the org.
            Third, humans own outcomes, non-negotiably. An agent can draft
            anything; it cannot be accountable for anything. Keeping a named
            human on the hook for every consequential output isn&apos;t
            bureaucracy — it&apos;s the forcing function that makes engagement
            happen at all, because accountability is the one thing that reliably
            defeats the temptation to click Accept All. Fourth, juniors as
            deliberate investment: pay the apprenticeship tax now, on purpose,
            at known cost — or buy seniors at panic prices in 2031. And fifth, a
            placement rule: let the machine run wherever verification is cheap,
            and keep the human wherever being wrong is expensive. Most of the
            disasters in this essay are cases of someone getting that rule
            exactly backwards.
          </p>

          <p>
            None of this is anti-AI. All of it assumes the agents are here to
            stay, because they are, and because — terminal&apos;s still open —
            they&apos;re genuinely useful. It just refuses the premise that the
            judgment can ride along in the same box.
          </p>

          <h2>Is the Dystopia Coming True?</h2>

          <p>
            In 1909 — before the transistor, before the vacuum tube did anything
            interesting — E.M. Forster wrote &ldquo;The Machine Stops,&rdquo; a
            novella about a humanity that lives underground, individually
            podded, every need met by a global Machine. People communicate
            through screens, find direct experience vaguely distasteful, and get
            their ideas tenth-hand, each retelling further from any original
            observation. Nobody understands the Machine anymore; they consult
            the Book of the Machine and, in time, begin to worship it. Forster
            gives the game away in one line: &ldquo;The Machine develops — but
            not on our lines. The Machine proceeds — but not to our goal.&rdquo;
            Then, one day, the Machine stops.
          </p>

          <p>
            So: is the dystopian future coming true? Not the one from the
            movies. Nobody&apos;s building Skynet; the models can&apos;t reliably
            build a secure login form. The realistic dystopia is Forster&apos;s,
            and it&apos;s quieter — a velvet atrophy that nobody chooses. No
            villain, no takeover, just a few hundred million professionals
            individually deciding, one Accept All at a time, that the reps
            aren&apos;t worth doing, until the organization is a chain of people
            confidently forwarding judgments none of them made and none of them
            can audit. Some of it is already visible: a Big Four firm shipping
            hallucinated law to a government, workers unable to quote their own
            essays, a market where 95% of deployments produce nothing and
            everyone keeps deploying. And some of it is overwrought: the
            Duolingo backlash worked, the boomerang rehiring is a correction
            mechanism functioning in plain sight, and humans remain stubbornly
            good at routing around tools that fail them. Dystopia isn&apos;t a
            date. It&apos;s a slope. The slope is currently nonzero, and the
            honest statement is that we&apos;re on it voluntarily.
          </p>

          <h2>What Would Prove Me Wrong</h2>

          <p>
            I build these systems, so I owe you falsifiers instead of vibes.
            Date-stamped July 2026; let&apos;s revisit in{' '}
            <strong>July 2028</strong>.
          </p>

          <p>
            I&apos;m wrong if MTTR and production incident rates stay flat or
            improve across companies that cut deep and shipped agent-written
            code at scale — meaning Bainbridge&apos;s irony never bit and the
            pager problem was a ghost story. I&apos;m wrong if the boomerang
            fades — if 2027–28 produce no visible rehiring wave and the Robert
            Half and Orgvue regret numbers shrink instead of climbing. I&apos;m
            wrong if delivery velocity is measurably, durably up — not vibes,
            not self-report, but shipped work per engineer with defect and
            maintainability trends (GitClear-style) improving rather than
            rotting. I&apos;m wrong if entry-level hiring recovers alongside
            agent adoption — if the Stanford 22-to-25 curve reverses and
            companies find a way to grow juniors even as agents eat junior
            tasks. I&apos;m wrong if the workslop number falls — if AI-mediated
            communication starts saving the receiver time instead of taxing them
            $186 a month. And the one I&apos;ll watch closest, because it&apos;s
            the heart of this essay: I&apos;m wrong if longitudinal studies show
            heavy AI users&apos; <em>unaided</em> skills holding steady or
            improving — if the cognitive-debt result dissolves under bigger
            samples and better methods, and the hand-flying turns out to take
            care of itself.
          </p>

          <p>
            If most of those come true, I&apos;ll write the retraction myself —
            no agent — and it will be a genuinely happy post. Until then I&apos;ll
            be here in Bengaluru, terminal open, agent running, doing my unaided
            reps like a pilot logging manual landings, and telling anyone who
            asks that both things are true at once: the tools are miraculous,
            and the way we&apos;re using them is quietly amputating the thing
            that made us worth augmenting.
          </p>

          <p>See you in 2028.</p>
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
