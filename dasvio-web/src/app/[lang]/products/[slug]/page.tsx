import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { hasLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  PRODUCTS,
  PRODUCT_SLUGS,
  isProductSlug,
  type ProductData,
} from "@/lib/products";
import { Trust } from "@/components/sections/Trust";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  if (!isProductSlug(slug)) notFound();
  const locale = lang as Locale;
  const t = await getDictionary(locale);

  const product = PRODUCTS[slug];
  const others = PRODUCT_SLUGS.filter((s) => s !== slug)
    .slice(0, 3)
    .map((s) => PRODUCTS[s]);

  return (
    <>
      {product.variant === "split" && <HeroSplit product={product} locale={locale} t={t} />}
      {product.variant === "stack" && <HeroStack product={product} locale={locale} t={t} />}
      {product.variant === "magazine" && <HeroMagazine product={product} locale={locale} t={t} />}

      <Capabilities product={product} />

      {product.variant !== "magazine" && <WhyBlock product={product} locale={locale} />}
      {product.variant === "magazine" && <QuoteBlock product={product} />}

      <OtherProducts others={others} locale={locale} />

      <Trust t={t.trust} />
    </>
  );
}

type DictType = Awaited<ReturnType<typeof getDictionary>>;

// ─── HERO: SPLIT ────────────────────────────────────────────────────────────
function HeroSplit({
  product,
  locale,
  t,
}: {
  product: ProductData;
  locale: Locale;
  t: DictType;
}) {
  return (
    <section className="pt-36 lg:pt-40 pb-16 lg:pb-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 12% 0%, ${product.accentTint}, transparent 50%), radial-gradient(circle at 88% 100%, ${product.accentTint}, transparent 45%)`,
        }}
      />
      <Container className="relative">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <Link
              href={`/${locale}/#features`}
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent hover:gap-3 transition-all"
            >
              ← {product.category}
            </Link>
            <h1 className="mt-6 text-balance text-[40px] sm:text-[56px] lg:text-[72px] xl:text-[84px] font-light leading-[0.98] tracking-[-0.025em]">
              {product.title}
            </h1>
            <p className="mt-6 max-w-[560px] text-[16px] lg:text-[18px] leading-[1.6] text-fg-muted text-pretty">
              {product.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" href={`/${locale}/contact`}>
                {t.hero.ctaPrimary}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href={`/${locale}/pricing`}
                withArrow
              >
                {t.nav.pricing}
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <div
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5"
                >
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: product.accentTint }}
                  />
                  <div className="text-[12.5px] font-medium text-fg">{tag}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal direction="left" delay={150}>
            <div
              className="rounded-2xl bg-zinc-950 border border-white/10 p-6 lg:p-10 flex items-center justify-center min-h-[420px] lg:min-h-[520px]"
              style={{
                boxShadow: `0 30px 80px ${product.accentTint}1f`,
              }}
            >
              <product.MainVisual />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

// ─── HERO: STACK ────────────────────────────────────────────────────────────
function HeroStack({
  product,
  locale,
  t,
}: {
  product: ProductData;
  locale: Locale;
  t: DictType;
}) {
  return (
    <section className="pt-36 lg:pt-40 pb-16 lg:pb-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${product.accentTint}, transparent 65%)`,
        }}
      />
      <Container className="relative">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href={`/${locale}/#features`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-accent hover:bg-white/[0.05] transition"
            >
              <Sparkles
                className="size-3.5"
                style={{ color: product.accentTint }}
                strokeWidth={2.5}
              />
              {product.category}
            </Link>
            <h1 className="mt-7 text-balance text-[44px] sm:text-[68px] lg:text-[88px] xl:text-[104px] font-light leading-[0.96] tracking-[-0.03em]">
              {product.title}
            </h1>
            <p className="mt-7 max-w-[680px] mx-auto text-[16px] lg:text-[19px] leading-[1.55] text-fg-muted text-pretty">
              {product.description}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" size="lg" href={`/${locale}/contact`}>
                {t.hero.ctaPrimary}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href={`/${locale}/pricing`}
                withArrow
              >
                {t.nav.pricing}
              </Button>
            </div>
          </div>
        </Reveal>
        <Reveal delay={250}>
          <div
            className="mt-14 lg:mt-20 rounded-2xl border border-white/10 bg-zinc-950 p-6 lg:p-12 min-h-[420px] lg:min-h-[560px] flex items-center justify-center"
            style={{
              boxShadow: `0 60px 120px ${product.accentTint}1f, inset 0 0 0 1px rgba(255,255,255,0.02)`,
            }}
          >
            <div className="w-full max-w-[800px]">
              <product.MainVisual />
            </div>
          </div>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-10 flex flex-wrap gap-2 justify-center">
            {product.tags.map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2"
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: product.accentTint }}
                />
                <div className="text-[13px] font-medium text-fg">{tag}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ─── HERO: MAGAZINE ─────────────────────────────────────────────────────────
