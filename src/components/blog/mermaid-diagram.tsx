'use client';

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { useBlogTheme } from '@/components/blog/blog-theme';

type MermaidDiagramProps = {
  chart: string;
  className?: string;
  'aria-label'?: string;
};

/** User zoom relative to the auto-fit scale (1 = everything in view). */
const MIN_USER_ZOOM = 0.4;
const MAX_USER_ZOOM = 8;
const BUTTON_ZOOM_STEP = 0.15;
/** Wheel sensitivity — lower = slower. Tuned for trackpads + mice. */
const WHEEL_ZOOM_SENSITIVITY = 0.0024;
const FIT_PADDING = 0.92;

function themeVariables(theme: 'light' | 'dark') {
  if (theme === 'light') {
    return {
      primaryColor: '#f4f0ea',
      primaryTextColor: '#2b2521',
      primaryBorderColor: '#d9d0c4',
      secondaryColor: '#ffffff',
      tertiaryColor: '#efe8df',
      lineColor: '#8a8178',
      textColor: '#4a443f',
      mainBkg: '#ffffff',
      nodeBorder: '#d9d0c4',
      clusterBkg: '#f4f0ea',
      clusterBorder: '#d9d0c4',
      titleColor: '#2b2521',
      edgeLabelBackground: '#f4f0ea',
    };
  }

  return {
    primaryColor: '#332d29',
    primaryTextColor: '#f4f0ea',
    primaryBorderColor: '#3a342f',
    secondaryColor: '#26221f',
    tertiaryColor: '#1e1b18',
    lineColor: '#8a8178',
    textColor: '#d2c9bf',
    mainBkg: '#26221f',
    nodeBorder: '#3a342f',
    clusterBkg: '#1e1b18',
    clusterBorder: '#3a342f',
    titleColor: '#f4f0ea',
    edgeLabelBackground: '#1e1b18',
  };
}

function clampUserZoom(value: number) {
  return Math.min(
    MAX_USER_ZOOM,
    Math.max(MIN_USER_ZOOM, Math.round(value * 1000) / 1000),
  );
}

function measureSvgSize(svgEl: SVGSVGElement) {
  const viewBox = svgEl.viewBox?.baseVal;
  if (viewBox && viewBox.width > 0 && viewBox.height > 0) {
    return { width: viewBox.width, height: viewBox.height };
  }

  const attrW = Number.parseFloat(svgEl.getAttribute('width') || '');
  const attrH = Number.parseFloat(svgEl.getAttribute('height') || '');
  if (attrW > 0 && attrH > 0) {
    return { width: attrW, height: attrH };
  }

  try {
    const box = svgEl.getBBox();
    if (box.width > 0 && box.height > 0) {
      return { width: box.width, height: box.height };
    }
  } catch {
    /* getBBox can throw if not in DOM */
  }

  const rect = svgEl.getBoundingClientRect();
  return {
    width: rect.width || 1,
    height: rect.height || 1,
  };
}

function Toolbar({
  zoomPercent,
  isExpanded,
  onZoomOut,
  onZoomIn,
  onReset,
  onToggleExpand,
}: {
  zoomPercent: number;
  isExpanded: boolean;
  onZoomOut: () => void;
  onZoomIn: () => void;
  onReset: () => void;
  onToggleExpand: () => void;
}) {
  return (
    <div
      className='blog-mermaid__toolbar'
      role='toolbar'
      aria-label='Diagram controls'
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        type='button'
        className='blog-mermaid__btn'
        onClick={onZoomOut}
        aria-label='Zoom out'
        title='Zoom out'
      >
        −
      </button>
      <button
        type='button'
        className='blog-mermaid__btn blog-mermaid__btn--label'
        onClick={onReset}
        aria-label='Fit diagram in view'
        title='Fit to view'
      >
        {zoomPercent}%
      </button>
      <button
        type='button'
        className='blog-mermaid__btn'
        onClick={onZoomIn}
        aria-label='Zoom in'
        title='Zoom in'
      >
        +
      </button>
      <span className='blog-mermaid__toolbar-sep' aria-hidden='true' />
      <button
        type='button'
        className='blog-mermaid__btn blog-mermaid__btn--wide'
        onClick={onToggleExpand}
        aria-label={isExpanded ? 'Exit fullscreen' : 'Enter fullscreen'}
        title={isExpanded ? 'Exit fullscreen' : 'Fullscreen'}
      >
        {isExpanded ? 'Exit' : 'Full'}
      </button>
    </div>
  );
}

