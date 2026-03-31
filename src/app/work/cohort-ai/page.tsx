import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SectionGridBackground } from '@/components/ui/section-grid-background';

export const metadata: Metadata = {
  title: 'Cohort AI — Case Study | Arvind Narayan',
  description:
    'How I architected the AI agent pipeline behind Cohort AI — a recruitment platform using SPEC agents (Sally, Pete, Eva, Charlie) to deliver pre-vetted technical talent in 72 hours.',
  openGraph: {
    title: 'Cohort AI — AI-Driven Technical Recruitment',
    description:
      'Case study: designing the multi-agent sourcing and evaluation pipeline behind Cohort AI.',
    url: 'https://arwwwind.com/work/cohort-ai',
  },
};

const stack = [
  'Python', 'LangGraph', 'OpenAI GPT-4o', 'Embeddings (text-embedding-3-large)',
  'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'GitHub API', 'LinkedIn Scraping',
  'Next.js', 'TypeScript', 'Tailwind CSS',
];

export default function CohortAIPage() {
  return (
    <div className='min-h-screen bg-black'>
      <SectionGridBackground>
        <div className='max-w-screen-lg mx-auto px-4 py-24'>

          {/* Nav */}
          <Link
            href='/work'
            className='inline-flex items-center gap-2 text-neutral-500 hover:text-violet-400 text-sm transition-colors mb-12'
          >
            ← All Work
          </Link>

          {/* Hero */}
          <div className='mb-10'>
            <span className='text-xs font-semibold tracking-widest text-violet-400 uppercase'>
              AI Product · Recruitment · Multi-Agent Systems
            </span>
            <h1 className='text-4xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight'>
              Cohort AI
            </h1>
            <p className='text-xl text-neutral-300 mb-6 md:w-[75%] leading-relaxed'>
              An AI-native recruitment platform that uses a suite of specialized agents — SPEC —
              to source, vet, and deliver the top 3 pre-vetted technical candidates for a role
              within 72 hours. No resume spam, no Boolean query nightmares.
            </p>
            <div className='flex flex-wrap gap-4 text-sm text-neutral-500 mb-6'>
              <span><span className='text-neutral-300 font-medium'>Client:</span> Cohort AI</span>
              <span><span className='text-neutral-300 font-medium'>Role:</span> AI Systems Architect</span>
              <span><span className='text-neutral-300 font-medium'>Year:</span> 2024</span>
              <span>
                <a
                  href='https://thecohort.ai'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-violet-400 hover:text-violet-300 transition-colors'
                >
                  thecohort.ai ↗
                </a>
              </span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {['AI Agents', 'NLP', 'LangGraph', 'Personalization', 'Multi-Agent', 'Recruitment'].map((t) => (
                <Badge key={t} variant='outline' className='border-violet-800/50 text-violet-400 text-xs'>
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Screenshot collage */}
          <div className='w-full rounded-xl overflow-hidden border border-neutral-800 mb-16 grid grid-cols-2 md:grid-cols-3 gap-2'>
            {[
              { src: '/CohortAI_Connect_Campaign_Messages.png', alt: 'Outreach messaging' },
              { src: '/CohortAI_Home_Job_Offer_Text_Filled.png', alt: 'Job offer creation' },
              { src: '/CohortAI_Match_Candidates_High_Fit.png', alt: 'Candidate matching' },
              { src: '/CohortAI_Sequence_Expanded.png', alt: 'Sourcing sequence' },
            ].map((img, i) => (
              <div key={i} className='aspect-square bg-black relative overflow-hidden'>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 50vw, 33vw'
                />
              </div>
            ))}
          </div>

          {/* Content */}
          <div className='space-y-16'>

            {/* Problem */}
            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-violet-500' />
                The Problem
              </h2>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                Technical hiring is broken in a predictable way. Founders and engineering managers
                spend 40–60% of their hiring cycles on sourcing — writing Boolean queries, scrolling
                LinkedIn, and reading resumes that look great on paper but fail a 10-minute technical
                screen. The average time-to-hire for a senior engineer is 45–60 days. That&apos;s
                runway you can&apos;t recover.
              </p>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                Existing ATS solutions give you a bigger haystack, not a better needle. Platforms like
                Greenhouse or Lever optimize for tracking, not discovery. LinkedIn Recruiter requires
                constant human curation. What founders actually need is fewer, better candidates
                delivered fast.
              </p>
              <p className='text-neutral-400 leading-relaxed'>
                Cohort AI&apos;s thesis: if you can automate the first 80% of the sourcing-to-screen
                pipeline with AI agents, a human Talent Architect can focus entirely on the 20% that
                requires judgment — culture fit, compensation negotiation, offer strategy.
              </p>
            </section>

            {/* SPEC Architecture */}
            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-violet-500' />
                The SPEC Agent Architecture
              </h2>
              <p className='text-neutral-400 leading-relaxed mb-8'>
                The core of Cohort AI is SPEC — four specialized agents that work in sequence,
                each with a narrow responsibility and a well-defined handoff contract. I designed
                this as a directed graph using LangGraph, where each node can branch, retry, or
                escalate to a human-in-the-loop checkpoint.
              </p>

              <div className='space-y-6'>
                {[
                  {
                    name: 'Sally — The Sourcer',
                    color: 'border-violet-500/40 bg-violet-950/20',
                    label: 'text-violet-400',
                    description:
                      'Sally operates as a multi-source talent spider. Given a job spec, she fans out across GitHub (commit activity, language usage, project ownership), LinkedIn (role history, recommendations), and Stack Overflow (reputation, answer quality, topical expertise). She doesn\'t just find profiles that match keywords — she builds a signal-weighted score for each candidate across technical depth, recency of activity, and domain relevance. Sally runs async across all sources simultaneously, deduplicates by normalized email/handle, and produces a ranked candidate shortlist with an initial match confidence score.',
                    detail: 'Built on the GitHub GraphQL API, a structured LinkedIn scraper with rate limiting and proxy rotation, and Stack Overflow\'s public data API. Signals are vectorized and compared against a role-specific embedding built from the job description using text-embedding-3-large.',
                  },
                  {
                    name: 'Pete — The Prospector',
                    color: 'border-indigo-500/40 bg-indigo-950/20',
                    label: 'text-indigo-400',
                    description:
                      'Pete handles outreach personalization at scale. For every candidate Sally surfaces, Pete generates a highly personalized first-touch message referencing their specific work — an open-source project they contributed to, a post they wrote, a role transition that mirrors the opportunity. This isn\'t template substitution — Pete uses a fine-tuned prompt chain to synthesize the candidate\'s public signal into a coherent "why I\'m reaching out about this specific role" narrative. Pete also manages follow-up cadences, cooling-off periods, and response classification (interested, not now, refer someone else).',
                    detail: 'Pete achieved a 3.2× improvement in response rate vs. generic recruiter InMails in A/B testing. The key was specificity — referencing a candidate\'s actual code, not just their title.',
                  },
                  {
                    name: 'Eva — The Evaluator',
                    color: 'border-blue-500/40 bg-blue-950/20',
                    label: 'text-blue-400',
                    description:
                      'Once a candidate expresses interest, Eva takes over. She conducts an asynchronous technical screening — presenting role-specific challenges, evaluating submitted code or architecture answers against a rubric, and cross-referencing the candidate\'s GitHub contribution history against the claims in their resume. Eva produces a structured evaluation report: skill match by dimension (language proficiency, system design, domain knowledge, culture signals), a confidence-weighted overall score, and a fit note explaining her reasoning. This replaces the traditional 45-minute phone screen.',
                    detail: 'Eva\'s rubric is customizable per role and company. The evaluation pipeline chains a code analysis step (AST-based for structure, GPT-4o for quality commentary) with a semantic comparison of the candidate\'s stated experience against what their actual commits and answers demonstrate.',
                  },
                  {
                    name: 'Charlie — The Closer',
                    color: 'border-cyan-500/40 bg-cyan-950/20',
                    label: 'text-cyan-400',
                    description:
                      'Charlie manages everything after the technical bar is cleared — scheduling coordination, interview prep packet generation, offer simulation (given market data and the candidate\'s current comp signals), and the logistics of getting both sides to a signed offer. Charlie integrates with Calendly, Google Calendar, and Greenhouse to maintain a single source of truth for the pipeline state. He also generates the final "candidate brief" delivered to the hiring manager — a 1-page synthesis of Eva\'s evaluation, Pete\'s engagement history, and a recommended interview focus area.',
                    detail: 'The candidate brief format was designed with hiring managers, not recruiters. Three sections: what the candidate is strong at, what to probe deeper, and one thing that surprised us. Consistently cited as the most valuable artifact in user interviews.',
                  },
                ].map((agent) => (
                  <div key={agent.name} className={`rounded-xl border ${agent.color} p-6`}>
                    <h3 className={`text-lg font-bold ${agent.label} mb-3`}>{agent.name}</h3>
                    <p className='text-neutral-400 text-sm leading-relaxed mb-3'>{agent.description}</p>
                    <p className='text-neutral-500 text-xs leading-relaxed italic border-l border-neutral-800 pl-3'>
                      {agent.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Architecture */}
            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-violet-500' />
                Technical Architecture
              </h2>
              <div className='grid md:grid-cols-2 gap-6'>
                {[
                  {
                    title: 'Orchestration Layer',
                    body: 'LangGraph manages the SPEC state machine. Each agent is a node; edges carry typed state objects. Human-in-the-loop checkpoints pause execution at Eva\'s evaluation output, letting Talent Architects override or approve before Charlie runs. This made the system auditable — every decision has a trace.',
                  },
                  {
                    title: 'Candidate Matching',
                    body: 'Job descriptions are embedded and stored per-search. Candidate profiles are vectorized at scrape time and stored in pgvector. Semantic similarity is combined with structured signal scores (recency, activity depth, role alignment) using a weighted reranking step to produce the final shortlist.',
                  },
                  {
                    title: 'Reliability & Rate Limiting',
                    body: 'Celery + Redis powers the async task queue for Sally\'s multi-source fan-out. Scrapers run with exponential backoff, proxy rotation, and source-specific rate envelopes to stay within API limits without triggering blocks. Failed tasks retry up to 3 times before escalation.',
                  },
                  {
                    title: 'Data Privacy',
                    body: 'All candidate data is scoped to the hiring company\'s tenant. Profiles sourced for one search are never surfaced to another company\'s pipeline. PII is encrypted at rest. Candidate briefings are generated on-demand and never stored permanently without explicit consent.',
                  },
                ].map((item) => (
                  <div key={item.title} className='bg-neutral-950 border border-neutral-800 rounded-xl p-5'>
                    <h3 className='text-white font-semibold mb-2 text-sm'>{item.title}</h3>
                    <p className='text-neutral-500 text-sm leading-relaxed'>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Results */}
            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-violet-500' />
                Results & Impact
              </h2>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
                {[
                  { metric: '40%', label: 'Reduction in time-to-hire' },
                  { metric: '72h', label: 'First candidates delivered' },
                  { metric: '3.2×', label: 'Outreach response rate lift' },
                  { metric: '10%', label: 'Success-based fee — no upfront' },
                ].map((s) => (
                  <div key={s.label} className='bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-center'>
                    <p className='text-2xl font-bold text-violet-400 mb-1'>{s.metric}</p>
                    <p className='text-xs text-neutral-500 leading-tight'>{s.label}</p>
                  </div>
                ))}
              </div>
              <p className='text-neutral-400 text-sm leading-relaxed'>
                Hiring managers consistently reported that the Candidate Brief — the 1-page synthesis
                Eva and Charlie produce — was the most actionable document they&apos;d ever received
                from a recruiter or recruiting tool. The signal-to-noise ratio was the differentiator:
                instead of reviewing 40 resumes, hiring managers made a decision from 3 fully
                contextualized, pre-screened candidates.
              </p>
            </section>

            {/* Stack */}
            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-violet-500' />
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

          {/* Footer nav */}
          <div className='mt-20 pt-8 border-t border-neutral-900 flex justify-between items-center'>
            <Link href='/work' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              ← All Work
            </Link>
            <Link href='/work/tickerlens' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              Next: TickerLens →
            </Link>
          </div>
        </div>
      </SectionGridBackground>
    </div>
  );
}
