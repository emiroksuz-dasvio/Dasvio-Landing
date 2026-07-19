import { Check, Crown, Settings2, Users, Globe } from "lucide-react";
import { Container } from "@/components/ui/Container";

type PersonaItem = {
  role: string;
  headline: string;
  points: string[];
};

type PersonasDict = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: PersonaItem[];
};

const icons = [Crown, Settings2, Users];

function Globe3D() {
  const meridians = Array.from({ length: 12 }, (_, i) => (i * 180) / 12);
  const parallels = [-55, -27, 0, 27, 55];
  return (
    <div className="absolute inset-[20%]" style={{ perspective: "1200px" }}>
      <div
        className="absolute inset-0 rounded-full bg-accent/12 blur-3xl pointer-events-none animate-pulse-glow"
        aria-hidden
      />
      <div className="size-full relative globe-3d">
        {meridians.map((angle, i) => (
          <div
            key={`m${i}`}
            className="absolute inset-0 rounded-full border-2"
            style={{
              transform: `rotateY(${angle}deg)`,
              borderColor:
                i === 0
                  ? "rgba(255, 255, 255, 0.55)"
                  : i === 6
                    ? "rgba(255, 255, 255, 0.4)"
                    : "rgba(255, 255, 255, 0.18)",
            }}
          />
        ))}
        {parallels.map((lat) => {
          const yPercent = -Math.sin((lat * Math.PI) / 180) * 50;
          const scale = Math.cos((lat * Math.PI) / 180);
          return (
            <div
              key={`p${lat}`}
              className="absolute inset-0 rounded-full border-2 border-accent/22"
              style={{
                transform: `translateY(${yPercent.toFixed(2)}%) rotateX(90deg) scale(${scale.toFixed(3)})`,
              }}
            />
          );
        })}
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Globe
          className="size-10 sm:size-12 lg:size-14 text-accent/85"
          strokeWidth={1.4}
        />
      </div>
    </div>
  );
}

type OrbConfig = {
  bg: string;
  mark: string;
  duration: number;
  inset: string;
  reverse?: boolean;
  delay?: number;
  size?: number;
  textFg?: string;
};

const orbConfigs: OrbConfig[] = [
  { bg: "#ffffff", mark: "G", duration: 14, inset: "6%", size: 48, textFg: "#000000" },
  { bg: "#f43f5e", mark: "T", duration: 19, inset: "2%", reverse: true, delay: -3, size: 44 },
  { bg: "#f59e0b", mark: "Y", duration: 11, inset: "10%", delay: -7, size: 40 },
  { bg: "#06b6d4", mark: "Q", duration: 22, inset: "0%", reverse: true, delay: -12, size: 52 },
];

function OrbitingOrbs() {
  return (
    <>
      {orbConfigs.map((o, i) => (
        <div
          key={i}
          className={`absolute pointer-events-none ${
            o.reverse ? "orbit-track-reverse" : "orbit-track"
          }`}
          style={
            {
              inset: o.inset,
              ["--orbit-duration"]: `${o.duration}s`,
              animationDelay: `${o.delay ?? 0}s`,
            } as React.CSSProperties
          }
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg flex items-center justify-center font-bold shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            style={{
              width: o.size,
              height: o.size,
              background: o.bg,
              fontSize: (o.size ?? 48) / 3.5,
              color: o.textFg ?? "#ffffff",
            }}
          >
            {o.mark}
          </div>
        </div>
      ))}
    </>
  );
}

function GlobeStage() {
  return (
    <div className="relative size-[320px] sm:size-[400px] md:size-[460px] lg:size-[540px] mx-auto">
      <Globe3D />
      <OrbitingOrbs />
    </div>
  );
}

function PersonaCard({
  item,
  Icon,
}: {
  item: PersonaItem;
  Icon: typeof Crown;
}) {
  return (
    <div className="rounded-2xl liquid-glass liquid-card text-fg p-6 lg:p-7 flex flex-col h-full">
      <div className="flex items-center gap-2.5">
        <div className="size-9 rounded-lg bg-bg-muted flex items-center justify-center border border-border-default">
          <Icon className="size-4 text-accent" strokeWidth={2.25} />
        </div>
        <div className="text-[11.5px] font-semibold uppercase tracking-[0.15em] text-fg-muted">
          {item.role}
        </div>
      </div>
      <h3 className="mt-4 text-[19px] lg:text-[21px] font-medium tracking-tight text-balance leading-[1.2]">
        {item.headline}
      </h3>
      <ul className="mt-4 space-y-2">
        {item.points.map((p) => (
          <li
            key={p}
            className="flex gap-2 text-[13.5px] text-fg-muted leading-[1.5]"
          >
            <Check
              className="size-3.5 mt-0.5 text-accent flex-none"
              strokeWidth={2.5}
            />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Personas({ t }: { t: PersonasDict }) {
  const cards = t.items.map((item, idx) => ({
    item,
    Icon: icons[idx] ?? Crown,
  }));

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <Container>
        <div className="max-w-2xl">
          <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
            {t.eyebrow}
          </div>
          <h2 className="text-balance mt-5 text-[36px] sm:text-[44px] lg:text-[56px] font-light leading-[1.02] tracking-[-0.02em] text-fg">
            {t.title}
          </h2>
          <p className="mt-5 text-[15px] lg:text-[16px] leading-[1.6] text-fg-muted text-pretty">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-16 lg:mt-24 grid gap-6 md:gap-8 md:grid-cols-3 md:grid-rows-[auto_auto] items-center">
          <div className="md:col-start-2 md:row-start-1">
            <PersonaCard item={cards[0].item} Icon={cards[0].Icon} />
          </div>
          <div className="md:col-start-1 md:row-start-2">
            <PersonaCard item={cards[1].item} Icon={cards[1].Icon} />
          </div>
          <div className="md:col-start-2 md:row-start-2 flex justify-center">
            <GlobeStage />
          </div>
          <div className="md:col-start-3 md:row-start-2">
            <PersonaCard item={cards[2].item} Icon={cards[2].Icon} />
          </div>
        </div>
      </Container>
    </section>
  );
}
