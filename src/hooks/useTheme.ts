import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEMES: readonly Theme[] = ['light', 'dark', 'system'];

/** Theme lives in a module-level store rather than a context provider. */
const listeners = new Set<() => void>();

function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && (THEMES as readonly string[]).includes(value);
}

function readStored(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isTheme(stored) ? stored : 'system';
  } catch {
    /* Private-mode Safari throws on localStorage access. */
    return 'system';
  }
}

let current: Theme = readStored();

/** Snapshot must be referentially stable or `useSyncExternalStore` loops. */
let snapshot: { theme: Theme; resolved: ResolvedTheme } = {
  theme: current,
  resolved: resolve(current),
};

function resolve(theme: Theme): ResolvedTheme {
  if (theme !== 'system') return theme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function commit() {
  const resolved = resolve(current);
  document.documentElement.dataset.theme = resolved;
  snapshot = { theme: current, resolved };
  listeners.forEach((listener) => listener());
}

export function setTheme(next: Theme) {
  current = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* Storage unavailable — the theme still applies for this session. */
  }
  commit();
}

/* Track the OS preference so "system" stays live without a component mounted. */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (current === 'system') commit();
});

/* Keep duplicate tabs in sync — change the theme in one, it moves in all. */
window.addEventListener('storage', (event) => {
  if (event.key !== STORAGE_KEY || !isTheme(event.newValue)) return;
  current = event.newValue;
  commit();
});

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

const getSnapshot = () => snapshot;

export function useTheme() {
  const { theme, resolved } = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return { theme, resolved, setTheme: useCallback(setTheme, []), themes: THEMES };
}

/** Read the current resolved theme outside React (used by the canvas loop). */
export const getResolvedTheme = (): ResolvedTheme => snapshot.resolved;
