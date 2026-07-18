// revenue-centers — sayfaya özel mockup/görsel DOM alt ağaçları (deploy DOM'una birebir).
// Kaynak: /tr/products/revenue-centers.html (EN ile birebir aynı DOM).
// revenueCentersHero: hero'daki büyük mockup panelinin içeriği
//   (şablon çerçevesi "mt-14 lg:mt-20 rounded-lg border border-white/10 bg-zinc-950 …" > "w-full" altına render edilir).
// revenueCentersCap*: her yetenek kartının görseli
//   (şablon çerçevesi "rounded-lg bg-zinc-950 border border-white/5 p-1 h-[200px] flex items-center justify-center" altına render edilir).

const wrap = "w-full h-full flex items-center justify-center";

// ─── HERO — haftalık gelir mini dashboard'u ───────────────────────────────

export function revenueCentersHero() {
  const bars = [
    { h: "40%", d: "M" },
    { h: "65%", d: "T" },
    { h: "50%", d: "W" },
    { h: "75%", d: "T" },
    { h: "90%", d: "F", active: true },
    { h: "55%", d: "S" },
    { h: "70%", d: "S" },
  ];
  const stats = [
    { label: "Orders", value: "412" },
    { label: "Avg ticket", value: "€34" },
    { label: "Branches", value: "12" },
  ];
  return (
    <div className="w-full h-full min-h-[340px] flex items-center justify-center">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur w-full max-w-[380px] p-5">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[10px] text-white/50 font-medium uppercase tracking-wider">
              This week
            </div>
            <div className="text-[26px] font-medium tracking-tight text-white leading-none mt-1">
              €42,580
            </div>
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/70 bg-white/10 px-2 py-0.5 rounded-full">
            ↑ 12.4%
          </div>
        </div>
        <div className="mt-5 flex items-end gap-1.5 h-24">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className={`w-full rounded-md ${b.active ? "bg-white" : "bg-white/10"}`}
                style={{ height: b.h }}
              />
              <div className="text-[9px] text-white/40 font-medium">{b.d}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg bg-white/[0.04] px-2 py-2">
              <div className="text-[9px] text-white/50">{s.label}</div>
              <div className="text-[13px] font-medium text-white mt-0.5">
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Yetenek 1: Per-channel rules — kanal karması donut'u ─────────────────

export function revenueCentersCapPerChannelRules() {
  const segments = [
    { color: "#ffffff", dash: "115.925 257.611", offset: "0" },
    { color: "#f43f5e", dash: "64.403 257.611", offset: "-115.925" },
    { color: "#06b6d4", dash: "51.522 257.611", offset: "-180.327" },
    { color: "#f59e0b", dash: "25.761 257.611", offset: "-231.85" },
  ];
  const legend = [
    { color: "#ffffff", label: "Dine-in", pct: 45 },
    { color: "#f43f5e", label: "Takeaway", pct: 25 },
    { color: "#06b6d4", label: "Delivery", pct: 20 },
    { color: "#f59e0b", label: "Bar", pct: 10 },
  ];
  return (
    <div className={`${wrap} gap-4`}>
      <div className="relative">
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle
            cx="55"
            cy="55"
            r="41"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="14"
            fill="none"
          />
          {segments.map((s) => (
            <circle
              key={s.color}
              cx="55"
              cy="55"
              r="41"
              stroke={s.color}
              strokeWidth="14"
              fill="none"
              strokeDasharray={s.dash}
              strokeDashoffset={s.offset}
              transform="rotate(-90 55 55)"
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[10px] text-white/50 uppercase tracking-wider">Mix</div>
          <div className="text-[14px] font-medium text-white">4 centers</div>
        </div>
      </div>
      <div className="space-y-1.5">
        {legend.map((l) => (
          <div key={l.label} className="flex items-center gap-2 text-[11px]">
            <div className="size-2.5 rounded-full" style={{ background: l.color }} />
            <span className="text-white/70">{l.label}</span>
            <span className="text-white font-medium ml-auto">{l.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Yetenek 2: Independent reporting — şube bazlı yatay barlar ───────────

export function revenueCentersCapIndependentReporting() {
  const rows = [
    { label: "Kadıköy", width: "92%", color: "#ffffff", value: "92" },
    { label: "Beşiktaş", width: "78%", color: "#06b6d4", value: "78" },
    { label: "Ankara", width: "65%", color: "#f43f5e", value: "65" },
    { label: "İzmir", width: "54%", color: "#f59e0b", value: "54" },
  ];
  return (
    <div className={wrap}>
      <div className="w-full max-w-[240px] space-y-2">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-2">
            <div className="text-[10px] text-white/70 font-medium w-14 text-right">
              {r.label}
            </div>
            <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: r.width, background: r.color }}
              />
            </div>
            <div className="text-[10px] text-white font-semibold w-8">{r.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Yetenek 3: Routing & printing — adisyon fişi ─────────────────────────

export function revenueCentersCapRoutingPrinting() {
  const items = [
    { name: "Latte ×2", price: "€9" },
    { name: "Margherita", price: "€18" },
    { name: "Tiramisu", price: "€8" },
  ];
  return (
    <div className={wrap}>
      <div className="bg-white rounded-md w-[160px] p-3 shadow-[0_8px_24px_rgba(0,0,0,0.5)] relative">
        <div
          className="absolute -bottom-1 inset-x-0 h-2"
          style={{
            background:
              "repeating-linear-gradient(45deg, white 0 6px, transparent 6px 12px)",
          }}
        />
        <div className="text-center">
          <div className="text-[10px] font-bold text-black uppercase tracking-wider">
            Café Roma
          </div>
          <div className="text-[8px] text-black/50">Order #2418</div>
        </div>
        <div className="mt-2 border-t border-dashed border-black/30 pt-2 space-y-0.5 text-[9px] text-black">
          {items.map((it) => (
            <div key={it.name} className="flex justify-between">
              <span>{it.name}</span>
              <span>{it.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 pt-1 border-t border-black/30 flex justify-between text-[10px] font-bold text-black">
          <span>Total</span>
          <span>€35</span>
        </div>
      </div>
    </div>
  );
}

// ─── Yetenek 4: Operating hours — saat kadranı + vardiya çipleri ──────────

export function revenueCentersCapOperatingHours() {
  const ticks = [
    { x1: "50.000", y1: "8.000", x2: "50.000", y2: "14.000", w: "1.5" },
    { x1: "71.000", y1: "13.627", x2: "69.500", y2: "16.225", w: "0.7" },
    { x1: "86.373", y1: "29.000", x2: "83.775", y2: "30.500", w: "0.7" },
    { x1: "92.000", y1: "50.000", x2: "86.000", y2: "50.000", w: "1.5" },
    { x1: "86.373", y1: "71.000", x2: "83.775", y2: "69.500", w: "0.7" },
    { x1: "71.000", y1: "86.373", x2: "69.500", y2: "83.775", w: "0.7" },
    { x1: "50.000", y1: "92.000", x2: "50.000", y2: "86.000", w: "1.5" },
    { x1: "29.000", y1: "86.373", x2: "30.500", y2: "83.775", w: "0.7" },
    { x1: "13.627", y1: "71.000", x2: "16.225", y2: "69.500", w: "0.7" },
    { x1: "8.000", y1: "50.000", x2: "14.000", y2: "50.000", w: "1.5" },
    { x1: "13.627", y1: "29.000", x2: "16.225", y2: "30.500", w: "0.7" },
    { x1: "29.000", y1: "13.627", x2: "30.500", y2: "16.225", w: "0.7" },
  ];
  return (
    <div className={`${wrap} flex-col gap-3`}>
      <svg width="110" height="110" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
        <path
          d="M50 50 L50 12 A 38 38 0 0 1 81 39 Z"
          fill="rgba(255, 255, 255, 0.12)"
        />
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={t.w}
          />
        ))}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="22"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="50"
          x2="68"
          y2="50"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="50" r="2" fill="#ffffff" />
      </svg>
      <div className="flex gap-1.5 text-[10px]">
        <div className="rounded-full bg-white/10 border border-white/20 px-2 py-0.5 text-white/70 font-semibold">
          09:00–23:00
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-white/60 font-semibold">
          3 shifts
        </div>
      </div>
    </div>
  );
}
