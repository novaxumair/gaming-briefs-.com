import type { ReactNode } from "react";
import GycHero from "@/components/gyc/Hero";
import BlogCards from "@/components/gyc/BlogCards";
import HomeHeroSearch from "@/components/gyc/HomeHeroSearch";
import FeaturedGuideLinks from "@/components/gyc/FeaturedGuideLinks";
import DeferredGuideCardStack from "@/components/gyc/DeferredGuideCardStack";

export default function HomePageShell({
  title,
  tagline,
  description,
  children,
}: {
  title: string;
  tagline?: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <>
      <FeaturedGuideLinks />
      <GycHero title={title} tagline={tagline} description={description}>
        <HomeHeroSearch />
      </GycHero>
      <DeferredGuideCardStack />
      <BlogCards />
      {children}
    </>
  );
}
