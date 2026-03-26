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
import Image from 'next/image';
import { BrainCircuit, Database, FlaskConical, CloudCog } from 'lucide-react';

export default function Home() {
  const hello = ['Hi,', 'Hello,', 'Hallo,', 'Hola!', 'Bonjour,'];
  const roles = [
    'Senior AI/ML Engineer',
    'RAG & Agentic Systems',
    'GNN & Molecular ML',
    'Founder @ Superscaled',
    'Open to Consulting',
  ];

  return (
    <div className='min-h-[100vh] w-full dark:bg-black bg-white dark:bg-grid-white/[0.06] bg-grid-black/[0.2] relative'>
      <div className='absolute z-[-1] pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]' />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section id='hero' aria-label='Introduction'>
        <AuroraBackground className='min-h-screen'>
          <MeteorShower count={14} />
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
                Currently building production AI at{' '}
                <span className='text-rose-400 font-medium'>GATC Health</span> —
                architecting a hybrid RAG + agentic research platform that became the
                primary AI interface for scientific teams. I design systems at the
                intersection of LLMs, retrieval, and domain-specific ML: sparse–dense
                retrieval pipelines, LIGHT-style long-context memory, agentic tool
                orchestration, and GNNs for molecular property prediction. Also
                building{' '}
                <a href='https://superscaled.com' target='_blank' rel='noopener noreferrer' className='text-rose-400 font-medium hover:underline'>Superscaled</a>{' '}
                as a founder. Nine years of production engineering across Yahoo, upGrad,
                and Egen.ai underpin everything I ship.
              </p>

              <HeroStats />

              <div className='flex flex-wrap gap-3 px-2 mt-6'>
                <MagneticButton>
                  <a href='https://calendly.com/thearvindnarayan/15min' target='_blank' rel='noopener noreferrer'>
                    <button type='button' className='text-white bg-rose-800 hover:bg-red-700 ring-2 focus:outline-none ring-rose-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-b from-rose-600 to-rose-900 hover:from-rose-500 hover:to-purple-900 transition-all flex items-center gap-2'>
                      <i className='lni lni-google-meet'></i>
                      <span>Book a Call</span>
                    </button>
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a href='mailto:hi@arwwwind.com?subject=Hello%20Arvind%2C' target='_blank' rel='noopener noreferrer'>
                    <button type='button' className='text-white hover:text-rose-400 bg-neutral-800 hover:bg-neutral-900 ring-2 focus:outline-none ring-neutral-600 hover:ring-rose-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all flex items-center gap-2'>
                      <i className='lni lni-envelope'></i>
                      <span>Email Me</span>
                    </button>
                  </a>
                </MagneticButton>
              </div>

              <div className='flex gap-3 px-2 mt-3'>
                <a href='https://www.linkedin.com/in/arwwwind/' target='_blank' rel='noopener noreferrer'>
                  <Button variant='outline' size='sm' className='text-xs'><i className='lni lni-linkedin-original mr-1'></i>LinkedIn</Button>
                </a>
                <a href='https://github.com/arwwwind' target='_blank' rel='noopener noreferrer'>
                  <Button variant='outline' size='sm' className='text-xs'><i className='lni lni-github-original mr-1'></i>GitHub</Button>
                </a>
              </div>
            </div>

            {/* Right: Avatar */}
            <div className='order-1 md:order-2 flex justify-center'>
              <CardContainer>
                <CardItem translateZ='100' className='mt-4'>
                  <Image
                    className='inline-block h-[200px] w-auto md:h-[320px] rounded-full ring-[3px] ring-rose-600 shadow-[0_0_40px_rgba(225,29,72,0.3)]'
                    width={320} height={320} src='/avatar.png'
                    alt='Arvind Narayan — Senior AI/ML Engineer' priority
                  />
                </CardItem>
              </CardContainer>
            </div>
          </div>
        </AuroraBackground>
      </section>

      {/* ── What I Do ─────────────────────────────────────── */}
      <section id='what-i-do' aria-label='Capabilities' className='py-20 px-4 max-w-screen-xl mx-auto'>
        <div className='mb-2'>
          <span className='text-xs font-semibold tracking-widest text-rose-500 uppercase'>Capabilities</span>
        </div>
        <h2 className='text-3xl md:text-4xl font-bold text-white mb-2'>
          From molecules to language models.
        </h2>
        <p className='text-neutral-400 mb-10 text-sm md:text-base'>
          Deep-stack AI engineering — retrieval, reasoning, and domain-specific ML.
        </p>

        <BentoGrid>
          <BentoCard
            title='RAG & Agentic AI Systems'
            description='Designed hybrid sparse–dense retrieval pipelines (BM25 + dense embeddings, late fusion, cross-encoder reranking) and LIGHT-style multi-million-token memory subsystems. Built agentic tool orchestration so LLMs autonomously invoke specialized ML models and external databases (ChEMBL, PubChem) as callable actions.'
            icon={<BrainCircuit className='w-6 h-6' />}
            className='md:col-span-2'
            gradient='bg-gradient-to-br from-rose-950/50 to-transparent'
          />
          <BentoCard
            title='Molecular ML & GNNs'
            description='Trained GNN architectures for toxicity, ADMET, and blood-brain barrier permeability prediction (F1 ≈ 0.90, AUROC ≈ 0.92). End-to-end pipelines from ChEMBL/PubChem curation to Kubernetes-deployed inference APIs with GPU support.'
            icon={<FlaskConical className='w-6 h-6' />}
            className='md:row-span-2'
            gradient='bg-gradient-to-br from-violet-950/50 to-transparent'
          />
          <BentoCard
            title='Clinical & Research Analytics'
            description='Post-hoc analysis of a Phase 3 social anxiety trial — integrating longitudinal clinical outcomes, site operations, and speech features extracted from patient visits to uncover placebo response dynamics and habituation effects.'
            icon={<Database className='w-6 h-6' />}
            gradient='bg-gradient-to-br from-blue-950/50 to-transparent'
          />
          <BentoCard
            title='LLM Infrastructure & MLOps'
            description='Self-hosted Qwen 2.5 27B on AWS SageMaker via SGLang for high-throughput inference. Evaluation harnesses, fine-tuned instruct models for domain alignment, and modular architectures that support drop-in model upgrades.'
            icon={<CloudCog className='w-6 h-6' />}
            gradient='bg-gradient-to-br from-emerald-950/40 to-transparent'
          />
        </BentoGrid>
      </section>

      {/* ── Building ──────────────────────────────────────── */}
      <section id='building' aria-label='Ventures' className='py-12 px-4 max-w-screen-xl mx-auto border-t border-neutral-900'>
        <div className='mb-2'>
          <span className='text-xs font-semibold tracking-widest text-rose-500 uppercase'>Also Building</span>
        </div>
        <h2 className='text-3xl md:text-4xl font-bold text-white mb-3'>
          Superscaled
        </h2>
        <p className='text-neutral-400 text-sm mb-6 md:w-[60%]'>
          Founder-led product. Building in public at{' '}
          <a href='https://superscaled.com' target='_blank' rel='noopener noreferrer' className='text-rose-400 hover:underline'>superscaled.com</a>.
        </p>
        <a
          href='https://superscaled.com'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-rose-800/60 bg-rose-950/30 text-rose-400 text-sm font-medium hover:bg-rose-950/60 hover:border-rose-600 transition-all'
        >
          <span>Visit Superscaled</span>
          <span className='text-xs'>→</span>
        </a>
      </section>

      {/* ── Tech Stack ────────────────────────────────────── */}
      <section id='stack' aria-label='Technology stack' className='py-12 px-4 max-w-screen-xl mx-auto border-t border-neutral-900'>
        <h2 className='text-2xl font-bold mb-1'><GradientText>Tech Stack</GradientText></h2>
        <p className='text-neutral-500 text-sm mb-8'>Tools I use to build and ship.</p>
        <div className='flex flex-col gap-6'>
          {stackCategories.map((cat) => (
            <div key={cat.label}>
              <p className='text-xs font-semibold tracking-widest text-neutral-600 uppercase mb-3'>{cat.label}</p>
              <div className='flex flex-wrap gap-2'>
                {cat.items.map((item) =>
                  item.src ? (
                    <a key={item.name} href={item.href} target='_blank' rel='noopener noreferrer'
                      className='group flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-950 hover:bg-neutral-900 transition-all duration-200'>
                      <div style={{ backgroundImage: `url("${item.src}")` }}
                        className='w-4 h-4 bg-contain bg-center bg-no-repeat saturate-0 group-hover:saturate-100 transition-all duration-300' />
                      <span className='text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors'>{item.name}</span>
                    </a>
                  ) : (
                    <span key={item.name}
                      className='flex items-center px-3 py-2 rounded-lg border border-neutral-800 bg-neutral-950 text-xs text-neutral-500'>
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
      { name: 'Model Architecture Design', src: null, href: '#' },
      { name: 'Model Evaluation & Ablation', src: null, href: '#' },
      { name: 'SMOTE / Class Balancing', src: null, href: '#' },
      { name: 'MLOps', src: null, href: '#' },
    ],
  },
  {
    label: 'Retrieval & Vector DBs',
    items: [
      { name: 'BM25 / TF-IDF', src: null, href: '#' },
      { name: 'Dense Embeddings', src: null, href: '#' },
      { name: 'Cross-Encoder Reranking', src: null, href: '#' },
      { name: 'Pinecone', src: null, href: '#' },
      { name: 'pgvector', src: null, href: '#' },
      { name: 'Weaviate', src: null, href: '#' },
      { name: 'Chroma', src: null, href: '#' },
    ],
  },
  {
    label: 'Data Engineering',
    items: [
      { name: 'AWS', src: '/aws.png', href: 'https://aws.amazon.com/' },
      { name: 'AWS Glue', src: null, href: '#' },
      { name: 'PySpark', src: null, href: '#' },
      { name: 'Kubernetes', src: null, href: '#' },
      { name: 'PostgreSQL', src: '/pg.png', href: 'https://www.postgresql.org/' },
      { name: 'Redis', src: '/redis.svg', href: 'https://redis.io/' },
      { name: 'MongoDB', src: '/mongo.svg', href: 'https://www.mongodb.com/' },
      { name: 'SQS / Event Pipelines', src: null, href: '#' },
    ],
  },
  {
    label: 'Cloud & APIs',
    items: [
      { name: 'SageMaker', src: null, href: '#' },
      { name: 'FastAPI', src: null, href: '#' },
      { name: 'GraphQL', src: null, href: '#' },
      { name: 'Docker', src: null, href: '#' },
      { name: 'GPU Inference (K8s)', src: null, href: '#' },
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
        <h3 className='text-lg md:text-2xl mb-1 text-white max-w-4xl font-bold'>
          GATC Health
        </h3>
        <p className='text-neutral-500 text-xs mb-6 font-normal'>Senior AI/ML Engineer · Apr 2025 – Present</p>

        {/* Project 1 */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Hybrid RAG + Agentic Research Platform
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Architected and shipped a production-grade internal AI research platform —
            functioning as an{' '}
            <span className='text-white font-medium'>enterprise Perplexity for scientific teams</span>{' '}
            — that became the primary AI interface for lab workflows, significantly
            boosting researcher productivity and usage across the organization.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Designed a hybrid{' '}
            <span className='text-rose-400 font-medium'>sparse–dense retrieval pipeline</span>{' '}
            combining BM25/TF-IDF with dense embeddings, late fusion, and
            cross-encoder reranking to achieve high recall on scientific literature
            across large chemical and biological corpora.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Built a{' '}
            <span className='text-rose-400 font-medium'>LIGHT-style memory subsystem</span>{' '}
            that scales to millions of tokens of conversational history using episodic
            retrieval, structured working memory, and a compressed scratchpad —
            enabling persistent, context-aware interactions across long multi-session
            research workflows.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Developed domain-specific agentic tools: toxicity lookup, molecular
            property prediction, structure normalization, and external database
            connectors (ChEMBL, PubChem) — allowing the LLM to autonomously invoke
            specialized ML models and data sources as callable tool actions.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Self-hosted{' '}
            <span className='text-rose-400 font-medium'>Qwen 2.5 27B on AWS SageMaker</span>{' '}
            using SGLang for high-throughput, low-latency inference. Modular
            architecture supports drop-in upgrades to larger or newer models.
            Implemented evaluation harnesses and fine-tuned instruct models for
            domain-specific alignment.
          </p>
          <div className='flex flex-wrap gap-2'>
            {['RAG', 'BM25', 'Dense Embeddings', 'Reranking', 'Agentic AI', 'LangGraph', 'Qwen 2.5', 'SGLang', 'SageMaker', 'LIGHT Memory'].map(t => (
              <Badge key={t} variant='secondary'>{t}</Badge>
            ))}
          </div>
        </div>

        {/* Project 2 */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            PAL-3 Post-Hoc Clinical Analytics · VistaGen Therapeutics
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Investigated a{' '}
            <span className='text-white font-medium'>failed Phase 3 social anxiety trial</span>{' '}
            (negative primary endpoint) by integrating longitudinal clinical outcomes,
            site operations data, enrollment timing, and turn-level speech features
            extracted from recorded patient visits.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Discovered that subject{' '}
            <span className='text-rose-400 font-medium'>speech dynamics during treatment visits</span>{' '}
            — conversation share, utterance length, total talk time — carried a
            consistent, leakage-aware predictive signal for placebo response.
            Developed a habituation hypothesis explaining unexpected placebo
            performance.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Explored recruitment channel effects, site-level calendar drift,
            psychometric symptom structure, and clinician vs. patient vocal dynamics
            as outcome moderators — providing actionable recommendations for future
            trial design.
          </p>
          <div className='flex flex-wrap gap-2'>
            {['Clinical NLP', 'Speech Features', 'Longitudinal Analysis', 'Placebo Modeling', 'Python', 'Pandas'].map(t => (
              <Badge key={t} variant='secondary'>{t}</Badge>
            ))}
          </div>
        </div>

        {/* Project 3 */}
        <div className='pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Graph Neural Networks for Molecular Property Prediction
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Designed and trained GNN architectures for toxicity, ADMET, and
            blood-brain barrier (BBB) permeability prediction — selecting GNNs over
            tree-based baselines to capture molecular graph topology and atom-level
            features.{' '}
            <span className='text-rose-400 font-semibold'>F1 ≈ 0.90 · AUROC ≈ 0.92.</span>
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Led end-to-end data curation from ChEMBL and PubChem: cleaning pipelines,
            deduplication, class-imbalance handling (SMOTE, weighted loss), and
            PCA-based exploratory analysis.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Built scalable Python inference services deployed on{' '}
            <span className='text-rose-400 font-medium'>Kubernetes with GPU support</span>,
            enabling low-latency internal consumption via well-documented APIs.
          </p>
          <div className='flex flex-wrap gap-2'>
            {['GNNs', 'PyTorch Geometric', 'ADMET', 'BBB Prediction', 'SMOTE', 'Kubernetes', 'ChEMBL', 'PubChem'].map(t => (
              <Badge key={t} variant='secondary'>{t}</Badge>
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
        <h3 className='text-lg md:text-2xl mb-1 text-white max-w-4xl font-bold'>
          <a href='https://egen.ai/' className='hover:text-rose-400 transition-colors'>Egen.ai</a>
        </h3>
        <p className='text-neutral-500 text-xs mb-6 font-normal'>Senior ML Engineer · Sept 2021 – Apr 2025</p>

        {/* Financial Risk ML */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Financial Risk & Pricing ML · DriveTime · Carvana
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Led development of production ML systems for{' '}
            <span className='text-white font-medium'>financial risk and pricing products</span>{' '}
            used by enterprise customers including{' '}
            <a href='https://www.drivetime.com/' className='text-rose-400 hover:underline'>DriveTime</a>{' '}
            and Carvana — directly impacting underwriting decisions at scale across
            hundreds of thousands of auto loan applications.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Designed, trained, and deployed predictive models for{' '}
            <span className='text-rose-400 font-medium'>risk-adjusted APR, underwriting, LTV, depreciation curves, and delinquency prediction</span>{' '}
            — achieving{' '}
            <span className='text-rose-400 font-semibold'>F1 scores close to 0.90</span>{' '}
            across multiple use cases with rigorous backtesting and holdout validation.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Owned customer data pipelines and feature engineering workflows,
            partnering closely with client data teams on EDA, labeling strategy,
            feature importance analysis, and model validation — including fairness
            and bias audits for regulatory alignment.
          </p>
          <div className='flex flex-wrap gap-2'>
            {['Python', 'XGBoost', 'scikit-learn', 'Feature Engineering', 'Backtesting', 'Fairness Auditing'].map(t => (
              <Badge key={t} variant='secondary'>{t}</Badge>
            ))}
          </div>
        </div>

        {/* Inference Platform */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            ML Inference Platform · AWS Kubernetes
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Led the team to build a{' '}
            <span className='text-white font-medium'>scalable microservices inference platform</span>{' '}
            on AWS Kubernetes with full observability — ELK stack, structured logging,
            latency monitoring, and auto-scaling to handle burst inference workloads
            across multiple model families simultaneously.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Authored custom Docker images with{' '}
            <span className='text-rose-400 font-medium'>CUDA toolkit support</span>{' '}
            and container runtime integration for GPU inference, enabling
            hardware-accelerated model serving for deep learning workloads with
            consistent performance across environments.
          </p>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <Image src='/sub.png' alt='Inference platform dashboard' width={1400} height={500} className={imgClass} />
          </div>
          <div className='flex flex-wrap gap-2'>
            {['Kubernetes', 'Docker', 'CUDA', 'ELK Stack', 'AWS', 'GPU Inference', 'Auto-scaling'].map(t => (
              <Badge key={t} variant='secondary'>{t}</Badge>
            ))}
          </div>
        </div>

        {/* Team Leadership */}
        <div className='pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Team Leadership & ML Best Practices
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Managed and mentored a team of engineers, driving ML best practices
            across data ingestion, experiment tracking, model training, and
            production deployment — establishing standards for reproducibility,
            model versioning, and staged rollout that became the team&apos;s
            default workflow.
          </p>
          <div className='flex flex-wrap gap-2'>
            {['MLOps', 'Experiment Tracking', 'Model Versioning', 'Engineering Leadership'].map(t => (
              <Badge key={t} variant='secondary'>{t}</Badge>
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
        <h3 className='text-lg md:text-2xl mb-1 text-white max-w-4xl font-bold'>
          <a href='https://www.upgrad.com/' className='hover:text-rose-400 transition-colors'>upGrad</a>
        </h3>
        <p className='text-neutral-500 text-xs mb-6 font-normal'>Lead Software Engineer · Dec 2019 – Sept 2021</p>

        {/* LMS */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            LMS Rebuild{' '}
            <a href='https://medium.com/technology-at-upgrad/how-we-improved-user-experience-by-building-a-lite-version-of-learner-experience-ui-2df5ee521a5f'
              className='text-neutral-600 hover:text-rose-400 normal-case font-normal'
              target='_blank' rel='noopener noreferrer'>[Case Study]</a>
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Led the full-stack rebuild of a large-scale{' '}
            <a href='https://learn.upgrad.com' className='text-rose-400 hover:underline'>Learning Management System</a>{' '}
            serving millions of users — achieving approximately{' '}
            <span className='text-rose-400 font-semibold'>75% improvement</span>{' '}
            in frontend performance scores through architecture optimization, code
            splitting, and caching strategies tailored to 2G mobile demographics
            across India.
          </p>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <Image src='/lms.png' alt='upGrad LMS' width={1400} height={500} className={imgClass} />
          </div>
          <div className='flex flex-wrap gap-2'>
            {['React', 'Node.js', 'Code Splitting', 'CDN', 'Redis', 'Performance Engineering'].map(t => (
              <Badge key={t} variant='secondary'>{t}</Badge>
            ))}
          </div>
        </div>

        {/* Shorts / ML */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            ML Product: &ldquo;Shorts&rdquo; — Micro-Learning Feed
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Conceived and built an{' '}
            <span className='text-white font-medium'>ML-powered micro-learning product</span>{' '}
            — a TikTok-style short-form feed — end-to-end. Implemented the{' '}
            <span className='text-rose-400 font-medium'>SM-2 (SuperMemo-2) spaced-repetition algorithm</span>{' '}
            enhanced with a Feed-Forward Neural Network to personalize content
            sequencing and retention scheduling per user, adapting review intervals
            based on individual performance signals.
          </p>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <Image src='/masterclass.png' alt='upGrad Shorts micro-learning' width={1400} height={500} className={imgClass} />
          </div>
          <div className='flex flex-wrap gap-2'>
            {['Python', 'FFNN', 'Spaced Repetition', 'Personalization', 'Recommendation Systems'].map(t => (
              <Badge key={t} variant='secondary'>{t}</Badge>
            ))}
          </div>
        </div>

        {/* Dropout Prediction */}
        <div className='pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Student Dropout & Failure Prediction
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Developed predictive models that flag students likely to fail or drop
            out{' '}
            <span className='text-rose-400 font-medium'>months in advance</span>{' '}
            — based on engagement patterns, attendance data, and social interaction
            signals — enabling proactive intervention by academic advisors before
            outcomes became irreversible. Worked cross-functionally with product,
            design, and analytics teams to integrate model outputs into actionable
            UX decisions.
          </p>
          <div className='flex flex-wrap gap-2'>
            {['Python', 'scikit-learn', 'Feature Engineering', 'Behavioral Data', 'Early Warning Systems'].map(t => (
              <Badge key={t} variant='secondary'>{t}</Badge>
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
        <h3 className='text-lg md:text-2xl mb-1 text-white max-w-4xl font-bold'>
          <a href='https://www.advertising.yahooinc.com/our-dsp/native' className='hover:text-rose-400 transition-colors'>Yahoo!</a>
        </h3>
        <p className='text-neutral-500 text-xs mb-6 font-normal'>Software Engineer · Mar 2018 – Dec 2019</p>

        {/* Yahoo Ad.com */}
        <div className='mb-8 pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Yahoo Ad.com — Self-Serve SMB Ad Platform
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Contributed to{' '}
            <span className='text-white font-medium'>Yahoo Ad.com</span>, a
            self-serve advertising platform enabling small and medium businesses to
            create and manage ad campaigns across the Yahoo network with minimal
            setup friction.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Built{' '}
            <span className='text-rose-400 font-medium'>ML-assisted onboarding flows</span>{' '}
            that used basic business inputs — website URL, name, category — to
            auto-generate initial campaign configurations, measurably reducing
            time-to-first-campaign for new advertisers.
          </p>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <Image src='/ad.png' alt='Yahoo Ad.com platform' width={1400} height={500} className={imgClass} />
            <Image src='/adapp.png' alt='Yahoo advertising mobile' width={1400} height={500} className={imgClass} />
          </div>
          <div className='flex flex-wrap gap-2'>
            {['ML Onboarding', 'Campaign Automation', 'NLP', 'Python'].map(t => (
              <Badge key={t} variant='secondary'>{t}</Badge>
            ))}
          </div>
        </div>

        {/* Knowledge Graph */}
        <div className='pl-4 border-l border-neutral-800'>
          <p className='text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3'>
            Business Knowledge Graph
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
            Built and maintained a{' '}
            <span className='text-white font-medium'>business knowledge graph</span>{' '}
            by extracting structured signals from business websites, metadata, and
            third-party sources — enabling semantic understanding of advertiser
            intent and business context at scale.
          </p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal mb-4'>
            Leveraged the graph to{' '}
            <span className='text-rose-400 font-medium'>auto-select campaign parameters</span>{' '}
            including CTA, target audience segments, geo-targeting, and bidding
            strategy — measurably reducing onboarding friction and improving
            activation rates for first-time advertisers.
          </p>
          <div className='flex flex-wrap gap-2'>
            {['Knowledge Graph', 'Information Extraction', 'Entity Resolution', 'Audience Targeting', 'Graph ML'].map(t => (
              <Badge key={t} variant='secondary'>{t}</Badge>
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
        <h3 className='text-lg md:text-2xl mb-1 text-white max-w-4xl font-bold'>
          <a href='https://www.fulfil.io/' className='hover:text-rose-400 transition-colors'>Fulfil.io</a>
        </h3>
        <p className='text-neutral-500 text-xs mb-6 font-normal'>Engineering Intern · 2017</p>
        <p className='text-neutral-400 text-xs md:text-sm font-normal mb-3'>
          Built the CMS infrastructure for Fulfil&apos;s marketing team —
          enabling non-technical stakeholders to manage content, landing pages,
          and product documentation independently without engineering involvement.
        </p>
        <p className='text-neutral-400 text-xs md:text-sm font-normal mb-6'>
          Led a product-wide UI redesign, modernizing the visual language of the
          B2B ERP platform and improving consistency across core modules.
          First exposure to production engineering, shipping cadences, and
          real-user feedback loops at a venture-backed SaaS company.
        </p>
        <div className='grid grid-cols-2 gap-4'>
          <Image src='/fulfil.png' alt='Fulfil.io' width={1400} height={500} className={imgClass} />
        </div>
      </div>
    ),
  },
];
