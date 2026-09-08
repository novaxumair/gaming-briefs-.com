import type { Guide } from "@/lib/data";

export const TARKOV_ARTICLE_SLUG = "escape-from-tarkov";

/** Live Satano gameplay captures from wh-satano.ru/en/cheats/escape_from_tarkov */
export const TARKOV_SATANO_GAMEPLAY = [
  "https://cdn.wh-satano.ru/eftauths7.webp",
  "https://cdn.wh-satano.ru/covcheg-eft-s2.webp",
  "https://cdn.wh-satano.ru/authority-eft-arena-menu.webp",
];

export const TARKOV_SATANO_COVER =
  "https://wh-satano.ru/storage/thumbnails/default/3x/lz/h18tyv8k84c0goo48o4oc.webp?p=eft.webp&s=s3";

export type TarkovFeatureBlock = {
  id: string;
  title: string;
  body: string;
  bullets: string[];
};

export const TARKOV_FEATURES: TarkovFeatureBlock[] = [
  {
    id: "aimbot",
    title: "Aimbot",
    body: "Tracks scavs and PMCs inside a set FOV. Smoothing and bone priority keep movement readable on longer fights — you pick head or thorax, set the circle size, and let the build handle the rest.",
    bullets: [
      "FOV + smooth sliders",
      "Visibility check before lock",
      "Team / scav filters",
    ],
  },
  {
    id: "esp",
    title: "Player ESP",
    body: "See who is holding an angle before you wide-swing a corner. Name, distance, weapon, and health readouts cut down on guesswork in labs, streets, and late-wipe raids.",
    bullets: [
      "Boxes, skeleton, or corner style",
      "Distance cap so the overlay stays clean",
      "Corpse and container tags",
    ],
  },
  {
    id: "loot",
    title: "Loot & raid ESP",
    body: "Filter the raid down to what actually pays — keys, high-tier loot, quest items, and extract routes. Less tabbing through wiki pages mid-raid.",
    bullets: [
      "Item value filters",
      "Quest / key highlights",
      "Extract and boss markers where supported",
    ],
  },
  {
    id: "recoil",
    title: "Recoil & gun handling",
    body: "Full-auto beams and DMR tap chains are easier when recoil helpers are tuned per weapon class. Pair with a sane aimbot FOV so raids do not look robotic on kill cams.",
    bullets: [
      "Per-weapon profiles on supported builds",
      "No-sway options on some tiers",
      "Works alongside ESP, not instead of it",
    ],
  },
  {
    id: "spoofer",
    title: "HWID spoofer & setup",
    body: "A hardware flag on Tarkov survives reinstalls. If you are flagged, run the spoofer path before the next login — the listing should say whether it ships in-bundle or separate.",
    bullets: [
      "Spoofer steps before first launch after ban",
      "Loader access right after checkout",
      "Patch notes when BSG or BE updates land",
    ],
  },
];

export function tarkovFeatureImages(_guide?: Guide): string[] {
  const images = [...TARKOV_SATANO_GAMEPLAY];
  while (images.length < TARKOV_FEATURES.length) {
    images.push(TARKOV_SATANO_GAMEPLAY[images.length % TARKOV_SATANO_GAMEPLAY.length]!);
  }
  return images.slice(0, TARKOV_FEATURES.length);
}

export function tarkovGalleryImages(): string[] {
  return [...TARKOV_SATANO_GAMEPLAY];
}

export const TARKOV_HERO_LEAD =
  "Tarkov cheats with aimbot, player ESP, loot filters and HWID spoofer — updated for current BSG and BattlEye patches. Players run them because gear fear, quest gates, and Labs skill gaps stack fast. Player ESP leads every wipe; loot ESP and soft aimbot follow once the overlay feels natural.";

export type TarkovBlogBlock = {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
  tag?: string;
};

