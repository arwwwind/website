'use client';

/**
 * Beat the Bot — in-browser Rock-Paper-Scissors vs a tiny TF.js network
 * that trains live on the visitor's session. No backend, no persistence.
 *
 * Lazy: IntersectionObserver mounts the game only when scrolled into view;
 * TF.js is dynamically imported so it never hits the SSR path or LCP budget.
 */

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AsciiFigure } from '@/components/ui/ascii-figure';
import { cn } from '@/lib/utils';

/* ── Types & constants ───────────────────────────────────────────── */

type Move = 0 | 1 | 2; // Rock | Paper | Scissors
type Outcome = 'win' | 'loss' | 'tie';
type TfModule = typeof import('@tensorflow/tfjs');
type Sequential = import('@tensorflow/tfjs').Sequential;

const MOVE_LABELS = ['Rock', 'Paper', 'Scissors'] as const;
const MOVE_SHORT = ['R', 'P', 'S'] as const;
/** Rounds before the model replaces a random bot move (cold start). */
const WARMUP_ROUNDS = 6;
const HISTORY_LEN = 5;
const TRAIN_EPOCHS = 30;
const CLASSES = 3;

const PIPELINE_LINES = [
  'moves[-5:] --> one-hot(15) --> dense(8, relu) --> dense(3, softmax) --> argmax --> counter-move',
  '                                     ^                                              |',
  "                                     '------- fit(full history, 30 epochs) <--------'",
];

const HOW_IT_WORKS_MD = `## How Beat the Bot works

A tiny dense network trains **live in your browser** for the duration of this session. No server, no cookies, no saved weights — refresh and it starts over.

### The game loop

1. You throw Rock, Paper, or Scissors.
2. Before revealing, the bot encodes your **last 5 throws** as a length-15 one-hot vector (\`5 × 3\` classes). Early rounds are zero-padded.
3. A two-layer net predicts which class you are about to play.
4. The bot plays the **direct counter** to that prediction (Rock→Paper, Paper→Scissors, Scissors→Rock).
5. After the round resolves, the bot **retrains on the full session history** (\`epochs: 30\`, batch = all sliding windows) — not a single sample. Training runs in the background so the UI never blocks.

### Architecture

\`\`\`
moves[-5:] → one-hot(15) → dense(8, relu) → dense(3, softmax) → argmax → counter
                 ^                                                    |
                 '------- fit(full history, 30 epochs) <--------------'
\`\`\`

- **Optimizer:** Adam
- **Loss:** categorical cross-entropy
- **Library:** TensorFlow.js (\`@tensorflow/tfjs\`), loaded only when this section scrolls into view

### Why the bot gets better

A single gradient step on one example barely moves a randomly-initialized net. Retraining on every \`(window → next move)\` pair each round gives the model enough signal to overfit to *your* habits within a few dozen throws.

Cold-start rounds (before enough history) use a random bot throw so the demo stays fair while the feature window fills.

### What this is demonstrating

Online learning, feature encoding for sequential decisions, lazy client-side ML bundling, and a production-minded UI around a toy model — the same judgment used on larger systems, scaled down so you can play it.`;

/* ── Helpers ─────────────────────────────────────────────────────── */

function oneHotMove(move: Move): number[] {
  const v = [0, 0, 0];
  v[move] = 1;
  return v;
}

/** Last 5 moves → length-15 vector; pad left with zeros if short. */
function encodeHistory(history: Move[]): number[] {
  const slice = history.slice(-HISTORY_LEN);
  const pad = HISTORY_LEN - slice.length;
  const out: number[] = [];
  for (let i = 0; i < pad; i++) out.push(0, 0, 0);
  for (const m of slice) out.push(...oneHotMove(m));
  return out;
}

/**
 * Retrain on every sliding (window → next move) pair in the session.
 * Single-sample online fit barely moves a cold net; a full retrain each
 * round is still milliseconds at session scale.
 */
async function trainOnHistory(
  tf: TfModule,
  model: Sequential,
  history: Move[]
): Promise<void> {
  if (history.length <= HISTORY_LEN) return;

  const xs: number[][] = [];
  const ys: number[][] = [];
  for (let i = HISTORY_LEN; i < history.length; i++) {
    xs.push(encodeHistory(history.slice(i - HISTORY_LEN, i)));
    ys.push(oneHotMove(history[i]));
  }

  const x = tf.tensor2d(xs);
  const y = tf.tensor2d(ys);
  try {
    await model.fit(x, y, {
      epochs: TRAIN_EPOCHS,
      batchSize: xs.length,
      shuffle: true,
      verbose: 0,
    });
  } finally {
    x.dispose();
    y.dispose();
  }
}

