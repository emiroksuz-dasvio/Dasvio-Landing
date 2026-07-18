import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { About } from "@/components/sections/About";
import { LogosBand } from "@/components/sections/LogosBand";
import { Trust } from "@/components/sections/Trust";

export default async function AboutPage({
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
          <div className="max-w-3xl">
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              {t.about.eyebrow}
            </div>
            <h1 className="text-balance mt-5 text-[44px] sm:text-[60px] lg:text-[80px] font-light leading-[1.0] tracking-[-0.025em]">
              {t.about.title}
            </h1>
            <p className="mt-6 text-[16px] lg:text-[19px] leading-[1.6] text-fg-muted text-pretty">
              {t.about.body}
            </p>
          </div>
        </Container>
      </section>
      <About t={t.about} locale={locale} />
      <LogosBand t={t.logos} />
      <Trust t={t.trust} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}
