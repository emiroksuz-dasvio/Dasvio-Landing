"use client";

/**
 * Motion is intentionally ALWAYS enabled — the site ignores the OS
 * `prefers-reduced-motion` setting so the parallax, headline, count-up and
 * reveal animations play for every visitor.
 *
 * To restore reduced-motion support, replace the body with a real check:
 *   return useSyncExternalStore(subscribe, getSnapshot, () => false);
 * (subscribing to `window.matchMedia("(prefers-reduced-motion: reduce)")`).
 */
export function useReducedMotion(): boolean {
  return false;
}
