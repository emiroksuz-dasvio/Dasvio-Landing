"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type DemoFormDict = {
  eyebrow: string;
  title: string;
  subtitle: string;
  bullets: string[];
  fields: {
    name: string;
    company: string;
    branches: string;
    country: string;
    email: string;
    phone: string;
    message: string;
  };
  placeholders: {
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
  };
  selectPlaceholder: string;
  countries: { code: string; label: string }[];
  branchesOptions: string[];
  submit: string;
  submitting: string;
  error: string;
  honeypot: string;
  privacy: string;
  success: { title: string; body: string };
};

const inputCls =
  "w-full h-12 rounded-lg liquid-glass-input px-4 text-[14.5px] text-fg placeholder:text-fg-subtle transition";

/**
 * Netlify Forms. The site is a static export, so there is no API route to post
 * to — instead Netlify's build bot scans the deployed HTML for a form carrying
 * `data-netlify`, registers it, and accepts submissions POSTed to any path on
 * the site as urlencoded pairs. Two things are load-bearing:
 *   - the hidden `form-name` input, which tells Netlify which form this is
 *     (required because we submit via fetch, not a native form POST);
 *   - `netlify-honeypot`, whose field must stay visually hidden but present.
 * Form handling has to be enabled once per site in the Netlify UI; until then
 * submissions come back 404 and land in the error branch below.
 */
const FORM_NAME = "demo";

export function DemoForm({ t }: { t: DemoFormDict }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const data = new FormData(e.currentTarget);
    // FormData holds File values in its type; this form is text-only.
    const body = new URLSearchParams(data as unknown as Record<string, string>).toString();

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
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
              {t.bullets.map((it) => (
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
            {status === "done" ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="size-16 rounded-lg bg-accent-soft text-accent-fg flex items-center justify-center">
                  <CheckCircle2 className="size-8" strokeWidth={2} />
                </div>
                <h3 className="mt-5 text-[22px] font-semibold tracking-tight">
                  {t.success.title}
                </h3>
                <p className="mt-2 text-[14.5px] text-fg-muted max-w-xs">
                  {t.success.body}
                </p>
              </div>
            ) : (
              <form
                name={FORM_NAME}
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={onSubmit}
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value={FORM_NAME} />
                <p className="hidden">
                  <label>
                    {t.honeypot}
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label={t.fields.name}>
                    <input
                      name="name"
                      autoComplete="name"
                      className={inputCls}
                      placeholder={t.placeholders.name}
                      required
                    />
                  </Field>
                  <Field label={t.fields.company}>
                    <input
                      name="company"
                      autoComplete="organization"
                      className={inputCls}
                      placeholder={t.placeholders.company}
                      required
                    />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label={t.fields.branches}>
                    <select name="branches" className={inputCls} defaultValue="" required>
                      <option value="" disabled>
                        {t.selectPlaceholder}
                      </option>
                      {t.branchesOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t.fields.country}>
                    <select name="country" className={inputCls} defaultValue="TR" required>
                      {t.countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label={t.fields.email}>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      className={inputCls}
                      placeholder={t.placeholders.email}
                      required
                    />
                  </Field>
                  <Field label={t.fields.phone}>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      className={inputCls}
                      placeholder={t.placeholders.phone}
                      required
                    />
                  </Field>
                </div>
                <Field label={t.fields.message}>
                  <textarea
                    rows={3}
                    name="message"
                    className={`${inputCls} h-auto py-3 resize-none`}
                    placeholder={t.placeholders.message}
                  />
                </Field>
                {status === "error" && (
                  <p
                    role="alert"
                    className="rounded-lg border border-accent/40 bg-accent-soft px-4 py-3 text-[13.5px] leading-relaxed text-fg"
                  >
                    {t.error}
                  </p>
                )}
                <div className="pt-2">
                  <Button
                    variant="accent"
                    size="lg"
                    type="submit"
                    className="w-full"
                    disabled={status === "sending"}
                    withArrow={status !== "sending"}
                  >
                    {status === "sending" ? t.submitting : t.submit}
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
