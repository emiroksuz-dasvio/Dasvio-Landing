import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { hasLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  POLICIES,
  getPolicyBySlug,
  type Policy,
  type PolicyBlock,
} from "@/lib/policies-data";
import { PolicyTOC } from "@/components/policies/PolicyTOC";

function sectionId(n: number) {
  return `section-${n}`;
}

function BlockView({ block }: { block: PolicyBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p className="text-[15px] lg:text-[16px] leading-[1.75] text-fg-muted text-pretty">
          {block.text}
        </p>
      );
    case "h3":
      return (
        <h3 className="text-[15px] font-semibold text-fg mt-2">{block.text}</h3>
      );
    case "ul":
      return (
        <ul className="space-y-2.5">
          {block.items.map((it, i) => (
            <li
              key={i}
              className="flex gap-3 text-[14.5px] leading-[1.65] text-fg-muted text-pretty"
            >
              <span className="flex-none size-1.5 rounded-full bg-accent mt-2.5" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "kv":
      return (
        <dl className="rounded-2xl border border-white/10 bg-bg-subtle divide-y divide-white/5 overflow-hidden">
          {block.items.map(([k, v], i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-4 px-5 py-3.5"
            >
              <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-fg-muted">
                {k}
              </dt>
              <dd className="text-[14.5px] text-fg text-pretty">{v}</dd>
            </div>
          ))}
        </dl>
      );
    case "callout":
      return (
        <div
          className={`rounded-2xl border-l-4 px-5 py-4 text-[14.5px] leading-[1.6] text-pretty ${
            block.tone === "warn"
              ? "bg-amber-500/5 border-amber-500/60 text-fg"
              : "bg-accent/5 border-accent/60 text-fg"
          }`}
        >
          {block.text}
        </div>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="border-b border-white/10 bg-bg-subtle">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="text-left text-[11.5px] font-bold uppercase tracking-[0.15em] text-fg-muted px-5 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-5 py-3.5 ${
                        ci === 0 ? "font-medium text-fg" : "text-fg-muted"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

function isProvidedSlug(slug: string): boolean {
  return POLICIES.some((p) => p.slug === slug);
}

export default async function PolicyDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  if (!isProvidedSlug(slug)) notFound();
  const locale = lang as Locale;
  const t = (await getDictionary(locale)).policyPage;
  const policy = getPolicyBySlug(slug) as Policy;

  const tocItems = policy.sections.map((s) => ({
    id: sectionId(s.n),
    n: s.n,
    title: s.title,
  }));

  const others = POLICIES.filter((p) => p.slug !== slug);

  return (
    <>
      <section className="pt-32 lg:pt-36 pb-10 lg:pb-14 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 10% 0%, rgba(255,255,255,0.12), transparent 50%)",
          }}
        />
        <Container className="relative">
          <Link
            href={`/${locale}/policies`}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-accent hover:gap-2.5 transition-all"
          >
            <ArrowLeft className="size-3.5" strokeWidth={2.5} /> {t.allPolicies}
          </Link>
          <h1 className="mt-6 text-balance text-[36px] sm:text-[48px] lg:text-[64px] xl:text-[76px] font-light leading-[0.98] tracking-[-0.025em]">
            {policy.title}.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] lg:text-[17px] leading-[1.6] text-fg-muted text-pretty">
            {policy.description}
          </p>
          {locale === "en" && (
            <p className="mt-5 max-w-2xl rounded-xl border border-border-default bg-bg-subtle px-4 py-3 text-[13.5px] leading-relaxed text-fg-muted">
              {t.languageNote}
            </p>
          )}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-fg-muted">
              <span className="size-1.5 rounded-full bg-accent" />
              Son güncelleme · {policy.lastUpdated}
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-[12px] text-fg-muted">
              {policy.sections.length} bölüm
            </span>
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start">
            <aside className="hidden lg:block">
              <PolicyTOC items={tocItems} />
            </aside>
            <article className="max-w-3xl">
              {policy.sections.map((sec) => (
                <section
                  key={sec.n}
                  id={sectionId(sec.n)}
                  className="scroll-mt-32 pb-12 lg:pb-16 last:pb-0 border-b border-white/8 last:border-b-0 mb-12 lg:mb-16 last:mb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-accent/15 text-accent flex items-center justify-center text-[12px] font-bold tabular-nums">
                      {String(sec.n).padStart(2, "0")}
                    </div>
                    <h2 className="text-[24px] lg:text-[28px] font-medium tracking-tight text-fg text-pretty">
                      {sec.title}
                    </h2>
                  </div>
                  <div className="mt-6 space-y-5 pl-0 lg:pl-11">
                    {sec.blocks.map((b, i) => (
                      <BlockView key={i} block={b} />
                    ))}
                  </div>
                </section>
              ))}
              <div className="mt-12 rounded-2xl border border-white/10 bg-bg-subtle p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:justify-between">
                <div>
                  <div className="text-[14px] font-medium text-fg">
                    {t.questionsTitle}
                  </div>
                  <div className="text-[13px] text-fg-muted mt-1">
                    {t.questionsBody}
                  </div>
                </div>
                <a
                  href="mailto:legal@dasvio.com"
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-accent text-accent-fg font-semibold text-[14px] hover:bg-accent-hover transition shadow-[0_8px_24px_rgba(255,255,255,0.15)]"
                >
                  <Mail className="size-4" strokeWidth={2.25} />
                  legal@dasvio.com
                </a>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 border-t border-white/8">
        <Container>
          <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
            <div>
              <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
                {t.otherEyebrow}
              </div>
              <h2 className="mt-4 text-balance text-[28px] sm:text-[36px] lg:text-[40px] font-light leading-[1.04] tracking-[-0.02em]">
                {t.otherTitle}
              </h2>
            </div>
            <Button
              variant="secondary"
              size="md"
              href={`/${locale}/policies`}
              withArrow
            >
              {t.seeAll}
            </Button>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 lg:gap-4">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/${locale}/policies/${p.slug}`}
                className="block rounded-2xl bg-bg-subtle border border-white/10 p-6 hover:border-white/25 hover:-translate-y-1 transition-all duration-500 group h-full"
              >
                <h3 className="text-[17px] lg:text-[18px] font-medium tracking-tight text-fg leading-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.55] text-fg-muted line-clamp-2">
                  {p.description}
                </p>
                <div className="mt-4 text-[11.5px] text-fg-muted">
                  Son güncelleme · {p.lastUpdated}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export function generateStaticParams() {
  const params: Array<{ lang: string; slug: string }> = [];
  for (const lang of locales) {
    for (const p of POLICIES) {
      params.push({ lang, slug: p.slug });
    }
  }
  return params;
}
