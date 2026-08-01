import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogCover } from '@/components/blog/blog-cover';
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

const SLUG = 'anatomy-of-an-agentic-ai-system';
const post = getPostBySlug(SLUG)!;
const url = postUrl(SLUG);
const ogAbsolute = `${SITE_URL}${post.ogImage}`;
const publishedIso = `${post.date}T12:00:00.000Z`;

const CHART_0 = `
flowchart TB
    subgraph CLIENTS["Clients"]
        UI["Web app<br/>React + assistant-ui"]
        BOT["Slack / Teams bot"]
        IDE["IDE plugin /<br/>browser extension"]
    end

    subgraph EDGE["Edge & Identity"]
        BFF["API / BFF<br/>FastAPI"]
        IDP["IdP — Okta / Entra<br/>OIDC + SCIM"]
        LGW["LLM Gateway — LiteLLM<br/>virtual keys, team budgets,<br/>model routing, fallbacks"]
    end

    subgraph ORCH["Orchestration Plane"]
        GRD["Guardrails<br/>input + output"]
        IC["Intent classifier<br/>embedding router<br/>+ cheap-LLM fallback"]
        QU["Query understanding<br/>rewrite, decompose,<br/>filter extraction"]
        LG["LangGraph orchestrator<br/>planner + DAG executor<br/>PostgresSaver checkpoints"]
        AREG["Agent registry<br/>manifests + invocation ACLs"]
        MEM["Memory service<br/>scratchpad, profile vault,<br/>auto-dream worker"]
    end

    subgraph RETR["Retrieval Plane"]
        HYB["Hybrid retrieval<br/>dense + sparse<br/>ACL-filtered at query time"]
        FUSE["RRF fusion k=60"]
        RANK["Reranker — TEI<br/>Jina v3 / bge-reranker"]
        GRAPHQ["Graph query service<br/>multi-hop — optional"]
    end

    subgraph EXEC["Execution Plane"]
        MCP["MCP tool servers<br/>Jira, Drive, GitHub, ..."]
        SBX["Agent sandbox<br/>Firecracker / E2B<br/>egress allowlist"]
        CEL["Celery workers<br/>async + batch"]
        MQ[("RabbitMQ<br/>priority queues + DLX/DLQ")]
    end

    subgraph SERVE["Model Serving"]
        VLLM["vLLM — GPU pool<br/>self-hosted utility LLMs<br/>prefix cache, FP8/AWQ"]
        TEI["TEI — GPU/CPU<br/>Qwen3-Embedding<br/>+ reranker"]
        API["Frontier APIs<br/>Anthropic / OpenAI / Gemini<br/>via gateway"]
    end

    subgraph INGEST["Ingestion Plane"]
        CONN["Connectors<br/>CDC webhooks + crawlers"]
        PROC["Type-aware chunkers<br/>+ contextual prefix + PII"]
        PSYNC["Permission sync<br/>ACL mirroring"]
    end

    subgraph DATA["Data Plane"]
        QDR[("Qdrant cluster<br/>dense + sparse vectors<br/>+ per-chunk ACL payload")]
        PG[("Postgres<br/>perm mirror, lineage,<br/>checkpoints, registry")]
        NEO[("Neo4j — optional<br/>knowledge graph")]
        RED[("Redis<br/>semantic cache, rate limits,<br/>session state")]
        OBJ[("Object store S3/GCS<br/>raw documents")]
        CHDB[("ClickHouse<br/>Langfuse v3 traces")]
    end

    subgraph OBS["Observability"]
        OTEL["OTel collector"]
        LFUSE["Langfuse"]
        PROM["Prometheus + Grafana"]
        ELK["OpenSearch / ELK"]
    end

    UI --> BFF
    BOT --> BFF
    IDE --> BFF
    BFF <--> IDP
    BFF --> RED
    BFF --> GRD --> IC
    IC -->|simple| LG
    IC -->|medium / hard| QU --> LG
    IC -->|bad| GRD
    LG --> AREG
    LG --> MEM
    LG --> HYB --> FUSE --> RANK --> LG
    LG --> GRAPHQ --> NEO
    HYB --> QDR
    HYB -->|ACL filter| PG
    HYB --> TEI
    LG --> MCP
    LG --> SBX
    LG --> MQ --> CEL
    LG --> LGW
    QU --> LGW
    LGW --> VLLM
    LGW --> API
    LGW --> RED
    MEM --> PG
    MEM --> QDR
    LG -->|checkpoints| PG
    CONN --> MQ
    CEL --> PROC --> TEI
    PROC --> QDR
    PROC --> NEO
    PROC --> OBJ
    CONN --> PSYNC --> PG
    BFF -.traces.-> OTEL
    LG -.traces.-> OTEL
    LGW -.traces.-> OTEL
    OTEL --> LFUSE --> CHDB
    OTEL --> PROM
    OTEL --> ELK
`;
const CHART_1 = `
flowchart TD
    A[Source systems<br/>Drive/Slack/Jira/Confluence] -->|CDC webhook/changelog| B[Connector]
    B --> C{Fetch content + ACL + metadata}
    C --> D[Identity resolution]
    C --> E[PII detection/masking]
    E --> F[Type-aware chunker]
    F --> G[Contextual retrieval<br/>prepend doc context]
    G --> H[Embed<br/>Qwen3 / Gemini]
    H --> I[(Vector DB - Qdrant<br/>+ per-chunk ACL)]
    C --> J[(Permission mirror - Postgres)]
    C --> K[(Object store - raw docs)]
    H --> L[(Graph store - Neo4j<br/>optional)]
    B --> M[Lineage tracker - Postgres]
    M -.deletion propagation.-> I
    M -.deletion propagation.-> L
`;
const CHART_2 = `
flowchart TD
    Q[User message] --> IC{Intent classifier<br/>embedding router + LLM fallback}
    IC -->|simple| S[Direct LLM answer<br/>no retrieval]
    IC -->|bad| G[Guardrails:<br/>refuse/deflect + log + flag]
    IC -->|medium| QR[Query understanding:<br/>rewrite + filters]
    IC -->|hard| P{Planning required?}
    P -->|no| QR
    P -->|yes| PL[Build tool DAG<br/>fetch memory<br/>choose vector vs graph]
    QR --> RR[Retrieve → fuse → rerank]
    PL --> EX[Execute DAG<br/>sandboxed tools]
    RR --> CTX[Context manager assembles prompt]
    EX --> CTX
    S --> CTX
    CTX --> BUD{Token budget OK?}
    BUD -->|yes| LLM[LLM generation + citations]
    BUD -->|breach| EE[Early exit:<br/>partial answer + offer to continue]
    LLM --> OUT[Stream plan, tool calls, answer]
`;
const CHART_3 = `
flowchart LR
    A[Chat session] --> B[Background auto-dream<br/>mine salient facts]
    B --> C{High-confidence<br/>+ durable?}
    C -->|no| X[Discard]
    C -->|yes| D[Write to .md vault<br/>+ vector layer]
    D --> E[(User-visible memory store)]
    E -->|retrieval-time, query-relevant| F[Inject into context]
    E -->|TTL / decay| G[Expire]
    U[User] -->|view/edit/delete| E
`;

