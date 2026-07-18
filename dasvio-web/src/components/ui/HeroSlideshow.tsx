"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=80",
    label: "Modern restoran iç mekan",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop&q=80",
    label: "Fine dining servis",
  },
  {
    src: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1600&auto=format&fit=crop&q=80",
    label: "Serviste POS",
  },
  {
    src: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1600&auto=format&fit=crop&q=80",
    label: "Restoran atmosferi",
  },
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&auto=format&fit=crop&q=80",
    label: "Kafe & QR menü",
  },
];

const DURATION_MS = 2200;

export function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setActive((p) => (p + 1) % photos.length);
    }, DURATION_MS);
    return () => window.clearInterval(t);
  }, []);

  return (
    <>
      {photos.map((p, i) => (
        <div
          key={p.src}
          className="absolute inset-0"
          style={{
            opacity: i === active ? 1 : 0,
            transform: i === active ? "scale(1)" : "scale(1.04)",
            transition:
              "opacity 700ms ease, transform 3000ms cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <Image
            src={p.src}
            alt={p.label}
            fill
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
        {photos.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active
                ? "w-8 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </>
  );
}