function counterMove(predicted: Move): Move {
  return ((predicted + 1) % CLASSES) as Move;
}

function resolveRound(human: Move, bot: Move): Outcome {
  if (human === bot) return 'tie';
  if (counterMove(human) === bot) return 'loss'; // bot played the counter → human loses
  return 'win';
}

function randomMove(): Move {
  return (Math.floor(Math.random() * CLASSES) as Move);
}

/* ── Minimal markdown → React (no extra deps) ────────────────────── */

function inlineMd(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(text.slice(last, m.index));
    }
    const token = m[0];
    if (token.startsWith('**')) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className='text-neutral-200 font-medium'>
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      nodes.push(
        <code
          key={`${keyPrefix}-c-${i}`}
          className='rounded px-1 py-0.5 bg-neutral-900 text-teal-400/90 text-[11px]'
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    last = m.index + token.length;
    i += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function MarkdownBody({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\n+/);
  const out: ReactNode[] = [];

  for (let bi = 0; bi < blocks.length; bi++) {
    const block = blocks[bi];
    const lines = block.split('\n');

    if (lines[0].startsWith('```')) {
      const codeLines = lines.slice(1).filter((l) => !l.startsWith('```'));
      out.push(
        <pre
          key={`code-${bi}`}
          className='my-3 overflow-x-auto rounded-lg border border-neutral-800/80 bg-neutral-900/60 px-3 py-2.5 text-[10px] md:text-[11px] leading-[1.65] text-neutral-400 whitespace-pre'
          style={{
            fontFamily:
              'var(--font-plex-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontVariantLigatures: 'none',
          }}
        >
          {codeLines.join('\n')}
        </pre>
      );
      continue;
    }

    if (lines[0].startsWith('### ')) {
      out.push(
        <h3
          key={`h3-${bi}`}
          className='mt-5 mb-2 text-xs font-semibold tracking-widest text-teal-400 uppercase'
        >
          {lines[0].slice(4)}
        </h3>
      );
      const rest = lines.slice(1).join('\n').trim();
      if (rest) {
        out.push(
          <p key={`h3p-${bi}`} className='text-sm text-neutral-400 leading-relaxed mb-2'>
            {inlineMd(rest, `h3p-${bi}`)}
          </p>
        );
      }
      continue;
    }

    if (lines[0].startsWith('## ')) {
      out.push(
        <h2 key={`h2-${bi}`} className='text-lg md:text-xl font-bold text-white mb-3'>
          {lines[0].slice(3)}
        </h2>
      );
      const rest = lines.slice(1).join('\n').trim();
      if (rest) {
        out.push(
          <p key={`h2p-${bi}`} className='text-sm text-neutral-400 leading-relaxed mb-2'>
            {inlineMd(rest, `h2p-${bi}`)}
          </p>
        );
      }
      continue;
    }

    if (lines.every((l) => /^\d+\.\s/.test(l) || l.trim() === '')) {
      out.push(
        <ol
          key={`ol-${bi}`}
          className='mb-3 list-decimal space-y-2 pl-5 text-sm text-neutral-400 leading-relaxed'
        >
          {lines
            .filter((l) => l.trim())
            .map((l, li) => (
              <li key={li}>{inlineMd(l.replace(/^\d+\.\s/, ''), `ol-${bi}-${li}`)}</li>
            ))}
        </ol>
      );
      continue;
    }

    if (lines.every((l) => /^[-*]\s/.test(l) || l.trim() === '')) {
      out.push(
        <ul
          key={`ul-${bi}`}
          className='mb-3 list-disc space-y-1.5 pl-5 text-sm text-neutral-400 leading-relaxed'
        >
          {lines
            .filter((l) => l.trim())
            .map((l, li) => (
              <li key={li}>{inlineMd(l.replace(/^[-*]\s/, ''), `ul-${bi}-${li}`)}</li>
            ))}
        </ul>
      );
      continue;
    }

    out.push(
      <p key={`p-${bi}`} className='mb-3 text-sm text-neutral-400 leading-relaxed'>
        {inlineMd(lines.join(' '), `p-${bi}`)}
      </p>
    );
  }

  return <div className='markdown-body'>{out}</div>;
}

/* ── How-it-works modal ──────────────────────────────────────────── */

function HowItWorksModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className='fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6'
      role='dialog'
      aria-modal='true'
      aria-labelledby={titleId}
    >
      <button
        type='button'
        className='absolute inset-0 bg-black/70 backdrop-blur-sm'
        aria-label='Close dialog'
        onClick={onClose}
      />
      <div className='relative z-10 w-full sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-neutral-800 bg-neutral-950 p-6 md:p-8 shadow-2xl'>
        <div className='flex items-start justify-between gap-4 mb-1'>
          <span id={titleId} className='sr-only'>
            How Beat the Bot works
          </span>
          <button
            type='button'
            onClick={onClose}
            className='ml-auto text-neutral-500 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase'
          >
            Close Esc
          </button>
        </div>
        <MarkdownBody source={HOW_IT_WORKS_MD} />
      </div>
    </div>
  );
}

