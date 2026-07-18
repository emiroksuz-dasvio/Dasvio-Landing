/**
 * staff-permissions — sayfaya özgü mockup/görsel DOM alt ağaçları.
 * Kaynak: deploy/tr/products/staff-permissions.html (EN sayfada birebir aynı DOM).
 * Her bileşen render edilen DOM'a birebir sadıktır (class string'leri, SVG path'leri, inline style'lar).
 * Kart görselleri, yetenek kartındaki "rounded-lg bg-zinc-950 ... h-[200px]" çerçevesinden başlar.
 */

import { Fragment } from "react";

/* ---------- Paylaşılan lucide ikonları (sayfadaki render ile birebir) ---------- */

function LockIcon({ className }: { className: string }) {
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
      className={className}
      aria-hidden="true"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function UsersIcon({ className }: { className: string }) {
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
      className={className}
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  );
}

/* ---------- Hero mockup ---------- */
/** Çerçeveli statik POS ürün görseli (hero'da başlığın altında, çiplerin üstünde). */
export function staffPermissionsHero() {
  return (
    <div
      className="mt-14 lg:mt-20 rounded-lg border border-white/10 bg-zinc-950 overflow-hidden"
      style={{ boxShadow: "0 60px 120px #3b82f61f, inset 0 0 0 1px rgba(255,255,255,0.02)" }}
    >
      <div className="w-full">
        <img src="/images/pos/dasvio_qsr.png" alt="Dasvio POS" className="w-full h-auto block" />
      </div>
    </div>
  );
}

