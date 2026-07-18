// signage — ürün sayfası görselleri (deploy DOM'una birebir)
// Kaynak: tr/products/signage.html + en/products/signage.html (iki locale'de DOM aynı)
// Not: Her görsel, sayfada bir Reveal sarmalayıcısının (inline opacity/transform
// animasyon stilli div) İÇİNDE durur; Reveal şablon-seviyesi olduğundan buraya alınmadı.

import {
  Calendar,
  Coffee,
  Film,
  Image as ImageIcon,
  Monitor,
  Zap,
} from "lucide-react";

const wrap = "w-full h-full flex items-center justify-center";

// ─── HERO ─────────────────────────────────────────────────────────────────
// Hero grid'in sol kolonu: accent glow (#10b981) + bg-grid'li çerçeve paneli
// + TV mockup'ı (magazine varyantı; çerçeve içindeki kısım eski kaynaktaki
// SignageVisual ile birebir aynı).

export function SignageHeroVisual() {
  return (
    <div className="relative h-full">
      <div
        className="absolute inset-4 rounded-full opacity-[0.18] blur-3xl animate-pulse-glow"
        style={{ background: "#10b981" }}
      />
      <div className="relative h-full min-h-[480px] rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden flex items-center justify-center p-8">
        <div className="absolute inset-0 bg-grid opacity-[0.6]" />
        <div className="relative w-full max-w-[440px]">
          <SignageVisual />
        </div>
      </div>
    </div>
  );
}

export function SignageVisual() {
  return (
    <div className="w-full h-full min-h-[340px] flex items-center justify-center">
      <div className="w-full max-w-[400px]">
        <div className="rounded-[20px] bg-zinc-900 p-1.5 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
          <div className="rounded-[14px] bg-zinc-950 overflow-hidden aspect-video relative">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12), transparent 50%), radial-gradient(circle at 80% 80%, rgba(244, 63, 94, 0.2), transparent 50%)",
              }}
            />
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/60 font-semibold">
                    Now playing
                  </div>
                  <div className="text-[20px] font-medium text-white tracking-tight mt-1">
                    Summer special
                  </div>
                </div>
                <Coffee className="size-7 text-white/70" strokeWidth={1.5} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full ${
                        i <= 2 ? "bg-white w-8" : "bg-white/20 w-3"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-[10px] text-white/60">2 of 8</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 ml-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/80 backdrop-blur px-2.5 py-1 text-[10px] font-semibold text-white">
          <span className="size-1.5 rounded-full bg-white animate-pulse" />
          Live · 3 branches
        </div>
      </div>
    </div>
  );
}

// ─── YETENEK KARTLARI ─────────────────────────────────────────────────────
// Kart kabuğu (rounded-xl bg-black … --tint:#10b981 > rounded-lg bg-zinc-950
// border border-white/5 p-1 h-[200px] flex items-center justify-center) şablon
// işidir; aşağıdaki bileşenler kabuğun içindeki görselin kendisidir.

// Kart 1: "Playlists & layouts"
export function PlaylistStack() {
  const items = [
    { Icon: ImageIcon, label: "Hero image", bg: "#ffffff" },
    { Icon: Film, label: "Brand video", bg: "#f43f5e" },
    { Icon: Coffee, label: "Special promo", bg: "#f59e0b" },
  ];
  return (
    <div className={`${wrap} flex-col gap-1.5`}>
      {items.map((it, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 w-[220px]"
        >
          <div
            className="size-9 rounded-lg flex items-center justify-center"
            style={{ background: it.bg }}
          >
            <it.Icon className="size-4 text-white" strokeWidth={2} />
          </div>
          <div className="text-[11.5px] font-medium text-white flex-1">
            {it.label}
          </div>
          <div className="text-[9px] text-white/40 font-mono">0:0{i + 8}</div>
        </div>
      ))}
    </div>
  );
}

// Kart 2: "Schedule by branch or tag"
export function ScheduleClock() {
  const slots = [
    { time: "11:00", label: "Lunch", bg: "#f59e0b" },
    { time: "15:00", label: "Tea", bg: "#06b6d4" },
    { time: "18:00", label: "Dinner", bg: "#f43f5e" },
    { time: "22:00", label: "Late", bg: "#0a0a0a", border: true },
  ];
  return (
    <div className={`${wrap} flex-col gap-2`}>
      <Calendar className="size-7 text-white" strokeWidth={1.75} />
      <div className="flex flex-wrap gap-1.5 justify-center max-w-[240px]">
        {slots.map((s) => (
          <div
            key={s.time}
            className="rounded-full px-3 py-1.5 flex items-center gap-1.5"
            style={{
              background: s.bg,
              border: s.border ? "1px solid rgba(255,255,255,0.18)" : undefined,
            }}
          >
            <div className="text-[10px] font-mono font-bold text-white">
              {s.time}
            </div>
            <div className="text-[10px] text-white/80">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Kart 3: "Customer-facing display"
export function CustomerScreen() {
  return (
    <div className={`${wrap}`}>
      <div className="rounded-xl bg-zinc-900 p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] w-[240px]">
        <div className="rounded-lg bg-zinc-950 p-4 aspect-video flex flex-col justify-between">
          <div>
            <div className="text-[8px] uppercase tracking-wider text-white/40 font-semibold">
              Order #2418
            </div>
            <div className="text-[16px] font-medium text-white mt-1">
              €48.00
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[8px] text-white/40">Tip</div>
            <div className="flex gap-1">
              {[10, 15, 20].map((t) => (
                <div
                  key={t}
                  className={`rounded-md px-2 py-0.5 text-[9px] font-bold ${
                    t === 15
                      ? "bg-white text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {t}%
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Kart 4: "Real-time push"
export function PushScreens() {
  return (
    <div className={`${wrap} relative`}>
      <Zap
        className="absolute top-2 left-2 size-8 text-amber-400"
        strokeWidth={1.75}
        fill="currentColor"
      />
      <div className="grid grid-cols-3 gap-2 w-full max-w-[260px]">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="aspect-video rounded-lg bg-zinc-900 border border-white/10 p-1.5 flex items-center justify-center relative"
          >
            <Monitor className="size-5 text-white/50" strokeWidth={1.5} />
            <div className="absolute -top-1 -right-1 size-3 rounded-full bg-white ring-2 ring-zinc-950 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
