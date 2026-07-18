"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { locales, type Locale } from "@/i18n/config";

const labels: Record<Locale, string> = {
  tr: "TR",
  en: "EN",
};

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale) {
      setOpen(false);
      return;
    }
    const segments = pathname.split("/");
    segments[1] = next;
    const newPath = segments.join("/") || `/${next}`;
    startTransition(() => {
      router.push(newPath);
      setOpen(false);
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="inline-flex items-center gap-1 rounded-lg px-3 h-9 text-sm font-medium text-fg hover:bg-bg-muted transition"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="size-4" strokeWidth={2} />
        <span>{labels[locale]}</span>
        <ChevronDown className="size-3.5 opacity-60" strokeWidth={2.5} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 min-w-[110px] rounded-2xl liquid-glass p-1 z-50"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  switchTo(l);
                }}
                className={`w-full text-left rounded-xl px-3 py-2 text-sm hover:bg-bg-muted ${
                  l === locale ? "text-fg font-semibold" : "text-fg-muted"
                }`}
              >
                {labels[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
