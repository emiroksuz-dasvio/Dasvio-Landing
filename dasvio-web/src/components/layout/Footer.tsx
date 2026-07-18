import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const socialIcons = [
  {
    label: "Twitter / X",
    href: "https://twitter.com/dasvio",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/dasvio",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/dasvio",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@dasvio",
    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.121 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

// Routes for each column's links, in the same order as the dictionary columns
function columnRoutes(locale: string): string[][] {
  return [
    // Products: QR Menü, POS, Çok Şubeli Yönetim, Digital Signage, Analitik, Personel & Yetki
    [
      `/${locale}/products/qr-menu`,
      `/${locale}/products/pos`,
      `/${locale}/products/multi-branch`,
      `/${locale}/products/signage`,
      `/${locale}/products/analytics`,
      `/${locale}/products/staff-permissions`,
    ],
    // Solutions: Restoran, Kafe, Fast Food, Bar, Otel & Resort, Zincir
    [
      `/${locale}/solutions/restaurants`,
      `/${locale}/solutions/cafes`,
      `/${locale}/solutions/fast-food`,
      `/${locale}/solutions/bars`,
      `/${locale}/solutions/hotels`,
      `/${locale}/solutions/chains`,
    ],
    // Company: Hakkımızda, Kariyer, Basın, İletişim
    [
      `/${locale}/about`,
      "#",
      "#",
      `/${locale}/contact`,
    ],
    // Resources: Blog, Müşteri Hikayeleri, Yardım Merkezi, API Dokümanı, Durum Sayfası
    [
      `/${locale}/blog`,
      "#",
      "#",
      "#",
      "#",
    ],
  ];
}

const legalSlugMap: Record<string, string> = {
  KVKK: "kvkk-aydinlatma-metni",
  "Kullanım Şartları": "kullanim-kosullari",
  "Gizlilik Politikası": "gizlilik-sozlesmesi",
  Çerezler: "kvkk-aydinlatma-metni",
  GDPR: "kvkk-aydinlatma-metni",
  "Terms of Service": "kullanim-kosullari",
  "Privacy Policy": "gizlilik-sozlesmesi",
  Cookies: "kvkk-aydinlatma-metni",
};

type FooterStat = { label: string; value: string };
type FooterColumn = { title: string; links: string[] };
type FooterDict = {
  tagline: string;
  cta: {
    eyebrow: string;
    headline: string;
    primary: string;
    secondary: string;
    stats: FooterStat[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    badge: string;
  };
  social: string;
  columns: {
    products: FooterColumn;
    solutions: FooterColumn;
    company: FooterColumn;
    resources: FooterColumn;
  };
  legal: { rights: string; links: string[]; allPolicies: string };
};

export function Footer({ t, locale }: { t: FooterDict; locale: string }) {
  const columns = [t.columns.products, t.columns.solutions, t.columns.company, t.columns.resources];
  const routes = columnRoutes(locale);

  return (
    <footer className="relative pt-16 pb-14 overflow-hidden bg-[#070707]">
      <div className="pointer-events-none absolute -left-12 top-10 h-56 w-56 rounded-full bg-accent/18 blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-24 h-80 w-80 rounded-full bg-white/6 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent" />

      <Container>
        <div className="liquid-glass-strong rounded-[2rem] overflow-hidden relative border border-white/[0.16]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

          <div className="px-8 lg:px-12 pt-12 lg:pt-14">
            {/* CTA row */}
            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] items-start pb-12 border-b border-white/[0.08]">
              {/* Left: brand + CTA */}
              <div className="max-w-[44rem]">
                <Logo href={`/${locale}`} />
                <p className="mt-4 max-w-xl text-[15px] leading-[1.9] text-fg-muted">
                  {t.tagline}
                </p>
                <div className="mt-7">
                  <p className="text-sm uppercase tracking-[0.32em] text-accent/90 mb-3">
                    {t.cta.eyebrow}
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight">
                    {t.cta.headline}
                  </h2>
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button href={`/${locale}/contact`} variant="primary" size="lg" withArrow>
                    {t.cta.primary}
                  </Button>
                  <Link
                    href={`/${locale}/pricing`}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/[0.14] bg-white/[0.06] px-6 py-3 text-sm text-fg-muted hover:text-white hover:border-white/30 transition-colors"
                  >
                    {t.cta.secondary}
                  </Link>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {t.cta.stats.map((item) => (
                    <div key={item.label} className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-fg-muted/70">{item.label}</p>
                      <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: contact card */}
              <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
                <p className="text-[11px] uppercase tracking-[0.32em] text-fg-muted/70">
                  {t.contact.eyebrow}
                </p>
                <div className="mt-4 text-2xl font-semibold text-white leading-tight">
                  {t.contact.title}
                </div>
                <p className="mt-4 text-sm leading-6 text-fg-muted">
                  {t.contact.body}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button href={`/${locale}/contact`} variant="accent" size="lg" withArrow>
                    {t.contact.cta}
                  </Button>
                  <div className="flex items-center gap-3 text-sm text-fg-muted">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                    {t.contact.badge}
                  </div>
                </div>
              </div>
            </div>

            {/* Social + nav columns */}
            <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-accent via-accent/80 to-transparent" />
                  <p className="text-sm uppercase tracking-[0.22em] text-accent">{t.social}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {socialIcons.map((icon) => (
                    <a
                      key={icon.label}
                      href={icon.href}
                      aria-label={icon.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-12 rounded-3xl liquid-glass-sm hover:bg-accent hover:border-accent hover:text-white hover:shadow-[0_6px_24px_rgba(244,63,94,0.35)] transition-all duration-200 flex items-center justify-center text-fg-muted"
                    >
                      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d={icon.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4 lg:w-auto">
                {columns.map((col, colIdx) => (
                  <div key={col.title}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-[3px] h-4 bg-gradient-to-b from-accent via-accent/60 to-transparent rounded-full" />
                      <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-accent">
                        {col.title}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {col.links.map((link, linkIdx) => {
                        const href = routes[colIdx]?.[linkIdx] ?? "#";
                        return (
                          <li key={link}>
                            <Link
                              href={href}
                              className="text-[14px] text-fg-muted hover:text-white transition-all duration-200 group inline-flex items-center gap-1.5"
                            >
                              <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">
                                {link}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legal bar */}
          <div className="mt-10 px-8 lg:px-12 py-6 border-t border-white/[0.08] bg-black/[0.12] flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-[12px] text-fg-subtle">
              © {new Date().getFullYear()} Dasvio.{" "}
              <span className="text-fg-muted/70">{t.legal.rights}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {t.legal.links.map((link) => {
                const slug = legalSlugMap[link] ?? "gizlilik-sozlesmesi";
                return (
                  <Link
                    key={link}
                    href={`/${locale}/policies/${slug}`}
                    className="text-[12px] text-fg-subtle hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                );
              })}
              <Link
                href={`/${locale}/policies`}
                className="text-[12px] font-semibold text-accent/80 hover:text-accent transition-colors inline-flex items-center gap-1"
              >
                {t.legal.allPolicies}
                <svg className="size-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 6h8M6 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
