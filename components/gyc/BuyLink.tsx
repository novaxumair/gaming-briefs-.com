import Link from "next/link";
import { isExternalBuyUrl } from "@/lib/buy-links";

export default function BuyLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (isExternalBuyUrl(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_self"
        rel="noopener noreferrer sponsored"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
