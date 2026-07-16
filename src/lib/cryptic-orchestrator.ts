/**
 * Global document-order queue for cryptic reveals.
 *
 * - Only one armed job plays at a time (topmost in the DOM first).
 * - Jobs below stay empty until everything above them finishes.
 * - If the user scrolls ahead, speed ramps exponentially so catch-up is instant.
 */

export type CrypticRunContext = {
  getSpeed: () => number;
  complete: () => void;
};

type Job = {
  id: number;
  el: HTMLElement;
  state: 'idle' | 'armed' | 'playing' | 'done';
  run: (ctx: CrypticRunContext) => () => void;
  stop: (() => void) | null;
  /** Instantly paint final + complete (scroll catch-up). */
  skip: (() => void) | null;
};

let nextId = 1;
const jobs = new Map<number, Job>();
let playingId: number | null = null;
let speedMultiplier = 1;
let behindSince = 0;
let loopRaf = 0;
let scrollBound = false;

function byDocumentOrder(a: HTMLElement, b: HTMLElement): number {
  if (a === b) return 0;
  const pos = a.compareDocumentPosition(b);
  if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
  if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
  return 0;
}

function activeCandidates(): Job[] {
  return Array.from(jobs.values())
    .filter((j) => j.state === 'armed' || j.state === 'playing')
    .sort((a, b) => byDocumentOrder(a.el, b.el));
}

function isElementOnScreen(el: HTMLElement): boolean {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  return r.bottom > 0 && r.top < vh;
}

/** How far the active job has been scrolled past the focus zone. */
function computeCatchUpSpeed(active: Job, waiting: Job[]): number {
  const vh = window.innerHeight || 1;
  const rect = active.el.getBoundingClientRect();
  const focusLine = vh * 0.42;

  const scrolledPast = rect.bottom < focusLine;
  const waitingVisible = waiting.some((j) => isElementOnScreen(j.el));

  if (!scrolledPast && !waitingVisible) {
    behindSince = 0;
    return 1;
  }

  const now = performance.now();
  if (!behindSince) behindSince = now;

  // Distance past focus (in viewport heights) + time spent behind.
  const pastVh = scrolledPast
    ? Math.max(0, (focusLine - rect.bottom) / vh)
    : 0;
  const secondsBehind = (now - behindSince) / 1000;

  // Exponential: ~2× at 0.25vh or ~0.35s, ~8× quickly, hard-cap at 64.
  const fromDistance = Math.pow(2, pastVh * 5);
  const fromTime = Math.pow(2, secondsBehind * 2.2);
  const fromQueue = waitingVisible ? Math.pow(2, 1 + waiting.length * 0.35) : 1;

  return Math.min(64, Math.max(1, fromDistance * fromTime * fromQueue));
}

function bindScroll() {
  if (scrollBound || typeof window === 'undefined') return;
  scrollBound = true;
  const kick = () => {
    if (playingId != null) updateSpeed();
  };
  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', kick, { passive: true });
}

function updateSpeed() {
  const candidates = activeCandidates();
  const active = candidates.find((j) => j.id === playingId);
  if (!active) {
    speedMultiplier = 1;
    behindSince = 0;
    return;
  }
  const waiting = candidates.filter((j) => j.id !== active.id);
  speedMultiplier = computeCatchUpSpeed(active, waiting);

  // Past a threshold, dump the rest of the active job immediately.
  if (speedMultiplier >= 24 && active.skip) {
    active.skip();
  }
}

function ensureLoop() {
  if (loopRaf || typeof window === 'undefined') return;
  const tick = () => {
    if (playingId == null) {
      loopRaf = 0;
      return;
    }
    updateSpeed();
    loopRaf = requestAnimationFrame(tick);
  };
  loopRaf = requestAnimationFrame(tick);
}

function pump() {
  const candidates = activeCandidates();
  if (!candidates.length) {
    playingId = null;
    speedMultiplier = 1;
    behindSince = 0;
    return;
  }

  const head = candidates[0];

  // Someone above the current player just armed — yield to them by
  // skipping the lower job so the sequence can re-order cleanly.
  if (playingId != null && playingId !== head.id) {
    const current = jobs.get(playingId);
    if (current?.state === 'playing' && current.skip) {
      current.skip();
      return;
    }
  }

  if (head.state === 'playing') {
    ensureLoop();
    return;
  }

  head.state = 'playing';
  playingId = head.id;
  bindScroll();
  ensureLoop();

  let finished = false;
  const complete = () => {
    if (finished) return;
    finished = true;
    head.state = 'done';
    head.stop = null;
    head.skip = null;
    if (playingId === head.id) playingId = null;
    speedMultiplier = 1;
    behindSince = 0;
    pump();
  };

  const stop = head.run({
    getSpeed: () => speedMultiplier,
    complete,
  });
  head.stop = stop;
  head.skip = () => {
    stop();
    complete();
  };
}

export function getCrypticSpeed(): number {
  return speedMultiplier;
}

export type CrypticHandle = {
  /** Call when this reveal is allowed to enter the queue (IO / autoPlay). */
  arm: () => void;
  dispose: () => void;
};

/**
 * Register a cryptic job. It stays idle until `arm()`, then plays only when
 * it is the topmost armed job in document order.
 */
export function enqueueCryptic(
  el: HTMLElement,
  run: (ctx: CrypticRunContext) => () => void
): CrypticHandle {
  const id = nextId++;
  const job: Job = {
    id,
    el,
    state: 'idle',
    run,
    stop: null,
    skip: null,
  };
  jobs.set(id, job);

  return {
    arm: () => {
      if (job.state !== 'idle') return;
      job.state = 'armed';
      pump();
    },
    dispose: () => {
      if (job.state === 'playing') {
        job.stop?.();
        if (playingId === id) playingId = null;
      }
      jobs.delete(id);
      if (job.state === 'playing' || job.state === 'armed') {
        speedMultiplier = 1;
        behindSince = 0;
        pump();
      }
    },
  };
}
