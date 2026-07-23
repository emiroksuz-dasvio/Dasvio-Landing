import clsx from "clsx";

export function Container({
  children,
  className,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** HTML tags only — React.ElementType would also admit the three.js JSX
      elements that @react-three/fiber adds globally, collapsing `children`
      to `never`. */
  as?: keyof HTMLElementTagNameMap;
}) {
  return <As className={clsx("container-page", className)}>{children}</As>;
}
