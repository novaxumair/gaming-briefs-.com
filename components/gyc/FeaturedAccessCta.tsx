import AccessCta from "@/components/gyc/AccessCta";
import BuyLink from "@/components/gyc/BuyLink";
import { FEATURED_ACCESS_SLUG, getAccessLabel, getBuyUrl, isBuyAvailable } from "@/lib/buy-links";
import { catalogItems } from "@/lib/data";

export function FeaturedAccessCta({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "md" | "lg";
}) {
  const featured = catalogItems.find((item) => item.slug === FEATURED_ACCESS_SLUG);
  const gameName = featured?.title;

  return (
    <AccessCta
      slug={FEATURED_ACCESS_SLUG}
      gameName={gameName}
      className={className}
      size={size}
      label={getAccessLabel()}
    />
  );
}

export function HeaderAccessCta({ className = "" }: { className?: string }) {
  if (!isBuyAvailable(FEATURED_ACCESS_SLUG)) {
    return (
      <BuyLink href="/blogs" className={`access-cta access-cta-nav ${className}`.trim()}>
        <span className="access-cta-text">Get access</span>
      </BuyLink>
    );
  }

  return (
    <BuyLink
      href={getBuyUrl(FEATURED_ACCESS_SLUG)}
      className={`access-cta access-cta-nav ${className}`.trim()}
    >
      <span className="access-cta-shine" aria-hidden />
      <span className="access-cta-text">Get access</span>
    </BuyLink>
  );
}
