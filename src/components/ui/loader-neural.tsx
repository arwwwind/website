'use client';

import { useEffect, useRef, useState } from 'react';

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

/** Future edges: background mesh. Past: “lights stay on” at this opacity. Active pulse: full. */
const OP_FUTURE = 0.09;
const OP_PAST   = 0.5;
const OP_ACTIVE = 1;

// ── architecture ─────────────────────────────────────────────────────
// 4 → 6 → 6 → 5 → 1  (deeper + wider; bottleneck before readout)
const LAYER_CFG = [
  { x: 48,  ys: [68, 116, 164, 212],                      label: 'Input' },
  { x: 152, ys: [44, 82, 120, 158, 196, 234],              label: 'Conv' },
  { x: 268, ys: [44, 82, 120, 158, 196, 234],              label: 'Dense' },
  { x: 384, ys: [72, 120, 168, 200, 228],                  label: 'Bottleneck' },
  { x: 518, ys: [148],                                     label: 'Readout' },
] as const;

const NUM_EDGE_GROUPS = LAYER_CFG.length - 1;

interface NNode { id: string; x: number; y: number; layer: number }
interface NEdge { id: string; from: string; to: string; edgeLayer: number }

const NODES: NNode[] = LAYER_CFG.flatMap((lc, li) =>
  lc.ys.map((y, ni) => ({ id: `${li}-${ni}`, x: lc.x, y, layer: li }))
);

const EDGES: NEdge[] = [];
for (let l = 0; l < LAYER_CFG.length - 1; l++) {
  for (let fi = 0; fi < LAYER_CFG[l].ys.length; fi++) {
    for (let ti = 0; ti < LAYER_CFG[l + 1].ys.length; ti++) {
      EDGES.push({ id: `e-${l}-${fi}-${ti}`, from: `${l}-${fi}`, to: `${l + 1}-${ti}`, edgeLayer: l });
    }
  }
}

const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

