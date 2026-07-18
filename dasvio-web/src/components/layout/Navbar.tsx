"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  QrCode,
  Cpu,
  Building2,
  Plug,
  BarChart3,
  MonitorPlay,
  Users,
  LayoutGrid,
  GitBranch,
  Coins,
  Activity,
  PieChart,
  UtensilsCrossed,
  Coffee,
  Pizza,
  Wine,
  BedDouble,
  Truck,
  Store,
  Newspaper,
  BookOpen,
  HelpCircle,
  Code2,
  GraduationCap,
  Info,
  Briefcase,
  Calendar,
  Mail,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import type { Locale } from "@/i18n/config";

type NavDict = {
  products: string;
  solutions: string;
  pricing: string;
  resources: string;
  login: string;
  demo: string;
  menu: Record<string, string>;
};

type DropdownItem = {
  Icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
};

type DropdownGroup = {
  label: string;
  color: string;
  items: DropdownItem[];
};

type Section = {
  label: string;
  key: string;
  width: "md" | "lg" | "xl";
  groups: DropdownGroup[];
};

const buildSections = (locale: Locale): Section[] => [
  {
    label: "Ürünler",
    key: "products",
    width: "xl",
    groups: [
      {
        label: "Müşteri deneyimi",
        color: "#f43f5e",
        items: [
          {
            Icon: QrCode,
            title: "QR Menü",
            desc: "Çok dilli dijital menü, AI çeviri",
            href: `/${locale}/products/qr-menu`,
          },
          {
            Icon: MonitorPlay,
            title: "Digital Signage",
            desc: "Restoran ekranları & playlist",
            href: `/${locale}/products/signage`,
          },
        ],
      },
      {
        label: "Operasyon",
        color: "#e11d48",
        items: [
          {
            Icon: Cpu,
            title: "POS Yönetimi",
            desc: "Cihazlar, yazıcılar, gelir merkezleri",
            href: `/${locale}/products/pos`,
          },
          {
            Icon: Users,
            title: "Personel & Yetki",
            desc: "Roller, vardiyalar, POS PIN'leri",
            href: `/${locale}/products/staff-permissions`,
          },
          {
            Icon: LayoutGrid,
            title: "Gelir Merkezleri",
            desc: "Kanal bazlı operasyon",
            href: `/${locale}/products/revenue-centers`,
          },
        ],
      },
      {
        label: "Çok şubeli",
        color: "#be123c",
        items: [
          {
            Icon: Building2,
            title: "Çok Şubeli Yönetim",
            desc: "Tek menü, her şube",
            href: `/${locale}/products/multi-branch`,
          },
          {
            Icon: GitBranch,
            title: "Şube Override",
            desc: "Yerel fiyat & uygunluk",
            href: `/${locale}/products/branch-overrides`,
          },
          {
            Icon: Coins,
            title: "Bölgesel Fiyatlandırma",
            desc: "Tier bazlı fiyat grupları",
            href: `/${locale}/products/regional-pricing`,
          },
        ],
      },
      {
        label: "Zeka",
        color: "#9f1239",
        items: [
          {
            Icon: BarChart3,
            title: "Analitik",
            desc: "Satış, ürün, ödemeler",
            href: `/${locale}/products/analytics`,
          },
          {
            Icon: Activity,
            title: "Heatmap",
            desc: "Pik saat görselleştirme",
            href: `/${locale}/products/heatmaps`,
          },
          {
            Icon: PieChart,
            title: "Raporlar",
            desc: "Özel rapor oluşturucu",
            href: `/${locale}/products/reports`,
          },
        ],
      },
    ],
  },
  {
    label: "Çözümler",
    key: "solutions",
    width: "lg",
    groups: [
      {
        label: "Format bazında",
        color: "#f43f5e",
        items: [
          {
            Icon: UtensilsCrossed,
            title: "Restoranlar",
            desc: "Fine dining & gurme mekanlar",
            href: `/${locale}/solutions/restaurants`,
          },
          {
            Icon: Coffee,
            title: "Kafe & Pastane",
            desc: "Kahve dükkanları & patisserie",
            href: `/${locale}/solutions/cafes`,
          },
          {
            Icon: Pizza,
            title: "Fast Food & QSR",
            desc: "Yüksek ciro, drive-thru",
            href: `/${locale}/solutions/fast-food`,
          },
        ],
      },
      {
        label: "Mekan bazında",
        color: "#e11d48",
        items: [
          {
            Icon: Wine,
            title: "Bar & Pub",
            desc: "Açık sekme, hesap bölme",
            href: `/${locale}/solutions/bars`,
          },
          {
            Icon: BedDouble,
            title: "Otel & Resort",
            desc: "Restoran + oda servisi",
            href: `/${locale}/solutions/hotels`,
          },
          {
            Icon: Truck,
            title: "Cloud Kitchen",
            desc: "Tek mutfak, çok marka",
            href: `/${locale}/solutions/cloud-kitchens`,
          },
        ],
      },
      {
        label: "Ölçek bazında",
        color: "#9f1239",
        items: [
          {
            Icon: Store,
            title: "Tek şube",
            desc: "Bağımsız işletmeler & bistrolar",
            href: `/${locale}/solutions/single-location`,
          },
          {
            Icon: Building2,
            title: "Zincir & Franchise",
            desc: "Çok lokasyonlu işletmeler",
            href: `/${locale}/solutions/chains`,
          },
          {
            Icon: Plug,
            title: "Platformlar",
            desc: "Getir, Trendyol, Yemeksepeti",
            href: `/${locale}/products/integrations`,
          },
        ],
      },
    ],
  },
  {
    label: "Kaynaklar",
    key: "resources",
    width: "md",
    groups: [
      {
        label: "Öğren",
        color: "#f43f5e",
        items: [
          {
            Icon: Newspaper,
            title: "Blog",
            desc: "Ürün & sektör trendleri",
            href: `/${locale}/blog`,
          },
          {
            Icon: BookOpen,
            title: "Müşteri Hikayeleri",
            desc: "Gerçek restoranlar nasıl çalışıyor",
            href: `/${locale}/resources`,
          },
          {
            Icon: HelpCircle,
            title: "Yardım Merkezi",
            desc: "Adım adım kılavuzlar",
            href: `/${locale}/resources`,
          },
        ],
      },
      {
        label: "Geliştir",
        color: "#e11d48",
        items: [
          {
            Icon: Code2,
            title: "API & Webhook",
            desc: "Dasvio üzerinde geliştir",
            href: `/${locale}/resources`,
          },
          {
            Icon: Activity,
            title: "Durum",
            desc: "Sistem uptime & geçmiş",
            href: `/${locale}/resources`,
          },
          {
            Icon: GraduationCap,
            title: "Akademi",
            desc: "Ekip eğitimi & sertifika",
            href: `/${locale}/resources`,
          },
        ],
      },
    ],
  },
  {
    label: "Şirket",
    key: "company",
    width: "md",
    groups: [
      {
        label: "Hakkımızda",
        color: "#f43f5e",
        items: [
          {
            Icon: Info,
            title: "Dasvio Hakkında",
            desc: "Misyonumuz & ekibimiz",
            href: `/${locale}/about`,
          },
          {
            Icon: Briefcase,
            title: "Kariyer",
            desc: "Ekibe katıl",
            href: `/${locale}/about`,
          },
          {
            Icon: Newspaper,
            title: "Basın",
            desc: "Medya & duyurular",
            href: `/${locale}/about`,
          },
        ],
      },
      {
        label: "İletişime geç",
        color: "#e11d48",
        items: [
          {
            Icon: Calendar,
            title: "Demo Al",
            desc: "Kişiselleştirilmiş sunum",
            href: `/${locale}/contact`,
          },
          {
            Icon: Mail,
            title: "Bize Ulaşın",
            desc: "E-posta, telefon, sohbet",
            href: `/${locale}/contact`,
          },
          {
            Icon: Handshake,
            title: "Ortaklık",
            desc: "Dasvio partneri ol",
            href: `/${locale}/contact`,
          },
        ],
      },
    ],
  },
];

