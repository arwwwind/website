import { CardContainer, CardItem } from '@/components/ui/3d-card';
import { Button } from '@/components/ui/button';
import { FlipWords } from '@/components/ui/flip-words';
import { Timeline } from '@/components/ui/timeline';
import { Badge } from '@/components/ui/badge';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { MeteorShower } from '@/components/ui/meteor-shower';
import { GradientText } from '@/components/ui/gradient-text';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { HeroStats } from '@/components/HeroStats';
import { GradientDescentBg } from '@/components/ui/gradient-descent-bg';
import { SectionGridBackground } from '@/components/ui/section-grid-background';
import Image from 'next/image';
import { BrainCircuit, Database, FlaskConical, CloudCog } from 'lucide-react';
import { WorkCarousel } from '@/components/ui/work-carousel';

export default function Home() {
  const hello = ['Hi,', 'Hello,', 'Hallo,', 'Hola!', 'Bonjour,'];
  const roles = [
    'Staff AI/ML Engineer',
    'RAG & Agentic Systems',
    'GNN & Molecular ML',
    'Founder @ Superscaled',
    'Open to Consulting',
  ];

  return (
    <div className='min-h-[100vh] w-full max-w-none dark:bg-black bg-white relative'>
      <AuroraBackground className='min-h-screen w-full max-w-none'>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section
          id='hero'
          aria-label='Introduction'
          className='relative w-full min-h-screen max-w-none overflow-hidden'
        >
          <GradientDescentBg className='z-[0] opacity-70' />
          <MeteorShower count={24} />
          <div className='max-w-screen-xl mx-auto px-4 py-16 md:py-24 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 items-center'>

            {/* Left: Text */}
            <div className='order-2 md:order-1 font-bold'>
              <h1 className='text-2xl md:text-3xl py-1'>
                <FlipWords words={hello} />
              </h1>
              <h2 className='text-3xl md:text-5xl px-2 py-1 leading-tight'>
                <span>{`I'm `}</span>
                <GradientText>Arvind Narayan</GradientText>
              </h2>
              <div className='text-xl md:text-2xl mt-1 text-neutral-300'>
                <FlipWords words={roles} />
              </div>

              <p className='px-2 pt-6 md:w-[92%] font-normal text-sm text-neutral-300 tracking-wide leading-relaxed'>
                I build AI systems that actually work in the real world — for
                biotech research labs, financial risk teams, and enterprise
                organizations. Currently at{' '}
                <span className='text-rose-400 font-medium'>GATC Health</span>
                , where the AI research tool I built is now the team&apos;s
                daily interface for scientific literature and drug discovery
                work. My ML models for drug property prediction achieve{' '}
                <span className='text-rose-400 font-medium'>
                  F1 ≈ 0.90, AUROC ≈ 0.92
                </span>{' '}
                — near state-of-the-art accuracy on biomedical benchmarks. Also
                founding{' '}
                <a
                  href='https://superscaled.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-teal-400 font-medium underline underline-offset-2 hover:text-teal-300 transition-colors'
                >
                  Superscaled
                </a>
                . Nine years shipping at Yahoo, upGrad, and Egen.ai.
              </p>

              <HeroStats />

              <div className='flex flex-wrap gap-3 px-2 mt-6'>
                <MagneticButton>
                  <a
                    href='https://calendly.com/thearvindnarayan/15min'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <button
                      type='button'
                      className='text-white bg-rose-800 ring-2 focus:outline-none ring-rose-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-b from-rose-600 to-rose-900 hover:from-rose-500 hover:to-rose-800 transition-all flex items-center gap-2'
                    >
                      <i className='lni lni-google-meet'></i>
                      <span>Book a Call</span>
                    </button>
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href='mailto:hi@arwwwind.com?subject=Hello%20Arvind%2C'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <button
                      type='button'
                      className='text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 ring-2 focus:outline-none ring-neutral-700 hover:ring-teal-700/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all flex items-center gap-2'
                    >
                      <i className='lni lni-envelope'></i>
                      <span>Email Me</span>
                    </button>
                  </a>
                </MagneticButton>
              </div>

              <div className='flex gap-3 px-2 mt-3'>
                <a
                  href='https://www.linkedin.com/in/arwwwind/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button
                    variant='outline'
                    size='sm'
                    className='text-xs hover:border-teal-700/50 hover:text-teal-400 transition-colors'
                  >
                    <i className='lni lni-linkedin-original mr-1'></i>LinkedIn
                  </Button>
                </a>
                <a
                  href='https://github.com/arwwwind'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button
                    variant='outline'
                    size='sm'
                    className='text-xs hover:border-teal-700/50 hover:text-teal-400 transition-colors'
                  >
                    <i className='lni lni-github-original mr-1'></i>GitHub
                  </Button>
                </a>
              </div>
            </div>

            {/* Right: Avatar */}
            <div className='order-1 md:order-2 flex justify-center'>
              <CardContainer>
                <CardItem translateZ='100' className='mt-4'>
                  <Image
                    className='inline-block h-[200px] w-auto md:h-[320px] rounded-full ring-[3px] ring-teal-600/70 shadow-[0_0_40px_rgba(20,184,166,0.2)]'
                    width={320}
                    height={320}
                    src='/avatar.png'
                    alt='Arvind Narayan — Staff AI/ML Engineer'
                    priority
                  />
                </CardItem>
              </CardContainer>
            </div>
          </div>
          <section
            id='work'
            aria-label='Selected work'
            className='py-12 px-4 max-w-screen-xl mx-auto border-t border-neutral-900'
          >
            <div className='mb-2'>
              <span className='text-xs font-semibold tracking-widest text-teal-400 uppercase'>
                Selected Work
              </span>
            </div>
            <div className='flex items-end justify-between mb-8'>
              <h2 className='text-3xl md:text-4xl font-bold text-white'>
                Products &amp; Case Studies
              </h2>
            </div>
            <WorkCarousel />
          </section>
        </section>

      </AuroraBackground>

      <SectionGridBackground>
        {/* ── What I Do ─────────────────────────────────────── */}
        <section
          id='what-i-do'
          aria-label='Capabilities'
          className='py-20 px-4 max-w-screen-xl mx-auto'
        >
          <div className='mb-2'>
            <span className='text-xs font-semibold tracking-widest text-teal-400 uppercase'>
              Capabilities
            </span>
          </div>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-2'>
            I architect AI systems that work in production.
          </h2>
          <p className='text-neutral-400 mb-10 text-sm md:text-base'>
            Biotech research, financial risk, enterprise AI — the full stack, end to end.
          </p>

          <BentoGrid>
            <BentoCard
              title='RAG & Agentic AI Systems'
              description='An AI research assistant used daily by lab scientists — finds papers, looks up drug data, and reasons across millions of documents without losing context. Technically: hybrid search (keyword + semantic), long-context memory across sessions, and tool-calling so the AI can autonomously query ChEMBL, PubChem, and specialized ML models.'
              icon={<BrainCircuit className='w-6 h-6 text-rose-400' />}
              className='md:col-span-2'
              gradient='bg-gradient-to-br from-rose-950/50 to-transparent'
            />
            <BentoCard
              title='Molecular ML & GNNs'
              description='ML models that predict whether a drug compound will be toxic, absorbed correctly, or reach the brain — F1 ≈ 0.90, AUROC ≈ 0.92 (near state-of-the-art). Graph neural networks that read molecular structure as a graph, deployed from data curation to cloud inference APIs.'
              icon={<FlaskConical className='w-6 h-6 text-teal-400' />}
              className='md:row-span-2'
              gradient='bg-gradient-to-br from-teal-950/50 to-transparent'
            />
            <BentoCard
              title='Clinical & Research Analytics'
              description="Investigated why a Phase 3 drug trial didn't show results. Discovered that how patients spoke during visits — not just what they reported — predicted who responded to placebo, pointing to a clinic habituation effect. Delivered recommendations that shaped future trial design."
              icon={<Database className='w-6 h-6 text-blue-400' />}
              gradient='bg-gradient-to-br from-blue-950/50 to-transparent'
            />
            <BentoCard
              title='LLM Infrastructure & MLOps'
              description='Deployed a 27 billion parameter language model on private cloud infrastructure — no external API dependency, full data control. Built quality evaluation pipelines, customized the model for scientific language, and designed the system so newer AI models can be swapped in without disrupting workflows.'
              icon={<CloudCog className='w-6 h-6 text-emerald-400' />}
              gradient='bg-gradient-to-br from-emerald-950/40 to-transparent'
            />
          </BentoGrid>
        </section>

        {/* ── Selected Work ─────────────────────────────────── */}
        <section
          id='work'
          aria-label='Selected work'
          className='py-12 px-4 max-w-screen-xl mx-auto border-t border-neutral-900'
        >
          <div className='mb-2'>
            <span className='text-xs font-semibold tracking-widest text-teal-400 uppercase'>
              Selected Work
            </span>
          </div>
          <div className='flex items-end justify-between mb-8'>
            <h2 className='text-3xl md:text-4xl font-bold text-white'>
              Products &amp; Case Studies
            </h2>
          </div>
          <WorkCarousel />
        </section>

        {/* ── Building ──────────────────────────────────────── */}
        <section
          id='building'
          aria-label='Ventures'
          className='py-12 px-4 max-w-screen-xl mx-auto border-t border-neutral-900'
        >
          <div className='mb-2'>
            <span className='text-xs font-semibold tracking-widest text-teal-400 uppercase'>
              Also Building
            </span>
          </div>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-3'>
            Superscaled
          </h2>
          <p className='text-neutral-400 text-sm mb-2 md:w-[65%]'>
            An early-stage AI venture for engineering teams that need to move
            faster than their organization&apos;s approval and procurement
            processes allow. There&apos;s a frustrating gap between
            &ldquo;we have a working model&rdquo; and &ldquo;this is actually
            running in production, monitored, and trusted by the business.&rdquo;
            Superscaled builds the tooling that closes it.
          </p>
          <p className='text-neutral-500 text-xs mb-6 md:w-[65%]'>
            Building in public at{' '}
            <a
              href='https://superscaled.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-teal-400 underline underline-offset-2 hover:text-teal-300 transition-colors'
            >
              superscaled.com
            </a>
            .
          </p>
          <a
            href='https://superscaled.com'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-teal-800/60 bg-teal-950/30 text-teal-400 text-sm font-medium hover:bg-teal-950/60 hover:border-teal-600 transition-all'
          >
            <span>Visit Superscaled</span>
            <span className='text-xs'>→</span>
          </a>
        </section>

        {/* ── Tech Stack ────────────────────────────────────── */}
        <section
          id='stack'
          aria-label='Technology stack'
          className='py-12 px-4 max-w-screen-xl mx-auto border-t border-neutral-900'
        >
          <div className='mb-2'>
            <span className='text-xs font-semibold tracking-widest text-teal-400 uppercase'>
              Tools
            </span>
          </div>
          <h2 className='text-2xl font-bold mb-1'>
            <GradientText>Tech Stack</GradientText>
          </h2>
          <p className='text-neutral-500 text-sm mb-8'>
            From ML and data pipelines to infrastructure and product UI — organized
            by domain.
          </p>
          <div className='flex flex-col gap-8'>
            {stackCategories.map((cat) => (
              <div key={cat.label}>
                <p className='text-xs font-semibold tracking-widest text-teal-400 uppercase mb-3'>
                  {cat.label}
                </p>
                <div className='flex flex-wrap gap-2'>
                  {cat.items.map((item) =>
                    item.src ? (
                      <a
                        key={item.name}
                        href={item.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-800 hover:border-teal-800/60 bg-neutral-950 hover:bg-teal-950/20 transition-all duration-200'
                      >
                        <div
                          style={{ backgroundImage: `url("${item.src}")` }}
                          className='w-4 h-4 bg-contain bg-center bg-no-repeat saturate-0 group-hover:saturate-100 transition-all duration-300'
                        />
                        <span className='text-xs text-neutral-500 group-hover:text-teal-400 transition-colors'>
                          {item.name}
                        </span>
                      </a>
                    ) : (
                      <span
                        key={item.name}
                        className='flex items-center px-3 py-2 rounded-lg border border-neutral-800 hover:border-teal-800/60 hover:bg-teal-950/20 bg-neutral-950 text-xs text-neutral-500 hover:text-teal-400 transition-all duration-200 cursor-default'
                      >
                        {item.name}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Experience Timeline ───────────────────────────── */}
        <section id='timeline' aria-label='Work experience' className='py-8 px-4'>
          <Timeline data={exp} />
        </section>
      </SectionGridBackground>
    </div>
  );
}

const stackCategories = [
  {
    label: 'AI & LLMs',
    items: [
      { name: 'Python', src: '/py.png', href: 'https://www.python.org/' },
      { name: 'PyTorch', src: null, href: '#' },
      { name: 'Hugging Face', src: null, href: '#' },
      { name: 'LangChain / LangGraph', src: null, href: '#' },
      { name: 'SGLang', src: null, href: '#' },
      { name: 'Qwen / Llama', src: null, href: '#' },
      { name: 'Prompt Engineering', src: null, href: '#' },
      { name: 'RLHF / Fine-Tuning', src: null, href: '#' },
    ],
  },
  {
    label: 'ML Engineering',
    items: [
      { name: 'scikit-learn', src: null, href: '#' },
      { name: 'XGBoost / LightGBM', src: null, href: '#' },
      { name: 'GNNs (PyG)', src: null, href: '#' },
      { name: 'EDA & Feature Analysis', src: null, href: '#' },
      { name: 'Model Evaluation & Ablation', src: null, href: '#' },
      { name: 'SMOTE / Class Balancing', src: null, href: '#' },
    ],
  },
  {
    label: 'MLOps',
    items: [
      { name: 'Experiment Tracking', src: null, href: '#' },
      { name: 'Model Registry & Versioning', src: null, href: '#' },
      { name: 'CI/CD for ML', src: null, href: '#' },
      { name: 'Model Monitoring & Drift', src: null, href: '#' },
      { name: 'Reproducible Training', src: null, href: '#' },
      { name: 'Staged Rollouts & Canary', src: null, href: '#' },
      { name: 'Feature Store Patterns', src: null, href: '#' },
    ],
  },
  {
    label: 'Data Engineering',
    items: [
      { name: 'AWS Glue', src: null, href: 'https://aws.amazon.com/glue/' },
      { name: 'PySpark', src: null, href: 'https://spark.apache.org/' },
      { name: 'Amazon Redshift', src: null, href: 'https://aws.amazon.com/redshift/' },
      { name: 'Amazon S3', src: null, href: 'https://aws.amazon.com/s3/' },
    ],
  },
  {
    label: 'Retrieval & Data Stores',
    items: [
      { name: 'BM25 / TF-IDF', src: null, href: '#' },
      { name: 'Dense Embeddings', src: null, href: '#' },
      { name: 'Cross-Encoder Reranking', src: null, href: '#' },
      { name: 'Pinecone', src: null, href: '#' },
      { name: 'pgvector', src: null, href: '#' },
      { name: 'Weaviate', src: null, href: '#' },
      { name: 'Chroma', src: null, href: '#' },
      { name: 'PostgreSQL', src: '/pg.png', href: 'https://www.postgresql.org/' },
      { name: 'Redis', src: '/redis.svg', href: 'https://redis.io/' },
      { name: 'MongoDB', src: '/mongo.svg', href: 'https://www.mongodb.com/' },
      { name: 'SQS / Event Pipelines', src: null, href: '#' },
    ],
  },
  {
    label: 'Infrastructure & IaC',
    items: [
      { name: 'Infrastructure as Code', src: null, href: '#' },
      { name: 'Terraform', src: null, href: 'https://www.terraform.io/' },
      { name: 'Kubernetes', src: null, href: 'https://kubernetes.io/' },
      { name: 'Helm', src: null, href: 'https://helm.sh/' },
      { name: 'Docker', src: null, href: 'https://www.docker.com/' },
      { name: 'ELK Stack', src: null, href: '#' },
    ],
  },
  {
    label: 'Cloud & APIs',
    items: [
      { name: 'AWS', src: '/aws.png', href: 'https://aws.amazon.com/' },
      { name: 'SageMaker', src: null, href: '#' },
      { name: 'FastAPI', src: null, href: '#' },
      { name: 'Golang APIs', src: null, href: 'https://go.dev/' },
      { name: 'GraphQL', src: null, href: '#' },
      { name: 'GPU Inference', src: null, href: '#' },
    ],
  },
  {
    label: 'Application Development',
    items: [
      { name: 'React', src: '/react.png', href: 'https://react.dev/' },
      { name: 'TypeScript', src: '/ts.svg', href: 'https://www.typescriptlang.org/' },
      { name: 'Node.js', src: '/node.png', href: 'https://nodejs.org/' },
      { name: 'Golang', src: null, href: 'https://go.dev/' },
      { name: 'FastAPI', src: null, href: '#' },
      { name: 'Tailwind CSS', src: null, href: 'https://tailwindcss.com/' },
      { name: 'shadcn/ui', src: null, href: 'https://ui.shadcn.com/' },
    ],
  },
];

const imgClass =
  'rounded-lg object-cover h-18 md:h-34 lg:h-40 w-full shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]';

const exp = [
  {
    title: 'Apr 2025–',
    content: (
      <div>
        <h3 className='text-lg md:text-2xl mb-1 text-teal-400 max-w-4xl font-bold'>
          GATC Health
        </h3>
        <p className='text-neutral-500 text-xs mb-6 font-normal'>
          Senior AI/ML Engineer · GATC Health
        </p>

        {/* Project 1 */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Hybrid RAG + Agentic Research Platform
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Built an{' '}
            <span className='text-white font-medium'>
              enterprise AI research platform (think Perplexity, but for
              science)
            </span>{' '}
            — used daily by lab teams to search the scientific literature, look
            up drug compounds, and explore hypotheses. Became the primary AI
            interface across the organization within weeks of launch.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Designed a{' '}
            <span className='text-rose-400 font-medium'>
              hybrid search system
            </span>{' '}
            that combines traditional keyword matching with modern semantic
            search — so it finds the right documents whether you phrase a query
            exactly or ask it conversationally. Achieves high recall across
            large chemical and biological literature corpora. (Technical: BM25 +
            dense embeddings, late fusion, cross-encoder reranking.)
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Built a{' '}
            <span className='text-rose-400 font-medium'>
              long-context memory system
            </span>{' '}
            that lets the AI maintain coherence across multi-session research
            workflows — so scientists can return hours or days later and pick up
            exactly where they left off, with the AI retaining full context.
            Scales to millions of words without losing coherence.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Gave the AI the ability to{' '}
            <span className='text-rose-400 font-medium'>
              autonomously use specialized tools
            </span>{' '}
            — toxicity lookups, molecular property prediction, chemical
            structure searches, and live queries to scientific databases
            (ChEMBL, PubChem) — so it can answer complex drug discovery
            questions without a human in the loop.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Deployed a{' '}
            <span className='text-rose-400 font-medium'>
              27 billion parameter language model on our own AWS infrastructure
            </span>{' '}
            — no reliance on external AI providers, full data control. The
            system is modular, so newer and more capable models can be swapped
            in as they become available without rebuilding the application.
          </p>
          <div className='flex flex-wrap gap-2'>
            {[
              'RAG',
              'BM25',
              'Dense Embeddings',
              'Reranking',
              'Agentic AI',
              'LangGraph',
              'Qwen 3.5',
              'SGLang',
              'SageMaker',
              'LIGHT Memory',
            ].map((t) => (
              <Badge key={t} variant='secondary'>
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project 2 */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            PAL-3 Post-Hoc Clinical Analytics · VistaGen Therapeutics
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Investigated why a large{' '}
            <span className='text-white font-medium'>
              Phase 3 clinical trial for social anxiety
            </span>{' '}
            didn&apos;t show the expected improvement over placebo. Combined
            patient health scores over time, site visit records, enrollment
            timing, and speech patterns measured from recorded therapy sessions
            to find out what actually happened.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Discovered that{' '}
            <span className='text-rose-400 font-medium'>
              how patients spoke during visits
            </span>{' '}
            — how much they talked, sentence length, total talk time — was a
            reliable predictor of who responded to placebo. This pointed to a
            habituation effect: the act of repeatedly attending clinic visits
            was itself reducing anxiety, making it harder for the drug to
            show a measurable difference.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Also explored how recruitment channels, site scheduling patterns,
            and patient vs. clinician communication styles influenced outcomes
            — delivering concrete recommendations to help the sponsor design
            more robust future trials.
          </p>
          <div className='flex flex-wrap gap-2'>
            {[
              'Clinical NLP',
              'Speech Features',
              'Longitudinal Analysis',
              'Placebo Modeling',
              'Python',
              'Pandas',
            ].map((t) => (
              <Badge key={t} variant='secondary'>
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project 3 */}
        <div className='pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Graph Neural Networks for Molecular Property Prediction
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Built ML models that predict drug compound properties from molecular
            structure — specifically whether a compound is{' '}
            <span className='text-rose-400 font-medium'>
              toxic, how it gets absorbed and metabolized, and whether it can
              cross into the brain
            </span>
            . Used graph neural networks (GNNs) that &ldquo;read&rdquo; a
            molecule as a graph — atoms as nodes, bonds as edges — rather than
            treating it as a flat list of numbers.{' '}
            <span className='text-rose-400 font-semibold'>
              F1 ≈ 0.90 · AUROC ≈ 0.92.
            </span>
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Handled the full data pipeline: sourcing compound data from public
            scientific databases (ChEMBL, PubChem), cleaning and deduplicating
            records, and addressing the common problem of heavily imbalanced
            datasets — where toxic compounds are rare, making them harder to
            learn from without special handling.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Deployed the models as low-latency{' '}
            <span className='text-rose-400 font-medium'>
              GPU-accelerated APIs on Kubernetes
            </span>
            — available to internal teams via well-documented endpoints, ready
            to integrate into broader drug discovery workflows.
          </p>
          <div className='flex flex-wrap gap-2'>
            {[
              'GNNs',
              'PyTorch Geometric',
              'ADMET',
              'BBB Prediction',
              'SMOTE',
              'Kubernetes',
              'ChEMBL',
              'PubChem',
            ].map((t) => (
              <Badge key={t} variant='secondary'>
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Sept 2021–Apr 2025',
    content: (
      <div>
        <h3 className='text-lg md:text-2xl mb-1 text-teal-400 max-w-4xl font-bold'>
          <a
            href='https://egen.ai/'
            className='hover:text-teal-300 transition-colors'
          >
            Egen.ai
          </a>
        </h3>
        <p className='text-neutral-500 text-xs mb-6 font-normal'>
          Senior ML Engineer · Egen.ai
        </p>

        {/* Financial Risk ML */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Financial Risk & Pricing ML · DriveTime · Carvana
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Led development of production ML systems for{' '}
            <span className='text-white font-medium'>
              financial risk and pricing products
            </span>{' '}
            used by{' '}
            <a
              href='https://www.drivetime.com/'
              className='text-teal-400 underline underline-offset-2 hover:text-teal-300 transition-colors'
            >
              DriveTime
            </a>{' '}
            and Carvana — two of the largest used-car finance platforms in the
            US. These models directly influenced which loans get approved and at
            what rate, across hundreds of thousands of originations annually.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Built models that predict{' '}
            <span className='text-rose-400 font-medium'>
              loan pricing, credit risk, vehicle value over time, and
              likelihood of default
            </span>{' '}
            — achieving{' '}
            <span className='text-rose-400 font-semibold'>
              F1 scores close to 0.90
            </span>{' '}
            across use cases, validated through rigorous backtesting against
            historical loan performance.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Owned the full data pipeline — working closely with client teams on
            data quality, feature selection, and model validation. Also ran
            fairness and bias audits to ensure the models didn&apos;t
            discriminate in ways that would create regulatory exposure.
          </p>
          <div className='flex flex-wrap gap-2'>
            {[
              'Python',
              'XGBoost',
              'scikit-learn',
              'Feature Engineering',
              'Backtesting',
              'Fairness Auditing',
            ].map((t) => (
              <Badge key={t} variant='secondary'>
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Data Engineering */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Data Engineering · Warehousing & Lake Pipelines
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Built and maintained{' '}
            <span className='text-white font-medium'>
              batch data pipelines and analytics warehouses
            </span>{' '}
            that feed underwriting and pricing models — landing raw data in{' '}
            <span className='text-rose-400 font-medium'>Amazon S3</span>,
            orchestrating transforms with{' '}
            <span className='text-rose-400 font-medium'>AWS Glue</span> and{' '}
            <span className='text-rose-400 font-medium'>PySpark</span>, and
            delivering curated features and reporting layers in{' '}
            <span className='text-rose-400 font-medium'>Amazon Redshift</span>{' '}
            for analysts and model consumers.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Owned schema evolution, partition strategies, job monitoring, and
            cost-aware ETL so daily scoring and backtests stayed reliable as
            data volume grew across client fleets.
          </p>
          <div className='flex flex-wrap gap-2'>
            {[
              'AWS Glue',
              'PySpark',
              'Amazon Redshift',
              'Amazon S3',
              'ETL',
              'Data Modeling',
            ].map((t) => (
              <Badge key={t} variant='secondary'>
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Inference Platform */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            ML Inference Platform · Kubernetes · IaC
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Led the team to build a{' '}
            <span className='text-white font-medium'>
              scalable microservices inference platform
            </span>{' '}
            on AWS Kubernetes — packaged with{' '}
            <span className='text-rose-400 font-medium'>Helm</span> for
            repeatable releases and provisioned with{' '}
            <span className='text-rose-400 font-medium'>Terraform</span>{' '}
            (infrastructure as code). Full observability via the{' '}
            <span className='text-rose-400 font-medium'>ELK stack</span> —
            structured logging, latency dashboards, and auto-scaling to absorb
            burst inference across multiple model families.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Authored custom{' '}
            <span className='text-rose-400 font-medium'>Docker</span> images with{' '}
            <span className='text-rose-400 font-medium'>CUDA</span> support and
            GPU-aware runtimes so deep learning models serve with predictable
            performance in production.
          </p>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <Image
              src='/sub.png'
              alt='Inference platform dashboard'
              width={1400}
              height={500}
              className={imgClass}
            />
          </div>
          <div className='flex flex-wrap gap-2'>
            {[
              'Kubernetes',
              'Helm',
              'Terraform',
              'Docker',
              'CUDA',
              'ELK Stack',
              'AWS',
              'GPU Inference',
              'Auto-scaling',
            ].map((t) => (
              <Badge key={t} variant='secondary'>
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Team Leadership */}
        <div className='pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Team Leadership & ML Best Practices
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Managed and mentored a team of engineers, driving{' '}
            <span className='text-rose-400 font-medium'>MLOps</span> practices
            across data ingestion, experiment tracking, model training, and
            production deployment — standards for reproducibility, registry-backed
            model versioning, monitoring and drift checks, and staged rollout /
            canary releases that became the team&apos;s default workflow.
          </p>
          <div className='flex flex-wrap gap-2'>
            {[
              'MLOps',
              'Experiment Tracking',
              'Model Registry',
              'CI/CD (ML)',
              'Canary Releases',
              'Engineering Leadership',
            ].map((t) => (
              <Badge key={t} variant='secondary'>
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Dec 2019–Sept 2021',
    content: (
      <div>
        <h3 className='text-lg md:text-2xl mb-1 text-teal-400 max-w-4xl font-bold'>
          <a
            href='https://www.upgrad.com/'
            className='hover:text-teal-300 transition-colors'
          >
            upGrad
          </a>
        </h3>
        <p className='text-neutral-500 text-xs mb-6 font-normal'>
          Lead Software Engineer · upGrad
        </p>

        {/* LMS */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            LMS Rebuild · Full-Stack Platform{' '}
            <a
              href='https://medium.com/technology-at-upgrad/how-we-improved-user-experience-by-building-a-lite-version-of-learner-experience-ui-2df5ee521a5f'
              className='text-neutral-600 hover:text-teal-400 normal-case font-normal transition-colors'
              target='_blank'
              rel='noopener noreferrer'
            >
              [Case Study]
            </a>
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            <span className='text-rose-400 font-semibold'>
              75% improvement in Core Web Vitals
            </span>{' '}
            — led the rewrite of a large-scale{' '}
            <a
              href='https://learn.upgrad.com'
              className='text-teal-400 underline underline-offset-2 hover:text-teal-300 transition-colors'
            >
              Learning Management System
            </a>{' '}
            serving <span className='text-white font-medium'>3M+ active learners</span>,
            with a strong focus on PWA support, offline-first usage, and global
            responsiveness for low-bandwidth networks.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Architected the stack across{' '}
            <span className='text-rose-400 font-medium'>React + TypeScript</span>{' '}
            for learner UX,{' '}
            <span className='text-rose-400 font-medium'>Node.js and Golang</span>{' '}
            services for performance-critical APIs, and caching layers with{' '}
            <span className='text-rose-400 font-medium'>Redis</span>. API
            response times were pushed below{' '}
            <span className='text-white font-medium'>200ms</span> for core
            learner journeys.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Implemented edge-aware delivery and multi-geo cache strategy
            (regional CDN + Redis invalidation patterns), so content stayed
            fast and consistent across markets. Combined code splitting,
            prefetching, and fallback offline flows so learners could continue
            progress even with unstable connectivity.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Worked closely with product, design, and infrastructure teams on
            rollout, SLO tracking, incident response, and platform guardrails;
            mentored engineers through the migration and established performance
            standards that persisted after launch.
          </p>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <Image
              src='/lms.png'
              alt='upGrad LMS'
              width={1400}
              height={500}
              className={imgClass}
            />
          </div>
          <div className='flex flex-wrap gap-2'>
            {[
              'React',
              'TypeScript',
              'Node.js',
              'Golang',
              'PWA',
              'Offline-first',
              'Edge Caching',
              'Code Splitting',
              'CDN',
              'Redis',
              '<200ms APIs',
              'Performance Engineering',
            ].map((t) => (
              <Badge key={t} variant='secondary'>
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Test platform */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Assessments & Test Platform
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Revamped the{' '}
            <a
              href='https://tests.upgrad.com'
              className='text-teal-400 underline underline-offset-2 hover:text-teal-300 transition-colors'
            >
              online assessment and test platform
            </a>{' '}
            used for proctored exams and skills validation at scale. Rebuilt
            critical paths for faster item load, more stable delivery under
            spike traffic, and clearer observability for the ops team — with{' '}
            <span className='text-rose-400 font-semibold'>
              up to ~40% performance gains
            </span>{' '}
            on slow-device profiles in lab tests.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Same React / TypeScript / Node stack as the LMS program, extended to
            secure session handling, timer-critical UX, and coordination with
            backend teams on data consistency for grading pipelines.
          </p>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <Image
              src='/spinx.png'
              alt='upGrad test platform'
              width={1400}
              height={500}
              className={imgClass}
            />
          </div>
          <div className='flex flex-wrap gap-2'>
            {[
              'React',
              'TypeScript',
              'Node.js',
              'Load Optimization',
              'Observability',
            ].map((t) => (
              <Badge key={t} variant='secondary'>
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Shorts / ML */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            ML Product: &ldquo;Shorts&rdquo; — Micro-Learning Feed
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Engineered{' '}
            <span className='text-white font-medium'>
              upGrad Shorts
            </span>{' '}
            as a learning-science driven micro-learning product. Built the
            ranking and retention engine using the{' '}
            <span className='text-rose-400 font-medium'>SM2 spaced repetition algorithm</span>{' '}
            paired with a neural network classifier to predict optimal review
            intervals per learner, improving long-term knowledge retention.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Owned the end-to-end experience across personalization logic,
            experimentation loops, and React delivery surfaces for short-form
            lessons, balancing educational outcomes with feed engagement.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Partnered with Growth on{' '}
            <span className='text-white font-medium'>
              acquisition, retargeting, and cross-sell
            </span>{' '}
            — the feature drove a measurable lift in engagement and contributed
            roughly <span className='text-rose-400 font-medium'>15%</span>{' '}
            improvement across retargeting and cross-sales experiments tied to
            the short-form experience.
          </p>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <Image
              src='/masterclass.png'
              alt='upGrad Shorts micro-learning'
              width={1400}
              height={500}
              className={imgClass}
            />
          </div>
          <div className='flex flex-wrap gap-2'>
            {[
              'Python',
              'React',
              'SM2 Algorithm',
              'Learning Science ML',
              'FFNN',
              'Spaced Repetition',
              'Personalization',
              'Recommendation Systems',
            ].map((t) => (
              <Badge key={t} variant='secondary'>
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Dropout Prediction */}
        <div className='pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Student Dropout & Failure Prediction
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Built models that flag students at risk of failing or dropping out{' '}
            <span className='text-rose-400 font-medium'>months in advance</span>{' '}
            — before it&apos;s too late to intervene. Based on how often they
            logged in, how long they spent on content, attendance, and peer
            interaction patterns. Gave academic advisors an early warning system
            so they could reach out before outcomes became irreversible.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Production path: batch scoring jobs and lightweight service APIs so
            advisor dashboards stayed fresh without overloading OLTP systems —
            coordinated with data and security on retention policies for
            student data.
          </p>
          <div className='flex flex-wrap gap-2'>
            {[
              'Python',
              'scikit-learn',
              'Feature Engineering',
              'Behavioral Data',
              'Early Warning Systems',
              'Batch Scoring',
            ].map((t) => (
              <Badge key={t} variant='secondary'>
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Mar 2018–Dec 2019',
    content: (
      <div>
        <h3 className='text-lg md:text-2xl mb-1 text-teal-400 max-w-4xl font-bold'>
          <a
            href='https://www.advertising.yahooinc.com/our-dsp/native'
            className='hover:text-teal-300 transition-colors'
          >
            Yahoo!
          </a>
        </h3>
        <p className='text-neutral-500 text-xs mb-6 font-normal'>
          Software Engineer · Yahoo!
        </p>

        {/* Yahoo Ad.com */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Yahoo Ad.com — Self-Serve SMB Ad Platform
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Contributed to{' '}
            <span className='text-white font-medium'>Yahoo Ad.com</span>, a
            self-serve advertising platform enabling SMBs to create and manage
            ad campaigns across the Yahoo network with minimal setup friction.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Built{' '}
            <span className='text-rose-400 font-medium'>
              smart onboarding flows
            </span>{' '}
            — a small business just enters their website URL, name, and
            category, and the system automatically generates a ready-to-launch
            campaign. Measurably reduced the time for a new advertiser to get
            their first ad live.
          </p>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <Image
              src='/ad.png'
              alt='Yahoo Ad.com platform'
              width={1400}
              height={500}
              className={imgClass}
            />
            <Image
              src='/adapp.png'
              alt='Yahoo advertising mobile'
              width={1400}
              height={500}
              className={imgClass}
            />
          </div>
          <div className='flex flex-wrap gap-2'>
            {[
              'ML Onboarding',
              'Campaign Automation',
              'NLP',
              'Python',
            ].map((t) => (
              <Badge key={t} variant='secondary'>
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Knowledge Graph */}
        <div className='pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Business Knowledge Graph
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Built a{' '}
            <span className='text-white font-medium'>
              structured knowledge base about businesses
            </span>{' '}
            by automatically extracting information from company websites,
            metadata, and third-party sources — building a rich understanding
            of what each advertiser does, who their customers are, and what they
            want to achieve.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Used that knowledge to{' '}
            <span className='text-rose-400 font-medium'>
              pre-fill campaign setup automatically
            </span>{' '}
            — suggesting the right call-to-action, target audience, location
            targeting, and bid strategy — so new advertisers could launch a
            campaign in minutes instead of hours, measurably reducing drop-off
            during onboarding.
          </p>
          <div className='flex flex-wrap gap-2'>
            {[
              'Knowledge Graph',
              'Information Extraction',
              'Entity Resolution',
              'Audience Targeting',
              'Graph ML',
            ].map((t) => (
              <Badge key={t} variant='secondary'>
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: '2017',
    content: (
      <div>
        <h3 className='text-lg md:text-2xl mb-1 text-teal-400 max-w-4xl font-bold'>
          <a
            href='https://www.fulfil.io/'
            className='hover:text-teal-300 transition-colors'
          >
            Fulfil.io
          </a>
        </h3>
        <p className='text-neutral-500 text-xs mb-6 font-normal'>
          Engineering Intern · Fulfil.io
        </p>
        <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
          Built the CMS infrastructure for Fulfil&apos;s marketing team —
          enabling non-technical stakeholders to manage content, landing pages,
          and product documentation independently without engineering
          involvement.
        </p>
        <p className='text-neutral-400 text-xs md:text-sm font-normal mb-6'>
          Led a product-wide UI redesign, modernizing the visual language of the
          B2B ERP platform and improving consistency across core modules. First
          exposure to production engineering, shipping cadences, and real-user
          feedback loops at a venture-backed SaaS company.
        </p>
        <div className='grid grid-cols-2 gap-4'>
          <Image
            src='/fulfil.png'
            alt='Fulfil.io'
            width={1400}
            height={500}
            className={imgClass}
          />
        </div>
      </div>
    ),
  },
];
