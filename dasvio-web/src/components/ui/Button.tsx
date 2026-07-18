import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type Variant = "primary" | "accent" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(160deg,#f43f5e,#e11d48)] text-white border border-[rgba(255,255,255,0.28)] shadow-[0_4px_24px_rgba(244,63,94,0.5),inset_0_1.5px_0_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(0,0,0,0.2)] hover:shadow-[0_8px_36px_rgba(244,63,94,0.7),inset_0_1.5px_0_rgba(255,255,255,0.55)] active:scale-[0.97] backdrop-blur-sm",
  accent:
    "bg-[linear-gradient(160deg,#f43f5e,#e11d48)] text-white border border-[rgba(255,255,255,0.28)] shadow-[0_4px_24px_rgba(244,63,94,0.5),inset_0_1.5px_0_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(0,0,0,0.2)] hover:shadow-[0_8px_36px_rgba(244,63,94,0.7)] active:scale-[0.97]",
  secondary:
    "btn-secondary bg-[rgba(255,255,255,0.07)] text-fg border border-[rgba(255,255,255,0.2)] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.38),0_4px_16px_rgba(0,0,0,0.18)] hover:bg-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.28)] hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.48),0_8px_28px_rgba(0,0,0,0.22)] [backdrop-filter:blur(28px)_saturate(200%)] [-webkit-backdrop-filter:blur(28px)_saturate(200%)] active:scale-[0.97]",
  ghost:
    "bg-transparent text-fg hover:bg-[rgba(255,255,255,0.06)] hover:border hover:border-[rgba(255,255,255,0.15)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] active:scale-[0.97]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: React.ReactNode;
  className?: string;
  withArrow?: boolean;
  type?: "button" | "submit";
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  withArrow,
  type = "button",
}: Props) {
  const cls = clsx(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {withArrow && <ArrowRight className="size-4" strokeWidth={2.25} />}
    </>
  );
  if (href) {
    const isExternal = /^(https?:)?\/\//i.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={cls}>
      {content}
    </button>
  );
}
