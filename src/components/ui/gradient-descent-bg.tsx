'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

function surfaceH(x: number, z: number, t: number): number {
  return (
    0.55 * Math.sin(x * 0.9  + t * 0.30) * Math.cos(z * 0.7  + t * 0.20) +
    0.30 * Math.sin(x * 1.6  - z * 1.0  + t * 0.15) +
    0.20 * Math.cos(z * 1.9  + x * 0.5  + t * 0.25) +
    0.12 * Math.sin(x * 2.4  + z * 2.4  + t * 0.40)
  );
}

function heightToColor(h: number, minH: number, maxH: number): string {
  const t = Math.max(0, Math.min(1, (h - minH) / (maxH - minH || 1)));
  const stops: [number, number, number][] = [
    [180, 120,  20],
    [ 40, 180,  60],
    [ 20, 200, 160],
    [ 30, 140, 220],
    [100,  60, 220],
    [200,  80, 200],
  ];
  const idx = t * (stops.length - 1);
  const lo  = Math.floor(idx);
  const hi  = Math.min(lo + 1, stops.length - 1);
  const f   = idx - lo;
  const r   = Math.round(stops[lo][0] + (stops[hi][0] - stops[lo][0]) * f);
  const g   = Math.round(stops[lo][1] + (stops[hi][1] - stops[lo][1]) * f);
  const b   = Math.round(stops[lo][2] + (stops[hi][2] - stops[lo][2]) * f);
  return `rgb(${r},${g},${b})`;
}

export function GradientDescentBg({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const startRef  = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0;

    function setSize() {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      W = (rect.width  > 0 ? rect.width  : window.innerWidth)  * dpr;
      H = (rect.height > 0 ? rect.height : window.innerHeight) * dpr;
      canvas!.width  = W;
      canvas!.height = H;
    }
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);
    window.addEventListener('resize', setSize);

    // Grid resolution
    const COLS = 38;   // depth-wise columns (converge to vanishing pt)
    const ROWS = 28;   // horizontal rows

    // Camera / surface
    const CAM_H   = 4.0;   // camera height above the z=0 plane
    const H_SCALE = 0.72;  // surface displacement scale

    function draw(msNow: number) {
      if (startRef.current === null) startRef.current = msNow;
      const t = (msNow - startRef.current) / 1000;

      if (W === 0 || H === 0) {
        setSize();
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const ctx = canvas!.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, W, H);

      // ── Camera parameters (recomputed per frame so they adapt on resize) ──
      // Vanishing line slightly *above* the canvas so rows stay wider — less needle tip
      const HORIZON_Y = -H * 0.07;
      const FOCAL     = H * 0.62;

      // Z range (flat ground: sy = HORIZON_Y + FOCAL * CAM_H / wz)
      const viewDepth = Math.max(H - HORIZON_Y, 1);
      const Z_NEAR = FOCAL * CAM_H / viewDepth / 1.1;
      // Furthest row sits a little below the canvas top (not at a single pixel)
      const topScreenY = Math.max(2.5 * dpr, H * 0.028);
      const Z_FAR =
        FOCAL * CAM_H / Math.max(topScreenY - HORIZON_Y, 1);

      // Wider world extent so distant rows span more of the width (softer convergence)
      //   sx = W/2 + FOCAL * wx / wz
      const X_MAX = (W * 0.68) * Z_NEAR / FOCAL;

      // Perspective-correct projection for a world point (wx, wz) at height h
      function proj(wx: number, wz: number, h: number): [number, number] {
        const sx = W * 0.5 + FOCAL * wx / wz;
        const sy = HORIZON_Y + FOCAL * (CAM_H - h * H_SCALE) / wz;
        return [sx, sy];
      }

      // Z values spaced uniformly in 1/z → uniform screen-Y spacing on flat surface
      const zVals: number[] = [];
      for (let r = 0; r <= ROWS; r++) {
        const a   = r / ROWS;
        const inv = (1 / Z_NEAR) * (1 - a) + (1 / Z_FAR) * a;
        zVals.push(1 / inv);
      }

      // X values: uniformly spaced, covering the near row edge-to-edge
      const xVals: number[] = [];
      for (let c = 0; c <= COLS; c++) {
        xVals.push(-X_MAX + (c / COLS) * 2 * X_MAX);
      }

      // ── Height pass (compute surface + min/max) ──
      const hGrid: number[][] = Array.from({ length: ROWS + 1 }, () =>
        new Array(COLS + 1).fill(0)
      );
      let minH =  Infinity;
      let maxH = -Infinity;
      for (let r = 0; r <= ROWS; r++) {
        const wz = zVals[r];
        for (let c = 0; c <= COLS; c++) {
          const h = surfaceH(xVals[c], wz, t);
          hGrid[r][c] = h;
          if (h < minH) minH = h;
          if (h > maxH) maxH = h;
        }
      }

      ctx.lineWidth = 1.0 * dpr;
      ctx.globalAlpha = 0.62;

      // ── Depth lines: constant worldX column, walk from near → far ──
      for (let c = 0; c <= COLS; c++) {
        for (let r = 0; r < ROWS; r++) {
          const h0 = hGrid[r][c], h1 = hGrid[r + 1][c];
          ctx.strokeStyle = heightToColor((h0 + h1) * 0.5, minH, maxH);
          ctx.beginPath();
          const [x0, y0] = proj(xVals[c], zVals[r],     h0);
          const [x1, y1] = proj(xVals[c], zVals[r + 1], h1);
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }
      }

      // ── Row lines: constant worldZ, walk left → right ──
      for (let r = 0; r <= ROWS; r++) {
        const wz = zVals[r];
        for (let c = 0; c < COLS; c++) {
          const h0 = hGrid[r][c], h1 = hGrid[r][c + 1];
          ctx.strokeStyle = heightToColor((h0 + h1) * 0.5, minH, maxH);
          ctx.beginPath();
          const [x0, y0] = proj(xVals[c],     wz, h0);
          const [x1, y1] = proj(xVals[c + 1], wz, h1);
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 w-full h-full', className)}
      style={{ pointerEvents: 'none' }}
    />
  );
}
