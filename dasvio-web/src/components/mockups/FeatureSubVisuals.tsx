import {
  Check,
  Star,
  Sparkles,
  Tablet,
  Smartphone,
  Monitor,
  RefreshCw,
  Coffee,
  Power,
  ArrowRight,
  AlertTriangle,
  Image as ImageIcon,
  Film,
  Zap,
  Calendar,
} from "lucide-react";

const wrap = "w-full h-full flex items-center justify-center";

// ─── QR MENU ──────────────────────────────────────────────────────────────

export function LangChips() {
  const langs = [
    { code: "TR", bg: "#ef4444" },
    { code: "EN", bg: "#1d4ed8" },
    { code: "DE", bg: "#0a0a0a", border: true },
    { code: "FR", bg: "#2563eb" },
    { code: "ES", bg: "#f59e0b" },
  ];
  return (
    <div className={wrap}>
      <div className="flex flex-wrap gap-1.5 justify-center">
        {langs.map((l) => (
          <div
            key={l.code}
            className="rounded-full px-3 py-1.5 flex items-center gap-2"
            style={{
              background: l.bg,
              border: l.border ? "1px solid rgba(255,255,255,0.18)" : undefined,
            }}
          >
            <Check className="size-3 text-white" strokeWidth={3} />
            <div className="text-[11px] font-bold text-white">{l.code}</div>
          </div>
        ))}
        <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-white/60">
          +9 more
        </div>
      </div>
    </div>
  );
}

export function ThemeSwatches() {
  const swatches = ["#ffffff", "#0a0a0a", "#f59e0b", "#ef4444", "#f43f5e"];
  return (
    <div className={`${wrap} flex-col gap-3`}>
      <div className="flex gap-2">
        {swatches.map((c) => (
          <div
            key={c}
            className="size-9 rounded-full ring-2 ring-white/10"
            style={{ background: c }}
          />
        ))}
      </div>
      <div className="flex items-baseline gap-3">
        <div className="text-[32px] font-light tracking-tight text-white leading-none">
          Aa
        </div>
        <div className="text-[11px] text-white/50 uppercase tracking-[0.18em] font-semibold">
          Inter / Brand
        </div>
      </div>
    </div>
  );
}

export function QrTablePreview() {
  const cells = Array.from({ length: 64 }, (_, i) => {
    const seed = (i * 37 + 11) % 100;
    return seed > 45;
  });
  return (
    <div className={`${wrap} gap-3`}>
      <div className="grid grid-cols-8 gap-[2px] p-2 rounded-xl bg-white">
        {cells.map((on, i) => (
          <div
            key={i}
            className="size-2"
            style={{ background: on ? "#000" : "transparent" }}
          />
        ))}
      </div>
      <div className="rounded-xl border border-white/15 bg-white/5 px-3 py-2">
        <div className="text-[9px] text-white/50 uppercase tracking-wider font-semibold">
          Table
        </div>
        <div className="text-[18px] font-medium text-white leading-none mt-1">
          07
        </div>
      </div>
    </div>
  );
}

