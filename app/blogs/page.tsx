import type { Metadata } from "next";
import CatalogPageShell from "@/components/gyc/CatalogPageShell";
import GycSeoSection from "@/components/gyc/SeoSection";
import { SITE } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

const blogsDescription =
  "Browse cheat guides by game with aimbot, ESP, wallhack, and spoofer feature lists, patch notes, and buyer FAQs on Gaming Briefs.";

export const metadata: Metadata = buildPageMetadata({
  title: SITE.blogsTitle,
  description: blogsDescription,
  path: "/blogs",
});

export default function BlogsPage() {
  return (
    <CatalogPageShell
      title={SITE.blogsMainH1}
      tagline={SITE.blogsHeroTagline}
      description={SITE.blogsHeroLead}
      linkMode="cheats"
    >
      <GycSeoSection variant="blogs" />
    </CatalogPageShell>
  );
}
