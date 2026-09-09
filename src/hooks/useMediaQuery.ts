import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribes to a media query through `useSyncExternalStore` rather than the
 * usual `useState` + `useEffect` pair.
 *
 * The difference matters: with `useState`, the first paint renders a guessed
 * value and a layout effect corrects it, which tears under concurrent
 * rendering. `useSyncExternalStore` reads the live value during render and
 * React guarantees every component in a pass sees the same snapshot.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onStoreChange);
      return () => mq.removeEventListener('change', onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  /** Pre-hydration and non-browser renders resolve to "no preference". */
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True when the visitor has asked the OS to minimise animation. */
export const usePrefersReducedMotion = (): boolean =>
  useMediaQuery('(prefers-reduced-motion: reduce)');
