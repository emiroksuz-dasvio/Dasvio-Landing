import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Pricing } from "@/components/sections/Pricing";
import { Trust } from "@/components/sections/Trust";

export default async function PricingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const t = await getDictionary(locale);

  return (
    <>
      <section className="pt-36 lg:pt-40 pb-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              {t.pricing.eyebrow}
            </div>
            <h1 className="text-balance mt-5 text-[44px] sm:text-[60px] lg:text-[80px] font-light leading-[1.0] tracking-[-0.025em]">
              {t.pricing.title}
            </h1>
            <p className="mt-6 text-[16px] lg:text-[18px] leading-[1.6] text-fg-muted text-pretty">
              {t.pricing.subtitle}
            </p>
          </div>
        </Container>
      </section>
      <Pricing t={t.pricing} locale={locale} />
      <Trust t={t.trust} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}
