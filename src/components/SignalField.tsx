import { useEffect, useRef, type ReactElement } from 'react';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { useTheme } from '../hooks/useTheme';
import './SignalField.css';

/** Section keys that retune the waveform. */
export type Signature = 'about' | 'projects' | 'work' | 'contact';

/** Per-trace harmonic composition. Amplitudes are in CSS pixels. */
interface Harmonic {
  freq: number;
  amp: number;
  speed: number;
  phase: number;
}

interface Trace {
  /** Vertical position as a fraction of viewport height. */
  baseline: number;
  harmonics: Harmonic[];
  /** Which token drives this trace's stroke. */
  tone: 'signal' | 'dim';
  weight: number;
  alpha: number;
}

const TAU = Math.PI * 2;

const TRACES: Trace[] = [
  {
    baseline: 0.28,
    tone: 'dim',
    weight: 1,
    alpha: 0.34,
    harmonics: [
      { freq: 2.1, amp: 38, speed: 0.18, phase: 0 },
      { freq: 5.3, amp: 13, speed: -0.31, phase: 1.7 },
      { freq: 11.7, amp: 5, speed: 0.44, phase: 3.1 },
    ],
  },
  {
    baseline: 0.5,
    tone: 'signal',
    weight: 1.5,
    alpha: 0.58,
    harmonics: [
      { freq: 1.4, amp: 54, speed: 0.12, phase: 0.8 },
      { freq: 3.7, amp: 21, speed: -0.22, phase: 2.4 },
      { freq: 8.9, amp: 8, speed: 0.37, phase: 0.3 },
      { freq: 19.3, amp: 2.5, speed: -0.55, phase: 4.2 },
    ],
  },
  {
    baseline: 0.73,
    tone: 'dim',
    weight: 1,
    alpha: 0.26,
    harmonics: [
      { freq: 2.9, amp: 30, speed: -0.15, phase: 2.2 },
      { freq: 6.1, amp: 11, speed: 0.27, phase: 4.9 },
      { freq: 13.3, amp: 4, speed: -0.41, phase: 1.1 },
    ],
  },
];

/**
 * Each section detunes the field. Switching tabs visibly retunes the trace
 * over roughly a second, so the background is bound to app state instead of
 * being decorative wallpaper.
 */
const SIGNATURES: Record<Signature, { freq: number; amp: number; speed: number }> = {
  about: { freq: 1, amp: 1, speed: 1 },
  projects: { freq: 1.9, amp: 0.7, speed: 1.35 },
  work: { freq: 0.62, amp: 1.05, speed: 0.72 },
  contact: { freq: 2.8, amp: 0.5, speed: 0.5 },
};

const GRID_MINOR = 44;
const GRID_MAJOR = 220;
/** Radius, in px, over which the pointer bends nearby traces. */
const PROBE_RADIUS = 260;

