/**
 * analytics ürün sayfası — TÜM özel mockup/görsel DOM alt ağaçları.
 * Kaynak: tr|en/products/analytics.html (iki locale'de DOM birebir aynı).
 * Deploy DOM'u eski kaynaktaki bileşenlerle (FeatureVisuals.tsx / FeatureSubVisuals.tsx)
 * birebir örtüşüyor; isimler ve kod stili oradan korundu.
 *
 * Sayfadaki yerleşim:
 * - AnalyticsVisual  → hero mockup. Şablon çerçevesi (bileşene DAHİL DEĞİL):
 *     <div class="mt-14 lg:mt-20 rounded-lg border border-white/10 bg-zinc-950 overflow-hidden"
 *          style="box-shadow:0 60px 120px #ef44441f, inset 0 0 0 1px rgba(255,255,255,0.02)">
 *       <div class="w-full">{AnalyticsVisual}</div>
 *     </div>
 *   (Aynı mockup reports ve heatmaps hero'sunda da kullanılıyor.)
 * - Yetenek kartı görselleri, sırayla; her biri şu şablon çerçevesinin içinde
 *   (çerçeve bileşene DAHİL DEĞİL):
 *     <div class="rounded-lg bg-zinc-950 border border-white/5 p-1 h-[200px] flex items-center justify-center">
 *       {visual}
 *     </div>
 *   1. HeatmapMini     → "Hourly sales heatmap"
 *   2. ComparisonBars  → "Branch & channel comparison"
 *   3. PaymentDonut    → "Payment & product mix"
 *   4. CompChart       → "Comp/void monitoring"
 */

import { AlertTriangle } from "lucide-react";

const card = "rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur";

const wrap = "w-full h-full flex items-center justify-center";

// ─── HERO MOCKUP ──────────────────────────────────────────────────────────

export function AnalyticsVisual() {
  const bars = [40, 65, 50, 75, 90, 55, 70];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="w-full h-full min-h-[340px] flex items-center justify-center">
      <div className={`${card} w-full max-w-[380px] p-5`}>
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
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className={`w-full rounded-md ${
                  i === 4 ? "bg-white" : "bg-white/10"
                }`}
                style={{ height: `${h}%` }}
              />
              <div className="text-[9px] text-white/40 font-medium">{days[i]}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          <div className="rounded-lg bg-white/[0.04] px-2 py-2">
            <div className="text-[9px] text-white/50">Orders</div>
            <div className="text-[13px] font-medium text-white mt-0.5">412</div>
          </div>
          <div className="rounded-lg bg-white/[0.04] px-2 py-2">
            <div className="text-[9px] text-white/50">Avg ticket</div>
            <div className="text-[13px] font-medium text-white mt-0.5">€34</div>
          </div>
          <div className="rounded-lg bg-white/[0.04] px-2 py-2">
            <div className="text-[9px] text-white/50">Branches</div>
            <div className="text-[13px] font-medium text-white mt-0.5">12</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── YETENEK KARTI 1: "Hourly sales heatmap" ──────────────────────────────

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

// ─── YETENEK KARTI 2: "Branch & channel comparison" ───────────────────────

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

// ─── YETENEK KARTI 3: "Payment & product mix" ─────────────────────────────

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
  let offset = 0;
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
        const el = (
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
        offset += len;
        return el;
      })}
    </svg>
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

// ─── YETENEK KARTI 4: "Comp/void monitoring" ──────────────────────────────

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
