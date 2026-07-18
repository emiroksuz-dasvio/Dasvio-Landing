"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const t = window.setTimeout(() => setActive(true), startDelay);
    return () => window.clearTimeout(t);
  }, [startDelay]);

  const titleWords = title.trim().split(/\s+/);
  const accentWords = accent.trim().split(/\s+/);
  const totalWords = titleWords.length + accentWords.length;

  return (
    <h1 className={className}>
      {titleWords.map((word, i) => (
        <AnimWord key={`t-${i}`} delay={i * wordDelay} active={active}>
          {word}
          {i < titleWords.length - 1 ? " " : " "}
        </AnimWord>
      ))}
      <span className="text-accent">
        {accentWords.map((word, i) => (
          <AnimWord
            key={`a-${i}`}
            delay={(titleWords.length + i) * wordDelay}
            active={active}
          >
            {word}
            {i < accentWords.length - 1 ? " " : ""}
          </AnimWord>
        ))}
      </span>
      <AnimWord delay={totalWords * wordDelay} active={active}>
        .
      </AnimWord>
    </h1>
  );
}

function AnimWord({
  children,
  delay,
  active,
}: {
  children: React.ReactNode;
  delay: number;
  active: boolean;
}) {
  return (
    <span
      className="inline-block"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(0.4em)",
        filter: active ? "blur(0)" : "blur(8px)",
        transition:
          "opacity 700ms ease, transform 700ms cubic-bezier(.2,.7,.2,1), filter 600ms ease",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </span>
  );
}