export const SignalField = ({ signature }: { signature: Signature }): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { resolved } = useTheme();

  /**
   * Everything the animation loop mutates lives in refs. The loop runs at
   * 60fps and must never touch React state — a single `setState` per frame
   * here would re-render the whole tree 60 times a second.
   */
  const pointer = useRef({ x: -9999, y: -9999, strength: 0, targetStrength: 0 });
  const tuning = useRef({ ...SIGNATURES.about });
  const target = useRef({ ...SIGNATURES.about });

  /* Retune toward the active section. Written to a ref, eased in the loop. */
  useEffect(() => {
    target.current = SIGNATURES[signature];
  }, [signature]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let start = performance.now();
    let elapsed = 0;
    /* Amplitude scales with viewport width. The harmonics are defined in
       normalised x, so on a phone the same waveform compresses into a third
       of the space and, at full amplitude, would slice straight through the
       headline. */
    let widthScale = 1;

    /**
     * Stroke colours are read straight off the design tokens, so `tokens.css`
     * stays the single source of truth for the palette — the canvas has no
     * hard-coded colour of its own. Alpha is applied via `globalAlpha` so the
     * token values need no parsing.
     */
    let palette = { signal: '', dim: '', grid: '' };
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      palette = {
        signal: cs.getPropertyValue('--signal').trim(),
        dim: cs.getPropertyValue('--signal-dim').trim(),
        grid: cs.getPropertyValue('--line-hairline').trim(),
      };
    };

    const resize = () => {
      /* Cap DPR at 2: beyond that the extra pixels cost real frame time and
         buy nothing perceptible on a soft-focus background. */
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      widthScale = Math.max(0.42, Math.min(1, width / 1200));
    };

    const drawGrid = () => {
      ctx.save();
      ctx.strokeStyle = palette.grid;
      ctx.lineWidth = 1;

      /* Minor graticule. Offset by 0.5px so 1px lines land on a pixel
         boundary and stay crisp instead of smearing across two. */
      ctx.globalAlpha = 0.28;
      ctx.beginPath();
      for (let x = GRID_MINOR; x < width; x += GRID_MINOR) {
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, height);
      }
      for (let y = GRID_MINOR; y < height; y += GRID_MINOR) {
        ctx.moveTo(0, Math.round(y) + 0.5);
        ctx.lineTo(width, Math.round(y) + 0.5);
      }
      ctx.stroke();

      /* Major divisions, as on a scope face. */
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      for (let x = GRID_MAJOR; x < width; x += GRID_MAJOR) {
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, height);
      }
      for (let y = GRID_MAJOR; y < height; y += GRID_MAJOR) {
        ctx.moveTo(0, Math.round(y) + 0.5);
        ctx.lineTo(width, Math.round(y) + 0.5);
      }
      ctx.stroke();
      ctx.restore();
    };

    /** Sample one trace's vertical displacement at a given x. */
    const sample = (trace: Trace, x: number, t: number) => {
      const nx = x / width;
      const { freq, amp, speed } = tuning.current;

      let y = 0;
      for (const h of trace.harmonics) {
        y +=
          h.amp *
          amp *
          widthScale *
          Math.sin(nx * h.freq * freq * TAU + t * h.speed * speed + h.phase);
      }

      /* Taper toward the edges so traces read as a captured window rather
         than as wallpaper that happens to be clipped. */
      y *= 0.35 + 0.65 * Math.sin(nx * Math.PI);

      const base = trace.baseline * height;
      const p = pointer.current;
      if (p.strength > 0.001) {
        /* Gaussian probe: the trace is drawn toward the cursor, strongest at
           the cursor and falling off smoothly in both axes. */
        const dx = (x - p.x) / PROBE_RADIUS;
        const dy = (base - p.y) / PROBE_RADIUS;
        const falloff = Math.exp(-(dx * dx + dy * dy) * 1.4);
        y += falloff * (p.y - base) * 0.55 * p.strength;
      }

      return base + y;
    };

    const drawTrace = (trace: Trace, t: number) => {
      ctx.beginPath();
      /* 3px steps: past this the curve is visually smooth and the sample
         count halves. */
      for (let x = 0; x <= width; x += 3) {
        const y = sample(trace, x, t);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const color = trace.tone === 'signal' ? palette.signal : palette.dim;
      ctx.strokeStyle = color;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      /* Bloom pass, then the filament. Two strokes are far cheaper than
         `shadowBlur`, which forces a full-canvas blur every frame. */
      ctx.globalAlpha = trace.alpha * 0.14;
      ctx.lineWidth = trace.weight * 9;
      ctx.stroke();

      ctx.globalAlpha = trace.alpha * 0.3;
      ctx.lineWidth = trace.weight * 3.5;
      ctx.stroke();

      ctx.globalAlpha = trace.alpha;
      ctx.lineWidth = trace.weight;
      ctx.stroke();
    };

    const render = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      /* Additive blending makes overlapping traces bloom on a dark
         enclosure. On paper it would just blow out to white. */
      ctx.globalCompositeOperation = resolved === 'dark' ? 'lighter' : 'source-over';
      for (const trace of TRACES) drawTrace(trace, t);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      elapsed = (now - start) / 1000;

      /* Critically-damped-ish easing toward the active section's tuning and
         the pointer's target strength. Frame-rate independent enough for a
         background; exact timing is not load-bearing here. */
      const k = 0.045;
      const tune = tuning.current;
      const goal = target.current;
      tune.freq += (goal.freq - tune.freq) * k;
      tune.amp += (goal.amp - tune.amp) * k;
      tune.speed += (goal.speed - tune.speed) * k;

      const p = pointer.current;
      p.strength += (p.targetStrength - p.strength) * 0.08;

      render(elapsed);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const play = () => {
      if (frame || reducedMotion) return;
      /* Rebase the clock so the wave resumes where it paused instead of
         jumping forward by however long the tab was hidden. */
      start = performance.now() - elapsed * 1000;
      frame = requestAnimationFrame(loop);
    };

    const onVisibility = () => (document.hidden ? stop() : play());

    const onPointerMove = (event: PointerEvent) => {
      const p = pointer.current;
      p.x = event.clientX;
      p.y = event.clientY;
      p.targetStrength = 1;
    };

    const onPointerLeave = () => {
      pointer.current.targetStrength = 0;
    };

    readPalette();
    resize();

    const observer = new ResizeObserver(() => {
      resize();
      if (reducedMotion) render(0);
    });
    observer.observe(canvas);

    document.addEventListener('visibilitychange', onVisibility);
    /* Fine pointers only — on touch, `pointermove` only fires mid-drag, so
       the probe would flicker on during scrolls and never settle. */
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (finePointer && !reducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerleave', onPointerLeave);
      window.addEventListener('blur', onPointerLeave);
    }

    if (reducedMotion) render(0);
    else play();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
    };
  }, [reducedMotion, resolved]);

  return (
    <div className="signal-field" aria-hidden="true">
      <canvas ref={canvasRef} className="signal-field__canvas" />
      <div className="signal-field__vignette" />
    </div>
  );
};
