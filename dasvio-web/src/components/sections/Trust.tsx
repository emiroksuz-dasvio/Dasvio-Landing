import { Container } from "@/components/ui/Container";

type TrustDict = {
  items: { value: string; label: string }[];
};

export function Trust({ t }: { t: TrustDict }) {
  return (
    <section className="py-12 border-t border-border-subtle bg-bg-subtle">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border-default text-center">
          {t.items.map((item) => (
            <div key={item.label} className="px-6 py-6 sm:py-2">
              <div className="display-tight text-[32px] lg:text-[40px] font-semibold text-fg">
                {item.value}
              </div>
              <div className="mt-1 text-[13.5px] text-fg-muted">{item.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
