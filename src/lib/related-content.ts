import { getPostBySlug, type BlogPost } from '@/lib/blog-posts';
import { getWorkProject } from '@/lib/work-projects';

export type RelatedKind = 'blog' | 'work';

export type RelatedRef = {
  kind: RelatedKind;
  slug: string;
  /** Override eyebrow, e.g. "Series · Part 2" */
  eyebrow?: string;
  /** Short teaser; falls back to post/work description */
  blurb?: string;
};

export type RelatedCard = {
  href: string;
  title: string;
  description: string;
  eyebrow: string;
  cta: string;
  kind: RelatedKind;
};

export type SeriesMeta = {
  id: string;
  label: string;
  part: number;
};

/** Curated cross-links per blog slug. Order = display priority. */
const RELATED_BY_SLUG: Record<
  string,
  { series?: SeriesMeta; mid?: RelatedRef; end?: RelatedRef[] }
> = {
  'the-nutritionist-in-the-machine': {
    mid: {
      kind: 'blog',
      slug: 'one-model-to-rule-them-all',
      eyebrow: 'Related essay',
      blurb:
        'Start with trees before you reach for neural nets — the same instinct this nutrition stack is built on.',
    },
    end: [
      {
        kind: 'blog',
        slug: 'fixing-attention',
        eyebrow: 'Related essay',
        blurb:
          'Another recommender with hard constraints — spaced repetition that refuses to optimise for watch time.',
      },
      {
        kind: 'blog',
        slug: 'anatomy-of-an-agentic-ai-system',
        eyebrow: 'Related essay',
        blurb:
          'How to wire retrieval, guardrails, and human review when the model must not own the safety path.',
      },
    ],
  },
  'the-rope-sellers': {
    series: { id: 'rope-sellers', label: 'The Rope Sellers', part: 1 },
    mid: {
      kind: 'blog',
      slug: 'vibes-all-the-way-down',
      eyebrow: 'Related essay',
      blurb:
        'Same pyramid, different angle — what happens when orgs outsource judgment to the model.',
    },
    end: [
      {
        kind: 'blog',
        slug: 'the-rope-sellers-buy-a-rope-machine',
        eyebrow: 'Series · Part 2',
        blurb:
          'Indian IT woke up late, bought partnership gym memberships, and called it strategy.',
      },
      {
        kind: 'blog',
        slug: 'vibes-all-the-way-down',
        eyebrow: 'Related essay',
      },
    ],
  },
  'the-rope-sellers-buy-a-rope-machine': {
    series: { id: 'rope-sellers', label: 'The Rope Sellers', part: 2 },
    mid: {
      kind: 'blog',
      slug: 'anatomy-of-an-agentic-ai-system',
      eyebrow: 'From the workshop',
      blurb:
        'If the rope machine is the pitch deck, this is what a real agentic system looks like under the hood.',
    },
    end: [
      {
        kind: 'blog',
        slug: 'the-rope-sellers',
        eyebrow: 'Series · Part 1',
        blurb: 'Start here — how accountability moats decide who keeps pricing power.',
      },
      {
        kind: 'blog',
        slug: 'vibes-all-the-way-down',
        eyebrow: 'Related essay',
        blurb: 'Outsourcing intuition — the cognitive sibling of selling rope.',
      },
    ],
  },
  'vibes-all-the-way-down': {
    mid: {
      kind: 'blog',
      slug: 'the-rope-sellers',
      eyebrow: 'Same thread',
      blurb:
        'The Bengaluru pyramid view, expanded — consulting, Big 4, and who still gets paid to be wrong.',
    },
    end: [
      {
        kind: 'blog',
        slug: 'the-rope-sellers-buy-a-rope-machine',
        eyebrow: 'Series follow-up',
        blurb: 'What happened when Indian IT finally bought the rope machine.',
      },
      {
        kind: 'blog',
        slug: 'anatomy-of-an-agentic-ai-system',
        eyebrow: 'Build it right',
        blurb:
          'A practical architecture for agentic systems that don\'t outsource judgment by accident.',
      },
    ],
  },
  'anatomy-of-an-agentic-ai-system': {
    mid: {
      kind: 'blog',
      slug: 'the-tree-not-the-titan',
      eyebrow: 'Architecture take',
      blurb:
        'Why trees of specialists beat monoliths — and when that intuition breaks.',
    },
    end: [
      {
        kind: 'blog',
        slug: 'vibes-all-the-way-down',
        eyebrow: 'Related essay',
        blurb: 'The cultural failure mode when agentic systems replace intuition.',
      },
      {
        kind: 'work',
        slug: 'cohort-ai',
        eyebrow: 'Case study',
        blurb: 'Multi-agent recruitment pipeline — SPEC agents in production.',
      },
    ],
  },
  'the-tree-not-the-titan': {
    mid: {
      kind: 'blog',
      slug: 'anatomy-of-an-agentic-ai-system',
      eyebrow: 'In practice',
      blurb: 'How an enterprise agentic workspace actually wires routers, RAG, and evals.',
    },
    end: [
      {
        kind: 'blog',
        slug: 'one-model-to-rule-them-all',
        eyebrow: 'Related essay',
        blurb: 'When the right answer is still a boring tabular model, not another foundation model.',
      },
      {
        kind: 'blog',
        slug: 'anatomy-of-an-agentic-ai-system',
        eyebrow: 'Related essay',
      },
    ],
  },
  'fixing-attention': {
    mid: {
      kind: 'work',
      slug: 'upgrad-shorts',
      eyebrow: 'Case study',
      blurb:
        'The first attempt in production — SM2 + neural ranking, 15% lift in retargeting.',
    },
    end: [
      {
        kind: 'work',
        slug: 'upgrad-lms',
        eyebrow: 'Case study',
        blurb: 'The LMS rebuild that sat underneath the feed.',
      },
      {
        kind: 'blog',
        slug: 'one-model-to-rule-them-all',
        eyebrow: 'Related essay',
        blurb: 'Another place classical ML still carries the product.',
      },
    ],
  },
  'one-model-to-rule-them-all': {
    mid: {
      kind: 'blog',
      slug: 'the-tree-not-the-titan',
      eyebrow: 'Related essay',
      blurb:
        'Same instinct, different layer — when hierarchy beats a single giant model.',
    },
    end: [
      {
        kind: 'blog',
        slug: 'fixing-attention',
        eyebrow: 'Related essay',
        blurb: 'Another place tabular + classical ML still carries the product.',
      },
      {
        kind: 'blog',
        slug: 'the-tree-not-the-titan',
        eyebrow: 'Related essay',
      },
    ],
  },
};

