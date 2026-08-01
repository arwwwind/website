import { SITE_URL } from '@/lib/seo';

export { SITE_URL };

export type BlogPost = {
  slug: string;
  title: string;
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
    slug: 'the-tree-not-the-titan',
    title:
      "The Tree, Not the Titan: Why AI's Future Is Architect Models Over Specialists — and Where That Intuition Breaks",
    description:
      'Biology, MoE, routers, and agent swarms all point at hierarchy — but the load-bearing case is architectural and economic, not a neuroscience proof. Trees win when tasks decompose and verification is cheap; monoliths win when the problem is entangled.',
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
    description:
      'How agentic AI is quietly gutting the Big 4, consulting, and Indian IT — and why the only firms keeping their pricing power are the ones a government forces to sign their name in blood.',
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
    description:
      'Are we augmenting intelligence, or outsourcing it? Notes on vibe coding, workslop, cognitive debt, and what happens when organizations hand judgment to the model.',
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
    description:
      'A practical guide to building — or evaluating — an enterprise agentic workspace assistant: permission-aware retrieval, intent routing, hybrid RAG, sandboxes, evals, and cost-per-answer as a design constraint.',
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
    description:
      'I helped build a TikTok for learning. It got great watch time and taught nobody anything. Here\'s the second attempt — a feed with an ending, a quiz, and a scheduler that refuses to show you the fun thing.',
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

export function formatPostDate(date: string): string {
  const d = new Date(`${date}T12:00:00Z`);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
