// Extracted 1:1 from deployed DOM: /tr/products/integrations.html + /en/products/integrations.html
// (identical in both locales). Hero visual + the four capability-card visuals.
// Note: deployed PricingSheet header is English ("Product"/"Base") — differs from old
// source FeatureSubVisuals.PricingSheet ("Ürün"/"Taban"); deploy is authoritative.
// Each component's root is the exact DOM subtree; the Reveal wrapper (client, inline
// animation styles) and the capability-card chrome (rounded-lg bg-zinc-950 border
// border-white/5 p-1 h-[200px] flex items-center justify-center) are template-level
// and not included here.

import { ArrowRight, Plug, Power, Star } from "lucide-react";

const card = "rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur";
const wrap = "w-full h-full flex items-center justify-center";

// ─── HERO — orbit hub mockup (left column of split hero, inside Reveal direction="right") ──

export function IntegrationsHero() {
  const platforms = [
    { mark: "G", label: "Getir", bg: "#5d3ebc" },
    { mark: "T", label: "Trendyol", bg: "#f27a1a" },
    { mark: "Y", label: "Yemeksepeti", bg: "#fa0050" },
    { mark: "M", label: "Migros", bg: "#ff6600" },
    { mark: "Q", label: "Qapera", bg: "#0a0a0a", border: true },
    { mark: "e", label: "e-Adisyon", bg: "#0070f3" },
  ];
  return (
    <div className="relative h-full">
      <div
        className="absolute inset-4 rounded-full opacity-[0.18] blur-3xl animate-pulse-glow"
        style={{ background: "#f59e0b" }}
      />
      <div className="relative h-full min-h-[480px] rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden flex items-center justify-center p-8">
        <div className="absolute inset-0 bg-grid opacity-[0.6]" />
        <div className="relative w-full max-w-[440px]">
          <div className="w-full h-full min-h-[340px] flex items-center justify-center">
            <div className={`${card} w-full max-w-[380px] p-6 relative aspect-square`}>
              <div className="absolute inset-6 rounded-full border border-white/8" />
              <div className="absolute inset-[18%] rounded-full border border-white/5" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 rounded-2xl bg-white flex flex-col items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-black">
                  dasvio
                </div>
                <Plug className="size-3.5 mt-0.5 text-black" strokeWidth={2.5} />
              </div>
              {platforms.map((p, i) => {
                const angle = (i / platforms.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 38;
                const x = (50 + Math.cos(angle) * radius).toFixed(3);
                const y = (50 + Math.sin(angle) * radius).toFixed(3);
                return (
                  <div
                    key={p.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1.5 flex items-center gap-1.5 shadow-lg whitespace-nowrap"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      background: p.bg,
                      border: p.border ? "1px solid rgba(255,255,255,0.15)" : undefined,
                    }}
                  >
                    <div className="size-5 rounded-full bg-white/15 flex items-center justify-center text-[10px] font-bold text-white">
                      {p.mark}
                    </div>
                    <div className="text-[10.5px] font-semibold text-white">{p.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CAPABILITY 1 — "Catalog mapping, once" ───────────────────────────────

export function IntegrationsCatalogMap() {
  const rows = [
    { left: "Latte", right: "Latte 250ml", color: "#5d3ebc" },
    { left: "Margherita", right: "Pizza M.", color: "#f27a1a" },
    { left: "Caesar", right: "Caesar Salad", color: "#fa0050" },
  ];
  return (
    <div className={`${wrap}`}>
      <div className="space-y-1.5">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2 text-[11px]">
            <div className="rounded-md bg-white/5 border border-white/10 px-2 py-1 text-white min-w-[80px]">
              {r.left}
            </div>
            <ArrowRight className="size-3 text-white" strokeWidth={2.5} />
            <div
              className="rounded-md px-2 py-1 text-white font-medium min-w-[100px]"
              style={{ background: r.color }}
            >
              {r.right}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CAPABILITY 2 — "Bulk platform pricing" ───────────────────────────────

export function IntegrationsPricingSheet() {
  const rows = [
    { name: "Latte", base: "€4.5", trend: "€4.9", getir: "€5.2" },
    { name: "Pizza M.", base: "€12", trend: "€13", getir: "€14" },
    { name: "Salad", base: "€8", trend: "€8.5", getir: "€9" },
  ];
  return (
    <div className={`${wrap}`}>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 w-full max-w-[240px]">
        <div className="grid grid-cols-4 gap-2 text-[9px] uppercase tracking-wider text-white/40 font-bold pb-1 border-b border-white/5">
          <div>Product</div>
          <div>Base</div>
          <div>TY</div>
          <div>GT</div>
        </div>
        {rows.map((r) => (
          <div
            key={r.name}
            className="grid grid-cols-4 gap-2 text-[11px] py-1.5 text-white"
          >
            <div className="font-medium">{r.name}</div>
            <div className="text-white/60">{r.base}</div>
            <div className="text-amber-300">{r.trend}</div>
            <div className="text-purple-300">{r.getir}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CAPABILITY 3 — "Reviews & claims inbox" ──────────────────────────────

export function IntegrationsReviewBubbles() {
  const reviews = [
    { stars: 5, text: "Hızlı teslimat", color: "#5d3ebc" },
    { stars: 4, text: "Lezzetli yemek", color: "#f27a1a" },
    { stars: 5, text: "Mükemmel hizmet", color: "#fa0050" },
  ];
  return (
    <div className={`${wrap} flex-col gap-1.5`}>
      {reviews.map((r, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 w-[230px]"
        >
          <div
            className="size-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{ background: r.color }}
          >
            ★
          </div>
          <div className="text-[11px] text-white flex-1">{r.text}</div>
          <div className="flex gap-0.5">
            {Array.from({ length: r.stars }).map((_, i) => (
              <Star key={i} className="size-2 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── CAPABILITY 4 — "Live status control" ─────────────────────────────────

export function IntegrationsStatusToggles() {
  const states = [
    { label: "Restaurant", on: true, color: "rgba(255,255,255,0.9)" },
    { label: "Couriers", on: true, color: "rgba(255,255,255,0.9)" },
    { label: "Busy mode", on: false, color: "#52525b" },
  ];
  return (
    <div className={`${wrap} flex-col gap-2`}>
      {states.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 w-[200px]"
        >
          <Power className="size-3.5 text-white/50" strokeWidth={2} />
          <div className="text-[11.5px] font-medium text-white">{s.label}</div>
          <div
            className="ml-auto h-5 w-9 rounded-full flex items-center px-0.5"
            style={{ background: s.on ? s.color : "rgba(255,255,255,0.1)" }}
          >
            <div
              className={`size-4 rounded-full transition-transform ${
                s.on ? "translate-x-4 bg-zinc-900" : "translate-x-0 bg-white"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
