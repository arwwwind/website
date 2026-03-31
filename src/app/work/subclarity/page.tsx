import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SectionGridBackground } from '@/components/ui/section-grid-background';

export const metadata: Metadata = {
  title: 'Subclarity — Case Study | Arvind Narayan',
  description:
    'How I engineered Subclarity — an automated B2B platform replacing manual IT subcontractor onboarding, contract management, tax calculation, and compliance tracking with a single intelligent system.',
  openGraph: {
    title: 'Subclarity — IT Subcontracting Automation',
    description:
      'Case study: automated IT subcontractor workflows, compliance enforcement, and financial reporting at scale.',
    url: 'https://arwwwind.com/work/subclarity',
  },
};

const stack = [
  'Node.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'React',
  'Tailwind CSS', 'DocuSign API', 'Stripe Connect', 'AWS Lambda',
  'Redis', 'SendGrid', 'Plaid', 'tRPC', 'Next.js',
];

export default function SubclarityPage() {
  return (
    <div className='min-h-screen bg-black'>
      <SectionGridBackground>
        <div className='max-w-screen-lg mx-auto px-4 py-24'>

          <Link
            href='/work'
            className='inline-flex items-center gap-2 text-neutral-500 hover:text-blue-400 text-sm transition-colors mb-12'
          >
            ← All Work
          </Link>

          <div className='mb-10'>
            <span className='text-xs font-semibold tracking-widest text-blue-400 uppercase'>
              B2B SaaS · Automation · FinTech · Compliance
            </span>
            <h1 className='text-4xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight'>
              Subclarity
            </h1>
            <p className='text-xl text-neutral-300 mb-6 md:w-[75%] leading-relaxed'>
              An end-to-end B2B platform that replaces the spreadsheets, email chains, and manual
              processes of IT subcontractor management with automated onboarding, contract workflows,
              tax calculation, and real-time compliance tracking.
            </p>
            <div className='flex flex-wrap gap-4 text-sm text-neutral-500 mb-6'>
              <span><span className='text-neutral-300 font-medium'>Client:</span> Subclarity</span>
              <span><span className='text-neutral-300 font-medium'>Role:</span> Full-Stack Engineer</span>
              <span><span className='text-neutral-300 font-medium'>Year:</span> 2023</span>
              <span>
                <a
                  href='https://subclarity.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-400 hover:text-blue-300 transition-colors'
                >
                  subclarity.com ↗
                </a>
              </span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {['B2B SaaS', 'Automation', 'Contract Management', 'Compliance', 'Accounting'].map((t) => (
                <Badge key={t} variant='outline' className='border-blue-800/50 text-blue-400 text-xs'>
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Screenshot */}
          <div className='w-full rounded-xl overflow-hidden border border-neutral-800 mb-16 relative'>
            <Image
              src='/sub.png'
              alt='Subclarity platform screenshot'
              width={1200}
              height={600}
              className='w-full h-auto object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none' />
          </div>

          <div className='space-y-16'>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-blue-500' />
                The Problem
              </h2>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                Mid-to-large IT services companies managing a bench of 30–200 subcontractors are
                running on a frighteningly manual stack: onboarding docs collected via email, contracts
                managed in Google Drive folders, tax forms tracked in Excel, payments kicked off via
                manual bank transfers, and compliance deadlines managed through calendar reminders
                that half the team misses.
              </p>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                The cost of this system isn&apos;t just administrative overhead. Missed compliance
                certifications create legal liability. Late payments damage subcontractor relationships.
                Tax miscalculations in complex multi-state IT contracts create audit risk. And with
                no centralized reporting, operations directors have no real-time visibility into where
                their contractor base stands at any point.
              </p>
              <p className='text-neutral-400 leading-relaxed'>
                Subclarity aimed to replace the entire workflow stack — from the first document request
                to the final payment disbursement — with an automated, compliant, auditable system.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-blue-500' />
                Core Platform Modules
              </h2>
              <div className='space-y-5'>
                {[
                  {
                    title: 'Automated Onboarding',
                    body: 'When a new subcontractor is added, the system triggers a structured onboarding flow: DocuSign agreement generation from template parameters, document request checklist (W-9, insurance certificates, compliance certs), background check webhook integration, and bank account verification via Plaid. Each step has a defined SLA and automated follow-up cadence. An ops manager who previously spent 2–3 hours onboarding each contractor now reviews a completed checklist rather than chasing documents.',
                  },
                  {
                    title: 'Contract Lifecycle Management',
                    body: 'Contracts are parametrized from master templates with jurisdiction-specific clauses auto-inserted based on the contractor\'s state and the engagement type (T&M vs. fixed-bid vs. staff aug). The contract repository is searchable and indexed — finding the specific IP ownership clause from a 2021 engagement takes seconds, not an afternoon. Automated renewal alerts fire 60, 30, and 7 days before expiry with one-click renewal or renegotiation workflow.',
                  },
                  {
                    title: 'Tax & Accounting Engine',
                    body: 'Subcontractor tax is complex: 1099 classification rules, state-by-state nexus considerations, backup withholding triggers, and year-end 1099 generation at scale. The accounting engine handles multi-state tax calculation, generates 1099-NEC forms automatically at year end, and produces a reconciliation-ready payment journal that syncs to QuickBooks and NetSuite via API. Payments are disbursed via Stripe Connect with settlement to the subcontractor\'s verified bank account.',
                  },
                  {
                    title: 'Compliance Tracking',
                    body: 'Every contractor has a compliance profile: insurance expiry dates, certification renewals, clearance levels, training completions. The platform enforces a compliance gate on the payment pipeline — contractors with expired credentials are automatically flagged and payments are paused (with override capability for an authorized admin) until documentation is refreshed. A real-time compliance dashboard shows the ops team their contractor population\'s risk exposure at a glance.',
                  },
                  {
                    title: 'Financial Health Dashboards',
                    body: 'Operations directors get a live dashboard: active contractor count, monthly spend run rate, revenue-per-contractor by project, margin by engagement type, and 90-day forecast based on active contract end dates. Drill-down from the aggregate to individual contractor P&L in two clicks. Exportable to Excel for board reporting.',
                  },
                ].map((item) => (
                  <div key={item.title} className='bg-neutral-950 border border-neutral-800 rounded-xl p-6'>
                    <h3 className='text-blue-400 font-semibold mb-3'>{item.title}</h3>
                    <p className='text-neutral-400 text-sm leading-relaxed'>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-blue-500' />
                Results
              </h2>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-6'>
                {[
                  { metric: '~85%', label: 'Reduction in onboarding time per contractor' },
                  { metric: '100%', label: 'Automated tax form generation (1099-NEC)' },
                  { metric: '0', label: 'Missed compliance renewals after deployment' },
                ].map((s) => (
                  <div key={s.label} className='bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-center'>
                    <p className='text-2xl font-bold text-blue-400 mb-1'>{s.metric}</p>
                    <p className='text-xs text-neutral-500 leading-tight'>{s.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-blue-500' />
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
            <Link href='/work/yuni' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              ← Yuni
            </Link>
            <Link href='/work/upgrad-lms' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              Next: upGrad LMS →
            </Link>
          </div>
        </div>
      </SectionGridBackground>
    </div>
  );
}
