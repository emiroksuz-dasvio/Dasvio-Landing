import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AnimatedStats } from "@/components/ui/AnimatedStats";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { LiveConsole } from "@/components/ui/LiveConsole";

type HeroDict = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustBadge: string;
};

type StatsDict = {
  items: { value: string; label: string }[];
};

export function Hero({
  t,
  stats,
  locale,
}: {
  t: HeroDict;
  stats: StatsDict;
  locale: string;
}) {
  return (
    <section className="relative pt-32 lg:pt-36 pb-16 lg:pb-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-radial-fade pointer-events-none"
        aria-hidden
      />
      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-center">
          <div className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 rounded-full liquid-glass-sm px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
              <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
              {t.eyebrow}
            </div>
            <AnimatedHeadline
              title={t.title}
              accent={t.titleAccent}
              className="mt-6 text-balance text-[48px] sm:text-[64px] lg:text-[80px] xl:text-[96px] font-light text-fg leading-[1.0] tracking-[-0.025em]"
            />
            <p className="mt-7 max-w-[520px] text-[15px] lg:text-[16px] leading-[1.55] text-fg-muted text-pretty">
              {t.subtitle}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" href={`/${locale}#demo`}>
                {t.ctaPrimary}
              </Button>
              <Button variant="secondary" size="lg" href={`/${locale}#features`}>
                {t.ctaSecondary}
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-[13px] text-fg-muted">
              <span className="size-1 rounded-full bg-accent" aria-hidden />
              {t.trustBadge}
            </p>
          </div>
          <LiveConsole locale={locale} />
        </div>
        <AnimatedStats items={stats.items} locale={locale} />
      </Container>
    </section>
  );
}
