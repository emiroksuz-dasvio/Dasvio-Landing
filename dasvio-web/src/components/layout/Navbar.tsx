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
  /**
   * Mega-menu copy. Structure (icons, colours, hrefs, column widths) stays in
   * `buildSections` below; only the strings are localised, looked up by the
   * stable keys used there. A missing key is a build-time type error.
   */
  mega: {
    sections: Record<MegaSectionKey, string>;
    groups: Record<MegaGroupKey, string>;
    items: Record<MegaItemKey, { title: string; desc: string }>;
  };
};

type MegaSectionKey = "products" | "solutions" | "resources" | "company";

type MegaGroupKey =
  | "experience"
  | "operations"
  | "multiBranch"
  | "intelligence"
  | "byFormat"
  | "byVenue"
  | "byScale"
  | "learn"
  | "build"
  | "aboutUs"
  | "getInTouch";

type MegaItemKey =
  | "qrMenu"
  | "signage"
  | "pos"
  | "staffPermissions"
  | "revenueCenters"
  | "multiBranch"
  | "branchOverrides"
  | "regionalPricing"
  | "analytics"
  | "heatmaps"
  | "reports"
  | "restaurants"
  | "cafes"
  | "fastFood"
  | "bars"
  | "hotels"
  | "cloudKitchens"
  | "singleLocation"
  | "chains"
  | "platforms"
  | "blog"
  | "stories"
  | "help"
  | "api"
  | "status"
  | "academy"
  | "about"
  | "careers"
  | "press"
  | "demo"
  | "contact"
  | "partners";

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

const buildSections = (locale: Locale, m: NavDict["mega"]): Section[] => {
  const item = (key: MegaItemKey, Icon: LucideIcon, href: string): DropdownItem => ({
    Icon,
    title: m.items[key].title,
    desc: m.items[key].desc,
    href,
  });

  return [
    {
      label: m.sections.products,
      key: "products",
      width: "xl",
      groups: [
        {
          label: m.groups.experience,
          color: "#f43f5e",
          items: [
            item("qrMenu", QrCode, `/${locale}/products/qr-menu`),
            item("signage", MonitorPlay, `/${locale}/products/signage`),
          ],
        },
        {
          label: m.groups.operations,
          color: "#e11d48",
          items: [
            item("pos", Cpu, `/${locale}/products/pos`),
            item("staffPermissions", Users, `/${locale}/products/staff-permissions`),
            item("revenueCenters", LayoutGrid, `/${locale}/products/revenue-centers`),
          ],
        },
        {
          label: m.groups.multiBranch,
          color: "#be123c",
          items: [
            item("multiBranch", Building2, `/${locale}/products/multi-branch`),
            item("branchOverrides", GitBranch, `/${locale}/products/branch-overrides`),
            item("regionalPricing", Coins, `/${locale}/products/regional-pricing`),
          ],
        },
        {
          label: m.groups.intelligence,
          color: "#9f1239",
          items: [
            item("analytics", BarChart3, `/${locale}/products/analytics`),
            item("heatmaps", Activity, `/${locale}/products/heatmaps`),
            item("reports", PieChart, `/${locale}/products/reports`),
          ],
        },
      ],
    },
    {
      label: m.sections.solutions,
      key: "solutions",
      width: "lg",
      groups: [
        {
          label: m.groups.byFormat,
          color: "#f43f5e",
          items: [
            item("restaurants", UtensilsCrossed, `/${locale}/solutions/restaurants`),
            item("cafes", Coffee, `/${locale}/solutions/cafes`),
            item("fastFood", Pizza, `/${locale}/solutions/fast-food`),
          ],
        },
        {
          label: m.groups.byVenue,
          color: "#e11d48",
          items: [
            item("bars", Wine, `/${locale}/solutions/bars`),
            item("hotels", BedDouble, `/${locale}/solutions/hotels`),
            item("cloudKitchens", Truck, `/${locale}/solutions/cloud-kitchens`),
          ],
        },
        {
          label: m.groups.byScale,
          color: "#9f1239",
          items: [
            item("singleLocation", Store, `/${locale}/solutions/single-location`),
            item("chains", Building2, `/${locale}/solutions/chains`),
            item("platforms", Plug, `/${locale}/products/integrations`),
          ],
        },
      ],
    },
    {
      label: m.sections.resources,
      key: "resources",
      width: "md",
      groups: [
        {
          label: m.groups.learn,
          color: "#f43f5e",
          items: [
            item("blog", Newspaper, `/${locale}/blog`),
            item("stories", BookOpen, `/${locale}/resources`),
            item("help", HelpCircle, `/${locale}/resources`),
          ],
        },
        {
          label: m.groups.build,
          color: "#e11d48",
          items: [
            item("api", Code2, `/${locale}/resources`),
            item("status", Activity, `/${locale}/resources`),
            item("academy", GraduationCap, `/${locale}/resources`),
          ],
        },
      ],
    },
    {
      label: m.sections.company,
      key: "company",
      width: "md",
      groups: [
        {
          label: m.groups.aboutUs,
          color: "#f43f5e",
          items: [
            item("about", Info, `/${locale}/about`),
            item("careers", Briefcase, `/${locale}/about`),
            item("press", Newspaper, `/${locale}/about`),
          ],
        },
        {
          label: m.groups.getInTouch,
          color: "#e11d48",
          items: [
            item("demo", Calendar, `/${locale}/contact`),
            item("contact", Mail, `/${locale}/contact`),
            item("partners", Handshake, `/${locale}/contact`),
          ],
        },
      ],
    },
  ];
};

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
  const sections = useMemo(() => buildSections(locale, t.mega), [locale, t.mega]);

  const navLink =
    "inline-flex items-center gap-1 h-9 px-3 rounded-lg text-[14.5px] font-medium text-fg/80 hover:text-fg hover:bg-bg-muted transition whitespace-nowrap";

  return (
    <header className="fixed top-0 inset-x-0 z-50 nav-glass">
      <div className="container-page flex h-16 lg:h-18 items-center gap-2 lg:gap-4">
        <Logo href={`/${locale}`} />

        <nav className="hidden sm:flex items-center gap-0.5 ml-2 lg:ml-6">
          {sections.map((sec) => (
            <NavDropdown key={sec.key} sec={sec} navLink={navLink} />
          ))}
          <Link href={`/${locale}/pricing`} className={navLink}>
            {t.pricing}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:contents">
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
          </div>
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
