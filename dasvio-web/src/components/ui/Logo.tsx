import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

export function Logo({
  href = "/",
  className,
}: {
  href?: string;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={clsx("inline-flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="Dasvio"
        width={110}
        height={25}
        priority
        className="h-[26px] w-auto object-contain"
      />
    </Link>
  );
}