// ── component ────────────────────────────────────────────────────────
export function NeuralLoader({ onExit }: { onExit: () => void }) {
  const [activeNodeLayer, setActiveNodeLayer]     = useState(-1);
  /** Which edge bundle is currently pulsing at 100%; -1 = none yet; NUM_EDGE_GROUPS = all settled to OP_PAST */
  const [activeEdgeLayer, setActiveEdgeLayer]     = useState(-1);
  const [showLabel, setShowLabel]                 = useState(false);
  /** After full forward pass: every traversed edge stays at OP_PAST (no “lights off”). */
  const [forwardComplete, setForwardComplete]     = useState(false);
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;

    async function run() {
      // Entire sequence stays under 2.5s (sleep totals ~2.2s + React paint margin)
      await sleep(120);

      for (let l = 0; l < LAYER_CFG.length; l++) {
        if (cancelled.current) return;
        setActiveNodeLayer(l);

        if (l < LAYER_CFG.length - 1) {
          await sleep(85);
          if (cancelled.current) return;
          setActiveEdgeLayer(l);
          const edgeHold =
            l === 0 ? 250 : l === NUM_EDGE_GROUPS - 1 ? 300 : 200;
          await sleep(edgeHold);
        }
      }

      await sleep(120);
      if (cancelled.current) return;
      setActiveEdgeLayer(NUM_EDGE_GROUPS);
      setForwardComplete(true);
      setShowLabel(true);
      await sleep(520);
      if (!cancelled.current) onExit();
    }

    run();
    return () => { cancelled.current = true; };
  }, [onExit]);

  return (
    <div style={{ width: '100%', maxWidth: 640, padding: '0 12px' }}>
      <svg viewBox='0 0 588 288' width='100%' style={{ overflow: 'visible' }}>
        <defs>
          <filter id='nn-glow' x='-40%' y='-40%' width='180%' height='180%'>
            <feGaussianBlur in='SourceGraphic' stdDeviation='0.8' result='blur' />
            <feMerge>
              <feMergeNode in='blur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
          <linearGradient id='edge-active' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='#2dd4bf' stopOpacity='0.35' />
            <stop offset='50%' stopColor='#5eead4' stopOpacity='1' />
            <stop offset='100%' stopColor='#2dd4bf' stopOpacity='0.35' />
          </linearGradient>
        </defs>

        {/* layer labels */}
        {LAYER_CFG.map((lc, li) => (
          <text
            key={li}
            x={lc.x}
            y={26}
            textAnchor='middle'
            fontSize={8}
            fill={activeNodeLayer >= li ? '#454545' : '#181818'}
            fontFamily='"IBM Plex Mono", monospace'
            letterSpacing='0.08em'
            style={{ textTransform: 'uppercase', transition: 'fill 0.45s' }}
          >
            {lc.label}
          </text>
        ))}

        {/* edges */}
        {EDGES.map((edge) => {
          const from = nodeMap[edge.from];
          const to   = nodeMap[edge.to];

          const isPast =
            forwardComplete ||
            (activeEdgeLayer !== -1 && edge.edgeLayer < activeEdgeLayer);
          const isActive =
            !forwardComplete &&
            activeEdgeLayer === edge.edgeLayer &&
            activeEdgeLayer >= 0 &&
            activeEdgeLayer < NUM_EDGE_GROUPS;

          let opacity: number;
          let stroke: string;
          let strokeWidth: number;
          let filter: string | undefined;

          if (isActive) {
            opacity = OP_ACTIVE;
            stroke = 'url(#edge-active)';
            strokeWidth = 1.15;
            filter = 'url(#nn-glow)';
          } else if (isPast) {
            opacity = OP_PAST;
            stroke = '#2dd4bf';
            strokeWidth = 0.75;
            filter = undefined;
          } else {
            opacity = OP_FUTURE;
            stroke = '#1f1f1f';
            strokeWidth = 0.55;
            filter = undefined;
          }

          return (
            <line
              key={edge.id}
              x1={from.x} y1={from.y}
              x2={to.x}   y2={to.y}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinecap='round'
              opacity={opacity}
              style={{ transition: 'stroke 0.35s ease, opacity 0.5s ease, stroke-width 0.35s ease' }}
              filter={filter}
            />
          );
        })}

        {/* nodes: once a layer has fired, keep it visibly “warm” (past layers dimmer than current) */}
        {NODES.map((node) => {
          const layerFired     = activeNodeLayer >= node.layer;
          const isCurrentLayer = activeNodeLayer === node.layer && !forwardComplete;
          const isPastLayer    = layerFired && !isCurrentLayer;
          const isOutput       = node.layer === LAYER_CFG.length - 1;
          const isInput        = node.layer === 0;
          const r              = isOutput ? 18 : 8;

          let stroke: string;
          let strokeWidth: number;
          let fill: string;
          let nodeOpacity = 1;

          if (!layerFired) {
            stroke = '#1a1a1a';
            strokeWidth = 0.65;
            fill = '#060606';
            nodeOpacity = 0.92;
          } else if (isCurrentLayer) {
            if (isOutput) {
              stroke = '#2dd4bf';
              strokeWidth = 2.2;
              fill = '#082a26';
            } else if (isInput) {
              stroke = '#fb7185';
              strokeWidth = 1.65;
              fill = '#140808';
            } else {
              stroke = '#5eead4';
              strokeWidth = 1.45;
              fill = '#0a1716';
            }
          } else {
            // activated earlier — stay lit at ~50% visual weight vs current pulse
            nodeOpacity =
              forwardComplete && isOutput ? 1 : isPastLayer ? 0.55 : 1;
            if (isOutput) {
              stroke = '#2dd4bf';
              strokeWidth = forwardComplete ? 2 : 1.35;
              fill = forwardComplete ? '#082a26' : '#0a1f1c';
            } else if (isInput) {
              stroke = '#fb7185';
              strokeWidth = 1.05;
              fill = '#100606';
            } else {
              stroke = '#2dd4bf';
              strokeWidth = 1;
              fill = '#0a1211';
            }
          }

          return (
            <g key={node.id} opacity={nodeOpacity} style={{ transition: 'opacity 0.45s ease' }}>
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                style={{ transition: 'stroke 0.4s ease, fill 0.4s ease, stroke-width 0.35s ease' }}
                filter={layerFired && (isCurrentLayer || isOutput) ? 'url(#nn-glow)' : undefined}
              />
            </g>
          );
        })}

        {/* faint ring around readout when label shows */}
        {showLabel && (
          <circle
            cx={518}
            cy={148}
            r={28}
            fill='none'
            stroke='#2dd4bf'
            strokeWidth={0.4}
            opacity={0.35}
            style={{ transition: 'opacity 0.6s ease' }}
          />
        )}

        {showLabel && (
          <>
            <text
              x={518} y={252}
              textAnchor='middle'
              fontSize={13}
              fill='#2dd4bf'
              fontFamily='"IBM Plex Mono", monospace'
              fontWeight='700'
              style={{ opacity: showLabel ? 1 : 0, transition: 'opacity 0.5s' }}
            >
              Arvind Narayan
            </text>
            <text
              x={518} y={268}
              textAnchor='middle'
              fontSize={9}
              fill='#3a3a3a'
              fontFamily='"IBM Plex Mono", monospace'
              letterSpacing='0.05em'
            >
              Staff AI/ML Engineer
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
