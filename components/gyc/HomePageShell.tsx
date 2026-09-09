import type { ReactNode } from "react";
import BlogCards from "@/components/gyc/BlogCards";
import FeaturedGuideLinks from "@/components/gyc/FeaturedGuideLinks";
import DeferredGuideCardStack from "@/components/gyc/DeferredGuideCardStack";
import LandingHero from "@/components/gyc/LandingHero";

export default function HomePageShell({ children }: { children?: ReactNode }) {
  return (
    <>
      <FeaturedGuideLinks />
      <LandingHero />
      <DeferredGuideCardStack />
      <BlogCards />
      {children}
    </>
  );
}
