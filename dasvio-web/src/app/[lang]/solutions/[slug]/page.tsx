import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { hasLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedStats } from "@/components/ui/AnimatedStats";
import {
  SOLUTIONS,
  SOLUTION_SLUGS,
  isSolutionSlug,
  type SolutionData,
} from "@/lib/solutions";
import { PRODUCTS } from "@/lib/products";
import { Trust } from "@/components/sections/Trust";

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  if (!isSolutionSlug(slug)) notFound();
  const locale = lang as Locale;
  const t = await getDictionary(locale);

  const solution = SOLUTIONS[slug];
  const others = SOLUTION_SLUGS.filter((s) => s !== slug)
    .slice(0, 3)
    .map((s) => SOLUTIONS[s]);

  return (
    <>
      {solution.variant === "split-photo" && (
        <HeroSplitPhoto solution={solution} locale={locale} t={t} />
      )}
      {solution.variant === "centered-stat" && (
        <HeroCenteredStat solution={solution} locale={locale} t={t} />
      )}
      {solution.variant === "panel" && (
        <HeroPanel solution={solution} locale={locale} t={t} />
      )}

      <Challenges solution={solution} />
      <Recommended solution={solution} locale={locale} />

      {solution.variant !== "centered-stat" && (
        <StatBand solution={solution} locale={locale} />
      )}

      <FinalCTA solution={solution} locale={locale} />
      <OtherSolutions others={others} locale={locale} />
      <Trust t={t.trust} />
    </>
  );
}

type DictType = Awaited<ReturnType<typeof getDictionary>>;

// ─── HERO: SPLIT PHOTO ──────────────────────────────────────────────────────
function HeroSplitPhoto({
  solution,
  locale,
  t,
}: {
  solution: SolutionData;
  locale: Locale;
  t: DictType;
}) {
  return (
    <section className="pt-36 lg:pt-40 pb-16 lg:pb-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          background: `radial-gradient(circle at 15% 0%, ${solution.accentTint}, transparent 50%)`,
        }}
      />
      <Container className="relative">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <Link
              href={`/${locale}/#sectors`}
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent hover:gap-3 transition-all"
            >
              ← Çözümler / {solution.eyebrow}
            </Link>
            <h1 className="mt-6 text-balance text-[40px] sm:text-[56px] lg:text-[68px] xl:text-[80px] font-light leading-[0.98] tracking-[-0.025em]">
              {solution.title}
            </h1>
            <p
              className="mt-6 text-[16px] lg:text-[18px] font-medium leading-[1.5] text-pretty"
              style={{ color: solution.accentTint }}
            >
              {solution.tagline}
            </p>
            <p className="mt-5 max-w-[560px] text-[15px] lg:text-[16px] leading-[1.65] text-fg-muted text-pretty">
              {solution.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" href={`/${locale}/contact`}>
                {t.hero.ctaPrimary}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="#recommended"
                withArrow
              >
                Önerilen ürünleri gör
              </Button>
            </div>
          </Reveal>
          <Reveal direction="left" delay={150}>
            <div
              className="relative aspect-[5/4] rounded-2xl overflow-hidden border border-white/10"
              style={{
                boxShadow: `0 40px 100px ${solution.accentTint}24`,
              }}
            >
              <Image
                src={solution.photo}
                alt={solution.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-lg backdrop-blur bg-black/40 border border-white/15 px-3 py-1.5">
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: solution.accentTint }}
                />
                <div className="text-[11.5px] font-semibold uppercase tracking-wider text-white">
                  {solution.eyebrow}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

