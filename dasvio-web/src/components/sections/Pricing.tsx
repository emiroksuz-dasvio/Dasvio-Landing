"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type Plan = {
  name: string;
  tagline: string;
  price: string;
  period: string;
  highlight?: boolean;
  cta: string;
  features: string[];
};

type PricingDict = {
  eyebrow: string;
  title: string;
  subtitle: string;
  billingMonthly: string;
  billingAnnual: string;
  billingAnnualSave: string;
  plans: Plan[];
};

export function Pricing({ t, locale }: { t: PricingDict; locale: string }) {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 lg:py-32">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
            {t.eyebrow}
          </div>
          <h2 className="text-balance mt-5 text-[36px] sm:text-[44px] lg:text-[56px] font-light leading-[1.02] tracking-[-0.02em] text-fg">
            {t.title}
          </h2>
          <p className="mt-5 text-[17px] lg:text-[18px] leading-[1.6] text-fg-muted text-pretty">
            {t.subtitle}
          </p>
          <div className="mt-8 inline-flex items-center rounded-lg liquid-glass-sm p-1">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={clsx(
                "h-9 px-4 rounded-md text-[13.5px] font-semibold transition",
                !annual ? "bg-fg text-fg-inverse" : "text-fg-muted",
              )}
            >
              {t.billingMonthly}
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={clsx(
                "h-9 px-4 rounded-md text-[13.5px] font-semibold transition flex items-center gap-2",
                annual ? "bg-fg text-fg-inverse" : "text-fg-muted",
              )}
            >
              {t.billingAnnual}
              <span
                className={clsx(
                  "text-[11px] font-semibold rounded-md px-2 py-0.5",
                  annual ? "bg-accent text-accent-fg" : "bg-accent-soft text-accent-fg",
                )}
              >
                {t.billingAnnualSave}
              </span>
            </button>
          </div>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {t.plans.map((plan, idx) => (
            <Reveal key={plan.name} delay={idx * 120} className="h-full">
            <div
              className={clsx(
                "rounded-2xl p-7 lg:p-8 flex flex-col relative transition-all duration-500 hover:-translate-y-1.5",
                plan.highlight
                  ? "liquid-glass-strong text-fg-inverse border-2 border-accent shadow-[0_24px_64px_rgba(244,63,94,0.35)] hover:shadow-[0_36px_80px_rgba(244,63,94,0.5)]"
                  : "liquid-glass hover:border-[rgba(244,63,94,0.4)] hover:shadow-[0_24px_60px_rgba(244,63,94,0.2)]",
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-lg bg-accent text-accent-fg px-3 py-1 text-[11.5px] font-bold uppercase tracking-wider">
                  {plan.cta}
                </div>
              )}
              <div className="flex flex-col">
                <div className="text-[22px] font-semibold tracking-tight">
                  {plan.name}
                </div>
                <div
                  className={clsx(
                    "text-[13.5px] mt-1",
                    plan.highlight ? "text-fg-inverse-muted" : "text-fg-muted",
                  )}
                >
                  {plan.tagline}
                </div>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-[40px] font-semibold tracking-tight display-tight">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={clsx(
                        "text-[14px]",
                        plan.highlight ? "text-fg-inverse-muted" : "text-fg-muted",
                      )}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>
                {annual && plan.period && (
                  <div
                    className={clsx(
                      "text-[12px] mt-1",
                      plan.highlight ? "text-fg-inverse-muted" : "text-fg-muted",
                    )}
                  >
                    {t.billingAnnualSave}
                  </div>
                )}
              </div>
              <ul className="mt-7 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={clsx(
                      "flex gap-2.5 text-[14px]",
                      plan.highlight ? "text-fg-inverse" : "text-fg",
                    )}
                  >
                    <Check
                      className={clsx(
                        "size-4.5 mt-0.5 flex-none",
                        plan.highlight ? "text-accent" : "text-accent",
                      )}
                      strokeWidth={2.5}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  variant={plan.highlight ? "accent" : "primary"}
                  size="md"
                  href={`/${locale}#demo`}
                  className="w-full"
                  withArrow
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
