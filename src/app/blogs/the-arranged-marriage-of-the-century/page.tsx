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

const SLUG = 'the-arranged-marriage-of-the-century';
const post = getPostBySlug(SLUG)!;
const url = postUrl(SLUG);
const ogAbsolute = `${SITE_URL}${post.ogImage}`;
const publishedIso = `${post.date}T12:00:00.000Z`;

export const metadata: Metadata = {
  title: postDocumentTitle(post),
  description: post.description,
  keywords: [
    ...post.tags,
    'Maruti Suzuki',
    'Hero Honda',
    'SoftBank',
    'Daiichi Sankyo',
    'DoCoMo',
    'Sakana AI',
    'Sarvam',
    'Tokyo Electron',
    'Shinkansen',
    'India-Japan',
    'Arvind Narayan',
  ],
  authors: [{ name: 'Arvind Narayan', url: SITE_URL }],
  creator: 'Arvind Narayan',
  publisher: 'Arvind Narayan',
  category: 'India & Japan',
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
    section: 'India & Japan',
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
    'article:section': 'India & Japan',
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
    articleSection: 'India & Japan',
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

export default function TheArrangedMarriageOfTheCenturyPostPage() {
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
            <BlogDropcap word='In' /> the winter of 1982, a small, balding, relentlessly frugal Japanese executive named Osamu Suzuki did something his rivals at Toyota and Nissan considered a species of madness. He agreed to bet his company — Suzuki, then Japan&apos;s perpetual fourth-place also-ran, the maker of motorcycles and boxy little kei cars — on a country that most Japanese boardrooms regarded as a bureaucratic swamp of licences, permits, and interminable delay. He signed a joint venture with a state-owned Indian firm named Maruti Udyog, a company that existed largely because of Sanjay Gandhi&apos;s ill-starred dream of a people&apos;s car. The first Maruti 800 rolled off the line in December 1983. It was, by the standards of the age, a modest little hatchback. It became, by any honest accounting, the most consequential automobile in the history of the subcontinent.
          </p>

          <p>
            I begin with this scene not from nostalgia — though I confess a certain
            fondness for the 800, a car in which a great many Indians of my generation
            first learned that the middle class was a place one could actually drive to —
            but because it is the founding parable of an argument I want to make. The
            argument, put plainly, is this: Japan and India are not competitors, nor
            patron and client, nor donor and supplicant. They are, in the precise and
            slightly indelicate sense, complementary. Each possesses, in abundance,
            exactly what the other conspicuously lacks. And the great missed opportunity
            of our decade is that both nations continue to treat this obvious jigsaw fit
            as a matter for diplomatic communiqués and photo-ops rather than what it
            actually is: a marriage proposal that both families keep almost, but not
            quite, accepting.
          </p>

          <p>
            In a <Link href='/blogs/the-middlemans-republic'>previous essay</Link> I
            argued, perhaps too caustically, that Indian innovation remains stuck in a
            copycat&apos;s crouch — a middleman&apos;s republic of clones and
            cost-arbitrage, throttled by underfunded research, a brain drain of the
            ambitious, and a low-trust bureaucracy that treats every entrepreneur as a
            suspect. I stand by all of it. But an indictment is not a strategy, and the
            reader who finishes a diagnosis is entitled to ask about the cure. This essay
            is one answer. The cure for a nation that only knows how to copy software
            might just be a nation that has forgotten how to write it.
          </p>

          <h2>Two Distinguished Families, Two Embarrassing Secrets</h2>

          <p>
            Let us be candid about the families in question, because arranged marriages
            founder precisely when the relatives conceal the inconvenient truths.
          </p>

          <p>
            Japan is the wealthy, punctilious, impossibly well-mannered household at the
            top of the lane. Its dowry is the envy of Asia: a manufacturing culture of
            near-religious precision, the world&apos;s finest robotics, materials science
            bordering on sorcery, the patient capital of a nation that thinks in decades
            rather than quarters, and a process discipline — the <em>kaizen</em>, the
            <em>monozukuri</em> — that turned &ldquo;Made in Japan&rdquo; from a punchline
            in the 1950s into a benediction by the 1980s. On the strength of firms like
            FANUC, Yaskawa, and Kawasaki, Japan long supplied around 45% of the
            world&apos;s industrial robots (a share the International Federation of
            Robotics put at roughly 38% of global production by 2024, as China&apos;s own
            output surged) — names spoken with reverence on every factory floor from
            Stuttgart to Shenzhen.
          </p>

          <p>
            And yet this household harbours a secret it would rather you did not discuss
            at the dinner table. Japan cannot, for the life of it, write software at the
            scale the twenty-first century demands. This is not a slur; it is arithmetic.
            The country&apos;s own Ministry of Economy, Trade and Industry (METI), in its
            landmark 2019 survey of IT human-resource demand, projected the engineering
            shortfall rising from 170,000 in 2015 to roughly 370,000 in 2020 and as many
            as 790,000 by 2030 in its high-demand scenario. The structure of the industry
            is a museum piece: it is commonly estimated that some 70% of Japanese IT
            companies are SIer-type systems integrators, with most engineering talent
            marooned on the vendor side of a multi-layered subcontracting pyramid that
            would be instantly recognisable to a medieval guildsman. In the United States,
            most IT talent sits inside operating companies, quoting for nothing; in Japan,
            the engineer is summoned like a plumber for every specification change. The
            consequence is a Waterfall culture in a world that has moved to continuous
            deployment, a landscape of legacy COBOL systems tended by greying engineers,
            and the notorious &ldquo;2025 Digital Cliff&rdquo; that METI warned could cost
            the economy up to ¥12 trillion a year — a warning, I note drily, that has aged
            into the present tense.
          </p>

          <p>
            The most vivid symptom is the one the accountants track. Per Japan&apos;s
            Ministry of Finance preliminary data released in February 2025, the
            nation&apos;s digital trade deficit — the money it pays out, net, to foreign
            providers of cloud, advertising, and software services, overwhelmingly
            American — hit a record ¥6.46 trillion ($43 billion) in 2024, having more than
            tripled in a decade from ¥2.02 trillion in 2014. METI&apos;s own projection is
            that this &ldquo;digital deficit&rdquo; could balloon to ¥18 trillion by 2035.
            A nation that runs a trade surplus in automobiles is haemorrhaging cash to
            Seattle and Mountain View for the privilege of running its own businesses. And
            atop all this sits the demographic iceberg: a median age of roughly 50, a
            record 29.4% of the population aged 65 or older as of September 2025, and a
            working-age cohort that the National Institute of Population and Social
            Security Research projects will shrink from around 74 million towards 62
            million by 2040.
          </p>

          <p>
            Now consider the household down the hill — noisier, younger, its front garden
            a chaos of unfinished construction and improvised genius. India&apos;s dowry
            is the mirror image of Japan&apos;s shortfall. It has an ocean of software
            talent — some 5.8 million developers, a pool on track to overtake that of the
            United States. It has youth, a median age of about 28, where Japan has age. It
            has scale, hunger, and English. Its Global Capability Centre boom has produced
            more than 1,700 centres employing roughly 1.9 million professionals — not
            back-office call centres but product-engineering and AI hubs for the
            world&apos;s largest firms. Its technology sector booked around $224 billion
            in IT-services exports in FY2025 (NASSCOM Strategic Review 2025), part of a
            $283-billion industry.
          </p>

          <p>
            And India, of course, has its own secret, which I spent an entire previous
            essay excavating: it cannot make things. Its precision manufacturing is thin,
            its deep-tech capital thinner, and its hardware ecosystem exists in a state of
            near-total dependence on China — electronics imports from China of around $38
            billion in the first ten months of 2025 alone (GTRI), and a bilateral trade
            deficit with Beijing that GTRI founder Ajay Srivastava pegged at a record
            $99.2 billion in FY2025, more than doubled from $44 billion in FY2021. Its
            gross expenditure on R&amp;D languishes below 1% of GDP — the Economic Survey
            cites roughly 0.64%, while the Department of Science and Technology&apos;s
            latest tabled figure is 0.84% for FY2023-24. It designs around 20% of the
            world&apos;s chips and manufactures almost none of them.
          </p>

          <p>
            I invite you to read those two paragraphs again and tell me they do not
            describe two people who ought to be introduced. One family has the factory and
            no coders; the other has the coders and no factory. It is almost insulting how
            neatly it fits.
          </p>

          <div
            className='blog-table-wrap'
            role='region'
            aria-label='Japan deficit versus India surplus'
          >
            <table>
              <thead>
                <tr>
                  <th scope='col'>The Japanese Deficit</th>
                  <th scope='col'>The Indian Surplus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>~790,000 IT worker shortfall by 2030 (METI, 2019 survey)</td>
                  <td>~5.8 million software developers, overtaking the US</td>
                </tr>
                <tr>
                  <td>Median age ~50; record 29.4% aged 65+ (Sept 2025)</td>
                  <td>Median age ~28</td>
                </tr>
                <tr>
                  <td>¥6.46 trillion digital trade deficit (2024, MoF)</td>
                  <td>~$224bn IT-services exports FY2025 (NASSCOM)</td>
                </tr>
                <tr>
                  <td>~70% of IT firms are SIer subcontractors</td>
                  <td>1,700+ GCCs, ~1.9m in product/AI roles</td>
                </tr>
                <tr>
                  <td>~45% of world&apos;s industrial robots; materials, precision</td>
                  <td>~20% of world&apos;s chip designers; almost no fabs</td>
                </tr>
                <tr>
                  <td>Patient capital, deep-tech financing</td>
                  <td>R&amp;D ~0.64–0.84% of GDP; $99bn China trade gap</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>The Marriages That Worked</h2>

          <p>
            The sceptic will say: charming theory, but does it actually work in the real
            world of tariffs and temperaments? To which the answer is that it has already
            worked, spectacularly, twice — and the evidence is parked in perhaps a third
            of the driveways of urban India.
          </p>

          <p>
            Return to Osamu Suzuki&apos;s gamble. Four decades on, Maruti Suzuki remains
            the largest carmaker in India, its market share hovering around 40% — 42.5% in
            April 2026, though slipping to 37.1% in March as buyers who once wanted cheap
            now want big — a level of dominance that in most industries would attract the
            attention of a competition regulator. But the truly delicious detail, the one
            that ought to be inscribed above the door of every trade ministry in Tokyo, is
            this: India is now Suzuki&apos;s largest and most important market on earth.
            In the first half of FY23 the Indian arm contributed 55.6% of Suzuki&apos;s
            global unit sales and, at a seven-year high, some 39% of its revenue. The
            Indian subsidiary has at times been worth more than the Japanese parent that
            owns it. Osamu Suzuki did not condescend to India; he was, in the end, rescued
            by it. The pupil became the paymaster.
          </p>

          <p>
            The second marriage was, if anything, more romantic. In 1984 the Munjal family
            of Ludhiana — bicycle makers, of all things — joined hands with Honda to form
            Hero Honda. The Japanese brought the engine technology and the process
            discipline; the Indians brought the distribution network, the feel for a
            market where a motorcycle is not a toy but a household&apos;s economic
            backbone. By 2001 Hero Honda was the largest two-wheeler manufacturer in the
            world. Its Splendor became, for a time, the best-selling motorcycle on the
            planet. &ldquo;Fill it, shut it, forget it&rdquo; entered the vernacular.
            Every second motorcycle sold in India wore the joint badge.
          </p>

          <p>
            That the marriage ended in an amicable divorce in December 2010 does not
            diminish it — indeed, it strengthens my argument. When the couple separated
            after twenty-six years, both partners thrived. Hero MotoCorp, the Indian half,
            remains to this day the world&apos;s largest two-wheeler manufacturer.
            Honda&apos;s wholly-owned Indian arm, HMSI, grew from a 13% domestic share in
            2010-11 to some 27% by 2014-15, becoming Hero&apos;s most formidable rival.
            The joint venture had been so successful that it produced two champions where
            there had been one. If only all divorces enriched both parties so.
          </p>

          <p>
            These were not the only unions. Toyota came with Kirloskar; Honda came,
            separately, with the Siels. But Maruti and Hero Honda are the twin lodestars,
            and their lesson is unambiguous: graft Japanese process discipline onto Indian
            market intelligence and labour, and you do not get a compromise — you get
            category dominance. The whole exceeds the sum of the parts by an embarrassing
            margin.
          </p>

          <BlogRelatedAd slug={SLUG} />

          <h2>The Marriages That Ended in the Lawyers&apos; Office</h2>

          <p>
            Now, no honest matchmaker recites only the happy unions. If I am to persuade
            you that a software-age sequel is worth attempting, I owe you the annulments,
            the acrimony, and the arbitration — because the frictions that wrecked those
            deals are precisely the frictions a new partnership must be engineered to
            survive.
          </p>

          <p>
            Exhibit A, and it is a lulu, is Daiichi Sankyo&apos;s acquisition of Ranbaxy.
            In 2008 the Japanese pharmaceutical giant paid some $4.6 billion for a
            controlling stake in India&apos;s largest drugmaker — a resounding vote of
            confidence in Indian pharma. It curdled into one of the great cautionary tales
            of cross-border dealmaking. Within years Ranbaxy pleaded guilty to seven US
            federal criminal counts and paid $500 million in fines for selling adulterated
            drugs and lying to regulators; the FDA banned products from its plants.
            Daiichi, alleging it had been defrauded — that the Singh brothers had
            concealed the extent of the regulatory rot — wrote down its investment and
            eventually offloaded Ranbaxy to Sun Pharma for $3.2 billion. An arbitration
            tribunal awarded Daiichi around $500 million against Malvinder and Shivinder
            Singh, who were subsequently arrested on separate fraud charges. The Japanese
            had bought, in good faith and at a premium, a pig in a very expensive poke.
          </p>

          <p>
            Exhibit B is even more instructive, because the villain of the piece is not a
            fraudster but a regulator. In 2009 NTT DoCoMo, Japan&apos;s telecom titan,
            invested some $2.6 billion for a stake in Tata Teleservices, with a
            contractual right to exit at half its investment or fair value, whichever was
            higher. When it tried to leave in 2014, the Reserve Bank of India refused to
            permit Tata to pay the agreed price, citing foreign-exchange rules that
            forbade guaranteed returns to foreign investors. A London arbitration tribunal
            ordered Tata to pay $1.17 billion; the RBI tried to block the payment; the
            matter dragged through the Delhi High Court until 2017 before DoCoMo finally
            received its money. Read that sequence again and you will understand, in a
            single anecdote, everything my previous essay said about the low-trust
            bureaucracy: a Japanese firm did everything correctly, won its case in every
            forum, and still had to wage a three-year legal war against India&apos;s own
            central bank to be paid what it was owed. If you were a Tokyo boardroom
            weighing an India bet, this case is the ghost at your feast.
          </p>

          <p>
            Exhibit C is subtler and, to my mind, the most damning. SoftBank — Masayoshi
            Son&apos;s colossus, the single largest Japanese technology bet on India —
            poured billions into the Indian startup scene: Ola, Oyo, Paytm, Snapdeal,
            Flipkart, Grofers. And what, precisely, did Japan&apos;s boldest capital
            finance? It financed, almost to a fault, the clones. A ride-hailing app, a
            hotel-branding aggregator, a payments wallet, an e-commerce also-ran — the
            copy-paste economy I spent a whole essay lamenting. Here was the richest vein
            of Japanese risk capital ever directed at India, and it went not to invention
            but to imitation, not to deep tech but to discounts-funded land-grabs, several
            of which cratered. Son&apos;s Vision Fund posted a ¥4.3 trillion — some $32
            billion — loss in a single fiscal year. The tragedy is not that SoftBank lost
            money; funds lose money. The tragedy is the misallocation: Japanese patient
            capital, the one thing India most desperately needs to fund its hardware and
            deep-tech ambitions, was instead lit on fire subsidising taxi rides. The
            marriage was consummated on entirely the wrong terms.
          </p>

          <p>
            And then there is the bullet train, which deserves a paragraph of its own as
            the perfect allegory of the whole relationship. The Mumbai-Ahmedabad High
            Speed Rail project — Shinkansen technology, sanctioned in 2015, groundbreaking
            in 2017 — was meant to be operational by 2022. It was not. Its original
            completion target slipped and slipped again, defeated not by any engineering
            deficiency but by that most Indian of obstacles: land acquisition. For a full
            year after launch, less than 1% of the required land had been acquired;
            farmers in Maharashtra litigated; a former Japanese minister publicly vented
            his frustration at the missed timelines. Here was Japanese precision — the
            J-slab ballastless track, the E5 trainsets that hold their alignment at 320
            kph — colliding head-on with Indian land records. And yet. As of mid-2026 the
            project has, at last, turned a corner: all 1,389.5 hectares acquired, more
            than 350 km of viaduct standing across Gujarat, a tunnel boring beneath Thane
            Creek, a first operational section between Surat and Bilimora targeted for
            2026 and the fuller corridor pushed towards 2027 and beyond. And here is the
            point the sarcasts miss: throughout the delays, Japan never walked away.
            JICA&apos;s financing came at roughly 0.1% interest over a 50-year term —
            soft-loan terms so patient they border on charitable. That patience, that
            refusal to be spooked, is itself the Japanese dowry. It is exactly the
            temperament India needs and exactly the temperament India tests to
            destruction.
          </p>

          <h2>The Current Courtship</h2>

          <p>
            Which brings us to the present, and to the reason I think this essay is timely
            rather than merely wistful. The families are talking again, and talking
            seriously.
          </p>

          <p>
            In August 2025, Prime Minister Modi travelled to Tokyo for the 15th
            India-Japan Annual Summit and stood beside Prime Minister Shigeru Ishiba to
            announce a target of ¥10 trillion — roughly $68 billion — in Japanese private
            investment into India over the following decade, doubling the previous
            five-year goal. &ldquo;India&apos;s massive market is so full of
            potential,&rdquo; Ishiba told reporters, &ldquo;that incorporating its
            vibrancy will help drive the growth of Japan&apos;s economy.&rdquo; The two
            governments issued a &ldquo;Joint Vision for the Next Decade,&rdquo; launched
            an Economic Security Initiative spanning semiconductors, critical minerals,
            clean energy and pharmaceuticals, and — crucially for my argument — adopted an
            action plan for human-resource mobility: the two-way movement of 500,000
            people over five years, including 50,000 skilled Indian professionals bound
            for Japan. Modi, with one eye on Donald Trump&apos;s 50% tariffs on Indian
            exports, told Japan Inc. that &ldquo;capital doesn&apos;t just grow in India,
            it multiplies.&rdquo; JETRO&apos;s own surveys, he noted, found 80% of
            Japanese companies wanting to expand in India and 75% already profitable
            there.
          </p>

          <p>
            The semiconductor thread is the most tangible. The India-Japan Semiconductor
            Supply Chain Partnership, formalised in July 2023, has since produced real
            commitments rather than mere memoranda. Tokyo Electron — one of the handful of
            firms on earth, alongside ASML and Applied Materials, without whose equipment
            no advanced chip can be made — has partnered with Tata Electronics to supply
            and service the tools for India&apos;s first commercial fab at Dholera in
            Gujarat (a roughly $11-billion, 28-nanometre project) and its
            assembly-and-test facility at Jagiroad in Assam, opening offices in both and
            pledging to train Indian technicians. Japan&apos;s Renesas has inaugurated
            Indian design centres working on 3-nanometre architecture and is backing the
            CG Power OSAT venture in Gujarat with a reported $915 million; Sumitomo
            Chemical and others are engaging on the photoresists and ultra-pure gases in
            which Japan holds a 70–90% global share. In December 2025, ROHM announced a
            power-semiconductor alliance with Tata. Modi and Ishiba even toured Tokyo
            Electron&apos;s plant at Sendai together. This is the synergy in embryo:
            Japanese materials and equipment mastery, married to Indian design talent and
            Indian fabs. It is, for now, concentrated at the least complex end of the
            value chain — a humble 28nm beginning — but it is a beginning.
          </p>

          <p>
            The talent flow, too, is real, if still modest. There were 56,686 Indian
            nationals in Japan as of June 2025 — the community concentrated in
            Tokyo&apos;s Nishi-Kasai district, the &ldquo;Little India&rdquo; of Edogawa
            Ward that first filled with Indian engineers during the Y2K remediation
            scramble at the turn of the century. Rakuten now runs roughly half of its
            70-plus global businesses from India; the largest single occupational category
            of Indians in Japan is technology, humanities and international business, at
            nearly 13,000 people. The direction of travel is unmistakable: an ageing
            nation that once recruited Indian coders to patch its millennium bug is now,
            structurally and permanently, dependent on that same talent to climb down from
            its Digital Cliff.
          </p>

          <p>
            And there is a poetic full circle worth savouring. In August 2025, at
            Suzuki&apos;s Hansalpur plant in Gujarat — a ₹21,000-crore facility heading
            towards a million-unit annual capacity — Modi flagged off production of the
            eVitara, Suzuki&apos;s first-ever battery-electric vehicle, made in India,
            built on the dedicated HEARTECT-e platform, with lithium-ion batteries
            produced locally by the Toshiba-Denso-Suzuki joint venture. It will be
            exported to over 100 countries — including, and here is the sweetness of it,
            Japan itself. Within two months more than 6,000 units had shipped from Pipavav
            port, making Maruti India&apos;s largest EV exporter. The country that in 1983
            taught India to build a small car will now import electric cars built by
            Indians. The pupil is not merely the paymaster; the pupil now ships product
            back to the master&apos;s own showroom. If that is not the arranged marriage
            bearing fruit, I do not know what is.
          </p>

          <h2>The Synergy Map: What the Marriage Should Actually Build</h2>

          <p>
            Diplomatic communiqués are cheap; ¥10 trillion is a number, not a plan. If
            this partnership is to be more than a decade of ribbon-cuttings, it needs a
            concrete programme of co-creation. Here, then, is my prescriptive core — six
            ventures the two nations should be building in earnest, and one geopolitical
            reason they must.
          </p>

          <h3>1. Digitise the Japanese SME, with Indian SaaS</h3>

          <p>
            Japan has some 3.3 million small and medium enterprises, the vast bulk of them
            staring over the Digital Cliff with no in-house engineers and no SIer willing
            to take so small a contract. This is the single largest under-served software
            market in the developed world, and the Japanese government subsidises the
            software spend. Indian SaaS and IT-services firms should treat it as their
            next great frontier — not as body-shopped subcontractors to the SIer pyramid,
            but as direct providers of productised, localised software. The prize is
            nothing less than a share of that ¥6.46 trillion digital deficit, redirected
            from Seattle to Bengaluru.
          </p>

          <h3>2. Robotics hardware plus Indian vision-and-AI software</h3>

          <p>
            FANUC, Yaskawa, and Kawasaki build the finest robot arms on earth — and then
            bolt onto them control software that is, to put it charitably, of an earlier
            era. Pair that world-beating hardware with Indian computer-vision and
            machine-learning teams and you have the intelligent, adaptable,
            cheap-to-programme industrial robot that the China+1 factory floor is crying
            out for. Japan owns the body; India can supply the brain.
          </p>

          <h3>3. Semiconductors: the whole value chain, jointly</h3>

          <p>
            Japan holds a 70–90% share of key global semiconductor materials and a
            formidable position in equipment; India designs some 20% of the world&apos;s
            chips and is now, at Dholera and Jagiroad, learning to fabricate and package
            them. The Tokyo Electron-Tata and Renesas-CG Power ventures are the first
            bricks. The ambition should be an integrated India-Japan chip corridor —
            Japanese gases, chemicals and tools; Indian design and assembly — deliberately
            architected as an alternative to the China-centric supply chain, with the
            explicit goal of climbing from 28nm towards the advanced nodes over the
            decade.
          </p>

          <h3>4. The &ldquo;Fit to Standard&rdquo; ERP migration wave</h3>

          <p>
            Japan&apos;s SAP reckoning arrives in 2027, when mainstream maintenance for
            its most widely used ERP core ends, forcing thousands of Japanese firms to
            migrate off customised legacy systems onto standardised cloud platforms. This
            is a multi-year, multi-billion-dollar wave of work — and Indian services
            giants are positioned to ride it. TCS cracked Japan through partnership rather
            than pure subcontracting: its 2014 joint venture with Mitsubishi Corporation
            merged three entities into TCS Japan, in which TCS has since raised its stake
            to 66%, building an operation with well over $600 million in revenue and
            thousands of local associates. Infosys has its own venture with Hitachi,
            Panasonic and Pasona. The migration wave is the near-term, bankable heart of
            the whole thesis.
          </p>

          <h3>5. Joint sovereign AI for the non-Anglophone world</h3>

          <p>
            Here is the most intellectually exciting frontier, and it has two poster
            children. Japan&apos;s Sakana AI — founded by David Ha, Llion Jones (a
            co-author of the &ldquo;Attention Is All You Need&rdquo; paper) and Ren Ito —
            closed a ¥20-billion ($135 million) Series B on 17 November 2025 at a $2.65
            billion valuation, becoming Japan&apos;s most valuable unlisted startup,
            backed by MUFG, Khosla Ventures, NEA, Lux Capital and In-Q-Tel. Its bet is
            &ldquo;efficiency-first&rdquo; AI: evolutionary model-merging that breeds new
            models rather than training them from scratch, explicitly a wager against
            brute-force compute. India&apos;s Sarvam AI, in February 2026, unveiled
            Sarvam-105B — a 105-billion-parameter mixture-of-experts model trained from
            scratch on Indian infrastructure (over a thousand H100s at Yotta&apos;s
            cluster) under the IndiaAI Mission, supporting all 22 official Indian
            languages, built for a reported $50 million. Two Asian efficiency-AI siblings,
            each refusing to concede that the future of AI must be a Californian monopoly
            of trillion-dollar compute. A joint India-Japan effort on sovereign models and
            shared compute for the world&apos;s non-English-speaking majority is the
            natural, and thrilling, next step.
          </p>

          <h3>6. EV and battery co-manufacture</h3>

          <p>
            The eVitara is the template: design and capital from Japan, manufacturing
            scale and cost discipline from India, batteries co-produced by a tripartite
            Japanese JV on Indian soil, product exported to the world including Japan.
            Extend it — to cells, to power electronics (the ROHM-Tata alliance), to the
            whole electrified drivetrain — and you have a China+1 EV supply chain that
            neither nation could build alone.
          </p>

          <p>
            And the glue that binds all six: <strong>China.</strong> Both nations live
            under the same shadow. Japan has spent a decade de-risking from a China on
            which it remains dangerously dependent for rare earths and components; India
            runs a $99-billion-and-widening trade deficit with a neighbour it fought on
            the Himalayan frontier as recently as 2020. &ldquo;China+1&rdquo; is not a
            slogan for these two; it is an existential supply-chain imperative. The
            Quad&apos;s critical-minerals work, the semiconductor corridor, the rare-earth
            cooperation folded into the 2025 Economic Security Initiative — all of it is,
            at bottom, two anxious neighbours deciding they would rather depend on each
            other than on Beijing. Geopolitics, for once, is pushing in exactly the
            direction economics already points.
          </p>

          <p>
            Space, I will note only briefly, offers the loftiest symbol: the LUPEX mission
            — designated Chandrayaan-5, financially sanctioned by India in March 2025 —
            will send an ISRO lander and a JAXA rover to hunt for water ice at the
            Moon&apos;s south pole, launching on a Japanese H3 rocket later this decade
            (2027-28 on current schedules). Indian lander, Japanese rover. The marriage,
            quite literally, reaching for the Moon.
          </p>

          <h2>The Frictions, and the One Trap That Would Ruin Everything</h2>

          <p>
            I would be a poor matchmaker, and a worse essayist, if I ended on the swelling
            strings without naming the obstacles — because they are formidable and a few
            of them are lethal.
          </p>

          <p>
            The first is language. Japanese business runs, stubbornly and comprehensively,
            in Japanese. The SIer world expects JLPT certifications and <em>keigo</em>
            honorifics; the Indian engineer&apos;s comfort zone is English-only and blunt.
            This is not a trivial barrier; it is the reason Indian IT firms have found
            Japan the hardest of all developed markets to crack, with revenue from Japan
            stuck in the single digits as a share of the total for most of them. The
            second is cultural: the <em>nemawashi</em> and <em>ringi</em> of Japanese
            consensus — the patient, whole-organisation, bottom-up circulation of a
            decision until everyone has affixed their seal — sits in almost comic
            opposition to Indian <em>jugaad</em>, the improvised, move-fast,
            break-things-and-apologise-later hustle. Waterfall meets the hackathon. One
            side documents for forty pages; the other ships and iterates. Neither is
            wrong, but the friction is real and it burns hours.
          </p>

          <p>
            The third is Japan&apos;s genuine ambivalence about immigration — a society
            that has only recently, and reluctantly, accepted that its demographic maths
            leaves it no choice but to import people, and where many Indian engineers
            still work a few years and return home rather than settle. The fourth is the
            money: a weak yen and salaries that, for a top-tier Indian engineer, make
            Tokyo distinctly less attractive than San Francisco or even a Bengaluru GCC.
            Japan is competing for Indian talent in a global auction, and its offer is not
            always the highest bid. And the fifth is the DoCoMo problem, still
            unexorcised: the Indian bureaucracy&apos;s capacity to spook patient capital,
            to turn a contractual exit into a three-year court battle, to make the simple
            act of getting paid an ordeal. No quantity of summit communiqués will fix
            this; only the boring, unglamorous work of legal and regulatory reform will.
          </p>

          <p>
            But the deepest danger is none of these. It is subtler, and it is the one I
            most fear, because it is the path of least resistance. It is the risk that
            &ldquo;co-creation&rdquo; quietly degenerates into body-shopping — that the
            great India-Japan partnership becomes nothing more than Indian engineers
            slotted in as cheap subcontract labour at the bottom of the SIer pyramid,
            coding to someone else&apos;s spec, owning nothing, inventing nothing,
            learning nothing they could not have learned in a Chennai back-office in 2004.
            That outcome would betray both nations at once. It would leave Japan&apos;s
            structural software problem untouched — merely outsourced, not solved — and it
            would replicate, with a Japanese accent, the exact middleman pattern that my
            previous essay indicted as the tragedy of Indian tech. Cheap hands for hire is
            not a marriage; it is a transaction, and transactions do not compound.
          </p>

          <p>
            The whole point of Maruti and Hero Honda was that they were <em>joint
            ventures</em> — shared equity, shared risk, shared upside, technology
            genuinely transferred rather than merely rented. Suzuki did not body-shop
            Indian labour; it built a company that eventually outgrew its parent. That,
            and nothing less, is the standard. If the sequel is to be worthy of the
            originals, the Indian side must insist on being a co-creator — a partner with
            skin in the game and a name on the patent — and the Japanese side must resist
            the seductive, familiar comfort of treating India as merely a cheaper floor of
            the subcontracting tower.
          </p>

          <h2>A Closing, in the Register of the Wedding Toast</h2>

          <p>
            I have deployed the marriage metaphor throughout this essay with, I hope, more
            affection than whimsy, and I want to end by taking it seriously rather than
            cutely.
          </p>

          <p>
            Arranged marriages, in the tradition I grew up around, are not built on the
            lightning-strike of romance. They are built on something the sceptical West
            often underrates: complementarity, the patient judgment of families that these
            two people, whatever their surface differences, need what the other has and
            will grow into a love that infatuation could never have sustained. They begin
            not with passion but with fit, and — when they work — they end with a
            partnership deeper than either party could have designed alone.
          </p>

          <p>
            Japan and India are not in love. They will never be in love; they are too
            different in tempo, in temperament, in the very grammar of how they make
            decisions. Japan will always find India maddening — the delays, the
            litigation, the improvisation where a plan was expected. India will always
            find Japan exasperating — the meetings, the seals, the forty-page logs, the
            glacial consensus. There will be more DoCoMos, more Ranbaxys, more bullet
            trains that arrive a decade late. Of this I have no doubt.
          </p>

          <p>
            But love was never the point. The point is that a nation with the world&apos;s
            finest factories and no one left to write its software, and a nation with the
            world&apos;s largest pool of coders and no factory to call its own, have been
            introduced by history, by demography, and now by the plain arithmetic of a
            shared and rising China. The dowries are complementary to the point of
            absurdity. The elders have, at last, sat down to negotiate. And somewhere in
            Gujarat, an electric car designed in Hamamatsu and built by Indian hands is
            being loaded onto a ship bound for Yokohama — proof, if the families needed
            any, that when these two households actually commit, the offspring tends to
            conquer the world.
          </p>

          <p>
            The first marriage gave India the car it drove into the middle class. The
            sequel, if both families can only find the nerve to sign, could give both
            nations the century. Not the &ldquo;Asian century&rdquo; of the
            conference-circuit cliché — I promised no such phrase without irony, and I
            keep my promises — but something smaller, truer, and harder-won: two flawed,
            ageing-and-young, precise-and-improvised civilisations discovering that their
            weaknesses were, all along, the exact shape of each other&apos;s strengths.
          </p>

          <p>
            The banns have been read. It remains only to see whether anyone has the
            courage to say <em>I do</em>.
          </p>

          <h2>Sources &amp; Further Reading</h2>

          <h3>The Historical Marriages</h3>

          <ul className='blog-prose__refs'>
            <li>
              Global Suzuki —{' '}
              <a
                href='https://www.globalsuzuki.com/ir/library/financialpresentation/pdf/2026/ibp_20260317.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                Update on India Business
              </a>
              {' '}(Mar 2026 IR deck; Maruti share / India contribution).
            </li>
            <li>
              IBEF Maruti Suzuki showcase; Autopunditz / CarBikeGPT monthly share data (2026).
            </li>
            <li>
              Screener.in / Statista — Maruti Suzuki company profile (1983 first car; Suzuki stake).
            </li>
            <li>
              Business Standard — Maruti&apos;s share of Suzuki global sales / India revenue highs (contemporary coverage).
            </li>
            <li>
              Forbes India — Hero MotoCorp after the Honda split; Pawan Munjal / Hero journey features.
            </li>
            <li>
              Business Standard — Hero vs Honda post-split share trajectory (HMSI 13% → 27%).
            </li>
            <li>
              Autopunditz — &ldquo;Journey from Hero Honda to Hero v/s Honda.&rdquo;
            </li>
          </ul>

          <h3>The Divorces</h3>

          <ul className='blog-prose__refs'>
            <li>
              Fortune —{' '}
              <a
                href='https://fortune.com/2013/05/23/the-latest-to-claim-fraud-at-generic-lipitor-maker-ranbaxy-its-owners/'
                target='_blank'
                rel='noopener noreferrer'
              >
                &ldquo;The latest to claim fraud at generic Lipitor maker Ranbaxy&rdquo;
              </a>
              {' '}(2013); see also{' '}
              <a
                href='https://fortune.com/2013/05/15/dirty-medicine/'
                target='_blank'
                rel='noopener noreferrer'
              >
                &ldquo;Dirty medicine&rdquo;
              </a>
              .
            </li>
            <li>
              Fierce Pharma —{' '}
              <a
                href='https://www.fiercepharma.com/regulatory/daiichi-accuses-ranbaxy-shareholders-of-hiding-info-before-buyout'
                target='_blank'
                rel='noopener noreferrer'
              >
                Daiichi accusations against Ranbaxy shareholders
              </a>
              ; Forbes —{' '}
              <a
                href='https://www.forbes.com/sites/naazneenkarmali/2013/05/24/indian-billionaire-brothers-prepare-to-fight-daiichi-sankyo/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Singh brothers / Daiichi dispute
              </a>
              .
            </li>
            <li>
              Tata–DoCoMo —{' '}
              <a
                href='https://economictimes.indiatimes.com/news/company/corporate-trends/court-accepts-tata-docomo-agreement-rejects-rbi-objection/articleshow/58415100.cms'
                target='_blank'
                rel='noopener noreferrer'
              >
                Economic Times
              </a>
              ;{' '}
              <a
                href='https://www.business-standard.com/article/companies/tata-docomo-case-delhi-hc-okays-1-18-billion-damages-rejects-rbi-s-plea-117042800842_1.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                Business Standard
              </a>
              {' '}(Delhi HC, Apr 2017).
            </li>
            <li>
              SoftBank Vision Fund —{' '}
              <a
                href='https://techcrunch.com/2023/05/11/softbank-vision-fund-loses-32-billion-in-a-year-on-startups-valuation-cut/'
                target='_blank'
                rel='noopener noreferrer'
              >
                TechCrunch
              </a>
              {' '}($32bn / ¥4.3tn annual loss); Hindu BusinessLine contemporaneous coverage.
            </li>
            <li>
              Mumbai–Ahmedabad HSR — PIB project updates; YourStory / Deccan Herald / The Metro Rail Guy land-acquisition and progress coverage (through mid-2026).
            </li>
          </ul>

          <h3>The Current Courtship</h3>

          <ul className='blog-prose__refs'>
            <li>
              15th India–Japan Annual Summit —{' '}
              <a
                href='https://www.mofa.go.jp/s_sa/sw/in/pageite_000001_00005.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                MOFA Japan summary
              </a>
              ;{' '}
              <a
                href='https://japan.kantei.go.jp/content/000179415.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                Joint statement PDF
              </a>
              ;{' '}
              <a
                href='https://economictimes.indiatimes.com/news/india/japan-to-invest-10-trillion-yen-in-india-over-in-next-one-decade/articleshow/123585311.cms'
                target='_blank'
                rel='noopener noreferrer'
              >
                Economic Times
              </a>
              {' '}(¥10tn target, Aug 2025).
            </li>
            <li>
              The Diplomat — India–Japan economic security / semiconductor alliance essays (2026).
            </li>
            <li>
              Tata Group semiconductor / Tokyo Electron–Tata / ROHM–Tata coverage (WION, company releases, Dec 2025).
            </li>
            <li>
              Global Suzuki —{' '}
              <a
                href='https://www.globalsuzuki.com/globalnews/2025/0826.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                &ldquo;Start of Dispatch Ceremony of the BEV e VITARA&rdquo;
              </a>
              {' '}(26 Aug 2025); The Hindu / DD News Modi Hansalpur remarks.
            </li>
          </ul>

          <h3>Japan&apos;s Software Deficit and AI</h3>

          <ul className='blog-prose__refs'>
            <li>
              METI IT human-resource / Digital Cliff projections — summarised in{' '}
              <a
                href='https://www.assetvalueinvestors.com/insight/japan-2025-soaring-from-the-digital-cliff/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Asset Value Investors
              </a>
              {' '}and Nomura Research Institute citations of the 2019 METI survey.
            </li>
            <li>
              Japan digital trade deficit —{' '}
              <a
                href='https://english.kyodonews.net/articles/-/52683'
                target='_blank'
                rel='noopener noreferrer'
              >
                Kyodo News
              </a>
              {' '}(¥6.46tn / $43bn in 2024, MoF Feb 2025).
            </li>
            <li>
              Hitachi Solutions — cultural gap Japan vs US IT projects; JapanTechCareers on SIer vs in-house (~70% SIer estimate).
            </li>
            <li>
              Sakana AI —{' '}
              <a
                href='https://techcrunch.com/2025/11/17/sakana-ai-raises-135m-series-b-at-a-2-65b-valuation-to-continue-building-ai-models-for-japan/'
                target='_blank'
                rel='noopener noreferrer'
              >
                TechCrunch
              </a>
              {' '}($2.65bn Series B, 17 Nov 2025); Nikkei Asia unicorn coverage.
            </li>
            <li>
              Sarvam-105B — Forbes / Business Standard / TechCrunch / OfficeChai coverage (Feb 2026).
            </li>
          </ul>

          <h3>India&apos;s Complementary Numbers</h3>

          <ul className='blog-prose__refs'>
            <li>
              NASSCOM Strategic Review 2025 — ~$224bn IT-services exports, ~$283bn industry, 5.8m developers.
            </li>
            <li>
              Zinnov / Flexiple / PIB — Global Capability Centres (1,700+ centres, ~1.9m professionals).
            </li>
            <li>
              GTRI (Ajay Srivastava) / Department of Commerce — FY2025 China trade deficit (~$99.2bn) and electronics-import figures.
            </li>
            <li>
              Economic Survey 2025-26 and DST — India&apos;s GERD 0.64–0.84% of GDP; India Semiconductor Mission on ~20% chip-design share.
            </li>
            <li>
              International Federation of Robotics —{' '}
              <a
                href='https://ifr.org/news/global-robot-demand-in-factories-doubles-over-10-years'
                target='_blank'
                rel='noopener noreferrer'
              >
                World Robotics 2025
              </a>
              {' '}(Japan as major producer / installer market).
            </li>
          </ul>

          <h3>Demographics, Space and Talent Mobility</h3>

          <ul className='blog-prose__refs'>
            <li>
              Japan Statistics Bureau / Ministry of Internal Affairs — 29.4% aged 65+ (Sept 2025); IPSS 2023 Population Projections — working-age decline.
            </li>
            <li>
              LUPEX / Chandrayaan-5 —{' '}
              <a
                href='https://theprint.in/science/jaxa-isro-scientists-mission-interface-chandrayaan-5-partnership/3001095/'
                target='_blank'
                rel='noopener noreferrer'
              >
                The Print / JAXA–ISRO interface work
              </a>
              ; ISRO financial sanction (Mar 2025).
            </li>
            <li>
              Japan Ministry of Justice statistics on Indians in Japan; Metropolis Japan / UR-net on Nishi-Kasai &ldquo;Little India.&rdquo;
            </li>
            <li>
              TCS newsroom / Business Standard — TCS Japan–Mitsubishi joint venture.
            </li>
          </ul>

          <p>
            <em>Alternate titles considered: &ldquo;Fill It, Shut It, Co-Create It&rdquo;
            · &ldquo;The Coders and the Craftsmen&rdquo; · &ldquo;A Dowry of
            Deficits.&rdquo;</em>
          </p>

          <h3>On this site</h3>

          <ul className='blog-prose__refs'>
            <li>
              <Link href='/blogs/the-middlemans-republic'>
                The Middleman&apos;s Republic
              </Link>{' '}
              — Part 1: the diagnosis this essay answers.
            </li>
            <li>
              <Link href='/blogs/the-rope-sellers'>The Rope Sellers</Link> —
              accountability moats and the professional-services cousin of the
              middleman pattern.
            </li>
            <li>
              <Link href='/blogs/the-rope-sellers-buy-a-rope-machine'>
                The Rope Sellers Buy a Rope Machine
              </Link>{' '}
              — what happens when the thing you resell starts eating you.
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
