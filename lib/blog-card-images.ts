/** Wide promotional art for blog cards (16:9 / landscape preferred). */
export const BLOG_CARD_IMAGE_SOURCES: Record<string, string> = {
  valorant:
    "https://assets-prd.ignimgs.com/2021/12/21/valorant-1640045685890.jpg",
  warzone:
    "https://assets1.ignimgs.com/2020/03/09/call-of-duty-warzone---button-01-1583782814571.jpg",
  "rainbow-six-siege":
    "https://assets-prd.ignimgs.com/2025/06/30/siegex-1751319986948.jpg",
  "destiny-2":
    "https://assets-prd.ignimgs.com/2025/03/12/destiny2heresy-1741800139522.jpg",
  "sea-of-thieves":
    "https://assets-prd.ignimgs.com/2026/06/09/sot-customthieves-1781027869323.jpg",
  fortnite:
    "https://assets-prd.ignimgs.com/2025/04/02/nintendoswitch2-fortnite-keyart-square-1743635675429.jpg",
  tarkov:
    "https://cdn.cloudflare.steamstatic.com/steam/apps/834910/header.jpg",
  pubg: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg",
  "league-of-legends":
    "https://assets-prd.ignimgs.com/2021/12/14/leagueoflegends-1639513774570.jpg",
  "overwatch-2":
    "https://cdn.cloudflare.steamstatic.com/steam/apps/2357570/header.jpg",
  rust: "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/header.jpg",
  dayz: "https://cdn.cloudflare.steamstatic.com/steam/apps/221100/header.jpg",
};

export function getBlogCardImage(gameKey: string): string {
  return `/images/blog/${gameKey}.jpg`;
}

export const BLOG_CARD_GAME_KEYS = Object.keys(BLOG_CARD_IMAGE_SOURCES);
