import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Hero } from "@/components/sections/Hero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Sectors } from "@/components/sections/Sectors";
import { LogosBand } from "@/components/sections/LogosBand";
import { Personas } from "@/components/sections/Personas";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { Pricing } from "@/components/sections/Pricing";
import { DemoForm } from "@/components/sections/DemoForm";
import { Trust } from "@/components/sections/Trust";

export default async function HomePage({
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
      <Hero t={t.hero} stats={t.stats} locale={locale} />
      <FeatureGrid t={t.features} problem={t.problem} />
      <Sectors t={t.sectors} />
      <LogosBand t={t.logos} />
      <Personas t={t.personas} />
      <Testimonials t={t.testimonials} />
      <About t={t.about} locale={locale} />
      <Pricing t={t.pricing} locale={locale} />
      <DemoForm t={t.demoForm} />
      <Trust t={t.trust} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}
