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

const SLUG = 'an-exasperating-farrago-of-firewalls';
const post = getPostBySlug(SLUG)!;
const url = postUrl(SLUG);
const ogAbsolute = `${SITE_URL}${post.ogImage}`;
const publishedIso = `${post.date}T12:00:00.000Z`;

const KILL_CHAIN = `
flowchart LR
    A["Infostealer harvested the<br/>credentials months ago<br/>(54% of ransomware victims<br/>had prior stealer exposure)"] --> B["Initial access:<br/>log in, don't break in<br/>(stolen creds = 22% of breaches)"]
    B --> C["Hand-off to the<br/>second actor:<br/>22 seconds median"]
    C --> D["Breakout:<br/>29 min average,<br/>fastest observed 27 s"]
    D --> E["Lateral movement:<br/>82% malware-free"]
    E --> F["Impact: exfiltration,<br/>extortion, encryption"]
    G["The quiet alternative:<br/>espionage, median dwell<br/>122 days, hiding in<br/>edge devices with no logs"] -.->|"same doors,<br/>slower feet"| E
`;

const STACK_360 = `
flowchart LR
    subgraph People["Humans"]
      P1["Passkeys / FIDO2,<br/>phishing-resistant MFA"]
      P2["Help-desk verification<br/>drills vs vishing"]
    end

    subgraph Code["Code & CI/CD"]
      C1["SAST + secret scan + SCA<br/>on every PR, human or AI"]
      C2["OIDC federation:<br/>no long-lived cloud keys"]
      C3["SHA-pinned actions,<br/>SLSA provenance, cosign"]
    end

    subgraph Infra["Cloud & infra"]
      I1["IaC scanning:<br/>Checkov / Trivy / OPA"]
      I2["Admission control:<br/>signed images only"]
      I3["eBPF runtime:<br/>Falco / Tetragon"]
    end

    subgraph Net["Network"]
      N1["Default-deny egress —<br/>THE exfiltration control"]
      N2["Microsegmentation vs<br/>the 22-second hand-off"]
      N3["Always-on DDoS<br/>scrubbing"]
    end

    subgraph Data["Data & crypto"]
      D1["Just-in-time DB creds,<br/>no standing passwords"]
      D2["Hybrid PQC:<br/>X25519MLKEM768"]
      D3["ACME automation before<br/>the 47-day era"]
      D4["Immutable backups,<br/>tested restores"]
    end

    subgraph SOC["Detect & respond"]
      S1["SIEM + Sigma<br/>detection-as-code"]
      S2["AI triage, guarded;<br/>human verdicts"]
      S3["SOAR + incident mgmt<br/>+ war-rooms"]
      S4["Clocks: CERT-In 6 h ·<br/>GDPR 72 h · SEC 4 d"]
    end

    subgraph Agentic["The agentic plane"]
      A1["First-class agent identity:<br/>SPIFFE + per-task tokens"]
      A2["MCP gateway +<br/>necessity broker"]
      A3["Agent observability:<br/>intent, reasoning, tools"]
    end

    People --> Code --> Infra --> Net
    Data --> SOC
    Agentic --> SOC
`;

const SOC_PIPELINE = `
flowchart LR
    T["Telemetry: endpoints, cloud,<br/>CI runners, agent traces,<br/>identity events"] --> S["SIEM:<br/>correlation &<br/>detection-as-code"]
    S --> Q["AI triage agent:<br/>queue prioritisation<br/>(83% of the measured gain)"]
    Q --> V{"Verdict"}
    V -->|"~46% of alerts"| X["False positive:<br/>suppressed, fed back<br/>as training signal"]
    V -->|"true positive"| SEV["Severity + routing:<br/>right team, right channel,<br/>ack SLA (MTTA)"]
    SEV --> W["War-room + SOAR:<br/>guarded containment"]
    W --> R["Human sign-off for<br/>impactful actions"]
    SEV --> CLK["Regulatory clock starts<br/>at detection, not confirmation:<br/>CERT-In wants 6 hours"]
`;

const LETHAL_TRIFECTA = `
flowchart TD
    A["Capability one:<br/>reads private data"] --> T(("The lethal<br/>trifecta"))
    B["Capability two:<br/>ingests untrusted content<br/>(web, tickets, email, docs)"] --> T
    C["Capability three:<br/>communicates externally<br/>or changes state"] --> T
    T -->|"any two, manageable;<br/>all three, an exfiltration<br/>path gift-wrapped"| X["Prompt injection in,<br/>crown jewels out"]
    Y["The design rule: never give one agent<br/>all three without independent review,<br/>deterministic policy, and egress locks"] -.-> T
`;

const TASK_TOKEN = `
sequenceDiagram
    participant U as User
    participant O as Orchestrator
    participant AS as Authorisation server
    participant G as Gateway + broker
    participant T as Tool (MCP)
    U->>O: "Refund Priya her ₹4,200"
    O->>O: Compute plan hash:<br/>task + approved plan + tool set
    O->>AS: Token exchange: agent SPIFFE ID,<br/>user token (act claim), audience, plan hash
    AS-->>O: Short-lived, audience-bound,<br/>plan-hash-scoped token (minutes)
    O->>G: Tool call + token
    G->>G: Deterministic gates:<br/>role → arguments → rate limit
    alt Call inside the plan hash
        G->>T: Authorised invocation
        T-->>G: Result
        G-->>O: Result + tamper-evident audit entry
    else Call outside the plan hash
        G-->>O: Automatic deny + alert
    end
`;

const NECESSITY_BROKER = `
flowchart LR
    A["Agent cheerfully requests<br/>ten tools"] --> B["Tool Necessity Broker<br/>(off-host, separate trust domain,<br/>agent holds no credentials here)"]
    B --> L1["Layer 1 — deterministic policy<br/>Cedar / OPA: plan allowlist,<br/>argument constraints, rate limits<br/>~0.03 ms, carries the guarantee"]
    L1 --> D{"Every call inside<br/>plan + policy?"}
    D -->|"yes"| OK["Execute"]
    D -->|"novel or suspicious"| L2["Layer 2 — advisory guard LLM<br/>(sees the structured plan,<br/>NEVER the untrusted content)"]
    L2 --> L3{"Sensitive combination?<br/>trifecta, bulk export,<br/>first-time payee"}
    L3 -->|"no"| OK
    L3 -->|"yes"| H["Layer 3 — human review,<br/>the adult enters the room"]
    H -->|"approve"| OK
    H -->|"reject"| DENY["Deny + alert + audit"]
    D -.->|"state-changing tools fail CLOSED<br/>if the broker is unreachable"| DENY
`;

const VENDOR_MAP = `
flowchart TB
    ID["<b>Identity</b><br/>who is this agent?"]
    PO["<b>Policy</b><br/>what may it do?"]
    GW["<b>Gateway</b><br/>every call passes here"]
    EX["<b>Execution</b><br/>where it runs"]
    OB["<b>Observability</b><br/>what did it do?"]
    GU["<b>Injection detection</b><br/>defence in depth only"]

    ID -->|buy| IDB["Okta · Entra · Aembit<br/>Oasis · Astrix · CyberArk"]
    ID -->|own| IDO["SPIFFE/SPIRE, OAuth 2.1<br/>token exchange, per-task<br/>plan-hash tokens"]

    PO -->|buy the engine| POB["Cedar · OPA<br/>Permit.io · Cerbos"]
    PO -->|BUILD the semantics| POO["Your tool-necessity rules:<br/>the differentiator,<br/>versioned in your git"]

    GW -->|managed| GWB["Prisma AIRS MCP Server<br/>Cisco AI Defense<br/>AWS Bedrock AgentCore"]
    GW -->|OSS-first| GWO["Solo.io AgentGateway<br/>ToolHive · ContextForge<br/>Red Hat MCP Gateway"]

    EX -->|own| EXO["Sandboxes + EGRESS LOCK<br/>pinned, scanned MCP servers<br/>Falco / Tetragon"]

    OB -->|buy| OBB["Splunk + Galileo · Sentinel<br/>Google SecOps · Falcon · XSIAM<br/>Cisco Antares / Foundation AI"]
    OB -->|OSS| OBO["OTel GenAI · Uber ADR Sensor<br/>Langfuse · Sigma in git"]

    GU -->|buy, bound your<br/>expectations| GUB["Lakera Guard<br/>Prompt Security<br/>LlamaFirewall"]
`;

const DEFENSE_LIFECYCLE = `
flowchart LR
    IA["Initial access"] --> EX["Execution"] --> PE["Persistence"] --> LM["Lateral movement"] --> IM["Exfiltration & impact"]
    IA -.-> IA1["Passkeys · patch KEV first ·<br/>CI egress control"]
    EX -.-> EX1["EDR · Falco · app allowlisting<br/>(behaviour > signature)"]
    PE -.-> PE1["Signed images ·<br/>admission control"]
    LM -.-> LM1["Microsegmentation · mTLS ·<br/>JIT credentials"]
    IM -.-> IM1["Default-deny egress · DLP ·<br/>immutable backups"]
`;

const FAQ_ITEMS = [
  {
    question: 'What is the single most common way organisations get breached in 2026?',
    answer:
      'Stolen credentials. Attackers increasingly log in rather than break in: stolen passwords and session tokens are the top initial-access vector (22% of breaches per the Verizon DBIR 2025), 88% of basic web-application attacks use stolen credentials, and 82% of observed intrusions are now malware-free. Phishing-resistant passkeys (FIDO2) are the highest-leverage defence against it.',
  },
  {
    question: "What is the 'lethal trifecta' in AI security?",
    answer:
      "Simon Willison's term for an agent that can simultaneously read private data, ingest untrusted content, and communicate externally. With all three present, a prompt-injection attack has a guaranteed exfiltration path. The design rule: never grant one agent all three capabilities without independent review, deterministic policy enforcement, and egress control.",
  },
  {
    question: 'Is prompt engineering enough to secure an AI agent?',
    answer:
      'No. Model- and prompt-level defences are porous: MCP-SafetyBench found safety prompts reduce attack success by a statistically insignificant 1.22%, and MCPTox measured a 72.8% attack success rate with best-model refusal below 3%. Durable protection comes from architecture — least-privilege tool allowlists, egress control, and deterministic off-host authorisation.',
  },
  {
    question: 'Do AI SOC agents replace human analysts?',
    answer:
      "Not in 2026. Microsoft's randomised controlled trial found agent-augmented analysts triaged up to 78% faster with 77% better verdict accuracy — but 83% of the gain came from queue prioritisation, and roughly 46% of alerts remain false positives. Production 'autonomous response' means guarded containment under human-defined guardrails, not lights-out automation.",
  },
  {
    question: 'What is indirect prompt injection?',
    answer:
      'An attack where malicious instructions are hidden in data an AI agent reads — a Jira ticket, a web page, an email, a document — rather than typed by the user. The agent ingests the instruction as content and executes it as intent. Real-world proofs include the Agent Flayer Jira-ticket exfiltration and tool-poisoned MCP servers documented by Invariant Labs.',
  },
  {
    question: 'What should an organisation do first to secure its AI agents?',
    answer:
      'Five moves before any sophisticated tooling: (1) inventory every agent with owner, identity, tool scope and data class; (2) give each agent its own first-class identity instead of borrowed human credentials; (3) enforce deny-by-default tool allowlists per task class; (4) apply the lethal-trifecta rule to flag risky agents; (5) route 100% of tool calls through a gateway so no tool path bypasses policy.',
  },
];

