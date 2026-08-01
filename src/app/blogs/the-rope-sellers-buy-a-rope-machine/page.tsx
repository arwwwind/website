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

const SLUG = 'the-rope-sellers-buy-a-rope-machine';
const post = getPostBySlug(SLUG)!;
const url = postUrl(SLUG);
const ogAbsolute = `${SITE_URL}${post.ogImage}`;
const publishedIso = `${post.date}T12:00:00.000Z`;

export const metadata: Metadata = {
  title: postDocumentTitle(post),
  description: post.description,
  keywords: [
    ...post.tags,
    'TCS',
    'Infosys',
    'Wipro',
    'HCLTech',
    'Claude',
    'Anthropic',
    'Nifty IT',
    'AI agents',
    'dealership',
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

export default function TheRopeSellersBuyARopeMachinePostPage() {
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
            <BlogDropcap word='A' /> follow-up to{' '}
            <Link href='/blogs/the-rope-sellers'>
              &ldquo;The Rope Sellers.&rdquo;
            </Link>{' '}
            Quick recap of that one: professional services survive on
            accountability moats. Indian IT is the purest bodies-for-hours
            pyramid ever built, and it has no moat. This is the part where the
            pyramid meets the machine that automates pyramids.
          </p>

          <h2>Two quotes, eleven months apart</h2>

          <p>
            July 2025. TCS announces its largest layoff ever, about 12,000
            people. CEO K. Krithivasan tells Moneycontrol:
          </p>

          <blockquote>
            This is not because of AI giving some 20% productivity gains. We are
            not doing that&hellip; It is not because that we need less people.
          </blockquote>

          <p>
            June 2026. Tata Sons chairman N. Chandrasekaran, at the TCS AGM:
          </p>

          <blockquote>
            If the company has half a million employees, the day is not far when
            the company will have half a million AI agents.
          </blockquote>

          <p>
            He adds that TCS is &ldquo;unlikely to hire the same number of
            people&rdquo; because portions of the work will go to the agents.
          </p>

          <p>
            Same company. Same leadership. Eleven months.
          </p>

          <p>
            So which is it? AI has nothing to do with headcount, or AI is about
            to become half your workforce? The answer, obviously, is that it
            depends who&apos;s asking. Tell the press AI isn&apos;t taking jobs.
            Tell shareholders AI is the entire future. The gap between those two
            statements is the gap between transformation and panic, and
            everything in this post lives inside that gap.
          </p>

          <h2>The market already voted, and it voted with a chainsaw</h2>

          <p>
            Let&apos;s start with the part the press releases don&apos;t
            mention: the stock prices, which are on fire, and not in the good
            way.
          </p>

          <p>
            The Nifty IT index is down roughly 29% in 2026, making it the
            worst-performing sectoral index of the year, sitting nearly 30%
            below its December 2024 peak. Individually: TCS down about 33% for
            the year, trading at its lowest level since August 2020, with its
            market cap slipping below ₹10 lakh crore. Wipro down ~31%, flirting
            with ₹170. Infosys down ~27%, hitting a 52-week low of ₹1,030
            against a ₹1,727 high it touched in February. HCL Tech down ~30%.
            LTIMindtree down ~34%. Brokerages have started capitulating too —
            Nirmal Bang downgraded TCS to an outright Sell with a target of
            ₹1,693, roughly half its old target.
          </p>

          <p>
            Two triggers keep repeating in the selloff coverage, and both are
            hilarious in a grim way.
          </p>

          <p>
            <strong>Trigger one:</strong> Accenture, the industry&apos;s
            bellwether, cut its FY26 revenue guidance and said the quiet part
            loud — client budgets are not expanding despite all the excitement
            about AI. Its stock dropped ~18% overnight and dragged the entire
            Indian IT complex down with it. Clients are interested in AI. They
            are just not interested in paying IT vendors <em>more</em> for it.
            They&apos;re interested in paying them <em>less</em>. Remember the
            &ldquo;AI discount&rdquo; from the last post? The market finally did
            the math.
          </p>

          <p>
            <strong>Trigger two</strong>, and this is the one I&apos;d frame and
            hang on a wall: in June 2026, Indian IT stocks fell for five
            straight sessions, with the Nifty IT index plunging over 5% in a
            single day, and one of the cited triggers was reporting that
            Anthropic&apos;s Claude Code can sharply reduce the cost and
            complexity of modernizing legacy software systems.
          </p>

          <p>
            Read that again. Legacy modernization is one of Indian IT&apos;s
            bread-and-butter revenue lines. Anthropic is the company TCS,
            Infosys, and Cognizant all signed glossy &ldquo;strategic
            partnerships&rdquo; with. Their partner shipped a product update,
            and their stocks fell off a cliff, because the market understood
            instantly what the partnership announcements were designed to
            obscure:{' '}
            <strong>
              the thing they&apos;re reselling is the thing that eats them.
            </strong>
          </p>

          <p>Which brings us to the actual thesis of this post.</p>

          <h2>The partnerships are share-price defense, not strategy</h2>

          <p>
            Look at the timing. Infosys hit its 52-week high on February 3,
            2026. It announced its Anthropic partnership that same month, as the
            AI-disruption selloff was gathering. TCS announced its &ldquo;Global
            Premier Partner&rdquo; status in the Claude Partner Network in June
            2026 — the exact month its stock was hitting multi-year lows.
            Cognizant upgraded its Anthropic partnership in July 2026. Accenture
            launched an entire &ldquo;Accenture Anthropic Business Group&rdquo;
            in December 2025, right before its guidance cut.
          </p>

          <p>
            Every one of these announcements landed while the stock was bleeding
            or about to bleed. That&apos;s not a coincidence and it&apos;s not a
            strategy. It&apos;s a press-release IV drip. When your stock is down
            30% on fears that AI destroys your business model, you announce an
            AI partnership. Not because it changes anything — because the
            announcement is the product. The audience is the shareholder, not
            the client.
          </p>

          <p>
            And what are these partnerships, mechanically? TCS will &ldquo;equip
            50,000 associates with Claude.&rdquo; Infosys will build
            Claude-based agents for regulated industries. Cognizant will deploy
            Claude to its developers. Strip the adjectives and every single one
            is the same arrangement:{' '}
            <em>
              we will implement someone else&apos;s model for our clients, and
              pay the model company for the privilege.
            </em>
          </p>

          <p>
            This is a car dealership. Anthropic builds the engine. TCS sells it,
            installs it, services it, and takes a margin on the labor. There is
            nothing shameful about being a dealership — dealerships make money —
            but let&apos;s not stand in the showroom calling ourselves an
            automotive innovator. The dealership doesn&apos;t own the engine,
            doesn&apos;t set the engine&apos;s price, and gets exactly zero say
            when the engine company ships a self-installing engine. Which, per
            the June selloff, it just did.
          </p>

          <p>
            Everest Group analysts are already warning these firms need
            &ldquo;model portability, abstraction layers, fallback models&rdquo;
            as standard practice. Translation: your strategic partnership is a
            dependency with a logo.
          </p>

          <BlogRelatedAd slug={SLUG} />

          <h2>How we got here: twenty years of not even trying</h2>

          <p>
            None of this was inevitable. It&apos;s the bill for two decades of
            choosing comfortable margins over building anything.
          </p>

          <p>
            Indian IT was born in panic — other people&apos;s panic. Y2K needed
            billions of lines of ancient COBOL fixed fast and cheap, India had
            the English-speaking engineers who still knew mainframe languages,
            and software exports went from $1 billion in 1997 to $6.2 billion by
            2001. Y2K gave the industry its delivery model, its reputation, and
            its cash. Everything since has been the same trick at bigger scale:
            bill a body in dollars, pay it in rupees, keep the spread.
          </p>

          <p>
            Every few years someone announced the model was dead, and every time
            they were wrong. SaaS was supposed to kill IT services — if
            Salesforce hosts your CRM, who needs the consultants? Instead,
            someone had to integrate Salesforce with SAP, sync the data
            warehouse, customize the workflows, and babysit the whole
            contraption. SaaS created a decade-long systems-integration boom.
            &ldquo;The end of IT jobs&rdquo; became an inside joke.
          </p>

          <p>
            I&apos;m deliberately not leaning on that pattern for comfort this
            time, and here&apos;s why in one sentence:{' '}
            <strong>
              SaaS complemented IT labor; agentic AI is built to{' '}
              <em>substitute</em> for it.
            </strong>{' '}
            The integration work, the maintenance, the migration, the ticket
            queues, the code itself — the new technology automates the exact
            complementary work that saved the industry last time. Maybe
            enterprise AI deployment turns out to be so messy that it becomes
            the new integration tax and the body shops get another twenty years.
            That&apos;s possible. But it&apos;s a bet, not a law of nature, and
            the people making the bet show no sign of understanding the
            technology well enough to price it.
          </p>

          <p>
            How would they? Look at the R&amp;D line. TCS, Infosys, and Wipro
            spend roughly 0.3–0.5% of revenue on R&amp;D. Accenture spends about
            double that share and it&apos;s rising. The companies actually
            building AI — Google, Microsoft, Meta, Amazon — spend north of $20
            billion a year each. TCS&apos;s R&amp;D budget is a footnote you
            need a magnifying glass to find. For twenty years the margins were
            too good to bother. Why build IP when renting people pays 25%?
          </p>

          <p>
            And when the industry did briefly produce a technical,
            innovation-minded CEO, it fired him.
          </p>

          <p>
            Vishal Sikka, Infosys&apos;s first non-founder CEO, backed OpenAI in
            2015 — a donation, he confirmed in February 2026, of &ldquo;$3
            million or something like that,&rdquo; back when OpenAI was a pure
            nonprofit. Sikka pushed the Nia AI platform, design thinking, moving
            up the value chain. He was ground down by a public war with founder
            Narayana Murthy over strategy, governance, and pay, and resigned in
            August 2017 citing a &ldquo;continuous drumbeat of
            distractions.&rdquo; The stock fell 10% the day he left. He was
            replaced by Salil Parekh, who returned Infosys to services-first
            cost discipline and generous buybacks — exactly the
            finances-over-innovation trade the board wanted.
          </p>

          <p>
            Nine years after donating to OpenAI, Infosys signed a partnership
            with OpenAI. To resell OpenAI&apos;s models. The company that could
            have owned a sliver of the AI revolution now runs one of its
            dealerships. If you wrote this as fiction, an editor would cut it
            for being too on the nose.
          </p>

          <h2>
            The present: record profits, mass layoffs, and a dividend firehose
          </h2>

          <p>
            Here&apos;s the current picture, and notice that no two pieces of it
            are compatible.
          </p>

          <p>
            TCS closed FY26 with revenue of ₹2.67 lakh crore, net profit of
            ₹52,820 crore, and 25% operating margins — a four-year high. Not a
            distressed company. In the same year: net headcount down more than
            23,000, largest layoff in company history, and ₹39,571 crore paid
            out in dividends under a policy of returning 80–100% of free cash
            flow to shareholders. Record margins, staff cuts, and essentially
            all the cash shipped out the door — while R&amp;D stays at
            rounding-error levels. That is the balance sheet of a company{' '}
            <em>harvesting</em> a mature business, narrated in the vocabulary of
            a company transforming.
          </p>

          <p>
            The AI theater is everywhere. TCS&apos;s &ldquo;AI revenue&rdquo;
            run-rate went $1.5B → $1.8B → $2.3B across three quarters, which
            sounds great until you notice it&apos;s ~7% of revenue and &ldquo;AI
            revenue&rdquo; is a category elastic enough to include any project
            with a model in the same building. Infosys announced it trained
            250,000 employees in AI and GenAI — then cut 8,440 people in a
            single quarter. Train a quarter million people in the technology,
            quietly shed the people. Nobody squares those on the same earnings
            call, because they can&apos;t be squared.
          </p>

          <p>
            Meanwhile the fresher package sits where it&apos;s sat since roughly
            the UPA government: ₹3.5 lakh, its real value halved by inflation,
            to the point where Indian outlets now run the &ldquo;a metro plumber
            out-earns a TCS fresher&rdquo; comparison unironically. And the
            trained mid-level talent is walking out the side door to Global
            Capability Centers — the in-house India tech centers of
            multinationals — which now number 2,117, employ 2.36 million people
            on $98.4 billion of revenue, hired over 5 lakh people in 2026 alone,
            and pay 12–20% more. The service firms built the talent pool. Their
            clients are now hiring from it directly and skipping the markup.
          </p>

          <h2>Meanwhile, China is playing an entirely different sport</h2>

          <p>
            Here&apos;s the comparison that should keep every Indian IT board
            awake, and doesn&apos;t.
          </p>

          <p>
            While Indian IT signed dealership agreements, Chinese firms built
            the cars. Chinese open-weight models went from 1.2% of global LLM
            usage in late 2024 to roughly 30% by late 2025, per OpenRouter&apos;s
            study of 100 trillion tokens of real traffic. Alibaba&apos;s Qwen
            family passed one billion cumulative downloads on Hugging Face by
            March 2026 — the fastest any open-source model family has ever hit
            that mark — captured over half of all global open-source model
            downloads, and has 180,000+ derivative models, more than Google and
            Meta combined. In February 2026 alone, Qwen logged 153.6 million
            downloads: more than the next eight competitors <em>combined</em>.
            DeepSeek shipped V4 in July 2026. Moonshot&apos;s Kimi K3 is a
            serious agentic coding model. Stanford and Berkeley researchers
            train top-performing models on Qwen bases for $30–50.
          </p>

          <p>
            And China turned this into foreign policy. At the 2026 World AI
            Conference, Xi Jinping launched a 29-nation AI alliance and called
            open-source AI a &ldquo;rare, historic opportunity.&rdquo;
            Singapore&apos;s OCBC bank runs DeepSeek and Qwen internally.
            Indonesia&apos;s Indosat builds on DeepSeek. Malaysia is building
            sovereign AI on Huawei silicon. The Global South&apos;s default AI
            stack is increasingly Chinese, because it&apos;s open, cheap, and
            good.
          </p>

          <p>
            Remember when the stereotype was that China copies and India codes?
            China took US chip sanctions — an actual, deliberate attempt to
            kneecap its AI industry — and responded by building leaner, cheaper
            frontier-adjacent models and giving them away as geopolitical
            strategy. India&apos;s IT industry, facing no sanctions, sitting on
            $280+ billion of annual revenue and the world&apos;s largest
            engineering workforce, responded to the same decade by&hellip;
            increasing dividends.
          </p>

          <p>
            The national picture is barely better. The IndiaAI Mission&apos;s
            five-year budget is about ₹10,371 crore (~$1.2 billion), of which
            roughly ₹400 crore had actually been released by early 2026. A
            single US hyperscaler spends more on R&amp;D in two weeks. Sarvam AI
            is the honorable exception — genuine from-scratch foundational
            models built in India, a $1.5 billion valuation, $150 million from
            HCLTech (credit where due: the only major that bought equity in a
            model builder rather than a reseller badge). One Sarvam does not
            close a two-orders-of-magnitude gap.
          </p>

          <p>
            DeepSeek reportedly trained a frontier-class reasoning model for
            single-digit millions. That figure is debated, but even the
            skeptical estimates land well inside what TCS pays out in dividends
            in a <em>week</em>. The capability was purchasable. The choice not
            to buy it was a choice.
          </p>

          <h2>The BPO wing is on a shorter fuse</h2>

          <p>
            The voice side of outsourcing doesn&apos;t get the luxury of a slow
            debate. Contact centers are ~95% labor cost, and voice agents now
            resolve routine calls in under 90 seconds, 24/7, with zero
            attrition. Gartner projects conversational AI cuts contact-center
            labor costs by $80 billion in 2026, and that by 2029 agentic AI
            resolves 80% of common customer-service issues autonomously.
          </p>

          <p>
            The market has priced it: Teleperformance fell 19% in a single day
            back when Klarna bragged its OpenAI assistant did the work of 700
            agents, and short interest has since climbed past 12% of float.
            Concentrix dropped 25% in one session after cutting guidance.
            Capgemini bought WNS for $3.3 billion explicitly to rebuild it
            around &ldquo;agentic operations.&rdquo; The Philippine BPO
            association — an industry of ~1.9 million jobs — revised its own
            2028 employment forecast <em>downward</em>, from a hoped-for 2.5
            million to roughly flat. When an industry lobby cuts its own
            headcount projection, believe it before you believe any CEO.
          </p>

          <p>
            Firms like [24]7.ai, whose entire pitch is conversational
            automation, are in the awkward position of promising to bring the
            disruption themselves while owning none of the underlying models.
            That&apos;s not a moat, that&apos;s a franchise agreement with your
            replacement.
          </p>

          <p>
            One honest caveat: Klarna itself over-rotated and re-hired humans
            for complex cases. Tier-1 call volume is going away fast; the
            buildings won&apos;t be empty by 2028. But the headcount line points
            down and it is not coming back.
          </p>

          <h2>The future: three sortings</h2>

          <h3>The adapters</h3>

          <p>
            The path exists and a few firms are actually on it. It runs through
            owning things: vertical IP in regulated, liability-bearing domains
            where the accountability moat from{' '}
            <Link href='/blogs/the-rope-sellers'>the last post</Link>{' '}
            actually applies. Wipro raising its stake in insurtech Aggne to 80%
            and running FCA-regulated life-and-pensions administration is
            coherent. TCS&apos;s sovereign-AI and data-center play (100MW+ with
            OpenAI) is coherent — infrastructure is something you own. HCLTech
            buying into Sarvam is coherent. Notice the pattern: the coherent
            moves involve equity and assets, not partner badges.
          </p>

          <h3>The zombies</h3>

          <p>
            The default path. Keep reselling frontier models at thinning
            margins, keep announcing reskilling numbers while cutting the
            reskilled, keep the dividend firehose running, and slowly discover
            that outcome-based pricing — which clients are already demanding,
            and which LTIMindtree&apos;s CEO says clients are
            &ldquo;excited&rdquo; about (of course they are, it&apos;s their
            money) — priced your revenue down without you building anything a
            client couldn&apos;t get elsewhere. Zombies don&apos;t collapse.
            They just become smaller every year with excellent margins, like a
            beautifully managed melting ice cube.
          </p>

          <h3>The macro problem nobody owns</h3>

          <p>
            IT-BPM is ~7% of India&apos;s GDP, the largest chunk of its services
            exports, and for thirty years it was the escalator that turned
            engineering graduates into a dollar-earning middle class.
            Chandrasekaran has already said out loud that hiring won&apos;t
            track revenue anymore. If revenue survives on an AI-delivered,
            outcome-priced model, it survives with far fewer people — and GCCs,
            hiring 5 lakh a year at a premium, absorb only the top slice. The
            arithmetic for the other two million graduates a year does not
            close, and no earnings call is going to close it.
          </p>

          <h2>Conclusion</h2>

          <p>
            Put the whole thing in one paragraph. These firms spent twenty years
            choosing margins over R&amp;D, fired the one CEO who bet on OpenAI
            before it was cool, and are now — with stocks down 30% and clients
            demanding AI discounts — announcing dealership agreements with the
            very companies whose products triggered the selloff, timed
            suspiciously to the worst weeks of the crash. The layoffs are
            &ldquo;not about AI&rdquo; in July and the company is &ldquo;half a
            million AI agents&rdquo; by June. A quarter million employees are
            trained in the technology that&apos;s thinning their ranks. The
            dividends flow, the R&amp;D doesn&apos;t, and across the water China
            went from meme to shipping half the world&apos;s open-source AI in
            eighteen months.
          </p>

          <p>
            Transformation and panic look identical from outside — both involve
            reorganizations, big announcements, and the word &ldquo;AI&rdquo;
            said many times. The difference is internal: transformation is
            building toward a position you understand; panic is performing
            understanding for shareholders while the position erodes. The stock
            market, to its credit, has stopped grading the performance and
            started grading the position. That&apos;s what down-33% means.
          </p>

          <blockquote>
            The rope sellers never learned how rope is made. Someone invented a
            machine that makes it free, so they signed a deal to distribute the
            machine, issued a press release about their rope heritage, and paid
            out the rope money as dividends. The market read the press release,
            looked at the machine, and sold.
          </blockquote>

          <h2>References</h2>

          <h3>Stock market</h3>
          <ul className='blog-prose__refs'>
            <li>
              Business Today —{' '}
              <em>
                TCS, HCL Tech, Infosys, Wipro among top IT losers as Nifty IT
                tumbles 24% in 2026
              </em>{' '}
              (June 8, 2026)
            </li>
            <li>
              Business Standard —{' '}
              <em>
                Nifty IT index tanks 9% in 4 days; Wipro, TCS down up to 6%
              </em>{' '}
              (June 8, 2026);{' '}
              <em>
                Nifty IT slips 2%; TCS, Infosys, HCL Tech down up to 3%
              </em>{' '}
              (June 23, 2026)
            </li>
            <li>
              India TV — Infosys crashes 8% to 52-week low of ₹1,030 after
              Accenture guidance cut; Accenture −18% overnight (June 19, 2026)
            </li>
            <li>
              Multibagg / market coverage — Nifty IT −29% YTD; five-session
              selloff linked to Anthropic Claude Code legacy-modernization
              claims (June 11, 2026); TCS market cap below ₹10 lakh crore;
              Nirmal Bang downgrade of TCS to Sell, target ₹1,693
            </li>
            <li>
              Kotak Neo — Nifty IT 52-week low 26,634.50 (June 19, 2026)
            </li>
          </ul>

          <h3>TCS statements &amp; financials</h3>
          <ul className='blog-prose__refs'>
            <li>
              Moneycontrol — K. Krithivasan interview on July 2025 layoffs
              (&ldquo;not because of AI&rdquo;)
            </li>
            <li>
              TCS AGM coverage, June 2026 — N. Chandrasekaran &ldquo;half a
              million AI agents&rdquo; remarks
            </li>
            <li>
              TCS Q4 FY26 press release — revenue ₹2,67,021 crore, net profit
              ₹52,820 crore, 25% operating margin; FY26 dividend ₹39,571 crore
            </li>
          </ul>

          <h3>Partnerships</h3>
          <ul className='blog-prose__refs'>
            <li>
              TCS–Anthropic Global Premier Partner announcement (June 2026);
              Infosys–Anthropic (February 2026); Cognizant–Anthropic expansion
              (July 2026); Accenture Anthropic Business Group (December 2025);
              Infosys–OpenAI partnership (February 2026)
            </li>
            <li>
              Everest Group commentary on model portability and abstraction
              layers
            </li>
          </ul>

          <h3>History &amp; R&amp;D</h3>
          <ul className='blog-prose__refs'>
            <li>
              Vishal Sikka, India Today AI Summit (February 2026) — on the 2015
              OpenAI donation
            </li>
            <li>
              Infosys 2017 resignation coverage; Sikka resignation letter
              (&ldquo;drumbeat of distractions&rdquo;)
            </li>
            <li>
              Company annual reports — R&amp;D as % of revenue for
              TCS/Infosys/Wipro vs Accenture; hyperscaler R&amp;D budgets from
              public filings
            </li>
            <li>
              Deccan Chronicle — India&apos;s IT rise and the Y2K origin story
            </li>
          </ul>

          <h3>GCCs &amp; workforce</h3>
          <ul className='blog-prose__refs'>
            <li>
              NASSCOM–Zinnov &ldquo;GCC Value Orbit&rdquo; report (July 2026) —
              2,117 GCCs, 2.36M professionals, $98.4B revenue
            </li>
            <li>
              Business Today — GCC hiring crossing 5.1 lakh in 2026
            </li>
            <li>
              Storyboard18 — Infosys Q4 FY26 headcount cut of 8,440; attrition
              data
            </li>
          </ul>

          <h3>BPO / voice AI</h3>
          <ul className='blog-prose__refs'>
            <li>
              Gartner — $80B contact-center labor cost reduction (2026); 80%
              autonomous resolution by 2029
            </li>
            <li>
              Reuters — Teleperformance share crash on Klarna news
            </li>
            <li>
              Concentrix FY26 guidance cut coverage; Capgemini–WNS $3.3B
              acquisition (2025)
            </li>
            <li>
              IBPAP (Philippines) revised 2028 employment forecasts
            </li>
            <li>
              Forrester (Kate Leggett) — Klarna &ldquo;overpivoted&rdquo;
            </li>
          </ul>

          <h3>China</h3>
          <ul className='blog-prose__refs'>
            <li>
              OpenRouter / a16z token-usage study via South China Morning Post —
              Chinese open-source models ~30% of global usage (December 2025)
            </li>
            <li>
              Forbes —{' '}
              <em>
                China&apos;s DeepSeek V4 and Qwen Reshape the Open-Source AI Race
              </em>{' '}
              (April 2026): Qwen 1B downloads, 180K derivatives, February 2026
              download share
            </li>
            <li>
              Startup Fortune / WAIC 2026 coverage — Xi Jinping&apos;s 29-nation
              AI alliance, Global South adoption
            </li>
            <li>
              Digital in Asia —{' '}
              <em>What is China&apos;s AI Strategy in 2026</em>: OCBC, Indosat,
              Malaysia sovereign AI examples; USCC &ldquo;Two Loops&rdquo; staff
              paper (March 2026)
            </li>
          </ul>

          <h3>India AI</h3>
          <ul className='blog-prose__refs'>
            <li>
              IndiaAI Mission budget (₹10,371 crore) and disbursement reporting
              (~₹400 crore by early 2026)
            </li>
            <li>
              Tech Times — Sarvam AI $1.5B valuation, HCLTech $150M investment
              (June 2026)
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
            . Bengaluru, August 2026.
          </p>
          <Link href='/blogs' className='blog-article__back'>
            ← All posts
          </Link>
        </footer>
      </article>
    </main>
  );
}
