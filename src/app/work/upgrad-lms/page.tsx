import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SectionGridBackground } from '@/components/ui/section-grid-background';

export const metadata: Metadata = {
  title: 'upGrad LMS Rebuild — Case Study | Arvind Narayan',
  description:
    'Led the full-stack rebuild of upGrad\'s Learning Management System — achieving 75% Core Web Vitals improvement, sub-200ms API response times, and offline-first PWA for 3M+ active learners across emerging markets.',
  openGraph: {
    title: 'upGrad LMS Rebuild — 75% Core Web Vitals Improvement',
    description:
      'Case study: architecting a PWA-first LMS for 3M+ active learners with offline-first support for 2G networks.',
    url: 'https://arwwwind.com/work/upgrad-lms',
  },
};

const stack = [
  'React', 'TypeScript', 'Node.js', 'Golang', 'Redis', 'PostgreSQL',
  'Service Workers', 'Workbox', 'GraphQL', 'CDN (CloudFront)', 'AWS',
  'Webpack', 'Code Splitting', 'Web Vitals API', 'Datadog',
];

export default function UpgradLMSPage() {
  return (
    <div className='min-h-screen bg-black'>
      <SectionGridBackground>
        <div className='max-w-screen-lg mx-auto px-4 py-24'>

          <Link
            href='/work'
            className='inline-flex items-center gap-2 text-neutral-500 hover:text-orange-400 text-sm transition-colors mb-12'
          >
            ← All Work
          </Link>

          <div className='mb-10'>
            <span className='text-xs font-semibold tracking-widest text-orange-400 uppercase'>
              EdTech · Performance · PWA · Scale
            </span>
            <h1 className='text-4xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight'>
              upGrad LMS Rebuild
            </h1>
            <p className='text-xl text-neutral-300 mb-6 md:w-[75%] leading-relaxed'>
              Led the full-stack architectural overhaul of upGrad&apos;s Learning Management System —
              cutting Core Web Vitals by 75%, reducing API response times below 200ms, and
              shipping offline-first PWA support so learners on 2G in Tier 3 Indian cities
              could finish their coursework.
            </p>
            <div className='flex flex-wrap gap-4 text-sm text-neutral-500 mb-6'>
              <span><span className='text-neutral-300 font-medium'>Client:</span> upGrad</span>
              <span><span className='text-neutral-300 font-medium'>Role:</span> Lead Software Engineer</span>
              <span><span className='text-neutral-300 font-medium'>Period:</span> Dec 2019 – Sept 2021</span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {['React', 'PWA', 'Performance', 'Offline-First', 'Node.js', 'Golang', 'Scale'].map((t) => (
                <Badge key={t} variant='outline' className='border-orange-800/50 text-orange-400 text-xs'>
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Screenshot */}
          <div className='w-full rounded-xl overflow-hidden border border-neutral-800 mb-16 relative'>
            <Image
              src='/lms.png'
              alt='upGrad LMS platform'
              width={1200}
              height={600}
              className='w-full h-auto object-cover object-top'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none' />
          </div>

          <div className='space-y-16'>

            {/* Impact summary */}
            <section>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {[
                  { metric: '75%', label: 'Core Web Vitals improvement' },
                  { metric: '3M+', label: 'Active learners served' },
                  { metric: '<200ms', label: 'API response time (P50)' },
                  { metric: '~40%', label: 'Load-time reduction on slow devices' },
                ].map((s) => (
                  <div key={s.label} className='bg-neutral-950 border border-orange-900/30 rounded-xl p-4 text-center'>
                    <p className='text-2xl font-bold text-orange-400 mb-1'>{s.metric}</p>
                    <p className='text-xs text-neutral-500 leading-tight'>{s.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-orange-500' />
                Context & Challenge
              </h2>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                upGrad is India&apos;s largest online higher education platform — MBA programs,
                tech bootcamps, professional certifications in partnership with top universities.
                By 2019, the platform had accumulated three years of rapid-growth technical debt:
                a monolithic React frontend with no code splitting, server-rendered pages with no
                caching strategy, and a Node.js backend handling everything from course delivery
                to payments in a single service.
              </p>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                The user base had also diversified in ways the original architecture couldn&apos;t handle.
                A significant cohort of learners were engineers in Tier 2 and Tier 3 cities — high
                career ambitions, but often on mobile data plans, often switching between WiFi and 4G,
                sometimes on 2G. A 6-second load time isn&apos;t an inconvenience for these learners;
                it&apos;s a session abandonment.
              </p>
              <p className='text-neutral-400 leading-relaxed'>
                The mandate: rebuild the learner experience stack for performance, resilience,
                and global delivery — without taking the platform offline for the 3M+ learners
                already in the middle of enrolled programs.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-orange-500' />
                Architecture Decisions
              </h2>
              <div className='space-y-5'>
                {[
                  {
                    title: 'React + TypeScript for Learner UX',
                    body: 'Migrated from a mixed JS/JSX monolith to a fully typed TypeScript codebase. The type migration was incremental — we ran strict mode on all new files from day one, loosening for legacy pages and tightening module-by-module over six months. Introduced route-based code splitting (dynamic imports) that cut the initial JS bundle from 2.8MB to 680KB for first-load pages.',
                  },
                  {
                    title: 'Node.js + Golang Microservices Split',
                    body: 'Extracted the course delivery, progress tracking, and assessment subsystems into dedicated services. The Node.js layer owned learner session, content rendering, and API aggregation. Golang services handled the performance-critical paths: progress write throughput (50K+ concurrent learners during live sessions), video progress checkpointing, and the search index for the content library. Go\'s goroutine model absorbed burst traffic without the event-loop saturation we were hitting in Node for write-heavy endpoints.',
                  },
                  {
                    title: 'Offline-First PWA via Service Workers + Workbox',
                    body: 'Core course content (lesson HTML, video manifests, quiz payloads) is pre-cached on enrollment via a background sync strategy built on Workbox. When a learner goes offline mid-lesson, the SW intercepts failed fetches and serves cached content. Progress events are queued in IndexedDB and replayed when connectivity restores. We tested against real-world 2G conditions using Chrome\'s network throttling and fixed three critical failure modes before launch: interleaved quiz submissions, video seek state recovery, and certificate unlock timing.',
                  },
                  {
                    title: 'Edge-Aware CDN + Redis Cache Strategy',
                    body: 'Course content is served via CloudFront with regional edge caching. Cache keys are structured to maximize hit rate: content is immutable once published (versioned URLs, long TTLs), while progress and personalization data is always origin-fetched. Redis sits in front of the Golang services as a write-through cache for learner progress state, reducing PostgreSQL write pressure by ~70% during peak concurrent sessions. Cache invalidation on enrollment changes is event-driven via SQS.',
                  },
                  {
                    title: 'SLO Tracking & Performance Guardrails',
                    body: 'We defined explicit SLOs: LCP < 2.5s on simulated 4G mid-tier mobile, API P95 < 500ms for core learner journeys, error rate < 0.1%. Datadog dashboards and alerting were configured before the first traffic migration. Performance regressions broke the CI pipeline — we ran Lighthouse CI and a custom Core Web Vitals budget check on every PR, blocking merges that degraded LCP, CLS, or FID beyond threshold.',
                  },
                ].map((item) => (
                  <div key={item.title} className='bg-neutral-950 border border-neutral-800 rounded-xl p-6'>
                    <h3 className='text-orange-400 font-semibold mb-3'>{item.title}</h3>
                    <p className='text-neutral-400 text-sm leading-relaxed'>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-orange-500' />
                Business Impact
              </h2>
              <p className='text-neutral-400 text-sm leading-relaxed mb-4'>
                The 75% Core Web Vitals improvement wasn&apos;t an engineering vanity metric —
                it had direct downstream effects. Load-time reduction on slow-device profiles
                (~40% in lab conditions, consistent with Lighthouse CI data) directly reduced
                abandonment for the low-bandwidth user segment. The platform&apos;s next growth
                phase — entering Tier 3 markets aggressively — was unblocked in part by this
                infrastructure work. Faster load times and PWA support meant upGrad could credibly
                offer a comparable experience to learners who had previously churned due to
                connectivity issues.
              </p>
              <p className='text-neutral-400 text-sm leading-relaxed'>
                From an engineering leadership perspective: the performance standards I established
                (Lighthouse CI budgets, API SLOs, typed codebase conventions) became the baseline
                for the platform team after my tenure. The architectural patterns — offline-first
                caching, split Go/Node services for performance-critical writes — persisted in the
                system through subsequent infrastructure cycles.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-orange-500' />
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
            <Link href='/work/subclarity' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              ← Subclarity
            </Link>
            <Link href='/work/upgrad-shorts' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              Next: upGrad Shorts →
            </Link>
          </div>
        </div>
      </SectionGridBackground>
    </div>
  );
}
