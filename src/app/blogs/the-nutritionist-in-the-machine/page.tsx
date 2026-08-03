import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogCover } from '@/components/blog/blog-cover';
import { BlogDropcap } from '@/components/blog/blog-dropcap';
import { BlogHook } from '@/components/blog/blog-hook';
import {
  BlogContinueReading,
  BlogRelatedAd,
} from '@/components/blog/blog-related';
import { MermaidDiagram } from '@/components/blog/mermaid-diagram';
import {
  formatPostDate,
  getPostBySlug,
  postDocumentTitle,
  postUrl,
  SITE_URL,
} from '@/lib/blog-posts';

const SLUG = 'the-nutritionist-in-the-machine';
const post = getPostBySlug(SLUG)!;
const url = postUrl(SLUG);
const ogAbsolute = `${SITE_URL}${post.ogImage}`;
const publishedIso = `${post.date}T12:00:00.000Z`;
const RECOMMENDATION_FLOW = `
flowchart TD
    A["User state: body stats, goal, dietary<br/>restrictions, medications, appetite"] --> B{"Target engine:<br/>choose the macros"}
    W["Wearables: steps,<br/>workouts, sleep"] --> B
    B -->|"calorie and macro targets"| C["Candidate generation:<br/>fast embedding retrieval"]
    C --> D["Hard-constraint filter:<br/>allergens, halal, kosher,<br/>drug interactions, renal limits"]
    D --> E["Portion optimiser:<br/>scale ingredient quantities<br/>to hit the numbers exactly"]
    E --> F["Ranker: will they<br/>eat it and reorder it?"]
    F --> G["The week's plan"]
    G --> H["Kitchen and delivery"]
    RD[["Nutritionist sign-off<br/>on anything medical"]] -.->|gates| D
`;
const FEEDBACK_LOOP = `
flowchart LR
    U(["The eater"]) -->|"ratings, swaps,<br/>finished vs binned"| T["Taste signals"]
    U -->|"'gone vegan', new<br/>allergy, new medication"| CH["Constraint changes"]
    U -->|"weight, glucose,<br/>adherence"| O["Outcome signals"]
    RD(["The nutritionist"]) -->|"edits and overrides"| X["Expert corrections"]

    T --> R["Preference ranker"]
    CH --> P["Profile store"]
    P --> RE["Re-optimise the plan"]
    O --> TE["Adaptive target engine"]
    X --> R
    X --> FT["LLM fine-tuning:<br/>SFT and DPO"]
    X --> RE

    R -->|"retrain"| REC(["Less stupid<br/>recommendations"])
    TE -->|"adjust deficit and surplus"| REC
    FT -->|"align the assistant"| REC
`;
const LLM_TRAINING = `
flowchart LR
    A["Prompt engineering<br/>and RAG grounding"] --> B["Real conversations<br/>with real users"]
    B --> C["Nutritionist reviews<br/>and corrects the answers"]
    C -->|"good vs bad pairs"| D["Supervised fine-tuning"]
    C -->|"ranked preferences"| E["Direct preference optimisation"]
    D --> F["An assistant that<br/>actually sounds qualified"]
    E --> F
    F -->|"distil"| G["A smaller, cheaper<br/>model to serve at scale"]
    F --> B
`;
const FULL_ARCHITECTURE = `
flowchart TD
    subgraph Inputs
      U["User profile:<br/>goals, restrictions,<br/>medications"]
      W["Wearables and outcomes:<br/>activity, weight, glucose"]
    end

    U --> TE["Target engine:<br/>formula to learned to controller"]
    W --> TE
    TE -->|"nutrient targets"| CG

    subgraph Recommendation
      CG["Candidate generation:<br/>two-tower retrieval"] --> CF["Constraint filter:<br/>hard exclusions"]
      CF --> PO["Portion optimiser:<br/>LP and MIP"]
      SEQ["Sequence model:<br/>transformer"] --> RK
      GNN["Graph model"] --> RK
      PO --> RK["Ranker:<br/>trees to deep multi-task"]
      RK --> BAN["Exploration:<br/>Thompson sampling"]
    end

    BAN --> PLAN["The week's plan"] --> KIT["Kitchen and delivery"]
    KIT --> EAT(["The eater"])

    EAT -->|"ratings, swaps"| RK
    EAT -->|"outcomes"| TE
    EAT <-->|"chat"| LLM["LLM assistant:<br/>RAG and function calling"]
    LLM -->|"profile writes"| U
    RD[["Nutritionist"]] -.->|"gates medical changes"| CF
    RD -.->|"corrections become training data"| LLM
`;