function DiagramViewport({
  svg,
  fitScale,
  userZoom,
  pan,
  isPanning,
  onFitScale,
  onWheelZoom,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  svg: string;
  fitScale: number;
  userZoom: number;
  pan: { x: number; y: number };
  isPanning: boolean;
  onFitScale: (scale: number) => void;
  onWheelZoom: (deltaY: number) => void;
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const svgHostRef = useRef<HTMLDivElement>(null);

  const recomputeFit = useCallback(() => {
    const viewport = viewportRef.current;
    const svgEl = svgHostRef.current?.querySelector('svg');
    if (!viewport || !svgEl) return;

    const { width: svgW, height: svgH } = measureSvgSize(svgEl);
    const pad = 24;
    const viewW = Math.max(viewport.clientWidth - pad * 2, 1);
    const viewH = Math.max(viewport.clientHeight - pad * 2, 1);
    const next = Math.min(viewW / svgW, viewH / svgH) * FIT_PADDING;
    if (Number.isFinite(next) && next > 0) {
      onFitScale(next);
    }
  }, [onFitScale]);

  useLayoutEffect(() => {
    if (!svg) return;
    recomputeFit();
  }, [svg, recomputeFit]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => {
      recomputeFit();
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [recomputeFit, svg]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      const allow =
        event.ctrlKey ||
        event.metaKey ||
        Boolean(el.closest('.blog-mermaid--expanded'));
      if (!allow) return;
      event.preventDefault();
      onWheelZoom(event.deltaY);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [onWheelZoom]);

  const scale = fitScale * userZoom;

  return (
    <div
      ref={viewportRef}
      className={[
        'blog-mermaid__viewport',
        isPanning ? 'blog-mermaid__viewport--panning' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {svg ? (
        <div
          className='blog-mermaid__stage'
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          }}
        >
          <div
            ref={svgHostRef}
            className='blog-mermaid__svg'
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      ) : (
        <div className='blog-mermaid__loading' aria-hidden>
          Loading diagram…
        </div>
      )}
    </div>
  );
}

function ExpandedOverlay({
  children,
  label,
  onClose,
}: {
  children: ReactNode;
  label: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className='blog-mermaid-overlay'
      role='dialog'
      aria-modal='true'
      aria-label={label}
    >
      <button
        type='button'
        className='blog-mermaid-overlay__backdrop'
        aria-label='Close fullscreen diagram'
        onClick={onClose}
      />
      <div className='blog-mermaid-overlay__panel'>{children}</div>
    </div>,
    document.body,
  );
}

export function MermaidDiagram({
  chart,
  className,
  'aria-label': ariaLabel = 'Diagram',
}: MermaidDiagramProps) {
  const { theme } = useBlogTheme();
  const reactId = useId().replace(/:/g, '');
  const renderCount = useRef(0);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const [svg, setSvg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fitScale, setFitScale] = useState(1);
  const [userZoom, setUserZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    renderCount.current += 1;
    const renderId = `mermaid-${reactId}-${theme}-${renderCount.current}`;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: theme === 'light' ? 'neutral' : 'dark',
          fontFamily: 'var(--blog-font-body), Inter, system-ui, sans-serif',
          themeVariables: themeVariables(theme),
          flowchart: {
            curve: 'basis',
            padding: 12,
            htmlLabels: true,
            nodeSpacing: 36,
            rankSpacing: 48,
            useMaxWidth: false,
          },
        });

        const { svg: rendered } = await mermaid.render(
          renderId,
          chart.trim(),
        );

        if (!cancelled) {
          setSvg(rendered);
          setError(null);
          setUserZoom(1);
          setPan({ x: 0, y: 0 });
        }
      } catch (err) {
        if (!cancelled) {
          setSvg('');
          setError(
            err instanceof Error ? err.message : 'Failed to render diagram',
          );
        }
      }
    }

    void render();
    return () => {
      cancelled = true;
    };
  }, [chart, theme, reactId]);

  const resetView = useCallback(() => {
    setUserZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const zoomByStep = useCallback((delta: number) => {
    setUserZoom((z) => clampUserZoom(z + delta));
  }, []);

  const onWheelZoom = useCallback((deltaY: number) => {
    setUserZoom((z) => {
      const factor = Math.exp(-deltaY * WHEEL_ZOOM_SENSITIVITY);
      return clampUserZoom(z * factor);
    });
  }, []);

  const closeExpanded = useCallback(() => {
    setIsExpanded(false);
    setUserZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const toggleExpand = useCallback(() => {
    setIsExpanded((open) => {
      if (open) {
        setUserZoom(1);
        setPan({ x: 0, y: 0 });
        return false;
      }
      setUserZoom(1);
      setPan({ x: 0, y: 0 });
      return true;
    });
  }, []);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: pan.x,
        originY: pan.y,
      };
      setIsPanning(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [pan.x, pan.y],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      setPan({
        x: drag.originX + (event.clientX - drag.startX),
        y: drag.originY + (event.clientY - drag.startY),
      });
    },
    [],
  );

  const endPan = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setIsPanning(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const controls = (
    <>
      <Toolbar
        zoomPercent={Math.round(userZoom * 100)}
        isExpanded={isExpanded}
        onZoomOut={() => zoomByStep(-BUTTON_ZOOM_STEP)}
        onZoomIn={() => zoomByStep(BUTTON_ZOOM_STEP)}
        onReset={resetView}
        onToggleExpand={isExpanded ? closeExpanded : toggleExpand}
      />
      <DiagramViewport
        svg={svg}
        fitScale={fitScale}
        userZoom={userZoom}
        pan={pan}
        isPanning={isPanning}
        onFitScale={setFitScale}
        onWheelZoom={onWheelZoom}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPan}
      />
      <p className='blog-mermaid__hint'>
        Drag to pan · Ctrl/⌘+scroll to zoom · % resets to fit
        {isExpanded ? ' · Esc to exit' : ' · Full for fullscreen'}
      </p>
    </>
  );

  if (error) {
    return (
      <figure
        className={['blog-mermaid', className].filter(Boolean).join(' ')}
        aria-label={ariaLabel}
      >
        <pre className='blog-mermaid__fallback'>
          <code>{chart.trim()}</code>
        </pre>
      </figure>
    );
  }

  return (
    <>
      <figure
        className={[
          'blog-mermaid',
          isExpanded ? 'blog-mermaid--inline-hidden' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label={ariaLabel}
        aria-hidden={isExpanded || undefined}
      >
        {isExpanded ? (
          <div className='blog-mermaid__loading' aria-hidden>
            Open in fullscreen…
          </div>
        ) : (
          controls
        )}
      </figure>

      {mounted && isExpanded ? (
        <ExpandedOverlay label={ariaLabel} onClose={closeExpanded}>
          <div className='blog-mermaid blog-mermaid--expanded'>{controls}</div>
        </ExpandedOverlay>
      ) : null}
    </>
  );
}
