import Link from "next/link";
import BlogSpotlightHero from "@/components/gyc/BlogSpotlightHero";
import { getGuideUrl, guides } from "@/lib/data";

export default function BlogSpotlightList() {
  return (
    <section className="blog-spotlight-list">
      <div className="site-container">
        <div className="blog-spotlight-list-header">
          <h2 className="gyc-section-title">Featured cheat guides</h2>
          <p className="blog-spotlight-list-lead">
            Scroll through every game in the{" "}
            <Link href="/" className="site-prose-link">
              catalog
            </Link>{" "}
            — each guide opens with live stats, gameplay previews, and a full feature
            breakdown when you click through. Need load help? Visit{" "}
            <Link href="/support" className="site-prose-link">
              support
            </Link>
            .
          </p>
        </div>
        <div className="blog-spotlight-stack">
          {guides.map((guide) => (
            <BlogSpotlightHero
              key={guide.slug}
              guide={guide}
              showGuideLink
              primaryHref={getGuideUrl(guide.slug)}
              primaryLabel={`Read ${guide.gameName} cheat guide`}
              secondaryHref={`${getGuideUrl(guide.slug)}#features`}
              secondaryLabel="See features"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
