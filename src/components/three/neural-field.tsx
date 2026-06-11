'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

/**
 * WebGL "neural constellation" — a 3D particle network with signal pulses
 * travelling along its edges. Particle drift is computed in the vertex
 * shader from a shared displacement function, so point sprites and line
 * endpoints stay perfectly in sync with zero per-frame CPU work.
 */

const TEAL = new THREE.Color('#2dd4bf');
const ROSE = new THREE.Color('#fb7185');

// GLSL displacement shared by points + lines — must be identical in both.
const DISP_GLSL = /* glsl */ `
  vec3 disp(vec3 p, float phase) {
    p.x += sin(uTime * 0.16 + phase * 6.2831) * 0.42;
    p.y += cos(uTime * 0.21 + phase * 4.7124) * 0.34;
    p.z += sin(uTime * 0.13 + phase * 2.3562) * 0.38;
    return p;
  }
`;

const POINTS_VERT = /* glsl */ `
  attribute float aPhase;
  attribute float aMix;
  attribute float aSize;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vMix;
  varying float vTwinkle;
  ${''}
  __DISP__
  void main() {
    vMix = aMix;
    vec3 p = disp(position, aPhase);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vTwinkle = 0.6 + 0.4 * sin(uTime * (0.7 + aPhase * 1.3) + aPhase * 21.0);
    gl_PointSize = aSize * uPixelRatio * (130.0 / -mv.z) * (0.75 + 0.45 * vTwinkle);
  }
`;

const POINTS_FRAG = /* glsl */ `
  uniform vec3 uColA;
  uniform vec3 uColB;
  varying float vMix;
  varying float vTwinkle;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float halo = smoothstep(0.5, 0.08, d);
    float core = smoothstep(0.16, 0.0, d);
    vec3 col = mix(uColA, uColB, vMix);
    float alpha = halo * (0.25 + 0.45 * vTwinkle) + core * 0.5;
    gl_FragColor = vec4(col, alpha);
  }
`;

const LINES_VERT = /* glsl */ `
  attribute float aPhase;
  attribute float aMix;
  attribute float aEdgePhase;
  uniform float uTime;
  varying float vMix;
  varying float vPulse;
  __DISP__
  void main() {
    vMix = aMix;
    vec3 p = disp(position, aPhase);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    float t = fract(uTime * 0.07 + aEdgePhase);
    vPulse = smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.06, 0.22, t));
  }
`;

const LINES_FRAG = /* glsl */ `
  uniform vec3 uColA;
  uniform vec3 uColB;
  varying float vMix;
  varying float vPulse;
  void main() {
    vec3 col = mix(uColA, uColB, vMix);
    gl_FragColor = vec4(col, 0.07 + vPulse * 0.45);
  }
`;

