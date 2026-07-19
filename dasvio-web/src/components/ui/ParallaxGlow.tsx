"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Page-wide atmospheric depth. A layer of soft rose glow blobs sits behind the
 * glass content (-z-10) and drifts slower than the page on scroll, giving the
 * black background cinematic depth without anything distracting "moving." Blobs
 * are document-anchored so each region of the page keeps its own pool of light;
 * the opaque sections (Testimonials, About, DemoForm, Trust) naturally read as
 * quiet interludes between them. Motion always plays (see useReducedMotion).
 */
const BLOBS = [
  { pos: "top-[4%] -left-[10%] size-[40rem] bg-accent/10", factor: 0.06 },
  { pos: "top-[22%] -right-[12%] size-[44rem] bg-accent/[0.07]", factor: 0.14 },
  { pos: "top-[42%] -left-[8%] size-[38rem] bg-accent/[0.08]", factor: 0.1 },
  { pos: "top-[60%] -right-[10%] size-[42rem] bg-accent/[0.06]", factor: 0.16 },
  { pos: "top-[80%] -left-[6%] size-[36rem] bg-accent/[0.07]", factor: 0.1 },
];

export function ParallaxGlow() {
  const reduced = useReducedMotion();
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      for (let i = 0; i < refs.current.length; i++) {
        const el = refs.current[i];
        if (el) el.style.transform = `translate3d(0, ${y * BLOBS[i].factor}px, 0)`;
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {BLOBS.map((b, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={`absolute rounded-full blur-[100px] will-change-transform ${b.pos}`}
        />
      ))}
    </div>
  );
}
