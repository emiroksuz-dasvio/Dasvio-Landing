/**
 * Eased programmatic scroll. Native `behavior: "smooth"` rushes long jumps,
 * so we animate scrollY ourselves — duration scales with distance (capped)
 * and eases in/out. Any wheel or touch input cancels the animation so the
 * user never fights it. Steps scroll with `behavior: "instant"` because the
 * CSS `scroll-behavior: smooth` on <html> would re-smooth every frame.
 */
export function smoothScrollTo(targetY: number) {
  const start = window.scrollY;
  const dist = targetY - start;
  if (Math.abs(dist) < 2) return;

  const duration = Math.min(2400, 900 + Math.abs(dist) * 0.4);
  const easeInOut = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  let raf: number | null = null;
  const cancel = () => {
    if (raf !== null) {
      cancelAnimationFrame(raf);
      raf = null;
    }
    cleanup();
  };
  const cleanup = () => {
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
  };
  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });

  let t0: number | null = null;
  const step = (now: number) => {
    if (t0 === null) t0 = now;
    const t = Math.min(1, (now - t0) / duration);
    window.scrollTo({
      top: start + dist * easeInOut(t),
      behavior: "instant" as ScrollBehavior,
    });
    if (t < 1) {
      raf = requestAnimationFrame(step);
    } else {
      raf = null;
      cleanup();
    }
  };
  raf = requestAnimationFrame(step);
}
