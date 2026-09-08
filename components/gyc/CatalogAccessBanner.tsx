import { FeaturedAccessCta } from "@/components/gyc/FeaturedAccessCta";

export default function CatalogAccessBanner() {
  return (
    <section className="catalog-access-banner" aria-label="Get access">
      <div className="catalog-access-banner-inner">
        <div className="catalog-access-banner-copy">
          <h2>Ready to get access?</h2>
          <p>Instant delivery on supported games — aimbot, ESP, wallhack and spoofer builds.</p>
        </div>
        <FeaturedAccessCta size="lg" />
      </div>
    </section>
  );
}
