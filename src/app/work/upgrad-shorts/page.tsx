import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SectionGridBackground } from '@/components/ui/section-grid-background';

export const metadata: Metadata = {
  title: 'upGrad Shorts — Case Study | Arvind Narayan',
  description:
    'Engineered upGrad Shorts — a micro-learning feed with SM2 spaced repetition and a neural network classifier that predicts optimal review intervals per learner, delivering a 15% lift in retargeting and cross-sale experiments.',
  openGraph: {
    title: 'upGrad Shorts — ML-Driven Micro-Learning',
    description:
      'Case study: SM2 spaced repetition + neural network personalization for short-form learning.',
    url: 'https://arwwwind.com/work/upgrad-shorts',
  },
};

const stack = [
  'Python', 'scikit-learn', 'PyTorch', 'SM2 Algorithm', 'Node.js',
  'React', 'TypeScript', 'Redis', 'PostgreSQL', 'A/B Testing Framework',
  'Feature Flags', 'Amplitude', 'AWS Lambda',
];

export default function UpgradShortsPage() {
  return (
    <div className='min-h-screen bg-black'>
      <SectionGridBackground>
        <div className='max-w-screen-lg mx-auto px-4 py-24'>

          <Link
            href='/work'
            className='inline-flex items-center gap-2 text-neutral-500 hover:text-fuchsia-400 text-sm transition-colors mb-12'
          >
            ← All Work
          </Link>

          <div className='mb-10'>
            <span className='text-xs font-semibold tracking-widest text-fuchsia-400 uppercase'>
              ML · Personalization · EdTech · Spaced Repetition
            </span>
            <h1 className='text-4xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight'>
              upGrad Shorts
            </h1>
            <p className='text-xl text-neutral-300 mb-6 md:w-[75%] leading-relaxed'>
              A learning-science-driven micro-learning product: short-form lessons ranked by an ML
              retention engine using SM2 spaced repetition and a neural classifier that predicts
              the optimal time to resurface each concept for each learner.
            </p>
            <div className='flex flex-wrap gap-4 text-sm text-neutral-500 mb-6'>
              <span><span className='text-neutral-300 font-medium'>Client:</span> upGrad</span>
              <span><span className='text-neutral-300 font-medium'>Role:</span> ML & Product Engineer</span>
              <span><span className='text-neutral-300 font-medium'>Period:</span> 2020</span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {['Spaced Repetition', 'Neural Nets', 'Personalization', 'ML', 'EdTech', 'Feed Ranking'].map((t) => (
                <Badge key={t} variant='outline' className='border-fuchsia-800/50 text-fuchsia-400 text-xs'>
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Screenshot */}
          <div className='w-full rounded-xl overflow-hidden border border-neutral-800 mb-16 relative'>
            <Image
              src='/masterclass.png'
              alt='upGrad Shorts micro-learning feed'
              width={1200}
              height={600}
              className='w-full h-auto object-cover object-top'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none' />
          </div>

          <div className='space-y-16'>

            {/* Impact */}
            <section>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {[
                  { metric: '15%', label: 'Lift in retargeting & cross-sell experiments' },
                  { metric: 'SM2+', label: 'Spaced repetition + neural adaptation' },
                  { metric: '↑ Engagement', label: 'Measurable long-term retention signal' },
                ].map((s) => (
                  <div key={s.label} className='bg-neutral-950 border border-fuchsia-900/30 rounded-xl p-4 text-center'>
                    <p className='text-2xl font-bold text-fuchsia-400 mb-1'>{s.metric}</p>
                    <p className='text-xs text-neutral-500 leading-tight'>{s.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-fuchsia-500' />
                The Insight
              </h2>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                Short-form content has an engagement problem that short-form entertainment doesn&apos;t:
                the goal isn&apos;t infinite scroll, it&apos;s retention. Watching 20 micro-lessons on
                React hooks means nothing if none of it sticks 2 weeks later when you actually need
                to use it. The algorithmic approaches that optimize for watch-time (TikTok-style feed
                ranking) actively work against learning science — they surface novel content over
                review content because novelty generates engagement in the short term.
              </p>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                The SM2 algorithm — originally designed by SuperMemo — provides a principled
                framework for spacing review intervals based on recall difficulty. A card you found
                easy gets pushed further into the future; a card you struggled with resurfaces sooner.
                The problem with vanilla SM2 is that it&apos;s per-item, non-contextual, and assumes
                a consistent learner state. Real learners have varying attention, vary in consistency,
                and have engagement patterns the base algorithm doesn&apos;t model.
              </p>
              <p className='text-neutral-400 leading-relaxed'>
                The design decision for upGrad Shorts: use SM2 as the backbone for review scheduling,
                augmented by a neural classifier that models per-learner state to adapt interval
                predictions dynamically.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-fuchsia-500' />
                The Retention Engine
              </h2>
              <div className='space-y-5'>
                {[
                  {
                    title: 'SM2 Spaced Repetition Layer',
                    body: 'Each concept in the library is a "card" in the SM2 system. When a learner completes a short, they respond with self-reported recall confidence (1–5, embedded as a UX gesture — swipe left for "hard", swipe right for "got it"). SM2 uses this to calculate the next review date. Cards are bucketed by review priority and surfaced in the feed as a mix of new content and scheduled reviews, with the ratio tuned per-learner engagement profile.',
                  },
                  {
                    title: 'Neural Interval Adaptation',
                    body: 'The vanilla SM2 interval formula is static — it doesn\'t know that a learner who typically watches Shorts at 7pm on weekdays and not at all on weekends should have their review intervals adjusted to align with their actual engagement windows. The neural classifier ingests: learner activity patterns (time-of-day/day-of-week engagement history), concept-level recall history, domain difficulty signals, and course progress context. It outputs an interval multiplier that adjusts the SM2 base interval to account for when the learner is likely to be receptive.',
                  },
                  {
                    title: 'Feed Ranking & Blending',
                    body: 'The final feed ranking blends: SM2 urgency score (how overdue is this review), novelty score (how many new concepts from the current course module are unseen), and engagement affinity (does this learner historically finish this content type). The blend weights are A/B tested per cohort. The critical constraint: the system must never surface a concept for review significantly before its SM2-scheduled date, to preserve the spacing effect.',
                  },
                  {
                    title: 'Experimentation Infrastructure',
                    body: 'The ranking algorithm is modular and fully flag-controlled — every scoring component can be independently enabled, disabled, or weight-adjusted per experiment cohort. I built the experiment harness on top of a feature flag system with Amplitude as the event store. This made it possible to run 4–6 simultaneous experiments on different aspects of the ranking without them contaminating each other, using assignment-level bucketing.',
                  },
                ].map((item) => (
                  <div key={item.title} className='bg-neutral-950 border border-neutral-800 rounded-xl p-6'>
                    <h3 className='text-fuchsia-400 font-semibold mb-3'>{item.title}</h3>
                    <p className='text-neutral-400 text-sm leading-relaxed'>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-fuchsia-500' />
                Growth Partnership & Business Impact
              </h2>
              <p className='text-neutral-400 text-sm leading-relaxed mb-4'>
                The Growth team owned the top-of-funnel; Shorts was positioned as a re-engagement
                and cross-sell surface. Learners who completed a program module would be served
                Shorts from adjacent skill areas — someone finishing a Data Analytics course
                would see Python ML micro-lessons in their feed. The spaced repetition engine
                kept learners returning to the feed on a regular cadence, which gave Growth a
                high-intent, active audience for retargeting campaigns.
              </p>
              <p className='text-neutral-400 text-sm leading-relaxed'>
                The 15% lift in retargeting and cross-sell experiments tied to the Shorts feature
                was measured through holdout analysis — a group of learners with Shorts disabled
                vs. enabled, with conversion to new program enrollment as the primary metric.
                The lift was sustained across multiple experiment cycles, validating that the
                mechanism was real (the engagement cadence) rather than novelty-driven.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-fuchsia-500' />
                Stack
              </h2>
              <div className='flex flex-wrap gap-2'>
                {stack.map((s) => (
                  <Badge key={s} variant='outline' className='border-neutral-800 text-neutral-400 text-xs'>
                    {s}
                  </Badge>
                ))}
              </div>
            </section>
          </div>

          <div className='mt-20 pt-8 border-t border-neutral-900 flex justify-between items-center'>
            <Link href='/work/upgrad-lms' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              ← upGrad LMS
            </Link>
            <Link href='/work/pranaa' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              Next: Praana Foods →
            </Link>
          </div>
        </div>
      </SectionGridBackground>
    </div>
  );
}
