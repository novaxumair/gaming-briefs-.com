import Image from "next/image";
import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import HeaderSearch from "@/components/HeaderSearch";
import NavAuth from "@/components/NavAuth";
import { SITE } from "@/lib/data";

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
            <HeaderNav />
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

          <HeaderNav />

          <div className="flex items-center gap-6">
            <HeaderSearch />
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
