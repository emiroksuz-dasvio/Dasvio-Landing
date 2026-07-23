"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

/**
 * Runs synchronously as the first thing in <body>, before any content paints,
 * so the correct theme is on <html> from the very first frame — no flash of
 * dark before a stored light preference is read. Kept in sync with `toggle()`
 * below: same storage key, same attribute.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

/**
 * The <html data-theme> attribute *is* the store — there is exactly one of it,
 * the init script above populates it before hydration, and CSS reads it
 * directly. So instead of mirroring it into React state (which needs a provider
 * someone can forget to mount, and a setState-in-effect to resync), we read it
 * through useSyncExternalStore. `useTheme()` works anywhere, no provider.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

// SSR and the hydration pass both render the dark variant; React re-renders
// once with the real value if the visitor's stored theme turns out to be light.
const getServerSnapshot = (): Theme => "dark";

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode / storage disabled — the toggle still works for this page view.
    }
    for (const listener of listeners) listener();
  }, []);

  return { theme, toggle };
}