// ─── HERO: CENTERED STAT ────────────────────────────────────────────────────
function HeroCenteredStat({
  solution,
  locale,
  t,
}: {
  solution: SolutionData;
  locale: Locale;
  t: DictType;
}) {
  return (
    <section className="pt-36 lg:pt-40 pb-16 lg:pb-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={solution.photo}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.18]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 60%, #000 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 30%, ${solution.accentTint}, transparent 70%)`,
          }}
        />
      </div>
      <Container className="relative">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href={`/${locale}/#sectors`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 backdrop-blur px-3 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-white"
            >
              <span
                className="size-1.5 rounded-full"
                style={{ background: solution.accentTint }}
              />
              {solution.eyebrow}
            </Link>
            <h1 className="mt-7 text-balance text-[44px] sm:text-[64px] lg:text-[88px] xl:text-[104px] font-light leading-[0.96] tracking-[-0.03em]">
              {solution.title}
            </h1>
            <p
              className="mt-6 text-[17px] lg:text-[20px] font-medium leading-[1.45] text-pretty"
              style={{ color: solution.accentTint }}
            >
              {solution.tagline}
            </p>
            <p className="mt-5 max-w-[680px] mx-auto text-[15px] lg:text-[17px] leading-[1.65] text-fg-muted text-pretty">
              {solution.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" size="lg" href={`/${locale}/contact`}>
                {t.hero.ctaPrimary}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="#recommended"
                withArrow
              >
                Önerilen ürünler
              </Button>
            </div>
          </div>
        </Reveal>
        <Reveal delay={250}>
          <div className="mt-14 lg:mt-16">
            <AnimatedStats items={solution.stats} locale={locale} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ─── HERO: PANEL ────────────────────────────────────────────────────────────
function HeroPanel({
  solution,
  locale,
  t,
}: {
  solution: SolutionData;
  locale: Locale;
  t: DictType;
}) {
  return (
    <section className="pt-28 lg:pt-32 pb-16 lg:pb-24 relative">
      <div className="relative w-full">
        <div className="relative aspect-[16/8] lg:aspect-[16/7] w-full overflow-hidden">
          <Image
            src={solution.photo}
            alt={solution.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse 50% 60% at 25% 50%, ${solution.accentTint}, transparent 60%)`,
            }}
          />
        </div>
        <Container className="absolute inset-0">
          <div className="h-full flex items-center">
            <Reveal>
              <div className="max-w-2xl">
                <Link
                  href={`/${locale}/#sectors`}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/40 backdrop-blur px-3 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-white"
                >
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: solution.accentTint }}
                  />
                  {solution.eyebrow}
                </Link>
                <h1 className="mt-6 text-balance text-[36px] sm:text-[52px] lg:text-[68px] xl:text-[80px] font-light leading-[1.0] tracking-[-0.025em] text-white">
                  {solution.title}
                </h1>
                <p
                  className="mt-5 text-[16px] lg:text-[18px] font-medium leading-[1.5] text-pretty"
                  style={{ color: solution.accentTint }}
                >
                  {solution.tagline}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
      <Container>
        <Reveal delay={200}>
          <div className="mt-10 lg:-mt-20 lg:ml-0 lg:max-w-3xl relative">
            <div className="rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl p-8 lg:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
              <p className="text-[15px] lg:text-[17px] leading-[1.65] text-fg-muted text-pretty">
                {solution.description}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button variant="primary" size="lg" href={`/${locale}/contact`}>
                  {t.hero.ctaPrimary}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href="#recommended"
                  withArrow
                >
                  Ürünleri gör
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ─── CHALLENGES ─────────────────────────────────────────────────────────────
function Challenges({ solution }: { solution: SolutionData }) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              Zorluk
            </div>
            <h2 className="mt-5 text-balance text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.04] tracking-[-0.02em]">
              {solution.eyebrow.toLowerCase()} sektöründe gerçekte ne bozuluyor.
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 gap-4 lg:gap-5">
          {solution.challenges.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <div className="rounded-xl bg-bg-subtle border border-white/10 p-7 lg:p-8 h-full hover:-translate-y-1 hover:border-white/25 transition-all duration-500 flex gap-5">
                <div
                  className="flex-none size-10 rounded-2xl flex items-center justify-center text-[15px] font-bold"
                  style={{
                    background: `${solution.accentTint}1f`,
                    color: solution.accentTint,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-[18px] lg:text-[20px] font-medium tracking-tight text-pretty">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[1.6] text-fg-muted text-pretty">
                    {c.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── RECOMMENDED PRODUCTS ───────────────────────────────────────────────────
function Recommended({
  solution,
  locale,
}: {
  solution: SolutionData;
  locale: Locale;
}) {
  const recProducts = solution.recommended.map((slug) => PRODUCTS[slug]);
  return (
    <section
      id="recommended"
      className="py-20 lg:py-28 relative overflow-hidden bg-bg-subtle"
    >
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${solution.accentTint}, transparent 50%)`,
        }}
      />
      <Container className="relative">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              Dasvio nasıl oturur
            </div>
            <h2 className="mt-5 text-balance text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.04] tracking-[-0.02em]">
              {solution.eyebrow.toLowerCase()} için Dasvio modülleri.
            </h2>
            <p className="mt-5 text-[15px] lg:text-[16px] leading-[1.6] text-fg-muted text-pretty">
              Bu modüllerle başlayın. Büyüdükçe gerisini ekleyin — Dasvio tek entegre platform, yükseltmeler sıfır konfigürasyonla çalışır.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recProducts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <Link
                href={`/${locale}/products/${p.slug}`}
                className="block rounded-xl bg-black border border-white/10 p-6 lg:p-7 hover:border-white/25 hover:-translate-y-1.5 transition-all duration-500 h-full flex flex-col group"
              >
                <div
                  className="size-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: `${p.accentTint}26`,
                    color: p.accentTint,
                  }}
                >
                  <ArrowUpRight className="size-5" strokeWidth={2.25} />
                </div>
                <h3 className="text-[18px] lg:text-[19px] font-medium tracking-tight text-fg">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-[1.6] text-fg-muted text-pretty line-clamp-3 flex-1">
                  {p.description}
                </p>
                <div
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold group-hover:gap-2.5 transition-all"
                  style={{ color: p.accentTint }}
                >
                  Ürünü gör{" "}
                  <ArrowRight className="size-3.5" strokeWidth={2.5} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── STAT BAND ──────────────────────────────────────────────────────────────
function StatBand({
  solution,
  locale,
}: {
  solution: SolutionData;
  locale: Locale;
}) {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-bg-subtle p-8 lg:p-12 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 100% 50%, ${solution.accentTint}, transparent 50%)`,
              }}
            />
            <div className="relative">
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
                Rakamlarla
              </div>
              <div className="mt-2 text-[20px] lg:text-[24px] font-light text-fg max-w-2xl">
                Dasvio kullanan ekiplerin {solution.eyebrow.toLowerCase()} sektöründe gördükleri.
              </div>
              <AnimatedStats items={solution.stats} locale={locale} />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ─── FINAL CTA ──────────────────────────────────────────────────────────────
function FinalCTA({
  solution,
  locale,
}: {
  solution: SolutionData;
  locale: Locale;
}) {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${solution.accentTint}, transparent 60%)`,
        }}
      />
      <Container className="relative">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-balance text-[36px] sm:text-[48px] lg:text-[64px] font-light leading-[1.04] tracking-[-0.025em]">
              {solution.eyebrow.toLowerCase()} için tasarlandı. Günler içinde hazır.
            </h2>
            <p className="mt-6 text-[15px] lg:text-[17px] leading-[1.6] text-fg-muted text-pretty">
              Mevcut kurulumunuzu birlikte inceleriz, menünüzü eşleştiririz ve iki hafta içinde ekibinizi Dasvio&apos;da çalıştırırız.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" size="lg" href={`/${locale}/contact`}>
                Kişiselleştirilmiş demo al
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href={`/${locale}/pricing`}
                withArrow
              >
                Fiyatları gör
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-fg-muted">
              <span className="inline-flex items-center gap-1.5">
                <Check
                  className="size-4"
                  style={{ color: solution.accentTint }}
                  strokeWidth={2.5}
                />
                Kart gerekmez
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check
                  className="size-4"
                  style={{ color: solution.accentTint }}
                  strokeWidth={2.5}
                />
                Ortalama 14 gün kurulum
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check
                  className="size-4"
                  style={{ color: solution.accentTint }}
                  strokeWidth={2.5}
                />
                Türkçe destek
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ─── OTHER SOLUTIONS ────────────────────────────────────────────────────────
function OtherSolutions({
  others,
  locale,
}: {
  others: SolutionData[];
  locale: Locale;
}) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <Reveal>
            <div className="max-w-xl">
              <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
                Diğer çözümler
              </div>
              <h2 className="mt-5 text-balance text-[28px] sm:text-[36px] lg:text-[40px] font-light leading-[1.04] tracking-[-0.02em]">
                Hizmet verdiğimiz diğer restoran formatları.
              </h2>
            </div>
          </Reveal>
          <Link
            href={`/${locale}/#sectors`}
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent hover:gap-2.5 transition-all"
          >
            Tüm çözümler <ArrowRight className="size-4" strokeWidth={2.5} />
          </Link>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {others.map((s, i) => (
            <Reveal key={s.slug} delay={i * 100}>
              <Link
                href={`/${locale}/solutions/${s.slug}`}
                className="block rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 hover:-translate-y-1.5 transition-all duration-500 group h-full"
              >
                <div className="relative aspect-[5/4]">
                  <Image
                    src={s.photo}
                    alt={s.title}
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div
                      className="inline-flex items-center gap-1.5 rounded-lg bg-black/40 backdrop-blur border border-white/15 px-2.5 py-1 mb-3"
                    >
                      <span
                        className="size-1.5 rounded-full"
                        style={{ background: s.accentTint }}
                      />
                      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-white">
                        {s.eyebrow}
                      </div>
                    </div>
                    <h3 className="text-[20px] font-medium tracking-tight text-white leading-tight text-pretty">
                      {s.title}
                    </h3>
                  </div>
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
    for (const slug of SOLUTION_SLUGS) {
      params.push({ lang, slug });
    }
  }
  return params;
}
