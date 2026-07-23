import { notFound } from "next/navigation";
import { Mail, Phone, MapPin, Clock, type LucideIcon } from "lucide-react";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { DemoForm } from "@/components/sections/DemoForm";

/**
 * Icon and link target per block; the label and displayed value come from the
 * dictionary under `contactPage.blocks`, keyed by the same id — the address and
 * office hours read differently per locale, the email and phone do not.
 */
type BlockId = "email" | "phone" | "address" | "hours";

const BLOCKS: { id: BlockId; Icon: LucideIcon; href?: string }[] = [
  { id: "email", Icon: Mail, href: "mailto:hello@dasvio.com" },
  { id: "phone", Icon: Phone, href: "tel:+908500000000" },
  { id: "address", Icon: MapPin },
  { id: "hours", Icon: Clock },
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const t = dict.contactPage;

  return (
    <>
      <section className="pt-36 lg:pt-40 pb-16">
        <Container>
          <div className="max-w-3xl">
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              {t.eyebrow}
            </div>
            <h1 className="text-balance mt-5 text-[44px] sm:text-[60px] lg:text-[80px] font-light leading-[1.0] tracking-[-0.025em]">
              {t.title}
            </h1>
            <p className="mt-6 text-[16px] lg:text-[18px] leading-[1.6] text-fg-muted text-pretty">
              {t.subtitle}
            </p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BLOCKS.map((b) => {
              const copy = t.blocks[b.id];
              const inner = (
                <div className="rounded-2xl border border-white/10 bg-bg-subtle p-6 hover:border-white/20 transition h-full">
                  <div className="size-11 rounded-2xl bg-accent-soft text-accent flex items-center justify-center">
                    <b.Icon className="size-5" strokeWidth={2} />
                  </div>
                  <div className="mt-5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-fg-muted">
                    {copy.label}
                  </div>
                  <div className="mt-1 text-[15.5px] font-medium text-fg">
                    {copy.value}
                  </div>
                </div>
              );
              return b.href ? (
                <a key={b.id} href={b.href} className="block">
                  {inner}
                </a>
              ) : (
                <div key={b.id}>{inner}</div>
              );
            })}
          </div>
        </Container>
      </section>
      <DemoForm t={dict.demoForm} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}
