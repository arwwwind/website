import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SectionGridBackground } from '@/components/ui/section-grid-background';

export const metadata: Metadata = {
  title: 'Yuni — Case Study | Arvind Narayan',
  description:
    'How I built Yuni — a private multimodal AI platform for creatives to train custom models on their own data, generate in their own voice, and own their intellectual property.',
  openGraph: {
    title: 'Yuni — Private Multimodal AI for Creatives',
    description:
      'Case study: custom model fine-tuning, privacy-first AI, and collaborative creative workspaces.',
    url: 'https://arwwwind.com/work/yuni',
  },
};

const stack = [
  'Python', 'FastAPI', 'Stable Diffusion XL', 'LoRA Fine-Tuning', 'DreamBooth',
  'Hugging Face Diffusers', 'CLIP', 'PyTorch', 'AWS S3', 'Celery + Redis',
  'Next.js', 'TypeScript', 'tRPC', 'PostgreSQL',
];

export default function YuniPage() {
  return (
    <div className='min-h-screen bg-black'>
      <SectionGridBackground>
        <div className='max-w-screen-lg mx-auto px-4 py-24'>

          <Link
            href='/work'
            className='inline-flex items-center gap-2 text-neutral-500 hover:text-rose-400 text-sm transition-colors mb-12'
          >
            ← All Work
          </Link>

          <div className='mb-10'>
            <span className='text-xs font-semibold tracking-widest text-rose-400 uppercase'>
              Multimodal AI · Creative Tools · Privacy · Fine-Tuning
            </span>
            <h1 className='text-4xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight'>
              Yuni
            </h1>
            <p className='text-xl text-neutral-300 mb-6 md:w-[75%] leading-relaxed'>
              A private AI platform that lets creatives, brands, and studios train models on their
              own work — building a personalized AI that generates in their voice, not the internet&apos;s.
              Your model, your outputs, your IP.
            </p>
            <div className='flex flex-wrap gap-4 text-sm text-neutral-500 mb-6'>
              <span><span className='text-neutral-300 font-medium'>Client:</span> Yuni</span>
              <span><span className='text-neutral-300 font-medium'>Role:</span> AI Platform Engineer</span>
              <span><span className='text-neutral-300 font-medium'>Year:</span> 2024</span>
              <span>
                <a
                  href='https://hiyuni.co'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-rose-400 hover:text-rose-300 transition-colors'
                >
                  hiyuni.co ↗
                </a>
              </span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {['Multimodal AI', 'Fine-Tuning', 'LoRA', 'Creative Tools', 'Privacy-First', 'Generative AI'].map((t) => (
                <Badge key={t} variant='outline' className='border-rose-800/50 text-rose-400 text-xs'>
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Screenshot showcase */}
          <div className='w-full rounded-xl overflow-hidden border border-neutral-800 mb-16 grid grid-cols-1 md:grid-cols-2 gap-2'>
            {[
              { src: '/Yuni_Desktop_Discover_Creations.png', alt: 'Discover creations' },
              { src: '/Yuni_Desktop_Profile_Member_View_Canvas.png', alt: 'Member canvas view' },
            ].map((img, i) => (
              <div key={i} className='aspect-video bg-black relative overflow-hidden'>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
              </div>
            ))}
          </div>

          <div className='space-y-16'>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-rose-500' />
                The Problem
              </h2>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                The generative AI boom created a paradox for professional creatives. The tools are
                astonishingly powerful — but they&apos;re trained on everyone&apos;s work, stylistically
                generic by design, and legally ambiguous. A fashion photographer who uses Midjourney
                gets results that look vaguely like every fashion photographer on the internet, not
                like their specific visual language built over a decade.
              </p>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                More critically: when a creative uploads their work to a commercial AI platform, they
                typically grant a license for that work to be used in future model training. For a
                brand or agency with proprietary visual assets, that&apos;s an IP exposure risk they
                can&apos;t accept.
              </p>
              <p className='text-neutral-400 leading-relaxed'>
                Yuni&apos;s premise: creatives should own the model trained on their work, generate
                exclusively in their aesthetic, and retain full IP over every output. The platform
                provides the infrastructure for private fine-tuning and inference — you bring the
                training data, Yuni provides the compute and the workflow.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-rose-500' />
                Platform Architecture
              </h2>
              <div className='space-y-6'>
                {[
                  {
                    title: 'Custom Model Training Pipeline',
                    body: `Users upload a training set — typically 20–100 images for style fine-tuning, or structured text samples for voice/copy fine-tuning. The pipeline runs LoRA (Low-Rank Adaptation) fine-tuning on Stable Diffusion XL with DreamBooth-style subject binding for brand-specific assets.

Training is fully tenant-isolated: model weights are stored in a private S3 prefix scoped to the user's account, never shared across tenants, and optionally encrypted with user-managed keys. The full training run typically completes in 15–45 minutes on an A100 instance, managed by a Celery task queue with progress webhooks to the frontend.`,
                  },
                  {
                    title: 'Multimodal Creative Canvas',
                    body: `The generation interface is a canvas-based workspace, not a prompt box. Users can layer: text prompts, style references (pulled from their trained model or uploaded references), composition sketches (rough bounding boxes that constrain layout), and negative prompts. The canvas supports iterative refinement — take a generated image, select a region, and regenerate just that area with a local prompt.

For text/copy generation, the canvas supports "voice stitching" — generating new content that blends the user's fine-tuned style model with a specific tone instruction (formal, playful, urgent). This is particularly valuable for brand teams maintaining consistency across large content volumes.`,
                  },
                  {
                    title: 'Collaborative Workspaces',
                    body: `Studio teams need to iterate together. Yuni's workspace model supports real-time collaboration via a CRDT-based state sync — multiple users can view, comment on, and fork generations in a shared board. Access controls are granular: a brand can invite a freelancer to a specific campaign workspace with view-and-comment permissions while keeping their base model private.

Generated assets carry embedded provenance metadata — model ID, timestamp, prompt hash — so teams can reconstruct how any asset was generated even months later.`,
                  },
                  {
                    title: 'Privacy Guarantees by Architecture',
                    body: `Unlike public AI tools, Yuni's training jobs run in isolated compute environments with no persistent logging of training data beyond the user's own storage. Fine-tuned model weights are never used to update the base model. Inference runs against the user's private weights, not shared infrastructure. This lets enterprise customers satisfy their legal and compliance teams' requirements around third-party AI tools.`,
                  },
                ].map((item) => (
                  <div key={item.title} className='bg-neutral-950 border border-neutral-800 rounded-xl p-6'>
                    <h3 className='text-rose-400 font-semibold mb-3'>{item.title}</h3>
                    <p className='text-neutral-400 text-sm leading-relaxed whitespace-pre-line'>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-rose-500' />
                Key Engineering Challenges
              </h2>
              <div className='grid md:grid-cols-2 gap-4'>
                {[
                  {
                    title: 'Training stability at small dataset sizes',
                    body: '20–100 images is a tiny training set for fine-tuning. We tuned LoRA rank (r=16 to r=64), learning rate schedules, and regularization to prevent overfitting to the training images while preserving generalization capability. Automatic early stopping based on FID/CLIP score on a held-out validation set.',
                  },
                  {
                    title: 'Prompt-to-style coherence',
                    body: 'Fine-tuned models drift when users combine strong style embeddings with complex compositional prompts. We built a prompt strength calibration step that automatically adjusts the style weight in the conditioning stack to prevent the fine-tuned aesthetic from overwhelming the intended composition.',
                  },
                  {
                    title: 'Cost-efficient inference',
                    body: 'Private model weights mean we can\'t share inference infrastructure across tenants. We implemented model caching — keeping recently-used fine-tuned models hot in GPU VRAM with an LRU eviction policy — to amortize the per-inference cold start cost across a session.',
                  },
                  {
                    title: 'Asset provenance at scale',
                    body: 'Each generated image is embedded with a C2PA-compliant content credential: model ID, generation parameters, timestamp. This invisible metadata chain survives re-saves and supports auditability for brand compliance — you can always prove an asset was AI-generated and trace it to its source model.',
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
                <span className='w-8 h-px bg-rose-500' />
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
            <Link href='/work/tickerlens' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              ← TickerLens
            </Link>
            <Link href='/work/subclarity' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              Next: Subclarity →
            </Link>
          </div>
        </div>
      </SectionGridBackground>
    </div>
  );
}
