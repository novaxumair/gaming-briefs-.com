import Link from "next/link";
import { SITE } from "@/lib/data";

export const metadata = {
  title: `Page Not Found | ${SITE.name}`,
  description: "The page you requested could not be found.",
  robots: "noindex, follow",
};

export default function NotFound() {
  return (
    <div className="site-static-page">
      <div className="site-static-inner">
        <div className="gyc-simple-card">
          <h1 className="gyc-simple-title">Page not found</h1>
          <p className="gyc-simple-text">
            The page you requested is not on {SITE.domainHost}. It may have moved to a new
            cheat guide URL or the link may be outdated.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className="guide-cta">
              Catalog home
            </Link>
            <Link href="/articles" className="guide-cta-ghost">
              Cheat guides
            </Link>
            <Link href="/support" className="guide-cta-ghost">
              Help center
            </Link>
            <Link href="/contact" className="guide-cta-ghost">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