const panelWidth: Record<Section["width"], string> = {
  md: "min-w-[440px]",
  lg: "min-w-[640px]",
  xl: "min-w-[880px]",
};

const panelCols: Record<Section["width"], string> = {
  md: "grid-cols-2",
  lg: "grid-cols-3",
  xl: "grid-cols-4",
};

function NavDropdown({ sec, navLink }: { sec: Section; navLink: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [mounted] = useState(() => typeof document !== "undefined");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setIsOpen(false), 150);
  };

  const open = () => {
    cancelClose();
    if (triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      // top = r.bottom (no gap) — visual gap is padding inside the portal wrapper
      setPos({ top: r.bottom, left: r.left });
    }
    setIsOpen(true);
  };

  const panel = isOpen && mounted ? createPortal(
    <div
      style={{ position: "fixed", top: pos.top, left: pos.left, zIndex: 9999, paddingTop: 8 }}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <div
        className={clsx(
          "rounded-2xl p-5 shadow-[0_24px_64px_rgba(0,0,0,0.7),inset_0_1.5px_0_rgba(255,255,255,0.12)]",
          panelWidth[sec.width],
        )}
        style={{
          background: "var(--color-bg)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          border: "1px solid var(--color-border-subtle)",
        }}
      >
        <div className={clsx("grid gap-x-6 gap-y-5", panelCols[sec.width])}>
          {sec.groups.map((group) => (
            <div key={group.label}>
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-fg-subtle font-semibold mb-3 px-2">
                {group.label}
              </div>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex gap-3 p-2 rounded-xl hover:bg-bg-subtle transition group/item"
                  >
                    <div
                      className="flex-none size-9 rounded-lg text-white flex items-center justify-center group-hover/item:scale-105 transition-transform"
                      style={{ background: group.color }}
                    >
                      <item.Icon className="size-4" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13.5px] font-semibold text-fg leading-tight">
                        {item.title}
                      </div>
                      <div className="text-[12px] text-fg-muted mt-0.5 leading-snug">
                        {item.desc}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  ) : null;

  return (
    <div
      ref={triggerRef}
      className="relative"
      onMouseEnter={open}
      onMouseLeave={scheduleClose}
    >
      <button type="button" className={navLink}>
        {sec.label}
        <ChevronDown
          className={clsx("size-3.5 opacity-60 transition-transform", isOpen && "rotate-180")}
          strokeWidth={2.5}
        />
      </button>
      {panel}
    </div>
  );
}

export function Navbar({ t, locale }: { t: NavDict; locale: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sections = useMemo(() => buildSections(locale), [locale]);

  const navLink =
    "inline-flex items-center gap-1 h-9 px-3 rounded-lg text-[14.5px] font-medium text-fg/80 hover:text-fg hover:bg-bg-muted transition whitespace-nowrap";

  return (
    <header className="fixed top-0 inset-x-0 z-50 nav-glass">
      <div className="container-page flex h-16 lg:h-18 items-center gap-2 lg:gap-4">
        <Logo href={`/${locale}`} />

        <nav className="flex items-center gap-0.5 ml-2 lg:ml-6">
          {sections.map((sec) => (
            <NavDropdown key={sec.key} sec={sec} navLink={navLink} />
          ))}
          <Link href={`/${locale}/pricing`} className={navLink}>
            {t.pricing}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <LocaleSwitcher locale={locale} />
          <Button
            variant="secondary"
            size="sm"
            href="https://app.dasvio.com"
            withArrow
          >
            {t.login}
          </Button>
          <Button variant="primary" size="sm" href={`/${locale}/contact`}>
            {t.demo}
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex sm:hidden size-9 items-center justify-center rounded-full border border-border-default text-fg hover:bg-bg-muted"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden fixed inset-x-0 top-16 bottom-0 overflow-y-auto nav-glass border-t border-border-subtle">
          <div className="w-full px-5 py-6 flex flex-col gap-8">
            {sections.map((sec) => (
              <div key={sec.key}>
                <div className="text-[11px] font-bold text-fg-subtle uppercase tracking-[0.18em] px-2 mb-3">
                  {sec.label}
                </div>
                <div className="flex flex-col gap-1">
                  {sec.groups.flatMap((g) => g.items.map((item) => ({ item, color: g.color }))).map(({ item, color }) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex gap-3 p-2 rounded-xl hover:bg-bg-muted"
                    >
                      <div className="flex-none size-9 rounded-lg text-white flex items-center justify-center" style={{ background: color }}>
                        <item.Icon className="size-4" strokeWidth={2} />
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold text-fg leading-tight">
                          {item.title}
                        </div>
                        <div className="text-[12px] text-fg-muted mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="h-px bg-border-default" />
            <Link
              href={`/${locale}/pricing`}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-3 text-[15px] font-medium text-white"
            >
              {t.pricing}
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="lg"
                href={`/${locale}/contact`}
                className="flex-1"
              >
                {t.demo}
              </Button>
              <LocaleSwitcher locale={locale} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