export const metadata: Metadata = {
  title: postDocumentTitle(post),
  description: post.description,
  keywords: [
    ...post.tags,
    'AI security',
    'agentic AI security',
    'zero trust architecture',
    'prompt injection defence',
    'MCP security',
    'tool poisoning',
    'ransomware protection',
    'passkeys FIDO2',
    'CERT-In 6 hour reporting',
    'post-quantum cryptography',
    'egress control',
    'AI SOC',
    'supply chain security',
    'Shai-Hulud',
    'GTG-1002',
    'lethal trifecta',
    'MAI-Cyber-1-Flash',
    'Project Perception',
    'Project Glasswing',
    'Mythos 5',
    'Fable 5',
    'Cisco AI Defense',
    'Cisco Antares',
    'DefenseClaw',
    'CrowdStrike Charlotte AI',
    'Agentic Security Workforce',
    'Prisma AIRS',
    'Cortex AgentiX',
    'Google Big Sleep',
    'CodeMender',
    'Gemini Flash Cyber',
    'OpenAI Aardvark',
    'agentic SOC',
    'SPIFFE SPIRE',
    'Arvind Narayan',
  ],
  authors: [{ name: 'Arvind Narayan', url: SITE_URL }],
  creator: 'Arvind Narayan',
  publisher: 'Arvind Narayan',
  category: 'Cybersecurity',
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
    section: 'Cybersecurity',
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
    'article:section': 'Cybersecurity',
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
    inLanguage: 'en-GB',
    wordCount: post.wordCount,
    timeRequired: `PT${post.readingMinutes}M`,
    keywords: post.tags.join(', '),
    articleSection: 'Cybersecurity',
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
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  },
];

