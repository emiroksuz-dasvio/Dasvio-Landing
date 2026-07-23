"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  QrCode,
  Cpu,
  Building2,
  Plug,
  BarChart3,
  MonitorPlay,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getProducts, type ProductSlug } from "@/lib/products";
import type { Locale } from "@/i18n/config";

type FeatureItem = {
  icon: string;
  title: string;
  description: string;
  tags: string[];
};

type FeaturesDict = {
  eyebrow: string;
  title: string;
  subtitle: string;
  featuresLabel: string;
  items: FeatureItem[];
};

type ProblemDict = {
  eyebrow: string;
  title: string;
  body: string;
};

const iconMap: Record<string, LucideIcon> = {
  qr: QrCode,
  pos: Cpu,
  branch: Building2,
  plug: Plug,
  chart: BarChart3,
  screen: MonitorPlay,
};

/**
 * Each homepage feature tab is the summary of a product page, so the hero
 * visual and the four sub-cards come straight from the product record rather
 * than being restated here — one copy to translate, one copy to keep correct.
 */
const productByIcon: Record<string, ProductSlug> = {
  qr: "qr-menu",
  pos: "pos",
  branch: "multi-branch",
  plug: "integrations",
  chart: "analytics",
  screen: "signage",
};

export function FeatureGrid({
  t,
  problem,
  locale,
}: {
  t: FeaturesDict;
  problem: ProblemDict;
  locale: Locale;
}) {
  const [active, setActive] = useState(0);
  const current = t.items[active];
  const product = getProducts(locale)[productByIcon[current.icon]];
  const Visual = product?.MainVisual;
  const subs = product?.subCards ?? [];

  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-radial-fade pointer-events-none"
        aria-hidden
      />
      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              {problem.eyebrow}
            </div>
            <h2 className="text-balance mt-5 text-[32px] sm:text-[40px] lg:text-[48px] font-light leading-[1.05] tracking-[-0.02em]">
              {problem.title}
            </h2>
            <p className="mt-5 text-[15px] lg:text-[16px] leading-[1.6] text-fg-muted text-pretty">
              {problem.body}
            </p>
          </div>
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              {t.eyebrow}
            </div>
            <h2 className="text-balance mt-5 text-[32px] sm:text-[40px] lg:text-[48px] font-light leading-[1.05] tracking-[-0.02em]">
              {t.title}
            </h2>
            <p className="mt-5 text-[15px] lg:text-[16px] leading-[1.6] text-fg-muted text-pretty">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-2 justify-center">
          {t.items.map((item, i) => {
            const isActive = i === active;
            const Icon = iconMap[item.icon] ?? QrCode;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(i)}
                className={clsx(
                  "inline-flex items-center gap-2 h-11 px-5 rounded-lg border text-[14.5px] font-medium transition",
                  isActive
                    ? "bg-accent text-accent-fg border-accent shadow-[0_2px_12px_rgba(244,63,94,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]"
                    : "bg-[rgba(244,63,94,0.06)] text-fg-muted border-[rgba(244,63,94,0.18)] hover:text-fg hover:bg-[rgba(244,63,94,0.12)] hover:border-[rgba(244,63,94,0.35)] backdrop-blur-sm",
                )}
              >
                <Icon className="size-4" strokeWidth={2} />
                {item.title}
              </button>
            );
          })}
        </div>

        <div className="mt-12 lg:mt-16 rounded-2xl liquid-glass p-8 lg:p-14 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
          <div className="rounded-xl mockup-container p-6 lg:p-10 flex items-center justify-center min-h-[440px] lg:min-h-[560px]">
            {Visual && <Visual locale={locale} />}
          </div>
          <div>
            <h3 className="text-[32px] lg:text-[52px] xl:text-[60px] font-light tracking-tight leading-[1.02] text-pretty">
              {current.title}
            </h3>
            <p className="mt-6 text-[16px] lg:text-[19px] leading-[1.6] text-fg-muted text-pretty">
              {current.description}
            </p>
            <div className="mt-9 text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              {t.featuresLabel}
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {current.tags.map((tag) => (
                <div
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-lg liquid-glass-sm px-4 py-2"
                >
                  <span className="size-1.5 rounded-full bg-accent" />
                  <div className="text-[13.5px] font-medium text-fg">{tag}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 lg:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {subs.map((sc) => (
            <div
              key={sc.title}
              className="rounded-2xl liquid-glass liquid-card p-7 lg:p-9 flex flex-col"
            >
              <div className="rounded-2xl mockup-container p-5 min-h-[220px] flex items-center justify-center">
                <sc.Visual locale={locale} />
              </div>
              <h4 className="mt-7 text-[19px] lg:text-[21px] font-medium tracking-tight text-pretty">
                {sc.title}
              </h4>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-fg-muted text-pretty">
                {sc.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
