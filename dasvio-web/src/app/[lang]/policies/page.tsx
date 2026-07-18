import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Lock,
  Scale,
  ArrowUpRight,
  Mail,
} from "lucide-react";
import { hasLocale, locales, type Locale } from "@/i18n/config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { POLICIES } from "@/lib/policies-data";

const ICONS = [ShieldCheck, Scale, Lock, FileText];
const TINTS = ["#ffffff", "#06b6d4", "#f43f5e", "#f59e0b"];

export default async function PoliciesHubPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;

  return (
    <>
      <section className="pt-36 lg:pt-40 pb-16 lg:pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none animate-gradient-shift"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 0%, rgba(255,255,255,0.15), transparent 50%), radial-gradient(circle at 90% 100%, #06b6d4, transparent 45%)",
          }}
        />
        <Container className="relative">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
                <ShieldCheck className="size-3.5" strokeWidth={2.5} />
                Yasal & Politikalar
              </div>
              <h1 className="mt-6 text-balance text-[44px] sm:text-[60px] lg:text-[80px] xl:text-[92px] font-light leading-[0.98] tracking-[-0.025em]">
                Şeffaflık ve <span className="text-accent">güven</span>, baştan
                sona.
              </h1>
              <p className="mt-6 max-w-2xl text-[16px] lg:text-[18px] leading-[1.65] text-fg-muted text-pretty">
                Verilerinizi nasıl koruduğumuz, hizmetlerimizi nasıl
                sunduğumuz ve haklarınızın tamamı tek bir yerde. Avukat onaylı,
                KVKK uyumlu, açıkça yazılmış.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-[13px] text-fg-muted">
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
                  KVKK uyumlu
                </span>
                <span className="size-1 rounded-full bg-fg-muted/40" />
                <span>PCI DSS sertifikalı</span>
                <span className="size-1 rounded-full bg-fg-muted/40" />
                <span>{POLICIES.length} belge</span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
            {POLICIES.map((p, i) => {
              const Icon = ICONS[i % ICONS.length];
              const tint = TINTS[i % TINTS.length];
              return (
                <Reveal key={p.slug} delay={i * 100}>
                  <Link
                    href={`/${locale}/policies/${p.slug}`}
                    className="group block h-full rounded-2xl bg-bg-subtle border border-white/10 p-7 lg:p-9 hover:border-white/25 hover:-translate-y-1.5 transition-all duration-500"
                    style={{
                      boxShadow: `0 0 0 1px transparent`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className="size-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                        style={{ background: `${tint}1f`, color: tint }}
                      >
                        <Icon className="size-5.5" strokeWidth={2} />
                      </div>
                      <ArrowUpRight
                        className="size-5 text-fg-muted group-hover:text-fg group-hover:rotate-12 transition-all duration-500"
                        strokeWidth={2}
                      />
                    </div>
                    <h2 className="mt-6 text-[22px] lg:text-[26px] font-medium tracking-tight text-fg leading-[1.2] text-pretty">
                      {p.title}
                    </h2>
                    <p className="mt-3 text-[14px] leading-[1.6] text-fg-muted text-pretty">
                      {p.description}
                    </p>
                    <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[12px]">
                      <span className="text-fg-muted">
                        Son güncelleme · {p.lastUpdated}
                      </span>
                      <span className="text-fg-muted">
                        {p.sections.length} bölüm
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.12), transparent 60%)",
          }}
        />
        <Container className="relative">
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-10 lg:p-14 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-accent/15 text-accent mb-6">
                <Mail className="size-5" strokeWidth={2} />
              </div>
              <h2 className="text-balance text-[28px] sm:text-[36px] lg:text-[44px] font-light leading-[1.04] tracking-[-0.02em]">
                Hukuki bir sorunuz mu var?
              </h2>
              <p className="mt-5 max-w-xl mx-auto text-[15px] lg:text-[16px] leading-[1.65] text-fg-muted text-pretty">
                Veri talepleri, KVKK başvuruları veya sözleşme soruları için
                doğrudan hukuk ekibimizle iletişime geçebilirsiniz.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  href="mailto:legal@dasvio.com"
                >
                  legal@dasvio.com
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href={`/${locale}/contact`}
                  withArrow
                >
                  İletişim formu
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
