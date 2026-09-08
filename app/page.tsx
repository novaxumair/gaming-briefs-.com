import type { Metadata } from "next";
import HomePageShell from "@/components/gyc/HomePageShell";
import GycSeoSection from "@/components/gyc/SeoSection";
import { SITE } from "@/lib/data";
import { buildPageMetadata, homeSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: SITE.title,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema()) }}
      />
      <HomePageShell
        title={SITE.mainH1}
        tagline={SITE.heroTagline}
        description={SITE.heroLead}
      >
        <GycSeoSection />
      </HomePageShell>
    </>
  );
}
