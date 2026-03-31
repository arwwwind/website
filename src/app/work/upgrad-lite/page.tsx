import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SectionGridBackground } from '@/components/ui/section-grid-background';

export const metadata: Metadata = {
  title: 'upGrad Lite — Case Study | Arvind Narayan',
  description:
    'How I built a lightweight, offline-first lite version of upGrad\'s learner UI — cutting JS bundle size by 60%, enabling full PWA functionality on 2G networks, and reaching learners in low-bandwidth markets without degrading the product.',
  openGraph: {
    title: 'upGrad Lite — Offline-First LMS for Low-Bandwidth Markets',
    description:
      'Case study: 60% bundle reduction, service worker architecture, and progressive enhancement for emerging market users.',
    url: 'https://arwwwind.com/work/upgrad-lite',
  },
};

const stack = [
  'React', 'TypeScript', 'Service Workers', 'Workbox', 'IndexedDB',
  'Webpack 5', 'Dynamic Imports', 'Node.js', 'GraphQL', 'CloudFront',
  'Lighthouse CI', 'Web Vitals API', 'Chrome DevTools Protocol',
];

export default function UpgradLitePage() {
  return (
    <div className='min-h-screen bg-black'>
      <SectionGridBackground>
        <div className='max-w-screen-lg mx-auto px-4 py-24'>

          <Link
            href='/work'
            className='inline-flex items-center gap-2 text-neutral-500 hover:text-cyan-400 text-sm transition-colors mb-12'
          >
            ← All Work
          </Link>

          <div className='mb-10'>
            <span className='text-xs font-semibold tracking-widest text-cyan-400 uppercase'>
              PWA · Offline-First · Performance · Emerging Markets
            </span>
            <h1 className='text-4xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight'>
              upGrad Lite
            </h1>
            <p className='text-xl text-neutral-300 mb-6 md:w-[75%] leading-relaxed'>
              A lightweight, offline-capable version of upGrad&apos;s learner experience — built
              to reach students on constrained networks and low-end Android devices without
              shipping a degraded product. 60% smaller bundle, full offline course playback,
              and sub-3-second load on 2G.
            </p>
            <div className='flex flex-wrap gap-4 text-sm text-neutral-500 mb-6'>
              <span><span className='text-neutral-300 font-medium'>Client:</span> upGrad</span>
              <span><span className='text-neutral-300 font-medium'>Role:</span> Frontend Platform Engineer</span>
              <span><span className='text-neutral-300 font-medium'>Period:</span> 2020</span>
              <span>
                <a
                  href='https://engineering.upgrad.com/how-we-improved-user-experience-by-building-a-lite-version-of-learner-experience-ui-2df5ee521a5f'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-cyan-400 hover:text-cyan-300 transition-colors'
                >
                  Engineering Blog ↗
                </a>
              </span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {['PWA', 'Offline-First', 'Service Workers', 'Bundle Optimization', 'Emerging Markets'].map((t) => (
                <Badge key={t} variant='outline' className='border-cyan-800/50 text-cyan-400 text-xs'>
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Screenshot */}
          <div className='w-full rounded-xl overflow-hidden border border-neutral-800 mb-16 relative'>
            <Image
              src='/upgrad-learn.png'
              alt='upGrad Lite learner experience'
              width={1200}
              height={600}
              className='w-full h-auto object-cover object-top'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none' />
          </div>

          <div className='space-y-16'>

            {/* Metrics */}
            <section>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {[
                  { metric: '60%', label: 'JS bundle size reduction' },
                  { metric: '<3s', label: 'First Contentful Paint on 2G' },
                  { metric: '100%', label: 'Offline course playback coverage' },
                  { metric: '~40%', label: 'Load-time reduction on slow devices' },
                ].map((s) => (
                  <div key={s.label} className='bg-neutral-950 border border-cyan-900/30 rounded-xl p-4 text-center'>
                    <p className='text-2xl font-bold text-cyan-400 mb-1'>{s.metric}</p>
                    <p className='text-xs text-neutral-500 leading-tight'>{s.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-cyan-500' />
                Why Lite?
              </h2>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                upGrad&apos;s ambition was to serve learners across India — not just urban metro
                professionals with fiber broadband and flagship smartphones. Tier 2 and Tier 3
                city learners, often on Android devices in the ₹8,000–₹15,000 price range and
                mobile data plans with constrained bandwidth, were experiencing the main platform
                as a friction-heavy, slow-loading product.
              </p>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                Session analytics showed a clear pattern: learners on slow connections had 2.8×
                higher bounce rates on lesson load, lower module completion rates, and
                disproportionately high support tickets about &quot;videos not loading&quot; and &quot;lost progress.&quot;
                The drop-off wasn&apos;t because the content wasn&apos;t valuable — it was because
                the delivery mechanism failed them.
              </p>
              <p className='text-neutral-400 leading-relaxed'>
                The Lite initiative was product-driven with engineering ownership: don&apos;t build
                a watered-down second product — build the same product, delivered intelligently for
                the constraints of the device and network it&apos;s running on.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-cyan-500' />
                Engineering Approach
              </h2>
              <div className='space-y-5'>
                {[
                  {
                    title: 'Bundle Architecture Overhaul',
                    body: `The main learner app had accumulated a 2.8MB gzipped JS bundle. Analysis via Webpack Bundle Analyzer revealed three categories of waste: vendor duplication (moment.js, lodash variants imported separately across multiple modules), unused feature code included in the main bundle (admin tooling, instructor-only features loaded for all users), and unoptimized third-party SDKs.

The Lite build introduces a separate Webpack config with aggressive tree-shaking, lodash-es imports, and a feature entitlement system: admin/instructor modules are code-split and only loaded if the authenticated user's role requires them. The result was a 60% reduction to ~1.1MB — under the threshold for a comfortable first load on 3G.`,
                  },
                  {
                    title: 'Offline-First Service Worker Architecture',
                    body: `Workbox manages the service worker lifecycle. The caching strategy is differentiated by resource type: course content assets (video manifests, lesson HTML, quiz JSON) are cached on enrollment via a background sync job — the learner gets the offline-ready badge immediately after enrolling, not after they've manually opened each lesson. Static assets use a cache-first strategy with versioned URLs (immutable, long TTL). API responses for active course data use stale-while-revalidate with a 4-hour window, so the UI is always snappy even when the network is slow.

The critical engineering detail: the service worker registers a sync event for progress writes. If a learner submits a quiz answer or marks a lesson complete while offline, the event is queued in IndexedDB. When connectivity restores, the sync event fires and replays the writes to the API in order, with idempotency keys to prevent duplicate credit.`,
                  },
                  {
                    title: 'Progressive Image & Video Loading',
                    body: `Video delivery uses adaptive bitrate streaming (HLS with CloudFront) — the player selects the appropriate quality tier based on measured bandwidth. For lesson thumbnails and UI images, we implemented a placeholder blur-up technique: a tiny (20×20) base64-encoded LQIP (Low-Quality Image Placeholder) is inlined in the HTML and replaced by the full image once it loads. This eliminates layout shift and makes the page feel populated even on a 2G first load where images are still in flight.`,
                  },
                  {
                    title: 'Network-Aware Feature Gating',
                    body: `The Network Information API (where supported) is used to detect effective connection type. On 2G connections, the app automatically switches to a text-first mode: video autoplay is disabled, high-resolution images are deferred, and the lesson is presented in a reading-optimized layout with the video available on explicit tap. This detection is transparent to the learner — the UI explains it ("You're on a slow connection. We've optimized your lesson view") without requiring any settings changes.`,
                  },
                  {
                    title: 'Measurement & CI Gates',
                    body: `Lighthouse CI runs on every PR with a performance budget: FCP ≤ 2.5s on a simulated Moto G4 (a common Tier 2 device proxy) over simulated 3G. A PR that regresses FCP, LCP, or TTI beyond budget cannot be merged. Field data via Web Vitals API is logged to our analytics pipeline, enabling real-device percentile tracking separate from lab benchmarks. The gap between lab and field measurements was a key calibration input — field P90 on 2G was consistently 20–30% worse than lab simulation, which informed more aggressive optimization targets.`,
                  },
                ].map((item) => (
                  <div key={item.title} className='bg-neutral-950 border border-neutral-800 rounded-xl p-6'>
                    <h3 className='text-cyan-400 font-semibold mb-3'>{item.title}</h3>
                    <p className='text-neutral-400 text-sm leading-relaxed whitespace-pre-line'>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-cyan-500' />
                What This Unlocked
              </h2>
              <p className='text-neutral-400 text-sm leading-relaxed mb-4'>
                The Lite initiative wasn&apos;t just an optimization exercise — it was a market
                expansion enabler. upGrad&apos;s growth strategy explicitly targeted Tier 2 and 3
                city professionals as the next acquisition cohort. Without a performant, offline-capable
                product that worked on their devices and network conditions, that cohort was
                unreachable regardless of marketing spend.
              </p>
              <p className='text-neutral-400 text-sm leading-relaxed'>
                Post-launch, session abandonment on slow connections dropped measurably, and module
                completion rates in the sub-1Mbps segment improved. The engineering patterns established
                in Lite — the Workbox caching architecture, the network-aware feature gating, and the
                Lighthouse CI gates — became platform-wide standards rather than staying isolated to the
                Lite build. The detailed write-up was published on the upGrad Engineering blog and became
                a reference for the team&apos;s approach to performance in subsequent product launches.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-cyan-500' />
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
            <Link href='/work/pranaa' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              ← Praana Foods
            </Link>
            <Link href='/work' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              All Work →
            </Link>
          </div>
        </div>
      </SectionGridBackground>
    </div>
  );
}