/** Editorial intro — replaces the hero image on the Tarkov article page. */
export const TARKOV_BLOG_INTRO: TarkovBlogBlock[] = [
  {
    id: "why-cheat",
    title: "Why people cheat in Escape from Tarkov",
    body: "Tarkov punishes mistakes harder than almost any live shooter. One bad angle on Streets or Labs can erase a kit you spent the whole evening building. Quest chains gate trader rep, keys, and maps — and the late-wipe meta rewards players who already know every extract and spawn.",
    bullets: [
      "Gear fear and time investment push players toward ESP before aimbot",
      "Quest and loot grinds make loot filters the most searched feature",
      "Labs and Streets skill gaps — seeing fights before you commit matters",
    ],
  },
  {
    id: "recent-update",
    title: "What changed in the latest Tarkov patch",
    tag: "Updated early 2026",
    body: "Battlestate still ships hotfixes on short notice, and BattlEye follows with signature sweeps. After each wipe or minor build, status windows shrink — builds that were fine Tuesday can flag by the weekend. Check the live status note on the product page before every session, not just after a major patch.",
    bullets: [
      "BE updates often land 24–72h after BSG client patches",
      "Wipe weeks spike ban waves — start with ESP-only, not hard lock",
      "HWID flags persist across reinstalls until you run a spoofer pass",
    ],
  },
  {
    id: "most-used",
    title: "Most used cheats in Tarkov right now",
    body: "Buyer traffic on cheat listings clusters the same way every wipe: information first, aim second, recovery tools when needed. Radar-style overlays are less common here than in arena shooters — Tarkov buyers want player tags, loot value filters, and extract markers in one overlay.",
    bullets: [
      "Player ESP — #1 starter feature every wipe",
      "Loot & quest ESP — highest retention after first week",
      "Soft aimbot (small FOV) — added once ESP feels natural",
      "HWID spoofer — only after an existing hardware ban",
    ],
  },
];

export type TarkovCommunityPick = {
  rank: number;
  feature: string;
  share: number;
  note: string;
};

/** What Tarkov buyers rank highest — community / search demand snapshot. */
export const TARKOV_COMMUNITY_PICKS: TarkovCommunityPick[] = [
  {
    rank: 1,
    feature: "Player ESP",
    share: 94,
    note: "Nearly every buyer starts here — boxes, distance, and weapon readouts before any aim assist.",
  },
  {
    rank: 2,
    feature: "Loot & raid ESP",
    share: 81,
    note: "Value filters and quest highlights pay for the sub faster than raw PvP alone.",
  },
  {
    rank: 3,
    feature: "Soft aimbot",
    share: 62,
    note: "Small FOV + smoothing once players trust the overlay — not day-one hard lock.",
  },
  {
    rank: 4,
    feature: "Recoil helpers",
    share: 48,
    note: "Often bundled with aim tiers; DMR and SMG profiles matter more late wipe.",
  },
  {
    rank: 5,
    feature: "HWID spoofer",
    share: 11,
    note: "Niche add-on — only buyers with an existing hardware ban. Most new subs skip this unless they are flagged.",
  },
];

export const TARKOV_COMMUNITY_SUMMARY =
  "Community picks mirror what actually sells: ESP stacks first, aimbot second. Spoofers are a small slice — almost always after a ban, not on a clean PC.";

export type MarketSiteCompare = {
  id: string;
  name: string;
  score: number;
  recommended?: boolean;
};

/** Famous channels buyers compare before Tarkov checkout — Zadeyo leads on clarity + delivery. */
export const TARKOV_MARKET_SITES: MarketSiteCompare[] = [
  { id: "zadeyo", name: "Zadeyo", score: 10, recommended: true },
  { id: "discord", name: "Discord / Telegram sellers", score: 4 },
  { id: "forums", name: "UnknownCheats & forum pastes", score: 2 },
  { id: "ancient", name: "Ancient", score: 5 },
  { id: "covcheg", name: "Covcheg", score: 5 },
  { id: "satano", name: "WH-Satano direct", score: 6 },
];

export type MarketCriteriaRow = {
  label: string;
  values: Record<string, boolean | "partial">;
};

export const TARKOV_MARKET_CRITERIA: MarketCriteriaRow[] = [
  {
    label: "Instant license after payment",
    values: { zadeyo: true, discord: false, forums: false, ancient: true, covcheg: true, satano: true },
  },
  {
    label: "Aimbot + ESP listed before checkout",
    values: { zadeyo: true, discord: "partial", forums: false, ancient: true, covcheg: true, satano: true },
  },
  {
    label: "Tarkov patch status on the product page",
    values: { zadeyo: true, discord: false, forums: false, ancient: "partial", covcheg: "partial", satano: true },
  },
  {
    label: "HWID spoofer path explained",
    values: { zadeyo: true, discord: false, forums: false, ancient: "partial", covcheg: false, satano: "partial" },
  },
  {
    label: "Support ticket / contact (not DM roulette)",
    values: { zadeyo: true, discord: false, forums: false, ancient: "partial", covcheg: "partial", satano: true },
  },
  {
    label: "Full-feature builds listed before checkout",
    values: { zadeyo: true, discord: "partial", forums: false, ancient: false, covcheg: false, satano: true },
  },
  {
    label: "No sketchy crypto-only checkout",
    values: { zadeyo: true, discord: false, forums: true, ancient: true, covcheg: true, satano: true },
  },
  {
    label: "Buyer guide / load steps on-page",
    values: { zadeyo: true, discord: false, forums: false, ancient: false, covcheg: false, satano: "partial" },
  },
];

