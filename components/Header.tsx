import Image from "next/image";
import Link from "next/link";
import NavAuth from "@/components/NavAuth";
import { SITE } from "@/lib/data";

const navLinkClass =
  "relative font-display text-[10px] uppercase tracking-wider text-[#86efac]/75 transition hover:text-[#bbf7d0] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#4ade80]/60 after:transition-all hover:after:w-full sm:text-xs";

export default function Header() {
  return (
    <>
      {/* Mobile */}
      <div className="site-top-nav text-sm lg:hidden">
        <div className="site-container flex flex-row items-center justify-between py-2.5">
          <div className="flex h-8 items-center gap-3">
            <Link href="/" aria-label={`${SITE.name} home`} className="flex items-center gap-2">
              <Image
                src={SITE.logo}
                alt={`${SITE.name} logo`}
                width={32}
                height={32}
                loading="eager"
                priority
                className="site-logo-pixel block object-contain"
                style={{ background: "transparent" }}
              />
              <span className="font-display text-[9px] leading-tight text-[#bbf7d0]">{SITE.name}</span>
            </Link>
            <Link href="/" className="font-display text-[9px] uppercase tracking-wider text-[#4ade80]">
              Home
            </Link>
            <Link href="/blogs" className="font-display text-[9px] uppercase tracking-wider text-[#86efac]/80">
              Guides
            </Link>
          </div>
          <NavAuth compact buttonClassName="px-3 py-1.5 text-xs sm:px-3.5 sm:py-2 sm:text-sm" />
        </div>
      </div>

      {/* Desktop */}
      <div className="site-top-nav sticky top-0 z-50 hidden lg:block">
        <div className="site-container flex flex-row items-center justify-between py-3">
          <Link href="/" aria-label={`${SITE.name} home`} className="flex items-center gap-3">
              <Image
                src={SITE.logo}
                alt={`${SITE.name} logo`}
                width={SITE.logoWidth}
                height={SITE.logoHeight}
                loading="eager"
                priority
                className="site-logo-pixel block object-contain"
                style={{ background: "transparent" }}
              />
            <span className="font-display text-[10px] leading-snug tracking-tight text-[#bbf7d0]">
              {SITE.name}
            </span>
          </Link>

          <nav className="flex items-center gap-10 xl:gap-14">
            <Link href="/" className={`${navLinkClass} text-[#4ade80] after:w-full`}>
              Home
            </Link>
            <Link href="/blogs" className={navLinkClass}>
              Guides
            </Link>
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href="/blogs"
              className="text-[#86efac]/60 transition hover:text-[#4ade80]"
              aria-label="Search guides"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
            <Link
              href="/reviews"
              className="font-display text-[10px] uppercase tracking-wider text-[#86efac]/80 transition hover:text-[#bbf7d0] hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.35)]"
            >
              Reviews
            </Link>
            <NavAuth />
          </div>
        </div>
      </div>
    </>
  );
}
