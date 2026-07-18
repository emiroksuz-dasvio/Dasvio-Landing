import { Container } from "@/components/ui/Container";

const placeholderLogos = [
  "ANATOLIA",
  "Coastal",
  "BIG BURGER",
  "MAVI BALIK",
  "kasap & döner",
  "Cassia",
  "URBAN BREW",
  "Lokanta 1928",
  "PIZZA NEXT",
  "SAFRAN",
];

type LogosDict = { title: string };

export function LogosBand({ t }: { t: LogosDict }) {
  const row = [...placeholderLogos, ...placeholderLogos];
  return (
    <section className="py-16 lg:py-20 border-y border-border-subtle">
      <Container>
        <p className="text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-fg-muted">
          {t.title}
        </p>
      </Container>
      <div className="mt-10 overflow-hidden mask-fade-sides">
        <div className="flex w-max animate-marquee gap-12">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-[22px] lg:text-[28px] font-semibold tracking-tight text-fg-subtle whitespace-nowrap"
              style={{ fontFamily: i % 3 === 0 ? "serif" : undefined, fontStyle: i % 5 === 0 ? "italic" : undefined }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
