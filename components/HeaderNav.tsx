"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinkClass =
  "relative font-display text-[10px] uppercase tracking-wider text-[#86efac]/75 transition hover:text-[#bbf7d0] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#4ade80]/60 after:transition-all hover:after:w-full sm:text-xs";

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/blogs") return pathname === "/blogs" || pathname.startsWith("/blog/");
  if (href === "/articles") return pathname === "/articles";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function desktopLinkClass(pathname: string, href: string): string {
  const active = isNavActive(pathname, href);
  return active ? `${navLinkClass} text-[#4ade80] after:w-full` : navLinkClass;
}

function mobileLinkClass(pathname: string, href: string): string {
  const active = isNavActive(pathname, href);
  return active
    ? "font-display text-[9px] uppercase tracking-wider text-[#4ade80]"
    : "font-display text-[9px] uppercase tracking-wider text-[#86efac]/80";
}

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <>
      <div className="flex h-8 items-center gap-3 lg:hidden">
        <Link href="/" className={mobileLinkClass(pathname, "/")}>
          Home
        </Link>
        <Link href="/blogs" className={mobileLinkClass(pathname, "/blogs")}>
          Blogs
        </Link>
        <Link href="/articles" className={mobileLinkClass(pathname, "/articles")}>
          Articles
        </Link>
      </div>

      <nav className="hidden items-center gap-10 lg:flex xl:gap-14">
        <Link href="/" className={desktopLinkClass(pathname, "/")}>
          Home
        </Link>
        <Link href="/blogs" className={desktopLinkClass(pathname, "/blogs")}>
          Blogs
        </Link>
        <Link href="/articles" className={desktopLinkClass(pathname, "/articles")}>
          Articles
        </Link>
      </nav>
    </>
  );
}
