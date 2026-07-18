"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; n: number; title: string };

export function PolicyTOC({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-fg-muted mb-4">
        İçindekiler
      </div>
      <ol className="space-y-0.5">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`group flex items-baseline gap-2.5 py-1.5 px-3 rounded-lg text-[13px] leading-[1.4] transition-all ${
                  isActive
                    ? "text-fg bg-white/[0.04]"
                    : "text-fg-muted hover:text-fg hover:bg-white/[0.02]"
                }`}
              >
                <span
                  className={`text-[10.5px] font-bold tabular-nums flex-none w-5 ${
                    isActive ? "text-accent" : "text-fg-subtle"
                  }`}
                >
                  {String(it.n).padStart(2, "0")}
                </span>
                <span className="text-pretty">{it.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
