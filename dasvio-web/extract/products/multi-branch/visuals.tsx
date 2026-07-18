/**
 * multi-branch ürün sayfası — hero mockup + 12 yetenek kartı görseli.
 * Deploy DOM'una birebir (tr/products/multi-branch.html ile en/products/multi-branch.html aynı).
 *
 * Şablon çerçeveleri (bu dosyaya DAHİL DEĞİL, sayfa şablonunun parçası):
 *  - Hero çerçevesi: <div class="mt-14 lg:mt-20 rounded-lg border border-white/10 bg-zinc-950 overflow-hidden"
 *      style="box-shadow:0 60px 120px #f43f5e1f, inset 0 0 0 1px rgba(255,255,255,0.02)"> <div class="w-full"> …hero görseli…
 *  - Kart çerçevesi: <div class="rounded-xl bg-black border border-white/10 p-3 lg:p-4 flex flex-col h-full
 *      hover:-translate-y-1 transition-all duration-500" style="--tint:#f43f5e">
 *      <div class="rounded-lg bg-zinc-950 border border-white/5 p-1 h-[200px] flex items-center justify-center"> …kart görseli…
 *
 * Not: Katalog Freeze simülasyon bölümü (CatalogFreezeSimulation client bileşeni) bilinçli olarak burada YOK —
 * bkz. simulation-dom.txt ve content.json "hasSimulation".
 */

const wrap = "w-full h-full flex items-center justify-center";

/* ── Ortak küçük SVG'ler (deploy DOM'undaki lucide çıktısıyla birebir) ── */

function HeroCheck() {
  return (
    <svg className="size-3" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8.5l3 3 7-7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitBranchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-git-branch size-2.5 text-white/25 mx-auto"
      aria-hidden="true"
    >
      <path d="M15 6a9 9 0 0 0-9 9V3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
    </svg>
  );
}

function ArrowRightMini() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-right size-2.5 text-white/15 flex-none"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function AuditCheck() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-check size-3.5"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* ── HERO: Branch × Menu matrisi ── */