function HeroMagazine({
  product,
  locale,
  t,
}: {
  product: ProductData;
  locale: Locale;
  t: DictType;
}) {
  return (
    <section className="pt-36 lg:pt-40 pb-16 lg:pb-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${product.accentTint}, transparent 45%)`,
        }}
      />
      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
          <Reveal direction="right">
            <div className="relative h-full">
              <div
                className="absolute inset-4 rounded-full opacity-[0.18] blur-3xl animate-pulse-glow"
                style={{ background: product.accentTint }}
              />
              <div className="relative h-full min-h-[480px] rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-grid opacity-[0.6]" />
                <div className="relative w-full max-w-[440px]">
                  <product.MainVisual />
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex flex-col h-full justify-between">
              <div>
                <Link
                  href={`/${locale}/#features`}
                  className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent hover:gap-3 transition-all"
                >
                  ← {product.category}
                </Link>
                <h1 className="mt-6 text-balance text-[40px] sm:text-[52px] lg:text-[64px] xl:text-[76px] font-light leading-[1.0] tracking-[-0.025em]">
                  {product.title}
                </h1>
                <div
                  className="mt-7 h-px w-24"
                  style={{
                    background: `linear-gradient(to right, ${product.accentTint}, transparent)`,
                  }}
                />
                <p className="mt-7 text-[16px] lg:text-[19px] leading-[1.6] text-fg-muted text-pretty">
                  {product.description}
                </p>
              </div>
              <div className="mt-10">
                <div className="flex flex-wrap gap-2 mb-7">
                  {product.tags.map((tag) => (
                    <div
                      key={tag}
                      className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5"
                      style={{
                        borderColor: `${product.accentTint}40`,
                        background: `${product.accentTint}0d`,
                      }}
                    >
                      <span
                        className="size-1.5 rounded-full"
                        style={{ background: product.accentTint }}
                      />
                      <div className="text-[12.5px] font-medium text-fg">
                        {tag}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="lg" href={`/${locale}/contact`}>
                    {t.hero.ctaPrimary}
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    href={`/${locale}/pricing`}
                    withArrow
                  >
                    {t.nav.pricing}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

// ─── CAPABILITIES (varies subtly by variant) ────────────────────────────────
function Capabilities({ product }: { product: ProductData }) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              ÖZELLİKLER
            </div>
            <h2 className="mt-5 text-balance text-[32px] sm:text-[40px] lg:text-[48px] font-light leading-[1.04] tracking-[-0.02em]">
              {product.title} ile gelen her şey, uçtan uca.
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {product.subCards.map((sc, i) => (
            <Reveal key={sc.title} delay={i * 100}>
              <div
                className="rounded-xl bg-black border border-white/10 p-6 lg:p-7 flex flex-col h-full hover:-translate-y-1 transition-all duration-500"
                style={{
                  ["--tint" as string]: product.accentTint,
                }}
                onMouseEnter={undefined}
              >
                <div className="rounded-2xl bg-zinc-950 border border-white/5 p-4 min-h-[160px] flex items-center justify-center">
                  <sc.Visual />
                </div>
                <h3 className="mt-6 text-[17px] lg:text-[18px] font-medium tracking-tight text-pretty">
                  {sc.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-[1.55] text-fg-muted text-pretty">
                  {sc.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── WHY BLOCK (for split/stack) ────────────────────────────────────────────
function WhyBlock({
  product,
  locale,
}: {
  product: ProductData;
  locale: Locale;
}) {
  return (
    <section className="py-20 lg:py-28 bg-bg-subtle">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <Reveal>
            <div>
              <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
                Neden geçiş yapıyorlar
              </div>
              <h2 className="mt-5 text-balance text-[32px] sm:text-[40px] lg:text-[48px] font-light leading-[1.04] tracking-[-0.02em]">
                Ekibinizin zaten kullandığı aynı panele entegre.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <ul className="space-y-4">
              {[
                "Vendor bağımlılığı yok — mevcut kurulumunuzla birlikte çalışır",
                "Tek şubeler ve zincirlerde ortalama 14 günde canlıya geçiş",
                "Her planda 7/24 Türkçe destek dahil",
                "GDPR ve GİB uyumlu, ek modül gerektirmez",
              ].map((p) => (
                <li key={p} className="flex gap-3 text-[15px] text-fg">
                  <Check
                    className="size-5 mt-0.5 flex-none"
                    strokeWidth={2.5}
                    style={{ color: product.accentTint }}
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button
                variant="accent"
                size="lg"
                href={`/${locale}/contact`}
                withArrow
              >
                Kişiselleştirilmiş demo al
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

// ─── QUOTE BLOCK (for magazine) ─────────────────────────────────────────────
function QuoteBlock({ product }: { product: ProductData }) {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${product.accentTint}, transparent 60%)`,
        }}
      />
      <Container className="relative">
        <Reveal>
          <figure className="max-w-4xl mx-auto text-center">
            <div
              className="inline-flex items-center justify-center size-12 rounded-2xl mb-8"
              style={{ background: `${product.accentTint}20` }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-6"
                style={{ color: product.accentTint }}
                aria-hidden
              >
                <path
                  d="M7 7h4v4H7c0 2 1 4 4 4v2c-4 0-6-2-6-6V7zm10 0h4v4h-4c0 2 1 4 4 4v2c-4 0-6-2-6-6V7z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <blockquote className="text-balance text-[24px] sm:text-[32px] lg:text-[40px] font-light leading-[1.2] tracking-[-0.02em] text-pretty">
              Artık {product.title.toLowerCase()} ile ilgili her şey için tek bir panelimiz var. Ekibimiz bir haftada değil, sabahın birinde alıştı.
            </blockquote>
            <figcaption className="mt-8 text-[14px] text-fg-muted">
              Restoran operatörü, çok şubeli zincir · Türkiye
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}

// ─── OTHER PRODUCTS ─────────────────────────────────────────────────────────
function OtherProducts({
  others,
  locale,
}: {
  others: ProductData[];
  locale: Locale;
}) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <Reveal>
            <div className="max-w-xl">
              <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
                Diğer ürünler
              </div>
              <h2 className="mt-5 text-balance text-[28px] sm:text-[36px] lg:text-[40px] font-light leading-[1.04] tracking-[-0.02em]">
                Dasvio platformunun geri kalanı.
              </h2>
            </div>
          </Reveal>
          <Link
            href={`/${locale}/#features`}
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent hover:gap-2.5 transition-all"
          >
            Tüm ürünler <ArrowRight className="size-4" strokeWidth={2.5} />
          </Link>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <Link
                href={`/${locale}/products/${p.slug}`}
                className="block rounded-2xl bg-bg-subtle border border-white/10 p-6 hover:border-white/25 hover:-translate-y-1 transition-all duration-500 h-full group"
                style={{
                  ["--tint" as string]: p.accentTint,
                }}
              >
                <div
                  className="size-10 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `${p.accentTint}1f`,
                    color: p.accentTint,
                  }}
                >
                  <ArrowUpRight className="size-5" strokeWidth={2.25} />
                </div>
                <h3 className="text-[19px] font-medium tracking-tight text-fg">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.55] text-fg-muted text-pretty line-clamp-3">
                  {p.description}
                </p>
                <div
                  className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold group-hover:gap-2.5 transition-all"
                  style={{ color: p.accentTint }}
                >
                  İncele <ArrowRight className="size-3.5" strokeWidth={2.5} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function generateStaticParams() {
  const params: Array<{ lang: string; slug: string }> = [];
  for (const lang of locales) {
    for (const slug of PRODUCT_SLUGS) {
      params.push({ lang, slug });
    }
  }
  return params;
}
