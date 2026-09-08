import { SITE, type Guide } from "@/lib/data";
import { blogSpotlightDescription } from "@/lib/blog-spotlight";
import {
  getGameplayImagesForGuide,
  getSatanoGameplayImagesForGuide,
} from "@/lib/gameplay-images";
import {
  TARKOV_ARTICLE_SLUG,
  TARKOV_BLOG_INTRO,
  TARKOV_COMMUNITY_PICKS,
  TARKOV_COMMUNITY_SUMMARY,
  TARKOV_FAQ,
  TARKOV_FAQ_CATEGORIES,
  TARKOV_FAQ_INTRO,
  TARKOV_FEATURES,
  TARKOV_HERO_LEAD,
  TARKOV_MARKET_CRITERIA,
  TARKOV_MARKET_CTA,
  TARKOV_MARKET_SITES,
  TARKOV_MARKET_SUMMARY,
  tarkovFeatureImages,
  tarkovGalleryImages,
  type MarketCriteriaRow,
  type MarketSiteCompare,
  type TarkovBlogBlock,
  type TarkovCommunityPick,
  type TarkovFaqItem,
  type TarkovFeatureBlock,
} from "@/lib/tarkov-article";

export type ArticleFeatureBlock = TarkovFeatureBlock;
export type ArticleBlogBlock = TarkovBlogBlock;
export type ArticleCommunityPick = TarkovCommunityPick;
export type ArticleMarketSite = MarketSiteCompare;
export type ArticleMarketCriteriaRow = MarketCriteriaRow;
export type ArticleFaqItem = TarkovFaqItem;

