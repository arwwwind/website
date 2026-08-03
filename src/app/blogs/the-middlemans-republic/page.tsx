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

const SLUG = 'the-middlemans-republic';
const post = getPostBySlug(SLUG)!;
const url = postUrl(SLUG);
const ogAbsolute = `${SITE_URL}${post.ogImage}`;
const publishedIso = `${post.date}T12:00:00.000Z`;

export const metadata: Metadata = {
  title: postDocumentTitle(post),
  description: post.description,
  keywords: [
    ...post.tags,
    'India',
    'China',
    'innovation',
    'manufacturing',
    'R&D',
    'Macaulay',
    'Canton Fair',
    'ANRF',
    'DeepSeek',
    'Sarvam',
    'boAt',
    'Make in India',
    'Arvind Narayan',
  ],
  authors: [{ name: 'Arvind Narayan', url: SITE_URL }],
  creator: 'Arvind Narayan',
  publisher: 'Arvind Narayan',
  category: 'India & Innovation',
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
    section: 'India & Innovation',
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
    'article:section': 'India & Innovation',
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
    articleSection: 'India & Innovation',
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

export default function TheMiddlemansRepublicPostPage() {
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
            <BlogDropcap word='In' /> which the author examines, with as much good humour as the subject permits, why the world&apos;s most populous nation imports its ingenuity by the pallet, exports its geniuses by the planeload, and taxes at 28 per cent anyone foolish enough to attempt originality in between.
          </p>

          <p>
            <em>Or: How We Learnt to Stop Inventing and Love the Container Ship</em>
          </p>

          <h2>Prologue: The Parable of Karthik&apos;s Circuit Board</h2>

          <p>
            A friend of mine — let us call him Karthik, because that is his name and he
            has given up being embarrassed about this story — decided last year to build
            an electronic device. Nothing seditious. A smart air-quality monitor, of all
            things: a gadget to inform Indians, with laboratory precision, exactly how
            unbreathable their air is. A growth market if ever there was one.
          </p>

          <p>
            Karthik is an engineer of the capable, unglamorous sort — the kind who reads
            datasheets for pleasure and believes, touchingly, that a good product is
            mostly a matter of building it. He began, as a patriot might, by attempting to
            source his components locally. What followed was an education.
          </p>

          <p>
            The first Indian distributor did not reply to his email. The second replied
            after nine days to inform him that the particulate sensor he wanted carried a
            minimum order quantity of five thousand units; Karthik needed twenty. The
            third quoted a price roughly triple the global rate for what turned out, upon
            inspection, to be a unit of dubious provenance with the original markings
            sanded off. A fourth gentleman on SP Road offered, with the weary magnanimity
            of a man who has seen too many dreamers, to &ldquo;arrange anything from
            China, two weeks, cash.&rdquo;
          </p>

          <p>
            Which is when Karthik, at 1:40 in the morning, messaged a supplier in Shenzhen
            directly. The reply arrived in fourteen minutes. It contained the datasheet,
            the price in three currency options, a gentle correction to his footprint
            layout, and a question about whether he would prefer conformal coating. Within
            forty-eight hours a factory engineer — an actual engineer, employed by the
            actual factory — had reviewed his Gerber files free of charge and flagged two
            design-for-manufacture issues. Ten assembled prototypes were on a DHL flight
            within nine days.
          </p>

          <p>
            They then arrived in India, where the real adventure began.
          </p>

          <p>
            The parcel that had crossed the Pearl River Delta, the South China Sea, and
            two international borders in four days proceeded to spend the next three weeks
            in the custody of Indian customs. There was a query about BIS registration —
            for <em>prototypes</em>, mind you, ten units, not for sale, clearly declared.
            There was the small matter of the duty stack, which on electronics of this
            sort runs to roughly 28 per cent once basic customs duty and IGST have
            finished with you. And there was, eventually, the delicate cough of the
            customs house agent, who suggested that a modest &ldquo;clearance facilitation
            charge&rdquo; might resolve the BIS ambiguity rather faster than
            correspondence would.
          </p>

          <p>
            Karthik paid. Everybody pays. Transparency International&apos;s Global
            Corruption Barometer found that 39 per cent of Indians had paid a bribe for a
            public service — the highest rate in Asia, comfortably ahead of Cambodia — and
            that nearly half of those who paid were asked to. On the watchdog&apos;s 2025
            Corruption Perceptions Index we scored 39 out of 100, ranked 91st, which at
            least has a pleasing numerical symmetry to it.
          </p>

          <p>
            Here is the detail I cannot get past. The government of the People&apos;s
            Republic of China — a state with which we share a disputed border, a trust
            deficit, and the occasional fatal skirmish — moved Karthik&apos;s goods with
            courtesy and speed. The government of his own republic held them hostage for
            tea money.
          </p>

          <p>
            Now, one anecdote is not data, and I would not hang a thesis on Karthik&apos;s
            twenty sensors. But I have come to believe his parcel is a diagnostic
            instrument of some precision. Trace its journey and you trace the whole
            architecture of the problem: an ecosystem that cannot supply an inventor, a
            bureaucracy that suspects him, a duty regime that taxes his curiosity as
            though it were contraband, and — across the water — a rival that has
            industrialised the very act of helping strangers build things. This essay is
            an attempt to follow that parcel all the way down.
          </p>

          <h2>Part I: The Pilgrims of Pazhou</h2>

          <p>
            Twice a year, in spring and autumn, a great migration takes place. Tens of
            thousands of Indian businessmen board flights to Guangzhou for the China
            Import and Export Fair — the Canton Fair — held in the vast Pazhou complex,
            1.55 million square metres of exhibition space, 75,700 booths, 4.65 million
            products on display. The most recent spring edition drew a record 314,000
            overseas buyers from 220 countries. India has long ranked among the top three
            buyer nations at the fair, behind only Hong Kong and the United States — an
            entire subcontinent&apos;s entrepreneurial ambition, queuing politely at the
            temple of somebody else&apos;s manufacturing.
          </p>

          <p>
            So established is this pilgrimage that a full-service industry has grown up
            around it. Indian tour operators offer Canton Fair packages with visa
            handling, hotel blocks near Pazhou, and — my personal favourite — daily Indian
            dinners prepared by an accompanying Maharaj, in vegetarian, Jain, and
            non-vegetarian variants. One may thus source Chinese electronics for
            one&apos;s Indian brand without once compromising one&apos;s dietary purity.
            Civilisational continuity, it turns out, is negotiable on the factory floor
            but non-negotiable at the buffet.
          </p>

          <p>
            And what are the pilgrims buying? Not machinery to make things with, by and
            large. They are buying <em>finished innovation</em> — products already
            designed, engineered, tooled, tested, and certified by someone else, awaiting
            only a logo. Shoes, smartwatches, earbuds, air fryers, massage guns, fairy
            lights, yoga mats: the entire visible universe of Indian e-commerce,
            pre-assembled in Guangdong. The buyer&apos;s contribution to the value chain
            is a sticker and a marketing budget.
          </p>

          <p>
            I do not say this to sneer at traders. Trade is honourable, arbitrage is
            ancient, and the man who spots a margin between Yiwu and Yamuna Vihar is doing
            his job. The indictment is not of any individual middleman; it is of an
            economy in which middleman-ship has become the <em>dominant expression of
            entrepreneurial energy</em> — in which a generation&apos;s cleverest
            commercial minds are deployed not in making better products but in finding,
            freighting, and rebranding somebody else&apos;s.
          </p>

          <p>
            The numbers are unsentimental about this. Surveys by Jungle Scout have found
            that over 70 per cent of Amazon sellers source their products from China; by
            2024, sellers <em>based in</em> China had themselves crossed 50 per cent of
            the marketplace. Our own trade ledger tells the same story with fewer
            decorations: Indian imports of electronics, telecom instruments, circuit
            boards, and battery components from China surged 16 per cent to $131.63
            billion in 2025–26, widening the bilateral deficit to $112.6 billion. That is
            not a trade relationship; that is a dependency with paperwork.
          </p>

          <p>
            Consider the case study nobody can stop citing, because it is simply too
            perfect. boAt — India&apos;s most beloved audio brand, the toast of every
            festive sale — captured a 37 per cent share of the personal audio market by
            2020, thrashing the Chinese brand realme, which limped in at 8 per cent. How
            did a plucky Indian upstart defeat the Chinese? By manufacturing in China, of
            course. For years, roughly nine in ten boAt products rolled out of Chinese
            factories; the brand&apos;s genius lay in design briefs, distribution, and
            marketing that spoke fluent Indian. To the company&apos;s genuine credit, it
            has since shifted assembly onshore through a joint venture with Dixon
            Technologies under the government&apos;s production-linked incentive scheme,
            and now advertises that three-quarters of its products are made in India. The
            assembly, that is. The components — the drivers, the chips, the cells, the
            little beating hearts of the things — still, overwhelmingly, speak Mandarin.
          </p>

          <p>
            There is a genre of national self-congratulation that calls this &ldquo;Make
            in India.&rdquo; A more honest label, for much of it, would be <em>Mark in
            India</em> — the affixing of domestic insignia to foreign engineering. And
            before anyone objects that Apple does the same: yes, precisely, Apple does the
            same, except that Apple <em>designed the phone</em>. The design, the silicon,
            the operating system, the patents — the parts of the value chain where the
            margins and the power live — belong to Cupertino. Our champions, with
            honourable and growing exceptions, own the sticker and the ad jingle.
          </p>

          <p>
            The Canton Fair, in other words, is not the disease. It is the X-ray.
          </p>

          <h2>Part II: Ctrl+C, Ctrl+V, Series A</h2>

          <p>
            If hardware is imported wholesale, software — our supposed national genius —
            has largely been imported <em>conceptually</em>. Recite the honour roll of
            Indian consumer tech and you are reading a translation exercise: Ola for Uber,
            Flipkart for Amazon, Oyo for every budget-hotel aggregator that came before
            it, Zomato and Swiggy for the global food-delivery template, Blinkit and Zepto
            for the quick-commerce playbook road-tested in Chinese cities years earlier.
          </p>

          <p>
            My favourite specimen, for sheer poetry, is Paytm. It was described for a
            decade as &ldquo;India&apos;s Alipay,&rdquo; and the description was rather
            more literal than the describers intended: Alipay&apos;s parent, Ant
            Financial, bought a 25 per cent stake in Paytm&apos;s parent company back in
            2015 — its first big cheque in India. The homage was so faithful that the
            original acquired a quarter of the tribute. (Ant finally exited in August
            2025, offloading its last 5.84 per cent for about ₹3,980 crore, nudged out as
            much by New Delhi&apos;s allergy to Chinese cap tables as by any strategic
            epiphany.)
          </p>

          <p>
            Now — and this is where the argument must be handled with care, because the
            lazy version of it is wrong — <em>copying is not the sin</em>. Everybody
            copies. China&apos;s own tech pantheon began life as a tribute act: Baidu was
            the Google clone, Alibaba the eBay-cum-Amazon clone, Tencent&apos;s QQ a
            pixel-faithful ICQ, Meituan a Groupon knock-off that later ate the entire
            category. Imitation is how a developing economy learns to ship at scale. It is
            a <em>stage</em>.
          </p>

          <p>
            The only question that matters is whether you graduate from the stage. China
            graduated with extreme prejudice. The country of the Google clone now produces
            BYD, which outsells Tesla; CATL, which sets the global pace in batteries; DJI,
            which owns the world&apos;s drone market outright; Huawei, which holds more 5G
            patents than any firm alive despite half a decade under sanctions; and
            DeepSeek, of which more presently. The Australian Strategic Policy
            Institute&apos;s Critical Technology Tracker measured the arc with brutal
            economy: across 2003–2007, China led in 3 of 64 tracked frontier technologies;
            across 2019–2023, it led in 57 of 64, with the United States ahead in just 7.
            That is not catching up. That is lapping the field while the field debates
            whether running is culturally appropriate.
          </p>

          <p>
            India, meanwhile, remains enrolled in the copying stage like a student who
            keeps deferring graduation for the campus food. And the reason is not a
            deficiency of neurons — it is the <em>orientation of capital</em>. Indian tech
            startups raised $9.1 billion in 2025, up a healthy 23 per cent; e-commerce and
            fintech topped the table, as they always do. Deep tech attracted roughly $2.3
            billion of that — a 37 per cent jump, celebrated with much trumpetry — except
            that by the industry&apos;s own accounting, AI ventures constituted 84 per
            cent of those startups and 91 per cent of that funding, with average cheques
            that would embarrass a Shenzhen seed round. One Bengaluru founder confessed to
            <em>The Ken</em> the prevailing anxiety about the new money: that it becomes
            &ldquo;a pot of money that VCs use to create fake deep-tech versions of
            themselves.&rdquo;
          </p>

          <p>
            When the commerce minister, Piyush Goyal, stood up in April 2025 and needled
            Indian founders for doing <em>dukaandari</em> — shopkeeping; delivery apps and
            ice-cream brands — while Chinese firms built semiconductors and robotics, he
            was mobbed, and the mobbing was half deserved, because the founders&apos;
            rejoinder was unanswerable: <em>with whose money, minister?</em> The capital
            for a seven-year silicon play barely exists here; the state&apos;s own
            research foundation (of which, again, more presently) took two years to spend
            its first rupee. A billion consumers reward the app that reaches them by
            Thursday far more reliably than the lab that files patents by 2031. Blaming
            founders for following the incentive gradient is like blaming water for
            flowing downhill and then holding a press conference about the moral fibre of
            water.
          </p>

          <p>
            The tell, as ever, is what happens when someone <em>does</em> attempt the
            hill. In January 2025, a Chinese lab most people had never heard of released a
            reasoning model, trained on deliberately hobbled export-grade GPUs, that
            matched OpenAI&apos;s best and wiped roughly a trillion dollars off American
            tech valuations in a single trading session. DeepSeek&apos;s founder, Liang
            Wenfeng, had already explained his constraint the year before: money was never
            the problem — &ldquo;Bans on shipments of advanced chips are the
            problem.&rdquo; China, denied the best hardware, responded by making the best
            hardware less necessary.
          </p>

          <p>
            And India&apos;s response to the DeepSeek moment? A debate. A truly
            magnificent debate — op-eds, panel discussions, parliamentary questions —
            about whether India could build such a thing, conducted at precisely the
            moment Washington&apos;s short-lived AI diffusion rule had filed us under Tier
            2, with a cap of some 50,000 high-end GPUs through 2027. (The rule was
            rescinded within months, but the filing cabinet had spoken.) China spent the
            DeepSeek moment demonstrating escape velocity from hardware dependence. We
            spent it litigating our seat allocation on someone else&apos;s aircraft.
          </p>

          <p>
            Which makes the exception worth naming with genuine respect. Sarvam AI, a
            Bengaluru startup handed 4,096 subsidised H100s under the IndiaAI Mission,
            shipped in early 2026 two foundation models — a 30-billion and a
            105-billion-parameter mixture-of-experts pair — trained <em>from scratch</em>,
            on Indian compute, released open-weight under Apache 2.0, reportedly on a
            budget in the region of $50 million. One must be honest about the full arc:
            Sarvam&apos;s earlier &ldquo;sovereign&rdquo; model, released in mid-2025, was
            a fine-tune of Mistral — the flag was Indian, the base coat was French — and
            the wags were merciless. But the 105B is the real article, and it proves the
            point cuts both ways: the talent can do it, when someone actually points the
            money and the compute at the hill. The scandal is not that Sarvam exists. The
            scandal is how nearly it didn&apos;t.
          </p>

          <BlogRelatedAd slug={SLUG} />

          <h2>Part III: The Original Sin — An Education Designed by Its Detractors</h2>

          <p>
            To understand why the system points the way it does, one must exhume the man
            who aimed it. In 1835, Thomas Babington Macaulay — a gentleman whose
            acquaintance with Indian learning was inversely proportional to his confidence
            in dismissing it — produced his infamous Minute on Indian Education, declaring
            that a single shelf of a good European library outweighed the entire
            literature of India and Arabia, and prescribing an education system to
            manufacture a class of persons &ldquo;Indian in blood and colour, but English
            in taste, in opinions, in morals, and in intellect.&rdquo; The purpose was
            never mass enlightenment. It was the production of clerks: a compliant
            intermediary caste to run the Company&apos;s paperwork at local wages, while
            knowledge &ldquo;filtered down&rdquo; to the masses in some perpetually
            postponed future. (A certain member for Thiruvananthapuram has prosecuted this
            case at book length, and I refer the reader to him for the full charge sheet.)
          </p>

          <p>
            The colonisers eventually left. The blueprint, regrettably, stayed and got
            promoted. In 1945 the Sarkar Committee, asked how a soon-to-be-free India
            should build technical capacity, recommended not mass vocational training, not
            universal schooling, but four elite institutions modelled explicitly on MIT.
            Thus the IITs — the first opened in 1950 at Kharagpur, on the site of a
            colonial detention camp, a symbolism everyone admired and nobody examined.
            Independent India looked at Macaulay&apos;s inverted pyramid, and with the
            best intentions in the world, gilded the top of it.
          </p>

          <p>
            The gilding continues. The Institutes of National Importance — IITs, IIMs,
            NITs — absorb roughly 18.2 per cent of the national higher-education budget
            while enrolling under 0.76 per cent of its students; the state spends about
            eighteen times more per INI student than per ordinary one. We built the
            penthouse before the plinth, and we are still ordering chandeliers.
          </p>

          <p>
            Meanwhile, at the plinth: the ASER surveys, year after patient year, document
            a foundational catastrophe with the persistence of a metronome. In 2024, 44.8
            per cent of Grade 5 children in government schools could read a Grade 2 text;
            30.7 per cent could manage basic division. Among rural youth aged 14 to 18 —
            the demographic dividend itself, the ones on the posters — a quarter cannot
            fluently read a Grade 2 passage in their own language, and more than half
            stumble on a three-digit-by-one-digit division sum. These are not children
            failing school. This is a school system failing to occur.
          </p>

          <p>
            Why does it fail to occur? Partly because it frequently does not show up. The
            famous J-PAL experiment in rural Udaipur found teacher absence rates around 44
            per cent; when researchers issued tamper-proof cameras and tied salaries to
            photographic proof of attendance, absence promptly halved to 21 per cent.
            Professional duty, it transpires, responds admirably to surveillance and money
            — a finding that tells you everything about the trust architecture of the
            Indian state, in both directions. And even when present, teachers report
            spending vast tracts of the day on mid-day-meal ledgers, census duties, and
            WhatsApp demands from the block office, teaching for perhaps half the mandated
            hours. The bureaucracy audits the dal with more rigour than the division.
          </p>

          <p>
            Above this hollowed base, we then built — nothing. The vocational middle, the
            technician class that carried China&apos;s manufacturing miracle on its
            shoulders, simply does not exist here at scale: roughly 2 per cent of Indian
            students at secondary level and above receive vocational education, against
            about 25 per cent in China. The results are darkly comic. L&amp;T, the
            country&apos;s flagship engineering conglomerate, publicly bemoans a shortage
            of 45,000 workers and engineers; the same year, 11,000 candidates — among them
            PhDs, engineers, and MBAs — applied for 15 peon and clerk posts in Madhya
            Pradesh. A shortage of employable skills and a glut of unemployable degrees,
            coexisting in the same labour market, is not a paradox. It is a report card.
          </p>

          <p>
            One table, because the divergence deserves to be seen in columns:
          </p>

          <div
            className='blog-table-wrap'
            role='region'
            aria-label='India versus China education and labour divergence'
          >
            <table>
              <thead>
                <tr>
                  <th scope='col'>Metric</th>
                  <th scope='col'>India (top-down)</th>
                  <th scope='col'>China (bottom-up)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Expansion sequence</td>
                  <td>Tertiary first, primary last</td>
                  <td>Primary → secondary → tertiary</td>
                </tr>
                <tr>
                  <td>Vocational enrolment (secondary+)</td>
                  <td>~2%</td>
                  <td>~25%</td>
                </tr>
                <tr>
                  <td>Workforce in agriculture, 1987</td>
                  <td>62%</td>
                  <td>62%</td>
                </tr>
                <tr>
                  <td>Workforce in agriculture, 2018</td>
                  <td>40%</td>
                  <td>15%</td>
                </tr>
                <tr>
                  <td>Wage inequality attributable to education</td>
                  <td>~25%</td>
                  <td>5–12%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Both countries stood at exactly the same mark in 1987 — 62 per cent of workers
            in the fields. One built literacy and technicians and moved a third of a
            billion people up the complexity ladder into factories. The other built
            entrance examinations. The World Inequality Lab, which assembled these
            figures, describes the strategies as top-down versus bottom-up; I would
            describe them as building a ladder versus building a diving board.
          </p>

          <h2>Part IV: Research &amp; Development, or the Absence Thereof</h2>

          <p>
            Let us now speak of R&amp;D, that thing we hold conferences about.
          </p>

          <p>
            The headline number, freshly tabled in Parliament this July: India&apos;s
            gross expenditure on research and development reached a record ₹2.45 lakh
            crore in FY24 — which sounds stirring until one notices it amounts to 0.84 per
            cent of GDP, up from 0.82 the year before. At this rate of ascent we shall
            reach our own stated target of 2 per cent by roughly the heat death of the
            universe, or 2035, whichever the ministry concedes first. China spends 2.69
            per cent of a much larger GDP. South Korea spends nearly 5. The United States,
            about 3.5. Brazil — <em>Brazil</em> — manages 1.19. We are outspent, as a
            share of national income, by a country whose principal exports include
            telenovelas.
          </p>

          <p>
            There was one genuinely structural bright spot in the data: for the first
            time, private industry (₹1.27 lakh crore) outspent government (₹1.18 lakh
            crore), crossing 51.8 per cent of the total. Progress — though in Korea,
            China, and America the private share sits above 70 per cent, and much of our
            public spend is defence and space line items rather than broad industrial
            research. Indian industry, the minister himself lamented while tabling the
            figures, must wean itself off imported technology. One pictures the assembled
            captains of industry nodding gravely before flying to Guangzhou.
          </p>

          <p>
            What does the money we do spend produce? Volume, mostly. India now ranks third
            or fourth globally in sheer research output — over 300,000 papers a year,
            ahead of the UK and Germany — and ninth in citations, with a national H-index
            of 925 against America&apos;s 3,213. We have, in other words, perfected the
            academic equivalent of the white-label import: papers that look like research,
            formatted like research, indexed like research, and read by nobody. A
            respectable share of this is outright rot: study after study has identified
            India as the world capital of predatory publishing, home to over a quarter of
            the outfits running multiple pay-to-publish &ldquo;journals&rdquo; — the
            inevitable harvest of a promotion system that counts papers instead of reading
            them. The University Grants Commission created an approved-journals list to
            stem the tide, then found the fraudsters simply migrated, as fraudsters do,
            one loophole ahead of the circular.
          </p>

          <p>
            Patents tell the same story in a different register. Indian resident filings
            have grown at double digits for six consecutive years — genuinely commendable
            — and yet the intensity gap remains a chasm: China files roughly 4,900
            resident patent applications per $100 billion of GDP; India files 381.
            Historically, some 90 per cent of central research funding flowed to the elite
            institutes, while the state universities educating 95 per cent of students
            were left to run laboratories on prayer and Sellotape. PhD stipends arrive
            with the punctuality of the monsoon in a drought year; the nation&apos;s
            doctoral students have had to <em>protest in the streets</em> for the timely
            release of their own fellowships, an activity that consumes precisely the
            hours one might otherwise spend on, say, research.
          </p>

          <p>
            Into this landscape the government has now launched its grand correctives, and
            here one must be scrupulously fair, because the design is genuinely good and
            the early execution genuinely alarming. The Anusandhan National Research
            Foundation (ANRF) was established by statute in 2023 as the apex funder of
            Indian science. A parliamentary committee reported this March that the
            foundation utilised <em>zero</em> of its ₹2,000-crore annual budget in
            2023–24, zero again in 2024–25, and 61 per cent in 2025–26. A research
            foundation that took twenty-four months to disburse its first rupee has at
            least achieved something no Indian lab ever has: perfect capital preservation.
            Alongside it now sits the ₹1 lakh crore Research, Development and Innovation
            Fund — Cabinet-approved July 2025, launched by the Prime Minister that
            November, first cheques issued to second-level fund managers in May 2026, with
            the Technology Development Board and BIRAC receiving ₹2,000 crore apiece to
            on-lend as patient capital. By the standards of Indian officialdom this
            ten-month sprint constitutes indecent haste, and the officials deserve the
            compliment. The question — the <em>only</em> question — is whether the money
            reaches teams doing genuinely hard things at DARPA-ish speed, or whether it
            curdles into a fund-of-funds that launders consumer-app risk appetite through
            a deep-tech label. The pipes are laid. We await the water.
          </p>

          <h2>Part V: The Ledger of Departures</h2>

          <p>
            And now the cruellest column in the national accounts.
          </p>

          <p>
            Begin with the study that should be laminated and nailed to the door of every
            education ministry office: economists Choudhury, Ganguli, and Gaulé tracked
            the top scorers of the IIT Joint Entrance Examination — the most ferocious
            academic filter on the planet — and found that 36 per cent of the top 1,000
            had emigrated. Among the top 100, <em>62 per cent</em>. Attending one of the
            original five IITs added a further five percentage points to the probability
            of departure, courtesy of alumni networks wired straight into American
            graduate schools and Silicon Valley. Read that plainly: we operate the
            world&apos;s most competitive examination in order to determine, with
            exquisite statistical precision, whom to gift to California. The state spends
            eighteen times the average per elite student and then waves from the tarmac.
            It is the most rigorously merit-based export programme in human history.
          </p>

          <p>
            We have even learnt to celebrate it. Every time an Indian-origin executive
            ascends at Alphabet or Microsoft or IBM, the national press erupts as though
            the export of our finest minds were a trade surplus. Sundar Pichai and Satya
            Nadella are magnificent men and wretched metrics: their triumphs are Mountain
            View&apos;s operating income, not Chennai&apos;s.
          </p>

          <p>
            Set this against the eastern ledger. Chinese and Indian STEM PhDs in America
            historically stayed at nearly identical, sky-high rates — both near nine in
            ten. But the Chinese line has begun to bend homeward while the Indian line
            stays flat around 80-plus per cent. The <em>haigui</em> — the &ldquo;sea
            turtles,&rdquo; returnees swimming home — have become a torrent: returning
            graduates have more than doubled since 2018, up another 12 per cent in 2025
            alone. And it has reached the very peak of the distribution. CNN counted at
            least 85 established and rising scientists departing American institutions for
            Chinese ones since the start of 2024, more than half of them in 2025. The
            roster reads like a fantasy-league draft: Charles Lieber, former chair of
            Harvard chemistry, took up Tsinghua&apos;s highest faculty rank in Shenzhen in
            April 2025 — convicted in Boston, feted in Guangdong. Omar Yaghi joined
            Tsinghua in Beijing that July to build an AI-and-chemistry institute, then won
            the Nobel Prize in Chemistry in October. China recruited a chemist in the
            summer and collected his Nobel by the autumn; even our IPL auctions are not
            that efficient. Gérard Mourou, the 2018 physics laureate, went to Peking
            University. Berkeley&apos;s Yang Dan to Beijing; Berkeley&apos;s Sun Song, a
            Fields Medal contender, to Zhejiang; Harvard&apos;s Liu Jun to Tsinghua. Some
            of these scientists were pushed as much as pulled — America&apos;s China
            Initiative and funding chaos did Beijing&apos;s recruiting for it — but the
            destination tells you what mattered: there was a <em>landing strip</em>.
          </p>

          <p>
            That is the entire asymmetry in one word. A Chinese researcher at Stanford
            contemplating home sees a funded state laboratory, a faculty package with
            equipment money, spousal hiring, and frontier employers of the DeepSeek, BYD,
            and Huawei class. An Indian researcher of equal calibre contemplating home
            sees an assistant professorship at a salary his Bay Area rent would laugh at,
            a grant that may arrive after the equipment&apos;s warranty expires, an import
            duty on his instruments, and a customs officer with a delicate cough. Talent
            does not flow toward flags. It flows toward the place where it can
            <em>build</em>. Coming home to China is a career move. Coming home to India is
            a sacrifice, and we have the audacity to be sentimental about it.
          </p>

          <h2>Part VI: The Bureaucratic Sublime</h2>

          <p>
            Threading through every section above, you will have noticed, runs a single
            connective tissue: the low-trust state. It deserves a brief chapter of its
            own, if only to admire the craftsmanship.
          </p>

          <p>
            The Indian administrative apparatus was engineered by a colonial power to
            extract and to suspect, and independence changed the personnel without
            changing the posture. The licence raj was formally executed in 1991; its ghost
            promptly reincarnated as the compliance raj. The state assumes the citizen is
            a tax evader, the importer an under-invoicer, the researcher a procurement
            risk, the teacher a truant — and in fairness, having starved every one of them
            of trust for two centuries, it has manufactured no small number of each. So it
            responds with fortifications: BIS registrations, EPR certificates,
            import-export codes, valuation queries, utilisation certificates, and the
            discretionary power of ten thousand gatekeepers, each of whom has learnt that
            a gate is a toll booth waiting to be recognised. The customs
            &ldquo;revaluation&rdquo; — in which an official simply decides your goods are
            worth more than the invoice says, unless persuaded otherwise — is not a bug in
            this system. It is the system&apos;s compensation package.
          </p>

          <p>
            The cost is not the bribe. The bribe is trivial; ask Karthik. The cost is
            <em>time</em>, and the risk premium on time, and the entire category of
            enterprise that never begins because its founder can price the friction in
            advance. A nation cannot run an AI buildout, a semiconductor mission, and a
            deep-tech fund through the same choke-points it uses to harass a man importing
            twenty air-quality sensors. The state&apos;s own flagship projects feel the
            drag: the Tata fab at Dholera, the ₹91,000-crore centrepiece of the
            Semiconductor Mission, was announced at the 28-nanometre node with first
            silicon promised for December 2026; the reported plan has since slipped to 90
            nanometres — two generations coarser — with commercial output drifting toward
            2028. Starting at mature nodes is perfectly defensible engineering. Slipping
            two nodes and eighteen months between the annual report and the press release
            is perfectly Indian scheduling.
          </p>

          <p>
            We rent compute, meanwhile, with genuine competence — the IndiaAI Mission has
            stood up some 38,000 GPUs for researchers and startups, and that is honest,
            useful work. But rented compute is a treadmill, not a territory. The machines
            depreciate, the export rules mutate with each American administration, and the
            tier we are filed under is decided in a city where we do not vote.
          </p>

          <h2>Part VII: The Exceptions That Prosecute the Rule</h2>

          <p>
            Honesty now demands the counter-brief, because India has built world-class
            things, and pretending otherwise would be its own farrago of distortions.
          </p>

          <p>
            UPI is the genuine article: roughly 228 billion transactions in 2025, over 21
            billion in a single month, recognised by the IMF as the world&apos;s largest
            retail fast-payment system by volume. It is a masterpiece — of <em>state-built
            public infrastructure</em>. Standards, rails, protocol design: the things a
            competent bureaucracy can decree into existence. It is not a semiconductor,
            not a molecule, not a foundation model; it required no seven-year private bet
            on unproven physics. Celebrate it, absolutely — and notice which muscle it
            exercised.
          </p>

          <p>
            ISRO landed Chandrayaan-3 near the lunar south pole for about ₹615 crore —
            less than the budget of a mediocre Hollywood film, a fact every Indian uncle
            can recite from memory. Glorious. Also: an island. ISRO is a mission-mode
            enclave of excellence floating in a state that underfunds nearly everything
            around it, and its celebrated frugality is, examined coldly, the optimisation
            you perfect when the topline never grows. We are the world champions of doing
            more with less because less is all we have ever appropriated.
          </p>

          <p>
            The pharmaceutical industry vaccinated a respectable fraction of the human
            species — through what is, definitionally, process innovation on molecules
            whose patents have expired. Extraordinary manufacturing. Other people&apos;s
            invention.
          </p>

          <p>
            And Sarvam, the exception already saluted, which broke pattern only after the
            state aimed 4,096 GPUs and a mission mandate directly at it. The pattern
            across all four is uncomfortably crisp: India excels wherever the game is
            <em>execution, standards, cost-engineering, and scale</em> — and thins out
            precisely where the game is invention. The exceptions do not refute the
            thesis. They cross-examine it, establish its boundaries, and then, rather
            devastatingly, corroborate it.
          </p>

          <h2>Part VIII: What Is Actually To Be Done</h2>

          <p>
            Diagnosis without prescription is merely elegant complaining, and Delhi has
            enough of that. So, concretely — the dials a serious government (and a serious
            industry) would turn, in descending order of leverage:
          </p>

          <h3>1. Make the RDI Fund behave like DARPA, not like a department.</h3>

          <p>
            The ₹1 lakh crore is real; the May 2026 first cheques are real. Now publish
            the metric that matters: <em>median time from application to
            money-in-bank</em>, quarterly, for every second-level fund manager.
            Milestone-based tranches, programme managers with authority to kill and to
            double down, and an explicit quota for pre-revenue hardware, materials, and
            biology. If in three years the portfolio is 84 per cent AI wrappers, the
            experiment failed and someone should say so aloud.
          </p>

          <h3>2. A green channel for R&amp;D atoms.</h3>

          <p>
            Duty-free import of prototypes and research equipment up to a sane annual cap
            per registered R&amp;D entity; BIS exemption for non-retail development units;
            a 72-hour customs clearance service-level for anything flagged R&amp;D, with
            the clearance times published. Karthik&apos;s twenty sensors should clear
            Nhava Sheva faster than his pizza order. This is a stroke-of-pen reform; it
            requires no money, only the surrender of discretion — which is, of course, why
            it is hard.
          </p>

          <h3>3. Drag private R&amp;D from 52 to 70 per cent.</h3>

          <p>
            Restore a weighted tax deduction for in-house research (the old Section
            35(2AB) logic, killed without replacement), add a patent-box rate on income
            from domestically developed IP, and tie PLI extensions to component-level
            value addition — drivers, cells, and boards, not just final assembly. boAt
            proved assembly follows incentives; now point the incentives one layer deeper
            into the bill of materials.
          </p>

          <h3>4. Build the landing strip.</h3>

          <p>
            A returnee package worth the name: five hundred laboratories at ₹5–10 crore in
            guaranteed start-up funding, five-year fellowships at globally
            embarrassing-to-refuse stipends, dual academic-industry appointments, spousal
            placement, and — critically — <em>procurement autonomy</em>, so the returning
            scientist buys her mass spectrometer without a GeM tender odyssey. China did
            not moralise its diaspora home; it out-bid the alternative. Sentiment is not a
            compensation structure.
          </p>

          <h3>5. Fix the plinth, finally.</h3>

          <p>
            The NEP&apos;s target of vocational exposure for half of all learners must be
            executed as infrastructure, not circulars: funded skill labs, industry-linked
            ITIs with the 400 credential mills stripped out and the survivors capitalised,
            and Teaching-at-the-Right-Level pedagogy scaled with the same seriousness we
            bring to entrance-exam coaching. The camera experiment taught us the ugly,
            useful truth: accountability works. Deploy it and stop flinching.
          </p>

          <h3>6. Kill the paper mill.</h3>

          <p>
            Promotions and PhDs assessed on a small number of works, read by actual
            humans, with citation impact weighted over counts — and criminal-adjacent
            consequences for predatory publishing rings. China ran precisely this
            crackdown; the sky did not fall; the citations rose.
          </p>

          <h3>7. Measure time itself.</h3>

          <p>
            Publish, every quarter, the state&apos;s latency dashboard: median grant
            disbursement time, median customs clearance for R&amp;D goods, median BIS
            certification, median stipend delay. What gets measured gets minimised. What
            stays hidden stays for sale.
          </p>

          <p>
            None of this is exotic. Every item has a working precedent somewhere between
            Seoul, Shenzhen, and Arlington, Virginia. The binding constraint is not
            knowledge and has never been money. It is the willingness of a low-trust state
            to extend trust first — to its scientists, its founders, its importers, its
            teachers — and to accept the fraud losses of trust as a cost of doing
            civilisation, rather than accepting the stagnation losses of suspicion as the
            price of control. China, an authoritarian surveillance state, contrives to
            trust its builders more than the world&apos;s largest democracy trusts hers.
            Sit with that sentence for a moment. I have been sitting with it for months.
          </p>

          <h2>Epilogue: The Parcel, Revisited</h2>

          <p>
            Karthik&apos;s monitor works beautifully, by the way. The firmware is written
            in Bengaluru. The enclosure was designed in Bengaluru. The boards are
            assembled by a contract manufacturer in Shenzhen, because after the third
            customs adventure he ran the arithmetic and the arithmetic won; his next
            production batch will ship to customers in Dubai and Singapore first, because
            their borders behave like doors rather than tollbooths. He remains, in every
            way that matters, an Indian founder. His supply chain has simply emigrated
            ahead of him — the way the JEE toppers did, the way the citations did, the way
            the components at Pazhou always already had.
          </p>

          <p>
            The tragedy of Indian innovation, I have come to think, is not that we cannot
            invent. The IITians running half of Silicon Valley, the Nobel-calibre
            scientists, the from-scratch foundation model built on a shoestring — the raw
            material is embarrassingly abundant. The tragedy is that we have constructed,
            with two centuries of diligence and at colossal public expense, a machine for
            ensuring we needn&apos;t: an education that filters instead of building,
            capital that distributes instead of inventing, a border that taxes curiosity,
            and a state that trusts no one and is trusted by no one in return. The machine
            is not broken. It is functioning precisely as designed. It was simply
            designed, in 1835, by a man who wanted clerks.
          </p>

          <p>
            He got us. The question of the next twenty-five years is whether we have the
            nerve to want something else.
          </p>

          <h2>Sources &amp; Further Reading</h2>

          <h3>History &amp; education architecture</h3>

          <ul className='blog-prose__refs'>
            <li>
              T.B. Macaulay,{' '}
              <a
                href='https://www.bhashaneeti.org/macaulays-minute-on-english-education-1835/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <em>Minute on Indian Education</em>
              </a>
              {' '}(2 February 1835).
            </li>
            <li>
              Report of the Sarkar Committee on Higher Technical Institutions (1946); Institutes of Technology Act (1961).
            </li>
            <li>
              S. Tharoor, <em>An Era of Darkness: The British Empire in India</em> (Aleph, 2016).
            </li>
            <li>
              N.K. Bharti &amp; L. Yang,{' '}
              <a
                href='https://wid.world/document/the-making-of-china-and-india-in-21st-century-long-run-human-capital-accumulation-from-1900-to-2020-world-inequality-lab-working-paper-2024-24/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <em>The Making of China and India in the 21st Century</em>
              </a>
              {' '}— World Inequality Lab Working Paper 2024/24;{' '}
              <a
                href='https://wid.world/www-site/uploads/2024/11/WorldInequalityLab_WP2024_24_The-Making-of-China-and-India-in-21st-Century_Final.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                PDF
              </a>
              .
            </li>
            <li>
              ASER Centre / Pratham —{' '}
              <a
                href='https://asercentre.org/wp-content/uploads/2022/12/ASER-2024-National-findings.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                <em>ASER 2024</em> national findings
              </a>
              ; see also{' '}
              <a
                href='https://asercentre.org/'
                target='_blank'
                rel='noopener noreferrer'
              >
                asercentre.org
              </a>
              {' '}and{' '}
              <a
                href='https://pratham.org/programs/education/aser/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Pratham ASER page
              </a>
              .
            </li>
            <li>
              E. Duflo, R. Hanna &amp; S.P. Ryan,{' '}
              <a
                href='https://www.aeaweb.org/articles?id=10.1257%2Faer.102.4.1241'
                target='_blank'
                rel='noopener noreferrer'
              >
                &ldquo;Incentives Work: Getting Teachers to Come to School&rdquo;
              </a>
              , <em>American Economic Review</em> 102(4), 2012.
            </li>
            <li>
              Working-paper analyses of Institutes of National Importance budget concentration (~18.2% of higher-education spend; under 0.76% of enrolment); L&amp;T labour-shortage coverage and Madhya Pradesh peon-post episode (contemporary press).
            </li>
          </ul>

          <h3>R&amp;D, academia &amp; policy</h3>

          <ul className='blog-prose__refs'>
            <li>
              DST / parliamentary replies (July 2026): GERD ₹2.45 lakh crore; 0.84% of GDP; private share 51.8% — covered in contemporary Rajya Sabha / Lok Sabha reporting.
            </li>
            <li>
              OECD Main Science &amp; Technology Indicators (China, US, Korea, Brazil R&amp;D/GDP comparators).
            </li>
            <li>
              Predatory publishing —{' '}
              <a
                href='https://arxiv.org/abs/2003.08283'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2003.08283
              </a>
              {' '}(Scopus country-level analysis).
            </li>
            <li>
              WIPO, <em>World Intellectual Property Indicators</em> (resident filings; patents per $100bn GDP).
            </li>
            <li>
              Parliamentary Standing Committee on Science &amp; Technology reporting on ANRF utilisation (March 2026); Careers360 / Business Standard coverage of RDI Fund disbursements (May 2026).
            </li>
          </ul>

          <h3>Startups, capital &amp; the copying question</h3>

          <ul className='blog-prose__refs'>
            <li>
              NASSCOM–Zinnov, <em>India Tech Startup Landscape 2025</em> ($9.1bn funding; deep-tech ~$2.3bn).
            </li>
            <li>
              Piyush Goyal &ldquo;dukaandari&rdquo; remarks —{' '}
              <a
                href='https://www.business-standard.com/companies/start-ups/india-startups-piyush-goyal-china-ai-zepto-ceo-mohandas-pai-ashneer-grover-125040400331_1.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                Business Standard
              </a>
              {' '}(Startup Mahakumbh, April 2025).
            </li>
            <li>
              Ant Group exit from Paytm —{' '}
              <a
                href='https://www.reuters.com/world/china/chinas-ant-group-exit-indias-paytm-term-sheet-shows-2025-08-04/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Reuters
              </a>
              ;{' '}
              <a
                href='https://economictimes.indiatimes.com/markets/stocks/news/ant-financial-exits-paytm-sells-5-84-for-rs-3803-crore/articleshow/123129817.cms'
                target='_blank'
                rel='noopener noreferrer'
              >
                Economic Times
              </a>
              {' '}(August 2025).
            </li>
            <li>
              ASPI,{' '}
              <a
                href='https://www.aspi.org.au/report/aspis-two-decade-critical-technology-tracker/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <em>Critical Technology Tracker</em>
              </a>
              {' '}(3/64 leads in 2003–07 → 57/64 in 2019–23).
            </li>
            <li>
              DeepSeek-R1 / January 2025 market reaction — Reuters / FT contemporary coverage; Liang Wenfeng interview (36Kr / &ldquo;Waves,&rdquo; 2024).
            </li>
            <li>
              Sarvam AI — Sarvam-30B / Sarvam-105B release coverage (Feb–Mar 2026); IndiaAI Mission GPU allocation (4,096 H100s).
            </li>
          </ul>

          <h3>Hardware, trade &amp; customs</h3>

          <ul className='blog-prose__refs'>
            <li>
              Canton Fair 139th session —{' '}
              <a
                href='https://www.prnewswire.com/news-releases/guangdong-province-139th-canton-fair-sets-new-record-with-overseas-buyer-attendance-302766826.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                PR Newswire
              </a>
              {' '}(314,000 overseas buyers; 1.55m m²; 75,700 booths).
            </li>
            <li>
              Jungle Scout / Marketplace Pulse / Statista — Amazon seller-sourcing surveys (&gt;70% from China; Chinese sellers &gt;50% of marketplace, 2024).
            </li>
            <li>
              boAt China-manufacturing / Dixon PLI shift — Quartz/Scroll and TechRadar contemporary coverage.
            </li>
            <li>
              Transparency International —{' '}
              <a
                href='https://www.transparency.org/en/cpi/2025'
                target='_blank'
                rel='noopener noreferrer'
              >
                Corruption Perceptions Index 2025
              </a>
              {' '}(India 39/100, rank 91);{' '}
              <a
                href='https://www.transparency.org/en/countries/india'
                target='_blank'
                rel='noopener noreferrer'
              >
                India country page
              </a>
              ; Global Corruption Barometer — Asia (2020 bribery rates).
            </li>
            <li>
              MeitY / BIS Compulsory Registration Scheme and EPR import-compliance documentation.
            </li>
            <li>
              Tata Electronics / India Semiconductor Mission — Dholera fab announcements vs subsequent node/schedule coverage (Varindia and contemporaries).
            </li>
            <li>
              US AI-diffusion export rule (Jan 2025; India Tier 2) and May 2025 rescission — contemporary Reuters / White House coverage.
            </li>
          </ul>

          <h3>Talent flows</h3>

          <ul className='blog-prose__refs'>
            <li>
              P. Choudhury, I. Ganguli &amp; P. Gaulé —{' '}
              <a
                href='https://www.nber.org/papers/w31308'
                target='_blank'
                rel='noopener noreferrer'
              >
                &ldquo;Top Talent, Elite Colleges, and Migration&rdquo;
              </a>
              {' '}(NBER WP 31308);{' '}
              <a
                href='https://doi.org/10.1016/j.jdeveco.2023.103120'
                target='_blank'
                rel='noopener noreferrer'
              >
                <em>Journal of Development Economics</em>
              </a>
              .
            </li>
            <li>
              CSET (Georgetown), <em>Trends in U.S. Intention-to-Stay Rates of International PhD Graduates</em> (NSF Survey of Doctorate Recipients).
            </li>
            <li>
              CNN investigation of scientists departing US institutions for China (2024–25); Chinese Ministry of Education returnee (<em>haigui</em>) statistics.
            </li>
            <li>
              Chemistry World / Boston Globe / Nature — Charles Lieber to Tsinghua SIGS (Apr 2025); Omar Yaghi to Tsinghua (Jul 2025; Nobel Chemistry Oct 2025); Mourou, Yang Dan, Sun Song, Liu Jun appointments.
            </li>
          </ul>

          <h3>The exceptions</h3>

          <ul className='blog-prose__refs'>
            <li>
              NPCI / IMF — UPI 2025 transaction volumes; IMF recognition as world&apos;s largest retail fast-payment system by volume.
            </li>
            <li>
              ISRO / contemporary coverage — Chandrayaan-3 mission cost (~₹615 crore); see{' '}
              <a
                href='https://en.wikipedia.org/wiki/Chandrayaan-3'
                target='_blank'
                rel='noopener noreferrer'
              >
                Chandrayaan-3 overview
              </a>
              .
            </li>
            <li>
              IndiaAI Mission compute updates (~38,000 GPUs empanelled/deployed).
            </li>
          </ul>

          <p>
            <em>Alternate titles considered and affectionately shelved: &ldquo;Mark in
            India&rdquo; · &ldquo;A Farrago of Middlemen&rdquo; · &ldquo;The Clerk
            Factory&rdquo; · &ldquo;Which Way the River Runs.&rdquo;</em>
          </p>

          <h3>On this site</h3>

          <ul className='blog-prose__refs'>
            <li>
              <Link href='/blogs/the-arranged-marriage-of-the-century'>
                The Arranged Marriage of the Century
              </Link>{' '}
              — Part 2: why Japan and India are each other&apos;s missing half.
            </li>
            <li>
              <Link href='/blogs/the-rope-sellers-buy-a-rope-machine'>
                The Rope Sellers Buy a Rope Machine
              </Link>{' '}
              — Indian IT as the middleman pyramid meeting the machine that
              automates pyramids.
            </li>
            <li>
              <Link href='/blogs/the-rope-sellers'>The Rope Sellers</Link> —
              accountability moats, body shops, and who still gets paid to be
              wrong.
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