export function SpotlightBanner() {
  return (
    <div className={`${wrap} flex-col gap-2`}>
      <div className="rounded-2xl px-4 py-3 bg-gradient-to-br from-amber-400 to-rose-500 flex items-center gap-3 w-full max-w-[260px]">
        <Sparkles className="size-5 text-white" strokeWidth={2.5} />
        <div>
          <div className="text-[10px] uppercase tracking-wider font-bold text-white/80">
            This week
          </div>
          <div className="text-[14px] font-semibold text-white leading-tight">
            20% off filter coffee
          </div>
        </div>
      </div>
      <div className="flex gap-1.5 text-[10px]">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-white/60"
          >
            <Star className="size-2.5 fill-amber-400 text-amber-400" />
            Featured
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── POS ──────────────────────────────────────────────────────────────────

export function DeviceSync() {
  const devices = [
    { Icon: Tablet, label: "Tablet" },
    { Icon: Smartphone, label: "Mobile" },
    { Icon: Monitor, label: "Terminal" },
  ];
  return (
    <div className={`${wrap} flex-col gap-3`}>
      <div className="flex items-center gap-2">
        {devices.map(({ Icon, label }, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 flex flex-col items-center gap-1">
              <Icon className="size-5 text-white" strokeWidth={1.75} />
              <div className="text-[9px] text-white/60 font-medium">{label}</div>
            </div>
            {i < devices.length - 1 && (
              <RefreshCw className="size-3 text-white" strokeWidth={2.5} />
            )}
          </div>
        ))}
      </div>
      <div className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">
        ✓ Synced · 12ms
      </div>
    </div>
  );
}

export function ReceiptSlip() {
  return (
    <div className={`${wrap}`}>
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
          <div className="flex justify-between">
            <span>Latte ×2</span>
            <span>€9</span>
          </div>
          <div className="flex justify-between">
            <span>Margherita</span>
            <span>€18</span>
          </div>
          <div className="flex justify-between">
            <span>Tiramisu</span>
            <span>€8</span>
          </div>
        </div>
        <div className="mt-2 pt-1 border-t border-black/30 flex justify-between text-[10px] font-bold text-black">
          <span>Toplam</span>
          <span>€35</span>
        </div>
      </div>
    </div>
  );
}

function Donut({
  segments,
  size = 100,
}: {
  segments: { value: number; color: string; label?: string }[];
  size?: number;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="14"
        fill="none"
      />
      {segments.map((s, i) => {
        const len = (s.value / total) * c;
        const offset = segments
          .slice(0, i)
          .reduce((sum, segment) => sum + (segment.value / total) * c, 0);
        return (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={s.color}
            strokeWidth="14"
            fill="none"
            strokeDasharray={`${len.toFixed(3)} ${c.toFixed(3)}`}
            strokeDashoffset={Number((-offset).toFixed(3))}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            strokeLinecap="butt"
          />
        );
      })}
    </svg>
  );
}

export function RevenueDonut() {
  const segments = [
    { value: 45, color: "#ffffff", label: "Dine-in" },
    { value: 25, color: "#f43f5e", label: "Takeaway" },
    { value: 20, color: "#06b6d4", label: "Delivery" },
    { value: 10, color: "#f59e0b", label: "Bar" },
  ];
  return (
    <div className={`${wrap} gap-4`}>
      <div className="relative">
        <Donut segments={segments} size={110} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[10px] text-white/50 uppercase tracking-wider">
            Mix
          </div>
          <div className="text-[14px] font-medium text-white">4 centers</div>
        </div>
      </div>
      <div className="space-y-1.5">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-[11px]">
            <div className="size-2.5 rounded-full" style={{ background: s.color }} />
            <span className="text-white/70">{s.label}</span>
            <span className="text-white font-medium ml-auto">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClockFace() {
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
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const x1 = (50 + Math.sin(a) * 42).toFixed(3);
          const y1 = (50 - Math.cos(a) * 42).toFixed(3);
          const x2 = (50 + Math.sin(a) * (i % 3 === 0 ? 36 : 39)).toFixed(3);
          const y2 = (50 - Math.cos(a) * (i % 3 === 0 ? 36 : 39)).toFixed(3);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={i % 3 === 0 ? 1.5 : 0.7}
            />
          );
        })}
        <line x1="50" y1="50" x2="50" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="50" x2="68" y2="50" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
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

// ─── MULTI-BRANCH ─────────────────────────────────────────────────────────

export function NetworkNodes() {
  return (
    <div className={`${wrap}`}>
      <svg width="200" height="120" viewBox="0 0 200 120">
        {[
          [40, 30],
          [160, 30],
          [40, 95],
          [160, 95],
        ].map(([x, y], i) => (
          <line
            key={i}
            x1="100"
            y1="60"
            x2={x}
            y2={y}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        ))}
        {[
          [40, 30, "Kadıköy"],
          [160, 30, "Beşiktaş"],
          [40, 95, "Ankara"],
          [160, 95, "İzmir"],
        ].map(([x, y, label]) => (
          <g key={label as string}>
            <circle
              cx={x as number}
              cy={y as number}
              r="14"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.2)"
            />
            <text
              x={x as number}
              y={(y as number) + 3}
              textAnchor="middle"
              fontSize="7"
              fill="white"
              fontWeight="600"
            >
              {(label as string).slice(0, 3)}
            </text>
          </g>
        ))}
        <circle cx="100" cy="60" r="22" fill="#ffffff" />
        <text
          x="100"
          y="64"
          textAnchor="middle"
          fontSize="8"
          fill="#000000"
          fontWeight="700"
        >
          MASTER
        </text>
      </svg>
    </div>
  );
}

