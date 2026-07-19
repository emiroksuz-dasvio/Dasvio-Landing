"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type DemoFormDict = {
  eyebrow: string;
  title: string;
  subtitle: string;
  fields: {
    name: string;
    company: string;
    branches: string;
    country: string;
    email: string;
    phone: string;
    message: string;
  };
  branchesOptions: string[];
  submit: string;
  privacy: string;
};

const inputCls =
  "w-full h-12 rounded-lg liquid-glass-input px-4 text-[14.5px] text-fg placeholder:text-fg-subtle transition";

export function DemoForm({ t }: { t: DemoFormDict }) {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="demo" className="py-24 lg:py-32 bg-bg-inverse text-fg-inverse">
      <Container>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              {t.eyebrow}
            </div>
            <h2 className="text-balance mt-5 text-[36px] sm:text-[44px] lg:text-[56px] font-light leading-[1.02] tracking-[-0.02em]">
              {t.title}
            </h2>
            <p className="mt-5 text-[17px] lg:text-[18px] leading-[1.6] text-fg-inverse-muted text-pretty">
              {t.subtitle}
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "15 dakika içinde canlı demo",
                "Kişiselleştirilmiş ürün turu",
                "Fiyatlandırma soru-cevap",
              ].map((it) => (
                <li
                  key={it}
                  className="flex items-center gap-2.5 text-[14.5px] text-fg-inverse-muted"
                >
                  <CheckCircle2 className="size-5 text-accent flex-none" strokeWidth={2} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl liquid-glass-strong p-6 lg:p-8 text-fg">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="size-16 rounded-lg bg-accent-soft text-accent-fg flex items-center justify-center">
                  <CheckCircle2 className="size-8" strokeWidth={2} />
                </div>
                <h3 className="mt-5 text-[22px] font-semibold tracking-tight">
                  Teşekkürler!
                </h3>
                <p className="mt-2 text-[14.5px] text-fg-muted max-w-xs">
                  En kısa sürede demo planlamak için size dönüş yapacağız.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label={t.fields.name}>
                    <input className={inputCls} placeholder="Ayşe Demir" required />
                  </Field>
                  <Field label={t.fields.company}>
                    <input className={inputCls} placeholder="Lokanta 1928" required />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label={t.fields.branches}>
                    <select className={inputCls} defaultValue="" required>
                      <option value="" disabled>
                        Seçiniz
                      </option>
                      {t.branchesOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t.fields.country}>
                    <select className={inputCls} defaultValue="TR" required>
                      <option value="TR">Türkiye</option>
                      <option value="DE">Almanya</option>
                      <option value="GB">Birleşik Krallık</option>
                      <option value="US">Amerika Birleşik Devletleri</option>
                      <option value="FR">Fransa</option>
                      <option value="other">Diğer</option>
                    </select>
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label={t.fields.email}>
                    <input
                      type="email"
                      className={inputCls}
                      placeholder="ayse@lokanta.com"
                      required
                    />
                  </Field>
                  <Field label={t.fields.phone}>
                    <input
                      type="tel"
                      className={inputCls}
                      placeholder="+90 5xx xxx xx xx"
                      required
                    />
                  </Field>
                </div>
                <Field label={t.fields.message}>
                  <textarea
                    rows={3}
                    className={`${inputCls} h-auto py-3 resize-none`}
                    placeholder="Restoranınız hakkında kısa bilgi…"
                  />
                </Field>
                <div className="pt-2">
                  <Button variant="accent" size="lg" type="submit" className="w-full" withArrow>
                    {t.submit}
                  </Button>
                </div>
                <p className="text-[12px] text-fg-muted text-center leading-relaxed">{t.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[12.5px] font-semibold text-fg-muted mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
