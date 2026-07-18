import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AnimatedStats } from "@/components/ui/AnimatedStats";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { HeroSlideshow } from "@/components/ui/HeroSlideshow";

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
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-20 items-center">
          <div className="max-w-[720px]">
            <AnimatedHeadline
              title={t.title}
              accent={t.titleAccent}
              className="text-balance text-[48px] sm:text-[64px] lg:text-[80px] xl:text-[96px] font-light text-fg leading-[1.0] tracking-[-0.025em]"
            />
            <p className="mt-7 max-w-[520px] text-[15px] lg:text-[16px] leading-[1.55] text-fg-muted text-pretty">
              {t.subtitle}
            </p>
            <div className="mt-9">
              <Button variant="primary" size="lg" href={`/${locale}#demo`}>
                {t.ctaPrimary}
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-[1/1] xl:aspect-[6/5] bg-bg-muted">
              <HeroSlideshow />
            </div>
            <LiveOrderCard />
            <TranslationCard />
          </div>
        </div>
        <AnimatedStats items={stats.items} locale={locale} />
      </Container>
    </section>
  );
}

function LiveOrderCard() {
  return (
    <div className="absolute right-3 lg:right-[-28px] top-[18%] w-[230px] lg:w-[270px] rounded-2xl liquid-glass shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(244,63,94,0.12),inset_0_1px_0_rgba(255,255,255,0.12)] p-4 animate-float">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-muted">
          Masa 7
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-accent-fg bg-accent-soft px-2 py-0.5 rounded-md">
          <span className="size-1.5 rounded-full bg-accent" /> Aktif
        </span>
      </div>
      <div className="mt-3 space-y-1.5">
        {[
          { name: "Cappuccino × 2", price: "₺150" },
          { name: "Sezar Salata", price: "₺95" },
          { name: "Cheesecake", price: "₺85" },
        ].map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-[12.5px]"
          >
            <span className="text-fg">{item.name}</span>
            <span className="text-fg-muted">{item.price}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-border-subtle flex items-center justify-between">
        <div className="flex -space-x-1.5">
          {["#fbbf24", "#06b6d4", "#fb7185"].map((c) => (
            <span
              key={c}
              className="size-5 rounded-full border-2 border-white"
              style={{ background: c }}
            />
          ))}
        </div>
        <div className="text-[14px] font-bold text-fg">₺330</div>
      </div>
    </div>
  );
}

function TranslationCard() {
  return (
    <div className="absolute left-[-12px] lg:left-[-32px] bottom-[14%] rounded-2xl liquid-glass shadow-[0_20px_60px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] px-4 py-3 flex items-center gap-3 animate-float-alt">
      <div className="size-9 rounded-lg bg-accent flex items-center justify-center text-[14px] font-bold text-accent-fg">
        AI
      </div>
      <div className="min-w-0">
        <div className="text-[12.5px] font-semibold text-fg leading-tight">
          Menü çevrildi
        </div>
        <div className="text-[11px] text-fg-muted mt-0.5">
          14 dil · 2 sn önce
        </div>
      </div>
    </div>
  );
}