export function OverrideMatrix() {
  const cells: Array<"on" | "off" | "override"> = [
    "on", "on", "override", "off",
    "on", "override", "on", "on",
    "on", "on", "off", "override",
  ];
  return (
    <div className={`${wrap}`}>
      <div className="grid grid-cols-4 gap-1.5 p-3 rounded-xl bg-white/5 border border-white/10">
        {cells.map((c, i) => (
          <div
            key={i}
            className={`size-7 rounded-md flex items-center justify-center text-[10px] font-bold ${
              c === "on"
                ? "bg-white/80 text-black"
                : c === "override"
                  ? "bg-amber-400/80 text-zinc-900"
                  : "bg-white/5 text-white/30"
            }`}
          >
            {c === "on" ? (
              <Check className="size-3.5" strokeWidth={3} />
            ) : c === "override" ? (
              "₺"
            ) : (
              "—"
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TierBadges() {
  const tiers = [
    { name: "Premium", price: "₺145", color: "#f59e0b", icon: "★" },
    { name: "Standard", price: "₺119", color: "#06b6d4", icon: "●" },
    { name: "Discount", price: "₺95", color: "#10b981", icon: "↓" },
  ];
  return (
    <div className={`${wrap} flex-col gap-1.5`}>
      {tiers.map((t) => (
        <div
          key={t.name}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 w-[200px]"
        >
          <div
            className="size-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
            style={{ background: t.color }}
          >
            {t.icon}
          </div>
          <div className="text-[12px] font-medium text-white">{t.name}</div>
          <div className="ml-auto text-[12px] font-bold text-white">
            {t.price}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ScheduleCalendar() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const active = [1, 2, 3, 5, 6];
  return (
    <div className={`${wrap}`}>
      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center justify-between mb-2">
          <Calendar className="size-3.5 text-white" strokeWidth={2.25} />
          <div className="text-[9px] uppercase tracking-wider text-white/50 font-semibold">
            Week 47
          </div>
        </div>
        <div className="flex gap-1">
          {days.map((d, i) => (
            <div
              key={i}
              className={`size-8 rounded-lg flex flex-col items-center justify-center gap-0.5 ${
                active.includes(i)
                  ? "bg-white text-black"
                  : "bg-white/5 text-white/40"
              }`}
            >
              <div className="text-[8px] font-bold leading-none">{d}</div>
              <div className="text-[9px] font-medium leading-none">{i + 18}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── INTEGRATIONS ─────────────────────────────────────────────────────────

export function CatalogMap() {
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

export function PricingSheet() {
  const rows = [
    { name: "Latte", base: "€4.5", trend: "€4.9", getir: "€5.2" },
    { name: "Pizza M.", base: "€12", trend: "€13", getir: "€14" },
    { name: "Salad", base: "€8", trend: "€8.5", getir: "€9" },
  ];
  return (
    <div className={`${wrap}`}>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 w-full max-w-[240px]">
        <div className="grid grid-cols-4 gap-2 text-[9px] uppercase tracking-wider text-white/40 font-bold pb-1 border-b border-white/5">
          <div>Ürün</div>
          <div>Taban</div>
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

export function ReviewBubbles() {
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

export function StatusToggles() {
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

// ─── ANALYTICS ────────────────────────────────────────────────────────────

export function HeatmapMini() {
  const data: number[][] = [
    [0.12, 0.18, 0.22, 0.28, 0.32, 0.28, 0.22, 0.18, 0.12],
    [0.18, 0.28, 0.42, 0.78, 0.85, 0.72, 0.35, 0.22, 0.15],
    [0.22, 0.32, 0.58, 0.92, 0.95, 0.88, 0.48, 0.28, 0.18],
    [0.18, 0.25, 0.45, 0.82, 0.9, 0.75, 0.4, 0.22, 0.15],
    [0.1, 0.15, 0.2, 0.25, 0.3, 0.25, 0.2, 0.15, 0.1],
  ];
  return (
    <div className={`${wrap}`}>
      <div className="space-y-1">
        {data.map((row, ri) => (
          <div key={ri} className="flex gap-1">
            {row.map((v, ci) => (
              <div
                key={ci}
                className="size-4 rounded-sm"
                style={{ background: `rgba(255,255,255,${v})` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ComparisonBars() {
  const branches = [
    { name: "Kadıköy", value: 92, color: "#ffffff" },
    { name: "Beşiktaş", value: 78, color: "#06b6d4" },
    { name: "Ankara", value: 65, color: "#f43f5e" },
    { name: "İzmir", value: 54, color: "#f59e0b" },
  ];
  return (
    <div className={`${wrap}`}>
      <div className="w-full max-w-[240px] space-y-2">
        {branches.map((b) => (
          <div key={b.name} className="flex items-center gap-2">
            <div className="text-[10px] text-white/70 font-medium w-14 text-right">
              {b.name}
            </div>
            <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${b.value}%`, background: b.color }}
              />
            </div>
            <div className="text-[10px] text-white font-semibold w-8">
              {b.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PaymentDonut() {
  const segments = [
    { value: 62, color: "#ffffff", label: "Card" },
    { value: 23, color: "#06b6d4", label: "Cash" },
    { value: 15, color: "#f43f5e", label: "Online" },
  ];
  return (
    <div className={`${wrap} gap-4`}>
      <div className="relative">
        <Donut segments={segments} size={110} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[18px] font-medium text-white leading-none">
            62%
          </div>
          <div className="text-[9px] text-white/50 uppercase tracking-wider mt-1">
            Card
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-[11px]">
            <div className="size-2.5 rounded-full" style={{ background: s.color }} />
            <span className="text-white/70">{s.label}</span>
            <span className="text-white font-medium ml-auto">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CompChart() {
  const points = [22, 28, 24, 35, 30, 58, 38, 30];
  const max = 60;
  const w = 220;
  const h = 90;
  const stepX = w / (points.length - 1);
  const path = points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${i * stepX} ${h - (p / max) * h}`,
    )
    .join(" ");
  return (
    <div className={`${wrap} flex-col gap-2`}>
      <div className="flex items-center gap-2">
        <AlertTriangle className="size-4 text-red-400" strokeWidth={2} />
        <div className="text-[11px] text-red-300 font-semibold">
          Spike Fri 22:00
        </div>
      </div>
      <svg width={w} height={h + 4} className="overflow-visible">
        <path d={path} stroke="#ef4444" strokeWidth="1.75" fill="none" />
        <circle cx={5 * stepX} cy={h - (58 / max) * h} r="4" fill="#ef4444" />
        <circle
          cx={5 * stepX}
          cy={h - (58 / max) * h}
          r="8"
          fill="rgba(239,68,68,0.2)"
        />
      </svg>
    </div>
  );
}

// ─── SIGNAGE ──────────────────────────────────────────────────────────────

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
