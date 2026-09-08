import type { FeaturedGuideArticle } from "./types";
import { getFeaturedGameImage } from "@/lib/featured-game-images";
import { valorantGuide } from "./valorant";
import { warzoneGuide } from "./warzone";
import { destiny2Guide } from "./destiny-2";
import { rainbowSixSiegeGuide } from "./rainbow-six-siege";
import { seaOfThievesGuide } from "./sea-of-thieves";

const BASE_FEATURED_GUIDES: FeaturedGuideArticle[] = [
  valorantGuide,
  warzoneGuide,
  destiny2Guide,
  rainbowSixSiegeGuide,
  seaOfThievesGuide,
];

export const FEATURED_GUIDES: FeaturedGuideArticle[] = BASE_FEATURED_GUIDES.map((guide) => ({
  ...guide,
  image: getFeaturedGameImage(guide.slug) ?? guide.image,
}));

export function getFeaturedGuide(slug: string): FeaturedGuideArticle | undefined {
  return FEATURED_GUIDES.find((guide) => guide.slug === slug);
}

export type { FeaturedGuideArticle, FeaturedGuideCard } from "./types";