export function NeuralField({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isMobile = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return; // no WebGL → aurora gradient stays as the fallback backdrop
    }

    const dprCap = isMobile ? 1.5 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 11.5);

    const group = new THREE.Group();
    scene.add(group);

    // ── particles in a flattened ellipsoid ───────────────────────────
    const COUNT = isMobile ? 150 : 380;
    const positions = new Float32Array(COUNT * 3);
    const phases = new Float32Array(COUNT);
    const mixes = new Float32Array(COUNT);
    const sizes = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      // rejection-free spherical sample, then squash into an ellipsoid
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const r = Math.cbrt(Math.random());
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta) * 9.5;
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 4.2;
      positions[i * 3 + 2] = r * Math.cos(phi) * 4.5;
      phases[i] = Math.random();
      mixes[i] = Math.random() < 0.78 ? Math.random() * 0.35 : 0.7 + Math.random() * 0.3;
      // mostly small crisp nodes, a few oversized soft "bokeh" glows for depth
      sizes[i] =
        Math.random() < 0.85 ? 0.9 + Math.random() * 1.4 : 2.6 + Math.random() * 1.8;
    }

    const uniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: dpr },
      uColA: { value: TEAL },
      uColB: { value: ROSE },
    };

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    pGeo.setAttribute('aMix', new THREE.BufferAttribute(mixes, 1));
    pGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const pMat = new THREE.ShaderMaterial({
      vertexShader: POINTS_VERT.replace('__DISP__', DISP_GLSL),
      fragmentShader: POINTS_FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(pGeo, pMat));

    // ── edges: connect each particle to its 2 nearest neighbours ─────
    const MAX_DIST = isMobile ? 3.6 : 3.1;
    const pairs = new Set<string>();
    const edges: [number, number][] = [];
    for (let i = 0; i < COUNT; i++) {
      const dists: { j: number; d: number }[] = [];
      for (let j = 0; j < COUNT; j++) {
        if (i === j) continue;
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < MAX_DIST) dists.push({ j, d });
      }
      dists.sort((a, b) => a.d - b.d);
      for (const { j } of dists.slice(0, 2)) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!pairs.has(key)) {
          pairs.add(key);
          edges.push(i < j ? [i, j] : [j, i]);
        }
      }
    }

    const lPos = new Float32Array(edges.length * 6);
    const lPhase = new Float32Array(edges.length * 2);
    const lMix = new Float32Array(edges.length * 2);
    const lEdgePhase = new Float32Array(edges.length * 2);
    edges.forEach(([a, b], e) => {
      lPos.set(positions.subarray(a * 3, a * 3 + 3), e * 6);
      lPos.set(positions.subarray(b * 3, b * 3 + 3), e * 6 + 3);
      lPhase[e * 2] = phases[a];
      lPhase[e * 2 + 1] = phases[b];
      lMix[e * 2] = mixes[a];
      lMix[e * 2 + 1] = mixes[b];
      const ep = Math.random();
      lEdgePhase[e * 2] = ep;
      lEdgePhase[e * 2 + 1] = ep;
    });

    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
    lGeo.setAttribute('aPhase', new THREE.BufferAttribute(lPhase, 1));
    lGeo.setAttribute('aMix', new THREE.BufferAttribute(lMix, 1));
    lGeo.setAttribute('aEdgePhase', new THREE.BufferAttribute(lEdgePhase, 1));

    const lMat = new THREE.ShaderMaterial({
      vertexShader: LINES_VERT.replace('__DISP__', DISP_GLSL),
      fragmentShader: LINES_FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.LineSegments(lGeo, lMat));

    // ── sizing ────────────────────────────────────────────────────────
    function resize() {
      const w = mount!.clientWidth || window.innerWidth;
      const h = mount!.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ── pointer parallax (fine pointers only) ─────────────────────────
    const target = { x: 0, y: 0 };
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    function onPointer(e: PointerEvent) {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    if (finePointer && !reduceMotion) {
      window.addEventListener('pointermove', onPointer, { passive: true });
    }

    // ── render loop (paused offscreen / hidden tab) ───────────────────
    let raf = 0;
    let running = false;
    let visible = true;
    let last = 0;
    let elapsed = 0;

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (last) elapsed += Math.min(now - last, 100) / 1000;
      last = now;
      uniforms.uTime.value = elapsed;

      group.rotation.y +=
        (target.x * 0.12 + elapsed * 0.015 - group.rotation.y) * 0.04;
      group.rotation.x += (target.y * 0.08 - group.rotation.x) * 0.04;
      // gentle scroll response
      group.position.y = Math.min(window.scrollY * 0.0012, 1.2);

      renderer.render(scene, camera);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    // paint an initial frame right away (also the only frame under reduced motion)
    renderer.render(scene, camera);
    if (!reduceMotion) start();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    io.observe(mount);

    function onVisibility() {
      if (document.hidden) stop();
      else if (visible) start();
    }
    document.addEventListener('visibilitychange', onVisibility);

    function onContextLost(e: Event) {
      e.preventDefault();
      stop();
    }
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      if (finePointer && !reduceMotion) {
        window.removeEventListener('pointermove', onPointer);
      }
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      pGeo.dispose();
      lGeo.dispose();
      pMat.dispose();
      lMat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden='true'
      className={cn(
        'absolute inset-0 pointer-events-none [&>canvas]:w-full [&>canvas]:h-full',
        // fade the field out before the work cards begin
        '[mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_96%)]',
        className
      )}
    />
  );
}
