import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

type TestimonialsDict = {
  eyebrow: string;
  title: string;
  items: TestimonialItem[];
};

const avatarColors = ["#fbbf24", "#06b6d4", "#f43f5e"];

export function Testimonials({ t }: { t: TestimonialsDict }) {
  return (
    <section className="py-24 lg:py-32 bg-bg-subtle">
      <Container>
        <div className="max-w-2xl">
          <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
            {t.eyebrow}
          </div>
          <h2 className="display-tight text-balance mt-5 text-[36px] sm:text-[44px] lg:text-[56px] font-semibold text-fg">
            {t.title}
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-3">
          {t.items.map((item, i) => {
            const initials = item.name
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("");
            return (
              <Reveal key={item.name} delay={i * 140}>
              <figure
                className="rounded-2xl liquid-glass p-7 lg:p-8 flex flex-col h-full hover:-translate-y-1.5 hover:border-[rgba(244,63,94,0.4)] hover:shadow-[0_30px_60px_rgba(244,63,94,0.22)] transition-all duration-500"
              >
                <Quote className="size-7 text-accent" strokeWidth={2} />
                <blockquote className="mt-5 text-[16px] lg:text-[17px] leading-[1.6] text-fg text-pretty flex-1">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-border-subtle">
                  <div
                    className="size-11 rounded-lg flex items-center justify-center text-[13px] font-bold text-bg-inverse"
                    style={{ background: avatarColors[i % avatarColors.length] }}
                  >
                    {initials}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-fg leading-tight">
                      {item.name}
                    </div>
                    <div className="text-[12.5px] text-fg-muted mt-0.5">
                      {item.role} · {item.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
