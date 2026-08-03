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
  postDocumentTitle,
  postUrl,
  SITE_URL,
} from '@/lib/blog-posts';

const SLUG = 'down-the-fraud-rabbit-hole';
const post = getPostBySlug(SLUG)!;
const url = postUrl(SLUG);
const ogAbsolute = `${SITE_URL}${post.ogImage}`;
const publishedIso = `${post.date}T12:00:00.000Z`;

export const metadata: Metadata = {
  title: postDocumentTitle(post),
  description: post.description,
  keywords: [
    ...post.tags,
    'Soham Parekh',
    'candidate fraud',
    'RTO',
    'hybrid work',
    'GitLab',
    'North Korean IT workers',
    'identity verification',
    'Arvind Narayan',
  ],
  authors: [{ name: 'Arvind Narayan', url: SITE_URL }],
  creator: 'Arvind Narayan',
  publisher: 'Arvind Narayan',
  category: 'Work & Hiring',
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
    section: 'Work & Hiring',
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
    'article:section': 'Work & Hiring',
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
    articleSection: 'Work & Hiring',
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

export default function DownTheFraudRabbitHolePostPage() {
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
            <BlogDropcap word='There' /> is a delicious absurdity at the heart
            of modern corporate life, and it deserves to be named with the
            unembarrassed candour of a man who has wasted too many evenings on
            it. When I began building{' '}
            <a
              href='https://superscaled.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              superscaled.com
            </a>
            , I carried the standard-issue conviction of every founder loitering
            in the recruitment-AI bazaar: that hiring is fundamentally a{' '}
            <em>search</em> problem. Somewhere, one is assured, lurks a
            top-one-percent engineer buried beneath ninety-nine pretenders; and
            if one merely constructs a sufficiently clever ranking function —
            embeddings here, agents there, a soupçon of LLM garnish for the
            investors — the needle shall rise obediently from the haystack. It
            is a comforting belief. It is also, I regret to report, a load of
            old cobblers.
          </p>

          <p>
            The disillusionment arrived by instalments, as the better class of
            catastrophe prefers to do. With{' '}
            <a
              href='https://thecohort.ai'
              target='_blank'
              rel='noopener noreferrer'
            >
              thecohort.ai
            </a>
            , we built deep-research agents to vet candidates properly —
            trawling GitHub, LinkedIn, publications, career histories — expecting
            them to answer the rather wholesome question{' '}
            <em>is this person any good?</em> Instead, with lugubrious
            regularity, they kept answering an older and more anxious one:{' '}
            <em>is this person real, and is this work actually theirs?</em>
          </p>

          <p>
            Repositories that were forks wearing false moustaches — stars and
            commits cloned wholesale, READMEs rewritten overnight, contribution
            graphs that resembled a cardiogram of genius until five minutes of
            git archaeology revealed the patient had been dead for years.
            Employment histories with the structural integrity of a soufflé:
            titles that never existed at companies that did, tenures overlapping
            in physically impossible ways, &ldquo;references&rdquo; who turned
            out to be the candidate under a different LinkedIn epidermis.
            Profiles so pristine they could only have been assembled in a
            laboratory — the uncanny valley of a career, every bullet polished,
            every skill endorsed, nothing that smells faintly of a human life.
            The moment you build hiring software with even a modicum of honesty,
            you discover that recruitment is not a talent-scarcity problem at
            all. It is a <em>trust</em> problem wearing a talent-scarcity
            costume and hoping nobody asks for papers.
          </p>

          <p>
            I keep saying this to people who still wish to discuss embeddings as
            though embeddings were the point. Matching is frightfully easy once
            you believe the inputs. The hard part — the part that ate our
            roadmap, our evals, and any remaining claim I had to a social life —
            was learning to distrust the inputs without becoming so cynically
            constipated that the product refused to hire anyone at all.
          </p>

          <h2>Down the rabbit hole, and rather further than Alice</h2>

          <p>
            Once your own pipeline shows you the rot, you cannot unsee it —
            rather like discovering that the champagne has been watered, except
            the champagne is your entire industry. So I went spelunking through
            the category. Juicebox, Mercor, Gem, Ashby — the whole gleaming
            shelf of AI recruitment tooling, ours included — is engaged in an
            arms race to build faster, cleverer <em>matching</em> engines. But
            matching is only as good as the substrate, and the substrate, dear
            reader, is curdling.
          </p>

          <p>
            Gartner projects that by 2028,{' '}
            <strong>
              one in four candidate profiles worldwide will be fake
            </strong>{' '}
            — a projection, mind you, not a census, and one must treat vendor
            forecasts with the same scepticism one reserves for wedding toasts,
            but the direction of travel is scarcely in dispute. In its 2025
            survey of 3,000 candidates, 6% cheerfully <em>admitted</em> to
            interview fraud, either impersonating someone or deploying a proxy —
            and if six per cent will confess to a survey, one shudders to
            imagine what the remaining ninety-four are up to. Pindrop reports
            deepfake fraud attempts rose more than 1,300% in 2024 — from roughly
            one a month to seven a day. At that velocity, the deepfake will soon
            require its own LinkedIn Premium tier.
          </p>

          <p>
            Consider what this does to the category. Garbage in, exquisitely
            ranked garbage out — the computational equivalent of arranging the
            deckchairs on the Titanic alphabetically. The biggest dent in these
            companies is not a competitor with a shinier model; it is the quiet
            epistemic collapse of the data they rank. Every recruitment-AI firm
            believes its moat is retrieval quality. The actual moat — the only
            one that matters — is a trust layer. Nobody put that in the pitch
            deck. Pitch decks, as a rule, prefer adjectives to plumbing.
          </p>

          <h2>The penny drops, somewhere around the fourth espresso</h2>

          <p>
            And then the connection assembled itself with the sudden clarity of
            a man who has finally understood a joke told against him. If fraud
            is what breaks recruitment <em>software</em>, what does it do to the
            psyche of a board that employs three hundred thousand strangers it
            has never once clapped eyes on in person?
          </p>

          <p>
            It terrifies them. And that terror, I submit, is the true engine of
            the great return-to-office fiasco — that lugubrious morality play
            presently being staged across the fluorescent prairies of corporate
            America and, with rather less subtlety, the Outer Ring Road. The RTO
            mandate is not a productivity strategy. It is a lie detector with a
            cafeteria and a foosball table.
          </p>

          <h2>The paradox, stated properly</h2>

          <p>
            Let us be fair to the numbers first, for I am not a coward and the
            numbers are inconveniently hostile to my thesis. Working from home
            is, by every dry actuarial measure a chief financial officer holds
            sacred, <em>cheaper</em>. Nicholas Bloom of Stanford — the
            discipline&apos;s patron saint, its Newton, its rather more
            cheerful Cassandra — ran a randomised trial at Trip.com, published
            in <em>Nature</em> in 2024: across 1,612 employees, hybrid work cut
            attrition by a third (4.7% versus 7.2%) with no measurable impact on
            performance reviews, promotions, or lines of code. Employees value
            the arrangement at roughly 8% of salary. Remote work has stabilised
            at about a quarter of American paid workdays — &ldquo;flat as a
            pancake,&rdquo; in Bloom&apos;s memorable phrase — and some
            four-fifths of the Fortune 500 have settled into a three-two hybrid,
            that most unromantic of peace treaties.
          </p>

          <p>
            The pièce de résistance: Ding and Ma at the University of Pittsburgh
            examined all 137 S&amp;P 500 firms that announced RTO mandates and
            found declining employee satisfaction but &ldquo;no significant
            changes in financial performance or firm values.&rdquo; Mandates
            clustered, deliciously, among firms with poor prior stock
            performance helmed by assertive male chief executives fond of
            reasserting control — a finding so on-the-nose one suspects the data
            of having read the room. The share price does not move. The
            employees merely suffer. One is tempted to call this a policy. One
            should call it a tantrum with a PowerPoint.
          </p>

          <p>
            So if RTO doesn&apos;t pay, and WFH is cheaper, why the perfidious
            insistence on the commute? Ah. Here the plot thickens, and the
            official explanations begin to smell faintly of something left too
            long in the corporate fridge.
          </p>

          <h2>The official liturgy</h2>

          <p>
            Andy Jassy gave us the canonical scripture in September 2024,
            summoning Amazonians back five days a week from January 2025: being
            together makes it &ldquo;easier for our teammates to learn, model,
            practice, and strengthen our culture.&rdquo; Culture. Collaboration.
            Serendipity. The holy trinity of every RTO press release ever
            drafted by a communications department at gunpoint. One is tempted
            to believe them. One should resist, as one resists complimentary
            mints at a restaurant that has just overcharged you.
          </p>

          <p>
            The congregation was unmoved. A Blind survey of 2,585 verified
            Amazon staff found 91% dissatisfied and 73% considering departure; a
            leaked internal poll reportedly scored the policy 1.4 out of 5 —
            which, for those keeping score at home, is the sort of rating usually
            reserved for airline food and parliamentary question hour. Jassy was
            obliged to deny, at an all-hands, that the mandate was a backdoor
            layoff — a denial that tells you precisely what everyone suspected —
            while his cloud chief assured us that &ldquo;nine out of ten&rdquo;
            people were rather excited, a statistic apparently sourced from the
            same aquifer as most executive optimism and the annual rainfall
            forecasts of the Meteorological Department.
          </p>

          <p>
            Then there is the property angle, at least honest in its naked
            self-interest. Jamie Dimon erected a $3 billion tower on Park Avenue
            and, not coincidentally, wishes it populated. Economists fret about
            the &ldquo;urban doom loop&rdquo;: empty offices, collapsing
            commercial real estate, eroding municipal tax bases, regional banks
            marinating in CRE exposure like pickles in brine. When the largest
            commercial tenant in New York insists young people belong at their
            desks, one may be forgiven for wondering whether he worries about
            their mentorship or his mortgage. Mentorship, one notices, is rarely
            mentioned when the bond covenants come due.
          </p>

          <h2>The Bengaluru wrinkle</h2>

          <p>
            Here at home the story wears different clothing but shares the same
            rather bony skeleton. Bengaluru&apos;s 2025 office leasing hit an
            all-time record of 24.1 million square feet per JLL, with technology
            firms leading demand — a triumph of square footage over common
            sense, if one may be ungentle. Companies sit atop enormous leases
            and SEZ commitments whose tax advantages presume physical occupancy;
            empty SEZ floors are not merely melancholy, they are fiscally
            awkward, which in Indian corporate life is a far more persuasive
            emotion. And so the majors marched in lockstep — Infosys mandating
            ten office days a month with app-based attendance, TCS lashing
            variable pay to turnstile data, HCLTech nodding along with the
            solemnity of a wedding guest who has forgotten the couple&apos;s
            names — while an unspoken macroeconomic argument hums beneath: tens
            of thousands of returned commuters prop up the micro-economies of
            rents, metro fares, and the noble lunch-thali vendor. All true. All
            real. And all, I submit, downstream of something older and more
            primal than any SEZ circular.
          </p>

          <BlogRelatedAd slug={SLUG} />

          <h2>The unspeakable thesis: it was never about culture</h2>

          <p>
            Here is what leadership actually fears, whispered after the synergy
            slides are put away and the last consultant has been paid to say
            &ldquo;synergy&rdquo; aloud: they no longer trust that the person on
            the payroll is doing the work, is qualified for the work, or is even{' '}
            <em>the person they hired</em>. Trust, not talent scarcity, is the
            real bottleneck of modern hiring. The last three years furnished a
            parade of horrors so extravagant that a Victorian novelist would
            have rejected them as overegged. Permit me a brief rogues&apos;
            gallery.
          </p>

          <h3>Soham Parekh, patron saint of the overemployed</h3>

          <p>
            In July 2025, Suhail Doshi of Playground AI posted the tweet heard
            round Silicon Valley, warning founders about an engineer
            &ldquo;preying on YC companies&rdquo; by working three or four
            startups simultaneously — a feat of calendrical gymnastics that
            makes the average Indian auntie&apos;s wedding season look
            leisurely. The post detonated past twenty million views; founders
            from Lindy, Antimetal and Fleet AI confessed they too had hired and
            fired the man, rather in the manner of diners discovering they have
            all been served the same undercooked chicken. A tracker documented{' '}
            <strong>at least 19 jobs since 2021</strong>. Parekh went on a
            podcast and admitted the lot, pleading dire finances and claiming —
            with a straight face that deserves its own Emmy — 140-hour weeks.
            Doshi alleged roughly 90% of his CV was fabricated; Georgia Tech
            confirmed no record of his claimed master&apos;s. The
            r/overemployed subreddit crowned him king. The lesson boards drew
            was not &ldquo;we are bad at management,&rdquo; that being an
            admission no board has ever voluntarily issued. It was:{' '}
            <em>he passed every screen we had, and still we were fooled.</em>
          </p>

          <h3>The North Koreans at the next desk</h3>

          <p>
            If Parekh was farce, this is tragedy — and of a particularly
            geopolitical flavour. Since 2022 the FBI and DOJ have unravelled
            schemes in which thousands of North Korean IT workers, using stolen
            American identities, secured remote jobs at hundreds of US firms —
            Fortune 100 included — with wages funnelled to Pyongyang&apos;s
            weapons programme. The mechanism is a marvel of perfidy:
            &ldquo;laptop farms,&rdquo; wherein a complicit American receives
            the company laptop and lets an operative log in from overseas while
            appearing to toil from Tennessee. Even KnowBe4 — a{' '}
            <em>security-awareness training company</em>, one notes, with the
            grim comedy of a locksmith whose own door has been jemmied — hired
            one such actor as a principal engineer in 2024 after four video
            interviews; he used an AI-altered photograph and attempted to
            install malware on day one. Facilitators have since drawn federal
            sentences of nine-plus years for farms exploiting the identities of
            over eighty Americans across more than a hundred companies. The
            State Department offers up to $5 million for tips. If your CEO seems
            twitchy about who is behind the webcam, this — and not the sacred
            mystery of &ldquo;culture&rdquo; — is why.
          </p>

          <h3>The interview is now theatre</h3>

          <p>
            The gate itself is compromised. Roy Lee, suspended from Columbia for
            building a tool to cheat technical interviews, promptly raised
            millions for Cluely, an &ldquo;undetectable&rdquo; assistant whose
            manifesto urges users to &ldquo;cheat on everything&rdquo; — a
            mission statement of such refreshing honesty that one almost
            respects it, rather as one respects a pickpocket who tips his hat.
            Proxy interviewing — one person interviews, another shows up — has
            graduated from rumour to business model, industrialised by the H-1B
            body shops and bench-sales consultancies that coach fresh graduates
            into claiming eight years of experience, and which have drawn DOJ
            prosecutions for fabricating jobs outright. Meanwhile the onboarding
            gap yawns like a plot hole in a bad thriller: one human aces the
            interview, a <em>different</em> human with a matching ID collects
            the shipped laptop, and the company builds a perfectly normal
            employee record around the wrong person. Kafka would have found it
            overdetermined.
          </p>

          <h3>The Indian reckoning</h3>

          <p>
            In 2022 Wipro fired 300 employees for moonlighting; Rishad Premji
            called the practice &ldquo;cheating, plain and simple&rdquo; — a
            phrase of such bracing directness that one almost forgot one was
            reading corporate India. Infosys circulated stern warnings against
            two-timing. And the verification data is genuinely alarming:
            AuthBridge&apos;s 2025 fraud files found a 9.46% discrepancy rate in
            IT/ITES hiring, 18.8% résumé misrepresentation, and one in twenty
            candidates caught moonlighting — atop a cottage industry selling
            fabricated experience letters from companies that conveniently no
            longer exist, having dissolved with the discretion of a bad house
            guest. Fake experience certificates remain, in this republic, one of
            our more durable cottage crafts.
          </p>

          <h3>And the classic</h3>

          <p>
            None of this is new; it is merely faster, cheaper, and available as
            a SaaS. In 2013 Verizon&apos;s security team immortalised
            &ldquo;Bob,&rdquo; a developer at a US critical-infrastructure firm
            rated &ldquo;the best developer in the building&rdquo; — until VPN
            logs showed his credentials dialling in from Shenyang. Bob had
            FedExed his RSA token to a Chinese consultancy, paid them a fifth of
            his salary to do his job, and spent his days on cat videos. A
            one-man r/overemployed, a decade early, and proof that the only
            thing modern fraud has innovated is the shipping method.
          </p>

          <h2>The office as an exceedingly expensive lie detector</h2>

          <p>
            Once you see the pattern, the mandate stops resembling strategy and
            starts resembling <em>biometric verification by other means</em>. If
            the body is in the building, it is probably the body you hired,
            probably not servicing three other employers, and cannot easily
            FedEx its identity to Shenyang. The office solves the trust problem
            the way a sledgehammer solves a walnut: expensively,
            indiscriminately, and with considerable collateral damage to
            everyone who did nothing wrong — which is to say, most people, who
            are now punished for the ingenuity of a few.
          </p>

          <p>
            The alternative firms reach for is worse. Bossware — keystroke
            logging, screenshot harvesting, webcam phrenology of a sort that
            would have embarrassed a Victorian phrenologist — corrodes the very
            trust it polices. Surveyed employees overwhelmingly report it
            improves nothing, damages morale, and hastens their departure.
            Surveillance is not verification. It is the <em>anxiety</em> of
            verification, performed daily, at scale, and billed as productivity
            software. One may as well install a bathroom attendant to improve
            code quality.
          </p>

          <h2>In fairness: the case for the office</h2>

          <p>
            I promised balance, and I shall keep the promise even if it pains
            me. The office does things Slack cannot. Onboarding a graduate — the
            tacit, over-the-shoulder apprenticeship of a first job — is
            genuinely harder remotely. Weak ties, mentorship, the serendipitous
            corridor collision that occasionally produces an idea rather than a
            coffee stain: real, and their absence compounds slowly, like interest
            on a loan one forgot to mention. Data security is easier inside a
            controlled perimeter, and for genuinely fraud-prone or
            safety-critical work, physical presence <em>is</em> a control. Even
            Bloom concedes coordinated in-person days help. The office is not
            stupid. It is merely a blunt instrument being sold to us as a
            scalpel by people who have never held either.
          </p>

          <h2>The case against — and it is the stronger one</h2>

          <p>
            But the mandate is losing on the merits, which is awkward for those
            who prefer merits not to interfere with policy. Amazon&apos;s own
            aftermath is the cautionary tale: surveys found nearly half of
            employees applying elsewhere, with senior and principal engineers —
            the hardest to replace, the ones who actually know where the bodies
            are buried in the codebase — departing at disproportionate rates,
            while roughly a quarter of executives elsewhere have quietly admitted
            RTO was designed to make people quit. That is not culture-building;
            it is attrition with a press release and a free bagel. And looming
            over it all, the Pittsburgh finding stands like a tombstone in a
            field of PowerPoints: you inflict the pain, lose the women and
            senior talent who most prize flexibility, and the share price does
            not so much as twitch. Control, it turns out, is its own reward —
            and rather an expensive one.
          </p>

          <h2>The grown-ups: firms that solved trust without a lobby</h2>

          <p>
            Here is the part that should embarrass every executive hiding behind
            &ldquo;collaboration&rdquo; like a schoolboy behind a prefect&apos;s
            blazer. Some companies simply <em>solved the trust problem</em> and
            never needed the building. They did not issue memos. They built
            systems.
          </p>

          <p>
            GitLab has been all-remote since 2014 — 1,500-plus people across
            sixty-odd countries, zero offices, not so much as a complimentary
            foosball table — governed by a public handbook of over two thousand
            pages and a manifesto prioritising &ldquo;writing down and recording
            knowledge over verbal explanations.&rdquo; When everything is
            written, output is legible; and legible output is its own
            verification, which is a good deal cheaper than a Park Avenue
            atrium. Automattic runs some 1,300 people across seventy-seven
            countries on Matt Mullenweg&apos;s creed of assuming positive
            intent; Zapier has been distributed since 2011 on ferocious async
            discipline — as Wade Foster puts it, with the bluntness of a man
            who has earned the right, &ldquo;you have to commit to writing
            things down.&rdquo;
          </p>

          <p>
            The common thread: they manage <em>outputs</em>, not attendance, and
            they hire on demonstrated work rather than vibes — which the
            selection-research literature has said for decades predicts
            performance far better than an unstructured chat, and is vastly
            harder to fake than a CV padded with the tears of imaginary managers.
            The classic Schmidt &amp; Hunter meta-analysis pegged work-sample
            tests among the most predictive tools; later revisions (Roth,
            Sackett) have dialled the coefficients down, but the point survives
            the statistical quibbling: watching someone actually do the work
            beats an unstructured chat, and it is much harder to fake than a
            résumé composed at three in the morning with ChatGPT&apos;s
            assistance and a prayer.
          </p>

          <p>
            What these firms share is not a vibe of &ldquo;trust everyone,&rdquo;
            that being the managerial equivalent of leaving the vault open and
            calling it culture. It is infrastructure that makes trust{' '}
            <em>checkable</em>. A public handbook is not culture theatre; it is
            an audit log of how decisions get made. Async writing is not a
            lifestyle brand; it is a verification surface. Work samples are not
            a cute take-home; they are a fraud-resistant signal. The remote
            natives did not abolish accountability. They moved it from the badge
            swipe to the artefact — which is where, if one is being honest, it
            always belonged.
          </p>

          <h2>The actual solution: verify the human, then trust them</h2>

          <p>
            This is where my two startups and the world&apos;s RTO tantrum
            converge on the same unglamorous answer. Trust, unlike office
            leases, is a solvable engineering problem — which is to say it
            requires engineers, not sermons. The emerging stack, for those who
            prefer substance to liturgy:
          </p>

          <ul>
            <li>
              <strong>Identity bound across the funnel</strong> — document
              authentication plus liveness detection, so the interviewee and the
              onboardee are provably one person. The laptop-farm and
              proxy-interview tricks both exploit the gap between these two
              moments, rather as a stage magician exploits the gap between what
              you watch and what you assume.
            </li>
            <li>
              <strong>Continuous verification</strong> rather than a one-time
              onboarding ritual — moonlighting and credential-sharing are
              ongoing risks, not day-one events, and treating them as a
              checkbox at hiring is rather like checking the locks once and
              declaring the burglars defeated.
            </li>
            <li>
              <strong>Work-sample and structured assessment</strong> over
              credential theatre — harder to fake, better predictors of
              performance, and mercifully less dependent on the candidate&apos;s
              gift for narrative fiction.
            </li>
            <li>
              <strong>Deepfake detection inside the interview itself</strong> —
              tools like Truely and BrightHire&apos;s fraud detection now wired
              into Zoom. Video KYC, once a banking chore inflicted on people
              opening savings accounts, is coming for hiring, because it must —
              the alternative being to continue interviewing ghosts.
            </li>
          </ul>

          <p>
            This is precisely the conclusion the rabbit hole forced upon us at
            superscaled and The Cohort, after rather more coffee than was
            medically advisable: the winning recruitment product is not a better
            ranking function. It is a trust layer with a ranking function
            attached, rather as a good restaurant is a kitchen with a dining
            room attached, and not the other way round.
          </p>

          <h2>The future of office work, as philosophy</h2>

          <p>
            So what becomes of the office? Not death — Bloom&apos;s pancake will
            not flip to zero, and the property lobby will not permit it in any
            case — but <em>demotion</em>. The office ceases to be where work is
            done and becomes where trust is <em>renewed</em>: onboarding weeks,
            quarterly gatherings, the deliberate cultivation of apprenticeship
            and weak ties that genuinely require flesh. Hybrid stabilises, as it
            already has, at two or three coordinated days — not a grand
            philosophy but the treaty line where the war of attrition reached
            equilibrium, rather like the Korean peninsula, only with better
            coffee.
          </p>

          <p>
            The firms that thrive will be those that stop confusing{' '}
            <em>presence</em> with <em>proof</em>. The office was never a
            productivity tool; it was a trust prosthesis — a fantastically
            expensive, real-estate-intensive way of being reasonably sure that
            the person drawing the salary was the person doing the job. Once you
            can verify identity, verify skill, and measure output directly, the
            prosthesis becomes optional. You keep it for the human warmth, not
            the surveillance. One does not, after all, keep a wheelchair for the
            aesthetic once one can walk.
          </p>

          <p>
            Looking ahead, the stack gets sharper, not softer. Continuous
            identity — cryptographic binding of a human to every credential,
            device, and session — will become table stakes, the way MFA did,
            after sufficient public humiliation. Hiring pipelines will treat
            fraud detection as a first-class subsystem rather than an HR
            afterthought: liveness at application, again at offer, again at
            device issuance, with the same biometric and document graph binding
            all three. Deepfake detection will move from a vendor checkbox into
            the interview platform itself, the way spam filters moved into
            email. Background verification will stop being a post-offer ritual
            that arrives three weeks late — like a wedding gift from a relative
            who never liked you — and start being a live signal in the funnel.
          </p>

          <p>
            For recruitment products specifically, the category will bifurcate
            with the Darwinian clarity of a Victorian novel. Matching engines
            without a trust layer will keep ranking forgeries with exquisite
            precision and wonder why customers churn — rather like a sommelier
            who can rank vinegar by vineyard. The survivors will look less like
            search and more like KYC married to talent intelligence: identity,
            provenance of work, continuous employment integrity, then ranking.
            That is the product I now believe we should have been building from
            day one. Matching is the garnish. Trust is the meal. I spent rather
            too long polishing the garnish.
          </p>

          <p>
            Output-based management will spread beyond the remote natives,
            because it is the only management style that scales past the walls
            of a building. And the office, freed of its detective duties, can
            finally do the job it is good at: making strangers into colleagues.
            Two or three coordinated days for apprenticeship, conflict, and the
            weak ties that Slack never quite invents. The rest of the week
            belonging to whoever can prove they shipped — a criterion of such
            shocking simplicity that one wonders why it required a pandemic, a
            fraud epidemic, and several billion dollars of wasted real estate to
            rediscover.
          </p>

          <p>
            For leaders deciding RTO right now, the practical version is blunt,
            and I shall not sugar it. Stop using the office as a lie detector —
            if your fear is fraud or moonlighting, name it and solve it, rather
            than dressing it up as culture and hoping the juniors do not notice.
            Invest in a verification stack before a real-estate one. Hire on
            work samples. Avoid bossware; it is the anxiety of verification,
            performed daily, and it accelerates attrition among the people you
            can least afford to lose. Adopt structured hybrid as the compromise
            the market has already reached, and treat senior-talent attrition
            after a mandate as the alarm it is — not as a culture-building
            victory, and certainly not as evidence that the remaining souls are
            &ldquo;aligned.&rdquo;
          </p>

          <p>
            Mr Jassy may march his hundreds of thousands back to their assigned
            desks, and gaze across the repopulated floor with the reassuring
            certainty that everyone is who they claim to be. But he will have
            paid for that certainty in talent, morale and cash — when the same
            certainty was available cheaper, kinder, and infinitely more
            scalable to anyone willing to do the unglamorous work of building
            trust into the system itself. One may buy reassurance. One need not
            buy an entire skyline to obtain it.
          </p>

          <p>
            I know, because I fell into that rabbit hole trying to build a
            recruiting product, and found the future of the office waiting at
            the bottom — smirking, I rather suspect, at how long it took us to
            notice.
          </p>

          <blockquote>
            The office was never a productivity tool. It was a trust prosthesis.
            Once you can verify the human, the prosthesis becomes optional — and
            rather expensive to keep for the furniture.
          </blockquote>

          <h2>References</h2>

          <h3>Hybrid work &amp; RTO evidence</h3>
          <ul className='blog-prose__refs'>
            <li>
              Bloom, Han &amp; Liang —{' '}
              <a
                href='https://www.nature.com/articles/s41586-024-07500-2'
                target='_blank'
                rel='noopener noreferrer'
              >
                <em>
                  Hybrid working from home improves retention without damaging
                  performance
                </em>
              </a>{' '}
              (<em>Nature</em>, 2024); see also{' '}
              <a
                href='https://news.stanford.edu/stories/2024/06/hybrid-work-is-a-win-win-win-for-companies-workers'
                target='_blank'
                rel='noopener noreferrer'
              >
                Stanford Report
              </a>
            </li>
            <li>
              Ding &amp; Ma —{' '}
              <a
                href='https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4675401'
                target='_blank'
                rel='noopener noreferrer'
              >
                <em>Return-to-Office Mandates</em>
              </a>{' '}
              (SSRN); summary via{' '}
              <a
                href='https://www.business.pitt.edu/return-to-office-mandates-dont-improve-employee-or-company-performance/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Pitt Business
              </a>
            </li>
            <li>
              Andy Jassy —{' '}
              <a
                href='https://www.aboutamazon.com/news/company-news/ceo-andy-jassy-latest-update-on-amazon-return-to-office-manager-team-ratio'
                target='_blank'
                rel='noopener noreferrer'
              >
                Amazon RTO memo
              </a>{' '}
              (September 2024); Blind survey coverage via{' '}
              <a
                href='https://arstechnica.com/tech-policy/2024/09/91-percent-of-amazon-employees-are-dissatisfied-with-remote-work-ending-poll/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Ars Technica
              </a>
            </li>
          </ul>

          <h3>Candidate fraud &amp; deepfakes</h3>
          <ul className='blog-prose__refs'>
            <li>
              Gartner — by 2028, 1 in 4 candidate profiles fake; 6% admit
              interview fraud —{' '}
              <a
                href='https://www.gartner.com/en/newsroom/press-releases/2025-07-31-gartner-survey-shows-just-26-percent-of-job-applicants-trust-ai-will-fairly-evaluate-them'
                target='_blank'
                rel='noopener noreferrer'
              >
                Gartner newsroom
              </a>
              ;{' '}
              <a
                href='https://www.hrdive.com/news/fake-job-candidates-ai/757126/'
                target='_blank'
                rel='noopener noreferrer'
              >
                HR Dive
              </a>
            </li>
            <li>
              Pindrop —{' '}
              <a
                href='https://www.prnewswire.com/news-releases/pindrops-2025-voice-intelligence--security-report-reveals-1-300-surge-in-deepfake-fraud-302479482.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                2025 Voice Intelligence &amp; Security Report
              </a>{' '}
              (+1,300% deepfake fraud attempts in 2024)
            </li>
            <li>
              AuthBridge —{' '}
              <a
                href='https://authbridge.com/workforce-fraud-files-2025/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Workforce Fraud Files 2025
              </a>{' '}
              (IT/ITES 9.46% discrepancy; 18.8% résumé misrepresentation; ~5%
              moonlighting) —{' '}
              <a
                href='https://authbridge.com/newsroom/authbridge-exposes-indias-hiring-red-flags/'
                target='_blank'
                rel='noopener noreferrer'
              >
                newsroom summary
              </a>
            </li>
          </ul>

          <h3>Exhibits</h3>
          <ul className='blog-prose__refs'>
            <li>
              Soham Parekh —{' '}
              <a
                href='https://techcrunch.com/2025/07/03/who-is-soham-parekh-the-serial-moonlighter-silicon-valley-startups-cant-stop-hiring/'
                target='_blank'
                rel='noopener noreferrer'
              >
                TechCrunch
              </a>
              ;{' '}
              <a
                href='https://www.fastcompany.com/91364960/serial-moonlighter-exposed-multiple-startup-jobs'
                target='_blank'
                rel='noopener noreferrer'
              >
                Fast Company
              </a>
            </li>
            <li>
              KnowBe4 / North Korean IT workers —{' '}
              <a
                href='https://blog.knowbe4.com/how-a-north-korean-fake-it-worker-tried-to-infiltrate-us'
                target='_blank'
                rel='noopener noreferrer'
              >
                KnowBe4 incident report
              </a>
              ;{' '}
              <a
                href='https://arstechnica.com/tech-policy/2024/07/us-security-firm-unwittingly-hired-apparent-nation-state-hacker-from-north-korea/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Ars Technica
              </a>
              ;{' '}
              <a
                href='https://www.cnn.com/interactive/2025/08/05/world/north-korea-it-worker-scheme-vis-intl-hnk/index.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                CNN interactive
              </a>
            </li>
            <li>
              &ldquo;Bob&rdquo; / Verizon — classic 2013 case of a developer
              outsourcing himself to China (widely cited in infosec literature;
              see Verizon DBIR-era case studies and subsequent retellings)
            </li>
          </ul>

          <h3>Bengaluru &amp; Indian RTO</h3>
          <ul className='blog-prose__refs'>
            <li>
              JLL — Bengaluru 2025 gross office leasing 24.1M sq ft (Q4 9.3M) —{' '}
              <a
                href='https://www.jll.com/en-in/newsroom/india-s-office-market-scales-unprecedented-highs-with-gross-leasing-activity-at-83-3-million-sq-ft-for-the-year-2025-jll'
                target='_blank'
                rel='noopener noreferrer'
              >
                JLL India newsroom
              </a>
              ;{' '}
              <a
                href='https://realestateasia.com/commercial-office/news/bengaluru-gross-office-leasing-hits-all-time-high-in-2025'
                target='_blank'
                rel='noopener noreferrer'
              >
                Real Estate Asia
              </a>
            </li>
            <li>
              Wipro / Infosys moonlighting crackdowns (2022) — contemporary
              Business Standard / Economic Times coverage of Premji&apos;s
              &ldquo;cheating, plain and simple&rdquo; remarks and subsequent
              IT-major attendance mandates
            </li>
          </ul>

          <h3>High-trust remote</h3>
          <ul className='blog-prose__refs'>
            <li>
              <a
                href='https://about.gitlab.com/company/culture/all-remote/'
                target='_blank'
                rel='noopener noreferrer'
              >
                GitLab all-remote / handbook-first culture
              </a>
            </li>
            <li>
              Automattic distributed work; Zapier async-first remote playbook
              (company docs and founder interviews)
            </li>
          </ul>

          <h3>Caveats</h3>
          <ul className='blog-prose__refs'>
            <li>
              Gartner&apos;s &ldquo;1 in 4 by 2028&rdquo; is a projection, not a
              measured census — treat it as weather forecast, not scripture; the
              measured floor is the 6% self-reported interview-fraud figure.
              Deepfake hiring stats often come from vendors selling detection —
              treat market-size claims with the scepticism they have earned.
            </li>
            <li>
              The Amazon 1.4/5 figure is a leaked Slack survey reported
              secondhand; Blind&apos;s 91%/73% numbers are the more solidly
              sourced poll (self-selected, as such polls tend to be).
            </li>
            <li>
              RTO motives are plural, not monocausal. Real-estate pressure, SEZ
              tax structures, genuine onboarding benefits, and control dynamics
              coexist with fraud fear. My claim is that eroded trust is the
              underweighted, unspoken driver — not the only one, and certainly
              not the one that makes it into the all-hands.
            </li>
          </ul>

          <h3>On this site</h3>
          <ul className='blog-prose__refs'>
            <li>
              <Link href='/blogs/an-exasperating-farrago-of-firewalls'>
                An Exasperating Farrago of Firewalls
              </Link>{' '}
              — identity as the real perimeter when attackers log in instead of
              breaking in.
            </li>
            <li>
              <Link href='/blogs/vibes-all-the-way-down'>
                Vibes All the Way Down
              </Link>{' '}
              — outsourcing judgment; the cognitive sibling of outsourcing
              verification.
            </li>
            <li>
              <Link href='/blogs/the-rope-sellers'>The Rope Sellers</Link> —
              accountability moats, and who still has to sign their name in
              blood.
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
