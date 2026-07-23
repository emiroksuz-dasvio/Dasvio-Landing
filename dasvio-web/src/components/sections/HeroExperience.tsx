"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { Check, ChevronDown, CreditCard, Monitor, Smartphone, Store } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AnimatedStats } from "@/components/ui/AnimatedStats";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { HeroDeviceScene } from "@/components/sections/HeroDeviceScene";
import { smoothScrollTo } from "@/lib/smooth-scroll";

type JourneyStage = {
  label: string;
  device: string;
  title: string;
  desc: string;
  chip: string;
  points: string[];
};

type HeroDict = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustBadge: string;
  ctaNote: string;
  journey: {
    hint: string;
    explore: string;
    stages: JourneyStage[];
  };
};

type StatsDict = {
  items: { value: string; label: string }[];
};

/* ── Scroll choreography ─────────────────────────────────────────────
   One 0→1 progress value over a 460vh track drives everything. The intro
   owns 0→0.12; each device stage owns a WINDOWS entry. The 3D scene in
   HeroDeviceScene.tsx keeps its own copy of WINDOWS — keep them in sync. */
const WINDOWS: { in: [number, number]; out: [number, number] }[] = [
  { in: [0.1, 0.16], out: [0.3, 0.36] },
  { in: [0.36, 0.42], out: [0.54, 0.6] },
  { in: [0.6, 0.66], out: [0.76, 0.82] },
  { in: [0.82, 0.88], out: [1.5, 1.6] }, // last stage never fades out
];

/* Scroll targets for the progress dots (center of each stage window). */
const STAGE_CENTERS = [0.21, 0.47, 0.7, 0.93];

/* Deep link per stage — the page that tells this device's full story. */
const STAGE_LINKS = [
  "products/analytics",
  "products/qr-menu",
  "products/pos",
  "solutions/fast-food",
];

/* Journey preview icons shown as intro chips (same order as stages). */
const STAGE_ICONS = [Monitor, Smartphone, CreditCard, Store];

/* Ambient dust — fixed positions so SSR and client agree. */
const PARTICLES = [
  { left: "12%", top: "26%", size: 4, delay: "0s", alt: false },
  { left: "22%", top: "68%", size: 3, delay: "1.2s", alt: true },
  { left: "45%", top: "14%", size: 3, delay: "0.6s", alt: false },
  { left: "68%", top: "20%", size: 4, delay: "1.8s", alt: true },
  { left: "82%", top: "56%", size: 5, delay: "0.3s", alt: false },
  { left: "90%", top: "30%", size: 3, delay: "2.2s", alt: true },
  { left: "34%", top: "82%", size: 4, delay: "1.5s", alt: false },
];

