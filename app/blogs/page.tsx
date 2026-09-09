import type { Metadata } from "next";
import BlogCards from "@/components/gyc/BlogCards";
import GycHero from "@/components/gyc/Hero";
import { SITE } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: SITE.blogsTitle,
  description: SITE.blogsDescription,
  path: "/blogs",
});

export default function BlogsPage() {
  return (
    <>
      <GycHero
        title={SITE.blogsMainH1}
        tagline={SITE.blogsHeroTagline}
        description={SITE.blogsHeroLead}
        showFlipBoard={false}
      />
      <BlogCards hideHeader />
    </>
  );
}
