"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function AnimatedHeadline({
  title,
  accent,
  className,
  wordDelay = 110,
  startDelay = 80,
}: {
  title: string;
  accent: string;
  className?: string;
  wordDelay?: number;
  startDelay?: number;
}) {
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => setActive(true), startDelay);
    return () => window.clearTimeout(t);
  }, [startDelay, reduced]);

  const titleWords = title.trim().split(/\s+/);
  const accentWords = accent.trim().split(/\s+/);
  const totalWords = titleWords.length + accentWords.length;

  return (
    <h1 className={className}>
      {titleWords.map((word, i) => (
        <AnimWord key={`t-${i}`} delay={i * wordDelay} active={active} reduced={reduced}>
          {word}
          {i < titleWords.length - 1 ? " " : " "}
        </AnimWord>
      ))}
      <span className="text-accent">
        {accentWords.map((word, i) => (
          <AnimWord
            key={`a-${i}`}
            delay={(titleWords.length + i) * wordDelay}
            active={active} reduced={reduced}
          >
            {word}
            {i < accentWords.length - 1 ? " " : ""}
          </AnimWord>
        ))}
      </span>
      <AnimWord delay={totalWords * wordDelay} active={active} reduced={reduced}>
        .
      </AnimWord>
    </h1>
  );
}

function AnimWord({
  children,
  delay,
  active,
  reduced,
}: {
  children: React.ReactNode;
  delay: number;
  active: boolean;
  reduced?: boolean;
}) {
  return (
    <span
      className="inline-block"
      style={{
        opacity: reduced || active ? 1 : 0,
        transform: reduced || active ? "translateY(0)" : "translateY(0.4em)",
        filter: reduced || active ? "blur(0)" : "blur(8px)",
        transition: reduced
          ? "none"
          : `opacity 700ms ease ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, filter 600ms ease ${delay}ms`,
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </span>
  );
}