/* ---------- Kart 1: Detaylı yetki matrisi ---------- */
export function staffPermissionsMatrixVisual() {
  const rows = [
    { role: "Yönetici", cells: [true, true, true, true, true] },
    { role: "Kasiyer", cells: [true, true, false, false, false] },
    { role: "Garson", cells: [true, false, false, false, false] },
  ];
  const headers = ["Oku", "Yaz", "Sil", "Fiyat", "İade"];
  return (
    <div className="rounded-lg bg-zinc-950 border border-white/5 p-1 h-[200px] flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[220px]">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 overflow-hidden">
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
                className="lucide lucide-shield size-3.5 text-blue-400"
                aria-hidden="true"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              </svg>
              <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">Yetki Matrisi</span>
            </div>
            <div className="grid grid-cols-6 gap-0.5 text-[7px]">
              <div />
              {headers.map((h) => (
                <div key={h} className="text-center text-white/30 font-semibold uppercase tracking-wider pb-1">
                  {h}
                </div>
              ))}
              {rows.map((row) => (
                <Fragment key={row.role}>
                  <div className="text-[9px] font-medium text-white/60 flex items-center">{row.role}</div>
                  {row.cells.map((ok, i) => (
                    <div key={i} className="flex items-center justify-center">
                      <div
                        className={`size-3.5 rounded flex items-center justify-center ${ok ? "bg-blue-500/20" : "bg-white/5"}`}
                      >
                        {ok ? (
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
                            className="lucide lucide-check size-2 text-blue-400"
                            aria-hidden="true"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        ) : (
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
                            className="lucide lucide-x size-2 text-white/15"
                            aria-hidden="true"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Kart 2: POS PIN giriş & hızlı oturum ---------- */
export function staffPermissionsPinVisual() {
  return (
    <div className="rounded-lg bg-zinc-950 border border-white/5 p-1 h-[200px] flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[160px] flex flex-col items-center gap-3">
          <div className="size-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-fingerprint-pattern size-7 text-blue-400"
              aria-hidden="true"
            >
              <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
              <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
              <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
              <path d="M2 12a10 10 0 0 1 18-6" />
              <path d="M2 16h.01" />
              <path d="M21.8 16c.2-2 .131-5.354 0-6" />
              <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
              <path d="M8.65 22c.21-.66.45-1.32.57-2" />
              <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
            </svg>
          </div>
          <div className="flex gap-2">
            <div className="size-3 rounded-full bg-blue-400" />
            <div className="size-3 rounded-full bg-blue-400" />
            <div className="size-3 rounded-full bg-blue-400" />
            <div className="size-3 rounded-full border border-white/20 bg-transparent" />
          </div>
          <div className="grid grid-cols-3 gap-1 w-full max-w-[120px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <div
                key={n}
                className="aspect-square rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[11px] font-medium text-white/50"
              >
                {n}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <LockIcon className="lucide lucide-lock size-2.5 text-blue-400" />
            <span className="text-[8px] text-white/40 uppercase tracking-wider font-semibold">POS Giriş</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Kart 3: Personel yönetimi & davet ---------- */
export function staffPermissionsStaffListVisual() {
  const staff = [
    { initial: "A", name: "Ahmet K.", role: "Yönetici", color: "#3b82f6" },
    { initial: "E", name: "Elif S.", role: "Kasiyer", color: "#10b981" },
    { initial: "M", name: "Mehmet D.", role: "Garson", color: "#f59e0b" },
  ];
  return (
    <div className="rounded-lg bg-zinc-950 border border-white/5 p-1 h-[200px] flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[200px] space-y-1.5">
          {staff.map((s) => (
            <div key={s.name} className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div
                className="size-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: s.color }}
              >
                {s.initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-medium text-white/70 truncate">{s.name}</div>
                <div className="text-[9px] text-white/40">{s.role}</div>
              </div>
              <div className="size-2 rounded-full bg-emerald-400" />
            </div>
          ))}
          <div className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/15 bg-white/3 px-3 py-2 cursor-pointer">
            <UsersIcon className="lucide lucide-users size-3 text-white/30" />
            <span className="text-[9px] text-white/40 font-medium">Personel Davet Et</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Kart 4: Yönetici onay akışları (JIT) ---------- */
export function staffPermissionsApprovalVisual() {
  return (
    <div className="rounded-lg bg-zinc-950 border border-white/5 p-1 h-[200px] flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[200px] flex flex-col items-center gap-3">
          <div className="w-full rounded-xl border border-amber-500/25 bg-amber-500/5 p-3">
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
                className="lucide lucide-triangle-alert size-3.5 text-amber-400"
                aria-hidden="true"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
              <span className="text-[10px] font-semibold text-amber-300">Yönetici Onayı Gerekli</span>
            </div>
            <div className="text-[9px] text-white/50 mb-3">{"İade işlemi için yönetici PIN'i giriniz"}</div>
            <div className="flex gap-2 justify-center mb-2">
              <div className="size-2.5 rounded-full bg-amber-400" />
              <div className="size-2.5 rounded-full bg-amber-400" />
              <div className="size-2.5 rounded-full border border-white/20" />
              <div className="size-2.5 rounded-full border border-white/20" />
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              <div className="rounded-md px-2 py-1 text-center text-[8px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/25">
                İade
              </div>
              <div className="rounded-md px-2 py-1 text-center text-[8px] font-medium bg-white/5 text-white/30 border border-white/5">
                Void
              </div>
              <div className="rounded-md px-2 py-1 text-center text-[8px] font-medium bg-white/5 text-white/30 border border-white/5">
                İndirim
              </div>
              <div className="rounded-md px-2 py-1 text-center text-[8px] font-medium bg-white/5 text-white/30 border border-white/5">
                Kasa
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Kart 5: Şube bazlı erişim kontrolü ---------- */
export function staffPermissionsBranchAccessVisual() {
  const branches = [
    { name: "Kadıköy", access: true },
    { name: "Beşiktaş", access: true },
    { name: "Ataşehir", access: false },
    { name: "Bakırköy", access: false },
  ];
  return (
    <div className="rounded-lg bg-zinc-950 border border-white/5 p-1 h-[200px] flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
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
              className="lucide lucide-eye size-3 text-blue-400"
              aria-hidden="true"
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">Şube Erişimi</span>
          </div>
          <div className="space-y-1">
            {branches.map((b) => (
              <div
                key={b.name}
                className="flex items-center justify-between rounded-lg border border-white/8 bg-white/3 px-3 py-1.5"
              >
                <div className="flex items-center gap-2">
                  <div className={`size-2 rounded-full ${b.access ? "bg-blue-400" : "bg-white/15"}`} />
                  <span className="text-[10px] text-white/60 font-medium">{b.name}</span>
                </div>
                <div
                  className={`rounded px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-wider ${
                    b.access ? "bg-blue-500/15 text-blue-300" : "bg-white/5 text-white/25"
                  }`}
                >
                  {b.access ? "Erişim" : "Kilitli"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Kart 6: Vardiya planı & mesai takibi ---------- */
export function staffPermissionsShiftPlanVisual() {
  const shifts = [
    { name: "Sabah", time: "08:00–16:00", color: "#f59e0b", width: "33%", left: "0%", count: 3 },
    { name: "Öğle", time: "12:00–20:00", color: "#3b82f6", width: "33%", left: "16%", count: 5 },
    { name: "Akşam", time: "16:00–00:00", color: "#8b5cf6", width: "33%", left: "33%", count: 4 },
  ];
  return (
    <div className="rounded-lg bg-zinc-950 border border-white/5 p-1 h-[200px] flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
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
              className="lucide lucide-calendar size-3 text-white/40"
              aria-hidden="true"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
            <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">Vardiya Planı</span>
          </div>
          <div className="space-y-2">
            {shifts.map((s) => (
              <div key={s.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-[10px] font-medium text-white/60">{s.name}</span>
                  </div>
                  <span className="text-[9px] text-white/30">{s.time}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ background: `${s.color}40`, width: s.width, marginLeft: s.left }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <UsersIcon className="lucide lucide-users size-2.5 text-white/25" />
                  <span className="text-[8px] text-white/30">{s.count} personel</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Kart 7: Tam işlem geçmişi (Audit Trail) ---------- */
export function staffPermissionsAuditTrailVisual() {
  const events = [
    { dot: "bg-red-400", label: "İade onaylandı", who: "Ahmet K.", time: "14:23" },
    { dot: "bg-emerald-400", label: "İndirim uygulandı", who: "Elif S.", time: "14:18" },
    { dot: "bg-amber-400", label: "Void yapıldı", who: "Mehmet D.", time: "14:12" },
    { dot: "bg-emerald-400", label: "Kasa açıldı", who: "Ahmet K.", time: "14:05" },
  ];
  return (
    <div className="rounded-lg bg-zinc-950 border border-white/5 p-1 h-[200px] flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[220px] space-y-1">
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
              className="lucide lucide-clipboard-list size-3 text-white/40"
              aria-hidden="true"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="M12 11h4" />
              <path d="M12 16h4" />
              <path d="M8 11h.01" />
              <path d="M8 16h.01" />
            </svg>
            <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">İşlem Geçmişi</span>
          </div>
          {events.map((e) => (
            <div key={e.time} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/3 px-2.5 py-1.5">
              <div className={`size-1.5 rounded-full flex-none ${e.dot}`} />
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-medium text-white/60 truncate">{e.label}</div>
                <div className="text-[7px] text-white/30">{e.who}</div>
              </div>
              <div className="text-[8px] text-white/25 flex-none">{e.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Kart 8: Saat bazlı erişim kısıtlaması ---------- */
export function staffPermissionsTimeAccessVisual() {
  // 24 saat hücresi: 09:00–21:59 arası (index 9–21) aktif/mavi, kalanı pasif.
  const hours = Array.from({ length: 24 }, (_, h) => h >= 9 && h <= 21);
  return (
    <div className="rounded-lg bg-zinc-950 border border-white/5 p-1 h-[200px] flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[220px]">
          <div className="flex items-center gap-1.5 mb-3">
            <LockIcon className="lucide lucide-lock size-3 text-blue-400" />
            <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">Saat Bazlı Erişim</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-white/60">Erişim penceresi</span>
              <span className="text-[10px] font-semibold text-blue-300">09:00–22:00</span>
            </div>
            <div className="flex gap-[2px]">
              {hours.map((active, h) => (
                <div key={h} className={`flex-1 h-5 rounded-sm ${active ? "bg-blue-500/30" : "bg-white/5"}`} />
              ))}
            </div>
            <div className="flex items-center justify-between text-[7px] text-white/25">
              <span>00:00</span>
              <span>12:00</span>
              <span>23:59</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-2.5 py-1.5">
              <LockIcon className="lucide lucide-lock size-3 text-red-400 flex-none" />
              <div>
                <div className="text-[9px] font-medium text-red-300">Mesai dışı otomatik kilit</div>
                <div className="text-[7px] text-white/30">22:00 sonrası POS erişimi engellenir</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
