"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: string; label: string };

type Parsed = {
  prefix: string;
  number: number;
  suffix: string;
};

function parseTarget(value: string): Parsed {
  const cleaned = value.replace(/[.,\s]/g, "");
  const match = cleaned.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value };
  return {
    prefix: match[1] ?? "",
    number: parseInt(match[2], 10),
    suffix: match[3] ?? "",
  };
}

function formatNumber(n: number, locale: string) {
  return n.toLocaleString(locale === "tr" ? "tr-TR" : "en-US");
}

export function AnimatedStats({
  items,
  locale,
}: {
  items: Stat[];
  locale: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mt-20 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0"
    >
      {items.map((item, i) => (
        <StatItem
          key={item.label}
          item={item}
          index={i}
          isFirst={i === 0}
          active={active}
          locale={locale}
        />
      ))}
    </div>
  );
}

function StatItem({
  item,
  index,
  isFirst,
  active,
  locale,
}: {
  item: Stat;
  index: number;
  isFirst: boolean;
  active: boolean;
  locale: string;
}) {
  const target = parseTarget(item.value);
  const delay = index * 220;
  const value = useCountUp(target.number, 1700, active, delay);
  const display = `${target.prefix}${formatNumber(value, locale)}${target.suffix}`;

  return (
    <div
      className={`lg:px-6 ${
        !isFirst ? "lg:border-l lg:border-white/10" : ""
      }`}
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 800ms ease, transform 800ms cubic-bezier(.2,.7,.2,1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="text-[32px] lg:text-[44px] xl:text-[52px] font-light text-fg leading-none tracking-[-0.02em] tabular-nums">
        {display}
      </div>
      <div className="mt-3 text-[13px] lg:text-[14px] text-fg-muted max-w-[200px] leading-snug">
        {item.label}
      </div>
    </div>
  );
}

function useCountUp(
  target: number,
  duration: number,
  active: boolean,
  startDelay: number,
) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) {
      return;
    }
    let rafId: number | null = null;
    let cancelled = false;
    const timeoutId = window.setTimeout(() => {
      const startTime = performance.now();
      const step = (now: number) => {
        if (cancelled) return;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.floor(target * eased));
        if (progress < 1) rafId = requestAnimationFrame(step);
        else setValue(target);
      };
      rafId = requestAnimationFrame(step);
    }, startDelay);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [target, duration, active, startDelay]);
  return active ? value : 0;
}