export const metadata: Metadata = {
  title: postDocumentTitle(post),
  description: post.description,
  keywords: [
    ...post.tags,
    'agentic AI architecture',
    'enterprise AI assistant',
    'enterprise agent architecture',
    'permission-aware retrieval',
    'hybrid RAG',
    'LangGraph',
    'LiteLLM',
    'Qdrant',
    'SPIFFE',
    'OAuth token exchange',
    'Arvind Narayan',
  ],
  authors: [{ name: 'Arvind Narayan', url: SITE_URL }],
  creator: 'Arvind Narayan',
  publisher: 'Arvind Narayan',
  category: 'AI Engineering',
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
    section: 'AI Engineering',
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
    'article:section': 'AI Engineering',
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
    articleSection: 'AI Engineering',
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

export default function AnatomyOfAnAgenticAISystemPostPage() {
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
          <div dangerouslySetInnerHTML={{ __html: `<p class="blog-prose__lede">A practical guide to building — or evaluating — an enterprise agentic workspace assistant in the age of agentic AI.</p><h2>TL;DR</h2>
<ul>
<li><strong>Build the boring parts first: permission-aware retrieval and identity are the product.</strong> A workspace assistant lives or dies on whether it enforces the source system’s ACLs at query time. The operating principle is simple: permissions are checked before any information ever reaches the LLM; only this pre-filtered, “safe” information is passed through; the LLM cannot leak information it never receives. Everything else — models, graphs, memory — is a differentiator layered on top of that non-negotiable foundation.</li>
<li><strong>Make opinionated picks and defer the exotic ones.</strong> Default stack: <strong>Qdrant</strong> (vectors) + <strong>Postgres/pgvector</strong> for metadata and small-scale vectors + <strong>Neo4j/Graphiti</strong> only when multi-hop queries show up in your logs; <strong>Qwen3-Embedding</strong> or <strong>Gemini Embedding</strong> for embeddings; <strong>Cohere Rerank / Jina v3</strong> for reranking; <strong>recursive character chunking as the default</strong> with per-type escalation; <strong>LiteLLM</strong> as the gateway; <strong>LangGraph + Langfuse</strong>, dropping LangSmith unless you’re all-in on LangChain and want its eval maturity.</li>
<li><strong>The intent classifier is the spine of the whole system.</strong> Route simple → direct LLM, medium/hard → plan+retrieve (hybrid vector, escalate to graph for relationship questions), bad → guardrails. Use an embedding router (sub-100ms, ~65x cheaper than an LLM call) with a cheap-LLM fallback, not a frontier model on every turn.</li>
<li><strong>Cost-per-answer is a first-class design constraint, not a finance afterthought.</strong> A 3-step agent loop with accumulating context genuinely costs 50–70x a single cheap-tier call — the math is in Section 14. Tiered routing, budget guards, early exits, and permission-scoped caching are architecture, not optimization.</li>
</ul>
<h2>Key Findings</h2>
<ol>
<li><strong>Permission-aware retrieval is architectural, not a filter.</strong> Enforce ACLs at retrieval time by mirroring source-system permissions into your index and trimming candidates to the user’s access <em>before</em> the LLM sees anything. Snapshotting permissions at index time or filtering after generation are both broken.</li>
<li><strong>Recursive character chunking is the right default</strong> — the peer-reviewed NAACL 2025 Findings paper by Qu, Tu &amp; Bao, “Is Semantic Chunking Worth the Computational Cost?”, concludes verbatim that “the computational costs associated with semantic chunking are not justified by consistent performance gains” — but structure-aware chunking wins for code (AST), slides, spreadsheets, transcripts, and tickets.</li>
<li><strong>Most “bad retrieval” is a badly understood question.</strong> Chunking, embeddings, and rerankers are commoditized; query understanding — conversational rewriting, filter extraction, decomposition — is the last unfixed layer of RAG and where the remaining gains live.</li>
<li><strong>Hybrid (dense + sparse) retrieval fused with RRF is the production default</strong>; add a reranker; add a graph store <em>only</em> when multi-hop/relationship queries demonstrably fail on vectors. GraphRAG costs 10–40x more to index and adds ~2.3x query latency — earn it.</li>
<li><strong>Of six candidate memory layers, two earn their latency budget:</strong> working memory (last N turns) and a compressed scratchpad. Episodic recall should be a tool the agent calls, not an always-on injection; temporal knowledge graphs are architecture theatre for most workloads.</li>
<li><strong>Agent-generated code must never run in-process.</strong> The minimum acceptable isolation for untrusted agent code is a Firecracker/Kata microVM or gVisor; standard Docker/runc shares the host kernel and is insufficient.</li>
<li><strong>Agents need their own identity.</strong> Use OAuth 2.0 Token Exchange (RFC 8693) delegation semantics and workload identity (SPIFFE) so agents act <em>on behalf of</em> users with scoped, short-lived tokens — not the user’s raw credentials or a static API key.</li>
<li><strong>Evals must be bootstrapped from real traffic, and you can build a 200-question golden set with zero human labels</strong> — mine and cluster query logs, generate questions from chunks for retrieval labels, use pairwise judging for generation. LLM-as-judge is systematically optimistic; calibrate against a human-labeled sample (target 75–90% agreement).</li>
</ol>
<h2>The Whole System on One Page</h2>
<p>Before the section-by-section anatomy, here is the complete system — every service, datastore, queue, and plane, and how a request flows through them.</p>` }} />
          <MermaidDiagram
            chart={CHART_0}
            aria-label="Complete agentic workspace system architecture"
          />
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>Service inventory</strong> — what each piece is, whether it holds state, and how it scales:</p>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Service</th>
<th>Role</th>
<th>State</th>
<th>Scaling</th>
</tr>
</thead>
<tbody>
<tr>
<td>BFF (FastAPI)</td>
<td>Auth termination, session, SSE streaming to clients</td>
<td>Stateless (session in Redis)</td>
<td>HPA on RPS</td>
</tr>
<tr>
<td>LiteLLM gateway</td>
<td>Virtual keys, budgets, model routing, provider fallback, cache hooks</td>
<td>Stateless (config + spend in Postgres/Redis)</td>
<td>HPA on RPS</td>
</tr>
<tr>
<td>Guardrails</td>
<td>Input classification (injection, policy), output checks (PII, groundedness)</td>
<td>Stateless</td>
<td>HPA</td>
</tr>
<tr>
<td>Intent classifier</td>
<td>Embedding router + confidence-gated cheap-LLM fallback</td>
<td>Stateless (centroids in memory/Redis)</td>
<td>HPA</td>
</tr>
<tr>
<td>Query understanding</td>
<td>Conversational rewrite, decomposition, filter extraction</td>
<td>Stateless</td>
<td>HPA</td>
</tr>
<tr>
<td>LangGraph orchestrator</td>
<td>Plans, executes DAGs, owns per-request token budget</td>
<td>Checkpoints in Postgres</td>
<td>HPA; long runs resume via checkpointer</td>
</tr>
<tr>
<td>Agent registry</td>
<td>Capability manifests, versions, invocation ACLs</td>
<td>Postgres</td>
<td>Read-heavy, cache in Redis</td>
</tr>
<tr>
<td>Memory service</td>
<td>Scratchpad refresh, profile vault CRUD, auto-dream batch</td>
<td>Postgres + Qdrant</td>
<td>Worker-based (Celery)</td>
</tr>
<tr>
<td>Hybrid retrieval + RRF</td>
<td>Dense + sparse query, ACL filter pushdown, fusion</td>
<td>Stateless</td>
<td>HPA; bounded by Qdrant</td>
</tr>
<tr>
<td>Reranker (TEI)</td>
<td>Cross-encoder over top-100 candidates</td>
<td>Stateless</td>
<td>GPU replicas; batch requests</td>
</tr>
<tr>
<td>MCP tool servers</td>
<td>Typed access to SaaS/internal systems</td>
<td>Stateless (creds via token exchange)</td>
<td>HPA per server</td>
</tr>
<tr>
<td>Agent sandbox</td>
<td>Untrusted code execution</td>
<td>Ephemeral per task</td>
<td>Pool of microVMs, pre-warmed</td>
</tr>
<tr>
<td>Celery workers</td>
<td>Ingestion, memory jobs, nightly evals, long agent tasks</td>
<td>Stateless (broker=RabbitMQ)</td>
<td>KEDA on queue depth</td>
</tr>
<tr>
<td>Connectors</td>
<td>CDC pull/webhooks from source systems</td>
<td>Cursor state in Postgres</td>
<td>Per-connector workers</td>
</tr>
<tr>
<td>vLLM</td>
<td>Self-hosted utility LLMs (classify/rewrite/summarize/judge)</td>
<td>Stateless (KV cache ephemeral)</td>
<td>GPU pool, scale on queue-wait metric</td>
</tr>
<tr>
<td>TEI (embeddings)</td>
<td>Embedding + rerank serving</td>
<td>Stateless</td>
<td>GPU for latency, CPU acceptable at low QPS</td>
</tr>
<tr>
<td>Qdrant</td>
<td>Vectors + sparse + ACL payload filtering</td>
<td>Stateful, replicated</td>
<td>Shard by collection; scale nodes</td>
</tr>
<tr>
<td>Postgres</td>
<td>Permission mirror, lineage, checkpoints, registry, spend</td>
<td>Stateful, HA</td>
<td>Vertical + read replicas</td>
</tr>
<tr>
<td>Redis</td>
<td>Semantic cache, rate limits, session, Celery results</td>
<td>Stateful</td>
<td>Sentinel/managed</td>
</tr>
<tr>
<td>Neo4j</td>
<td>Knowledge graph (only when earned)</td>
<td>Stateful</td>
<td>Causal cluster at scale</td>
</tr>
<tr>
<td>ClickHouse</td>
<td>Langfuse v3 trace storage</td>
<td>Stateful</td>
<td>Columnar, cheap at volume</td>
</tr>
</tbody>
</table></div>` }} />
          <BlogRelatedAd slug={SLUG} />
          <div dangerouslySetInnerHTML={{ __html: `<h2>Details</h2>
<h3>1. Auth &amp; Authorization: identity is the hardest part, do it first</h3>
<p>There are <strong>four</strong> distinct authorization surfaces in a workspace agent, and conflating them is the most common architectural mistake:</p>
<ol>
<li><strong>User identity &amp; session</strong> — who is the human.</li>
<li><strong>Agent/service identity</strong> — who is the software acting.</li>
<li><strong>LLM/tool access tokens</strong> — what models and tools this request may touch.</li>
<li><strong>Data ACLs</strong> — what documents this <em>user</em> may see, enforced at retrieval.</li>
</ol>
<h4>User identity and delegated (“on-behalf-of”) auth</h4>
<p>Federate to the enterprise IdP (Okta, Entra ID, Google Workspace) via OIDC/SAML. The interesting problem is what happens when an agent calls a downstream tool <em>as the user</em>. Two production-proven mechanisms:</p>
<ul>
<li><strong>OAuth 2.0 Token Exchange (RFC 8693)</strong> — an IETF Proposed Standard (Jan 2020) defining an STS-style token exchange. The grant type is <code>urn:ietf:params:oauth:grant-type:token-exchange</code>. It carries a <code>subject_token</code> (the user, “on behalf of whom the token is requested”) and an optional <code>actor_token</code> (the acting party — your agent). Critically, RFC 8693 distinguishes <strong>impersonation</strong> (subject_token only; downstream sees only the user, agent is “indistinguishable from” the user) from <strong>delegation</strong> (both tokens; “principal A still has its own identity separate from B… A is an agent for B”). For agents, <strong>prefer delegation</strong> — the issued token carries an <code>act</code> claim that names the actor and can nest to express a delegation chain (auditable lineage), and a <code>may_act</code> claim authorizes who may act for whom.</li>
<li><strong>Microsoft Entra ID On-Behalf-Of (OBO) flow</strong> — a middle-tier API exchanges the user’s access token for a downstream-scoped token by setting <code>requested_token_use=on_behalf_of</code>. Note OBO works <strong>only for user principals</strong>, and Microsoft is candid that it is “a Microsoft flavor for a standard,” not the standard itself. Entra Agent ID (2025–2026) extends this to a two-exchange agent OBO flow.</li>
</ul>
<p><strong>Recommendation:</strong> Use RFC 8693 token exchange with <strong>delegation</strong> semantics as your cross-service standard, and downscope on every hop (request only the <code>scope</code>/<code>audience</code>/<code>resource</code> the next step needs). Be aware of the real-world caveat that “most implementations quietly allow scope to persist unchanged” — enforce attenuation in policy, don’t assume the AS does it.</p>
<h4>Service identity for agents</h4>
<p>An agent is a machine workload and deserves a workload identity distinct from any user. Use <strong>SPIFFE/SPIRE</strong>: the agent gets a SPIFFE ID (e.g., <code>spiffe://acme.com/agent/research</code>) and a short-lived, auto-rotating <strong>SVID</strong> (X.509 for mTLS, or JWT-SVID for token exchange). OpenAI now supports exchanging a SPIFFE <strong>JWT-SVID</strong> for a short-lived OpenAI access token, avoiding long-lived API keys; HashiCorp Vault Enterprise added native SPIFFE auth for non-human identities. Palo Alto’s guidance is blunt: “Autonomous AI agents are machine workloads and require dedicated workload identities, not human-centric credentials. Relying solely on OAuth or static API keys for AI agents creates security blind spots.”</p>
<p>For the agent↔tool boundary, follow the <strong>MCP authorization spec</strong>: as of the 2025-06-18 revision, MCP servers are OAuth 2.1 <strong>Resource Servers</strong> that must implement Protected Resource Metadata (RFC 9728), and clients must implement Resource Indicators (RFC 8707) to stop token reuse against the wrong server (the “confused deputy” problem). The Nov 2025 revision added incremental scope consent and Enterprise-Managed Authorization (Okta’s Cross-App Access / ID-JAG).</p>
<p><strong>Token lifetime &amp; attenuation:</strong> issue short-lived (minutes-to-an-hour) scoped tokens per agent/action. For fan-out to sub-agents, capability tokens that support <strong>offline attenuation</strong> are attractive — <strong>Biscuit</strong> tokens (Ed25519 public-key signatures + embedded Datalog policy) let a parent agent hand a strictly-narrower token to a child without a round-trip to the AS; <strong>macaroons</strong> do similar with HMAC caveats. There’s an emerging IETF draft, “Attenuating Authorization Tokens for Agentic Delegation Chains.” Flag: this is genuinely contested — Authress argues offline attenuation has real drawbacks — so treat it as advanced, not table-stakes.</p>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Auth surface</th>
<th>Mechanism</th>
<th>Recommendation</th>
<th>Deviate when</th>
</tr>
</thead>
<tbody>
<tr>
<td>User identity</td>
<td>OIDC/SAML to IdP</td>
<td>Federate, never roll your own</td>
<td>Never</td>
</tr>
<tr>
<td>Agent → downstream tool (as user)</td>
<td>RFC 8693 delegation / Entra OBO</td>
<td>Delegation + downscope per hop</td>
<td>Impersonation only for legacy tools that can’t model an actor</td>
</tr>
<tr>
<td>Agent service identity</td>
<td>SPIFFE/SPIRE SVID</td>
<td>Workload identity per agent</td>
<td>Single-tenant PoC: a scoped API key in a secrets manager is acceptable</td>
</tr>
<tr>
<td>Agent → MCP tool server</td>
<td>MCP OAuth 2.1 (RFC 9728 + 8707)</td>
<td>Follow the spec</td>
<td>—</td>
</tr>
<tr>
<td>Sub-agent delegation</td>
<td>Biscuit/macaroon attenuation</td>
<td>Advanced; adopt at enterprise scale</td>
<td>Skip until you have real multi-hop agent chains</td>
</tr>
</tbody>
</table></div>
<h4>Permission-aware retrieval (the crown jewel)</h4>
<p>This is what makes the system deployable in a regulated enterprise. The production pattern to copy:</p>
<ol>
<li><strong>Connector ingestion</strong> pulls content <em>plus the source ACL</em> for every object.</li>
<li><strong>Identity resolution</strong> maps identities across systems (so “Anthony in Slack” = “Anthony in Salesforce”).</li>
<li><strong>Permission mirroring</strong> syncs allow/deny users and groups into an identity-and-permissions store.</li>
<li>At query time, retrieve candidates, <strong>filter through the user’s permissions, then</strong> pass only the safe set to the LLM.</li>
</ol>
<p>The principle: permissions are checked before any information ever reaches the LLM. Only this pre-filtered, “safe” information is passed through. The LLM never even sees the restricted data — it cannot leak what it never receives. Permission checks happen externally, so security is enforced by the architecture, not left to the model. Enforce ACLs <strong>at query time, on every retrieval, in real time</strong> — not as a stale index-time snapshot. Store per-chunk ACL metadata (allowed users, allowed groups, denied users, denied groups) alongside the vector, and push the filter into the vector DB query so trimming happens before ranking.</p>
<h3>2. LLM &amp; tool budgeting per team (ACLs extended to cost)</h3>
<p>Model access is an entitlement, and tokens are a metered resource. Treat both like any other ACL:</p>
<ul>
<li><strong>Model-tier entitlements:</strong> which teams can call frontier models (Opus-class) vs. cheap models (Haiku/Flash-class). Encode as scopes on the team’s virtual key.</li>
<li><strong>Per-team token budgets &amp; rate limits:</strong> enforce at the gateway with virtual keys. LiteLLM’s virtual keys give per-team budgets and rate limits natively; this is a primary reason to run a gateway.</li>
<li><strong>Cost allocation / chargeback:</strong> tag every LLM call with team/user/project and aggregate. Langfuse gives per-trace/session cost; roll it up to a chargeback dashboard.</li>
</ul>
<p><strong>Recommendation:</strong> LiteLLM virtual keys per team with hard budget ceilings + soft alert thresholds; model-tier scopes on each key; Langfuse for cost attribution. The point that surprises execs: a router that sends every request to a frontier model when a cheap one suffices “costs 30x more” — model-tier entitlements are a cost-control lever, not just governance. Section 14 turns this into per-query unit economics.</p>
<h3>3. Data ingestion</h3>
<h4>3a. Chunking strategies per data type</h4>
<p><strong>The position that recursive character chunking beats semantic chunking for most cases is correct, and the 2025 evidence backs it.</strong> The peer-reviewed NAACL 2025 Findings paper (Qu, Tu &amp; Bao, “Is Semantic Chunking Worth the Computational Cost?”, pp. 2155–2177) states plainly: “the computational costs associated with semantic chunking are not justified by consistent performance gains,” with fixed ~200-word chunks matching or beating semantic chunking across retrieval and answer generation. Merola &amp; Singh (2025) reach the same conclusion; a Feb 2026 Vecta benchmark of 7 strategies placed recursive 512-token splitting first. Semantic chunking’s win (when it exists) is a few points of recall at 10–40x the embedding cost.</p>
<p>But “recursive by default” does <strong>not</strong> mean “recursive for everything.” Structure is signal — use it when the data has it:</p>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Data type</th>
<th>Recommended chunking</th>
<th>Why</th>
</tr>
</thead>
<tbody>
<tr>
<td>Docs / Markdown / Confluence</td>
<td>Recursive character, split on headings first</td>
<td>Structure-based beats fixed on FinanceBench (84% acc.)</td>
</tr>
<tr>
<td>Code / codebases</td>
<td><strong>AST-based</strong> (function/class boundaries)</td>
<td>Preserves semantic units; recursive splits mid-function</td>
</tr>
<tr>
<td>PPT / slides</td>
<td><strong>Slide-level</strong> + speaker notes</td>
<td>Each slide is a self-contained unit</td>
</tr>
<tr>
<td>XLSX / CSV</td>
<td><strong>Schema-aware / row-group</strong>, carry headers into each chunk</td>
<td>Rows are meaningless without column context</td>
</tr>
<tr>
<td>Emails</td>
<td>Per-message, strip quoted history, keep header metadata</td>
<td>Threads dedupe; quoted text is noise</td>
</tr>
<tr>
<td>Chat (Slack/Teams)</td>
<td>Thread- or window-based with time gaps</td>
<td>Conversations, not lines</td>
</tr>
<tr>
<td>Call transcripts</td>
<td><strong>Turn/speaker-based</strong>, windowed</td>
<td>Preserves who-said-what</td>
</tr>
<tr>
<td>Jira</td>
<td><strong>Ticket-level</strong> (summary + description + comments)</td>
<td>The ticket is the atomic unit</td>
</tr>
<tr>
<td>PDFs</td>
<td>Layout-aware → recursive on extracted text</td>
<td>Tables/columns break naive splitters</td>
</tr>
<tr>
<td>Images</td>
<td><strong>Caption + multimodal embedding</strong></td>
<td>Text-only indexing loses the image</td>
</tr>
<tr>
<td>Logs</td>
<td><strong>Template mining</strong> (Drain-style) → cluster by template</td>
<td>Raw lines are high-volume, low-signal</td>
</tr>
</tbody>
</table></div>
<p>Two upgrades worth the cost regardless of splitter: <strong>Anthropic’s Contextual Retrieval</strong> (prepend a doc-level context blurb to each chunk before embedding) and <strong>parent-document retrieval</strong> (embed small, return large).</p>
<h4>3b. Data relevance: signal over noise</h4>
<p>Not all sources are equal. Official docs should outrank a Slack rant. Implement:
- <strong>Source authority weighting</strong> — a per-source-type prior (published docs &gt; wiki &gt; tickets &gt; chat).
- <strong>Freshness decay</strong> — exponential time-decay on a recency score; a 2024 runbook should lose to the 2026 one.
- <strong>Deduplication</strong> — near-dup detection (MinHash/embedding cosine) so five copies of the same PDF don’t flood results.
- <strong>Popularity/click signals</strong> — feed thumbs-up, click-through, and dwell back into ranking. Production knowledge graphs do exactly this with metadata, owners, and status fields.</p>
<p>These are ranking features, not just retrieval — bake them into the reranking stage (Section 8).</p>
<h4>3c. Data storage</h4>
<p><strong>Vector DB — the choice matters most.</strong> My decision:</p>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Option</th>
<th>Best at</th>
<th>Weakness</th>
<th>Verdict</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Qdrant</strong></td>
<td>Best-in-class filtered search (Rust), payload filtering, native sparse vectors, self-host</td>
<td>Younger ecosystem</td>
<td><strong>DEFAULT for a dedicated store</strong></td>
</tr>
<tr>
<td>pgvector / pgvectorscale</td>
<td>One system, transactional, HNSW competitive to ~1–10M</td>
<td>Throughput ceiling past 50–100M</td>
<td><strong>DEFAULT at startup scale / if already on Postgres</strong></td>
</tr>
<tr>
<td>Milvus</td>
<td>Billion-scale, mature sharding</td>
<td>Operational complexity; overkill &lt;1M</td>
<td>Enterprise / billion-vector</td>
</tr>
<tr>
<td>Weaviate</td>
<td>Hybrid + graph-ish features</td>
<td>Not top on pure vector latency</td>
<td>If you want built-in hybrid+modules</td>
</tr>
<tr>
<td>Pinecone</td>
<td>Zero-ops managed</td>
<td>Cost grows fast; serverless slower</td>
<td>Prototype / no-ops teams</td>
</tr>
<tr>
<td>Vespa</td>
<td>Web-scale hybrid + ranking</td>
<td>Steep learning curve</td>
<td>Very large hybrid ranking workloads</td>
</tr>
<tr>
<td>Elasticsearch/OpenSearch</td>
<td>You already run it for logs; BM25 native</td>
<td>Vector engine trails specialists</td>
<td>If ELK is already in-house</td>
</tr>
<tr>
<td>Turbopuffer / LanceDB</td>
<td>Cheap object-storage-backed / embedded</td>
<td>Newer / different tradeoffs</td>
<td>Cost-sensitive or embedded</td>
</tr>
</tbody>
</table></div>
<p><strong>Pick Qdrant</strong> for a dedicated store (permission filtering is exactly its strength, and permission-aware retrieval demands fast filtered search), or <strong>pgvector</strong> if you’re small or already Postgres-centric — its filtering and 5–8ms HNSW latency mean “the database query is not the bottleneck” until real scale. Migrate to a dedicated store around 50–100M vectors or when cloud costs cross a few hundred dollars/month.</p>
<p><strong>Graph DB:</strong> Neo4j (mature, Cypher, Graphiti builds on it), FalkorDB (fast, Redis-based), Neptune (AWS-managed), Memgraph (in-memory, real-time). <strong>Pick Neo4j</strong> if you adopt GraphRAG/temporal memory (Graphiti/Zep target it first); FalkorDB if latency-critical and you want lighter ops. <strong>But don’t add a graph DB until Section 8’s trigger fires.</strong></p>
<p><strong>Everything else:</strong> object store (S3/GCS) for raw docs and originals; <strong>Postgres</strong> for metadata, lineage, and permission mirror; <strong>Redis</strong> for cache (embeddings, hot retrievals, session state) and rate-limit counters.</p>
<h4>3d. Data lineage &amp; embedding models</h4>
<p><strong>Embedding model choice (verify current MTEB standings, which shifted hard in early 2026):</strong></p>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Model</th>
<th>Type</th>
<th>Note</th>
</tr>
</thead>
<tbody>
<tr>
<td>Gemini Embedding</td>
<td>API</td>
<td>Leads retrieval (~67.7 MTEB retrieval); multimodal (text/image/video/audio/PDF), 3072-dim</td>
</tr>
<tr>
<td>Voyage 4</td>
<td>API</td>
<td>Strong; code/legal domain variants</td>
</tr>
<tr>
<td>Cohere embed v4</td>
<td>API</td>
<td>~65.2 MTEB; strong enterprise support</td>
</tr>
<tr>
<td>OpenAI text-embedding-3-large</td>
<td>API</td>
<td>~64.6; solid but not updated since Jan 2024 — falling behind</td>
</tr>
<tr>
<td><strong>Qwen3-Embedding (8B/4B/0.6B)</strong></td>
<td><strong>OSS (Apache-2.0)</strong></td>
<td><strong>Top OSS; ranks high on multilingual + English MTEB; self-host, no API cost</strong></td>
</tr>
<tr>
<td>bge-m3</td>
<td>OSS</td>
<td>~63; strong multilingual + multi-granularity</td>
</tr>
<tr>
<td>Jina v5 / v3</td>
<td>OSS</td>
<td>Excellent quality-to-size</td>
</tr>
<tr>
<td>NV-Embed / nomic / e5</td>
<td>OSS</td>
<td>Solid baselines</td>
</tr>
</tbody>
</table></div>
<p><strong>Recommendation:</strong> If you want managed and multimodal, <strong>Gemini Embedding</strong>. If you want self-hosted, data-resident, no per-token cost, <strong>Qwen3-Embedding-8B</strong> (drop to 4B/0.6B for latency). Note the FinMTEB finding: the best MTEB model can drop ~8.5 points on a domain corpus — <strong>benchmark on your own data with MRR/NDCG before committing.</strong></p>
<p><strong>The often-missed pieces — these separate a demo from a product:</strong></p>
<ul>
<li><strong>Incremental sync / CDC:</strong> don’t full-crawl. Use webhooks/change-logs to capture deltas every 1–5 minutes (mature enterprise connectors do this; eSapiens reports near-real-time via webhook/change-log triggers). Push delta changes, not re-crawls.</li>
<li><strong>Permissions sync:</strong> ACL mirroring is a <em>continuous</em> job, not a one-time import. Re-sync group membership and per-object ACLs on a schedule and on change events; stale ACLs are a security incident waiting to happen.</li>
<li><strong>PII detection/handling:</strong> run PII detection/classification at ingestion; mask or tag sensitive fields; support incognito/no-retention paths for sensitive conversations.</li>
<li><strong>Deletion propagation (GDPR right-to-be-forgotten):</strong> a delete in the source must propagate to the index <em>and the embeddings</em> and any derived memory/graph. Track lineage (object → chunks → vectors → graph nodes) in Postgres so deletion is a graph traversal, not a hope.</li>
<li><strong>Index versioning &amp; re-embedding:</strong> when you change embedding models you must re-embed. Version your index; dual-write and shadow-read the new index; cut over behind an eval gate. Immutable versioning (v1→v2 on re-chunk/re-index) gives rollback.</li>
</ul>
<p><strong>Ingestion pipeline diagram:</strong></p>` }} />
          <MermaidDiagram
            chart={CHART_1}
            aria-label="Ingestion pipeline with ACL mirroring and lineage"
          />
          <div dangerouslySetInnerHTML={{ __html: `<h3>4. UI: buy/adopt-OSS vs build</h3>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Option</th>
<th>Type</th>
<th>Agentic support</th>
<th>Use when</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Open WebUI</strong></td>
<td>OSS app</td>
<td>Built-in hybrid RAG (BM25+CrossEncoder), tools, pipelines, SCIM, analytics; ~147k stars</td>
<td>You want a batteries-included internal chat fast</td>
</tr>
<tr>
<td><strong>LibreChat</strong></td>
<td>OSS app</td>
<td>MCP agents, RAG API (LangChain+pgvector), code interpreter, strong auth (OAuth/Entra/Cognito); acquired by ClickHouse Nov 2025</td>
<td>Enterprise auth + multi-provider, developer experiments</td>
</tr>
<tr>
<td><strong>Chainlit</strong></td>
<td>OSS Python framework</td>
<td>Code-first; streaming, sessions, MCP; full control</td>
<td>You’re building a custom agentic app and want control</td>
</tr>
<tr>
<td><strong>assistant-ui / Lobe Chat</strong></td>
<td>OSS React/app</td>
<td>Component-level agentic affordances / polished UX</td>
<td>Embedding chat into your own React app</td>
</tr>
<tr>
<td><strong>Onyx</strong></td>
<td>OSS platform</td>
<td>Connectors + permission-aware retrieval + agents</td>
<td>You want an enterprise-search platform OSS baseline</td>
</tr>
</tbody>
</table></div>
<p><strong>Decision framework:</strong> For an internal tool where the assistant <em>is</em> the product, <strong>build a hand-rolled agentic app</strong> (React + assistant-ui or Chainlit) so you control the agentic affordances — but <strong>adopt OSS for the shell</strong> and spend your engineering on retrieval/orchestration, not re-implementing a chat textbox. Off-the-shelf chatbots (Open WebUI/LibreChat) are the right call for a fast internal pilot; graduate to hand-rolled when you need streaming plans, DAG visualization, and approval UX they don’t model well.</p>
<p><strong>Where the UI needs true agentic affordances (non-negotiable):</strong> streaming the <em>plan</em> (not just tokens), <strong>tool-call visibility</strong> (what it’s calling and why), <strong>inline citations</strong> to permission-checked sources, <strong>human-in-the-loop approval</strong> gates for write actions, and <strong>partial-failure rendering</strong> (see Error Handling).</p>
<h3>5. Orchestration: an intent classifier is the spine</h3>
<p>Every message is classified into <strong>simple / medium / hard / bad</strong>, and the route follows:</p>
<ul>
<li><strong>Simple</strong> (greeting, definition, chit-chat) → direct LLM answer, <strong>no retrieval</strong>.</li>
<li><strong>Medium</strong> → single retrieval pass (hybrid vector) → answer. Usually no multi-step plan.</li>
<li><strong>Hard</strong> (multi-hop, cross-source, analytical) → <strong>plan</strong>: build a tool DAG, fetch user memory, retrieve (escalate to graph for relationship questions), execute, synthesize.</li>
<li><strong>Bad</strong> (adversarial, off-policy, prompt injection) → guardrails: refuse/deflect gracefully, log, and flag.</li>
</ul>
<p><strong>Classifier implementation tradeoffs:</strong></p>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Approach</th>
<th>Latency</th>
<th>Cost</th>
<th>Accuracy</th>
<th>Verdict</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Embedding router</strong> (cosine vs. labeled centroids)</td>
<td>16–100ms</td>
<td>~65x cheaper than LLM (sub-penny)</td>
<td>92–96% precision after tuning; struggles on OOD/compositional</td>
<td><strong>DEFAULT</strong></td>
</tr>
<tr>
<td><strong>Fine-tuned small model</strong> (SetFit/ModernBERT/DistilBERT)</td>
<td>sub-100ms</td>
<td>tiny; SetFit ~56x faster than frontier</td>
<td>F1 within 8–10% of best LLM; needs training data</td>
<td>Best when intents are nuanced &amp; stable</td>
</tr>
<tr>
<td><strong>Cheap-LLM call</strong> (Haiku/Flash w/ structured output)</td>
<td>200–500ms</td>
<td>~$0.65/10k queries</td>
<td>Highest on ambiguous/compositional intent</td>
<td><strong>Fallback</strong> for low-confidence router hits</td>
</tr>
<tr>
<td>Frontier LLM every turn</td>
<td>500–2000ms</td>
<td>30x+ waste</td>
<td>Highest</td>
<td>Never for routing</td>
</tr>
</tbody>
</table></div>
<p><strong>Recommendation:</strong> an <strong>embedding router as the default</strong>, with a <strong>cheap-LLM fallback</strong> when the router’s top-class confidence is below threshold. IBM’s ModernBERT semantic router showed a 47.1% latency reduction; NVIDIA’s blueprint uses Qwen-1.7B intent routing. Routing overhead is negligible (10–50µs for the compare) against 500–2000ms inference. Implement the whole flow in <strong>LangGraph</strong>, where the classifier is the conditional edge.</p>
<p><strong>Intent-classifier routing flowchart:</strong></p>` }} />
          <MermaidDiagram
            chart={CHART_2}
            aria-label="Intent classifier routing flowchart"
          />
          <div dangerouslySetInnerHTML={{ __html: `<h3>6. Agent library with ACLs</h3>
<p>A registry of agents/capabilities is what turns a monolith into a platform:
- <strong>Capability manifests</strong> (“capability sheets”) per agent: name, purpose, input/output schema, tools it may call, data scopes, cost tier, owner. Anthropic’s finding is directly relevant: “poor tool descriptions [can] send agents down completely wrong paths” — treat the agent-tool interface like a human-computer interface.
- <strong>Versioning:</strong> immutable versions with rollback; capability manifests are versioned artifacts.
- <strong>Invocation ACLs:</strong> which teams/users/agents may invoke which agents — same entitlement model as model tiers.
- <strong>Approval workflows:</strong> new or modified agents go through review before they’re callable in prod (mirrors LangGraph interrupt-based approval).</p>
<h3>7. Agent execution environment</h3>
<p><strong>The single most important rule: agent-generated code must never run in-process.</strong> It shares your interpreter, your memory, your secrets, and your network. The minimum acceptable isolation for untrusted agent code is a <strong>Firecracker/Kata microVM</strong> (hardware-level, separate kernel) or <strong>gVisor</strong> (user-space kernel, lighter); standard Docker/runc “shares the host kernel and is explicitly insufficient.” This matches E2B, Modal, and AWS Lambda’s public architectures.</p>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Sandbox</th>
<th>Isolation</th>
<th>Cold start</th>
<th>Use when</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>E2B</strong></td>
<td>Firecracker microVM</td>
<td>~150ms</td>
<td>Purpose-built agent code execution, want a product</td>
</tr>
<tr>
<td><strong>Modal</strong></td>
<td>gVisor (Kata opt-in)</td>
<td>sub-1s</td>
<td>GPU-heavy agent workloads, Python-first</td>
</tr>
<tr>
<td>Daytona</td>
<td>gVisor</td>
<td>~90ms</td>
<td>CPU-only dev-workspace agents</td>
</tr>
<tr>
<td>Firecracker self-host</td>
<td>microVM</td>
<td>~125ms</td>
<td>Full control, GPU passthrough, high volume</td>
</tr>
<tr>
<td>Vercel/Cloudflare Sandbox</td>
<td>Firecracker / isolate</td>
<td>2–3s / fast</td>
<td>Already on that platform</td>
</tr>
</tbody>
</table></div>
<p><strong>Recommendation:</strong> <strong>E2B</strong> (or self-hosted Firecracker at volume) for untrusted code; <strong>Modal</strong> if you need GPUs in the sandbox. Beyond isolation: <strong>egress allowlists</strong> (no arbitrary outbound; whitelist approved endpoints), <strong>secrets injection at runtime</strong> (never bake into images; short-lived tokens from Section 1), <strong>resource &amp; wall-clock limits</strong> (OWASP LLM10:2025 = unbounded resource consumption), and <strong>ephemeral sandboxes</strong> torn down per task.</p>
<h3>8. Retrieval</h3>
<h4>8a. The retrieval problem was never retrieval: query understanding</h4>
<p>Here’s the uncomfortable truth after two years of RAG industrialization: <strong>chunking, embeddings, and rerankers are commoditized. Most residual “bad retrieval” is a badly understood question.</strong> Embedding a bad query well still retrieves the wrong documents, precisely. The query-understanding layer is the last unfixed layer of RAG, and it’s where the remaining gains live.</p>
<p>Workspace queries fail for predictable reasons: they’re <strong>elliptical</strong> (“and for Q3?” — meaningless without the last three turns), <strong>jargon-dense</strong> (internal codenames, team acronyms no embedding model has seen), <strong>underspecified</strong> (“the board deck” — which of forty?), or <strong>compound</strong> (two questions wearing one trench coat). Fix them in this order of ROI:</p>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Technique</th>
<th>What it does</th>
<th>Latency</th>
<th>When</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Conversational rewrite</strong></td>
<td>Resolve coreference + ellipsis into a standalone query using chat history</td>
<td>150–300ms (cheap LLM)</td>
<td><strong>Always, in any chat UX. The single highest-ROI fix.</strong></td>
</tr>
<tr>
<td><strong>Filter extraction</strong></td>
<td>Parse time ranges, source types, authors into metadata filters (“last quarter’s board deck” → <code>time&gt;=Q2, type=slides</code>)</td>
<td>Same call as rewrite</td>
<td>Always — structured filters beat semantic similarity for temporal/typed asks</td>
</tr>
<tr>
<td><strong>Glossary/entity expansion</strong></td>
<td>Expand org acronyms and codenames from a glossary mined from your knowledge graph/metadata</td>
<td>Lookup, ~0ms</td>
<td>Orgs with heavy internal jargon (all of them)</td>
</tr>
<tr>
<td><strong>Query decomposition</strong></td>
<td>Split compound questions into sub-queries, retrieve in parallel, RRF-merge</td>
<td>+1 LLM call</td>
<td>Hard-class queries only</td>
</tr>
<tr>
<td><strong>Multi-query expansion</strong></td>
<td>2–3 paraphrases, retrieve all, RRF-merge</td>
<td>+parallel retrievals</td>
<td>Recall-critical, medium/hard</td>
</tr>
<tr>
<td><strong>HyDE</strong></td>
<td>Embed a hypothetical answer instead of the question</td>
<td>+1 LLM call, hallucination risk</td>
<td>Sparingly — zero-hit retry ladder only</td>
</tr>
</tbody>
</table></div>
<p>Implement rewrite + filter extraction as <strong>one structured-output call to a cheap self-hosted model</strong> (a 4–8B Qwen handles it), cache rewrites in Redis keyed on (conversation-tail hash, query), and run it only for medium/hard intents — the classifier already told you simple queries don’t need it. Then give retrieval a <strong>retry ladder</strong> instead of a single shot: retrieve → if reranker confidence is low → try a rewrite variant → broaden filters → HyDE → <em>admit you couldn’t find it</em>. An honest “I couldn’t find this in Confluence or Drive” preserves more trust than a confident hallucination, and it feeds the data-source-coverage-gap metric on the management dashboard.</p>
<h4>8b. Hybrid + RRF + rerank</h4>
<p>The production default is <strong>hybrid retrieval</strong>: dense (embeddings) + sparse (BM25, or SPLADE for vocabulary-mismatch corpora) fused with <strong>Reciprocal Rank Fusion (RRF)</strong>. RRF sums <code>1/(k + rank)</code> across lists with <strong>k=60</strong>, the smoothing constant from the original Cormack, Clarke &amp; Büttcher paper (“Reciprocal Rank Fusion Outperforms Condorcet and Individual Rank Learning Methods,” ACM SIGIR 2009), which showed RRF “consistently yields better results than any individual system, and better results than the standard method Condorcet Fuse.” Use RRF over score-based fusion because it operates on ranks, not scores, so it’s immune to the normalization pathologies that break weighted averaging (a single outlier BM25 doc compresses all other scores toward zero after min-max). On WANDS, tuned hybrid reaches 0.7497 NDCG vs. ~0.698 for either method alone (~7.4% lift).</p>
<p><strong>SPLADE vs BM25:</strong> BM25 for exact-match-heavy corpora (SKUs, error codes) and smaller corpora where IDF is meaningful; SPLADE for vocabulary-mismatch knowledge bases — but <strong>pre-compute SPLADE doc vectors at index time</strong> (Qdrant stores sparse vectors natively) since query-time SPLADE adds 100–300ms.</p>
<p><strong>Reranking (the highest-ROI upgrade after adding BM25):</strong> take top-50–200 fused candidates and rerank with a cross-encoder.</p>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Reranker</th>
<th>Quality</th>
<th>Latency</th>
<th>Verdict</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Cohere Rerank 3.5</strong></td>
<td>Strong, multilingual</td>
<td>~595–603ms</td>
<td>Zero-ops hosted default</td>
</tr>
<tr>
<td><strong>Voyage Rerank 2.5</strong></td>
<td>Matches Cohere; code/legal variants</td>
<td>~half of Cohere in some tests</td>
<td>Best hosted balance; domain variants</td>
</tr>
<tr>
<td><strong>Jina Reranker v3</strong></td>
<td>81.3% Hit@1</td>
<td><strong>188ms — only top-tier sub-200ms</strong></td>
<td><strong>Best self-host, latency-critical</strong></td>
</tr>
<tr>
<td>Nemotron-rerank-1b</td>
<td>83.0% Hit@1 (top accuracy)</td>
<td>243ms</td>
<td>Max accuracy, self-host</td>
</tr>
<tr>
<td>bge-reranker-v2-m3</td>
<td>Solid multilingual baseline</td>
<td>light</td>
<td>Budget self-host</td>
</tr>
<tr>
<td>Zerank / ZeroEntropy</td>
<td>Top ELO in some benchmarks</td>
<td>varies</td>
<td>Emerging, worth testing</td>
</tr>
</tbody>
</table></div>
<p><strong>Recommendation:</strong> <strong>Cohere Rerank 3.5</strong> if you want managed zero-ops; <strong>Jina Reranker v3</strong> if you self-host and need a strict sub-200ms budget. The latency/quality tradeoff: reranking adds 150–600ms but delivers 15–40% higher precision than embeddings alone — worth it for medium/hard queries, skip it for simple ones. One sobering benchmark truth: “the retriever sets the ceiling” — no reranker pushed Hit@10 above 88% because the missing 12% never entered the candidate pool. Invest in retrieval recall (and Section 8a) first.</p>
<h4>8c. When graph beats vector (driven by the intent classifier)</h4>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Query type</th>
<th>Route</th>
<th>Evidence</th>
</tr>
</thead>
<tbody>
<tr>
<td>Lookup / single-hop fact</td>
<td>Hybrid vector</td>
<td>Per Han et al. (GraphRAG-Bench, arXiv:2506.05690, ICLR‘26), “GraphRAG achieves 13.4% lower accuracy on Natural Question compared to vanilla RAG”</td>
</tr>
<tr>
<td>Semantic / paraphrase</td>
<td>Hybrid vector</td>
<td>Dense’s home turf</td>
</tr>
<tr>
<td>Multi-hop / relationship (“which customers in Germany use a product from a company we acquired”)</td>
<td><strong>Graph</strong></td>
<td>GraphRAG-V +11pts recall on MultiHopRAG; Vector RAG relevancy collapses at multi-hop</td>
</tr>
<tr>
<td>Global summarization over a corpus</td>
<td>GraphRAG community summaries</td>
<td>Microsoft GraphRAG’s design point</td>
</tr>
<tr>
<td>Temporal (“who owned this account in February”)</td>
<td>Temporal graph (Graphiti/Zep)</td>
<td>Per the vectorize.io benchmark replicated in Rasmussen et al. (arXiv:2501.13956), Zep 63.8% vs Mem0 49.0% on LongMemEval</td>
</tr>
</tbody>
</table></div>
<p>GraphRAG costs 10–40x more to index ($50–200 vs $1–5 per corpus in one estimate) and ~2.3x query latency; it also drops ~16.6% accuracy on questions requiring real-time knowledge updates due to stale entity representations. <strong>Do not architect for hypothetical multi-hop queries — find the real ones in your logs first</strong>, then add a graph. LightRAG gives ~70–90% of GraphRAG quality at ~1/100th the cost as a middle ground.</p>
<p><strong>Full pipeline:</strong> classify → understand/rewrite → (hybrid dense+sparse retrieve, ACL-filtered) → RRF fuse → rerank → [optional graph traversal for multi-hop] → assemble context → LLM → cite.</p>
<h3>9. Context manager</h3>
<p>Context is a scarce, actively-managed resource — this is Anthropic’s “context engineering”: find “the smallest possible set of high-signal tokens.” Techniques, and when to use each:</p>
<ul>
<li><strong>Token budgeting per LLM call</strong> including tool outputs. Tool results are the biggest hidden context hog — cap and summarize them.</li>
<li><strong>Compaction/summarization</strong> — summarize old turns when the thread is long and continuity matters (Anthropic: “compaction maintains conversational flow for tasks requiring extensive back-and-forth”). Claude’s memory tool ships server-side context compaction for exactly this.</li>
<li><strong>Structured note-taking / scratchpad</strong> — persist salient facts outside the context window (“excels for iterative development with clear milestones”). This is the CLAUDE.md / progress-file pattern.</li>
<li><strong>Sliding window</strong> — keep the last <em>N</em> turns verbatim (working memory).</li>
<li><strong>Trimming</strong> — drop irrelevant retrieved chunks that the reranker scored low.</li>
<li><strong>Sub-agent isolation</strong> — for hard tasks, spin sub-agents with their own context windows and return only condensed summaries to the lead. Per Anthropic’s “How we built our multi-agent research system” (Jun 2025), “a multi-agent system with Claude Opus 4 as the lead agent and Claude Sonnet 4 subagents outperformed single-agent Claude Opus 4 by 90.2% on our internal research eval,” with token usage alone explaining ~80% of performance variance — at roughly 15x the tokens.</li>
</ul>
<p><strong>Summarize vs. re-retrieve:</strong> re-retrieve when the user pivots topic (cheaper and fresher than dragging stale context); summarize when the <em>same</em> thread grows long and history matters. Rule of thumb: if answering needs facts not in context, re-retrieve; if it needs the gist of a long conversation, summarize.</p>
<h4>Six layers of memory, two that mattered</h4>
<p>Every memory architecture diagram in 2025 showed the same six boxes. Having watched teams build all six, here is the honest verdict on which layers earn their latency-and-token budget and which are architecture theatre:</p>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>#</th>
<th>Layer</th>
<th>What it is</th>
<th>Cost per turn</th>
<th>Verdict</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Raw transcript replay</td>
<td>Full history re-injected</td>
<td>Unbounded tokens</td>
<td><strong>Theatre.</strong> Never inject. Keep for audit and auto-dream mining only.</td>
</tr>
<tr>
<td>2</td>
<td><strong>Working memory</strong></td>
<td>Last N turns verbatim (sliding window)</td>
<td>~Free — it’s already there</td>
<td><strong>Keep. One of the two.</strong></td>
</tr>
<tr>
<td>3</td>
<td><strong>Compressed scratchpad</strong></td>
<td>Running summary of salient facts, decisions, open threads — refreshed async every few turns</td>
<td>300–800 tokens, one cheap-LLM call amortized off the critical path</td>
<td><strong>Keep. The other one. Highest quality-lift per token in the whole memory stack.</strong></td>
</tr>
<tr>
<td>4</td>
<td>Episodic memory</td>
<td>Vector index over past sessions, similarity-recalled per turn</td>
<td>+1 retrieval hop, ~500–1500 tokens, low hit-rate when always-on</td>
<td><strong>Demote to a tool.</strong> Injected every turn it’s mostly noise; exposed as <code>search_past_chats</code> the agent calls when the user says “what did we decide last month,” it’s precise and free the other 95% of turns.</td>
</tr>
<tr>
<td>5</td>
<td>Semantic profile</td>
<td>Durable preferences and facts (the .md vault of Section 10)</td>
<td>200–500 tokens, static</td>
<td><strong>Keep — rides along nearly free.</strong> Cross-session, user-visible, cheap. Call it two-and-a-half.</td>
</tr>
<tr>
<td>6</td>
<td>Temporal knowledge graph</td>
<td>Entity graph with time-validity edges</td>
<td>A graph DB, an extraction pipeline, per-turn traversal latency</td>
<td><strong>Theatre for most workloads.</strong> Adopt only when temporal-relational queries provably fail on layers 2+3+5 — same evidentiary bar as GraphRAG in 8c.</td>
</tr>
</tbody>
</table></div>
<p>The pattern behind the verdicts: <strong>layers that condense earn their keep; layers that recall speculatively don’t.</strong> Working memory and the scratchpad are dense-by-construction — every token in them was recently relevant or explicitly distilled. Episodic recall and temporal graphs inject on a <em>guess</em> about relevance, and the guess is usually wrong, so you pay latency and context pollution for occasional wins — which is exactly why the fix is making recall <em>deliberate</em> (a tool call) rather than <em>ambient</em> (always-on injection). The LIGHT framework’s three-store result (episodic + working + scratchpad, below) is consistent with this: even in the paper, the scratchpad does disproportionate work.</p>
<h3>10. User memory</h3>
<p>Anthropic shipped Claude memory in 2025: it “periodically summarizes your conversations and carries forward… the most relevant context,” auto-generates memories (“when Claude detects something worth remembering… it creates a memory entry automatically”), is account/project-scoped, user-viewable/editable/deletable, opt-in (with an Incognito no-retention mode), and is moving toward file-based “Memory Files.” The developer memory tool is <strong>client-side</strong> — your app executes storage, so you control where memories live. This is the model to emulate: a background “auto-dream” process that mines past chats for durable preferences and context.</p>
<p><strong>Storage choice — graph vs .md files vs hybrid:</strong></p>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Approach</th>
<th>Strength</th>
<th>Weakness</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>.md files</strong> (CLAUDE.md-style)</td>
<td>Human-readable, user-editable, portable, versionable, no infra</td>
<td>No temporal reasoning, weak at relationships</td>
</tr>
<tr>
<td><strong>Graph</strong> (Graphiti/Zep)</td>
<td>Temporal + relationship reasoning; Zep 63.8% vs Mem0 49.0% LongMemEval</td>
<td>Operational weight (run a graph DB); expensive; post-ingest retrieval can lag</td>
</tr>
<tr>
<td><strong>Vector</strong> (Mem0)</td>
<td>Cheap, fast, token-efficient (Mem0 &lt;7k tokens/retrieval)</td>
<td>Weak on temporal/contradiction</td>
</tr>
</tbody>
</table></div>
<p><strong>Recommendation: hybrid.</strong> A <strong>markdown vault for canonical, user-visible preferences</strong> (portable, editable, the source of truth the user controls) <strong>plus a vector layer (Mem0-style) for transient session memory</strong> — the pattern “most mid-market deployments end up” with. Add a <strong>temporal graph (Graphiti)</strong> only if your domain has entities that change ownership/state over time. Memory system landscape: Mem0 (personalization, token-efficient), Zep/Graphiti (temporal, SOC2/HIPAA/GDPR), Letta/MemGPT (OS-style self-managed tiers), Cognee (unstructured-doc knowledge graphs).</p>
<p><em>(On the “LIGHT” framework: there is a genuine 2026 paper — “Beyond a Million Tokens,” arXiv:2510.27246, ICLR 2026 — presenting a memory framework named </em><em>LIGHT</em><em> that equips an LLM with three complementary systems: long-term </em><em>episodic</em><em> memory (FAISS-indexed), short-term </em><em>working</em><em> memory (recent turns), and a </em><em>scratchpad</em><em> of accumulated salient facts, improving memory-QA by 3.5–12.7% over strong baselines. Its three-store design maps directly onto layers 2–4 of the table above — validate against its BEAM benchmark if memory is central to your product. Note the name collides with Facebook’s unrelated LIGHT text-adventure environment.)</em></p>
<p><strong>Memory governance (non-negotiable):</strong>
- <strong>Write policy:</strong> only write high-confidence, durable facts (preferences, roles, recurring context) — not transcripts. Anthropic stores “preferences… not conversation transcripts.”
- <strong>Retrieval-time injection:</strong> inject only memories relevant to the current query (the scratchpad-filtering step).
- <strong>Decay/expiry:</strong> TTL on memories; refresh on re-observation.
- <strong>User control:</strong> view/edit/delete all memories; per-project scoping; incognito mode.
- <strong>Privacy boundaries:</strong> memories are account-scoped, never cross users, never leak across permission boundaries.</p>
<p><strong>Memory lifecycle diagram:</strong></p>` }} />
          <MermaidDiagram
            chart={CHART_3}
            aria-label="User memory lifecycle with auto-dream"
          />
          <div dangerouslySetInnerHTML={{ __html: `<h3>11. Evaluation is the product</h3>
<p>Public benchmarks tell you nothing about <em>your</em> system. Stronger claim: <strong>your eval set is the executable spec of your product.</strong> Every prompt change, model swap, chunker tweak, and reranker upgrade is gated on it — which means whoever owns the eval set owns product quality. Treat it like a test suite: versioned in git, reviewed in PRs, owned by a named team.</p>
<h4>Building a 200-question golden set with zero labels</h4>
<p>The classic failure mode: “a founding engineer hand-writes 80 cases in a Notion doc… six months later the gate is green every build [and] production is on fire.” Hand-imagined cases don’t match the real query distribution. Here’s how to build 200 real questions without paying for a single label up front:</p>
<ol>
<li><strong>Mine the distribution.</strong> Take 2–4 weeks of query logs, embed them, cluster (HDBSCAN or k-means), and sample proportionally per cluster. Your 200 questions now mirror what users actually ask — including the ugly, elliptical, jargon-filled ones your team would never have invented.</li>
<li><strong>Get retrieval labels for free by inverting the problem.</strong> Sample chunks from the corpus, have an LLM generate questions each chunk answers, and apply a round-trip consistency filter (does your retriever find the source chunk for its own question at generous k? if not even then, the question is ambiguous — drop it). Every surviving (question, source-chunk) pair is a retrieval label — <strong>recall@k and MRR are now measurable with zero humans.</strong></li>
<li><strong>Score generation without reference answers.</strong> Absolute LLM-judge scores are noisy and systematically optimistic; <strong>pairwise judging vs. a pinned baseline</strong> (does version B beat version A on this question?) is far more reliable. Add reference-free groundedness (RAGAS-style faithfulness: is every claim in the answer supported by the retrieved context?) — which also needs no labels because the retrieved context <em>is</em> the reference.</li>
<li><strong>Spend human effort where the machine disagrees with itself.</strong> Have one domain expert label the 30–50 cases where judges disagree or confidence is low, binary pass/fail with a one-line critique. This calibrates the judge (target 75–90% agreement — MT-Bench found GPT-4 agrees with humans ~80%, about human-human agreement) and seeds the four-bucket structure: production sample, adversarial, edge cases, and <strong>replays of failures that already shipped</strong>.</li>
</ol>
<h4>LLM-as-judge, with eyes open</h4>
<p>It’s systematically optimistic. Its top failure: factual verification <em>without reference context</em> — a judge asked “is this accurate?” with no source defaults to scoring plausibility, and “confident, fluent hallucinations often receive high scores.” Always give the judge the retrieved context. Run <strong>deterministic checks first</strong> — millisecond code evals (schema parses? contains a phone number it shouldn’t? one of N labels?) filter obvious breakage before you spend judge tokens. And self-host the judge: a 30B-class model judging pairwise with context is cheap enough to run nightly.</p>
<h4>The regression harness: catching drift before users do</h4>
<p>The harness is layered by cost, so the cheap layers run constantly:</p>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Check</th>
<th>What it catches</th>
<th>Cadence</th>
<th>Cost</th>
<th>Alert threshold</th>
</tr>
</thead>
<tbody>
<tr>
<td>Retrieval recall@10 / MRR on synthetic (Q, chunk) pairs — <strong>no generation step</strong></td>
<td>Retrieval drift from re-chunking, index changes, filter bugs, ACL-sync regressions</td>
<td>Nightly</td>
<td>Pennies</td>
<td>recall@10 drops &gt;2pts vs 7-day baseline</td>
</tr>
<tr>
<td><strong>Embedding staleness sentinel</strong> — re-embed a fixed sentinel set, compare top-k neighbor overlap (Jaccard) against the pinned index version</td>
<td>Silent embedding-model updates, index corruption, quantization regressions</td>
<td>Weekly + on any model/index change</td>
<td>Trivial</td>
<td>Jaccard &lt;0.8</td>
</tr>
<tr>
<td>Pairwise generation judge vs pinned baseline on the 200-set</td>
<td>Prompt/model regressions, provider-side silent model updates</td>
<td>Weekly + pre-deploy canary</td>
<td>Moderate</td>
<td>Win-rate &lt;45%</td>
</tr>
<tr>
<td>Adversarial/red-team suite (OWASP LLM Top 10: injection, insecure output, excessive agency)</td>
<td>Safety regressions</td>
<td>Pre-deploy, always</td>
<td>Moderate</td>
<td>Any new failure</td>
</tr>
<tr>
<td>Judge-calibration re-check vs human labels</td>
<td>The judge itself drifting</td>
<td>Monthly</td>
<td>Human time</td>
<td>Agreement &lt;75%</td>
</tr>
<tr>
<td>Production failure replay intake</td>
<td>Reality</td>
<td>Continuous</td>
<td>—</td>
<td>Every meaningful prod failure becomes a case</td>
</tr>
</tbody>
</table></div>
<p><strong>Online:</strong> sample 5–10% of production traffic through the groundedness judge; A/B new versions behind the gateway; route low-confidence answers to human review; promote failures into the regression set. <strong>Canary before deploy:</strong> no model/prompt version touches traffic until it passes the golden + adversarial sets.</p>
<p><strong>Tooling:</strong> <strong>LangSmith</strong> has the more mature eval system (configurable judges, few-shot correction where human corrections feed back as few-shot examples, dataset tooling, failure clustering) and zero-config tracing if you’re on LangChain/LangGraph. <strong>Langfuse</strong> added Score Analytics (Nov 2025: evaluator precision/recall/F1) and baseline comparison, runs LLM-as-judge + code evals in-platform, and gates CI/CD. Ragas for RAG-specific metrics (context precision/recall, faithfulness). Arize Phoenix’s Evals library ships pre-benchmarked templates (70–90% precision targets).</p>
<h3>12. Monitoring &amp; drift</h3>
<p><strong>Observability stack (opinionated):</strong>
- <strong>Langfuse</strong> for LLM observability — traces, sessions, per-trace/session cost, prompt management. v3 is OpenTelemetry-native, so traces slot into an existing OTel backend (Jaeger/Tempo/Honeycomb). Self-hostable (data residency).
- <strong>ELK/OpenSearch</strong> for application logs.
- <strong>Prometheus + Grafana</strong> for infra metrics.
- <strong>Distributed tracing across agent hops</strong> — one trace ID spanning classifier → planner → each tool call → synthesis, so you can see where a multi-agent request spent its time and tokens.</p>
<p><strong>LangSmith vs Langfuse — take a position:</strong> they overlap heavily (tracing + evals). <strong>Running both is redundant waste.</strong> My recommendation: <strong>run Langfuse for production observability + cost</strong> (OSS, self-hostable, framework-agnostic, OTel-native), and <strong>only add LangSmith if you are all-in on LangChain/LangGraph and want its stronger eval maturity</strong> — in which case you can arguably run LangSmith alone. Do not pay for and operate both. If forced to one: Langfuse for most teams; LangSmith for deep-LangChain shops that lean on evals.</p>
<p><strong>Drift monitoring — two distinct problems:</strong></p>
<p><em>Technical drift (is the machine healthy?):</em>
- <strong>Embedding/data drift</strong> — track distribution shift and embedding-centroid distance across time windows (Arize Phoenix does embedding drift + retrieval relevance; Evidently for statistical drift; note WhyLabs was acquired by Apple in early 2025 — plan around it). Alert on PSI/KS/Wasserstein shifts. The sentinel-Jaccard check in Section 11 is the cheapest version of this.
- <strong>Model drift</strong> — silent upstream provider updates change behavior with zero code change; catch via scheduled golden-set re-runs vs. a baseline.
- <strong>Infra signals</strong> — error rates, p95/p99 latency, tool failure rates, per-tool timeouts.</p>
<p><em>Non-technical drift (are users being failed, even when nothing errors?)</em> — this is the signal most dashboards miss (“the tool wasn’t lying. It was measuring the wrong four signals”):
- <strong>Hallucination tracking</strong> — sample traffic through a groundedness judge; rule-based groundedness checks (regex on known product names, prices, dates) catch a lot cheaply.
- <strong>Thumbs-down rate</strong>, <strong>reformulation/retry rate</strong> (user rephrases → we failed), <strong>session abandonment</strong>, <strong>escalation-to-human rate</strong>, and <strong>sentiment of follow-up messages</strong> (frustration in the next turn is a wrong-answer signal even without a thumbs-down).
- <strong>Cadence that works:</strong> daily on rubric/embedding-distance hot signals; weekly on judge-calibration drift (rebuild the human-labeled set, re-score, alarm on agreement drop) and retrieval-corpus drift.</p>
<h3>13. Infrastructure: the substrate everything runs on</h3>
<p>This is where “we built an agent” becomes “we run a platform.” Kubernetes is the substrate; the interesting decisions are node pools, serving economics, the async backbone, caching, and stateful-service operations.</p>
<h4>Kubernetes topology</h4>
<p>Four node pools, because the workloads have nothing in common:</p>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Pool</th>
<th>Hardware</th>
<th>Runs</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>general</code></td>
<td>CPU, standard</td>
<td>BFF, gateway, orchestrator, classifiers, retrieval svc, connectors, workers</td>
<td>HPA on RPS/CPU; the boring majority</td>
</tr>
<tr>
<td><code>gpu-inference</code></td>
<td>L40S/A100/H100</td>
<td>vLLM, TEI (embeddings + reranker)</td>
<td>Taint <code>nvidia.com/gpu</code>; scale on <code>vllm:num_requests_waiting</code>, <strong>not</strong> CPU — GPU pods look idle on CPU while saturated</td>
</tr>
<tr>
<td><code>sandbox</code></td>
<td><strong>Bare-metal or nested-virt enabled</strong></td>
<td>Firecracker/Kata microVMs</td>
<td>Firecracker needs <code>/dev/kvm</code>; standard cloud VMs without nested virt can’t run it. Taint hard; nothing else schedules here</td>
</tr>
<tr>
<td><code>data</code></td>
<td>Memory-optimized, local NVMe</td>
<td>Qdrant, ClickHouse (if self-hosting stateful)</td>
<td>Prefer managed Postgres/Redis; self-host Qdrant with the operator</td>
</tr>
</tbody>
</table></div>
<p>Namespaces per plane (edge, orchestration, retrieval, exec, ingest, data, obs) with <strong>default-deny NetworkPolicies</strong> and explicit allows matching the architecture diagram — the diagram <em>is</em> your network policy spec. All egress through an <strong>Envoy egress gateway</strong> with per-namespace allowlists: the orchestration plane may reach LLM providers and MCP servers; the sandbox pool reaches only its task-scoped allowlist; ingestion reaches only registered connector endpoints. If a prompt-injected agent tries to exfiltrate to an arbitrary domain, the egress layer — not the model’s good behavior — is what stops it.</p>
<p>Secrets: <strong>External Secrets Operator + Vault</strong> (or cloud secret manager); nothing in env vars at build time; SPIRE issues workload SVIDs; skip a full service mesh at small scale (mTLS at the critical hops — gateway↔providers, orchestrator↔tools — via SPIFFE-aware sidecars) and adopt Linkerd before Istio if you later want mesh-wide mTLS with minimal ops tax.</p>
<p><strong>Autoscaling that actually works here:</strong> HPA on RPS for stateless services; <strong>KEDA on RabbitMQ queue depth</strong> for Celery workers (ingestion bursts when someone connects a 10-year-old Drive); GPU pool scales on vLLM queue-wait with a <strong>warm floor of one replica per model</strong> — model load is 1–5 minutes, so scale-from-zero means a five-minute p99 for the first user. Accept the warm-floor cost or route cold-start overflow to API.</p>
<h4>Model serving economics: what to self-host and why</h4>
<p>The right mental model is <strong>two tiers with opposite economics</strong>:</p>
<ul>
<li><strong>Utility tier (self-host on vLLM):</strong> classification fallback, query rewriting, scratchpad compression, summarization, LLM-as-judge, memory auto-dream. High-volume, low-stakes, latency-tolerant of a 4–14B model. A single L40S-class node (~$1.0–1.5/hr ≈ ₹65–95k/month) running a Qwen3-8B at FP8 with continuous batching serves thousands of tokens/sec aggregate. The same call volume through a mid-tier API at ~$3/MTok input crosses that monthly cost around <strong>~2B input tokens/month — which a busy 1,000-person deployment hits easily once rewriting, judging, and compression run on every medium/hard query.</strong> Self-hosting the utility tier is usually the single biggest cost lever after tiered routing, and it keeps rewrites and judgments data-resident.</li>
<li><strong>Frontier tier (API via the gateway):</strong> final synthesis on hard queries, complex planning, anything where quality is the product. Spiky, low-volume relative to utility calls, and you cannot match frontier quality self-hosted. Don’t try.</li>
</ul>
<p>vLLM configuration that matters: <strong>automatic prefix caching on</strong> (the static system prompt + tool schemas are 2–8k tokens re-sent on every call; prefix cache turns them into near-free TTFT), FP8/AWQ quantization (halves VRAM, minor quality cost at this tier), tensor parallelism only when a model doesn’t fit one card. TEI (Hugging Face text-embeddings-inference) serves both Qwen3-Embedding and the reranker; embeddings tolerate CPU at low QPS, but the reranker sits on the interactive path — give it GPU.</p>
<p><strong>The gateway makes tiers operational:</strong> LiteLLM model groups (<code>utility</code> → vLLM, <code>frontier</code> → Anthropic with OpenAI fallback), retries and provider failover at the gateway (not in app code), canary weights for new models (5% traffic → compare in Langfuse → promote), and per-team virtual keys from Section 2. One deliberate choice: <strong>the orchestrator never knows provider URLs.</strong> Every LLM call, self-hosted or API, goes through the gateway — that’s what makes routing, budgeting, caching, and canarying single-point-of-control instead of scattered through app code.</p>
<h4>The async backbone: Celery/RabbitMQ vs Temporal</h4>
<p>Everything that isn’t the interactive request path runs async: ingestion, permission re-sync, memory auto-dream, nightly evals, long agent jobs.</p>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th></th>
<th>Celery + RabbitMQ</th>
<th>Temporal</th>
</tr>
</thead>
<tbody>
<tr>
<td>Model</td>
<td>Task queue, at-least-once</td>
<td>Durable execution, replayable workflows</td>
</tr>
<tr>
<td>Multi-step failure handling</td>
<td>You build saga/compensation</td>
<td>Built-in: history replay, versioned workflows</td>
</tr>
<tr>
<td>Ops burden</td>
<td>Low, well-understood</td>
<td>New cluster + new programming model</td>
</tr>
<tr>
<td>Fit</td>
<td>Ingestion, batch, scheduled jobs</td>
<td>Hours/days-long workflows with human approvals</td>
</tr>
</tbody>
</table></div>
<p><strong>Recommendation:</strong> Celery + RabbitMQ for the batch plane — priority queues (interactive-adjacent jobs never starve behind a corpus re-index), <code>acks_late</code> + idempotent tasks, dead-letter exchange for the DLQ, Celery Beat for schedules (permission re-sync every 15 min, auto-dream nightly, eval harness nightly). <strong>LangGraph’s PostgresSaver checkpointer already gives durable resumable execution for the agent path</strong>, which covers most of what teams reach for Temporal for. Adopt Temporal only when agent workflows genuinely span hours-to-days with human approval gates and the checkpointer’s node-granularity resume isn’t enough.</p>
<h4>Caching: four tiers, one hard rule</h4>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Tier</th>
<th>Mechanism</th>
<th>Hit economics</th>
<th>Gotcha</th>
</tr>
</thead>
<tbody>
<tr>
<td>1. Provider prompt cache</td>
<td>Anthropic prompt caching (reads ~0.1x, writes ~1.25x, 5-min TTL) / vLLM prefix cache</td>
<td>Static prefix (system + tools + policies) becomes ~free</td>
<td>Structure prompts static-first, volatile-last, or the cache never hits</td>
</tr>
<tr>
<td>2. Semantic answer cache</td>
<td>Redis + embedding similarity (cosine ≳0.95) on rewritten query</td>
<td>Workspace queries repeat brutally — “leave policy,” “wifi password,” “how do I expense” — 20–40% hit rates are realistic</td>
<td><strong>The hard rule below</strong></td>
</tr>
<tr>
<td>3. Retrieval cache</td>
<td>(rewritten query, filter set) → doc IDs, short TTL (minutes)</td>
<td>Saves the retrieve+rerank hop on rapid follow-ups</td>
<td>Invalidate on index version bump</td>
</tr>
<tr>
<td>4. Embedding cache</td>
<td>hash(text) → vector</td>
<td>Saves re-embedding unchanged chunks on incremental syncs</td>
<td>Key must include model+version</td>
</tr>
</tbody>
</table></div>
<p><strong>The hard rule: the semantic cache key must include the user’s permission hash.</strong> A cached answer synthesized from documents user A can see, served to user B who cannot, is a data leak that bypassed your entire permission-aware retrieval architecture through the side door. Scope cache entries per-user or per-ACL-group-signature, and flush affected entries on permission-sync changes. This is the most common way otherwise-correct systems leak.</p>
<h4>Stateful services: HA, sizing, DR</h4>
<ul>
<li><strong>Postgres:</strong> managed (RDS/Cloud SQL) or CloudNativePG; PITR backups. It carries the permission mirror, lineage, LangGraph checkpoints, agent registry, and gateway spend — consider splitting checkpoint churn (high write volume, low value-per-row) from the permission/lineage OLTP instance.</li>
<li><strong>Qdrant:</strong> 3-node cluster, replication factor 2, snapshots to S3 nightly. Sizing: RAM ≈ vectors × dims × 4 bytes (fp32) × ~1.5 HNSW overhead; scalar quantization cuts it ~4x, binary ~32x. <strong>10M chunks × 1024-dim ≈ 41GB fp32 → ~12–15GB with int8 SQ</strong> — one 64GB node holds it; the cluster is for availability, not capacity, at this scale.</li>
<li><strong>Redis:</strong> Sentinel or managed; logically separate cache (evictable) from rate-limit counters and session state (not evictable).</li>
<li><strong>ClickHouse:</strong> only if self-hosting Langfuse v3 at volume; traces are columnar-friendly and cheap there.</li>
<li><strong>DR targets:</strong> RPO minutes (PITR + snapshots), RTO under an hour. The one thing you cannot quickly rebuild is the vector index — a full re-embed of a large corpus takes days and real money, so treat Qdrant snapshots as tier-1 backups, not nice-to-haves.</li>
</ul>
<h4>Environments and rollout</h4>
<p>Dev/staging/prod with GitOps (ArgoCD + Helm, infra in Terraform). Three rollout patterns specific to this system: <strong>shadow indexes</strong> for embedding-model changes (dual-write new index, shadow-read and compare recall via the Section 11 harness, cut over behind the eval gate); <strong>gateway-weight canaries</strong> for model/prompt changes (5% → Langfuse comparison → promote); <strong>connector staging</strong> (a new connector runs against staging with a scoped service account and passes permission-sync verification before touching prod). Rough footprint for a 1,000-person org (~10k queries/day, 2–5 QPS peak): 6–10 general CPU nodes, 1 GPU node, 1 sandbox node, managed Postgres/Redis, 3-node Qdrant — <strong>on the order of $3–5k/month infra plus API spend</strong>, which Section 14 puts under control.</p>
<h3>14. Cost per answer: rupees-per-query as a design constraint</h3>
<p>Treat cost-per-answer the way you treat p95 latency: a budgeted, monitored, per-request property of the system — not a monthly invoice surprise. The unit economics decide whether this platform scales to the whole company or gets quietly throttled by finance.</p>
<h4>The cost model</h4>
<pre><code>cost(answer) = classify + rewrite + embed(query) + retrieve + rerank
             + sum over agent steps ( input_tokens_i x rate_in + output_tokens_i x rate_out )
             + tool-call costs
</code></pre>
<p>The killer term is the sum: <strong>in an agent loop, context accumulates, so each step re-sends everything the previous steps produced.</strong> Input tokens grow roughly linearly per step, which makes total input cost grow <strong>quadratically</strong> with step count. This is why a “quick 3-step agent” costs an order of magnitude more than intuition says.</p>
<h4>Worked example (illustrative rates: cheap tier $1/$5 per MTok, mid tier $3/$15, ₹85/$)</h4>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Path</th>
<th>Token profile</th>
<th>Cost</th>
<th>₹</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Simple</strong> — classifier + cheap-tier answer</td>
<td>1.5k in / 0.3k out</td>
<td>~$0.003</td>
<td><strong>₹0.26</strong></td>
</tr>
<tr>
<td><strong>Medium RAG</strong> — rewrite (cheap) + retrieve + rerank + mid-tier answer</td>
<td>0.7k cheap + 6k in / 0.5k out mid</td>
<td>~$0.027</td>
<td><strong>₹2.3</strong></td>
</tr>
<tr>
<td><strong>Hard 3-step agent (naive)</strong> — mid tier, context accumulating 8k → 16k → 28k as tool outputs pile in</td>
<td>~52k in / 2.1k out</td>
<td>~$0.19</td>
<td><strong>₹16</strong></td>
</tr>
</tbody>
</table></div>
<p><strong>₹16 vs ₹0.26 — the 3-step agent loop really is ~60x a single call</strong>, and a 5-step loop with fatter tool outputs clears 100x. Blended at a realistic 60/30/10 simple/medium/hard mix: <strong>~₹2.4/query</strong>. Untamed — every query to a frontier model with an eager agent loop — the same mix runs 10–20x that.</p>
<h4>The five levers, in order of leverage</h4>
<ol>
<li><strong>Tiered routing (the classifier again).</strong> 60–70% of workspace traffic is simple/medium and never needs the frontier tier or a loop. This is the same intent classifier from Section 5 wearing a finance hat — one component, two jobs.</li>
<li><strong>Caching.</strong> A 25% semantic-cache hit rate cuts blended cost 25% outright (→ ~₹1.8/query in the example). Prompt caching takes another large bite out of the hard path: the 3–8k static prefix (system + tools) re-sent on <em>every step of every loop</em> drops to ~0.1x — the naive ₹16 hard query lands closer to ₹8–10 with prefix caching plus tool-output compression between steps.</li>
<li><strong>Early exits.</strong> If the reranker’s top score is high and intent is medium, answer directly — skip the planner. If retrieval comes back empty after the retry ladder, say so in one cheap call instead of letting an agent flail through five steps trying to conjure sources. Confidence thresholds are exit ramps.</li>
<li><strong>Budget guards.</strong> Carry a cumulative token/₹ counter in LangGraph state with a per-intent-class ceiling (say, ₹20/hard query). On breach: stop, summarize what’s done, return a partial answer with “want me to continue?” — degrade gracefully, never silently burn ₹200 on a runaway loop. Per-team monthly ceilings enforce at the LiteLLM layer (Section 2); per-query ceilings enforce in the orchestrator. You need both.</li>
<li><strong>Context pruning between steps.</strong> Don’t re-send raw tool outputs; compress them to what the next step needs (Section 9). This directly attacks the quadratic term.</li>
</ol>
<p><strong>Dashboard the unit economics:</strong> blended ₹/query, ₹/query by intent class, cache hit rates, budget-guard trip rate, and <strong>₹ per <em>resolved</em> query</strong> (cost divided by answers that weren’t reformulated or thumbs-downed) — the last one is the honest number, because a cheap wrong answer that triggers three retries is more expensive than one good ₹16 answer.</p>
<h2>Error handling &amp; reliability (cross-cutting, non-negotiable)</h2>
<p>Agentic systems fail partially and constantly; design for it:
- <strong>Idempotency keys</strong> on every side-effecting tool call — critical because LangGraph <em>re-executes a node from its start</em> on resume after an interrupt, so any pre-interrupt API charge or DB write must be idempotent or it double-fires.
- <strong>Exponential backoff with jitter</strong> on transient failures (429s, 5xx) to LLMs and tools.
- <strong>Circuit breakers</strong> per tool/provider — trip open after a failure threshold, fail fast, half-open to probe recovery.
- <strong>Timeouts per tool</strong> — every tool has a wall-clock budget; a slow tool must not hang a DAG.
- <strong>Dead-letter queues</strong> for ingestion and async tool jobs that exhaust retries — inspect and replay, don’t silently drop.
- <strong>Partial-failure UX</strong> — when one node in a DAG fails, show the user what <em>did</em> succeed with citations, mark the failed branch explicitly (“couldn’t reach Jira; here’s what I found in Confluence”), and offer retry — never fail the whole answer because one of five tools timed out.
- <strong>Saga / compensation for multi-step actions</strong> — if the agent performs a sequence of writes (create ticket → assign → notify) and step 3 fails, run compensating actions to undo steps 1–2, or checkpoint so a human can resume. Use LangGraph checkpointers (state snapshot per super-step, keyed by <code>thread_id</code>) + interrupts for human approval of high-risk steps. Gate irreversible actions (delete, payment, prod change) behind an <code>interrupt()</code> approval — payments under a threshold auto-approve, above it route to a human queue.</p>
<h2>Management dashboard: what execs and platform owners see</h2>
<div aria-label="Comparison table" class="blog-table-wrap" role="region"><table>
<thead>
<tr>
<th>Metric</th>
<th>Why it matters</th>
<th>Owner</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Cost per team / user / model tier + blended ₹/query and ₹/resolved-query</strong></td>
<td>Chargeback, budget enforcement, catch a team hammering the frontier tier</td>
<td>Platform + Finance</td>
</tr>
<tr>
<td><strong>Adoption: DAU/WAU, queries/user, retention</strong></td>
<td>Is anyone actually using it</td>
<td>Exec</td>
</tr>
<tr>
<td><strong>Answer quality trend</strong> (judge score, thumbs-up rate over time)</td>
<td>Is it getting better or drifting</td>
<td>Product</td>
</tr>
<tr>
<td><strong>Wrong-answer / hallucination rate</strong></td>
<td>The trust-killer; track explicitly</td>
<td>Product + Eng</td>
</tr>
<tr>
<td><strong>Top failing intents</strong></td>
<td>Where to invest next</td>
<td>Product</td>
</tr>
<tr>
<td><strong>Data-source coverage gaps</strong> (“couldn’t find it” admissions by source)</td>
<td>Questions we <em>can’t</em> answer for lack of a connector</td>
<td>Platform</td>
</tr>
<tr>
<td><strong>Incident &amp; error rates, p95 latency, budget-guard trips</strong></td>
<td>Reliability</td>
<td>Eng</td>
</tr>
<tr>
<td><strong>Escalation-to-human &amp; reformulation rates</strong></td>
<td>Silent-failure proxy</td>
<td>Product</td>
</tr>
</tbody>
</table></div>
<h2>Closing: the build order</h2>
<p><strong>Phase 1 — Startup scale (prove value, weeks-to-months):</strong>
- IdP federation (OIDC) + <strong>permission-aware retrieval from day one</strong> (this is not optional even at MVP — it’s the trust foundation).
- 2–3 connectors (Drive, Slack, Confluence) with CDC sync and ACL mirroring.
- <strong>pgvector</strong> + recursive chunking + hybrid (dense+BM25) + RRF; <strong>Qwen3 or Gemini embeddings</strong>.
- <strong>Conversational query rewriting</strong> from the first chat release — it’s the highest-ROI retrieval fix and it’s one cheap LLM call.
- <strong>LiteLLM</strong> gateway with per-team virtual keys; <strong>LangGraph</strong> orchestration; <strong>Langfuse</strong> for traces + cost.
- Embedding intent router (simple/medium/hard/bad) with LLM fallback — doing double duty as the cost-tiering router.
- Off-the-shelf UI (Open WebUI or LibreChat) to move fast.
- A 200-case golden set bootstrapped with the zero-label pipeline (log clustering + question-from-chunk synthesis); deterministic + judge evals in CI; nightly retrieval-recall run.</p>
<p><strong>Phase 2 — Mid-size (harden &amp; differentiate):</strong>
- Migrate to <strong>Qdrant</strong> (filtered search at scale); add a <strong>reranker</strong> (Cohere 3.5 or Jina v3 on TEI).
- Self-host the <strong>utility model tier on vLLM</strong> (rewrite/classify/judge/compress) — the biggest cost lever after routing; add the four-tier cache with <strong>permission-scoped semantic caching</strong>.
- <strong>E2B/Firecracker sandbox</strong> for any code execution; egress allowlists; runtime secrets.
- Agent registry with capability manifests + invocation ACLs + approval workflow.
- <strong>User memory</strong>: working memory + compressed scratchpad + profile vault (the layers that matter); episodic recall as an on-demand tool.
- Full error-handling suite: idempotency, backoff+jitter, circuit breakers, DLQs, saga/compensation, HITL approvals via LangGraph interrupts; <strong>per-query budget guards with graceful early exits</strong>.
- Hand-rolled agentic UI with streaming plans, tool-call visibility, citations, partial-failure UX.
- Drift monitoring (embedding sentinels, Arize Phoenix/Evidently); non-technical signals (thumbs-down, reformulation, abandonment); management dashboard with unit economics.</p>
<p><strong>Phase 3 — Enterprise-grade (scale, compliance, trust):</strong>
- <strong>RFC 8693 token exchange</strong> delegation + <strong>SPIFFE</strong> agent workload identity + MCP OAuth 2.1 for tool servers; Biscuit/macaroon attenuation for sub-agent chains.
- <strong>GraphRAG/Graphiti</strong> — added <em>because your logs proved</em> multi-hop/temporal queries fail on vectors, not speculatively. Same bar for temporal-graph memory.
- Milvus if you cross billion-vector scale; Temporal if agent workflows span days with approval gates.
- GDPR deletion propagation across index/embeddings/graph/memory; PII detection; index versioning + shadow re-embedding on model changes.
- SOC2/ISO-grade audit trails (every query, response, and document-access path logged); tenant isolation; incognito/no-retention paths.
- Chargeback, model-tier entitlements, and cost governance enforced at the gateway; canary + online evals + A/B as the standard deploy path.</p>
<p><strong>The one-sentence thesis:</strong> build the permission-aware retrieval and identity spine first, make the boring reliability parts (idempotency, sandboxing, evals-from-real-traffic, per-query cost budgets) non-negotiable, and add the exotic parts — graphs, temporal memory, multi-agent, attenuated delegation — only when your own production logs prove you need them.</p>
<h2>Caveats</h2>
<ul>
<li><strong>Fast-moving landscape.</strong> MTEB standings, reranker leaderboards, and gateway features shifted materially in 2025–2026; several cited data points come from vendor blogs and aggregators — <strong>re-verify against primary leaderboards and benchmark on your own corpus</strong> before committing. The FinMTEB result (best general model drops ~8.5 points on-domain) is the reason.</li>
<li><strong>All ₹/$ figures in Sections 13–14 are illustrative</strong>, built on round list-price assumptions to make the <em>ratios</em> (the 60x agent-loop multiplier, the utility-tier breakeven) legible. Re-run the math with your providers’ current rates and your actual token profiles; the ratios are durable, the absolute numbers are not.</li>
<li><strong>Vendor sources.</strong> Several comparisons (gateway, sandbox, memory, reranker rankings) are from vendors with a stake (Requesty, Agentset, ZeroEntropy, Northflank, etc.); claims are cross-checked where possible, but treat specific benchmark numbers as directional.</li>
<li><strong>Some cited features are recent or release-candidate</strong> (MCP 2026 revisions, Entra Agent ID, Auth0 for AI Agents GA, LangSmith Engine) — confirm GA status and API stability before you depend on them.</li>
<li><strong>Benchmark disputes are real</strong> — memory vendors (Mem0 vs Zep) publicly dispute each other’s LongMemEval/LOCOMO numbers; run evals on your own workload rather than trusting any single reported score.</li>
<li><strong>This is an architecture guide, not a security audit.</strong> The auth patterns (especially offline token attenuation) are genuinely contested; involve your security team and threat-model your specific deployment.</li>
</ul>` }} />
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