/* ── Floating orb CTA ────────────────────────────────────────────── */

function FloatingOrbButton({
  onOpenHelp,
}: {
  onOpenHelp: () => void;
}) {
  return (
    <div className='fixed bottom-5 left-5 z-[60] flex flex-col items-center gap-1.5'>
      <button
        type='button'
        onClick={() => {
          const el = document.getElementById('beat-the-bot');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          onOpenHelp();
        }}
        aria-label='Scroll to Beat the Bot'
        title='Beat the Bot — scroll to play'
        className='group relative h-14 w-14 rounded-full overflow-hidden border border-white/10 bg-black shadow-[0_0_24px_rgba(232,121,249,0.35),0_0_48px_rgba(99,102,241,0.2)] transition-transform duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60'
      >
        <span
          aria-hidden='true'
          className='pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-br from-fuchsia-400/30 via-violet-500/20 to-amber-300/20 blur-md opacity-80 group-hover:opacity-100 transition-opacity'
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='/beat-the-bot-orb.gif'
          alt=''
          width={56}
          height={56}
          className='relative h-full w-full object-cover scale-110'
          draggable={false}
        />
      </button>
      <button
        type='button'
        onClick={onOpenHelp}
        className='text-[9px] font-mono tracking-wider text-neutral-500 hover:text-teal-400 transition-colors uppercase max-w-[4.5rem] text-center leading-tight'
      >
        *
      </button>
    </div>
  );
}

/* ── Game core (TF.js only after mount) ──────────────────────────── */

