import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type Pillar = {
  title: string;
  desc: string;
};

type AboutDict = {
  eyebrow: string;
  title: string;
  body: string;
  pillars: Pillar[];
  cta: string;
};

export function About({ t, locale }: { t: AboutDict; locale: string }) {
  return (
    <section id="about" className="py-24 lg:py-32 bg-bg-subtle">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              {t.eyebrow}
            </div>
            <h2 className="text-balance mt-5 text-[36px] sm:text-[44px] lg:text-[56px] font-light text-fg leading-[1.02] tracking-[-0.02em]">
              {t.title}
            </h2>
          </div>
          <div>
            <p className="text-[16px] lg:text-[18px] leading-[1.6] text-fg-muted text-pretty">
              {t.body}
            </p>
            <div className="mt-10 grid sm:grid-cols-3 gap-6 lg:gap-8">
              {t.pillars.map((p) => (
                <div key={p.title} className="border-t border-border-strong pt-5">
                  <div className="text-[15.5px] font-medium tracking-tight text-fg">
                    {p.title}
                  </div>
                  <p className="mt-2 text-[13.5px] leading-[1.55] text-fg-muted">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Button variant="secondary" size="md" href={`/${locale}#demo`} withArrow>
                {t.cta}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