export function multiBranchHero() {
  const menus = ["Classic", "Brunch", "Summer", "Vegan"];
  const rows: { branch: string; cells: boolean[] }[] = [
    { branch: "Kadıköy", cells: [true, true, true, false] },
    { branch: "Beşiktaş", cells: [true, true, true, false] },
    { branch: "Ataşehir", cells: [true, false, true, true] },
    { branch: "Bağdat", cells: [true, true, false, false] },
    { branch: "Ankara", cells: [true, false, true, true] },
    { branch: "İzmir", cells: [true, true, true, true] },
  ];
  return (
    <div className="w-full h-full min-h-[340px] flex items-center justify-center">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur w-full max-w-[380px] p-4">
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
            {rows.map((row) => (
              <tr key={row.branch}>
                <td className="text-[10px] font-medium text-white pr-1 py-0.5">
                  {row.branch}
                </td>
                {row.cells.map((on, i) => (
                  <td key={i} className="p-0">
                    {on ? (
                      <div className="h-6 rounded-md flex items-center justify-center bg-white text-black">
                        <HeroCheck />
                      </div>
                    ) : (
                      <div className="h-6 rounded-md flex items-center justify-center bg-white/5 text-white/20">
                        <span className="text-[10px]">—</span>
                      </div>
                    )}
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

/* ── Kart 1: Merkezi master menü ── */

export function masterMenuVisual() {
  const categories = ["Başlangıçlar", "Ana Yemekler", "İçecekler"];
  const branches = ["Kadıköy", "Beşiktaş", "Nişantaşı"];
  return (
    <div className={wrap}>
      <div className="w-full max-w-[220px]">
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 mb-2">
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-layers size-3.5 text-rose-400"
              aria-hidden="true"
            >
              <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
              <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
              <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
            </svg>
            <span className="text-[10px] font-semibold text-rose-300">
              Master Menü
            </span>
          </div>
          <div className="space-y-1">
            {categories.map((c) => (
              <div
                key={c}
                className="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1"
              >
                <div className="size-1.5 rounded-full bg-rose-400" />
                <span className="text-[9px] text-white/60">{c}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-1">
          {branches.map((b) => (
            <div
              key={b}
              className="flex-1 rounded-lg border border-white/8 bg-white/3 px-1.5 py-1.5 text-center"
            >
              <GitBranchIcon />
              <div className="text-[7px] text-white/40 mt-0.5">{b}</div>
              <div className="size-1 rounded-full bg-emerald-400 mx-auto mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Kart 2: Şube bazlı fiyat override ── */

export function priceOverrideVisual() {
  return (
    <div className={wrap}>
      <div className="w-full max-w-[220px] space-y-1">
        <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-2.5 py-2">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-medium text-white/60 truncate">
              Margherita
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[8px] text-white/25 line-through">₺180</span>
              <span className="text-[10px] font-semibold text-rose-300">₺195</span>
            </div>
          </div>
          <div className="rounded px-1.5 py-0.5 text-[7px] font-semibold bg-orange-500/15 text-orange-300">
            Override
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-2.5 py-2">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-medium text-white/60 truncate">
              Caesar Salad
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-semibold text-white/50">₺120</span>
            </div>
          </div>
          <div className="rounded px-1.5 py-0.5 text-[7px] font-semibold bg-white/5 text-white/30">
            Master
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-2.5 py-2">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-medium text-white/60 truncate">
              Latte
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[8px] text-white/25 line-through">₺65</span>
              <span className="text-[10px] font-semibold text-rose-300">₺75</span>
            </div>
          </div>
          <div className="rounded px-1.5 py-0.5 text-[7px] font-semibold bg-purple-500/15 text-purple-300">
            Grup
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Kart 3: Hiyerarşik mağaza grupları ── */

export function storeGroupsVisual() {
  const nodes: { name: string; depth: number; active?: boolean; badge?: string }[] = [
    { name: "İstanbul", depth: 0, active: true, badge: "+10%" },
    { name: "Anadolu Yakası", depth: 1, active: true, badge: "+5%" },
    { name: "AVM Şubeleri", depth: 2, badge: "+15%" },
    { name: "Cadde Şubeleri", depth: 2 },
    { name: "Avrupa Yakası", depth: 1, badge: "+8%" },
    { name: "Ankara", depth: 0 },
  ];
  return (
    <div className={wrap}>
      <div className="w-full max-w-[200px]">
        <div className="flex items-center gap-1.5 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-store size-3 text-rose-400"
            aria-hidden="true"
          >
            <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
            <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
            <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
          </svg>
          <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">
            Mağaza Grupları
          </span>
        </div>
        <div className="space-y-0.5 pl-1">
          {nodes.map((n) => (
            <div
              key={n.name}
              className="flex items-center gap-1.5"
              style={{ paddingLeft: n.depth * 12 }}
            >
              <div
                className={`size-1.5 rounded-sm ${n.active ? "bg-rose-400" : "bg-white/20"}`}
              />
              <span className="text-[9px] text-white/60 flex-1">{n.name}</span>
              {n.badge && (
                <span className="text-[8px] font-semibold text-emerald-300 bg-emerald-500/10 rounded px-1 py-0.5">
                  {n.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Kart 4: Bölgesel fiyat tier'ları ── */

export function priceTiersVisual() {
  const tiers = [
    { icon: "★", color: "#f59e0b", name: "Premium", price: "₺145" },
    { icon: "●", color: "#06b6d4", name: "Standard", price: "₺119" },
    { icon: "↓", color: "#10b981", name: "Discount", price: "₺95" },
  ];
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-1.5">
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
          <div className="ml-auto text-[12px] font-bold text-white">{t.price}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Kart 5: Katalog dondurma & yayınlama ── */

export function catalogFreezeVisual() {
  return (
    <div className={wrap}>
      <div className="w-full max-w-[220px]">
        <div className="flex items-center gap-1.5 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-snowflake size-3.5 text-blue-400"
            aria-hidden="true"
          >
            <path d="m10 20-1.25-2.5L6 18" />
            <path d="M10 4 8.75 6.5 6 6" />
            <path d="m14 20 1.25-2.5L18 18" />
            <path d="m14 4 1.25 2.5L18 6" />
            <path d="m17 21-3-6h-4" />
            <path d="m17 3-3 6 1.5 3" />
            <path d="M2 12h6.5L10 9" />
            <path d="m20 10-1.5 2 1.5 2" />
            <path d="M22 12h-6.5L14 15" />
            <path d="m4 10 1.5 2L4 14" />
            <path d="m7 21 3-6-1.5-3" />
            <path d="m7 3 3 6h4" />
          </svg>
          <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">
            Katalog Pipeline
          </span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-1 flex-1">
            <div className="flex-1 h-7 rounded-lg flex items-center justify-center text-[8px] font-semibold border border-white/8 bg-white/3 text-white/30">
              Aktif
            </div>
            <ArrowRightMini />
          </div>
          <div className="flex items-center gap-1 flex-1">
            <div className="flex-1 h-7 rounded-lg flex items-center justify-center text-[8px] font-semibold border border-blue-500/40 bg-blue-500/15 text-blue-300">
              Dondur
            </div>
            <ArrowRightMini />
          </div>
          <div className="flex items-center gap-1 flex-1">
            <div className="flex-1 h-7 rounded-lg flex items-center justify-center text-[8px] font-semibold border border-white/8 bg-white/3 text-white/30">
              Yayınla
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-2.5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-white/50">Değişiklik sayısı</span>
            <span className="text-[10px] font-bold text-blue-300">24</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-white/50">Etkilenen şube</span>
            <span className="text-[10px] font-bold text-blue-300">148</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
          </div>
          <div className="text-[7px] text-white/30 text-right">
            148/205 şubeye teslim edildi
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Kart 6: Toplu fiyat editörü (spreadsheet) ── */

export function bulkPriceEditorVisual() {
  const cell = "bg-zinc-950 p-1.5 text-center text-[9px] font-medium";
  return (
    <div className={wrap}>
      <div className="w-full max-w-[220px]">
        <div className="flex items-center gap-1.5 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-grid3x3 lucide-grid-3x3 size-3 text-white/40"
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M3 15h18" />
            <path d="M9 3v18" />
            <path d="M15 3v18" />
          </svg>
          <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">
            Toplu Fiyat Editörü
          </span>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 overflow-hidden">
          <div className="grid grid-cols-4 gap-px bg-white/5">
            <div className="bg-zinc-900 p-1.5" />
            {["Kadıköy", "Beşiktaş", "Nişantaşı"].map((b) => (
              <div
                key={b}
                className="bg-zinc-900 p-1.5 text-center text-[7px] font-semibold text-white/40 uppercase"
              >
                {b}
              </div>
            ))}
            <div className="bg-zinc-950 p-1.5 text-[8px] text-white/50 font-medium flex items-center">
              Margherita
            </div>
            <div className={`${cell} text-white/50`}>₺180</div>
            <div className={`${cell} text-rose-300`}>₺195</div>
            <div className={`${cell} text-rose-300`}>₺210</div>
            <div className="bg-zinc-950 p-1.5 text-[8px] text-white/50 font-medium flex items-center">
              Latte
            </div>
            <div className={`${cell} text-white/50`}>₺65</div>
            <div className={`${cell} text-white/50`}>₺65</div>
            <div className={`${cell} text-rose-300`}>₺75</div>
            <div className="bg-zinc-950 p-1.5 text-[8px] text-white/50 font-medium flex items-center">
              Cheesecake
            </div>
            <div className={`${cell} text-white/50`}>₺90</div>
            <div className={`${cell} text-rose-300`}>₺95</div>
            <div className={`${cell} text-white/50`}>₺90</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Kart 7: Kampanya oluşturucu (9 tip) ── */

export function campaignBuilderVisual() {
  const campaigns = [
    { letter: "B", color: "#10b981", name: "1 Al 1 Öde", type: "BOGO", status: "Aktif" },
    { letter: "H", color: "#f59e0b", name: "%30 İndirim", type: "Happy Hour", status: "Zamanlanmış" },
    { letter: "S", color: "#6b7280", name: "₺500+ Ücretsiz Tatlı", type: "Sepet", status: "Taslak" },
  ];
  return (
    <div className={wrap}>
      <div className="w-full max-w-[200px] space-y-1.5">
        <div className="flex items-center gap-1.5 mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-tag size-3 text-rose-400"
            aria-hidden="true"
          >
            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
          </svg>
          <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">
            Kampanya Oluşturucu
          </span>
        </div>
        {campaigns.map((c) => (
          <div
            key={c.name}
            className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-2.5 py-2"
          >
            <div
              className="size-6 rounded-md flex items-center justify-center text-[8px] font-bold"
              style={{ background: `${c.color}30`, color: c.color }}
            >
              {c.letter}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-medium text-white/60 truncate">
                {c.name}
              </div>
              <div className="text-[7px] text-white/30">{c.type}</div>
            </div>
            <div
              className="rounded px-1 py-0.5 text-[7px] font-semibold"
              style={{ background: `${c.color}15`, color: c.color }}
            >
              {c.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Kart 8: Platform bazlı fiyatlama ── */

export function platformPricingVisual() {
  const platforms = [
    { letter: "G", bg: "#5d3ebc", fg: "#fff", name: "Getir", price: "₺210", delta: "+17%" },
    { letter: "T", bg: "#f27a1a", fg: "#fff", name: "Trendyol", price: "₺205", delta: "+14%" },
    { letter: "Y", bg: "#fa0050", fg: "#fff", name: "Yemeksepeti", price: "₺200", delta: "+11%" },
    { letter: "S", bg: "#ffffff", fg: "#000", name: "Salon", price: "₺180", delta: "Baz" },
  ];
  return (
    <div className={wrap}>
      <div className="w-full max-w-[210px]">
        <div className="flex items-center gap-1.5 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trending-up size-3 text-white/40"
            aria-hidden="true"
          >
            <path d="M16 7h6v6" />
            <path d="m22 7-8.5 8.5-5-5L2 17" />
          </svg>
          <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">
            Platform Fiyatlama
          </span>
        </div>
        <div className="space-y-1">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-2.5 py-1.5"
            >
              <div
                className="size-5 rounded flex items-center justify-center text-[8px] font-bold"
                style={{ background: p.bg, color: p.fg }}
              >
                {p.letter}
              </div>
              <span className="text-[9px] text-white/50 flex-1">{p.name}</span>
              <span className="text-[10px] font-medium text-white/60">{p.price}</span>
              <span
                className={`text-[8px] font-semibold ${
                  p.delta === "Baz" ? "text-white/30" : "text-emerald-300"
                }`}
              >
                {p.delta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Kart 9: Şube politikaları & yetki ── */

export function branchPoliciesVisual() {
  const policies = [
    { name: "Fiyat değiştirme", on: true },
    { name: "Ürün gizleme", on: true },
    { name: "86 (tükenme)", on: true },
    { name: "İndirim oluşturma", on: false },
  ];
  return (
    <div className={wrap}>
      <div className="w-full max-w-[200px]">
        <div className="flex items-center gap-1.5 mb-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-sliders-horizontal size-3 text-rose-400"
            aria-hidden="true"
          >
            <path d="M10 5H3" />
            <path d="M12 19H3" />
            <path d="M14 3v4" />
            <path d="M16 17v4" />
            <path d="M21 12h-9" />
            <path d="M21 19h-5" />
            <path d="M21 5h-7" />
            <path d="M8 10v4" />
            <path d="M8 12H3" />
          </svg>
          <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">
            Şube Politikaları
          </span>
        </div>
        <div className="space-y-1.5">
          {policies.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-between rounded-lg border border-white/8 bg-white/3 px-3 py-1.5"
            >
              <span className="text-[10px] text-white/60">{p.name}</span>
              <div
                className={`w-7 h-4 rounded-full relative ${
                  p.on ? "bg-rose-500/30" : "bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-0.5 size-3 rounded-full transition-all ${
                    p.on ? "left-3.5 bg-rose-400" : "left-0.5 bg-white/30"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Kart 10: Enterprise raporlama (5 rapor) ── */

export function enterpriseReportingVisual() {
  const branches = [
    { name: "Kadıköy", value: "₺48.2K", width: "85%" },
    { name: "Beşiktaş", value: "₺41.7K", width: "73%" },
    { name: "Nişantaşı", value: "₺36.1K", width: "63%" },
    { name: "Ataşehir", value: "₺28.9K", width: "50%" },
  ];
  return (
    <div className={wrap}>
      <div className="w-full max-w-[220px]">
        <div className="flex items-center gap-1.5 mb-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chart-no-axes-column size-3 text-rose-400"
            aria-hidden="true"
          >
            <path d="M5 21v-6" />
            <path d="M12 21V3" />
            <path d="M19 21V9" />
          </svg>
          <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">
            Şube Karşılaştırma
          </span>
        </div>
        <div className="space-y-2">
          {branches.map((b) => (
            <div key={b.name} className="space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-white/50">{b.name}</span>
                <span className="text-[9px] font-semibold text-white/70">
                  {b.value}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 to-rose-400"
                  style={{ width: b.width }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Kart 11: Menü zamanlama & klonlama ── */

export function menuSchedulingVisual() {
  const days = [
    { d: "M", n: "18", active: false },
    { d: "T", n: "19", active: true },
    { d: "W", n: "20", active: true },
    { d: "T", n: "21", active: true },
    { d: "F", n: "22", active: false },
    { d: "S", n: "23", active: true },
    { d: "S", n: "24", active: true },
  ];
  return (
    <div className={wrap}>
      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center justify-between mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-calendar size-3.5 text-white"
            aria-hidden="true"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>
          <div className="text-[9px] uppercase tracking-wider text-white/50 font-semibold">
            Week 47
          </div>
        </div>
        <div className="flex gap-1">
          {days.map((day, i) => (
            <div
              key={i}
              className={`size-8 rounded-lg flex flex-col items-center justify-center gap-0.5 ${
                day.active ? "bg-white text-black" : "bg-white/5 text-white/40"
              }`}
            >
              <div className="text-[8px] font-bold leading-none">{day.d}</div>
              <div className="text-[9px] font-medium leading-none">{day.n}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Kart 12: Override özet & audit ── */

export function overrideAuditVisual() {
  const cells: ("check" | "lira" | "none")[] = [
    "check", "check", "lira", "none",
    "check", "lira", "check", "check",
    "check", "check", "none", "lira",
  ];
  return (
    <div className={wrap}>
      <div className="grid grid-cols-4 gap-1.5 p-3 rounded-xl bg-white/5 border border-white/10">
        {cells.map((c, i) => (
          <div
            key={i}
            className={`size-7 rounded-md flex items-center justify-center text-[10px] font-bold ${
              c === "check"
                ? "bg-white/80 text-black"
                : c === "lira"
                  ? "bg-amber-400/80 text-zinc-900"
                  : "bg-white/5 text-white/30"
            }`}
          >
            {c === "check" ? <AuditCheck /> : c === "lira" ? "₺" : "—"}
          </div>
        ))}
      </div>
    </div>
  );
}
