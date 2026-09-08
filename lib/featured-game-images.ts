export type FeaturedGameSlug =
  | "valorant"
  | "warzone"
  | "destiny-2"
  | "rainbow-six-siege"
  | "sea-of-thieves";

/** Primary game art/logo from IGN game pages (og:image). */
export const IGN_GAME_IMAGES: Record<FeaturedGameSlug, string> = {
  valorant:
    "https://assets-prd.ignimgs.com/2021/12/21/valorant-1640045685890.jpg",
  warzone:
    "https://assets1.ignimgs.com/2020/03/09/call-of-duty-warzone---button-01-1583782814571.jpg",
  "destiny-2":
    "https://assets-prd.ignimgs.com/2025/03/12/destiny2heresy-1741800139522.jpg",
  "rainbow-six-siege":
    "https://assets-prd.ignimgs.com/2025/06/30/siegex-1751319986948.jpg",
  "sea-of-thieves":
    "https://assets-prd.ignimgs.com/2026/06/09/sot-customthieves-1781027869323.jpg",
};

/** Local copies served from /public/images/games (preferred for tiles & heroes). */
export const FEATURED_GAME_IMAGES: Record<FeaturedGameSlug, string> = {
  valorant: "/images/games/valorant.jpg",
  warzone: "/images/games/warzone.jpg",
  "destiny-2": "/images/games/destiny-2.jpg",
  "rainbow-six-siege": "/images/games/rainbow-six-siege.jpg",
  "sea-of-thieves": "/images/games/sea-of-thieves.jpg",
};

export function getFeaturedGameImage(slug: string): string | undefined {
  return FEATURED_GAME_IMAGES[slug as FeaturedGameSlug];
}

export function isFeaturedGameSlug(slug: string): slug is FeaturedGameSlug {
  return slug in FEATURED_GAME_IMAGES;
}
