"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  Utensils,
  Bike,
  CreditCard,
  QrCode,
  type LucideIcon,
} from "lucide-react";

type Tone = "accent" | "green" | "amber";

type Seed = {
  Icon: LucideIcon;
  tint: string;
  label: string;
  sub: string;
  amount: number;
  status: string;
  tone: Tone;
};

type Order = Seed & { id: number };

// The pool the live feed cycles through — real Turkish restaurant order shapes
// (salon tables, delivery platforms, POS, QR self-order) so the panel reads as
// the actual product, not decoration.
const POOL: Seed[] = [
  { Icon: Utensils, tint: "#fb7185", label: "Masa 7", sub: "Salon · 4 kişi", amount: 330, status: "Aktif", tone: "accent" },
  { Icon: Bike, tint: "#7c3aed", label: "Getir", sub: "Paket · 2.1 km", amount: 245, status: "Yeni", tone: "accent" },
  { Icon: CreditCard, tint: "#06b6d4", label: "Şube 3 · POS", sub: "Kasa 2", amount: 180, status: "Ödendi", tone: "green" },
  { Icon: Bike, tint: "#f97316", label: "Trendyol", sub: "Paket · hazırlanıyor", amount: 410, status: "Yeni", tone: "accent" },
  { Icon: Utensils, tint: "#fbbf24", label: "Masa 12", sub: "Teras · 2 kişi", amount: 155, status: "Aktif", tone: "accent" },
  { Icon: Bike, tint: "#ef4444", label: "Yemeksepeti", sub: "Kurye yolda", amount: 290, status: "Yolda", tone: "amber" },
  { Icon: QrCode, tint: "#10b981", label: "QR · Masa 5", sub: "Self sipariş", amount: 120, status: "Yeni", tone: "accent" },
  { Icon: CreditCard, tint: "#3b82f6", label: "Şube 1 · POS", sub: "Kasa 1", amount: 220, status: "Ödendi", tone: "green" },
];

const toneClass: Record<Tone, string> = {
  accent: "text-accent bg-accent-soft",
  green: "text-emerald-400 bg-emerald-500/15",
  amber: "text-amber-400 bg-amber-500/15",
};

const VISIBLE = 4;
const TICK_MS = 5000;
const BARS = 24;
const EASE = [0.2, 0.7, 0.2, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

function money(n: number, locale: string) {
  return "₺" + n.toLocaleString(locale === "tr" ? "tr-TR" : "en-US");
}

export function LiveConsole({ locale }: { locale: string }) {
  // Deterministic first paint (no Math.random / Date on the server) → the
  // interval takes over after mount, so there is no hydration mismatch.
  const [orders, setOrders] = useState<Order[]>(() =>
    POOL.slice(0, VISIBLE).map((s, i) => ({ ...s, id: i })),
  );
  const [revenue, setRevenue] = useState(48250);
  const [orderCount, setOrderCount] = useState(1284);
  const [bars, setBars] = useState<number[]>(() =>
    Array.from({ length: BARS }, (_, i) => 32 + Math.round(46 * Math.sin(i / 2.4) ** 2)),
  );

  const nextId = useRef(VISIBLE);
  const cursor = useRef(VISIBLE % POOL.length);

  const rev = useMotionValue(48250);
  const revText = useTransform(rev, (v) => money(Math.round(v), locale));

  useEffect(() => {
    const t = window.setInterval(() => {
      const seed = POOL[cursor.current % POOL.length];
      cursor.current += 1;
      setOrders((prev) => [{ ...seed, id: nextId.current++ }, ...prev].slice(0, VISIBLE));
      setRevenue((r) => r + seed.amount);
      setOrderCount((c) => c + 1);
      setBars((prev) => [...prev.slice(1), 28 + ((seed.amount * 7) % 70)]);
    }, TICK_MS);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const controls = animate(rev, revenue, { duration: 0.7, ease: EASE });
    return () => controls.stop();
  }, [revenue, rev]);

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="liquid-glass-strong rounded-3xl p-4 lg:p-5 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
      >
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
          initial="hidden"
          animate="show"
        >
          {/* window chrome + live status */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-between px-1.5 pb-4"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-emerald-400 animate-pulse-dot shadow-[0_0_10px_rgba(52,211,153,0.75)]" />
              </span>
              <span className="text-[13px] font-semibold tracking-tight">
                Canlı Panel
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-md liquid-glass-sm px-2 py-1 text-[11px] text-fg-muted tabular-nums">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              {orderCount.toLocaleString(locale === "tr" ? "tr-TR" : "en-US")} sipariş · bugün
            </span>
          </motion.div>

          {/* live order feed — AnimatePresence handles enter/exit, layout reflows */}
          <motion.div
            variants={fadeUp}
            className="relative h-[264px] overflow-hidden"
          >
            <div className="space-y-2">
              <AnimatePresence initial={false} mode="popLayout">
                {orders.map((o) => (
                  <motion.div
                    key={o.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
                    transition={{ type: "spring", stiffness: 540, damping: 30, mass: 0.7 }}
                    className="relative flex h-[60px] items-center gap-3 rounded-xl liquid-glass-sm px-3"
                  >
                    <motion.span
                      aria-hidden
                      initial={{ opacity: 0.9 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease: EASE }}
                      className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-accent/70"
                    />
                    <span
                      className="grid size-9 shrink-0 place-items-center rounded-lg"
                      style={{ background: `${o.tint}22`, color: o.tint }}
                    >
                      <o.Icon className="size-[18px]" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13.5px] font-medium text-fg">
                        {o.label}
                      </div>
                      <div className="truncate text-[11.5px] text-fg-muted">
                        {o.sub}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[13.5px] font-semibold text-fg tabular-nums">
                        {money(o.amount, locale)}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold ${toneClass[o.tone]}`}
                      >
                        {o.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* daily revenue + live sparkline */}
          <motion.div
            variants={fadeUp}
            className="mt-4 flex items-end justify-between gap-4 rounded-xl liquid-glass-sm px-4 py-3"
          >
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-muted">
                Bugün · tüm şubeler
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <motion.span className="text-[26px] lg:text-[30px] font-light tracking-[-0.02em] text-fg tabular-nums">
                  {revText}
                </motion.span>
                <span className="text-[12px] font-semibold text-emerald-400">
                  ▲ %12
                </span>
              </div>
            </div>
            <div className="flex h-12 items-end gap-[3px]">
              {bars.map((h, i) => {
                const newest = i === bars.length - 1;
                return (
                  <motion.span
                    key={i}
                    className={`w-[4px] rounded-full ${
                      newest
                        ? "bg-accent shadow-[0_0_10px_rgba(244,63,94,0.6)]"
                        : "bg-accent/60"
                    }`}
                    style={{ opacity: newest ? 1 : 0.3 + (i / BARS) * 0.6 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* one floating chip for glass depth against the parallax backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
        className="absolute -left-4 lg:-left-8 bottom-6 flex items-center gap-3 rounded-2xl liquid-glass-strong px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)] animate-float-alt"
      >
        <div className="grid size-9 place-items-center rounded-lg bg-accent text-[13px] font-bold text-accent-fg">
          AI
        </div>
        <div>
          <div className="text-[12.5px] font-semibold leading-tight text-fg">
            Menü çevrildi
          </div>
          <div className="mt-0.5 text-[11px] text-fg-muted">14 dil · 2 sn önce</div>
        </div>
      </motion.div>
    </div>
  );
}