export const TARKOV_MARKET_CTA = "Ready for instant Tarkov access with every feature listed?";

export const TARKOV_MARKET_SUMMARY =
  "Zadeyo wins on the stuff that matters day-to-day: you see Tarkov features before paying, checkout is instant, and support is not a random Discord tag. Forum pastes and Telegram flippers trade price for risk — missing docs, outdated builds, and zero help when BE updates land.";

export type TarkovFaqItem = {
  id: string;
  question: string;
  answer: string;
  category: "Safety" | "Features" | "Setup" | "Bans" | "Buying";
  popular?: boolean;
};

/** High-intent questions buyers actually search before Tarkov checkout. */
export const TARKOV_FAQ: TarkovFaqItem[] = [
  {
    id: "undetected",
    question: "Are Tarkov cheats undetected in 2026?",
    category: "Safety",
    popular: true,
    answer:
      "Status changes every time Battlestate or BattlEye ships an update — there is no permanent “safe forever” build. Check the live undetected note on the product page before each session. Right after wipes and hotfixes is when ban waves spike hardest.",
  },
  {
    id: "ban-risk",
    question: "Will I get banned using cheats in Escape from Tarkov?",
    category: "Bans",
    popular: true,
    answer:
      "Yes, ban risk is always real — account bans from reports and behavior, hardware bans if BattlEye flags your PC. Soft ESP with sane settings lowers report rates; hard aimbot on a fresh account raises them fast. Play like you still need to hide the overlay.",
  },
  {
    id: "esp-vs-aimbot",
    question: "ESP or aimbot — what should I run first in Tarkov?",
    category: "Features",
    popular: true,
    answer:
      "Player ESP + loot ESP first. Learn spawns, extracts, and overlay layout before you add aimbot with a small FOV and smoothing. Most searches and buyer traffic start with wallhack-style info — aim second, not day one.",
  },
  {
    id: "battleye",
    question: "Can BattlEye detect Tarkov cheats?",
    category: "Safety",
    popular: true,
    answer:
      "BattlEye scans memory, drivers, and known cheat signatures — undetected builds work until BE gets a new signature or heuristic hit. That is why patch windows matter: a build fine on Tuesday can flag after the next BE sweep.",
  },
  {
    id: "loot-esp",
    question: "Is loot ESP worth it for rubles and quest items?",
    category: "Features",
    answer:
      "For most buyers, yes — value filters and quest highlights pay for the sub faster than raw PvP alone. It cuts stash time, key hunting, and wiki tabbing mid-raid. Pair with player ESP so you are not looting while someone holds the angle.",
  },
  {
    id: "wipe-patch",
    question: "What happens to cheats after a Tarkov wipe or patch?",
    category: "Safety",
    answer:
      "Wipes do not reset BattlEye — hardware flags stay. Client patches often break offsets until the cheat dev pushes an update; BE updates can follow 24–72 hours later. Read status notes and avoid loading until the build is marked working.",
  },
  {
    id: "spoofer",
    question: "Do I need an HWID spoofer for Tarkov?",
    category: "Bans",
    answer:
      "Only if you already caught a hardware ban. A new account on the same flagged PC will chain-ban without a spoofer pass first. Clean hardware + new account = spoofer not required for most buyers.",
  },
  {
    id: "install",
    question: "How do I install Tarkov cheats after buying?",
    category: "Setup",
    answer:
      "Checkout → license in your account → download the loader → follow the on-page steps (often: close game, run spoofer if needed, inject, then launch Tarkov). No Discord handoff on proper listings — steps should be written before you pay.",
  },
  {
    id: "loader-speed",
    question: "How fast do I get the loader after payment?",
    category: "Buying",
    answer:
      "Instant once payment clears — license key, loader link, and load steps land in your account. If a seller makes you wait in DMs for a file, that is a red flag compared to Zadeyo-style instant delivery.",
  },
  {
    id: "why-zadeyo",
    question: "Why buy Tarkov cheats through Zadeyo instead of Discord?",
    category: "Buying",
    answer:
      "Features listed before checkout, live patch status, spoofer docs, and a support path that is not a random Telegram tag. Discord flippers often sell outdated builds with zero refund path when BE updates land.",
  },
];

export const TARKOV_FAQ_INTRO =
  "The questions below match what buyers type into Google and Reddit before their first Tarkov sub — undetected status, ban risk, ESP vs aimbot, and post-patch safety.";

export const TARKOV_FAQ_CATEGORIES = [
  "Safety",
  "Features",
  "Bans",
  "Setup",
  "Buying",
] as const;
