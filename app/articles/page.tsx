import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogPageShell from "@/components/gyc/CatalogPageShell";
import GycSeoSection from "@/components/gyc/SeoSection";
import { SITE } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: SITE.articlesTitle,
  description: SITE.articlesDescription,
  path: "/articles",
});

export default function ArticlesPage() {
  return (
    <Suspense fallback={null}>
      <CatalogPageShell
        title={SITE.articlesMainH1}
        tagline={SITE.articlesHeroTagline}
        description={SITE.articlesHeroLead}
        linkMode="cheats"
        showCatalog={false}
        showSearch={false}
        showHero={false}
      >
        <GycSeoSection variant="articles" />
      </CatalogPageShell>
    </Suspense>
  );
}
