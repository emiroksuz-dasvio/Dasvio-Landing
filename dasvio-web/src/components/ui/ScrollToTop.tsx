"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { smoothScrollTo } from "@/lib/smooth-scroll";

/** Floating liquid-glass "back to top" button, bottom-right. Appears once
    the page has scrolled past the first viewport. */
export function ScrollToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => smoothScrollTo(0)}
      className={`fixed bottom-5 right-5 z-40 grid size-11 cursor-pointer place-items-center rounded-full liquid-glass-sm text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_8px_28px_rgba(244,63,94,0.3)] active:scale-95 lg:bottom-7 lg:right-7 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="size-4.5" strokeWidth={2.25} />
    </button>
  );
}
