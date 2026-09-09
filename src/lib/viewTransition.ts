import { flushSync } from 'react-dom';

interface ViewTransitionLike {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition(): void;
}

/**
 * Typed locally rather than relying on the DOM lib, so this compiles the same
 * across TypeScript versions regardless of when `startViewTransition` landed
 * in `lib.dom.d.ts`.
 */
type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionLike;
};

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Runs a React state update inside a view transition. */
export function withViewTransition(update: () => void): void {
  const doc = document as DocumentWithViewTransition;
  if (!doc.startViewTransition || prefersReducedMotion()) {
    update();
    return;
  }
  doc.startViewTransition(() => flushSync(update));
}

/** Swaps state behind an expanding circular wipe originating at a point. */
export function circularReveal(update: () => void, origin: { x: number; y: number }): void {
  const doc = document as DocumentWithViewTransition;
  if (!doc.startViewTransition || prefersReducedMotion()) {
    update();
    return;
  }

  const transition = doc.startViewTransition(() => flushSync(update));

  transition.ready
    .then(() => {
      const { x, y } = origin;
      /* Reach the furthest corner from the origin, or the circle clips early
         on the far side of the viewport. */
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        {
          duration: 560,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    })
    .catch(() => {
      /* Transition was skipped (interrupted by another one). */
    });
}
