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

const SLUG = 'the-tree-not-the-titan';
const post = getPostBySlug(SLUG)!;
const url = postUrl(SLUG);
const ogAbsolute = `${SITE_URL}${post.ogImage}`;
const publishedIso = `${post.date}T12:00:00.000Z`;

export const metadata: Metadata = {
  title: `${post.title} — Arvind Narayan`,
  description: post.description,
  keywords: [
    ...post.tags,
    'architect model',
    'DeepSeek-V3',
    'Mixture of Experts',
    'FrugalGPT',
    'RouteLLM',
    'multi-agent systems',
    'Bitter Lesson',
    'compound AI systems',
    'Zheng Meister',
    'Yann LeCun',
    'NVIDIA SLM',
    'Arvind Narayan',
  ],
  authors: [{ name: 'Arvind Narayan', url: SITE_URL }],
  creator: 'Arvind Narayan',
  publisher: 'Arvind Narayan',
  category: 'AI Architecture',
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
    section: 'AI Architecture',
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
    'article:section': 'AI Architecture',
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
    articleSection: 'AI Architecture',
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

export default function TheTreeNotTheTitanPostPage() {
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
            <BlogDropcap word='Your' /> senses dump roughly a billion bits per
            second into your skull. Your conscious mind can handle about ten.
            That gap — eight orders of magnitude, the largest unexplained number
            in brain science according to Zheng and Meister&apos;s 2024{' '}
            <em>Neuron</em> paper — is the cleanest picture I know of what the
            industry is building toward: a periphery that filters, and an
            architect that reviews the delta.
          </p>

          <p>
            I have spent the last year watching people argue this intuition as
            if it were settled theology. One camp says the future is a tree of
            specialists under a thin orchestrator. The other says scale and
            end-to-end learning will eat every hand-built hierarchy the way they
            ate chess engines and speech pipelines. Both sides have real
            receipts. This post is my attempt to sort which receipts are load-
            bearing, which are just good rhetoric, and where the tree intuition
            breaks.
          </p>

          <p>
            Established fact, contested claim, and opinion are labeled as I go.
            Every figure has a named source. If a senior reader finishes this
            and says &ldquo;you oversold the brain,&rdquo; I have failed the
            assignment I set myself.
          </p>

          <h2>TL;DR</h2>
          <ul>
            <li>
              <strong>
                The thesis is directionally right, for partly the wrong
                reasons.
              </strong>{' '}
              Biology, frontier MoE models, production routers, and the
              agentic-systems literature all converge on hierarchy — but the
              evidence that matters is architectural and economic (sparse
              activation, verification cheaper than generation, routing
              economics). The &ldquo;brain distributes intelligence to the
              periphery&rdquo; line is real neuroscience and a weak engineering
              argument.
            </li>
            <li>
              <strong>Your single strongest number is the compression ratio:</strong>{' '}
              ~10⁹ bits/s of sensory input versus ~10 bits/s of conscious
              throughput (Zheng &amp; Meister, <em>Neuron</em>, 2024). That
              ~10⁸× gap maps cleanly onto MoE sparse activation (DeepSeek-V3
              fires 37B of 671B parameters per token) and orchestrator-worker
              agents (Anthropic reports +90.2% quality at ~15× the tokens).
            </li>
            <li>
              <strong>
                Land on a conditional conclusion, not a manifesto.
              </strong>{' '}
              Trees of models win where tasks decompose cleanly and
              verification is cheap. Monoliths and end-to-end win where the
              problem is entangled and shared context is essential.
            </li>
          </ul>

          <h2>The billion-to-ten funnel</h2>

          <p>
            Start with the number, not the metaphor. Jieyu Zheng and Markus
            Meister, writing in <em>Neuron</em> on December 17, 2024 (DOI:
            10.1016/j.neuron.2024.11.008), put it bluntly: human sensory systems
            gather data at ~10⁹ bits/s, but &ldquo;the information throughput of
            a human being is about 10 bits/s.&rdquo; They call this the largest
            unexplained number in brain science. Their framing is an{' '}
            <strong>outer brain</strong> — high-dimensional, massively parallel,
            fast sensory/motor processing across millions of channels — and an{' '}
            <strong>inner brain</strong> operating on a dramatically reduced
            stream, filtered to the few bits that matter for behavior.
          </p>

          <p>
            That is exactly the architect/periphery split. Their supporting
            detail is just as useful: the retina produces about a million output
            signals, each the result of a local computation on the visual image,
            and retinal circuits already compress the visual signal by at least
            a factor of ten before anything reaches cortex.
          </p>

          <p>
            The canonical retinal bandwidth figure is older and still
            standing. Koch, McLean, Segev, Freed, Berry, Balasubramanian, and
            Sterling measured guinea-pig retina at ~875,000 bits/s across
            ~100,000 ganglion cells, then scaled to the human&apos;s ~1,000,000
            ganglion cells to get ~10⁷ bits/s — &ldquo;roughly the rate of an
            Ethernet connection&rdquo; (
            <em>Current Biology</em>, 2006). Lead author Kristin Koch; senior
            author Peter Sterling. The retina is not a camera. Lettvin,
            Maturana, McCulloch, and Pitts showed that in 1959 with frog &ldquo;bug
            detectors.&rdquo; Gollisch and Meister&apos;s 2010 <em>Neuron</em>{' '}
            review made the modern case. Mammalian retina communicates over at
            least thirty parallel channels — distinct retinal ganglion cell
            types — doing edge detection, direction selectivity, and motion
            detection <em>before</em> V1 (Krieger et al., 2017; Baden et al.,{' '}
            <em>Nature</em>, 2016). Photoreceptors adapt locally across roughly
            ten orders of magnitude of light intensity via response compression,
            calcium-mediated cascade modulation, and pigment bleaching (Fain et
            al., <em>Physiological Reviews</em>, 2001). No cortex required.
          </p>

          <p>
            Predictive coding is the cleanest mechanical analogy for &ldquo;the
            architect reviews the delta.&rdquo; Rao and Ballard (
            <em>Nature Neuroscience</em>, 1999): higher cortical levels send
            predictions down; lower levels send only the residual error up.
            Friston&apos;s free-energy principle generalizes that story. Local
            computation. Local plasticity. Only the surprise travels.
          </p>

          <p>
            And here is where I have to put my own favorite slogan on a leash.
            The line that &ldquo;the brain isn&apos;t impressive because it
            processes information centrally — it&apos;s impressive because it
            distributes intelligence to the periphery&rdquo; is rhetorically
            delicious. Zheng and Meister do <em>not</em> endorse it. They
            present the 10-bit throughput as an unexplained paradox: why does
            the brain need billions of neurons to process 10 bits/s? Neuroscience
            has shown that distributed local preprocessing exists and is used
            heavily. It has not proven that distributed intelligence is the
            superior engineering strategy. Planes do not flap wings. Biology was
            forced into peripheral computation by a ~20W metabolic budget, wiring
            length, signal delay, a birth-canal ceiling on skull size, and a
            billion years of path dependence. Silicon has fast buses, no
            per-spike energy tax, and arbitrary reconfigurability. Use the brain
            as a hook and an intuition pump. Do not use it as a proof.
          </p>

          <h2>Two papers, one conflation</h2>

          <p>
            I had this half-remembered as &ldquo;that paper by Meta&apos;s
            ex-AI lead about small specialists.&rdquo; It is not one paper. It
            is two different arguments wearing the same trench coat in my
            memory, and a knowledgeable reader will smell the mix-up
            immediately.
          </p>

          <p>
            <strong>Yann LeCun</strong> (ex-Chief AI Scientist, Meta) is not
            arguing for a swarm of tiny specialists. His case is that
            autoregressive LLMs are a dead end for human-level intelligence and
            that we need <em>world models</em> — JEPA / I-JEPA / V-JEPA —
            predicting in an abstract representation space rather than
            generating tokens. He announced his intention to leave Meta in
            November 2025, departed after twelve years, and launched
            Paris-based AMI Labs in early 2026 to build exactly that. His
            modularity story (configurator, actor, world-model, cost modules in
            the 2022 &ldquo;A Path Towards Autonomous Machine Intelligence&rdquo;
            paper) is about the internal modules of one agent, not a fleet of
            fine-tuned SLMs.
          </p>

          <p>
            The data-bandwidth argument people actually remember from him is the
            rhetorical estimate that a four-year-old has seen ~50× more data than
            the biggest LLMs — roughly 10¹⁵ bytes of optic-nerve traffic versus
            ~2×10¹³ bytes of LLM training tokens. Treat that as LeCun&apos;s
            rhetorical estimate, not a settled result: his per-fiber rates wobble
            across talks, and François Chollet&apos;s rebuttal (optical
            information is highly compressible in ways the comparison implies it
            isn&apos;t) is legitimate.
          </p>

          <p>
            The paper that actually maps onto a tree of specialists is{' '}
            <strong>
              NVIDIA&apos;s &ldquo;Small Language Models are the Future of
              Agentic AI&rdquo;
            </strong>{' '}
            — Belcak, Heinrich, Diao, Fu, Dong, Muralidharan, Lin, and Molchanov
            (arXiv 2506.02153, June 2025). Three pillars, verbatim: SLMs are
            &ldquo;sufficiently powerful, inherently more suitable, and
            necessarily more economical for many invocations in agentic
            systems.&rdquo; Agentic workloads, they argue, mostly perform a small
            number of specialized tasks repetitively; paying frontier prices per
            call is wasteful. Where general conversation is genuinely needed,
            they advocate heterogeneous systems mixing SLMs and LLMs, plus an
            LLM-to-SLM conversion loop: log calls, cluster tasks, fine-tune
            small specialists to replace those calls.
          </p>

          <p>
            Write it on the whiteboard:{' '}
            <em>
              LeCun wants a different single architecture. NVIDIA wants a
              cheaper tree of today&apos;s architectures. The tree idea leans on
              the second.
            </em>
          </p>

          <h2>Memory is an index, not a warehouse</h2>

          <p>
            One adjacent claim that holds up: memory looks a lot like an
            indexing graph database. The Hippocampal Memory Indexing Theory
            (Teyler &amp; DiScenna, 1986; Teyler &amp; Rudy, <em>Hippocampus</em>
            , 2007) says the hippocampus does not store content — it stores an
            index of the neocortical regions activated by an event. A partial
            cue reactivates the index; the index reactivates the distributed
            pattern. Pattern completion. Pointers over a distributed store.
            HippoRAG (Gutiérrez et al., 2024) builds long-term memory for LLMs
            explicitly on this theory. Modern Hopfield networks (Ramsauer et
            al., 2020) showed the update rule is mathematically equivalent to
            transformer attention. The bridge from neuroscience to RAG, GraphRAG,
            and GNNs is real.
          </p>

          <p>
            The claim that &ldquo;indexing slows with brain development&rdquo;
            does not hold as stated. What the literature supports is a shift
            toward schema-based encoding with expertise — new information filed
            against structured schemas rather than raw episodes (Ghosh &amp;
            Gilboa). Flag it; do not state the slowdown as fact.
          </p>

          <h2>The FOR case: architecture and economics</h2>

          <p>
            If biology is color, these numbers are the load. The strongest hard
            evidence for the tree is not a frog&apos;s retina. It is sparse
            activation, routing cascades, and orchestrator-worker agents.
          </p>

          <h3>MoE is the tree already inside the model</h3>

          <p>
            Sparse Mixture-of-Experts means only a fraction of parameters fire
            per token. DeepSeek-V3: 671B total parameters,{' '}
            <strong>37B activated per token</strong> (~5.5%). Fine-grained routed
            experts plus always-on shared experts, plus auxiliary-loss-free
            load-balancing — a learnable per-expert bias nudged when an expert
            is over- or under-loaded. Trained on 14.8T tokens for ~2.788M H800
            GPU-hours. Its predecessor DeepSeek-V2 was 236B total / 21B active.
          </p>

          <p>
            Switch Transformer (Fedus, Zoph &amp; Shazeer, 2021): up to 1.6
            trillion parameters, &ldquo;up to 7× increases in pre-training speed
            with the same computational resources&rdquo; over T5-Base/Large.
            Mixtral 8×7B (Mistral, Dec 2023): 46.7B total, 12.9B per token —
            &ldquo;processes input and generates output at the same speed and
            for the same cost as a 12.9B model.&rdquo; GShard (Lepikhin et al.,
            2020): &gt;600B parameters; the dense equivalent would have cost
            &ldquo;more than ten times to train&rdquo; while trailing in quality.
          </p>

          <p>
            Note the dual-use fact: routing collapse and load imbalance
            (Shazeer et al., 2017) are why DeepSeek needed that balancing trick
            in the first place. Routing is hard even inside one model. Cite it
            for both sides.
          </p>

          <h3>Routing and cascades pay the bills</h3>

          <p>
            FrugalGPT (Chen, Zaharia &amp; Zou, Stanford, 2023): an LLM cascade
            — cheap model first, escalate when quality thresholds fail — with{' '}
            <strong>up to 98% cost reduction</strong> while matching or beating
            GPT-4 on benchmarks like HEADLINES. Their estimate: 50–90% of naïve
            inference spend is wasteful.
          </p>

          <p>
            RouteLLM (Ong et al., LMSYS / UC Berkeley, ICLR 2025): routers
            learned from Chatbot Arena preference data. The matrix-factorization
            router hits <strong>95% of GPT-4 performance using only 14%
            strong-model calls</strong> — about 75% cost reduction versus random
            routing on MT-Bench, ~45% on MMLU, ~35% on GSM8K. The savings are
            benchmark-specific. That is itself an honest point about routing:
            difficulty skew is the whole game. Related work — Hybrid LLM,
            MixLLM, AutoMix — typically lands 40–85% savings depending on how
            skewed query difficulty is.
          </p>

          <p>
            Small models still win narrow tasks. MedGemma-4B fine-tuned beat
            zero-shot GPT-4 on medical image disease classification: 80.37% vs
            69.58% mean accuracy (arXiv 2512.23304). SLM edge economics are
            stark — Groq-served Llama has been quoted around $0.05 per million
            input tokens. Hold that thought; §5 has a counterpunch.
          </p>

          <h3>Orchestrator-worker is the flagship result</h3>

          <p>
            Anthropic&apos;s June 2025 engineering post on their multi-agent
            research system is the result everyone cites, so cite it carefully.
            Pattern: a lead agent (Claude Opus 4) plans and spawns 3–5
            subagents (Claude Sonnet 4), each with its own context window, plus
            a separate citation-checking pass. It{' '}
            <strong>
              outperformed single-agent Claude Opus 4 by 90.2%
            </strong>{' '}
            on Anthropic&apos;s internal research eval. Cost: ~15× more tokens
            than a normal chat. On BrowseComp, token usage alone explained 80%
            of performance variance; tool calls (~10%) and model choice (~5%)
            brought the explained variance to ~95%. These figures are from
            Anthropic&apos;s own blog and have not been independently
            reproduced — label them as such.
          </p>

          <p>
            Crucially, Anthropic scopes the pattern themselves: domains that
            require all agents to share the same context, or that involve many
            dependencies between agents, &ldquo;are not a good fit for
            multi-agent systems today.&rdquo; Intellectual ancestor: Marvin
            Minsky&apos;s <em>Society of Mind</em> (1986). Production
            frameworks: AutoGen, CrewAI, LangGraph supervisor, MetaGPT,
            ChatDev.
          </p>

          <p>
            The mechanistic heart of &ldquo;architect reviews the worker&rdquo;
            is verifier–generator asymmetry. Best-of-N with a reward model,
            self-consistency, process reward models — checking a candidate is
            empirically cheaper than producing it. Pattern, not theorem. Still
            the thing that makes the tree economically coherent.
          </p>

          <BlogRelatedAd slug={SLUG} />

          <h2>The AGAINST case — steelmanned, no softballs</h2>

          <p>
            If you skip this section, a senior reader will skip the rest of you.
          </p>

          <h3>The Bitter Lesson</h3>

          <p>
            Rich Sutton, 2019: &ldquo;General methods that leverage computation
            are ultimately the most effective, and by a large margin.&rdquo;
            Across chess, Go, speech, vision, and NLP, hand-crafted human
            knowledge repeatedly lost to general methods plus scale. Sutton won
            the 2024 Turing Award (announced 2025), which renews the
            argument&apos;s authority. The sharp form of the anti-thesis:{' '}
            <em>
              your carefully architected tree of specialists is exactly the kind
              of hand-crafted structure scale eventually eats.
            </em>{' '}
            Note what Sutton did <em>not</em> say: &ldquo;Scale Is All You
            Need.&rdquo; He said general methods that leverage computation win.
            MoE — learned sparse routing inside one training objective — is more
            Bitter-Lesson-compatible than a hand-built multi-agent org chart.
            Hold that distinction; it matters at the end.
          </p>

          <h3>Generalist eats specialist</h3>

          <p>
            The single hardest data point against the naïve tree is Nori et al.,
            &ldquo;Can Generalist Foundation Models Outcompete Special-Purpose
            Tuning? Case Study in Medicine&rdquo; (Microsoft, arXiv 2311.16452,
            2023). <strong>GPT-4 with Medprompt</strong> — general-purpose
            prompting, no medical fine-tuning — beat Google&apos;s fine-tuned
            specialist Med-PaLM 2 across all nine MultiMedQA benchmarks,
            scoring <strong>90.2% on MedQA versus Med-PaLM 2&apos;s 86.5%</strong>{' '}
            (a 27% error-rate reduction; first model over 90%). A generalist
            overtook a purpose-built specialist on the specialist&apos;s home
            turf.
          </p>

          <p>
            Counter-counterpoint, because honesty is the brand: MedGemma-4B
            fine-tuned still beats zero-shot GPT-4 on some image tasks. The
            outcome is task- and time-dependent. Do not overgeneralize in either
            direction.
          </p>

          <h3>Multi-agent systems fail with hard numbers</h3>

          <p>
            Cemri, Pan, Yang et al. (UC Berkeley), &ldquo;Why Do Multi-Agent LLM
            Systems Fail?&rdquo; (arXiv 2503.13657; NeurIPS 2025). They built
            MAST — Multi-Agent System Failure Taxonomy — from 1,600+ annotated
            traces across seven popular MAS frameworks (taxonomy derived from
            200+ traces; inter-annotator κ = 0.88). Result:{' '}
            <strong>14 failure modes in three categories</strong> — System
            Design / specification issues 41.77%, Inter-Agent Misalignment
            36.94%, Task Verification 21.30%. Their blunt headline: multi-agent
            &ldquo;performance gains on popular benchmarks are often
            minimal,&rdquo; and most failures stem from system design, not model
            quality. Error compounding, context loss between agents, coordination
            overhead — systemic, not incidental.
          </p>

          <p>
            Cognition&apos;s Walden Yan, June 2025, &ldquo;Don&apos;t Build
            Multi-Agents,&rdquo; is the strongest practitioner argument against
            decomposition. Parallel subagents make implicit choices about style,
            edge cases, and code that later conflict; each receives only the
            explicit objective, not the full implicit context; &ldquo;on the
            surface it looks like collaboration; underneath it is often
            parallelized guesswork.&rdquo; The lead agent ends up cleaning up
            conflicts between partially compatible drafts. Prescription:
            single-threaded agents plus a dedicated compression LLM, with
            context engineering as &ldquo;effectively the #1 job of engineers
            building AI agents.&rdquo;
          </p>

          <p>
            Honesty note: in March 2026 Cognition shipped &ldquo;Devin can now
            Manage Devins&rdquo; — a coordinator that scopes work and assigns
            pieces to isolated managed Devins. A partial architectural
            concession that <em>some</em> decomposition works. Use the nuance;
            neither essay is gospel.
          </p>

          <h3>Routing is itself the bottleneck</h3>

          <p>
            Mis-routing, the near-impossibility of estimating task difficulty a
            priori, and the fact that the router must be as capable as the
            hardest routing decision — these are not edge cases. GPT-5 launched
            August 7, 2025 with a &ldquo;real-time router&rdquo; between a smart
            efficient model and a deeper reasoning model. OpenAI&apos;s own
            description: the router decides based on conversation type,
            complexity, tool needs, and explicit intent, continuously trained on
            real signals including model switches and preference rates. On day
            one the autoswitcher broke. Sam Altman: &ldquo;Yesterday, the
            autoswitcher broke and was out of commission for a chunk of the day,
            and the result was GPT-5 seemed way dumber.&rdquo; Critically for
            this thesis, OpenAI&apos;s stated end-goal cuts against permanent
            decomposition: &ldquo;In the near future, we plan to integrate these
            capabilities into a single model.&rdquo; The tree collapsing back
            into the trunk.
          </p>

          <h3>Maintenance burden and the end-to-end counter-trend</h3>

          <p>
            N specialists = N training pipelines, N eval suites, N drift
            problems, N versioning headaches. The SLM and agent papers
            systematically underweight this. Practitioners do not.
          </p>

          <p>
            And then there is the trend the tree camp most needs to answer:
            end-to-end learning has repeatedly killed hand-engineered pipelines.
            Speech recognition: phoneme/HMM stacks → end-to-end deep nets.
            Tesla FSD v12: city-streets stack upgraded &ldquo;to a single
            end-to-end neural network… replacing over 300k lines of explicit C++
            code&rdquo; (release notes); Musk on the Q4 2023 earnings call (Jan
            24, 2024): &ldquo;We replaced 330,000 lines of C++ code with neural
            nets.&rdquo; Tesla AI lead Ashok Elluswamy on why they abandoned
            modular: &ldquo;We used to work on an explicit, modular approach
            because it was so much easier to debug. But what we found out was
            that codifying human values was really difficult.&rdquo;
          </p>

          <p>
            Wayve&apos;s founding thesis (&ldquo;AV2.0&rdquo;) was that one large
            neural network would outperform modular robotics stacks; they adapted
            a UK-trained model to US right-side driving with ~500 hours of
            incremental data over eight weeks. The sophisticated counterweight is
            Waymo. They published EMMA (end-to-end on Gemini, Oct 2024) but do{' '}
            <em>not</em> deploy pure end-to-end. Co-CEO Dmitri Dolgov: a
            monolithic architecture &ldquo;makes it very easy to get started,
            but it&apos;s wildly inadequate to go to full autonomy safely and at
            scale.&rdquo; Waymo&apos;s December 2025 Foundation Model post
            describes a hybrid that keeps module boundaries for debuggability
            and independent validation while backpropagating end-to-end. That is
            the most mature real-world answer I have found. This post should
            adopt its spirit.
          </p>

          <p>
            One more threat to name: long context. As windows grow from 100K to
            1M+ tokens and in-context memory improves, part of the
            retrieval/specialist-decomposition rationale weakens — you can
            increasingly just put everything in one model&apos;s context. If you
            are building a RAG empire on the assumption that context will always
            be scarce, write that assumption down and date it.
          </p>

          <h2>What the industry is actually shipping</h2>

          <p>
            Strip the philosophy and look at production. The dominant pattern in
            2025–2026 is the <strong>compound AI system</strong>. Zaharia,
            Khattab, Chen, Davis, Miller, Potts, Zou, Carbin, Frankle, Rao, and
            Ghodsi (Berkeley BAIR, Feb 18, 2024): &ldquo;a system that tackles
            AI tasks using multiple interacting components, including multiple
            calls to models, retrievers, or external tools.&rdquo; Verbatim
            datapoint: Databricks colleagues found 60% of LLM applications use
            some form of RAG, and 30% use multi-step chains. Their thesis — now
            mainstream — is that leading results can be achieved through clever
            engineering, not just scaling training, and that compound systems
            &ldquo;will remain a leading paradigm even as models improve.&rdquo;
            That is the strongest institutional endorsement of the tree.
          </p>

          <p>
            Production menus make the economic case in one number. Across
            current model families there is roughly a{' '}
            <strong>
              ~100× price spread between the cheapest usable tier and the
              flagship reasoning tier
            </strong>
            . Claude tiers (Haiku / Sonnet / Opus), Gemini tiers (Flash-Lite /
            Flash / Pro), OpenAI&apos;s mini-to-reasoning ladder — exact
            per-token prices move monthly and third-party aggregators lag the
            vendor pages, so verify before you put a dollar figure in a deck.
            The <em>structural</em> pattern is robust: a steep price gradient is
            why routing exists. It is the entire economic case for the tree in
            one ratio.
          </p>

          <p>
            The counter-current is well-funded and serious. LeCun&apos;s world-
            models bet at AMI Labs and Fei-Fei Li&apos;s World Labs represent the
            view that the future is a different single architecture, not a tree
            of today&apos;s models. Do not confuse &ldquo;compound systems are
            winning in production today&rdquo; with &ldquo;compound systems are
            the final form of intelligence.&rdquo;
          </p>

          <h2>The conditional conclusion</h2>

          <p>
            Here is the position I can defend in a room with people who have
            read the papers:
          </p>

          <p>
            <strong>
              A tree of models wins when (i) tasks decompose cleanly into
              independent subtasks, (ii) verification is cheaper than
              generation, (iii) query difficulty is skewed enough that routing
              captures cheap wins, and (iv) subtasks do not need shared implicit
              context. Monoliths and end-to-end win when the problem is
              entangled, when context-sharing is essential, or when the whole
              task already fits one model&apos;s context window.
            </strong>
          </p>

          <p>
            That mirrors Waymo&apos;s hybrid and Anthropic&apos;s own scoping.
            It is a stronger, more credible position than &ldquo;the tree wins,
            full stop.&rdquo;
          </p>

          <p>
            Be explicit about which tree you mean. MoE is a <em>learned</em>{' '}
            sparse routing structure inside one model with one training
            objective — the Bitter-Lesson-compatible version of the thesis. A
            hand-built multi-agent system is <em>engineered</em> decomposition —
            the version where MAST&apos;s 14 failure modes concentrate and where
            Sutton&apos;s warning has teeth. The author&apos;s strongest ground
            is that the learned tree is winning. The hand-built tree is where
            the failure evidence lives.
          </p>

          <p>Concrete thresholds that would change the recommendation:</p>
          <ul>
            <li>
              If frontier context windows and in-context memory keep improving
              so that whole workflows fit one context at falling cost,
              decomposition&apos;s ROI shrinks — revisit RAG and specialist
              splits.
            </li>
            <li>
              If a single unified router-inside-the-model (OpenAI&apos;s stated
              GPT-5 end-goal) subsumes external multi-agent orchestration, the
              &ldquo;tree&rdquo; migrates inside the model and your external
              orchestration layer thins out.
            </li>
            <li>
              If, on your specific tasks, multi-agent failure rates (MAST-style
              evals) do not beat a single strong agent, do not decompose. The
              coordination tax is not worth it.
            </li>
          </ul>

          <p>
            The cover image is the argument in one frame: a billion sensory
            threads braid into a cord, pass through a needle, and leave one line
            on the sand — while a surreal tree of eyes and ears stands over the
            desert like an architect that never touches the raw feed. The
            picture is right. The temptation is to treat the picture as a proof.
            It isn&apos;t. The proof, such as it is, lives in sparse activation
            ratios, cascade cost curves, and the uncomfortable fact that
            verification keeps being cheaper than generation — until the day the
            problem stops decomposing and you need the titan after all.
          </p>

          <h2>Caveats</h2>
          <ul>
            <li>
              The neuroscience (retinal bandwidth ~10⁷ bits/s; ~10 bits/s
              conscious throughput; ≥30 RGC channels; ~10 orders of magnitude
              light adaptation; hippocampal indexing; predictive coding) is
              peer-reviewed and well-established. The inference that this
              vindicates AI decomposition is the author&apos;s analogy.
            </li>
            <li>
              LeCun&apos;s bandwidth numbers are internally inconsistent across
              talks; present the ~50× figure as rhetorical estimate.
            </li>
            <li>
              Specific AMI Labs seed/valuation figures circulating in secondary
              tech outlets are reported, not confirmed — I have omitted dollar
              amounts for that reason.
            </li>
            <li>
              Anthropic&apos;s 90.2% quality gain and 15× token figures are from
              an internal eval on an engineering blog.
            </li>
            <li>
              Claude/Gemini pricing figures move with model versions; verify
              against vendor pages. The ~100× cheapest-usable-to-flagship
              structural pattern is the real point.
            </li>
            <li>
              Generalist-vs-specialist results are task- and time-dependent:
              Medprompt (2023) showed a generalist winning; MedGemma (2025)
              shows a fine-tuned small specialist still beating zero-shot GPT-4
              on some tasks.
            </li>
          </ul>

          <h2>References</h2>

          <h3>Neuroscience</h3>
          <ul className='blog-prose__refs'>
            <li>
              Zheng &amp; Meister (2024) —{' '}
              <em>
                The unbearable slowness of being: Why do we live at 10 bits/s?
              </em>{' '}
              Neuron. DOI: 10.1016/j.neuron.2024.11.008.
            </li>
            <li>
              Koch et al. (2006) —{' '}
              <em>How Much the Eye Tells the Brain.</em> Current Biology 16.
            </li>
            <li>
              Lettvin, Maturana, McCulloch &amp; Pitts (1959) —{' '}
              <em>What the Frog&apos;s Eye Tells the Frog&apos;s Brain.</em>
            </li>
            <li>
              Gollisch &amp; Meister (2010) —{' '}
              <em>
                Eye Smarter than Scientists Believed: Neural Computations in
                Circuits of the Retina.
              </em>{' '}
              Neuron 65.
            </li>
            <li>
              Baden et al. (2016) —{' '}
              <em>
                The functional diversity of retinal ganglion cells in the mouse.
              </em>{' '}
              Nature.
            </li>
            <li>
              Fain et al. (2001) —{' '}
              <em>Adaptation in Vertebrate Photoreceptors.</em> Physiological
              Reviews.
            </li>
            <li>
              Rao &amp; Ballard (1999) —{' '}
              <em>Predictive coding in the visual cortex.</em> Nature
              Neuroscience 2.
            </li>
            <li>
              Teyler &amp; Rudy (2007) —{' '}
              <em>The hippocampal indexing theory and episodic memory.</em>{' '}
              Hippocampus.
            </li>
          </ul>

          <h3>Architecture, routing, agents</h3>
          <ul className='blog-prose__refs'>
            <li>
              Belcak et al. (2025) —{' '}
              <em>Small Language Models are the Future of Agentic AI.</em>{' '}
              <a
                href='https://arxiv.org/abs/2506.02153'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2506.02153
              </a>
            </li>
            <li>
              DeepSeek-AI — DeepSeek-V3 technical report (671B / 37B active).
            </li>
            <li>
              Fedus, Zoph &amp; Shazeer (2021) —{' '}
              <em>Switch Transformers.</em>{' '}
              <a
                href='https://arxiv.org/abs/2101.03961'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2101.03961
              </a>
            </li>
            <li>
              Chen, Zaharia &amp; Zou (2023) — <em>FrugalGPT.</em>
            </li>
            <li>
              Ong et al. (2025) — <em>RouteLLM.</em> ICLR 2025.
            </li>
            <li>
              Anthropic (June 2025) — Engineering post on multi-agent research
              system (+90.2% / ~15× tokens).
            </li>
            <li>
              Zaharia et al. (2024) —{' '}
              <em>The Shift from Models to Compound AI Systems.</em> Berkeley
              BAIR.
            </li>
            <li>
              Gutiérrez et al. (2024) — <em>HippoRAG.</em>
            </li>
            <li>
              Ramsauer et al. (2020) —{' '}
              <em>
                Hopfield Networks is All You Need.
              </em>
            </li>
          </ul>

          <h3>The steelman</h3>
          <ul className='blog-prose__refs'>
            <li>
              Sutton (2019) — <em>The Bitter Lesson.</em>
            </li>
            <li>
              Nori et al. (2023) —{' '}
              <em>
                Can Generalist Foundation Models Outcompete Special-Purpose
                Tuning?
              </em>{' '}
              <a
                href='https://arxiv.org/abs/2311.16452'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2311.16452
              </a>
            </li>
            <li>
              Cemri et al. (2025) —{' '}
              <em>Why Do Multi-Agent LLM Systems Fail?</em>{' '}
              <a
                href='https://arxiv.org/abs/2503.13657'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2503.13657
              </a>
            </li>
            <li>
              Yan / Cognition (June 2025) —{' '}
              <em>Don&apos;t Build Multi-Agents.</em>
            </li>
            <li>
              LeCun (2022) —{' '}
              <em>A Path Towards Autonomous Machine Intelligence.</em>
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
