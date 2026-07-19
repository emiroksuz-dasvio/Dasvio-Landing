"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

type SectorItem = {
  icon: string;
  title: string;
  desc: string;
};

type SectorsDict = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: SectorItem[];
};

const photoMap: Record<string, string> = {
  utensils:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&auto=format&fit=crop&q=80",
  coffee:
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&auto=format&fit=crop&q=80",
  pizza:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=80",
  wine: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=900&auto=format&fit=crop&q=80",
  bed: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=900&auto=format&fit=crop&q=80",
  truck:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&auto=format&fit=crop&q=80",
  building:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&auto=format&fit=crop&q=80",
  store:
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&auto=format&fit=crop&q=80",
};

const gradientMap: Record<string, string> = {
  utensils: "linear-gradient(135deg, #18181b, #3f3f46)",
  coffee: "linear-gradient(135deg, #422006, #92400e)",
  pizza: "linear-gradient(135deg, #7c2d12, #c2410c)",
  wine: "linear-gradient(135deg, #1e1b4b, #4338ca)",
  bed: "linear-gradient(135deg, #0c4a6e, #0369a1)",
  truck: "linear-gradient(135deg, #14532d, #166534)",
  building: "linear-gradient(135deg, #581c87, #e11d48)",
  store: "linear-gradient(135deg, #831843, #be185d)",
};

export function Sectors({ t }: { t: SectorsDict }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({
      left: dir === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="sectors" className="py-24 lg:py-32 overflow-hidden">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              {t.eyebrow}
            </div>
            <h2 className="text-balance mt-5 text-[36px] sm:text-[44px] lg:text-[56px] font-light text-fg leading-[1.02] tracking-[-0.02em]">
              {t.title}
            </h2>
            <p className="mt-5 text-[15px] lg:text-[16px] leading-[1.6] text-fg-muted text-pretty">
              {t.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-none">
            <button
              type="button"
              onClick={() => scroll("prev")}
              aria-label="Previous"
              className="size-12 rounded-lg liquid-glass-sm hover:border-[rgba(244,63,94,0.35)] transition flex items-center justify-center"
            >
              <ChevronLeft className="size-5 text-fg" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => scroll("next")}
              aria-label="Next"
              className="size-12 rounded-lg liquid-glass-sm hover:border-[rgba(244,63,94,0.35)] transition flex items-center justify-center"
            >
              <ChevronRight className="size-5 text-fg" strokeWidth={2} />
            </button>
          </div>
        </div>
      </Container>
      <div className="relative mt-14">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
        >
          <ul className="flex gap-4 lg:gap-5 px-5 md:px-8 lg:px-10 pb-6">
            {t.items.map((item) => (
              <li
                key={item.title}
                className="flex-none w-[280px] sm:w-[320px] lg:w-[360px] snap-start"
              >
                <article className="rounded-2xl liquid-glass liquid-card overflow-hidden flex flex-col h-full">
                  <div
                    className="relative aspect-[5/4]"
                    style={{
                      background:
                        gradientMap[item.icon] ??
                        "linear-gradient(135deg, #1c1c1f, #3f3f46)",
                    }}
                  >
                    <Image
                      src={photoMap[item.icon] ?? photoMap.utensils}
                      alt={item.title}
                      fill
                      sizes="360px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-black/40 backdrop-blur px-2.5 py-1 text-[10.5px] font-semibold text-white uppercase tracking-wider border border-white/15">
                      {item.title}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-[18px] font-medium tracking-tight text-fg">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-[1.55] text-fg-muted text-pretty">
                      {item.desc}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
