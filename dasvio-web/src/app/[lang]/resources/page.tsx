import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  HelpCircle,
  Code2,
  Newspaper,
  GraduationCap,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";

/**
 * Icon and destination per card live here; the copy lives in the dictionary
 * under `resourcesPage.cards`, keyed by the same id. None of these sub-pages
 * exist as React routes yet — `tools/restore_snapshot.mjs` writes redirect
 * fallbacks so the links resolve in production.
 */
type CardId = "blog" | "stories" | "help" | "docs" | "templates" | "academy";

const CARDS: { id: CardId; Icon: LucideIcon; href: string }[] = [
  { id: "blog", Icon: Newspaper, href: "/blog" },
  { id: "stories", Icon: BookOpen, href: "/stories" },
  { id: "help", Icon: HelpCircle, href: "/help" },
  { id: "docs", Icon: Code2, href: "/docs" },
  { id: "templates", Icon: FileText, href: "/templates" },
  { id: "academy", Icon: GraduationCap, href: "/academy" },
];

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const t = (await getDictionary(locale)).resourcesPage;

  return (
    <section className="pt-36 lg:pt-40 pb-24 lg:pb-32">
      <Container>
        <div className="max-w-3xl">
          <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
            {t.eyebrow}
          </div>
          <h1 className="text-balance mt-5 text-[44px] sm:text-[60px] lg:text-[80px] font-light leading-[1.0] tracking-[-0.025em]">
            {t.title}
          </h1>
          <p className="mt-6 text-[16px] lg:text-[18px] leading-[1.6] text-fg-muted text-pretty">
            {t.subtitle}
          </p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map((c) => {
            const copy = t.cards[c.id];
            return (
              <Link
                key={c.id}
                href={`/${locale}${c.href}`}
                className="rounded-2xl border border-white/10 bg-bg-subtle p-7 hover:border-white/25 hover:bg-white/[0.03] transition group flex flex-col"
              >
                <div className="size-11 rounded-2xl bg-accent-soft text-accent flex items-center justify-center">
                  <c.Icon className="size-5" strokeWidth={2} />
                </div>
                <div className="mt-5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-fg-muted">
                  {copy.label}
                </div>
                <h3 className="mt-2 text-[19px] font-medium tracking-tight text-fg text-pretty">
                  {copy.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-[1.6] text-fg-muted text-pretty flex-1">
                  {copy.body}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent group-hover:gap-2.5 transition-all">
                  {copy.cta}
                  <ArrowRight className="size-3.5" strokeWidth={2.5} />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}