const SERIES_SLUGS: Record<string, string[]> = {
  'rope-sellers': [
    'the-rope-sellers',
    'the-rope-sellers-buy-a-rope-machine',
  ],
};

function resolveRef(ref: RelatedRef): RelatedCard | null {
  if (ref.kind === 'blog') {
    const post = getPostBySlug(ref.slug);
    if (!post) return null;
    return {
      kind: 'blog',
      href: `/blogs/${post.slug}`,
      title: post.title,
      description: ref.blurb ?? post.description,
      eyebrow: ref.eyebrow ?? 'Related essay',
      cta: 'Read more',
    };
  }

  const project = getWorkProject(ref.slug);
  if (!project) return null;
  return {
    kind: 'work',
    href: `/work/${project.slug}`,
    title: project.title,
    description: ref.blurb ?? project.tagline,
    eyebrow: ref.eyebrow ?? 'Case study',
    cta: 'Read case study',
  };
}

export function getSeriesNav(slug: string): {
  series: SeriesMeta;
  prev: BlogPost | null;
  next: BlogPost | null;
} | null {
  const entry = RELATED_BY_SLUG[slug];
  if (!entry?.series) return null;
  const members = SERIES_SLUGS[entry.series.id] ?? [];
  const idx = members.indexOf(slug);
  if (idx < 0) return null;
  return {
    series: entry.series,
    prev: idx > 0 ? (getPostBySlug(members[idx - 1]) ?? null) : null,
    next:
      idx < members.length - 1
        ? (getPostBySlug(members[idx + 1]) ?? null)
        : null,
  };
}

export function getMidRelated(slug: string): RelatedCard | null {
  const ref = RELATED_BY_SLUG[slug]?.mid;
  return ref ? resolveRef(ref) : null;
}

export function getEndRelated(slug: string): RelatedCard[] {
  const refs = RELATED_BY_SLUG[slug]?.end ?? [];
  return refs
    .map(resolveRef)
    .filter((c): c is RelatedCard => c !== null);
}

/** Fisher–Yates shuffle; returns up to `n` items. */
export function pickRandom<T>(items: T[], n: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(n, copy.length));
}