export const metadata: Metadata = {
  title: postDocumentTitle(post),
  description: post.description,
  keywords: [
    ...post.tags,
    'nutrition recommender',
    'meal planning AI',
    'constrained optimisation',
    'mixed-integer programming',
    'personalised nutrition',
    'LLM safety',
    'contextual bandit',
    'RAG',
    'direct preference optimisation',
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

export default function TheNutritionistInTheMachinePostPage() {
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
            <BlogDropcap word='There' /> exists a particular species of product
            demonstration, beloved of pitch decks and doomed start-ups in roughly
            equal measure, in which one feeds a user&apos;s medical history to a
            large language model, requests a week of meals, and receives back
            something that has every outward appearance of expertise. It is a
            magnificent illusion. It is also, on occasion, a scenic route to the
            nephrology ward.
          </p>

          <p>
            I say this with feeling, because the first version of our own
            recommender did something adjacent to it, and I would like to spend
            the next several thousand words explaining what was wrong, what we
            are building instead, and why the interesting parts of this problem
            are precisely the parts that nobody puts on a slide.
          </p>

          <p>
            The product, so that we are all standing in the same place: a
            nutritionist that does not merely lecture you about what to eat, but
            plans it, portions it, sources it, and delivers it to your door,
            every day, adjusting as your life adjusts. One platform, many
            masters. The powerlifter mid-bulk, the gentleman managing his
            prediabetes, the woman who declared herself vegan on Tuesday and
            expects the system to have noticed by Wednesday, the harried soul who
            simply wishes to stop inhaling crisps at nine in the evening. Same
            machine, different constraints. The promise is a single sentence. The
            engineering is the rest of this essay.
          </p>

          <h2>First, a confession about the current implementation</h2>

          <p>
            Let me be candid, since candour is a good deal cheaper than
            litigation: the recommender, as it presently stands, is bad. Not
            catastrophically, not negligently, but bad in the quiet, respectable
            way that a great many production systems are bad, which is to say it
            does something reasonable-looking and stops thinking.
          </p>

          <p>
            It chooses your macronutrients rather in the manner of a horoscope
            choosing your fortune. It consults a formula devised for the average
            man of some decades ago, applies an activity multiplier plucked from
            a dropdown menu, splits the result into protein, carbohydrate and fat
            by a rule of thumb, and presents the outcome with the unearned
            confidence of a fortune-teller who has never once had to reconcile a
            prediction against reality. And then, for the actual meals, it leans
            far too heavily on a language model to assemble the plate, which is
            the computational equivalent of asking a very well-read parrot to do
            your accounts.
          </p>

          <p>
            The trouble is not that any single piece is indefensible. The trouble
            is that the whole thing treats a hard problem as though it were an
            easy one. Choosing what a specific human being should eat, given
            their goals and their ailments and their appetites and their
            tediously specific dislikes, is not a text-generation problem. Nor
            is it a single prediction problem. It is at least three problems in a
            trench coat, and they want three different tools.
          </p>

          <h2>Choosing the macros: the part everyone skips</h2>

          <p>
            Before a single ingredient is selected, something has to decide what
            the meal is even trying to achieve. How many calories. How much
            protein, and how it is spread across the day. How much sodium a
            hypertensive user may have before we do him a mischief. How much
            potassium and phosphorus a stage-four kidney patient can tolerate
            before the meal becomes, in the most literal sense, hazardous. How
            large the portions should be for someone whose GLP-1 medication has
            quietly reduced their appetite to that of a small bird.
          </p>

          <p>
            The naive approach, the one we shipped, is a static formula: estimate
            basal metabolic rate, multiply by an activity guess, subtract a
            deficit for weight loss or add a surplus for muscle gain, apply a
            macro split, and be done. This is fine as a starting hypothesis and
            disastrous as a permanent belief, because it assumes the formula was
            right about you in the first place, and formulas are right about
            populations, not people. Two men of identical height, weight and age
            can have genuinely different energy expenditures, and the formula,
            serenely, does not care.
          </p>

          <p>
            The better approach treats target-setting as a small but real
            modelling problem in its own right, with three ideas stacked on top
            of one another.
          </p>

          <p>
            The first idea is a sensible baseline. Established equations for
            basal metabolic rate, activity multipliers informed by actual
            wearable data rather than a self-reported guess (people, it turns
            out, are magnificent liars about how much they exercise), and
            goal-driven adjustments grounded in the literature: something in the
            region of 1.6 to 2.2 grams of protein per kilogram for hypertrophy, a
            restriction toward 0.6 to 0.8 for compromised kidneys, sodium
            ceilings for the cardiovascular set, carbohydrate distribution for
            glycaemic control. This gives us a defensible first prescription.
          </p>

          <p>
            The second idea, and the one that separates a nutrition product from
            a spreadsheet, is that the targets adapt to observed reality. This is
            a closed-loop control problem, not a one-time calculation. We predict
            that a given calorie target will produce a given rate of weight
            change; we then watch what actually happens; and we correct. If the
            deficit we prescribed is producing no movement on the scale over a
            fortnight, the deficit was wrong, or the intake estimate was, and the
            target engine adjusts accordingly, taking care to filter out the
            daily theatre of water weight and other noise rather than lurching
            about in response to it. Certain fitness applications already do a
            version of this, and do it well; the principle is that a target you
            never revise is a target you have simply decided to be wrong about
            slowly.
          </p>

          <p>
            The third idea is that the hard medical bounds are not suggestions.
            Whatever the model prefers, whatever the user requests, the potassium
            ceiling for the renal patient is a wall, not a nudge. This is the
            recurring theme of the entire architecture, so I shall repeat it
            until you are sick of it: the things that can hospitalise a person
            are enforced as guarantees, never as probabilities.
          </p>

          <p>
            Here is roughly how the various inputs translate into the numbers,
            before a recipe is ever considered:
          </p>

          <div
            className='blog-table-wrap'
            role='region'
            aria-label='How user inputs shape nutritional targets'
          >
            <table>
              <thead>
                <tr>
                  <th scope='col'>What the user brings</th>
                  <th scope='col'>What it does to the targets</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Goal (cut, bulk, recomposition, glycaemic control, renal)
                  </td>
                  <td>
                    Sets the calorie delta and the macro emphasis; a protein
                    floor for muscle, a deficit for fat loss, a carbohydrate
                    ceiling for glucose
                  </td>
                </tr>
                <tr>
                  <td>
                    Dietary restriction (vegan, kosher, halal, and the rest)
                  </td>
                  <td>
                    Reshapes which ingredients can supply those macros, which is
                    a supply-side matter as much as a nutritional one
                  </td>
                </tr>
                <tr>
                  <td>Medical conditions and medications</td>
                  <td>
                    Impose hard upper and lower bounds; encode drug and nutrient
                    collisions such as warfarin against vitamin K, or ACE
                    inhibitors against potassium
                  </td>
                </tr>
                <tr>
                  <td>Quantity and appetite</td>
                  <td>
                    Governs portion size and meal frequency; a suppressed
                    appetite means smaller, denser, more frequent plates rather
                    than three intimidating ones
                  </td>
                </tr>
                <tr>
                  <td>Wearables and track record</td>
                  <td>
                    Personalise the expenditure estimate and, over time, the
                    adaptive correction
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Only once the machine knows what it is aiming for does the question
            of actual food arise. Which brings us to the plate.
          </p>

          <h2>Composing the plate, and the tyranny of doing it at scale</h2>

          <p>
            Given a set of nutritional targets and a wall of hard constraints,
            the task is to assemble real meals from real ingredients that hit the
            numbers, respect every restriction, and, ideally, taste of something.
            This is where the constrained optimiser lives, and it is the beating
            heart of the system, the language model&apos;s protestations
            notwithstanding.
          </p>

          <p>
            There are, pleasingly, two nested problems here. The first is
            selection: choosing which dishes or components go on the plate such
            that their totals land within the target bands. This has the flavour
            of a constrained knapsack, and it is naturally expressed as a
            mixed-integer program. The second, more delicate, is portioning:
            given a chosen set of ingredients, scaling their quantities so that
            the macros come out precisely right. This is a continuous
            optimisation, a tidy little linear program over ingredient amounts
            subject to nutritional equalities and inequalities, and it is
            precisely where the notion of quantity earns its place. The optimiser
            is not choosing a vague &ldquo;chicken and rice&rdquo;; it is
            deciding on one hundred and seventy grams of the former and ninety of
            the latter because that is what closes the gap to your protein floor
            without breaching your calorie ceiling.
          </p>

          <p>
            The virtue of an optimiser over a predictive model, here, is not
            intelligence. It is that a constraint you instruct it to satisfy is
            satisfied, provably, every single time. No shellfish means no
            shellfish, with the finality of arithmetic. A language model, by
            contrast, will inform you with the untroubled serenity of a man who
            has never been held accountable because he has never been wrong that
            this dish contains no shellfish, and it will be mistaken, and you
            will discover this at the hospital.
          </p>

          <p>
            The genuinely hard part is not writing the optimiser. It is running
            it for millions of people without the whole apparatus grinding to a
            halt. You do not, at Uber Eats scale, solve an enormous integer
            program from scratch for every user on every request; that way lies
            bankruptcy and a very warm data centre. The industry solved this
            shape of problem long ago, and the answer is a funnel. First, cheap
            and fast candidate generation narrows a vast catalogue down to a
            plausible few hundred. Then constraint filtering removes anything
            that violates a hard rule. Then the comparatively expensive optimiser
            does its precise portioning work on the shortlist rather than the
            universe. Then ranking decides the final order. Two stages, sometimes
            three: retrieve broadly and cheaply, then reason narrowly and
            expensively. It is the same architecture that serves you videos and
            shopping and, apparently, potential spouses, repurposed for the
            humbler business of dinner.
          </p>

          <MermaidDiagram
            chart={RECOMMENDATION_FLOW}
            aria-label='Nutrition recommendation funnel from user state to kitchen delivery'
          />

          <p>
            Read that from the top, because that is the order in which decisions
            are made, and note where the nutritionist stands: guarding the door
            to anything with medical consequences, which is the one place a human
            being is not optional.
          </p>

          <BlogRelatedAd slug={SLUG} />

          <h2>At scale, the neural networks stop being a luxury</h2>

          <p>
            I was previously rather dismissive about neural networks, on the
            grounds that a young system without data has no business reaching for
            a hungry model it cannot feed. That advice holds on day one and
            expires shortly thereafter. Once you are operating at anything
            resembling serious scale, the neural networks stop being an
            indulgence and start being the obvious answer, and it would be a
            peculiar sort of stubbornness to pretend otherwise.
          </p>

          <p>
            Consider what &ldquo;will this person like this meal&rdquo; actually
            requires. Gradient-boosted trees, the honest workhorses of tabular
            prediction, will get you a very long way on features you can name:
            cuisine affinity, past ratings, the meals that got swapped out in a
            huff, the time of day, the day of the week. They are cheap, they are
            fast, they are interpretable, and for the first stretch of a
            company&apos;s life they are frankly the correct choice. But taste is
            not merely tabular. It is relational and it is temporal, and those
            are exactly the properties that deep learning was invented to
            exploit.
          </p>

          <p>
            Relational, because dishes and ingredients and users form a great
            sprawling graph, and a graph neural network can learn that a person
            who adores one thing will probably tolerate its neighbours in
            flavour-space, even ones they have never tried. Temporal, because
            appetite has a memory: serve someone grilled chicken for five
            consecutive evenings and their enthusiasm will decline in a manner no
            static model anticipates, whereas a sequence model, a transformer
            over their eating history in the mould of the sequential recommenders
            that now underpin most large platforms, captures satiety and variety
            and the slow drift of preference as a matter of course. And
            representationally, embeddings let you retrieve candidates by learned
            similarity at a speed that brute-force filtering could never touch,
            which is what makes the funnel&apos;s first stage viable at all.
          </p>

          <p>
            The most elegant part is that you need not train a separate model for
            each thing you wish to predict. A single deep architecture with a
            shared trunk and several heads, the multi-task arrangement that the
            large recommendation systems have converged upon, can predict at once
            whether a meal will be rated well, whether it will be reordered,
            whether it will be finished rather than binned, and even its likely
            effect on the user&apos;s glucose. The tasks share what they have in
            common and specialise where they differ, and the whole is a good deal
            more sample-efficient than a drawer full of single-purpose models.
          </p>

          <p>
            There is a subtler point, and it is the one that most distinguishes a
            nutrition recommender from a system that suggests you another video.
            If you only ever recommend what the model is confident a person will
            enjoy, you will never learn what else they might enjoy, and you will
            never introduce the variety that a decent diet requires. So you must
            explore deliberately, and the tool for exploring without wrecking the
            experience is a contextual bandit, Thompson sampling and its
            relatives, which balances showing people what you know they like
            against occasionally taking a considered gamble. It is also,
            incidentally, how you handle a brand-new user about whom you know
            nothing, and how you keep the menu from calcifying into the same
            joyless rotation of six meals. Exploration is not a nicety here. It
            is a nutritional obligation dressed as a statistics technique.
          </p>

          <h2>
            The feedback loop, or how the system learns you are not, in fact,
            average
          </h2>

          <p>
            Here is the omission I am least proud of, and the one my more
            attentive readers rightly seized upon: none of the above matters
            unless the thing learns from what happens next. A recommender that
            never updates is merely an opinion with a database. The entire value
            of the apparatus is that every meal produces evidence, and the
            evidence flows back and makes the next meal cleverer.
          </p>

          <p>
            The signals arrive from several directions and at several speeds, and
            the discipline lies in routing each to the place it belongs rather
            than dumping them all into one indiscriminate heap.
          </p>

          <p>
            There are the taste signals, immediate and plentiful: the ratings,
            the thumbs, the meals swapped out in irritation, the ones finished
            versus the ones that came back in the box untouched. These are the
            raw material of the preference ranker, and they update it
            continuously, or near enough.
          </p>

          <p>
            There are the constraint changes, which arrive most often not through
            a settings page but through conversation. Someone mentions, in
            passing, that they have gone vegan, or that shellfish has lately
            begun to disagree with them, or that they started semaglutide last
            week. These are not chit-chat; they are amendments to the
            user&apos;s profile, and they must be written back into it and made
            to re-trigger the whole optimisation, with the important caveat that
            a medical or medication change routes through a human nutritionist
            before it is permitted to alter what actually turns up at the door.
          </p>

          <p>
            There are the outcome signals, slower but far more truthful than any
            rating: the trajectory of weight, the glucose response where a
            monitor is worn, the plain adherence data of whether the person is
            eating the plan at all. This is the ground truth of whether the whole
            endeavour is working, and it closes the loop not on taste but on the
            target engine, feeding the adaptive control I described earlier. A
            plan that people love and that produces no results is a failure,
            however many stars it collects.
          </p>

          <p>
            And then there are the expert corrections, which are gold, because
            they are the rarest and most valuable label of all. When a
            nutritionist reviews a plan and edits it, or overrides a
            recommendation, or rewrites a chatbot&apos;s answer, that correction
            is a labelled example of expertise, and it deserves to be treasured
            accordingly. It fixes the immediate case; it feeds the ranker; and,
            as we shall see in a moment, it becomes the raw material for teaching
            the language model to be less of an amateur.
          </p>

          <MermaidDiagram
            chart={FEEDBACK_LOOP}
            aria-label='Feedback signals from eater and nutritionist into ranker, targets, and LLM training'
          />

          <p>
            Now, a warning, because feedback loops are not an unalloyed good and
            anyone who tells you otherwise has not run one. A recommender that
            optimises purely for what you will happily eat will, with the grim
            inevitability of gravity, discover that you will happily eat chips.
            Every day. Forever. This is a triumph of engagement and a catastrophe
            of nutrition, and it is precisely the trap into which
            content-recommendation systems fall before congratulating themselves
            on their click-through rates. The feedback loop, left to its own
            devices, produces a filter bubble; the filter bubble, in a nutrition
            product, produces a diet of monotonous comfort food that is very
            often exactly what got the person into difficulty in the first place.
          </p>

          <p>
            The defence is threefold. You optimise for the correct objective,
            which is health outcome and adherence together rather than mere
            enjoyment, because a system that maximises what people will eat has
            simply automated the problem it was hired to solve. You impose
            diversity as a constraint, not a hope, so that variety is enforced
            rather than left to chance. And you keep exploring, so the
            model&apos;s picture of a person is continually refreshed rather than
            ossifying into a caricature assembled from their weakest moments. The
            reward function is the soul of the machine, and if you point it at
            the wrong quantity you will get a system that is superbly optimised
            for making everyone slightly worse.
          </p>

          <h2>
            Teaching the chatbot to sound like it went to school for this
          </h2>

          <p>
            The language model, throughout all of this, has a job, and it is
            emphatically not to decide what is safe to eat. Its job is to be the
            part of the system that listens and speaks: to conduct the intake, to
            answer the questions, to explain why the plan is what it is, to coach
            and cajole and occasionally console. The whole difference between a
            chatbot and an actual nutritionist is that a nutritionist listens,
            remembers, and adjusts, and so the model must be wired into the
            machine rather than bolted on beside it as a decorative oracle.
          </p>

          <p>
            For now, and I want to be honest about the &ldquo;for now,&rdquo;
            this is achieved with prompt engineering and grounding, which is a
            respectable place to start and a foolish place to stop. The model
            reads the user&apos;s assembled context, their profile and
            constraints and recent meals and the drift of their wearables, so
            that when asked why this week is so aggressively poultry-based it can
            answer from what it already knows rather than inventing something
            plausible. It answers nutritional questions not from the swirling
            contents of its own training but from a curated, retrievable body of
            evidence: clinical guidelines, the established dietary frameworks,
            our own food and nutrient data, with citations, and when the
            grounding does not cover the question the correct answer is &ldquo;I
            do not know, let me fetch a human,&rdquo; rather than a confident
            fabrication delivered in an authoritative tone. And it stays in its
            lane, refusing to diagnose, declining to overrule a safety
            constraint, escalating anything clinical to a person who is qualified
            to own it.
          </p>

          <p>
            But prompt engineering has a ceiling, and the way through it is
            fine-tuning, driven by exactly the human interactions and expert
            corrections the feedback loop is already collecting. This is where
            the nutritionists&apos; edits stop being mere fixes and start being a
            training set. When a nutritionist rewrites a poor answer into a good
            one, you have a pair: the flawed response and the corrected one,
            which is precisely the raw material of supervised fine-tuning. When
            nutritionists rank competing responses, or when the accumulated
            thumbs tell you which answers people trusted, you have preferences,
            which you can distil into an aligned model through direct preference
            optimisation, the pragmatic and considerably less temperamental
            cousin of full reinforcement learning from human feedback. And once
            you know what good looks like, you can distil a large, expensive
            model&apos;s behaviour into a smaller, cheaper one that you can
            actually afford to serve at scale, which is a happy convergence of
            alignment and economics.
          </p>

          <MermaidDiagram
            chart={LLM_TRAINING}
            aria-label='Path from prompt engineering to supervised fine-tuning and preference optimisation'
          />

          <p>
            Two things about this deserve emphasis, lest anyone get carried away.
            The first is that a fine-tuned model is still not permitted to own a
            safety decision; all the training in the world improves how it
            converses and how reliably it extracts a constraint change from a
            rambling message, but the allergen wall and the potassium ceiling
            remain the optimiser&apos;s inviolable business. The second is that
            none of this fine-tuning is worth attempting until you have volume,
            because you cannot align a model on a handful of anecdotes, and
            pretending otherwise merely overfits to the opinions of whichever
            three nutritionists you happened to have on staff in the first month.
          </p>

          <p>
            Which is why the evaluation apparatus matters as much as the models,
            and why it, too, leans on the humans. The scalable backbone is a
            strong model acting as judge, scoring every response for whether it
            is grounded, whether it is safe, whether it stayed in scope, whether
            it was actually useful, whether the numbers are right. But an
            automated judge has its own well-catalogued vices, a fondness for
            verbosity, a sensitivity to ordering, a tendency to wander from human
            judgement, and so the nutritionists design the rubric in the first
            place, defining what &ldquo;clinically acceptable&rdquo; even means
            for a renal answer as against a bulking one; they label the reference
            set against which the judge is calibrated, so we know how faithfully
            the judge tracks real expertise before we trust it at volume; and for
            anything touching medication or allergens or a diagnosis, they audit
            the live output continuously. Humans define how we grade and patrol
            the dangerous tail; the model does the tireless middle. The
            nutritionist in the loop is not a stopgap awaiting a cleverer model.
            She is the reason anyone should trust the cleverer model at all.
          </p>

          <h2>The architecture, concretely</h2>

          <p>
            Enough narrative. For the reader who would like the whole contraption
            on a single page, with the actual techniques named and the
            hand-waving held to a decent minimum, here it is, component by
            component.
          </p>

          <div
            className='blog-table-wrap'
            role='region'
            aria-label='Concrete architecture components for a nutrition recommender'
          >
            <table>
              <thead>
                <tr>
                  <th scope='col'>Component</th>
                  <th scope='col'>What it actually is</th>
                  <th scope='col'>What trains or drives it</th>
                  <th scope='col'>Why this, and not something cleverer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Target engine</strong>
                  </td>
                  <td>
                    A formula baseline (basal metabolic rate plus an activity
                    term), graduating to a learned regressor and then a
                    closed-loop controller that revises the numbers against
                    measured weight and glucose
                  </td>
                  <td>
                    Outcome data: the weight trajectory, the glucose response,
                    the plain fact of adherence
                  </td>
                  <td>
                    A static equation is a confident guess; a controller corrects
                    itself. The medical bounds sit on top as hard clips, whatever
                    the model prefers
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Candidate generation</strong>
                  </td>
                  <td>
                    A two-tower retrieval model, the user tower matched against
                    the dish tower, with an approximate-nearest-neighbour index
                    over learned dish embeddings
                  </td>
                  <td>
                    Interaction history, trained with a retrieval objective
                  </td>
                  <td>
                    You cannot run a fresh optimisation over the entire catalogue
                    for every user on every request without setting fire to the
                    budget; you retrieve a few hundred candidates cheaply, then
                    reason over those
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Constraint filter</strong>
                  </td>
                  <td>
                    A deterministic rule engine over hard exclusion sets
                  </td>
                  <td>
                    Encoded clinical and dietary rules, emphatically not learned
                  </td>
                  <td>
                    Allergens and drug interactions are guarantees, not
                    predictions. A rule that must hold is not a job you hand to a
                    probabilistic model and hope
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Portion optimiser</strong>
                  </td>
                  <td>
                    A linear or mixed-integer program over ingredient quantities
                    (OR-Tools, HiGHS)
                  </td>
                  <td>
                    Nutrient targets expressed as constraints; an objective that
                    trades macro error against cost and variety
                  </td>
                  <td>
                    This is where quantity is settled to the gram. Optimisation
                    gives provable satisfaction of the targets; a model gives a
                    plausible-looking approximation
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Ranker</strong>
                  </td>
                  <td>
                    Gradient-boosted trees first (LightGBM), then a deep ranker
                    with several heads (predicted rating, reorder, completion,
                    glucose response), the tasks balanced by a
                    mixture-of-experts
                  </td>
                  <td>
                    Explicit and implicit feedback, retrained on a schedule with
                    fresh online features
                  </td>
                  <td>
                    Trees are the honest first tool on tabular data; the deep
                    multi-task model earns its keep only once the data is
                    genuinely large
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Sequence model</strong>
                  </td>
                  <td>
                    A self-attentive transformer over the eating history, in the
                    SASRec and BERT4Rec lineage
                  </td>
                  <td>
                    The ordered record of what was eaten, finished, and quietly
                    abandoned
                  </td>
                  <td>
                    It captures satiety and the slow drift of taste that no
                    static model sees, and it is what spares the user five
                    consecutive evenings of chicken
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Graph model</strong>
                  </td>
                  <td>
                    A graph neural network over the user, dish and ingredient
                    graph
                  </td>
                  <td>
                    The relational structure of who ate what, and what shares
                    ingredients with what
                  </td>
                  <td>
                    It generalises preference to dishes a person has never tried,
                    and it rescues the cold-start case
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Exploration</strong>
                  </td>
                  <td>
                    A contextual bandit, Thompson sampling and its relatives,
                    sitting above the ranker
                  </td>
                  <td>
                    Reward drawn from downstream engagement and, more to the
                    point, adherence
                  </td>
                  <td>
                    Pure exploitation collapses into monotony; deliberate
                    exploration is, in a nutrition product, an obligation wearing
                    the costume of a statistics technique
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Conversational layer</strong>
                  </td>
                  <td>
                    A large language model with retrieval-augmented generation
                    over a curated knowledge base and a drug-interaction rule
                    set, function-calling to write profile changes back, behind a
                    guardrail classifier
                  </td>
                  <td>
                    Prompt engineering and grounding now; supervised fine-tuning
                    on nutritionist corrections and preference tuning later
                  </td>
                  <td>
                    The only tool fit for open language, and the only one that
                    fabricates, so it advises, explains and converses but is
                    never permitted to guard safety
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Evaluation</strong>
                  </td>
                  <td>
                    A language model acting as judge, scored against a
                    human-calibrated rubric, with continuous human audit of the
                    dangerous tail
                  </td>
                  <td>
                    Nutritionist-authored rubrics and labelled reference sets
                  </td>
                  <td>
                    Automated judging scales to volumes no human could review;
                    human calibration is what keeps it honest about precisely the
                    cases that can hurt someone
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            And the whole apparatus, wired together, so you can see how the
            pieces actually talk to one another:
          </p>

          <MermaidDiagram
            chart={FULL_ARCHITECTURE}
            aria-label='End-to-end nutrition recommender architecture with feedback loops'
          />

          <h2>Where one begins</h2>

          <p>
            None of this arrives fully formed, and it would be dishonest to imply
            it should. The first honest version is the optimiser over a curated
            catalogue, a modest gradient-boosted ranker, and a nutritionist
            signing off on anything with medical stakes, with the language model
            kept a respectful distance from the safety-critical path. The neural
            networks and the sequence models and the graph embeddings arrive when
            the data has grown large enough to justify their appetites. The
            fine-tuning arrives when the conversations and corrections have
            accumulated into something worth learning from. And the whole thing
            compounds, because every reorder sharpens the ranker, every corrected
            plan enriches the rules, and the localised map of real cuisines to
            real nutrition, painstaking and unglamorous and tied to dishes you
            can genuinely produce, is exactly the sort of asset that is miserable
            to build and therefore rather difficult to steal. The models, in the
            end, are mostly a commodity. The proprietary preference data, the
            localised nutrition graph, and the accumulated trust of a profession
            are not.
          </p>

          <h2>Conclusion</h2>

          <p>
            If a single thesis has survived all this verbiage, let it be this: do
            not ask one model to be the entire nutritionist. The problem only
            looks like a text-generation task from a comfortable distance; up
            close it is at least four problems with entirely different
            temperaments, and the whole art is in giving each one the tool it
            deserves. Let constrained optimisation guarantee the things that must
            never go wrong, the allergens and the drugs and the potassium
            ceilings, because those are matters of arithmetic and not of vibes.
            Let gradient-boosted trees, and then the neural networks once the
            data has earned them, learn what a particular human will actually eat
            and reorder. Let the language model do the talking it is genuinely
            good at, grounded and fenced and made steadily less amateurish by the
            corrections of real nutritionists rather than by wishful prompting.
            And keep a qualified human standing at the one door where being wrong
            is not an available option.
          </p>

          <p>
            The feedback loop is what turns this from a clever prototype into a
            system that compounds, and it is simultaneously the thing most likely
            to ruin you quietly, because a recommender pointed at the wrong
            objective will lovingly optimise your users into a contented,
            monotonous decline. Point it at outcomes, enforce variety, keep
            exploring, and it becomes a genuine asset that is thoroughly
            miserable for anyone else to reproduce. That misery, incidentally, is
            the moat: the models are a commodity, but the localised map of real
            food to real nutrition, the accumulated preference data, and the
            trust of a licensed profession are not.
          </p>

          <p>
            Begin small. The optimiser, a modest ranker, and a nutritionist with
            a veto. Let the data pull in the heavier machinery as it arrives,
            rather than importing a graph transformer to serve four hundred users
            and calling it sophistication. The alternative, the single confident
            model that plans, portions and reassures all by itself, will feel
            like progress right up until the telephone rings from the hospital.
            Build the boring, layered, auditable thing instead. Your users, and
            their kidneys, will thank you for it.
          </p>

          <h2>References</h2>

          <p>
            The load-bearing empirical and technical claims above, with the
            canonical machine-learning papers included for anyone who wants the
            primary sources rather than my paraphrase of them. Page ranges use
            plain hyphens by preference.
          </p>

          <h3>
            Large language models and the safety of AI-generated nutrition
          </h3>
          <ul className='blog-prose__refs'>
            <li>
              &ldquo;From bytes to bites: application of large language models to
              enhance nutritional recommendations.&rdquo;{' '}
              <em>Clinical Kidney Journal</em> 18(4), sfaf082 (2025). The
              ChatGPT-4 dialysis meal-plan analysis that found systematic
              underestimation of calories, protein, phosphorus, potassium and
              sodium against USDA reference values.{' '}
              <a
                href='https://doi.org/10.1093/ckj/sfaf082'
                target='_blank'
                rel='noopener noreferrer'
              >
                https://doi.org/10.1093/ckj/sfaf082
              </a>
            </li>
            <li>
              &ldquo;Assessment of large language model chatbots for hemodialysis
              meal planning: a descriptive study.&rdquo;{' '}
              <em>BMC Nephrology</em> (2026). Every model tested underestimated
              the potassium and phosphorus content of its own meal plans, a
              direct route to hyperkalaemia and hyperphosphataemia.{' '}
              <a
                href='https://doi.org/10.1186/s12882-026-04936-8'
                target='_blank'
                rel='noopener noreferrer'
              >
                https://doi.org/10.1186/s12882-026-04936-8
              </a>
            </li>
            <li>
              Kaya Kaçar, H., Kaçar, Ö. F., and Avery, A. &ldquo;Diet Quality and
              Caloric Accuracy in AI-Generated Diet Plans: A Comparative Study
              Across Chatbots.&rdquo; <em>Nutrients</em> 17(2), 206 (2025). Over
              half of one model&apos;s plans deviated from the requested calorie
              target by more than 20%.{' '}
              <a
                href='https://doi.org/10.3390/nu17020206'
                target='_blank'
                rel='noopener noreferrer'
              >
                https://doi.org/10.3390/nu17020206
              </a>
            </li>
            <li>
              Niszczota, P., and Rybicka, I. &ldquo;The credibility of dietary
              advice formulated by ChatGPT: Robo-diets for people with food
              allergies.&rdquo; <em>Nutrition</em> 112, 112076 (2023). ChatGPT
              can generate diets that include the very allergens it was
              instructed to avoid. PMID 37269717.{' '}
              <a
                href='https://doi.org/10.1016/j.nut.2023.112076'
                target='_blank'
                rel='noopener noreferrer'
              >
                DOI
              </a>
            </li>
          </ul>

          <h3>Nutrition science</h3>
          <ul className='blog-prose__refs'>
            <li>
              Jäger, R., et al. &ldquo;International Society of Sports Nutrition
              Position Stand: protein and exercise.&rdquo;{' '}
              <em>
                Journal of the International Society of Sports Nutrition
              </em>{' '}
              14, 20 (2017).{' '}
              <a
                href='https://doi.org/10.1186/s12970-017-0177-8'
                target='_blank'
                rel='noopener noreferrer'
              >
                https://doi.org/10.1186/s12970-017-0177-8
              </a>
            </li>
            <li>
              Morton, R. W., et al. &ldquo;A systematic review, meta-analysis and
              meta-regression of the effect of protein supplementation on
              resistance training-induced gains in muscle mass and strength in
              healthy adults.&rdquo; <em>British Journal of Sports Medicine</em>{' '}
              52(6), 376-384 (2018). Identifies roughly 1.6 g/kg/day as the point
              of diminishing returns.{' '}
              <a
                href='https://doi.org/10.1136/bjsports-2017-097608'
                target='_blank'
                rel='noopener noreferrer'
              >
                DOI
              </a>
            </li>
            <li>
              Ikizler, T. A., et al. &ldquo;KDOQI Clinical Practice Guideline for
              Nutrition in CKD: 2020 Update.&rdquo;{' '}
              <em>American Journal of Kidney Diseases</em> 76(3, Suppl. 1),
              S1-S107 (2020). Source of the protein-restriction figures for
              chronic kidney disease.{' '}
              <a
                href='https://doi.org/10.1053/j.ajkd.2020.05.006'
                target='_blank'
                rel='noopener noreferrer'
              >
                DOI
              </a>
            </li>
            <li>
              Hall, K. D., et al. &ldquo;Quantification of the effect of energy
              imbalance on bodyweight.&rdquo; <em>The Lancet</em> 378(9793),
              826-837 (2011). The dynamic energy-balance model that underpins
              adaptive, self-correcting calorie targets.{' '}
              <a
                href='https://doi.org/10.1016/S0140-6736(11)60812-X'
                target='_blank'
                rel='noopener noreferrer'
              >
                DOI
              </a>
            </li>
          </ul>

          <h3>Optimisation and the diet problem</h3>
          <ul className='blog-prose__refs'>
            <li>
              Stigler, G. J. &ldquo;The Cost of Subsistence.&rdquo;{' '}
              <em>Journal of Farm Economics</em> 27(2), 303-314 (1945). The
              original least-cost-diet formulation.{' '}
              <a
                href='https://www.jstor.org/stable/1231810'
                target='_blank'
                rel='noopener noreferrer'
              >
                JSTOR
              </a>
            </li>
            <li>
              Dantzig, G. B. &ldquo;The Diet Problem.&rdquo; <em>Interfaces</em>{' '}
              20(4), 43-47 (1990). How the simplex method solved Stigler&apos;s
              problem, landing within 24 cents a year of his hand-computed
              answer.{' '}
              <a
                href='https://doi.org/10.1287/inte.20.4.43'
                target='_blank'
                rel='noopener noreferrer'
              >
                DOI
              </a>
            </li>
          </ul>

          <h3>Recommender systems and deep learning at scale</h3>
          <ul className='blog-prose__refs'>
            <li>
              Covington, P., Adams, J., and Sargin, E. &ldquo;Deep Neural
              Networks for YouTube Recommendations.&rdquo; <em>RecSys</em>{' '}
              (2016). The canonical two-stage candidate-generation-then-ranking
              architecture.{' '}
              <a
                href='https://dl.acm.org/doi/10.1145/2959100.2959190'
                target='_blank'
                rel='noopener noreferrer'
              >
                ACM
              </a>
            </li>
            <li>
              Cheng, H.-T., et al. &ldquo;Wide &amp; Deep Learning for
              Recommender Systems.&rdquo; <em>DLRS at RecSys</em> (2016).{' '}
              <a
                href='https://arxiv.org/abs/1606.07792'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:1606.07792
              </a>
            </li>
            <li>
              Naumov, M., et al. &ldquo;Deep Learning Recommendation Model for
              Personalization and Recommendation Systems&rdquo; (DLRM).{' '}
              <a
                href='https://arxiv.org/abs/1906.00091'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:1906.00091
              </a>{' '}
              (2019).
            </li>
            <li>
              Kang, W.-C., and McAuley, J. &ldquo;Self-Attentive Sequential
              Recommendation&rdquo; (SASRec). <em>ICDM</em> (2018).{' '}
              <a
                href='https://arxiv.org/abs/1808.09781'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:1808.09781
              </a>
            </li>
            <li>
              Sun, F., et al. &ldquo;BERT4Rec: Sequential Recommendation with
              Bidirectional Encoder Representations from Transformer.&rdquo;{' '}
              <em>CIKM</em> (2019).{' '}
              <a
                href='https://arxiv.org/abs/1904.05349'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:1904.05349
              </a>
            </li>
            <li>
              Ma, J., et al. &ldquo;Modeling Task Relationships in Multi-task
              Learning with Multi-gate Mixture-of-Experts&rdquo; (MMoE).{' '}
              <em>KDD</em> (2018).{' '}
              <a
                href='https://dl.acm.org/doi/10.1145/3219819.3220007'
                target='_blank'
                rel='noopener noreferrer'
              >
                ACM
              </a>
            </li>
            <li>
              Li, L., Chu, W., Langford, J., and Schapire, R. E. &ldquo;A
              Contextual-Bandit Approach to Personalized News Article
              Recommendation&rdquo; (LinUCB). <em>WWW</em> (2010).{' '}
              <a
                href='https://arxiv.org/abs/1003.0146'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:1003.0146
              </a>
            </li>
            <li>
              Jiang, R., Chiappa, S., Lattimore, T., György, A., and Kohli, P.
              &ldquo;Degenerate Feedback Loops in Recommender Systems.&rdquo;{' '}
              <em>AAAI/ACM AIES</em> (2019).{' '}
              <a
                href='https://arxiv.org/abs/1902.10730'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:1902.10730
              </a>
              .
            </li>
            <li>
              Mansoury, M., et al. &ldquo;Feedback Loop and Bias Amplification in
              Recommender Systems.&rdquo; <em>CIKM</em> (2020).{' '}
              <a
                href='https://arxiv.org/abs/2007.13019'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2007.13019
              </a>
            </li>
            <li>
              Pariser, E. <em>The Filter Bubble: What the Internet Is Hiding
              from You.</em> Penguin Press (2011).{' '}
              <a
                href='https://en.wikipedia.org/wiki/Filter_bubble'
                target='_blank'
                rel='noopener noreferrer'
              >
                overview
              </a>
            </li>
          </ul>

          <h3>LLM alignment, retrieval and evaluation</h3>
          <ul className='blog-prose__refs'>
            <li>
              Lewis, P., et al. &ldquo;Retrieval-Augmented Generation for
              Knowledge-Intensive NLP Tasks.&rdquo; <em>NeurIPS</em> (2020).{' '}
              <a
                href='https://arxiv.org/abs/2005.11401'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2005.11401
              </a>
              .
            </li>
            <li>
              Ouyang, L., et al. &ldquo;Training language models to follow
              instructions with human feedback&rdquo; (InstructGPT).{' '}
              <em>NeurIPS</em> (2022).{' '}
              <a
                href='https://arxiv.org/abs/2203.02155'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2203.02155
              </a>
              .
            </li>
            <li>
              Rafailov, R., et al. &ldquo;Direct Preference Optimization: Your
              Language Model is Secretly a Reward Model.&rdquo;{' '}
              <em>NeurIPS</em> (2023).{' '}
              <a
                href='https://arxiv.org/abs/2305.18290'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2305.18290
              </a>
              .
            </li>
            <li>
              Zheng, L., et al. &ldquo;Judging LLM-as-a-Judge with MT-Bench and
              Chatbot Arena.&rdquo; <em>NeurIPS</em> (2023).{' '}
              <a
                href='https://arxiv.org/abs/2306.05685'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2306.05685
              </a>
              . Documents judge biases including the fondness for verbosity and
              sensitivity to ordering.
            </li>
          </ul>

          <h3>On this site</h3>
          <ul className='blog-prose__refs'>
            <li>
              <Link href='/blogs/one-model-to-rule-them-all'>
                One Model to Rule Them All
              </Link>{' '}
              — start with trees before neural nets; the same instinct this
              stack is built on.
            </li>
            <li>
              <Link href='/blogs/fixing-attention'>Fixing Attention</Link>{' '}
              — another recommender with hard constraints (spaced repetition
              that refuses to optimise for watch time).
            </li>
            <li>
              <Link href='/blogs/anatomy-of-an-agentic-ai-system'>
                Anatomy of an Agentic AI System
              </Link>{' '}
              — retrieval, guardrails, and human review when the model must
              not own the safety path.
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
