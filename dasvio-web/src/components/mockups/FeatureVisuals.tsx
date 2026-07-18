import { QrCode, Languages, Coffee, Plug } from "lucide-react";

const card = "rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur";

export function QrVisual() {
  return (
    <div className="relative w-full h-full min-h-[340px] flex items-center justify-center">
      <div className="relative w-[200px] aspect-[9/19] rounded-[28px] bg-zinc-900 p-1.5 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
        <div className="relative rounded-[22px] bg-zinc-950 h-full w-full overflow-hidden">
          <div className="absolute top-1.5 inset-x-0 h-3 flex justify-center">
            <div className="h-2.5 w-16 rounded-full bg-zinc-800" />
          </div>
          <div className="absolute inset-0 pt-6 px-2.5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="text-[9px] font-bold text-white">Café Roma</div>
              <Languages className="size-3 text-white" strokeWidth={2.25} />
            </div>
            <div className="flex gap-1 overflow-hidden">
              {["All", "Coffee", "Brunch"].map((c, i) => (
                <div
                  key={c}
                  className={`px-2 py-0.5 rounded-full text-[7px] font-semibold ${
                    i === 0
                      ? "bg-white text-black"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  {c}
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-white/10 p-1.5 mt-0.5">
              <div className="text-[6px] font-bold text-white/70 uppercase">
                This week
              </div>
              <div className="text-[8px] font-bold text-white leading-tight mt-0.5">
                20% off all filter coffee
              </div>
            </div>
            {[
              { name: "Latte", price: "€4.5", color: "#d4a574" },
              { name: "Cappuccino", price: "€4.5", color: "#a87b50" },
              { name: "Flat White", price: "€5", color: "#c69874" },
            ].map((item) => (
              <div key={item.name} className="flex gap-1.5 items-center">
                <div
                  className="flex-none size-7 rounded-lg"
                  style={{ background: item.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[8px] font-semibold text-white leading-tight">
                    {item.name}
                  </div>
                  <div className="text-[6px] text-white/50 mt-0.5 line-clamp-1">
                    Single shot espresso
                  </div>
                </div>
                <div className="text-[8px] font-bold text-white">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute right-[10%] top-[15%] hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/90 backdrop-blur px-2.5 py-1.5 shadow-lg">
        <QrCode className="size-3.5 text-white" strokeWidth={2.25} />
        <div className="text-[10.5px] font-semibold text-white">14 languages</div>
      </div>
    </div>
  );
}

export function PosVisual() {
  const items = [
    { name: "Margherita", qty: 2, price: 18 },
    { name: "Caesar Salad", qty: 1, price: 14 },
    { name: "Tiramisu", qty: 2, price: 16 },
  ];
  return (
    <div className="w-full h-full min-h-[340px] flex items-center justify-center">
      <div className={`${card} w-full max-w-[340px] p-4`}>
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-wider text-white/50">
              Table 7
            </div>
            <div className="text-[15px] font-medium text-white mt-0.5">
              Order #2418
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 text-white/70 text-[10px] font-semibold">
            <span className="size-1.5 rounded-full bg-white" /> Active
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          {items.map((it) => (
            <div key={it.name} className="flex items-center gap-3 py-1.5 text-[12px]">
              <div className="size-7 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-semibold text-white/70">
                {it.qty}×
              </div>
              <div className="flex-1 text-white">{it.name}</div>
              <div className="text-white/70 font-medium">€{it.price}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="text-[11px] text-white/50">Total</div>
          <div className="text-[18px] font-medium text-white">€48.00</div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="h-9 rounded-xl border border-white/15 text-[11px] font-semibold text-white">
            Split bill
          </button>
          <button className="h-9 rounded-xl bg-white text-black text-[11px] font-semibold">
            Charge
          </button>
        </div>
      </div>
    </div>
  );
}

export function BranchVisual() {
  const branches = ["Kadıköy", "Beşiktaş", "Ataşehir", "Bağdat", "Ankara", "İzmir"];
  const menus = ["Classic", "Brunch", "Summer", "Vegan"];
  const assignment: boolean[][] = [
    [true, true, true, false],
    [true, true, true, false],
    [true, false, true, true],
    [true, true, false, false],
    [true, false, true, true],
    [true, true, true, true],
  ];
  return (
    <div className="w-full h-full min-h-[340px] flex items-center justify-center">
      <div className={`${card} w-full max-w-[380px] p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
            Branch × Menu
          </div>
          <div className="text-[10px] text-white/70 font-semibold bg-white/8 px-2 py-0.5 rounded-full">
            6 × 4
          </div>
        </div>
        <table className="w-full border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="w-20" />
              {menus.map((m) => (
                <th
                  key={m}
                  className="text-[9px] font-semibold text-white/50 text-center p-1"
                >
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {branches.map((b, ri) => (
              <tr key={b}>
                <td className="text-[10px] font-medium text-white pr-1 py-0.5">
                  {b}
                </td>
                {menus.map((m, ci) => (
                  <td key={m} className="p-0">
                    <div
                      className={`h-6 rounded-md flex items-center justify-center ${
                        assignment[ri][ci]
                          ? "bg-white text-black"
                          : "bg-white/5 text-white/20"
                      }`}
                    >
                      {assignment[ri][ci] ? (
                        <svg className="size-3" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3 8.5l3 3 7-7"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <span className="text-[10px]">—</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function IntegrationsVisual() {
  const platforms = [
    { mark: "G", label: "Getir", bg: "#5d3ebc" },
    { mark: "T", label: "Trendyol", bg: "#f27a1a" },
    { mark: "Y", label: "Yemeksepeti", bg: "#fa0050" },
    { mark: "M", label: "Migros", bg: "#ff6600" },
    { mark: "Q", label: "Qapera", bg: "#0a0a0a", border: true },
    { mark: "e", label: "e-Adisyon", bg: "#0070f3" },
  ];
  return (
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
  );
}

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
