'use client';

import { useMemo } from 'react';
import { CrypticText } from '@/components/ui/cryptic-text';
import { StreamCell, useSequentialStream } from '@/components/ui/stream-in';

export type StackItem = {
  name: string;
  src: string | null;
  href: string;
};

export type StackCategory = {
  label: string;
  items: StackItem[];
};

type Step =
  | { kind: 'cat'; catIndex: number; label: string }
  | { kind: 'item'; catIndex: number; item: StackItem };

function buildSteps(categories: StackCategory[]): Step[] {
  const steps: Step[] = [];
  categories.forEach((cat, catIndex) => {
    steps.push({ kind: 'cat', catIndex, label: cat.label });
    cat.items.forEach((item) => {
      steps.push({ kind: 'item', catIndex, item });
    });
  });
  return steps;
}

function StackChip({ item }: { item: StackItem }) {
  const hasLink = Boolean(item.href && item.href !== '#');
  const className =
    'group flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-800 hover:border-teal-800/60 bg-neutral-950 hover:bg-teal-950/20 transition-all duration-200 text-xs text-neutral-500 hover:text-teal-400';

  const content = (
    <>
      {item.src ? (
        <div
          style={{ backgroundImage: `url("${item.src}")` }}
          className='w-4 h-4 bg-contain bg-center bg-no-repeat saturate-0 group-hover:saturate-100 transition-all duration-300'
        />
      ) : null}
      <span className='transition-colors'>{item.name}</span>
    </>
  );

  if (hasLink) {
    return (
      <a
        href={item.href}
        target='_blank'
        rel='noopener noreferrer'
        className={className}
      >
        {content}
      </a>
    );
  }

  return <span className={`${className} cursor-default`}>{content}</span>;
}

/**
 * Streams categories then chips like an LLM response —
 * AI & LLMs first, then each cell pops in quickly.
 */
export function TechStackStream({
  categories,
}: {
  categories: StackCategory[];
}) {
  const steps = useMemo(() => buildSteps(categories), [categories]);
  const pauseAt = useMemo(() => {
    const set = new Set<number>();
    steps.forEach((s, i) => {
      if (s.kind === 'cat') set.add(i);
    });
    return set;
  }, [steps]);

  const { ref, count } = useSequentialStream(steps.length, {
    intervalMs: 38,
    startDelay: 280,
    pauseMs: 260,
    pauseBefore: pauseAt,
  });

  // Build visible tree from revealed steps
  const visible: { label: string; items: StackItem[]; labelJustIn: boolean }[] =
    [];
  for (let i = 0; i < count; i++) {
    const step = steps[i];
    if (step.kind === 'cat') {
      visible.push({
        label: step.label,
        items: [],
        labelJustIn: i === count - 1,
      });
    } else {
      const last = visible[visible.length - 1];
      if (last) last.items.push(step.item);
    }
  }

  return (
    <div ref={ref} className='flex flex-col gap-8 min-h-[6rem]'>
      {visible.map((cat) => (
        <div key={cat.label}>
          <p className='text-xs font-semibold tracking-widest text-teal-400 uppercase mb-3'>
            {cat.labelJustIn && cat.items.length === 0 ? (
              <CrypticText
                text={cat.label}
                queue={false}
                cps={22}
                flipsPerChar={2}
                scrambleWindow={3}
              />
            ) : (
              cat.label
            )}
          </p>
          <div className='flex flex-wrap gap-2'>
            {cat.items.map((item) => (
              <StreamCell key={item.name}>
                <StackChip item={item} />
              </StreamCell>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
