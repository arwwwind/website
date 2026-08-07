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
  'the-middlemans-republic': {
    series: {
      id: 'middlemans-republic',
      label: "The Middleman's Republic",
      part: 1,
    },
    mid: {
      kind: 'blog',
      slug: 'the-arranged-marriage-of-the-century',
      eyebrow: 'Series · Part 2',
      blurb:
        'The cure for a middleman republic: Japan has the factory and no coders; India has the coders and no factory.',
    },
    end: [
      {
        kind: 'blog',
        slug: 'the-arranged-marriage-of-the-century',
        eyebrow: 'Series · Part 2',
        blurb:
          'Why Japan and India are each other\'s missing half — and why the software age demands a sequel to Maruti.',
      },
      {
        kind: 'blog',
        slug: 'the-rope-sellers-buy-a-rope-machine',
        eyebrow: 'Related essay',
        blurb:
          'Indian IT as the purest middleman pyramid — and what happens when the thing you resell starts eating you.',
      },
    ],
  },
  'the-arranged-marriage-of-the-century': {
    series: {
      id: 'middlemans-republic',
      label: "The Middleman's Republic",
      part: 2,
    },
    mid: {
      kind: 'blog',
      slug: 'the-middlemans-republic',
      eyebrow: 'Series · Part 1',
      blurb:
        'Start here — the diagnosis: copycat capital, customs as tollbooths, and why originality is taxed like contraband.',
    },
    end: [
      {
        kind: 'blog',
        slug: 'the-middlemans-republic',
        eyebrow: 'Series · Part 1',
        blurb:
          'How we learnt to stop inventing and love the container ship.',
      },
      {
        kind: 'blog',
        slug: 'the-rope-sellers',
        eyebrow: 'Related essay',
        blurb:
          'Accountability moats, body shops, and the professional-services cousin of the middleman pattern.',
      },
    ],
  },
  'down-the-fraud-rabbit-hole': {
    mid: {
      kind: 'blog',
      slug: 'an-exasperating-farrago-of-firewalls',
      eyebrow: 'Related essay',
      blurb:
        'Same trust collapse, different door — stolen credentials, agentic attackers, and why identity is the real perimeter.',
    },
    end: [
      {
        kind: 'blog',
        slug: 'vibes-all-the-way-down',
        eyebrow: 'Related essay',
        blurb:
          'What happens when orgs outsource judgment — the cognitive sibling of outsourcing verification.',
      },
      {
        kind: 'blog',
        slug: 'the-rope-sellers',
        eyebrow: 'Related essay',
        blurb:
          'Accountability moats in professional services — who still has to sign their name in blood.',
      },
    ],
  },
  'an-exasperating-farrago-of-firewalls': {
    mid: {
      kind: 'blog',
      slug: 'anatomy-of-an-agentic-ai-system',
      eyebrow: 'From the workshop',
      blurb:
        'The defensive counterpart — how a well-built agentic system wires identity, retrieval, and guardrails so the butler cannot be hypnotised.',
    },
    end: [
      {
        kind: 'blog',
        slug: 'anatomy-of-an-agentic-ai-system',
        eyebrow: 'Related essay',
        blurb:
          'Sandboxes, egress allowlists, and permission-aware retrieval — the build-side of the security argument.',
      },
      {
        kind: 'blog',
        slug: 'the-rope-sellers-buy-a-rope-machine',
        eyebrow: 'Related essay',
        blurb:
          'Why the industry is shipping agents into production faster than it is securing them.',
      },
    ],
  },
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
    series: {
      id: 'agentic-ai-system',
      label: 'Anatomy & Pathology',
      part: 1,
    },
    mid: {
      kind: 'blog',
      slug: 'pathology-of-an-agentic-ai-system',
      eyebrow: 'Series · Part 2',
      blurb:
        'The sequel — a field guide to production failures, differential diagnosis, and the order in which to escalate.',
    },
    end: [
      {
        kind: 'blog',
        slug: 'pathology-of-an-agentic-ai-system',
        eyebrow: 'Series · Part 2',
        blurb:
          'Symptoms, diagnoses, and why most teams escalate architecture before they fix the query.',
      },
      {
        kind: 'blog',
        slug: 'an-exasperating-farrago-of-firewalls',
        eyebrow: 'Related essay',
        blurb:
          'The security twin — identity, gateways, and the broker that keeps the agent honest.',
      },
      {
        kind: 'work',
        slug: 'cohort-ai',
        eyebrow: 'Case study',
        blurb: 'Multi-agent recruitment pipeline — SPEC agents in production.',
      },
    ],
  },
  'pathology-of-an-agentic-ai-system': {
    series: {
      id: 'agentic-ai-system',
      label: 'Anatomy & Pathology',
      part: 2,
    },
    mid: {
      kind: 'blog',
      slug: 'anatomy-of-an-agentic-ai-system',
      eyebrow: 'Series · Part 1',
      blurb:
        'Start here — the blueprint this essay performs autopsies upon: permission-aware retrieval, routing, and the boring spine.',
    },
    end: [
      {
        kind: 'blog',
        slug: 'anatomy-of-an-agentic-ai-system',
        eyebrow: 'Series · Part 1',
        blurb:
          'What to build before you learn how it dies — the parent essay.',
      },
      {
        kind: 'blog',
        slug: 'an-exasperating-farrago-of-firewalls',
        eyebrow: 'Related essay',
        blurb:
          'When §23 whets the appetite — the defensive field guide for agentic systems.',
      },
      {
        kind: 'blog',
        slug: 'the-rope-sellers-buy-a-rope-machine',
        eyebrow: 'Related essay',
        blurb:
          'What happens when the industry sells all of this without building it.',
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
  'middlemans-republic': [
    'the-middlemans-republic',
    'the-arranged-marriage-of-the-century',
  ],
  'agentic-ai-system': [
    'anatomy-of-an-agentic-ai-system',
    'pathology-of-an-agentic-ai-system',
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
