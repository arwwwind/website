import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SectionGridBackground } from '@/components/ui/section-grid-background';

export const metadata: Metadata = {
  title: 'Praana Foods — Case Study | Arvind Narayan',
  description:
    'Built the ML personalization engine behind Praana Foods — an AI-native vegan meal subscription that uses monthly health check-ins and a feedback loop to recalibrate each subscriber\'s macro and micronutrient plan.',
  openGraph: {
    title: 'Praana Foods — Precision Vegan Nutrition ML',
    description:
      'Case study: ML-driven nutritional recalibration, allergy guard, and life-stage personalization for a vegan meal subscription.',
    url: 'https://arwwwind.com/work/pranaa',
  },
};

const stack = [
  'Python', 'scikit-learn', 'XGBoost', 'FastAPI', 'PostgreSQL',
  'React', 'TypeScript', 'Node.js', 'Celery + Redis', 'SendGrid',
  'Stripe', 'AWS Lambda', 'Tailwind CSS',
];

export default function PranaaPage() {
  return (
    <div className='min-h-screen bg-black'>
      <SectionGridBackground>
        <div className='max-w-screen-lg mx-auto px-4 py-24'>

          <Link
            href='/work'
            className='inline-flex items-center gap-2 text-neutral-500 hover:text-green-400 text-sm transition-colors mb-12'
          >
            ← All Work
          </Link>

          <div className='mb-10'>
            <span className='text-xs font-semibold tracking-widest text-green-400 uppercase'>
              Health Tech · ML Personalization · Subscriptions
            </span>
            <h1 className='text-4xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight'>
              Praana Foods
            </h1>
            <p className='text-xl text-neutral-300 mb-6 md:w-[75%] leading-relaxed'>
              Precision vegan nutrition as a service. An ML feedback loop that recalibrates
              each subscriber&apos;s macro and micronutrient targets monthly based on reported
              health signals — without requiring wearables or daily tracking.
            </p>
            <div className='flex flex-wrap gap-4 text-sm text-neutral-500 mb-6'>
              <span><span className='text-neutral-300 font-medium'>Client:</span> Praana Foods</span>
              <span><span className='text-neutral-300 font-medium'>Role:</span> ML & Full-Stack Engineer</span>
              <span><span className='text-neutral-300 font-medium'>Year:</span> 2022</span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {['ML Personalization', 'Nutrition AI', 'Subscriptions', 'Health Tech', 'Feedback Loops'].map((t) => (
                <Badge key={t} variant='outline' className='border-green-800/50 text-green-400 text-xs'>
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Screenshot */}
          <div className='w-full rounded-xl overflow-hidden border border-neutral-800 mb-16 relative'>
            <Image
              src='/pranaa.png'
              alt='Praana Foods — AI nutrition platform'
              width={1200}
              height={600}
              className='w-full h-auto object-cover object-top'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none' />
          </div>

          <div className='space-y-16'>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-green-500' />
                The Problem
              </h2>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                Most meal subscription services offer two flavors of personalization: a one-time
                dietary questionnaire at signup, and manual preference settings you can update if
                you remember to. Neither adapts. A subscriber whose health goals shift from weight
                loss to muscle gain, or who goes from a sedentary role to a physically active one,
                gets the same meals they signed up for six months ago.
              </p>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                The existing solutions that do adapt — continuous glucose monitors, calorie-tracking
                apps, fitness wearables — require daily active engagement from the subscriber. The
                compliance rates on sustained use of these tools are notoriously low. Most people
                track for two weeks and abandon it.
              </p>
              <p className='text-neutral-400 leading-relaxed'>
                Praana&apos;s insight: monthly check-ins are a sustainable touchpoint frequency.
                If you design the check-in well — capturing the right 4–6 signals in under 2 minutes
                — you can run a monthly recalibration cycle that keeps the nutritional profile
                accurate without exhausting the subscriber.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-green-500' />
                The ML Personalization Engine
              </h2>
              <div className='space-y-5'>
                {[
                  {
                    title: 'Monthly Health Signal Collection',
                    body: 'The check-in captures: current weight, subjective energy level (1–5), current health focus (weight management / muscle gain / heart health / energy / cognitive), activity level change since last month, and any notable health events (illness, injury, stress period). Six signals, collected in a conversational UI that takes under 90 seconds. Response rates are high because the questions are short and the subscriber sees immediate visual feedback on what changes.',
                  },
                  {
                    title: 'Recalibration Model',
                    body: 'The recalibration model is an XGBoost regressor trained on nutritional science guidelines cross-referenced with reported outcome data. Inputs: the subscriber\'s static profile (age, gender, height, health conditions) + the current-month check-in signals. Outputs: target macro ratios (protein/carb/fat percentages), total caloric target, and micronutrient priority flags (e.g., "prioritize iron-rich sources this month" for a subscriber reporting low energy). The model outputs are mapped to meal slot constraints that drive the kitchen\'s production configuration for that subscriber\'s next batch.',
                  },
                  {
                    title: 'Life-Stage Alignment',
                    body: 'The model is parameterized by demographic group — the nutritional requirements and optimal macro ratios differ meaningfully between a 25-year-old athlete focused on performance and a 52-year-old professional managing cardiovascular risk. Rather than a single universal model, I trained demographic-stratified models that share a common feature space but apply different learned coefficients for the macro output. This avoids the one-size-fits-all problem that makes generic nutrition apps feel inaccurate.',
                  },
                  {
                    title: 'Safety & Preference Guard Layer',
                    body: 'The recalibration model outputs are filtered through a hard-constraint layer before reaching the meal configuration system. Allergies and intolerances are stored as immutable subscriber attributes — these override the ML recommendations unconditionally. The constraint layer runs a final safety check: no ingredient from a subscriber\'s exclusion list appears in any meal slot, regardless of what the recalibration model might suggest. This separation of concerns (ML for optimization, rule system for safety) was a deliberate architectural choice to prevent model drift from ever touching allergy constraints.',
                  },
                ].map((item) => (
                  <div key={item.title} className='bg-neutral-950 border border-neutral-800 rounded-xl p-6'>
                    <h3 className='text-green-400 font-semibold mb-3'>{item.title}</h3>
                    <p className='text-neutral-400 text-sm leading-relaxed'>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-green-500' />
                Platform & Subscription Infrastructure
              </h2>
              <div className='grid md:grid-cols-2 gap-4'>
                {[
                  {
                    title: 'Subscription & Billing',
                    body: 'Stripe Billing handles subscription lifecycle — plan changes, pauses, reactivations, and proration. The billing cycle is aligned to the recalibration cycle: the month starts with a check-in, generates a new meal configuration, and triggers the production order before billing completes. Failed payments pause delivery (not cancellation) with a grace period for retry.',
                  },
                  {
                    title: 'Kitchen Integration',
                    body: 'Meal configurations are compiled into a structured production manifest — ingredient quantities per subscriber slot, batch groupings by fulfillment center, and substitution rules for supply disruptions. The manifest is generated 72 hours before kitchen production runs, giving time for final constraint validation and manual spot-checks.',
                  },
                  {
                    title: 'Subscriber Dashboard',
                    body: 'Subscribers see their current macro targets, the reasoning behind their last recalibration ("We increased your protein target this month based on your reported activity increase"), and a month-over-month trend of their health signals. Transparency in the recalibration reduces churn from subscribers who would otherwise feel the meals "just changed" without understanding why.',
                  },
                  {
                    title: 'Operational Monitoring',
                    body: 'The recalibration pipeline runs on a scheduled Celery job on the 1st of each month. Each subscriber\'s job is idempotent — re-running produces the same output for the same inputs. Failed jobs alert the ops team with the subscriber ID and error context. Recalibration results are stored with full audit history: inputs, model version, outputs, safety check log.',
                  },
                ].map((item) => (
                  <div key={item.title} className='bg-neutral-950 border border-neutral-800 rounded-xl p-5'>
                    <h3 className='text-white font-semibold text-sm mb-2'>{item.title}</h3>
                    <p className='text-neutral-500 text-sm leading-relaxed'>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-green-500' />
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
            <Link href='/work/upgrad-shorts' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              ← upGrad Shorts
            </Link>
            <Link href='/work/upgrad-lite' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              Next: upGrad Lite →
            </Link>
          </div>
        </div>
      </SectionGridBackground>
    </div>
  );
}
