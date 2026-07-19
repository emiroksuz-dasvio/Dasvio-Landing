"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Direction = "up" | "down" | "left" | "right" | "scale";

export function Reveal({
  children,
  delay = 0,
  duration = 800,
  direction = "up",
  distance = 24,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setActive(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, reduced]);

  const transform = reduced
    ? "none"
    : active
    ? "translate3d(0,0,0) scale(1)"
    : direction === "up"
      ? `translate3d(0, ${distance}px, 0) scale(1)`
      : direction === "down"
        ? `translate3d(0, -${distance}px, 0) scale(1)`
        : direction === "left"
          ? `translate3d(${distance}px, 0, 0) scale(1)`
          : direction === "right"
            ? `translate3d(-${distance}px, 0, 0) scale(1)`
            : `translate3d(0,0,0) scale(0.94)`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: reduced || active ? 1 : 0,
        transform,
        transition: reduced
          ? "none"
          : `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

export function RevealStagger({
  children,
  step = 90,
  startDelay = 0,
  direction = "up",
  className,
}: {
  children: React.ReactNode[];
  step?: number;
  startDelay?: number;
  direction?: Direction;
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal
          key={i}
          delay={startDelay + i * step}
          direction={direction}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
}
