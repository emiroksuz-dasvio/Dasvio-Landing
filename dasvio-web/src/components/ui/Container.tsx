import clsx from "clsx";

export function Container({
  children,
  className,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return <As className={clsx("container-page", className)}>{children}</As>;
}
