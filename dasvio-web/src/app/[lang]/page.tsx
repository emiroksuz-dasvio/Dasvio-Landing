import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { HeroExperience } from "@/components/sections/HeroExperience";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Sectors } from "@/components/sections/Sectors";
import { LogosBand } from "@/components/sections/LogosBand";
import { Personas } from "@/components/sections/Personas";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { Pricing } from "@/components/sections/Pricing";
import { DemoForm } from "@/components/sections/DemoForm";
import { Trust } from "@/components/sections/Trust";
import { ParallaxGlow } from "@/components/ui/ParallaxGlow";
import { Reveal } from "@/components/ui/Reveal";

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
    <div className="relative">
      <ParallaxGlow />
      <HeroExperience t={t.hero} stats={t.stats} locale={locale} />
      {/* Every section reveals once on the way down (Reveal is once=true —
          nothing re-animates on the way back up). */}
      <Reveal>
        <FeatureGrid t={t.features} problem={t.problem} locale={locale} />
      </Reveal>
      <Reveal>
        <Sectors t={t.sectors} />
      </Reveal>
      <Reveal>
        <LogosBand t={t.logos} />
      </Reveal>
      <Reveal>
        <Personas t={t.personas} />
      </Reveal>
      <Reveal>
        <Testimonials t={t.testimonials} />
      </Reveal>
      <Reveal>
        <About t={t.about} locale={locale} />
      </Reveal>
      <Reveal>
        <Pricing t={t.pricing} locale={locale} />
      </Reveal>
      <Reveal>
        <DemoForm t={t.demoForm} />
      </Reveal>
      <Reveal>
        <Trust t={t.trust} />
      </Reveal>
    </div>
  );
}

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}