function BeatTheBotGame({ onOpenHelp }: { onOpenHelp: () => void }) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<Move[]>([]);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [ties, setTies] = useState(0);
  const [lastHuman, setLastHuman] = useState<Move | null>(null);
  const [lastBot, setLastBot] = useState<Move | null>(null);
  const [lastOutcome, setLastOutcome] = useState<Outcome | null>(null);
  const [status, setStatus] = useState('Loading model…');
  const [usedModel, setUsedModel] = useState(false);

  const tfRef = useRef<TfModule | null>(null);
  const modelRef = useRef<Sequential | null>(null);
  const historyRef = useRef<Move[]>([]);
  const roundsRef = useRef(0);
  const trainingRef = useRef(Promise.resolve());

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const tf = await import('@tensorflow/tfjs');
        if (cancelled) return;
        tfRef.current = tf;

        const model = tf.sequential();
        model.add(
          tf.layers.dense({
            units: 8,
            activation: 'relu',
            inputShape: [HISTORY_LEN * CLASSES],
          })
        );
        model.add(tf.layers.dense({ units: CLASSES, activation: 'softmax' }));
        model.compile({
          optimizer: 'adam',
          loss: 'categoricalCrossentropy',
        });
        modelRef.current = model;

        // Warm up backend so the first click isn't a hitch.
        const warm = tf.zeros([1, HISTORY_LEN * CLASSES]);
        model.predict(warm);
        warm.dispose();

        setReady(true);
        setStatus('Ready — throw to begin.');
      } catch {
        if (!cancelled) {
          setFailed(true);
          setStatus('Model unavailable.');
        }
      }
    })();

    return () => {
      cancelled = true;
      modelRef.current?.dispose();
      modelRef.current = null;
    };
  }, []);

  const played = wins + losses + ties;
  const botWinRate = played === 0 ? 0 : losses / played;

  const play = useCallback(
    async (human: Move) => {
      if (!ready || busy || !modelRef.current || !tfRef.current) return;
      setBusy(true);

      const tf = tfRef.current;
      const model = modelRef.current;
      const hist = historyRef.current;
      const features = encodeHistory(hist);
      const roundIndex = roundsRef.current;

      let bot: Move;
      let fromModel = false;

      if (roundIndex < WARMUP_ROUNDS) {
        bot = randomMove();
      } else {
        const pred = tf.tidy(() => {
          const x = tf.tensor2d([features]);
          const y = model.predict(x) as import('@tensorflow/tfjs').Tensor;
          const data = y.dataSync();
          let best = 0;
          for (let i = 1; i < CLASSES; i++) {
            if (data[i] > data[best]) best = i;
          }
          return best as Move;
        });
        bot = counterMove(pred);
        fromModel = true;
      }

      const outcome = resolveRound(human, bot);

      // Reveal immediately — train in the background.
      setLastHuman(human);
      setLastBot(bot);
      setLastOutcome(outcome);
      setUsedModel(fromModel);
      if (outcome === 'win') setWins((w) => w + 1);
      else if (outcome === 'loss') setLosses((l) => l + 1);
      else setTies((t) => t + 1);

      // Keep the full session — training needs every sliding window.
      historyRef.current = [...hist, human];
      setHistory([...historyRef.current]);
      roundsRef.current += 1;

      const outcomeLabel =
        outcome === 'win' ? 'You win' : outcome === 'loss' ? 'Bot wins' : 'Tie';
      setStatus(
        fromModel
          ? `${outcomeLabel}. Model predicted & countered.`
          : `${outcomeLabel}. Warm-up (random bot).`
      );

      const session = historyRef.current;
      trainingRef.current = trainingRef.current.then(async () => {
        try {
          await trainOnHistory(tf, model, session);
        } catch {
          // Training errors shouldn't break play.
        }
      });

      setBusy(false);
    },
    [busy, ready]
  );

  if (failed) return null;

  return (
    <section
      id='beat-the-bot'
      aria-label='Beat the Bot'
      className='py-16 px-4 max-w-screen-xl mx-auto border-t border-neutral-900'
    >
      <div data-reveal className='mb-2'>
        <span className='text-xs font-semibold tracking-widest text-teal-400 uppercase'>
          Live demo
        </span>
      </div>
      <h2 data-split className='text-3xl md:text-4xl font-bold text-white mb-2'>
        Beat the Bot
      </h2>
      <p data-reveal className='text-neutral-400 mb-2 text-sm md:text-base max-w-2xl leading-relaxed'>
        Rock-Paper-Scissors against a dense net that trains in your browser,
        one round at a time. The longer you play, the better it gets at reading you.
      </p>
      <p data-reveal className='mb-8'>
        <button
          type='button'
          onClick={onOpenHelp}
          className='text-xs text-neutral-500 hover:text-teal-400 underline underline-offset-4 decoration-neutral-700 hover:decoration-teal-700/60 transition-colors'
        >
          Want to know how it works?
        </button>
      </p>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>
        {/* Play surface */}
        <div className='lg:col-span-7 space-y-6'>
          <div className='rounded-xl border border-neutral-800/80 bg-neutral-950/80 p-5 md:p-6'>
            {/* Scoreboard */}
            <div className='flex flex-wrap items-end justify-between gap-4 mb-6 pb-5 border-b border-neutral-900'>
              <div>
                <p className='font-mono text-[10px] tracking-[0.2em] text-neutral-600 uppercase mb-1'>
                  Bot win rate
                </p>
                <p className='text-3xl md:text-4xl font-bold text-white tabular-nums'>
                  {played === 0 ? '—' : `${(botWinRate * 100).toFixed(0)}%`}
                </p>
              </div>
              <div className='flex gap-5 font-mono text-xs text-neutral-500'>
                <div>
                  <span className='text-neutral-600 block text-[10px] tracking-widest uppercase mb-0.5'>
                    You
                  </span>
                  <span className='text-teal-400 text-lg font-medium tabular-nums'>{wins}</span>
                </div>
                <div>
                  <span className='text-neutral-600 block text-[10px] tracking-widest uppercase mb-0.5'>
                    Bot
                  </span>
                  <span className='text-rose-400 text-lg font-medium tabular-nums'>{losses}</span>
                </div>
                <div>
                  <span className='text-neutral-600 block text-[10px] tracking-widest uppercase mb-0.5'>
                    Tie
                  </span>
                  <span className='text-neutral-300 text-lg font-medium tabular-nums'>{ties}</span>
                </div>
              </div>
            </div>

            {/* Last round */}
            <div className='mb-6 min-h-[4.5rem]'>
              {lastOutcome == null ? (
                <p className='text-sm text-neutral-500'>{status}</p>
              ) : (
                <div className='flex flex-wrap items-center gap-4'>
                  <div className='text-center min-w-[4.5rem]'>
                    <p className='font-mono text-[9px] tracking-widest text-neutral-600 uppercase mb-1'>
                      You
                    </p>
                    <p className='font-mono text-2xl text-white tracking-tight'>
                      {MOVE_SHORT[lastHuman!]}
                    </p>
                    <p className='text-xs text-neutral-400'>{MOVE_LABELS[lastHuman!]}</p>
                  </div>
                  <span className='text-neutral-700 font-mono text-xs'>vs</span>
                  <div className='text-center min-w-[4.5rem]'>
                    <p className='font-mono text-[9px] tracking-widest text-neutral-600 uppercase mb-1'>
                      Bot
                    </p>
                    <p className='font-mono text-2xl text-white tracking-tight'>
                      {MOVE_SHORT[lastBot!]}
                    </p>
                    <p className='text-xs text-neutral-400'>{MOVE_LABELS[lastBot!]}</p>
                  </div>
                  <div className='ml-auto text-right'>
                    <p
                      className={cn(
                        'text-sm font-medium',
                        lastOutcome === 'win' && 'text-teal-400',
                        lastOutcome === 'loss' && 'text-rose-400',
                        lastOutcome === 'tie' && 'text-neutral-400'
                      )}
                    >
                      {lastOutcome === 'win'
                        ? 'You win'
                        : lastOutcome === 'loss'
                          ? 'Bot wins'
                          : 'Tie'}
                    </p>
                    <p className='font-mono text-[10px] text-neutral-600 mt-0.5'>
                      {usedModel ? 'inference' : 'warmup'} · round {played}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Move buttons */}
            <div className='grid grid-cols-3 gap-2 md:gap-3'>
              {([0, 1, 2] as Move[]).map((m) => (
                <button
                  key={m}
                  type='button'
                  disabled={!ready || busy}
                  onClick={() => void play(m)}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-4',
                    'text-sm font-medium text-neutral-300 transition-all',
                    'hover:border-teal-800/60 hover:bg-teal-950/20 hover:text-teal-300',
                    'disabled:opacity-40 disabled:pointer-events-none',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50'
                  )}
                >
                  <span className='font-mono text-xl text-white tracking-tight'>
                    {MOVE_SHORT[m]}
                  </span>
                  <span className='font-mono text-[10px] tracking-widest uppercase text-neutral-500'>
                    {MOVE_LABELS[m]}
                  </span>
                </button>
              ))}
            </div>

            {!ready && (
              <p className='mt-4 font-mono text-[10px] text-neutral-600 tracking-widest uppercase'>
                Initializing TensorFlow.js…
              </p>
            )}
          </div>

          {/* Compact history strip */}
          {history.length > 0 && (
            <p className='font-mono text-[10px] text-neutral-600 tracking-wide'>
              session history:{' '}
              <span className='text-neutral-500'>
                {history
                  .slice(-12)
                  .map((m) => MOVE_LABELS[m][0])
                  .join(' · ')}
              </span>
            </p>
          )}
        </div>

        {/* Architecture figure + note */}
        <div className='lg:col-span-5 space-y-4'>
          <AsciiFigure caption='FIG. BTB · Online RPS Predictor' lines={PIPELINE_LINES} />
          <aside className='border-l border-neutral-800/80 pl-4'>
            <p className='font-mono text-[10px] leading-relaxed text-neutral-500'>
              Session-only · no persistence. TF.js loads when this block intersects
              the viewport. After each round the net retrains on the full history
              ({TRAIN_EPOCHS} epochs). First {WARMUP_ROUNDS} rounds use a random
              bot while the window fills.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ── Public entry: float + lazy game ─────────────────────────────── */

/**
 * Homepage entry. The floating orb is always available; the game (+ TF.js)
 * mounts only after the sentinel approaches the viewport.
 */
export function BeatTheBot() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const openHelp = useCallback(() => setHelpOpen(true), []);
  const closeHelp = useCallback(() => setHelpOpen(false), []);

  return (
    <>
      <FloatingOrbButton onOpenHelp={openHelp} />
      <HowItWorksModal open={helpOpen} onClose={closeHelp} />

      {/* Sentinel keeps layout stable before the heavy game mounts */}
      <div ref={sentinelRef} className='min-h-[1px]' aria-hidden={!visible}>
        {visible ? (
          <BeatTheBotGame onOpenHelp={openHelp} />
        ) : (
          <section
            id='beat-the-bot'
            aria-label='Beat the Bot'
            className='py-16 px-4 max-w-screen-xl mx-auto border-t border-neutral-900'
          >
            <div className='mb-2'>
              <span className='text-xs font-semibold tracking-widest text-teal-400 uppercase'>
                Live demo
              </span>
            </div>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-2'>Beat the Bot</h2>
            <p className='text-neutral-500 text-sm'>Scroll into view to load the model…</p>
          </section>
        )}
      </div>
    </>
  );
}
