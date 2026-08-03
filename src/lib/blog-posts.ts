import { SITE_URL } from '@/lib/seo';

export { SITE_URL };

export type BlogPost = {
  slug: string;
  title: string;
  /** Document <title> stem — keep ≤42 chars so "+ — Arvind Narayan" fits SERP. */
  metaTitle: string;
  description: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  coverAlt: string;
  coverPath: string;
  ogImage: string;
  wordCount: number;
  readingMinutes: number;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'down-the-fraud-rabbit-hole',
    title: 'Down the Fraud Rabbit Hole: Why the Office Refuses to Die',
    metaTitle: 'Down the Fraud Rabbit Hole',
    description:
      "A builder's journal on fake candidates, the RTO morality play, and why your CEO's culture sermon is really a lie detector with a cafeteria attached.",
    date: '2026-08-03',
    tags: [
      'hiring',
      'candidate-fraud',
      'return-to-office',
      'remote-work',
      'trust',
      'recruiting-ai',
      'identity-verification',
      'wfh',
      'bengaluru',
    ],
    coverAlt:
      'Sepia Dalí-style doodle: a melting office tower drips into a rabbit hole; a giant hand puppets blank-faced suited figures holding masks; a webcam on stilts watches; a solitary writer works at a desk while a laptop and briefcase fly into the desert',
    coverPath: '/blog/down-the-fraud-rabbit-hole',
    ogImage: '/blog/down-the-fraud-rabbit-hole/og.jpg',
    wordCount: 4700,
    readingMinutes: 21,
  },
  {
    slug: 'an-exasperating-farrago-of-firewalls',
    title:
      'An Exasperating Farrago of Firewalls: A 360° Field Guide to Security in the Age of Agentic AI',
    metaTitle: 'An Exasperating Farrago of Firewalls',
    description:
      'The modern burglar logs in with stolen credentials, hands off in 22 seconds, and increasingly lets an AI do the burgling. A witty, technical tour of 360° security — code, cloud, network, email, ransomware, encryption, detection — and how to defend it all.',
    date: '2026-08-03',
    tags: [
      'cybersecurity',
      'agentic-ai',
      'ai-security',
      'zero-trust',
      'ransomware',
      'prompt-injection',
      'mcp-security',
      'encryption',
      'incident-response',
      'infosec',
      'agentic-soc',
      'security-vendors',
    ],
    coverAlt:
      'Sepia single-line Dalí-style doodle of the shore at Troy: the wooden horse looms on impossibly long spindly legs casting a shadow the wrong way, a melting pocket watch draped on its back, while Greek ships line the beach, stick-thin armies stream across the sand, and the towers of Troy sag on stilts and crutches',
    coverPath: '/blog/an-exasperating-farrago-of-firewalls',
    ogImage: '/blog/an-exasperating-farrago-of-firewalls/og.jpg',
    wordCount: 10120,
    readingMinutes: 44,
  },
  {
    slug: 'the-nutritionist-in-the-machine',
    title: 'The Nutritionist in the Machine',
    metaTitle: 'The Nutritionist in the Machine',
    description:
      'How a nutrition recommender actually decides what lands on your plate — and why it needs more than an LLM labouring under delusions of competence.',
    date: '2026-08-02',
    tags: [
      'nutrition',
      'recommender-systems',
      'constrained-optimisation',
      'llm',
      'personalization',
      'food-tech',
      'ml-systems',
      'healthcare-ai',
    ],
    coverAlt:
      'Sepia surrealist architectural sketch of a desert plain where paths converge on a central pedestal machine, with crystalline scaffolds on one side and melting classical forms on the other — a recommendation system processing human data',
    coverPath: '/blog/the-nutritionist-in-the-machine',
    ogImage: '/blog/the-nutritionist-in-the-machine/og.jpg',
    wordCount: 5600,
    readingMinutes: 24,
  },
  {
    slug: 'the-rope-sellers-buy-a-rope-machine',
    title: 'The Rope Sellers Buy a Rope Machine',
    metaTitle: 'The Rope Sellers Buy a Rope Machine',
    description:
      'Indian IT slept through the AI revolution, woke up to a crashing stock price, and is signing partnerships like gym memberships after a heart attack.',
    date: '2026-08-01',
    tags: [
      'indian-it',
      'agentic-ai',
      'anthropic',
      'tcs',
      'infosys',
      'outsourcing',
      'professional-services',
      'china-ai',
    ],
    coverAlt:
      'Sepia Dalí-style drawing of galloping horses melting into liquid as frayed ropes snap, with tiny figures clinging on, a melting clock and bell, and a smoky factory in the distance',
    coverPath: '/blog/the-rope-sellers-buy-a-rope-machine',
    ogImage: '/blog/the-rope-sellers-buy-a-rope-machine/og.jpg',
    wordCount: 3200,
    readingMinutes: 14,
  },
  {
    slug: 'the-tree-not-the-titan',
    title:
      "The Tree, Not the Titan: Why AI's Future Is Architect Models Over Specialists — and Where That Intuition Breaks",
    metaTitle: 'The Tree, Not the Titan',
    description:
      'Biology, MoE, routers, and agent swarms point at hierarchy — trees win when tasks decompose; monoliths win when problems are entangled.',
    date: '2026-08-01',
    tags: [
      'architect-models',
      'mixture-of-experts',
      'multi-agent',
      'compound-ai',
      'routing',
      'bitter-lesson',
      'neuroscience',
      'slm',
    ],
    coverAlt:
      'Sepia Dalí-style line drawing: a fan of sensory icons braids into a cord through a desert needle, watched by a spindly surreal tree of eyes and ears, while a hand writes a single line with the thread',
    coverPath: '/blog/the-tree-not-the-titan',
    ogImage: '/blog/the-tree-not-the-titan/og.jpg',
    wordCount: 4010,
    readingMinutes: 17,
  },
  {
    slug: 'the-rope-sellers',
    title: 'The Rope Sellers',
    metaTitle: 'The Rope Sellers',
    description:
      'How agentic AI is gutting the Big 4, consulting, and Indian IT — and why firms that keep pricing power are the ones forced to sign their name in blood.',
    date: '2026-07-31',
    tags: [
      'agentic-ai',
      'consulting',
      'big-4',
      'indian-it',
      'accountability',
      'professional-services',
      'labor',
    ],
    coverAlt:
      'Sepia line drawing of a human consulting pyramid; the partner at the top signs with a fountain pen while ropes pull juniors into a gear-filled AI cloud',
    coverPath: '/blog/the-rope-sellers',
    ogImage: '/blog/the-rope-sellers/og.jpg',
    wordCount: 2900,
    readingMinutes: 13,
  },
  {
    slug: 'vibes-all-the-way-down',
    title: 'Vibes All the Way Down: Notes on Outsourcing Intuition',
    metaTitle: 'Vibes All the Way Down',
    description:
      'Are we augmenting intelligence, or outsourcing it? Notes on vibe coding, workslop, cognitive debt, and handing judgment to the model.',
    date: '2026-07-31',
    tags: [
      'vibe-coding',
      'workslop',
      'cognitive-debt',
      'ai',
      'intuition',
      'automation',
      'enterprise-ai',
    ],
    coverAlt:
      'Hand-drawn dystopian doodle of suited workers with closed eyes, puppeted by an abstract knot-cloud of bots above classical ruins — warm cream paper, espresso ink',
    coverPath: '/blog/vibes-all-the-way-down',
    ogImage: '/blog/vibes-all-the-way-down/og.jpg',
    wordCount: 3999,
    readingMinutes: 17,
  },
  {
    slug: 'anatomy-of-an-agentic-ai-system',
    title: 'Anatomy of an Agentic AI System for the Workspace',
    metaTitle: 'Anatomy of an Agentic AI System',
    description:
      'A practical guide to building or evaluating an enterprise agentic workspace: permission-aware retrieval, intent routing, hybrid RAG, sandboxes, and evals.',
    date: '2026-07-31',
    tags: [
      'agentic-ai',
      'enterprise-search',
      'rag',
      'llm-ops',
      'permissions',
      'langgraph',
      'architecture',
    ],
    coverAlt:
      'Abstract sepia line drawing of branching paths, doors, keys, and identity figures — a map of permission-aware agent flow',
    coverPath: '/blog/anatomy-of-an-agentic-ai-system',
    ogImage: '/blog/anatomy-of-an-agentic-ai-system/og.jpg',
    wordCount: 9561,
    readingMinutes: 41,
  },
  {
    slug: 'fixing-attention',
    title: 'Fixing attention. Cause attention is all you need.',
    metaTitle: 'Fixing Attention',
    description:
      'Helped build a TikTok for learning — great watch time, taught nobody. Second attempt: a feed with an ending, a quiz, and a scheduler that refuses the fun thing.',
    date: '2026-07-31',
    tags: [
      'attention',
      'spaced-repetition',
      'fsrs',
      'recommender-systems',
      'edtech',
      'learning-science',
      'sm-2',
    ],
    coverAlt:
      'Dalí-style line doodle of hollow-skulled children with a film strip threading through their heads',
    coverPath: '/blog/fixing-attention',
    ogImage: '/blog/fixing-attention/og.jpg',
    wordCount: 6300,
    readingMinutes: 27,
  },
  {
    slug: 'one-model-to-rule-them-all',
    title: 'One Model to Rule Them All. Well, Most of Them.',
    metaTitle: 'One Model to Rule Them All',
    description:
      "XGBoost is the single piece of technology I've used most in my career, and I think most teams are solving model problems when they actually have data problems.",
    date: '2026-07-31',
    tags: [
      'machine-learning',
      'xgboost',
      'gradient-boosting',
      'tabular',
      'neural-networks',
      'data-quality',
    ],
    coverAlt:
      'Painterly sepia illustration of a tilted Gothic cathedral fused with mechanical gears, propped by a slender crutch on one side and anchored by thick roots on the other',
    coverPath: '/blog/one-model-to-rule-them-all',
    ogImage: '/blog/one-model-to-rule-them-all/og.jpg',
    wordCount: 5600,
    readingMinutes: 24,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => {
    if (a.date === b.date) return 0;
    return a.date < b.date ? 1 : -1;
  });
}

export function postUrl(slug: string): string {
  return `${SITE_URL}/blogs/${slug}`;
}

export function postDocumentTitle(post: BlogPost): string {
  return `${post.metaTitle} — Arvind Narayan`;
}

export function formatPostDate(date: string): string {
  const d = new Date(`${date}T12:00:00Z`);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