function hashSlug(slug: string): number {
  return slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function shareForSlug(slug: string, base: number, index: number): number {
  const hash = hashSlug(slug);
  return Math.min(99, Math.max(5, base + ((hash + index * 7) % 9) - 4));
}

export function articleGalleryImages(guide: Guide): string[] {
  if (guide.slug === TARKOV_ARTICLE_SLUG) {
    return tarkovGalleryImages();
  }

  const images = getSatanoGameplayImagesForGuide(guide, 6);
  if (guide.gif && !images.includes(guide.gif)) {
    images.push(guide.gif);
  }
  if (images.length === 0 && guide.image) {
    images.push(guide.image);
  }
  return images.slice(0, 6);
}

export function articleFeatureImages(guide: Guide): string[] {
  if (guide.slug === TARKOV_ARTICLE_SLUG) {
    return tarkovFeatureImages(guide);
  }

  const features = articleFeatures(guide);
  const gallery = articleGalleryImages(guide);
  const fallback = guide.image || SITE.logo;
  const out: string[] = [];

  for (let i = 0; i < features.length; i++) {
    out.push(gallery[i] ?? gallery[i % Math.max(gallery.length, 1)] ?? fallback);
  }

  return out;
}

export function articleHeroLead(guide: Guide): string {
  if (guide.slug === TARKOV_ARTICLE_SLUG) {
    return TARKOV_HERO_LEAD;
  }
  return blogSpotlightDescription(guide.gameName, guide.slug);
}

export function articleBlogIntro(guide: Guide): ArticleBlogBlock[] {
  if (guide.slug === TARKOV_ARTICLE_SLUG) {
    return TARKOV_BLOG_INTRO;
  }

  const game = guide.gameName;

  return [
    {
      id: "why-cheat",
      title: `Why people cheat in ${game}`,
      body: `${game} punishes mistakes harder than most live games. One bad fight can erase hours of progress, and the meta rewards players who already know every map, spawn, and loot route. Cheats stack information first — seeing fights before you commit matters more than raw aim on day one.`,
      bullets: [
        "Information cheats (ESP) lead before aimbot for most buyers",
        "Grind-heavy loops make loot and world ESP high-retention features",
        "Skill gaps on new maps push players toward player tags and distance readouts",
      ],
    },
    {
      id: "recent-update",
      title: `What changed in the latest ${game} patch`,
      tag: "Updated early 2026",
      body: `${game} still ships hotfixes on short notice, and anti-cheat sweeps follow client updates. After each patch, status windows shrink — builds that were fine mid-week can flag by the weekend. Check the live status note on the product page before every session, not just after a major update.`,
      bullets: [
        "Anti-cheat updates often land 24–72h after game client patches",
        "Patch weeks spike ban waves — start with ESP-only, not hard lock",
        "HWID flags persist across reinstalls until you run a spoofer pass",
      ],
    },
    {
      id: "most-used",
      title: `Most used cheats in ${game} right now`,
      body: `Buyer traffic on ${game} cheat listings clusters the same way every season: information first, aim second, recovery tools when needed. Player ESP leads almost every cart — loot filters, recoil helpers, and soft aimbot follow once the overlay feels natural.`,
      bullets: [
        "Player ESP — #1 starter feature for most buyers",
        "Loot / world ESP — highest retention after the first week",
        "Soft aimbot (small FOV) — added once ESP feels natural",
        "HWID spoofer — only after an existing hardware ban",
      ],
    },
  ];
}

function genericFeatures(guide: Guide): ArticleFeatureBlock[] {
  const game = guide.gameName;

  return [
    {
      id: "aimbot",
      title: "Aimbot",
      body: `${game} aimbot tracks targets inside a set FOV. Smoothing and bone priority keep fights readable — you pick head or chest, set the circle size, and tune per weapon where the build supports it.`,
      bullets: ["FOV + smooth sliders", "Visibility check before lock", "Team / friendly filters where supported"],
    },
    {
      id: "esp",
      title: "Player ESP",
      body: `See who is holding an angle before you wide-swing. Name, distance, weapon, and health readouts cut down on guesswork in ${game} — especially on unfamiliar maps or late-game lobbies.`,
      bullets: [
        "Boxes, skeleton, or corner style",
        "Distance cap so the overlay stays clean",
        "Corpse and container tags where supported",
      ],
    },
    {
      id: "loot",
      title: "Loot & world ESP",
      body: `Filter sessions down to what actually pays — high-tier loot, quest items, and objectives. Less tabbing through wikis mid-match when value filters and highlights are tuned for ${game}.`,
      bullets: [
        "Item value filters on supported builds",
        "Quest / objective highlights",
        "Map markers where the tier includes them",
      ],
    },
    {
      id: "recoil",
      title: "Recoil & gun handling",
      body: `Full-auto beams and tap chains are easier when recoil helpers are tuned per weapon class. Pair with a sane aimbot FOV so ${game} sessions do not look robotic on kill cams or reports.`,
      bullets: [
        "Per-weapon profiles on supported builds",
        "No-sway options on some tiers",
        "Works alongside ESP, not instead of it",
      ],
    },
    {
      id: "spoofer",
      title: "HWID spoofer & setup",
      body: `A hardware flag on ${game} can survive reinstalls. If you are flagged, run the spoofer path before the next login — the listing should say whether it ships in-bundle or separate.`,
      bullets: [
        "Spoofer steps before first launch after ban",
        "Loader access right after checkout",
        "Patch notes when anti-cheat or game updates land",
      ],
    },
  ];
}

export function articleFeatures(guide: Guide): ArticleFeatureBlock[] {
  if (guide.slug === TARKOV_ARTICLE_SLUG) {
    return TARKOV_FEATURES;
  }
  return genericFeatures(guide);
}

export function articleFeatureSectionTitle(guide: Guide): string {
  if (guide.slug === TARKOV_ARTICLE_SLUG) {
    return "What each cheat does in raid";
  }
  return "What each cheat does in-game";
}

export function articleBlogSectionTitle(guide: Guide): string {
  if (guide.slug === TARKOV_ARTICLE_SLUG) {
    return "Why Tarkov players run cheats";
  }
  return `Why ${guide.gameName} players run cheats`;
}

export function articleCommunityPicks(guide: Guide): ArticleCommunityPick[] {
  if (guide.slug === TARKOV_ARTICLE_SLUG) {
    return TARKOV_COMMUNITY_PICKS;
  }

  const game = guide.gameName;
  const slug = guide.slug;

  return [
    {
      rank: 1,
      feature: "Player ESP",
      share: shareForSlug(slug, 94, 0),
      note: `Nearly every ${game} buyer starts here — boxes, distance, and weapon readouts before any aim assist.`,
    },
    {
      rank: 2,
      feature: "Loot & world ESP",
      share: shareForSlug(slug, 81, 1),
      note: "Value filters and objective highlights pay for the sub faster than raw PvP alone.",
    },
    {
      rank: 3,
      feature: "Soft aimbot",
      share: shareForSlug(slug, 62, 2),
      note: "Small FOV + smoothing once players trust the overlay — not day-one hard lock.",
    },
    {
      rank: 4,
      feature: "Recoil helpers",
      share: shareForSlug(slug, 48, 3),
      note: "Often bundled with aim tiers; tuned profiles matter more in longer sessions.",
    },
    {
      rank: 5,
      feature: "HWID spoofer",
      share: shareForSlug(slug, 11, 4),
      note: "Niche add-on — only buyers with an existing hardware ban. Most new subs skip this unless they are flagged.",
    },
  ];
}

export function articleCommunitySummary(guide: Guide): string {
  if (guide.slug === TARKOV_ARTICLE_SLUG) {
    return TARKOV_COMMUNITY_SUMMARY;
  }
  return `Community picks mirror what actually sells for ${guide.gameName}: ESP stacks first, aimbot second. Spoofers are a small slice — almost always after a ban, not on a clean PC.`;
}

export function articleMarketSites(_guide: Guide): ArticleMarketSite[] {
  return TARKOV_MARKET_SITES;
}

export function articleMarketCriteria(guide: Guide): ArticleMarketCriteriaRow[] {
  if (guide.slug === TARKOV_ARTICLE_SLUG) {
    return TARKOV_MARKET_CRITERIA;
  }

  const game = guide.gameName;
  const patchLabel = `${game} patch status on the product page`;

  return TARKOV_MARKET_CRITERIA.map((row) =>
    row.label === "Tarkov patch status on the product page"
      ? { ...row, label: patchLabel }
      : row,
  );
}

export function articleMarketCta(guide: Guide): string {
  if (guide.slug === TARKOV_ARTICLE_SLUG) {
    return TARKOV_MARKET_CTA;
  }
  return `Ready for instant ${guide.gameName} access with every feature listed?`;
}

export function articleMarketSummary(guide: Guide): string {
  if (guide.slug === TARKOV_ARTICLE_SLUG) {
    return TARKOV_MARKET_SUMMARY;
  }

  const game = guide.gameName;
  return `Zadeyo wins on the stuff that matters day-to-day for ${game}: you see features before paying, checkout is instant, and support is not a random Discord tag. Forum pastes and Telegram flippers trade price for risk — missing docs, outdated builds, and zero help when anti-cheat updates land.`;
}

function genericFaqs(guide: Guide): ArticleFaqItem[] {
  const game = guide.gameName;

  return [
    {
      id: "undetected",
      question: `Are ${game} cheats undetected in 2026?`,
      category: "Safety",
      popular: true,
      answer: `Status changes every time ${game} or its anti-cheat ships an update — there is no permanent “safe forever” build. Check the live undetected note on the product page before each session. Right after major patches is when ban waves spike hardest.`,
    },
    {
      id: "ban-risk",
      question: `Will I get banned using cheats in ${game}?`,
      category: "Bans",
      popular: true,
      answer: `Yes, ban risk is always real — account bans from reports and behavior, hardware bans if anti-cheat flags your PC. Soft ESP with sane settings lowers report rates; hard aimbot on a fresh account raises them fast. Play like you still need to hide the overlay.`,
    },
    {
      id: "esp-vs-aimbot",
      question: `ESP or aimbot — what should I run first in ${game}?`,
      category: "Features",
      popular: true,
      answer: `Player ESP + loot ESP first. Learn spawns, objectives, and overlay layout before you add aimbot with a small FOV and smoothing. Most searches and buyer traffic start with wallhack-style info — aim second, not day one.`,
    },
    {
      id: "anticheat",
      question: `Can anti-cheat detect ${game} cheats?`,
      category: "Safety",
      popular: true,
      answer: `Anti-cheat scans memory, drivers, and known cheat signatures — undetected builds work until a new signature or heuristic hit lands. That is why patch windows matter: a build fine on Tuesday can flag after the next sweep.`,
    },
    {
      id: "loot-esp",
      question: `Is loot ESP worth it for ${game}?`,
      category: "Features",
      answer: `For most buyers, yes — value filters and objective highlights pay for the sub faster than raw PvP alone. It cuts grind time and wiki tabbing mid-session. Pair with player ESP so you are not looting while someone holds the angle.`,
    },
    {
      id: "patch",
      question: `What happens to cheats after a ${game} patch?`,
      category: "Safety",
      answer: `Client patches often break offsets until the cheat dev pushes an update; anti-cheat updates can follow 24–72 hours later. Read status notes and avoid loading until the build is marked working. Hardware flags do not reset with a new account alone.`,
    },
    {
      id: "spoofer",
      question: `Do I need an HWID spoofer for ${game}?`,
      category: "Bans",
      answer: `Only if you already caught a hardware ban. A new account on the same flagged PC will chain-ban without a spoofer pass first. Clean hardware + new account = spoofer not required for most buyers.`,
    },
    {
      id: "install",
      question: `How do I install ${game} cheats after buying?`,
      category: "Setup",
      answer: `Checkout → license in your account → download the loader → follow the on-page steps (often: close game, run spoofer if needed, inject, then launch ${game}). No Discord handoff on proper listings — steps should be written before you pay.`,
    },
    {
      id: "loader-speed",
      question: `How fast do I get the loader after payment?`,
      category: "Buying",
      answer: `Instant once payment clears — license key, loader link, and load steps land in your account. If a seller makes you wait in DMs for a file, that is a red flag compared to Zadeyo-style instant delivery.`,
    },
    {
      id: "why-zadeyo",
      question: `Why buy ${game} cheats through Zadeyo instead of Discord?`,
      category: "Buying",
      answer: `Features listed before checkout, live patch status, spoofer docs, and a support path that is not a random Telegram tag. Discord flippers often sell outdated builds with zero refund path when anti-cheat updates land.`,
    },
  ];
}

export function articleFaqs(guide: Guide): ArticleFaqItem[] {
  if (guide.slug === TARKOV_ARTICLE_SLUG) {
    return TARKOV_FAQ;
  }
  return genericFaqs(guide);
}

export function articleFaqIntro(guide: Guide): string {
  if (guide.slug === TARKOV_ARTICLE_SLUG) {
    return TARKOV_FAQ_INTRO;
  }
  return `The questions below match what buyers type into Google and Reddit before their first ${guide.gameName} sub — undetected status, ban risk, ESP vs aimbot, and post-patch safety.`;
}

export function articleFaqCategories(_guide: Guide): readonly string[] {
  return TARKOV_FAQ_CATEGORIES;
}

/** Fallback gallery helper for components that need the legacy 4-image set. */
export function articleSpotlightImages(guide: Guide): string[] {
  const images = getGameplayImagesForGuide(guide);
  return images.length > 0 ? images : articleGalleryImages(guide);
}
