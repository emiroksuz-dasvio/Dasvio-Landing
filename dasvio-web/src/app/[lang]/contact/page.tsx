import { notFound } from "next/navigation";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { DemoForm } from "@/components/sections/DemoForm";

const contactBlocks = [
  {
    Icon: Mail,
    label: "E-posta",
    value: "hello@dasvio.com",
    href: "mailto:hello@dasvio.com",
  },
  {
    Icon: Phone,
    label: "Telefon",
    value: "+90 850 000 00 00",
    href: "tel:+908500000000",
  },
  {
    Icon: MapPin,
    label: "Adres",
    value: "Levent, İstanbul, Türkiye",
  },
  {
    Icon: Clock,
    label: "Çalışma saatleri",
    value: "7/24 destek · 09–18 ofis",
  },
];

export default async function ContactPage({
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
      <section className="pt-36 lg:pt-40 pb-16">
        <Container>
          <div className="max-w-3xl">
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              İLETİŞİM
            </div>
            <h1 className="text-balance mt-5 text-[44px] sm:text-[60px] lg:text-[80px] font-light leading-[1.0] tracking-[-0.025em]">
              Restoranınız hakkında konuşalım.
            </h1>
            <p className="mt-6 text-[16px] lg:text-[18px] leading-[1.6] text-fg-muted text-pretty">
              Kişiselleştirilmiş demo ayarlayın, ürün soruları sorun veya ekibe katılın. Her kanaldan ulaşabilirsiniz.
            </p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactBlocks.map((b) => {
              const inner = (
                <div className="rounded-2xl border border-white/10 bg-bg-subtle p-6 hover:border-white/20 transition h-full">
                  <div className="size-11 rounded-2xl bg-accent-soft text-accent flex items-center justify-center">
                    <b.Icon className="size-5" strokeWidth={2} />
                  </div>
                  <div className="mt-5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-fg-muted">
                    {b.label}
                  </div>
                  <div className="mt-1 text-[15.5px] font-medium text-fg">
                    {b.value}
                  </div>
                </div>
              );
              return b.href ? (
                <a key={b.label} href={b.href} className="block">
                  {inner}
                </a>
              ) : (
                <div key={b.label}>{inner}</div>
              );
            })}
          </div>
        </Container>
      </section>
      <DemoForm t={t.demoForm} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}