export default function AnExasperatingFarragoOfFirewallsPostPage() {
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
          <p className='blog-prose__dek blog-article__dek'>{post.description}</p>
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
            <BlogDropcap word='On' /> the thirteenth of November last year,
            Anthropic published a disclosure that ought to have ruined the
            weekend of every security officer worth their salt: a
            state-sponsored group, which they tracked as GTG-1002, had been
            caught using Claude Code to run roughly eighty to ninety per cent of
            an espionage campaign against some thirty targets &mdash;
            reconnaissance, exploit development, credential harvesting, lateral
            movement, exfiltration &mdash; with human beings intervening at only
            four to six decision points per campaign. The machine had not merely
            picked the lock. It had cased the building, copied the keys, drafted
            the getaway route, and filed the paperwork, pausing only
            occasionally to ask a human whether it might be so kind as to
            approve the next felony.
          </p>

          <p>
            Permit me one small throat-clear before we proceed, because the
            skepsis is part of the story. Several researchers I respect &mdash;
            Kevin Beaumont and Daniel Card among them &mdash; publicly wondered
            whether this was quite the watershed it was billed as, noting that
            the tooling involved was hardly exotic and that ordinary detections
            would have caught much of it; Anthropic&rsquo;s own report concedes,
            with admirable candour, that its model periodically overstated its
            findings and occasionally fabricated credentials that did not, in
            fact, work. So hold both thoughts at once, as one must hold most
            things worth holding in this field: it was a genuine inflection
            point, <em>and</em> it was a marketing event. The epochal and the
            exaggerated are not mutually exclusive; they are, in our industry,
            practically married.
          </p>

          <p>
            What is not exaggerated is the economics. A targeted intrusion
            campaign that once required a room of patient, expensive humans can
            now be staffed by one patient human and a subscription. And it
            arrives, this new industriousness on the part of our adversaries, at
            the precise moment when the defenders have obligingly spent three
            years wiring AI agents into every crevice of the enterprise &mdash;
            agents that read our email, triage our tickets, push our code, and
            refund our customers, each one a small, trusting butler with a set
            of house keys. A Cisco survey this March found eighty-five per cent
            of organisations experimenting with AI agents and five per cent
            willing to let them near production. That eighty-point gap is not a
            technology gap. It is a trust gap; and trust, as any seasoned
            parliamentarian will tell you, is what evaporates right after the
            assurances are given.
          </p>

          <p>
            This essay is therefore an attempt at the full perambulation. We
            shall begin with how one is actually robbed in 2026 &mdash; the
            numbers are far worse than the folklore &mdash; then walk the entire
            defensive edifice, floor by floor: code, infrastructure, network,
            email, endpoints, ransomware, encryption, detection. Then we shall
            turn to the new and genuinely peculiar problem of attacks conducted
            <em>by</em> and <em>against</em> AI systems, and what one
            concretely does about them. And finally, because I am an engineer
            and not a pamphleteer, we shall end with what to do on Monday
            morning. The title, for those who recognise the borrowing, is an
            homage to a certain honourable member of Parliament whose vocabulary
            I can admire but not afford. The firewall farrago, alas, is entirely
            our own.
          </p>

          <h2>The present unpleasantness: how one is actually robbed in 2026</h2>

          <p>
            The single most important thing to understand about the modern
            intrusion is that it does not, in any meaningful sense, involve
            breaking in. CrowdStrike&rsquo;s 2026 Global Threat Report puts the
            share of malware-free intrusions at eighty-two per cent. Verizon&rsquo;s
            DBIR, the industry&rsquo;s annual census of woe, has stolen
            credentials as the number one initial-access vector at twenty-two
            per cent of breaches, and a scarcely believable eighty-eight per
            cent of basic web-application attacks begin with somebody else&rsquo;s
            password. The burglar does not smash the window. The burglar
            purchased the key for four dollars on a marketplace, lets himself in
            through the front door, and waves pleasantly at the camera on the
            way to the silver.
          </p>

          <p>
            The supply of keys is industrial. Infostealer malware &mdash;
            Lumma, RedLine, and their many heirs &mdash; spends its days
            hoovering credentials, cookies and session tokens out of browsers,
            and the harvest is remarkable: more than half of ransomware victims
            had prior infostealer exposure, which is to say the robbery was
            over, in a sense, months before anyone called the police.
            Microsoft&rsquo;s constabulary did drag away the Lumma operation in
            May of last year, and the market barely paused to inhale; a new
            stealer family, one notes, now hunts specifically for the local AI
            CLI tools developers have been installing with such enthusiasm,
            because where the credentials go, there go the thieves.
          </p>

          <p>
            And the speed. Here the numbers pass from the concerning into the
            faintly comic. The average eCrime breakout time &mdash; the interval
            between an intruder&rsquo;s first foothold and their expansion
            across your estate &mdash; is now twenty-nine minutes. The fastest
            observed was twenty-seven seconds, which is less time than it takes
            to microwave a poppadum. Mandiant, measuring the same phenomenon
            from a different angle, found the median time between initial access
            and the hand-off to a second actor has collapsed to twenty-two
            seconds. Twenty-two seconds. There is no human process on earth
            &mdash; no ticket queue, no approval workflow, no committee,
            however lean &mdash; that operates on that clock. Any defence that
            requires a person to notice something before it can act has already
            lost; it lost twenty-six seconds ago.
          </p>

          <MermaidDiagram
            chart={KILL_CHAIN}
            aria-label='The 2026 intrusion timeline, from infostealer harvest to impact, with the quiet espionage track alongside'
          />

          <p>
            Before we leave the census, one apparent paradox deserves untangling,
            because your board will ask about it. Breakout time has collapsed to
            minutes, yet median dwell time &mdash; how long intruders sit inside
            before discovery &mdash; actually <em>rose</em> to fourteen days,
            and for the espionage-minded the median is a languorous hundred and
            twenty-two. These are not contradictory; they are two different
            adversaries sharing one report. The eCrime fellow is a
            smash-and-grab artist who wants to be in, paid, and gone before
            lunch. The espionage fellow is a tenant, and he has discovered that
            your edge appliances &mdash; the VPN concentrators, the firewalls,
            the odd forgotten router &mdash; were never wired for logging at
            all, which makes them less a perimeter than a furnished flat with no
            landline. Mandiant&rsquo;s BRICKSTORM cases are exactly this:
            persistence on devices your EDR cannot see and never will. When
            someone tells you their mean time to detect is excellent, the
            correct follow-up question is: on which estate?
          </p>

          <h3>The help desk is the perimeter now</h3>

          <p>
            If the front door is a stolen password, the tradesman&rsquo;s
            entrance is a telephone call to your service desk. Scattered Spider
            &mdash; the loose collective behind the MGM and Caesars
            unpleasantness of 2023, and last year&rsquo;s merry romp through
            airlines and insurers &mdash; has refined social engineering to a
            performing art: ring the help desk, sound flustered and important,
            obtain a password reset and an MFA enrolment, proceed to burgle.
            Voice phishing was the number two initial-access vector in this
            year&rsquo;s M-Trends at eleven per cent, which means one attack in
            nine began with somebody being helpful, that most dangerous of
            corporate virtues.
          </p>

          <p>
            The deepfake has now joined the repertoire, and here I must ask you
            to savour the Arup case, because it is the future arriving early and
            in fancy dress. A clerk in Hong Kong attended a video conference
            with what appeared to be the entire senior management of his firm.
            Every single participant was a puppet &mdash; synthetic faces,
            synthetic voices &mdash; and the clerk, observing a full boardroom
            of familiar colleagues instructing him in unison, obligingly wired
            out twenty-five million dollars. We spent years telling staff to be
            suspicious of the lone, misspelled email from a prince. We did not
            think to warn them about a quorum.
          </p>

          <p>
            Meanwhile the data-breach business has quietly re-platformed itself
            onto OAuth. The 2025 Salesforce extortion wave &mdash; Scattered
            Spider, ShinyHunters and friends, two-point-eight million records at
            Allianz Life alone &mdash; and the Salesloft/Drift token affair,
            which relieved some seven hundred organisations of their data via
            abused OAuth tokens, share a structure: why attack the fortress when
            you can steal the courier&rsquo;s badge? The victim list for the
            Drift incident included Cloudflare, Zscaler, PagerDuty and Tanium.
            When the companies whose entire raison d&rsquo;&ecirc;tre is keeping
            you safe are themselves relieved of their tokens, one is entitled to
            a moment of quiet despair &mdash; followed, one hopes, by a moment of
            loud token binding.
          </p>

          <h3>Your build pipeline is production (and other supply-chain parables)</h3>

          <p>
            The two defining supply-chain events of the period deserve their own
            paragraph of infamy. In March 2025, an attacker with a stolen
            token retroactively repointed every version tag of the popular
            tj-actions/changed-files GitHub Action to a malicious commit
            (CVE-2025-30066) that dumped CI runner memory &mdash; which is to
            say, your secrets &mdash; into public build logs. Some twenty-three
            thousand repositories were affected, and the thing was caught not by
            any scanner of code but by egress anomaly detection noticing the
            runner whispering to a strange host. Underline that detail; it
            becomes our hero later.
          </p>

          <p>
            Then, in September, came Shai-Hulud: an npm worm seeded through a
            trivial colour-library package, which used a post-install script to
            run TruffleHog &mdash; yes, a defensive secret-scanner, pressed into
            service as the burglary tool, which takes a certain
            <em>je ne sais quoi</em> &mdash; harvested every credential it could
            find, exfiltrated them to public GitHub repositories, and
            republished itself into every package the stolen npm tokens could
            touch, spreading with no command-and-control server at all. The 2.0
            wave in November moved to a pre-install hook, added a destructive
            fallback that could wipe your home directory, compromised over seven
            hundred packages with twenty million weekly downloads between them,
            spawned twenty-five thousand malicious repositories, and exposed
            some fourteen thousand secrets across four hundred and eighty-seven
            organisations &mdash; among them, crowed the headlines with evident
            delight, CrowdStrike&rsquo;s own npm packages. There is no moral
            here except the uncomfortable one: every third-party package and
            every third-party action is unaudited code executing with your
            secrets, and your build pipeline enjoys a level of privilege that
            would make a domain admin blush.
          </p>

          <h3>Ransomware, or the extortion economy&rsquo;s pivot to recovery denial</h3>

          <p>
            The ransomware business, after the law-enforcement theatre of
            Operation Cronos and the quiet closure of RansomHub, consolidated
            around Qilin, Akira and Cl0p &mdash; Qilin listing somewhere between
            eight hundred and a thousand victims last year depending on whose
            tally you trust, Akira credited by the CISA/FBI joint advisory with
            at least three hundred and forty-two organisations and roughly a
            quarter of a billion dollars in proceeds. The strategic shift is
            what matters: the mature groups have understood that encryption is
            merely the opening argument, and that the negotiation collapses the
            moment you can restore. Hence the pivot to recovery denial &mdash;
            they come for your backups first, your VMware estate second, and
            your EDR-less edge appliances for the long stay. The medallion on
            the wall of every ransomware affiliate now reads, in effect: kill
            the lifeboats, then torch the ship.
          </p>

          <h3>And the DDoS, briefly, is absurd</h3>

          <p>
            The Aisuru/TurboMirai botnet &mdash; one to four million conscripted
            IoT devices, your security cameras and doorbells pressed into
            service as artillery &mdash; drove the record to 29.7 terabits per
            second in the third quarter of 2025, then 31.4 terabits in November.
            That November flood lasted thirty-five seconds. Cloudflare mitigated
            47.1 million attacks across 2025, up a hundred and twenty-one per
            cent year on year, an average of 5,376 attacks per hour; eighty-nine
            per cent of network-layer attacks and seventy-one per cent of HTTP
            attacks are over in under ten minutes, and attacks on AI companies
            spiked three hundred and forty-seven per cent in September alone.
            The modern DDoS, in other words, is finished before the incident
            channel is created, which is why on-demand mitigation is a
            contradiction in terms and always-on scrubbing is simply the price
            of being on the internet at all.
          </p>

          <BlogRelatedAd slug={SLUG} />

          <h2>A 360&deg; perambulation around the fortress</h2>

          <p>
            So much for the census of woe. Now to the edifice, and I want to
            state the thesis plainly before we climb, because it will be easy to
            lose in the detail: security is not a product one purchases but a
            property one engineers into every storey of the building, and the
            controls that actually repay their cost in 2026 are mostly
            unglamorous. Phishing-resistant identity kills the number one
            initial-access vector. Egress control kills both classic
            exfiltration and, as we shall see, most agentic mischief too.
            Immutable backups kill ransomware&rsquo;s leverage. OIDC federation
            kills the long-lived cloud keys the supply-chain worms were built to
            steal. Everything else &mdash; the AI SOC, the agentic guardrails,
            the quantum-resistant cryptography &mdash; is a force multiplier on
            top of those four, and a force multiplier applied to zero is,
            arithmetically speaking, still zero.
          </p>

          <MermaidDiagram
            chart={STACK_360}
            aria-label='The 360-degree security stack: humans, code, infrastructure, network, data and crypto, the agentic plane, and the detection-and-response spine'
          />

          <p>
            Let us walk the floors. I shall try to be brief about each, and I
            shall fail, but the attempt is sincere.
          </p>

          <h3>Floor one: code, and the AI that writes it</h3>

          <p>
            Begin where everything begins: the commit. And here we must have an
            honest word about AI-generated code, because the evidence has
            stopped being anecdotal. Veracode tested over a hundred models
            across eighty tasks and found forty-five per cent of generated code
            samples failed security tests &mdash; seventy-two per cent for Java,
            which suggests the models learned Java from the same place everyone
            else did, and eighty-six per cent failure on cross-site scripting
            specifically. AI-written code carried 2.74 times more
            vulnerabilities than human-written code, and AI-assisted commits
            leak secrets at roughly double the human rate. This is a volume
            problem stacked on a rate problem: the machine writes code the way a
            Victorian novelist produced serials &mdash; copiously, confidently,
            and with only occasional regard for how it ends &mdash; and it does
            so at ten times the speed of the Victorian novelist, which is rather
            the point.
          </p>

          <p>
            The remedy is not to stop the machine; that ship has not merely
            sailed, it has been acquired by Google. The remedy is to treat every
            AI-authored pull request as untrusted input and gate it accordingly:
            SAST, secret scanning with push protection, and dependency scanning
            must pass before any AI-opened PR merges, and branch protection must
            require an accountable human reviewer &mdash; a named adult who
            signs for the merge the way a partner signs for the opinion. The
            single highest-leverage change in the whole of CI/CD, though, is
            OIDC federation: replace every long-lived cloud credential in your
            pipelines with short-lived tokens minted on demand, and you have
            removed the very thing tj-actions and Shai-Hulud were engineered to
            steal. Add SHA-pinning for every third-party action (tags, as
            twenty-three thousand repositories learned, can be repointed),
            provenance attestations via SLSA and in-toto, signed images via
            cosign, and egress control on the runners themselves &mdash; audit
            mode first, block mode when your courage matures. That last control,
            recall, is what actually caught tj-actions. The runner tried to
            whisper to a strange host, and the whisper was heard.
          </p>

          <h3>Floor two: infrastructure and cloud</h3>

          <p>
            The cloud-security market consolidated so violently that the
            consolidation itself became news: Google closed its thirty-two
            billion dollar, all-cash acquisition of Wiz this March &mdash; the
            largest deal in Google&rsquo;s history and the largest
            pure-cybersecurity transaction on record &mdash; which tells you
            what the hyperscalers think posture management is worth. Underneath
            the ticker symbols, the reference stack is pleasantly boring: scan
            your Terraform before it becomes somebody else&rsquo;s incident
            (Checkov, Trivy, OPA for policy); enforce admission control in
            Kubernetes so that unsigned, privileged, or otherwise insolent pods
            never schedule (Kyverno or Gatekeeper, with cosign verification);
            and watch the runtime with eBPF &mdash; Falco or Cilium Tetragon
            &mdash; so that a process loading a backdoored compression library
            is seen at the syscall layer, not in the post-mortem. Cisco&rsquo;s
            Hypershield is the notable commercial bet here, all eBPF and
            autonomous segmentation, with a lovely party trick of blocking a
            vulnerable library load via kernel policy; the efficacy claims are
            vendor-sourced, as are most efficacy claims, which is the
            polite term for &lsquo;unverified&rsquo;.
          </p>

          <h3>Floor three: the network, and the one control to rule it</h3>

          <p>
            Zero Trust has graduated from whitepaper to plumbing &mdash; NIST
            moved from the concept (SP 800-207) to worked implementations
            (SP 1800-35) &mdash; and if you permit me to reduce an entire
            architectural movement to one sentence: default-deny egress is the
            exfiltration control, and everything else is commentary. Consider
            the evidence. Egress anomaly detection caught tj-actions. Egress
            control is what would have stopped the Shai-Hulud worm from
            reporting its harvest. Egress control is, as we shall see shortly,
            the precondition that makes every serious agentic defence work at
            all. An attacker who has run rings around your EDR, your SIEM and
            your dignity still has to carry the data out through a network you
            own, and if that network permits outbound connections to anywhere
            but an allowlist of known destinations, the rings run nowhere.
            Complement it with microsegmentation &mdash; the twenty-two-second
            hand-off means lateral movement must be <em>architecturally</em>
            hard, not merely monitored &mdash; and mutual TLS between workloads
            so that identity, not network location, decides who may speak to
            whom.
          </p>

          <h3>Floor four: endpoints and the strange new shape of malware</h3>

          <p>
            EDR remains worth its licence fee, but remember the census:
            eighty-two per cent of intrusions arrive without any malware to
            detect, so behavioural detection &mdash; canary files,
            mass-file-change heuristics, credential-access patterns &mdash; is
            the main event and signatures the sideshow. And do note the shape
            malware is taking in the age of local models. ESET&rsquo;s
            PromptLock, the first AI-orchestrated ransomware proof of concept,
            carried no malicious payload worth the name; it asked a locally
            hosted twenty-billion-parameter model to write its Lua scripts on
            the fly, fresh each time, which is the end of signature detection as
            a concept. Mandiant has since documented in-the-wild families that
            query LLMs mid-execution. Your next piece of malware may not contain
            its malicious code at all; it may simply request it, politely, at
            runtime, in flawless prose.
          </p>

          <h3>Floor five: email, humans, and the passkey</h3>

          <p>
            We have established that the number one way in is a stolen
            credential. It follows, with the inexorability of a syllogism, that
            the highest-leverage identity control is the one that makes
            credentials unstealable, and that control is the passkey &mdash;
            FIDO2, device-bound, phishing-resistant, immune in one stroke to
            credential stuffing, prompt bombing, and the entire infostealer
            economy. There is no security purchase with a better
            effort-to-effect ratio anywhere in this essay. If you retain one
            sentence from this entire farrago, let it be this: put every
            administrator on passkeys this quarter, and everyone else the
            quarter after. The deepfake boardroom, the vishing call, the
            helpful clerk &mdash; all of them end the same way, with a human
            being talked into handing over an authentication factor, and the
            passkey is the factor that cannot be handed over. It is the security
            equivalent of making the crown jewels ungiftable.
          </p>

          <h3>Floor six: ransomware and the theology of backups</h3>

          <p>
            Against recovery denial there is exactly one doctrine, and it is
            not negotiable: immutable, logically air-gapped backups, with
            restores that are <em>tested</em>. A backup you have never restored
            is not a backup; it is a hope, written to disk. S3 Object Lock or
            its equivalent makes the copy unchangeable even by your own
            compromised administrators; isolation keeps the ransomware from
            reaching it; and the quarterly fire drill &mdash; actually restoring
            something, on a clock, with witnesses &mdash; is what separates a
            recovery capability from a recovery anecdote. The median figure
            from IBM&rsquo;s breach research is that a tested incident-response
            plan saves over two and a half million dollars per incident, which
            makes the fire drill the best-paid afternoon in your calendar.
          </p>

          <h3>Floor seven: encryption, key rotation, and the coming certificate apocalypse</h3>

          <p>
            Now the cryptographer&rsquo;s corner, where two honest confessions
            are in order. The first concerns key rotation, on which I hold a
            heretical view: automated rotation of envelope-encryption keys is
            excellent precisely because it is free and invisible, whereas the
            calendar-driven manual rotation of application secrets is, more
            often than not, compliance theatre with an outage risk attached.
            The correct answer to long-lived secrets is not to rotate them
            religiously; it is to stop having them. Dynamic, just-in-time
            credentials &mdash; database passwords minted per session, cloud
            tokens minted per pipeline run &mdash; expire before they can be
            stolen, which renders the whole rotation calendar moot. (One
            procurement note, since we are here: Vault is no longer open source
            and its new owners have been pruning; the community fork, OpenBao,
            is where the OSS-first path now runs.)
          </p>

          <p>
            The second confession is that certificate management is about to
            become an operational emergency for anyone still doing it by hand.
            The CA/Browser Forum has voted the maximum public TLS certificate
            lifetime down in steps &mdash; two hundred days from this March, one
            hundred days in 2027, and forty-seven days by 2029 &mdash; with
            domain-validation reuse shrinking to ten days. At forty-seven days
            you must re-prove ownership of every domain roughly thirty-five
            times a year, which is to say: manual renewal is dead, and if you do
            not have cert-manager and ACME humming away today, you have a dated,
            certain, entirely self-inflicted outage in your future.
          </p>

          <p>
            And then there is the quantum fellow, patient as a glacier.
            Harvest-now-decrypt-later is the threat: adversaries recording your
            encrypted traffic today, to read at leisure when a cryptographically
            relevant quantum computer arrives. NIST finalised the post-quantum
            standards in August 2024, and the pragmatic 2026 move is hybrid key
            exchange &mdash; X25519MLKEM768 &mdash; which Chrome and Firefox
            already negotiate by default and which, by Cloudflare&rsquo;s
            measurement, now protects over half of all web requests, roughly
            double the share of a year ago. Deploy it at your edge; it is
            configuration, not research. And test your infrastructure against
            the larger post-quantum signatures before you must &mdash; an
            ML-DSA-65 signature is fifty times the size of its ECDSA
            predecessor, and MTU-related surprises are the least enjoyable
            surprises. The quantum computer that will one day read your secrets
            need not exist yet. It suffices that your secrets, intercepted
            today, are patient.
          </p>

          <h3>Floor eight: logging, detection, and the AI-augmented SOC</h3>

          <p>
            The top of the building is where everything drains into: the
            security operations centre, whose job in one phrase is to detect
            quickly and intimate the responsible team before the twenty-two-second
            hand-off becomes the four-million-dollar breach. The pipeline is
            well understood &mdash; telemetry into a SIEM, detections as Sigma
            rules versioned in git (so they are portable, auditable, and not
            hostage to any one vendor&rsquo;s fortunes), triage, severity,
            routing, response, and the regulatory clocks that start ticking at
            the worst possible moment.
          </p>

          <MermaidDiagram
            chart={SOC_PIPELINE}
            aria-label='The modern detection-and-response pipeline, from telemetry through AI triage to human verdicts and regulatory clocks'
          />

          <p>
            The honest news about the AI SOC is genuinely good, which will
            surprise readers who have been following my general line. Microsoft
            ran the strongest study in the field &mdash; a proper randomised
            controlled trial, not a webinar &mdash; and found analysts augmented
            with a triage agent worked up to seventy-eight per cent faster, with
            seventy-seven per cent better verdict accuracy and six and a half
            times more true positives per minute. But here is the detail that
            should be printed and framed: eighty-three per cent of the gain came
            from queue prioritisation &mdash; from simply putting the right
            alert in front of the human first. The magic is not robotic
            judgement; the magic is skipping the queue. Meanwhile roughly
            forty-six per cent of alerts remain false positives, and ninety-two
            per cent of organisations admit to incidents traceable to alerts
            that were seen and not investigated. So by all means, buy the triage
            agent. Just understand that you are buying a magnificent sorting
            hat, not a replacement wizard; and treat every &lsquo;autonomous
            response&rsquo; pitch the way you would treat a &lsquo;self-driving
            car&rsquo; pitch &mdash; ask, specifically, whether you are being
            sold lane-keep assist or a vehicle with no steering wheel. In 2026,
            it is lane-keep assist, guarded containment under human-defined
            guardrails, and anyone claiming otherwise is encouraged to publish
            their false-positive rate.
          </p>

          <p>
            One paragraph of intimation plumbing, because detection without
            routing is just anxiety with a dashboard. Severity classification
            must drive automatic routing &mdash; the right team, the right
            channel, an acknowledgement SLA &mdash; and your mean time to
            acknowledge is the metric that exposes alert fatigue and
            understaffing more honestly than any maturity assessment. Wire the
            SEV-1 path to auto-create the war-room, page the on-call, and
            draft the regulatory paperwork simultaneously. On which subject,
            and I say this from Bengaluru with feeling: if you operate in India,
            CERT-In requires you to report a defined incident within six hours
            of <em>detection</em> &mdash; not confirmation, not convening a
            working group, detection &mdash; alongside a hundred and eighty days
            of log retention on Indian soil and time-synced servers. It is the
            strictest reporting window on earth (GDPR allows a leisurely
            seventy-two hours; the SEC four whole days), it carries criminal
            penalties, and the only way to meet it is to have decided in advance
            which severities auto-draft the preliminary report. Also, a public
            service announcement for the Opsgenie faithful among you: it is
            being switched off entirely in April 2027, data and all, so migrate
            before the lights go out.
          </p>

          <h2>Meanwhile, the machines have unionised</h2>

          <p>
            We come now to the part of the essay where the attack surface
            stops being familiar. Everything in the previous sections &mdash;
            stolen credentials, worms, floods, extortion &mdash; is the old war
            fought at new speed. What the GTG-1002 affair announced is
            something categorically different: the threat has migrated from the
            model to the orchestration layer. For three years the security
            conversation about AI fixated on the model saying something
            dreadful &mdash; a jailbreak, a slur, a recipe for napalm &mdash;
            while the actual 2026 problem is the agent <em>doing</em> something
            dreadful: chaining tool calls across a dozen politely integrated
            systems, each individual call defensible, the composition
            catastrophic. The unit of compromise is no longer the sentence. It
            is the workflow.
          </p>

          <p>
            Consider the tools the modern agent is handed. The Model Context
            Protocol &mdash; MCP, the connective tissue that lets an agent
            discover and invoke external tools &mdash; has been adopted with
            the reckless enthusiasm our industry reserves for things that demo
            well. And the attack taxonomy that has grown around it reads like a
            pamphlet of confidence tricks, each with a real-world anchor.
            There is <strong>indirect prompt injection</strong>: hide the
            instruction in data the agent reads &mdash; a Jira ticket, a web
            page, an email &mdash; and the agent obligingly executes content as
            intent. Zenity&rsquo;s Agent Flayer work demonstrated exactly this,
            a weaponised Jira ticket that talked the agent into exfiltrating
            secrets, which means your ticketing system is now an attack vector
            that types. There is <strong>tool poisoning</strong>, where the
            malicious instruction lives in the tool&rsquo;s own
            <em>description</em> &mdash; the documentation attacks the
            librarian &mdash; and the MCPTox benchmark measured a 72.8 per cent
            attack success rate with the best models refusing less than three
            per cent of the time. There is the <strong>rug pull</strong>, where
            a tool you approved on Monday is silently redefined by Thursday
            (Cursor, CVE-2025-54136). There is straightforward
            <strong>supply-chain RCE</strong>: the mcp-remote package, four
            hundred and thirty-seven thousand downloads, carried a 9.6-severity
            remote-code-execution flaw (CVE-2025-6514, credit to Or Peles at
            JFrog) for anyone who ran it against a hostile server. And there is
            <strong>memory poisoning</strong> &mdash; malicious content tucked
            into the agent&rsquo;s long-term memory, a sleeper instruction that
            wakes in a future session when the context is right. The butler, in
            other words, can be hypnotised through the post.
          </p>

          <p>
            The benchmarks, taken together, make for sobering reading over
            one&rsquo;s morning filter coffee. On AgentDojo, the standard
            agent-hijacking suite, the best defended agents solve fewer than
            two-thirds of their tasks cleanly, attacks succeed up to a quarter
            of the time, and adding a secondary detector only brings that down
            to about eight per cent &mdash; better, not zero. The Agent
            Security Bench reports attack success up to 84.3 per cent.
            MCP-SafetyBench found host-side attacks succeeding about
            eighty-two per cent of the time, and &mdash; this is the number I
            would like every vendor of &lsquo;AI guardrails&rsquo; to embroider
            on a sampler &mdash; adding safety prompts reduced attack success
            by a statistically insignificant 1.22 per cent. My favourite, in a
            bleak sort of way, is the WASP benchmark for web agents, whose
            authors coined the phrase of the year: attacks on current agents
            often fail for the same reason my attempts at the violin fail,
            namely incompetence rather than opposition. <em>Security by
            incompetence.</em> The agents are not defended; they are merely
            bad at being attacked. The day they become competent &mdash; and
            competence, one notes, is the entire direction of travel &mdash;
            the protection evaporates.
          </p>

          <p>
            If you retain one design heuristic from this entire section, make
            it Simon Willison&rsquo;s <strong>lethal trifecta</strong>: an
            agent that can (one) read private data, (two) ingest untrusted
            content, and (three) communicate externally is an agent with a
            guaranteed exfiltration path. Any two of the three is manageable.
            All three together is a smuggling route with a company badge. Audit
            every agent you run against those three capabilities, and treat
            every yes-yes-yes as a critical finding, not an architecture
            decision.
          </p>

          <MermaidDiagram
            chart={LETHAL_TRIFECTA}
            aria-label="The lethal trifecta: private data access plus untrusted content plus external communication equals a guaranteed exfiltration path"
          />

          <p>
            Two more structural shifts deserve their place in the census before
            we turn to remedies. The first is the quiet explosion of non-human
            identity. Machine identities &mdash; service accounts, API keys,
            agents &mdash; now outnumber human users forty-five to one on
            average, and up to a hundred and forty-four to one in cloud-native
            estates, a figure that itself jumped fifty-six per cent in a single
            year. Yet only twenty-two per cent of security teams treat their
            agents as first-class identities, and only twenty-eight per cent
            can trace an agent&rsquo;s actions back to a responsible human
            sponsor. We have built a workforce of ghosts and then expressed
            surprise when the forensic trail is ghostly. The second is the
            agent-to-agent cascade: in multi-agent settings, one compromised
            participant&rsquo;s output is trusted downstream, and control-flow
            hijacking in such systems succeeds fifty-six per cent of the time.
            The Morris II worm proved the propagation mechanism in the lab two
            years ago &mdash; a self-replicating adversarial prompt, spreading
            from agent to agent through email and retrieval stores across three
            different vendors&rsquo; models, zero clicks required. It was a
            proof of concept. So was the printing press, once.
          </p>

          <h2>The arms merchants: who is selling what, and does any of it work?</h2>

          <p>
            Now, lest this read as unrelieved gloom, the defence has not been
            idle. Indeed the most interesting development of the period is that
            the frontier laboratories have started shipping genuinely defensive
            machinery, and one cannot survey this field honestly without naming
            names &mdash; both because the capabilities are real and because
            the marketing is, shall we say, aspirational. Let us take the
            model-makers first and the platforms second, and let us keep our
            wits about us throughout.
          </p>

          <h3>The frontier laboratories, and the guns they will not sell you</h3>

          <p>
            <strong>Google</strong> has the most quietly impressive record.
            Its <strong>Big Sleep</strong> discovery agent found a live SQLite
            vulnerability (CVE-2025-6965) before the attackers could use it
            &mdash; the first occasion on which an AI is known to have foiled
            an in-the-wild exploit, which is a genuine milestone however
            modestly it was announced. Its sibling <strong>CodeMender</strong>
            does the unglamorous other half, having upstreamed seventy-two
            security patches into real projects, and <strong>Gemini 3.5 Flash
            Cyber</strong> is the productised edge of the same capability
            &mdash; restricted, note, to governments and trusted partners.
            <strong>OpenAI&rsquo;s Aardvark</strong> works the same seam from
            the developer&rsquo;s end: it threat-models your repository, scans
            each commit, validates that a finding is actually exploitable in a
            sandbox rather than merely theoretically alarming, and drafts the
            patch. Ninety-two per cent detection on golden repositories, ten
            or more CVEs filed, and still in private beta.
          </p>

          <p>
            <strong>Microsoft</strong> made the loudest move of the summer.
            <strong>MAI-Cyber-1-Flash</strong>, shipped on the twenty-seventh
            of July, is a cyber-tuned mixture-of-experts model &mdash; a
            hundred and thirty-seven billion parameters total but only five
            billion active, with a two-hundred-and-fifty-six-thousand-token
            context &mdash; which handles roughly ninety per cent of security
            tasks itself and escalates the awkward tenth to a larger frontier
            model. It scores 95.95 per cent on CyberGym at about half the going
            cost, sits inside the <strong>MDASH</strong> platform, and its
            companion <strong>Project Perception</strong> entered public
            preview, as it happens, this very morning. The architecture is the
            interesting part and generalises well beyond Microsoft: a cheap,
            fast, domain-tuned model doing the bulk of the work with selective
            escalation to an expensive one. That is precisely the two-tier
            pattern Uber&rsquo;s ADR uses for detection, and it is becoming the
            house style of security AI for the excellent reason that
            it is the only shape that survives contact with a real alert
            volume and a real budget.
          </p>

          <p>
            And then there is <strong>Anthropic</strong>, whose experience this
            summer ought to be pinned above the desk of anyone drafting a
            three-year security roadmap. Its frontier bug-hunter,{' '}
            <strong>Mythos 5</strong> &mdash; the restricted variant, with
            safeguards removed for vetted organisations, alongside the
            safeguarded public <strong>Fable 5</strong> and the broader{' '}
            <strong>Project Glasswing</strong> effort &mdash; was shut down by
            US export controls on the twelfth of June, partially restored
            between the twenty-sixth and the thirtieth, and has been in an
            extraordinary geopolitical tug-of-war ever since. The NSA, one
            notes, was a user. The lesson is not about Anthropic. The lesson is
            that <em>access to the most capable defensive models is now a
            matter of government directive rather than contract</em>, which is
            a sentence no procurement process in the world is currently
            designed to accommodate. Architect for model portability. Rent the
            brain if you must, but the policy plane, the identity plane and the
            telemetry must be yours, in your git, on your terms &mdash; because
            the brain may be repossessed by a ministry on a Thursday.
          </p>

          <p>
            One further observation about this entire category, which I offer
            without much comfort: every one of these systems is a
            dual-use instrument. A model that can find an exploitable bug in
            your repository is, by construction, a model that can find one in
            somebody else&rsquo;s. The restraint currently on display &mdash;
            the restricted access, the vetted-organisations-only postures, the
            export controls &mdash; is the only thing standing between the
            defensive arms race and the offensive one, and restraint is
            historically among the more perishable commodities.
          </p>

          <h3>The platforms, and the eighty-point gap</h3>

          <p>
            <strong>Cisco</strong> has assembled the most complete agentic-security
            platform on the market, largely by acquisition.{' '}
            <strong>AI Defense</strong> is the centrepiece: discovery of the
            agents you did not know you had, supply-chain scanning of model
            files, datasets, tools and MCP servers, and runtime guardrails that
            claim to catch memory poisoning, tool misuse, privilege escalation
            and intent hijacking &mdash; which is to say, most of the taxonomy
            from the previous section. Underneath sit{' '}
            <strong>Foundation-Sec-8B</strong>, an open-weight security model
            built on Llama 3.1 and genuinely useful for teams who want
            something they can host themselves; and, more recently,{' '}
            <strong>Antares</strong> &mdash; a family of tiny,
            open-weight agentic models (three hundred and fifty million and one
            billion parameters released, a three-billion-parameter sibling kept
            in-house) trained specifically to walk a repository the way a
            triage analyst would and point at the files most likely to hold a
            known vulnerability. Compact enough to run on-premises, which means
            you need not ship your source code to somebody else&rsquo;s cloud
            for the privilege of being told which file to open. That is the
            useful pattern: not a general coding assistant pressed into security
            service, but a narrow instrument for one expensive step in the
            chain. Under the same roof sit <strong>Robust Intelligence</strong>{' '}
            (acquired 2024) for red-teaming mapped to OWASP and ATLAS, and{' '}
            <strong>Splunk</strong>, bought for twenty-eight billion dollars,
            now serving as the observability and detection backend, with the
            Galileo acquisition bolted on for agent observability specifically.
            At RSAC this year Cisco added <strong>DefenseClaw</strong> (a
            secure agent framework), an <strong>Agent Runtime SDK</strong> that
            pushes build-time policy into Bedrock AgentCore, Vertex, Azure AI
            Foundry and LangChain, and an <strong>LLM Security
            Leaderboard</strong>. Separately, <strong>Hypershield</strong>{' '}
            covers the infrastructure floor we walked earlier, all eBPF and
            autonomous segmentation.
          </p>

          <p>
            It was also Cisco that produced the single most clarifying
            statistic in this entire essay, and I return to it deliberately
            because it is the thesis in numerical form: eighty-five per cent of
            organisations experimenting with AI agents, five per cent willing
            to put them into production. Their chief product officer called
            that eighty-point chasm a trust deficit, and he is right, but I
            would put it more sharply. <em>The security gap is the adoption
            gap.</em> Every organisation stuck at the pilot stage is stuck
            there because nobody can answer the question &lsquo;what exactly
            can this thing do at three in the morning when no one is
            watching&rsquo; &mdash; and that question is answered by identity,
            allowlists and a broker, not by a better model. The commercial
            prize for solving agentic security is therefore not a security
            budget. It is the entire agentic AI market, currently sitting in a
            queue behind it.
          </p>

          <p>
            <strong>CrowdStrike</strong> owns the agentic-SOC narrative more
            thoroughly than anyone. <strong>Charlotte AI Agentic
            Response</strong> arrived at RSAC 2025; the{' '}
            <strong>Agentic Security Workforce</strong> followed at Fal.Con in
            September with seven mission-ready agents &mdash; malware analysis,
            hunting, exposure prioritisation, search analysis, correlation-rule
            generation, data transformation and workflow generation &mdash;
            alongside <strong>AgentWorks</strong>, a no-code builder for
            rolling your own, and <strong>Charlotte Agentic SOAR</strong> in
            November. MCP is the connective tissue throughout, with native AI
            Detection and Response governance layered over it, which is at
            least an honest acknowledgement that their own agents constitute an
            attack surface. My one reservation is evidentiary: the efficacy
            claims are almost entirely qualitative. &lsquo;Machine speed&rsquo;
            is a lovely phrase and not a number, and I have yet to see a
            published MTTR figure one could hold them to.
          </p>

          <p>
            <strong>Palo Alto Networks</strong> is the other heavyweight and
            has been shopping with real intent: <strong>Protect AI</strong>
            {' '}for somewhere around six hundred and fifty to seven hundred
            million dollars, folded into <strong>Prisma AIRS</strong>, which
            protects AI applications, models, data and agents. The{' '}
            <strong>AIRS MCP Server</strong> validates every tool invocation
            and flags tool-definition and tool-input poisoning &mdash; which
            is, pleasingly, the gateway-as-enforcement-point pattern this essay
            has been advocating, sold as a product. AIRS 2.0 brought five
            hundred red-team attack types; 3.0 extends to discovering agents
            across cloud, SaaS, endpoint and browser, including what the
            marketing department has gamely christened &lsquo;vibe coding
            agents&rsquo;. <strong>Cortex AgentiX</strong> is the agentic SOC
            play, trained on 1.2 billion playbook executions, with role-based
            access and human approval for impactful actions &mdash; and a
            claimed ninety-eight per cent MTTR reduction which is, I must note
            with the weariness of a man who has read many such decks,
            vendor-sourced and unaudited. They are also acquiring{' '}
            <strong>CyberArk</strong>, which tells you exactly how valuable
            machine identity is about to become.
          </p>

          <p>
            <strong>Microsoft&rsquo;s Security Copilot agents</strong> deserve a
            closing mention for one detail of design rather than for their
            (genuinely good, genuinely measured) triage numbers: every agent
            gets its own identity and its own scoped permissions. That is
            per-agent authentication shipped as a default in a mass-market
            product, and while it is not yet the per-task,
            plan-hash-bound credential I shall advocate shortly, it is the
            correct direction of travel and rather more than most of the field
            manages.
          </p>

          <h3>The startups, in three buckets</h3>

          <p>
            The venture money has sorted itself into three functional piles,
            which is a useful map when the logos start to blur. There is{' '}
            <strong>agent identity and access governance</strong> &mdash; Oasis
            Security (a hundred and twenty million dollar Series B at RSAC this
            year), Astrix, Entro, Linx, and Aim Security, now absorbed by Cato
            &mdash; all of them selling the answer to the
            forty-five-to-one non-human identity problem. There is{' '}
            <strong>runtime and MCP defence</strong> &mdash; Zenity, whose
            researchers gave us Agent Flayer; Prompt Security, acquired by
            SentinelOne; Lakera, acquired by Check Point, whose Guard product
            answers injection queries in under fifty milliseconds; plus Noma,
            Straiker, Lasso, Pillar, HiddenLayer and Witness AI. And there is{' '}
            <strong>policy and gateway infrastructure</strong>, which is
            refreshingly open-source-heavy: Solo.io AgentGateway (Rust, Cedar,
            now under the Linux Foundation), Red Hat&rsquo;s MCP Gateway,
            ToolHive, IBM ContextForge, Permit.io and Cerbos, with AWS Bedrock
            AgentCore as the managed equivalent. Special mention to{' '}
            <strong>XBOW</strong>, which raised a hundred and twenty million
            dollars at a billion-plus valuation for autonomous <em>offensive</em>{' '}
            security, and which I include partly for completeness and partly
            because somebody ought to say aloud that the same capital markets
            funding your defences are funding the other thing too.
          </p>

          <p>
            Where does this leave a buyer? My honest reading is that you should
            buy the planes that are solved problems and own the ones that
            encode your judgement. Nobody should be writing their own
            cryptographic workload identity in 2026, and nobody should be
            outsourcing their tool-necessity policy, because that policy{' '}
            <em>is</em> your security posture expressed as code. The map:
          </p>

          <MermaidDiagram
            chart={VENDOR_MAP}
            aria-label='Buy-versus-own guidance across the five planes of the agentic security stack, with representative commercial and open-source options'
          />

          <p>
            A final word on reading vendor claims, offered in a spirit of
            public service. When a deck promises &lsquo;autonomous&rsquo;, ask
            what happens when it is wrong and who signs for it. When it
            promises a percentage, ask whose workload produced it and whether
            anyone independent has reproduced it &mdash; the answer, for
            essentially every figure in this section, is no. And when it
            promises to solve prompt injection, recall that the best
            peer-reviewed detectors take AgentDojo attack success from
            twenty-five per cent down to about eight, which is a fine day&rsquo;s
            work and is not a solution. The strongest evidence in this entire
            field remains a Microsoft randomised controlled trial about queue
            sorting and a single-author preprint about deterministic
            authorisation. Buy accordingly: platforms for correlation and
            speed, open source for the control plane you must still own when
            the contract lapses or the ministry intervenes.
          </p>

          <h2>Defending against one&rsquo;s own butler</h2>

          <p>
            Which brings us to the constructive heart of the essay: what does
            one actually <em>build</em>? The guiding principle, established by
            every benchmark cited above, is that durable defence is
            architectural, not rhetorical. You cannot talk an agent into being
            safe any more than you can talk a river into flowing uphill;
            safety prompts move the needle 1.22 per cent, and prayer has a
            similar effect size. What works is structure: identity, scoping,
            independent authorisation, egress control, and observability. Let
            us take them in order, from the foundation to the capstone.
          </p>

          <h3>First, see the agent at all</h3>

          <p>
            The foundational problem is observability, because your EDR
            watches outcomes &mdash; files written, packets sent &mdash; while
            the agent&rsquo;s mischief lives in the causal chain: the prompt,
            the reasoning, the tool call, the result. Uber&rsquo;s ADR system,
            the anchor paper in this space and a genuinely impressive piece of
            engineering, closes precisely that gap: a lightweight sensor parses
            the local session caches of the AI coding tools on seven thousand
            two hundred hosts (ten thousand sessions a day) to reconstruct what
            each agent was asked, what it reasoned, and what it did; a cheap
            model triages, an expensive one investigates, and an offline
            red-team loop keeps discovering new attack variants to feed back
            in. The honest numbers: ninety-seven per cent precision on
            credential-leak prevention, but sixty-seven per cent detection on
            the attack benchmark. Read that second figure again. The best
            purpose-built detection system in the public literature, deployed
            by a company that does not lack for engineers, misses a third of
            attacks &mdash; deliberately, trading recall for the precision that
            keeps a production SOC sane. Detection is necessary. Detection is
            not sufficient. What is sufficient, or nearer to it, is making bad
            things impossible rather than merely visible.
          </p>

          <h3>Second, an identity of one&rsquo;s own</h3>

          <p>
            The first structural sin of enterprise agent deployments is the
            borrowed credential: the agent running on a human&rsquo;s session,
            API key or OAuth token. The consequences are threefold and each is
            fatal to something you care about: every action the agent takes is
            legally and forensically <em>yours</em>; its blast radius is
            everything you have ever accumulated access to; and the only kill
            switch that exists also kills you. The remedy is per-task agent
            authentication &mdash; the agent as a first-class, cryptographically
            attested non-human identity (SPIFFE/SPIRE is the mature open
            standard), with the human preserved as delegating subject through
            OAuth token exchange, the token bound to a single audience, and the
            whole credential scoped to the task and alive for minutes, not
            months.
          </p>

          <MermaidDiagram
            chart={TASK_TOKEN}
            aria-label='Per-task agent authentication: the orchestrator computes a plan hash and receives a short-lived, audience-bound, plan-scoped token'
          />

          <p>
            The plan hash is the load-bearing idea. When a task is created,
            the orchestrator hashes the task description together with the
            approved plan and tool set; that hash rides inside the token as a
            claim; and every tool call is checked against it. A call inside
            the plan executes. A call outside the plan &mdash; the agent,
            mid-refund, suddenly developing an interest in the payroll export
            &mdash; is denied automatically, by mathematics rather than by
            anyone&rsquo;s vigilance. The agent cannot drift beyond its brief
            because its brief is cryptographically stapled to its passport.
          </p>

          <h3>Third, least privilege, applied to tools</h3>

          <p>
            Do not grant an agent the union of every tool it might ever want;
            grant the minimal set for the task at hand, deny by default, and
            derive the sets from observed usage as your telemetry matures.
            This is the eighty-twenty win of the entire agentic defence
            programme &mdash; it requires no new infrastructure, only a
            decision &mdash; and yet it is where I see the most resistance,
            because convenience is a hell of a drug. One honest caveat,
            courtesy of the research: strictness has a utility tax. In the
            aiAuthZ evaluation, a rigid payee allowlist dropped clean-task
            utility from a hundred to eighty per cent by blocking one
            legitimate first-time payment. Budget for it, and provide a
            human-escalation path that is cheaper than the meeting in which
            the exception is currently decided.
          </p>

          <h3>Fourth, and the capstone: the Tool Necessity Broker</h3>

          <p>
            Now the strongest idea in the whole design space, and the one I
            would build if I built only one. The orchestrator requests ten
            tools for a task. An independent system &mdash; off-host, in a
            separate trust domain, holding no credentials the agent can reach
            &mdash; sits between the agent and the tools and asks, of every
            single call: is this actually necessary, and is it permitted?
            The prior art runs from clever-but-porous (dual-LLM designs, where
            a privileged planner never touches untrusted data) through
            formal-but-heavy (DeepMind&rsquo;s CaMeL, enforcing capabilities on
            every value) to the decisively empirical: the aiAuthZ paper, which
            published the strongest result in the field this year. An
            off-host, identity-bound authoriser with a deterministic
            three-gate policy &mdash; role, then argument constraints, then
            rate limit &mdash; drove residual attack success to zero per cent
            across all fifteen models tested, with thirty microseconds of
            decision latency. Note <em>why</em> it worked: not because the
            verifier was clever, but because the decision was deterministic and
            physically out of the agent&rsquo;s reach. A guard LLM that reads
            the same poisoned context as the agent is merely a second victim
            with a job title.
          </p>

          <MermaidDiagram
            chart={NECESSITY_BROKER}
            aria-label='The Tool Necessity Broker: deterministic policy first, advisory model judgment second, human review for sensitive combinations'
          />

          <p>
            Three design rules, hard-won. First, the deterministic layer
            carries the guarantee; the model-based layer &mdash; which scores
            whether requesting those ten tools is plausible for the stated
            task &mdash; is advisory only, sees the structured plan and never
            the untrusted content, and escalates rather than authorises. Let a
            context-reading LLM make the final call and you have rebuilt the
            injectable surface you were defending, at considerable expense and
            with extra latency. Second, never put a synchronous model call in
            the per-tool-call path; deterministic policy evaluation is
            sub-millisecond, an LLM round-trip is one to twelve seconds, and
            your agents will die of old age. Third &mdash; and the authors
            deserve eternal credit for publishing their own limitation &mdash;
            the broker only works if the agent has no tool path that bypasses
            it. In end-to-end testing, when the model had built-in tools, it
            simply performed the sensitive action through those and never
            consulted the gateway at all. Which means egress-locking the
            execution environment is not a hardening step; it is the
            precondition. The velvet rope works only if there is no side door,
            and agents, like nightclub patrons, are remarkably inventive about
            side doors. Fail closed for state-changing tools when the broker is
            unreachable; fail open, if you must, only for read-only ones.
          </p>

          <p>
            And a word against my own enthusiasm: for a read-only agent &mdash;
            the doc-summariser that cannot write, cannot send, cannot spend
            &mdash; the full broker is over-engineering, because the trifecta is
            absent and scope restriction plus observability suffice. The broker
            earns its complexity precisely when the agent can touch private
            data <em>and</em> act on the world. Build the inventory first, the
            identity second, the allowlists third, and the arbiter last. It is
            the capstone, not the foundation, and organisations that invert
            that order end up with a magnificent authorisation layer guarding
            an estate they cannot enumerate.
          </p>

          <p>
            Round it out with the unglamorous plumbing: secrets resolved by a
            credential broker on the gateway (referenced by name, minted
            post-authorisation, never resident in the agent&rsquo;s memory);
            MCP servers treated as untrusted third-party code &mdash; scanned,
            vetted, pinned to exact versions, sourced from a signed registry;
            and a tamper-evident, hash-chained audit log whose head is anchored
            somewhere a compromised broker cannot rewrite, because the audit
            trail is what separates an incident from a mystery.
          </p>

          <h2>The shape of storms to come</h2>

          <p>
            Permit me a short act of disciplined prophecy &mdash; disciplined,
            because each item below is an extrapolation from something already
            demonstrated, not a fantasy. Over the next twelve to thirty-six
            months, I expect four developments, and I shall lay them out in
            ascending order of discomfort.
          </p>

          <p>
            First, <strong>agent worms in the wild</strong>. Morris II was a
            laboratory result, but consider what the enterprise is presently
            doing, with the best of intentions: interconnecting agents, giving
            them shared memory, and tuning their agency upward for
            productivity. In epidemiological terms, we are raising the basic
            reproduction number of a self-replicating prompt as a side effect
            of our OKRs. The first real worm will not announce itself as
            malware; it will present as a strangely popular instruction
            circulating through shared inboxes and knowledge bases, which is
            why ACL-trimmed retrieval stores and provenance labels on content
            &mdash; knowing which bytes are trusted &mdash; stop being optional.
          </p>

          <p>
            Second, <strong>the orchestrator becomes the crown jewel</strong>.
            As the planner/router accumulates more authority than any single
            tool, attacks shift from tricking the model to compromising the
            planner &mdash; and control-flow hijacking already succeeds
            fifty-six per cent of the time in multi-agent settings. The
            necessity-broker pattern is the counter, because it removes
            authorisation from the planner&rsquo;s jurisdiction entirely: the
            general may draw the battle plan, but the paymaster is deaf,
            literal, and immune to eloquence.
          </p>

          <p>
            Third, <strong>identity abuse at machine scale, plus sleeper
            payloads</strong>. With non-human identities outnumbering humans
            forty-five to one and barely a quarter of organisations able to
            trace an agent to its sponsor, stolen agent tokens become the
            default initial-access vector &mdash; the same credential economy
            that fuels today&rsquo;s intrusions, transplanted onto a population
            nobody is watching. Expect, too, dormant instructions planted in
            vector stores and long-term memory today, designed to trigger on
            some future context; the time-bomb as a retrieval result. And
            expect the deepfake quorum to migrate into your
            human-in-the-loop: when the approval checkpoint is a video call,
            the attacker&rsquo;s job is to synthesise the approver. The Arup
            clerk has shown us the film; we have merely to wait for the
            sequel in which the &lsquo;human approval&rsquo; itself is
            counterfeited.
          </p>

          <p>
            Fourth, and most speculative, <strong>the poisoning of the
            marketplaces</strong>. As skill and tool registries standardise
            &mdash; and they will, because our industry cannot resist an app
            store &mdash; they inherit the npm problem with an agentic twist:
            Snyk&rsquo;s audit of nearly four thousand community agent skills
            found over thirteen per cent with critical-level issues and
            seventy-six confirmed malicious payloads, ninety-one per cent of
            which combined prompt injection with traditional malware. The
            trojan horse of the agentic era is not a binary; it is a
            five-star plugin with excellent documentation.
          </p>

          <h2>The unified edifice, and what actually pays</h2>

          <p>
            If you have followed the perambulation this far, you will notice
            that the agentic defences and the classical defences are not two
            programmes but one: the same identity fabric (passkeys for humans,
            SPIFFE for workloads and agents), the same policy language (OPA or
            Cedar, from Kubernetes admission to tool calls), the same gateway
            pattern (SASE for humans, service mesh for workloads, MCP gateway
            for agents), the same observability spine draining into one SIEM,
            and the same two controls appearing at every turn like a leitmotif
            in a Wagner opera &mdash; egress control and phishing-resistant
            identity &mdash; because they sit athwart the kill chain at both
            ends. Map the defences to the attack lifecycle and the picture is
            almost embarrassingly clear:
          </p>

          <MermaidDiagram
            chart={DEFENSE_LIFECYCLE}
            aria-label='Defence in depth mapped to the attack lifecycle, from initial access to exfiltration'
          />

          <p>
            And here, after nine thousand words of machinery, is the
            conclusion that will disappoint the keynote circuit: the controls
            that pay off in 2026 are unglamorous. Passkeys kill the credential
            vector that starts a fifth of breaches. Egress control kills both
            classic exfiltration and the agentic bypass path. Immutable,
            tested backups kill ransomware&rsquo;s leverage. OIDC federation
            kills the keys the worms were built to steal. Certificate
            automation and hybrid post-quantum key exchange kill two dated,
            certain, entirely avoidable future failures. The AI defence
            machinery &mdash; the brokers, the triage agents, the ADR sensors
            &mdash; is a force multiplier on top of those five, and I say this
            as someone who has just spent four sections singing its praises.
            Nobody writes a ballad about egress control. Write one anyway.
          </p>

          <h2>What to do on Monday morning</h2>

          <p>
            Ten things, in order, none requiring a procurement cycle:
          </p>

          <ol>
            <li>
              <strong>Stand up the agent and workload inventory.</strong>{' '}
              Owner, identity, tool scope, data class &mdash; for every agent
              and service. You cannot defend, or run incident response on, an
              estate you have not enumerated. Join the twenty-eight per cent
              who can trace an agent to a human sponsor; then beat them.
            </li>
            <li>
              <strong>Kill one long-lived cloud key.</strong> Flip a single CI
              pipeline to OIDC federation today. Repeat until none remain.
            </li>
            <li>
              <strong>SHA-pin every third-party GitHub Action</strong> and turn
              on secret scanning with push protection. Tags lie; hashes do
              not.
            </li>
            <li>
              <strong>Put every administrator on passkeys.</strong> This closes
              the number one initial-access vector, full stop. Everyone else
              next quarter.
            </li>
            <li>
              <strong>Impose deny-by-default tool allowlists per task
              class.</strong> The highest-ROI agentic control in existence,
              and it requires no new infrastructure &mdash; only the decision.
            </li>
            <li>
              <strong>Apply the lethal-trifecta rule as policy.</strong> Any
              agent or service that can simultaneously read private data,
              ingest untrusted content, and communicate externally goes on the
              review list today.
            </li>
            <li>
              <strong>Verify that your backups are immutable and actually
              restore.</strong> Run one test restore, on a clock, with
              witnesses. A backup you have never restored is a hope, written
              to disk.
            </li>
            <li>
              <strong>Turn on agent-native and egress telemetry.</strong>{' '}
              Capture the causal chain &mdash; intent, reasoning, tool calls
              &mdash; that your EDR cannot see, and put your CI runners in
              egress-audit mode so the next tj-actions whispers into a
              microphone.
            </li>
            <li>
              <strong>Confirm your CERT-In six-hour path works.</strong> Who
              files, from which alert, with a hundred and eighty days of logs
              retained in India? Tabletop it once, before you have to do it
              for real.
            </li>
            <li>
              <strong>Pick your gateway.</strong> Choose one MCP gateway and
              commit to routing a hundred per cent of tool calls through it.
              It is the precondition for every stronger control that follows,
              and a bypassed gateway is a decorative one.
            </li>
          </ol>

          <h2>Coda</h2>

          <p>
            There is a temptation, after a survey of this length, to conclude
            that the situation is hopeless &mdash; that with twenty-two-second
            hand-offs, hypnotisable butlers, and worms that write themselves,
            the rational course is to quietly retrain as a potter. I would
            resist it. The arms race is real, but as of this writing it is
            being run by participants mostly choosing to hold back: the
            defensive models are shipping faster than offensive capability is
            proliferating to the merely curious, and the window that creates
            &mdash; this window, now &mdash; is the opportunity. Security was
            never a destination one arrives at, nor a product one purchases
            from a smiling account executive; it is a practice, like
            cleanliness, like constitutionalism, like the violin &mdash;
            maintained daily or not at all. The fortress with the well-kept
            moat is not the fortress that is never attacked. It is simply the
            fortress the attacker drives past, shaking his head, on the way to
            one whose owners mistook the warranty for the wall.
          </p>

          <p>
            Eternal vigilance, as the old slogan has it, is the price of
            liberty. In 2026 it comes with a service-level objective, a
            six-hour reporting clock, and &mdash; if you have read this far
            &mdash; a to-do list for Monday. Off you go.
          </p>

          <h2 id='faq'>Frequently asked questions</h2>

          {FAQ_ITEMS.map((item) => (
            <section key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </section>
          ))}

          <h2>References and further reading</h2>

          <p>
            The claims above lean on the following; figures flagged as
            vendor-sourced should be read with the customary grain of salt.
          </p>

          <h3>Papers and benchmarks</h3>
          <ul className='blog-prose__refs'>
            <li>
              Li, C., et al. &ldquo;ADR: An Agentic Detection System for
              Enterprise Agentic AI Security.&rdquo; Uber + MIT,{' '}
              <em>MLSys 2026</em> (Industry Track).{' '}
              <a
                href='https://arxiv.org/abs/2605.17380'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2605.17380
              </a>
              . Source of the observability architecture, the 7,200-host
              deployment, 97.2% credential-prevention precision and 67%
              detection figures.
            </li>
            <li>
              &ldquo;aiAuthZ: off-host, identity-bound deterministic tool-call
              authorisation.&rdquo;{' '}
              <a
                href='https://arxiv.org/abs/2607.05518'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2607.05518
              </a>{' '}
              (2026). Single-author preprint; source of the 0% residual
              attack-success result across 15 models, ~0.03&nbsp;ms latency,
              the utility-tax finding, and the built-in-tools bypass caveat.
            </li>
            <li>
              Microsoft Research. Randomised controlled trial of AI-assisted
              alert triage.{' '}
              <a
                href='https://arxiv.org/abs/2511.13860'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2511.13860
              </a>{' '}
              (2025). 78% faster triage, +77% verdict accuracy, 83% of gains
              from queue prioritisation.
            </li>
            <li>
              AgentDojo, Agent Security Bench, WASP, MCPTox and MCP-SafetyBench
              benchmark suites (2024&ndash;2025). Sources of the attack-success
              statistics, the 1.22% safety-prompt effect, and the
              &ldquo;security by incompetence&rdquo; finding —{' '}
              <a
                href='https://arxiv.org/abs/2406.13352'
                target='_blank'
                rel='noopener noreferrer'
              >
                AgentDojo
              </a>
              ;{' '}
              <a
                href='https://arxiv.org/abs/2410.02644'
                target='_blank'
                rel='noopener noreferrer'
              >
                Agent Security Bench
              </a>
              ;{' '}
              <a
                href='https://arxiv.org/abs/2504.18575'
                target='_blank'
                rel='noopener noreferrer'
              >
                WASP
              </a>
              ;{' '}
              <a
                href='https://arxiv.org/abs/2508.14925'
                target='_blank'
                rel='noopener noreferrer'
              >
                MCPTox
              </a>
              ;{' '}
              <a
                href='https://arxiv.org/abs/2512.15163'
                target='_blank'
                rel='noopener noreferrer'
              >
                MCP-SafetyBench
              </a>
              .
            </li>
            <li>
              Willison, S. The{' '}
              <a
                href='https://simonwillison.net/2023/Apr/25/dual-llm-pattern/'
                target='_blank'
                rel='noopener noreferrer'
              >
                dual-LLM pattern
              </a>{' '}
              (2023) and the{' '}
              <a
                href='https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/'
                target='_blank'
                rel='noopener noreferrer'
              >
                lethal trifecta
              </a>{' '}
              framing.
            </li>
            <li>
              &ldquo;Morris II&rdquo;: zero-click self-replicating prompt worm
              across GPT-4, Gemini Pro and LLaVA (2024) —{' '}
              <a
                href='https://arxiv.org/abs/2403.02817'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2403.02817
              </a>
              ; DeepMind&rsquo;s CaMeL capability-enforcement design (2025) —{' '}
              <a
                href='https://arxiv.org/abs/2503.18813'
                target='_blank'
                rel='noopener noreferrer'
              >
                arXiv:2503.18813
              </a>
              .
            </li>
          </ul>

          <h3>Threat reporting and industry data</h3>
          <ul className='blog-prose__refs'>
            <li>
              Anthropic.{' '}
              <a
                href='https://www.anthropic.com/news/disrupting-AI-espionage'
                target='_blank'
                rel='noopener noreferrer'
              >
                Disrupting the first reported AI-orchestrated cyber espionage
                campaign
              </a>{' '}
              (GTG-1002). November 13, 2025 — read alongside the public
              scepticism of Kevin Beaumont and Daniel Card, and
              Anthropic&rsquo;s own caveat about fabricated findings.
            </li>
            <li>
              CrowdStrike{' '}
              <a
                href='https://www.crowdstrike.com/en-us/global-threat-report/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <em>Global Threat Report 2026</em>
              </a>
              : 29-minute average breakout (fastest 27&nbsp;s), 82%
              malware-free intrusions. Mandiant{' '}
              <a
                href='https://cloud.google.com/blog/topics/threat-intelligence/m-trends-2026'
                target='_blank'
                rel='noopener noreferrer'
              >
                <em>M-Trends 2026</em>
              </a>
              : 22-second median hand-off, 14-day median dwell (122 for
              espionage), vishing as #2 initial vector (11%). Verizon{' '}
              <a
                href='https://www.verizon.com/business/resources/reports/dbir/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <em>DBIR 2025</em>
              </a>
              : stolen credentials at 22% of breaches. IBM{' '}
              <a
                href='https://www.ibm.com/reports/data-breach'
                target='_blank'
                rel='noopener noreferrer'
              >
                <em>Cost of a Data Breach</em>
              </a>
              : 241-day identify-plus-contain, savings from AI/automation and
              tested IR plans.
            </li>
            <li>
              CISA/FBI joint advisory{' '}
              <a
                href='https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-109a'
                target='_blank'
                rel='noopener noreferrer'
              >
                AA24-109A
              </a>{' '}
              (Akira ransomware, updated November 2025); Cloudflare{' '}
              <a
                href='https://blog.cloudflare.com/ddos-threat-report-for-2025-q4/'
                target='_blank'
                rel='noopener noreferrer'
              >
                quarterly DDoS reports
              </a>{' '}
              (31.4&nbsp;Tbps record, 47.1M attacks in 2025); Snyk&rsquo;s
              ToxicSkills agent-skill audit (February 2026); CSA Non-Human
              Identity Governance Vacuum whitepaper (May 2026).
            </li>
            <li>
              Veracode{' '}
              <a
                href='https://www.veracode.com/blog/ai-generated-code-security-risks/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <em>2025 GenAI Code Security Report</em>
              </a>{' '}
              (45% failure rate, 2.74&times; vulnerability density); Pearce et
              al.,{' '}
              <a
                href='https://arxiv.org/abs/2108.09293'
                target='_blank'
                rel='noopener noreferrer'
              >
                Asleep at the Keyboard?
              </a>{' '}
              (2022); CSA and Apiiro research on AI-assisted commit hygiene.
            </li>
          </ul>

          <h3>Vendor products and platform claims</h3>
          <ul className='blog-prose__refs'>
            <li>
              Frontier cyber models: Anthropic Mythos 5 / Fable 5 and{' '}
              <a
                href='https://www.anthropic.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Project Glasswing
              </a>{' '}
              (export-control shutdown June 12, 2026; partial restore June
              26&ndash;30); Microsoft{' '}
              <strong>MAI-Cyber-1-Flash</strong> / MDASH / Project Perception
              (launched July 27, 2026; Perception preview August 3, 2026;
              95.95% CyberGym); Google Big Sleep, CodeMender and Gemini 3.5
              Flash Cyber; OpenAI Aardvark (private beta).
            </li>
            <li>
              Platforms: Cisco{' '}
              <a
                href='https://blogs.cisco.com/ai/introducing-antares-the-most-efficient-open-weight-ai-models-for-vulnerability-localization'
                target='_blank'
                rel='noopener noreferrer'
              >
                Antares
              </a>{' '}
              (open-weight vulnerability-localisation SLMs, July 2026), AI
              Defense, DefenseClaw, Foundation-Sec-8B, Hypershield; CrowdStrike
              Charlotte AI Agentic Response / Agentic Security Workforce /
              Charlotte Agentic SOAR (Fal.Con 2025); Palo Alto Prisma AIRS /
              Cortex AgentiX (Protect AI acquisition; vendor-sourced MTTR
              claims); Microsoft Security Copilot agents (Ignite 2025 RCT
              numbers).
            </li>
            <li>
              Cisco Newsroom survey (March 2026): 85% experimenting with AI
              agents, 5% in production &mdash; the eighty-point trust gap
              cited throughout.
            </li>
          </ul>

          <h3>Vulnerabilities, standards and rules</h3>
          <ul className='blog-prose__refs'>
            <li>
              <a
                href='https://nvd.nist.gov/vuln/detail/CVE-2025-30066'
                target='_blank'
                rel='noopener noreferrer'
              >
                CVE-2025-30066
              </a>{' '}
              (tj-actions/changed-files),{' '}
              <a
                href='https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction'
                target='_blank'
                rel='noopener noreferrer'
              >
                CVE-2025-30154
              </a>{' '}
              (reviewdog),{' '}
              <a
                href='https://nvd.nist.gov/vuln/detail/CVE-2025-6514'
                target='_blank'
                rel='noopener noreferrer'
              >
                CVE-2025-6514
              </a>{' '}
              (mcp-remote RCE, CVSS 9.6, Or Peles / JFrog),{' '}
              <a
                href='https://nvd.nist.gov/vuln/detail/CVE-2025-54136'
                target='_blank'
                rel='noopener noreferrer'
              >
                CVE-2025-54136
              </a>{' '}
              (Cursor rug-pull),{' '}
              <a
                href='https://nvd.nist.gov/vuln/detail/CVE-2025-6965'
                target='_blank'
                rel='noopener noreferrer'
              >
                CVE-2025-6965
              </a>{' '}
              (SQLite, found by Google Big Sleep).
            </li>
            <li>
              <a
                href='https://www.rfc-editor.org/rfc/rfc8693.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                RFC 8693
              </a>{' '}
              (OAuth token exchange; delegation-splicing weakness documented by
              the IETF OAuth WG in 2026),{' '}
              <a
                href='https://www.rfc-editor.org/rfc/rfc8707.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                RFC 8707
              </a>{' '}
              (resource indicators), OAuth 2.1 + PKCE, DPoP/mTLS, CAEP,{' '}
              <a
                href='https://spiffe.io/'
                target='_blank'
                rel='noopener noreferrer'
              >
                SPIFFE/SPIRE
              </a>
              ,{' '}
              <a
                href='https://opentelemetry.io/docs/specs/semconv/gen-ai/'
                target='_blank'
                rel='noopener noreferrer'
              >
                OpenTelemetry GenAI semantic conventions
              </a>
              .
            </li>
            <li>
              NIST{' '}
              <a
                href='https://csrc.nist.gov/pubs/fips/203/final'
                target='_blank'
                rel='noopener noreferrer'
              >
                FIPS 203
              </a>
              /{' '}
              <a
                href='https://csrc.nist.gov/pubs/fips/204/final'
                target='_blank'
                rel='noopener noreferrer'
              >
                204
              </a>
              /{' '}
              <a
                href='https://csrc.nist.gov/pubs/fips/205/final'
                target='_blank'
                rel='noopener noreferrer'
              >
                205
              </a>{' '}
              (post-quantum standards, August 2024); CA/Browser Forum SC-081v3
              (TLS lifetimes to 47 days by 2029); NIST{' '}
              <a
                href='https://csrc.nist.gov/pubs/sp/800/207/final'
                target='_blank'
                rel='noopener noreferrer'
              >
                SP 800-207
              </a>{' '}
              and{' '}
              <a
                href='https://www.nccoe.nist.gov/projects/implementing-zero-trust-architecture'
                target='_blank'
                rel='noopener noreferrer'
              >
                SP 1800-35
              </a>{' '}
              (Zero Trust);{' '}
              <a
                href='https://www.cert-in.org.in/'
                target='_blank'
                rel='noopener noreferrer'
              >
                CERT-In
              </a>{' '}
              Direction 20(3)/2022 (6-hour reporting, 180-day in-country log
              retention).
            </li>
          </ul>

          <h3>On this site</h3>
          <ul className='blog-prose__refs'>
            <li>
              <Link href='/blogs/anatomy-of-an-agentic-ai-system'>
                Anatomy of an Agentic AI System
              </Link>{' '}
              — sandboxes, egress allowlists, and permission-aware retrieval —
              the build-side of this security argument.
            </li>
            <li>
              <Link href='/blogs/the-rope-sellers-buy-a-rope-machine'>
                The Rope Sellers Buy a Rope Machine
              </Link>{' '}
              — why the industry is shipping agents into production faster than
              it is securing them.
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
