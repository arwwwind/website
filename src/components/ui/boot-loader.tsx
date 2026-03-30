'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { NeuralLoader } from './loader-neural';

// Concept 4 only: Neural network pulse

// ── shared shell ──────────────────────────────────────────────────────
// Handles the full-screen black overlay, scanline, and slide-up exit.
// Calls children(onExit) — each loader triggers onExit() when done.
function LoaderShell({ children }: { children: (onExit: () => void) => React.ReactNode }) {
  const [exiting, setExiting] = useState(false);
  const [done,    setDone]    = useState(false);

  const handleExit = useCallback(() => {
    setExiting(true);
    setTimeout(() => setDone(true), 620);
  }, []);

  if (done) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"IBM Plex Mono", monospace',
        transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
        transition: exiting ? 'transform 0.55s cubic-bezier(0.76,0,0.24,1)' : 'none',
        willChange: 'transform',
      }}
    >
      {/* subtle scanline texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 3px)',
          pointerEvents: 'none',
        }}
      />
      {children(handleExit)}
    </div>
  );
}

// ── concept 1: terminal dev-console ──────────────────────────────────
interface Step {
  label: string;
  duration: number;
  delay: number;
  color: 'teal' | 'rose' | 'neutral';
}

const STEPS: Step[] = [
  { label: 'Loading weights',          duration: 480, delay: 320,  color: 'teal'    },
  { label: 'Compiling gradients',      duration: 360, delay: 120,  color: 'teal'    },
  { label: 'Mounting retrieval index', duration: 520, delay: 100,  color: 'rose'    },
  { label: 'Warming inference cache',  duration: 400, delay: 100,  color: 'rose'    },
  { label: 'Fitting environment',      duration: 300, delay: 100,  color: 'neutral' },
];

const METRICS_START_DELAY = 1_400;
const EXIT_DELAY          = 3_900;

function TerminalLoader({ onExit }: { onExit: () => void }) {
  const [visibleSteps, setVisibleSteps] = useState(-1);
  const [fills,        setFills]        = useState<number[]>(STEPS.map(() => 0));
  const [doneSteps,    setDoneSteps]    = useState<boolean[]>(STEPS.map(() => false));
  const [showMetrics,  setShowMetrics]  = useState(false);
  const [loss,         setLoss]         = useState(1.0);
  const [acc,          setAcc]          = useState(0.0);
  const [showReady,    setShowReady]    = useState(false);
  const [cursorOn,     setCursorOn]     = useState(true);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let elapsed = 0;

    function scheduleStep(idx: number, atMs: number) {
      setTimeout(() => {
        setVisibleSteps(idx);
        const step  = STEPS[idx];
        const start = performance.now();
        function tick() {
          const pct = Math.min((performance.now() - start) / step.duration, 1);
          setFills((prev) => {
            const next = [...prev];
            next[idx]  = Math.round(pct * 100);
            return next;
          });
          if (pct < 1) {
            rafRef.current = requestAnimationFrame(tick);
          } else {
            setDoneSteps((prev) => {
              const next = [...prev];
              next[idx]  = true;
              return next;
            });
          }
        }
        rafRef.current = requestAnimationFrame(tick);
      }, atMs);
    }

    STEPS.forEach((step, i) => {
      const prev = STEPS.slice(0, i).reduce((s, st) => s + st.delay + st.duration, 0);
      elapsed    = prev + step.delay;
      scheduleStep(i, elapsed);
    });

    setTimeout(() => {
      setShowMetrics(true);
      const mStart        = performance.now();
      const METRIC_DURATION = 900;
      function animateMetrics() {
        const t    = Math.min((performance.now() - mStart) / METRIC_DURATION, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setLoss(+(1.0 - ease * 0.9988).toFixed(4));
        setAcc(+(ease * 0.9912).toFixed(4));
        if (t < 1) requestAnimationFrame(animateMetrics);
        else        setShowReady(true);
      }
      requestAnimationFrame(animateMetrics);
    }, METRICS_START_DELAY);

    setTimeout(() => onExit(), EXIT_DELAY);

    return () => cancelAnimationFrame(rafRef.current);
  }, [onExit]);

  const barColor = (color: Step['color']) =>
    color === 'teal' ? '#2dd4bf' : color === 'rose' ? '#fb7185' : '#525252';

  const checkColor = (color: Step['color']) =>
    color === 'teal' ? 'text-teal-400' : color === 'rose' ? 'text-rose-400' : 'text-neutral-500';

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 560, padding: '0 24px' }}>
      <p style={{ color: '#525252', fontSize: 11, marginBottom: 20, letterSpacing: '0.08em' }}>
        arwwwind.com ~ <span style={{ color: '#2dd4bf' }}>main</span>
      </p>

      <TLine>
        <span style={{ color: '#525252' }}>$</span>{' '}
        <span style={{ color: '#e5e5e5' }}>python </span>
        <span style={{ color: '#2dd4bf' }}>serve</span>
        <span style={{ color: '#737373' }}>.py --model arvind_narayan_v9</span>
      </TLine>

      <TSpacer />
      <TLine muted>Initializing Arvind Narayan v9.0...</TLine>
      <TSpacer />

      {STEPS.map((step, i) => {
        if (visibleSteps < i) return null;
        const fill  = fills[i];
        const done_ = doneSteps[i];
        return (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 14, fontSize: 11, flexShrink: 0 }} className={done_ ? checkColor(step.color) : ''}>
                {done_ ? '✓' : <span style={{ color: '#404040' }}>·</span>}
              </span>
              <span style={{ color: '#a3a3a3', fontSize: 12, width: 210, flexShrink: 0 }}>
                {step.label}
              </span>
              <div style={{ flex: 1, height: 4, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${fill}%`,
                    background: barColor(step.color),
                    borderRadius: 2,
                    transition: 'width 16ms linear',
                    boxShadow: done_ ? `0 0 6px ${barColor(step.color)}80` : 'none',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: done_ ? barColor(step.color) : '#404040',
                  width: 36,
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {fill}%
              </span>
            </div>
          </div>
        );
      })}

      {showMetrics && (
        <>
          <TSpacer />
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <span style={{ color: '#525252', fontSize: 12 }}>Epoch 1/1</span>
            <TMetric label='loss' value={loss.toFixed(4)} color='#fb7185' />
            <TMetric label='acc'  value={acc.toFixed(4)}  color='#2dd4bf' />
            {showReady && <span style={{ color: '#2dd4bf', fontSize: 12 }}>✓</span>}
          </div>
        </>
      )}

      {showReady && (
        <>
          <TSpacer />
          <TLine>
            <span style={{ color: '#525252' }}>$</span>{' '}
            <span style={{ color: '#e5e5e5' }}>Model ready. </span>
            <span style={{ color: '#2dd4bf' }}>Launching</span>
            <span style={{ color: '#e5e5e5' }}>...</span>
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 14,
                background: '#2dd4bf',
                marginLeft: 2,
                verticalAlign: 'text-bottom',
                opacity: cursorOn ? 1 : 0,
              }}
            />
          </TLine>
        </>
      )}

      {!showReady && visibleSteps >= 0 && (
        <span
          style={{
            display: 'inline-block',
            width: 7,
            height: 13,
            background: '#525252',
            marginLeft: 4,
            verticalAlign: 'text-bottom',
            opacity: cursorOn ? 1 : 0,
          }}
        />
      )}
    </div>
  );
}

// ── terminal helpers ──────────────────────────────────────────────────
function TLine({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <p style={{ margin: '0 0 6px 0', fontSize: 13, lineHeight: 1.5, color: muted ? '#525252' : '#e5e5e5' }}>
      {children}
    </p>
  );
}

function TSpacer() {
  return <div style={{ height: 14 }} />;
}

function TMetric({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <span style={{ fontSize: 12, color: '#737373' }}>
      {label}:{' '}
      <span style={{ color, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </span>
  );
}

// ── main export ───────────────────────────────────────────────────────
export function BootLoader() {
  return (
    <LoaderShell>
      {(onExit) => <NeuralLoader onExit={onExit} />}
    </LoaderShell>
  );
}