export function HeroExperience({
  t,
  stats,
  locale,
}: {
  t: HeroDict;
  stats: StatsDict;
  locale: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  // Mirrors the intro fade so hidden interactive layers drop out of the
  // keyboard/screen-reader flow (`inert`), not just out of sight.
  const [introGone, setIntroGone] = useState(false);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  // Soft scrub: the spring trails the scrollbar just enough to feel liquid.
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  // Intro copy exits up, slightly blurring away as the device rises.
  const introOpacity = useTransform(p, [0.04, 0.12], [1, 0]);
  const introY = useTransform(p, [0.04, 0.12], [0, -64]);
  const introBlur = useTransform(p, [0.04, 0.12], ["blur(0px)", "blur(10px)"]);
  const introEvents = useTransform(p, (v) => (v > 0.08 ? "none" : "auto"));

  const hintOpacity = useTransform(p, [0, 0.05], [1, 0]);
  const gridOpacity = useTransform(p, [0.08, 0.16], [0, 0.4]);

  // Device stays fully hidden during the intro and rises in as the copy
  // exits — no peek at rest (tried, felt like clutter over the intro).
  const deviceY = useTransform(p, [0, 0.14], [280, 0]);
  const deviceOpacity = useTransform(p, [0.02, 0.12], [0, 1]);

  // Two ambient glows breathe in counter-phase as stages change.
  const glowA = useTransform(p, [0, 0.36, 0.6, 0.82, 1], [1, 0.4, 1, 0.4, 0.8]);
  const glowB = useTransform(p, [0, 0.36, 0.6, 0.82, 1], [0.35, 1, 0.4, 1, 0.55]);

  const railOpacity = useTransform(p, [0.1, 0.16], [0, 1]);
  const railEvents = useTransform(p, (v) => (v > 0.12 ? "auto" : "none"));

  useMotionValueEvent(p, "change", (v) => {
    const next = v < 0.36 ? 0 : v < 0.6 ? 1 : v < 0.82 ? 2 : 3;
    if (next !== activeStage) setActiveStage(next);
    const gone = v > 0.1;
    if (gone !== introGone) setIntroGone(gone);
  });

  const scrollToStage = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const span = el.offsetHeight - window.innerHeight;
    smoothScrollTo(top + STAGE_CENTERS[i] * span);
  };

  const stages = t.journey.stages;

  return (
    <section className="relative">
      <div ref={trackRef} className="relative h-[460vh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          <div className="absolute inset-0 bg-radial-fade pointer-events-none" aria-hidden />

          {/* Faint rose grid emerges once the journey starts */}
          <motion.div
            style={{ opacity: gridOpacity }}
            className="absolute inset-0 bg-grid pointer-events-none [mask-image:radial-gradient(ellipse_62%_56%_at_50%_58%,black,transparent)]"
            aria-hidden
          />

          {/* Ambient dust */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            {PARTICLES.map((pt, i) => (
              <span
                key={i}
                className={`absolute rounded-full bg-accent/35 blur-[1px] ${pt.alt ? "animate-float-alt" : "animate-float"}`}
                style={{
                  left: pt.left,
                  top: pt.top,
                  width: pt.size,
                  height: pt.size,
                  animationDelay: pt.delay,
                }}
              />
            ))}
          </div>

          {/* ── Journey progress bar ── */}
          <motion.div
            style={{
              scaleX: p,
              opacity: railOpacity,
              visibility: introGone ? "visible" : "hidden",
            }}
            className="absolute inset-x-0 top-0 z-30 h-[2px] origin-left bg-[linear-gradient(90deg,#f43f5e,#fb7185)]"
            aria-hidden
          />

          {/* ── Intro: the classic hero, before the journey starts ── */}
          <motion.div
            inert={introGone}
            style={{ opacity: introOpacity, y: introY, filter: introBlur, pointerEvents: introEvents }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-5 pb-16 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full liquid-glass-sm px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
              <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
              {t.eyebrow}
            </div>
            <AnimatedHeadline
              title={t.title}
              accent={t.titleAccent}
              className="mt-6 max-w-[1000px] text-balance text-[44px] sm:text-[60px] lg:text-[76px] xl:text-[88px] font-light text-fg leading-[1.02] tracking-[-0.025em]"
            />
            <p className="mt-7 max-w-[560px] text-[15px] lg:text-[16px] leading-[1.55] text-fg-muted text-pretty">
              {t.subtitle}
            </p>

            {/* Journey preview — one chip per device, click jumps to its stage */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {stages.map((stage, i) => {
                const Icon = STAGE_ICONS[i];
                return (
                  <button
                    key={stage.label}
                    type="button"
                    onClick={() => scrollToStage(i)}
                    aria-label={stage.device}
                    className="group flex min-h-11 cursor-pointer items-center gap-2 rounded-full liquid-glass-sm px-4 py-2 text-[12.5px] font-semibold text-fg-muted transition-colors duration-200 hover:text-fg"
                  >
                    <Icon className="size-4 text-accent" strokeWidth={2} />
                    {stage.label}
                    {i < stages.length - 1 && (
                      <span className="ml-1 hidden text-fg-subtle sm:inline" aria-hidden>
                        →
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" size="lg" href={`/${locale}#demo`}>
                {t.ctaPrimary}
              </Button>
              <Button variant="secondary" size="lg" href={`/${locale}#features`}>
                {t.ctaSecondary}
              </Button>
            </div>
            <p className="mt-4 text-[12.5px] font-medium text-fg-subtle">{t.ctaNote}</p>

            {/* Social proof — avatar cluster + trust line in one compact row */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2" aria-hidden>
                {(
                  [
                    ["MK", "#f43f5e"],
                    ["AS", "#a78bfa"],
                    ["EY", "#38bdf8"],
                  ] as const
                ).map(([initials, tint]) => (
                  <span
                    key={initials}
                    className="grid size-7 place-items-center rounded-full border-2 border-bg text-[9px] font-bold text-white"
                    style={{ background: tint }}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <p className="text-[13px] text-fg-muted">{t.trustBadge}</p>
            </div>
          </motion.div>

          {/* ── Scroll hint ── */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-1 text-fg-muted pointer-events-none"
            aria-hidden
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
              {t.journey.hint}
            </span>
            <ChevronDown className="size-4 animate-bounce" strokeWidth={2} />
          </motion.div>

          {/* ── 3D device scene: full-bleed so exits can sweep across the
              copy column; the Rig inside shifts devices right (desktop)
              or down (portrait) responsively ── */}
          <motion.div
            style={{ y: deviceY, opacity: deviceOpacity }}
            className="absolute inset-0 z-0"
            aria-hidden
          >
            <HeroDeviceScene p={p} locale={locale} />
          </motion.div>

          {/* ── Journey layout: stage copy + 3D device scene ── */}
          <div className="container-page relative grid h-full grid-rows-[minmax(0,42%)_minmax(0,1fr)] items-stretch pt-20 pb-16 lg:grid-rows-1 lg:grid-cols-[minmax(320px,430px)_minmax(0,1fr)] lg:pt-24 lg:pb-14">
            {/* Stage copy — one block per stage, crossfading in place */}
            <div className="relative z-10">
              {stages.map((stage, i) => (
                <StageCopy
                  key={stage.label}
                  p={p}
                  window={WINDOWS[i]}
                  stage={stage}
                  index={i}
                  total={stages.length}
                  active={introGone && activeStage === i}
                  ctaLabel={t.ctaPrimary}
                  ctaHref={`/${locale}#demo`}
                  exploreLabel={t.journey.explore}
                  exploreHref={`/${locale}/${STAGE_LINKS[i]}`}
                />
              ))}
            </div>

            {/* Ambient glows breathing behind the WebGL canvas */}
            <div className="relative" aria-hidden>
              <motion.div style={{ y: deviceY, opacity: deviceOpacity }} className="absolute inset-0">
                <motion.div
                  style={{ opacity: glowA }}
                  className="absolute left-[14%] top-[18%] h-[300px] w-[380px] rounded-full bg-accent/20 blur-[110px]"
                />
                <motion.div
                  style={{ opacity: glowB }}
                  className="absolute bottom-[12%] right-[8%] h-[260px] w-[330px] rounded-full bg-accent/12 blur-[120px]"
                />
              </motion.div>
            </div>
          </div>

          {/* ── Progress rail ── */}
          <motion.div
            inert={!introGone}
            style={{ opacity: railOpacity, pointerEvents: railEvents }}
            className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2"
          >
            <div className="flex items-center gap-1 rounded-full liquid-glass-sm px-2 py-1">
              {stages.map((stage, i) => (
                <button
                  key={stage.label}
                  type="button"
                  onClick={() => scrollToStage(i)}
                  aria-label={stage.device}
                  aria-current={activeStage === i ? "step" : undefined}
                  className="group flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-2.5"
                >
                  <span
                    className={`size-2 rounded-full transition-all duration-300 ${
                      activeStage === i
                        ? "bg-accent shadow-[0_0_12px_rgba(244,63,94,0.8)] scale-125"
                        : "bg-fg/25 group-hover:bg-fg/50"
                    }`}
                  />
                  <span
                    className={`hidden sm:block text-[11.5px] font-semibold tracking-tight transition-colors duration-300 ${
                      activeStage === i ? "text-fg" : "text-fg-subtle group-hover:text-fg-muted"
                    }`}
                  >
                    {stage.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Container className="relative pb-4 lg:pb-8">
        <AnimatedStats items={stats.items} locale={locale} />
      </Container>
    </section>
  );
}

/* ── Stage copy block ──────────────────────────────────────────────── */

function StageCopy({
  p,
  window: w,
  stage,
  index,
  total,
  active,
  ctaLabel,
  ctaHref,
  exploreLabel,
  exploreHref,
}: {
  p: MotionValue<number>;
  window: { in: [number, number]; out: [number, number] };
  stage: JourneyStage;
  index: number;
  total: number;
  active: boolean;
  ctaLabel: string;
  ctaHref: string;
  exploreLabel: string;
  exploreHref: string;
}) {
  const opacity = useTransform(p, [w.in[0], w.in[1], w.out[0], w.out[1]], [0, 1, 1, 0]);
  const y = useTransform(p, [w.in[0], w.in[1], w.out[0], w.out[1]], [28, 0, 0, -28]);
  const events = useTransform(p, (v) => (v >= w.in[1] && v <= w.out[0] ? "auto" : "none"));

  return (
    <motion.div
      inert={!active}
      style={{ opacity, y, pointerEvents: events }}
      className="absolute inset-0 flex flex-col items-center justify-end text-center lg:items-start lg:justify-center lg:text-left"
    >
      <div className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} — {stage.device}
        </span>
        <span className="hidden rounded-full liquid-glass-sm px-2.5 py-1 text-[10.5px] font-semibold text-fg-muted sm:inline-flex">
          {stage.chip}
        </span>
      </div>
      <h2 className="mt-3 max-w-[420px] text-balance text-[26px] sm:text-[32px] lg:text-[40px] font-light leading-[1.08] tracking-[-0.02em] text-fg">
        {stage.title}
      </h2>
      <p className="mt-3 max-w-[400px] text-[13.5px] lg:text-[15px] leading-[1.55] text-fg-muted lg:mt-4">
        {stage.desc}
      </p>
      <ul className="mt-4 hidden flex-col gap-2 sm:flex lg:mt-5">
        {stage.points.map((point) => (
          <li key={point} className="flex items-center gap-2.5 text-[13.5px] text-fg-muted justify-center lg:justify-start">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {point}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:mt-7 lg:justify-start">
        <Button variant="primary" size="md" href={ctaHref}>
          {ctaLabel}
        </Button>
        <Button variant="ghost" size="md" href={exploreHref} withArrow>
          {exploreLabel}
        </Button>
      </div>
    </motion.div>
  );
}
