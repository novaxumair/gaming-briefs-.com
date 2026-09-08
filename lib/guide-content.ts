import type { Guide } from "./data";
import { getGameplayImagesForGuide } from "./gameplay-images";

export const COMPARISON_FEATURES = [
  { name: "Aimbot", pro: true, standard: true, espOnly: false },
  { name: "ESP / Wallhack", pro: true, standard: true, espOnly: true },
  { name: "Triggerbot", pro: true, standard: false, espOnly: false },
  { name: "No recoil / weapon helpers", pro: true, standard: true, espOnly: false },
  { name: "HWID Spoofer", pro: true, standard: false, espOnly: false },
  { name: "Stream-proof mode", pro: true, standard: false, espOnly: false },
  { name: "Instant delivery", pro: true, standard: true, espOnly: true },
  { name: "24/7 support", pro: true, standard: true, espOnly: false },
] as const;

export const TOP_RIVALS = [
  { name: "This offer", score: 10, highlight: true },
  { name: "Unnamed private", score: 3 },
  { name: "Ancient", score: 2 },
  { name: "Arcane", score: 2 },
  { name: "Covcheg", score: 2 },
  { name: "Bleak", score: 2 },
  { name: "WH-Satano", score: 2 },
  { name: "Covcheg External", score: 1 },
] as const;

export const ALL_RIVALS = [
  { name: "Ancient", score: 2 },
  { name: "Arcane", score: 2 },
  { name: "Bleak", score: 2 },
  { name: "Covcheg", score: 2 },
  { name: "Covcheg External", score: 1 },
  { name: "Dullwave", score: 0 },
  { name: "Mason Full", score: 0 },
  { name: "Mason Internal", score: 0 },
  { name: "WH-Satano", score: 2 },
  { name: "Softhub", score: 0 },
  { name: "Fecurity", score: 1 },
  { name: "Unnamed private", score: 3 },
] as const;

export function marketFeatures(gameName: string) {
  return [
    {
      label: "Aimbot / ESP listed before checkout",
      offer: true,
      market: "Market mixed · 5/12",
      marketPositive: true,
    },
    {
      label: "Instant delivery after payment",
      offer: true,
      market: "Rare · 4/12",
      marketPositive: false,
    },
    {
      label: "HWID spoofer path documented",
      offer: true,
      market: "Rare · 2/12",
      marketPositive: false,
    },
    {
      label: "On-page support / contact",
      offer: true,
      market: "Rare · 1/12",
      marketPositive: false,
    },
    {
      label: "Patch note tied to current game build",
      offer: true,
      market: "Rare · 3/12",
      marketPositive: false,
    },
    {
      label: "Buyer FAQ / load steps",
      offer: true,
      market: "Usually missing",
      marketPositive: false,
    },
    {
      label: "No mystery Discord-only checkout",
      offer: true,
      market: "Usually missing",
      marketPositive: false,
    },
    {
      label: "Clear risk wording (not fake lifetime UD)",
      offer: true,
      market: "Usually missing",
      marketPositive: false,
    },
    {
      label: `Keyword-clear ${gameName} cheats page`,
      offer: true,
      market: "Usually missing",
      marketPositive: false,
    },
    {
      label: "Stable storefront (not throwaway link)",
      offer: true,
      market: "Usually missing",
      marketPositive: false,
    },
  ];
}

export function quickFacts(gameName: string) {
  return [
    `Primary keyword: ${gameName} cheats`,
    `Secondary: ${gameName} aimbot, ${gameName} ESP, ${gameName} spoofer`,
    "Delivery: instant after payment",
    "Support: contact page for load help",
  ];
}

export function featureSummary(gameName: string) {
  return [
    `Aimbot for ${gameName} with FOV, smooth and bone options on supported builds`,
    `ESP / wallhack for players, bots and key world objects in ${gameName}`,
    `HWID spoofer pairing on select ${gameName} cheats after hardware risk`,
    "Instant delivery — license details after payment clears",
    `Active updates when ${gameName} patches break older cheats`,
  ];
}

export function standOutPoints(gameName: string) {
  return [
    {
      title: `Built around ${gameName}`,
      text: "Focused page, not a random multi-game dump.",
    },
    {
      title: "Beats Discord/Telegram sellers",
      text: "Checkout and support stay on a storefront.",
    },
    {
      title: "Beats cracked / free pastes",
      text: "Features and risk wording shown up front.",
    },
    {
      title: "Instant delivery",
      text: "No waiting for a loader in DMs.",
    },
    {
      title: "Fair caveat",
      text: "DMA dual-PC specialists can still win that niche alone.",
    },
  ];
}

export function summaryPoints(gameName: string) {
  return [
    {
      label: "Product focus",
      text: `${gameName} aimbot, ESP/wallhack, and spoofer options described in plain language.`,
    },
    {
      label: "Delivery",
      text: "License / loader access after payment clears — no wait-for-DM step on the standard path.",
    },
    {
      label: "Support",
      text: "Contact channel for load issues instead of abandoned reseller accounts.",
    },
    {
      label: "Status honesty",
      text: `"Undetected" is never permanent on ${gameName}; status is treated as patch-dependent.`,
    },
    {
      label: "Who should pick this",
      text: `Buyers who want a clear ${gameName} cheat checkout over mystery Discord sellers.`,
    },
  ];
}

export function informativeSections(gameName: string) {
  return [
    {
      title: `${gameName} cheats: what buyers should verify`,
      body: `Before you buy ${gameName} cheats, confirm four facts on the product page: current status after the latest ${gameName} patch, whether aimbot/ESP are included, whether a HWID spoofer is built-in or separate, and how delivery works after payment. This guide keeps those points in one place so you are not guessing from Discord screenshots. Also check refund policy, loader compatibility (Windows version), and whether the build supports your game mode (PvP, PvE, or ranked).`,
    },
    {
      title: `Aimbot for ${gameName}`,
      body: `An aimbot for ${gameName} assists target acquisition inside a set FOV. Safer configs use smoothing and limited FOV so movement looks human. Hard lock and silent-aim options raise report risk on visible play. Compare bone priority (head vs chest), visibility checks, and team-ignore settings before you buy. Good listings document which aim modes ship on the active build instead of vague "full rage" labels.`,
    },
    {
      title: `ESP / wallhack for ${gameName}`,
      body: `ESP overlays players, bots, or loot through walls. For ${gameName}, the useful default is distance-limited player ESP first; loot filters matter when the economy is the win condition. Stream-proof overlays matter if you capture gameplay. Look for health bars, weapon readouts, skeleton ESP, and corpse/vehicle filters when comparing tiers.`,
    },
    {
      title: "HWID spoofer notes",
      body: `A hardware ban on ${gameName} is not fixed by reinstalling the game. You need a spoofer path before the next launch. Good listings state when a spoofer is included versus sold separately — that is a common point of confusion on third-party ${gameName} cheat listings. After a ban, also avoid reusing the same payment email or account chain tied to the flagged session.`,
    },
  ];
}

export function cheatVersions(guide: Guide, _related: Guide[]) {
  const shots = getGameplayImagesForGuide(guide);
  const titles = ["Ancient", "Arcane", "Bleak", "Covcheg"] as const;

  if (shots.length > 0) {
    return shots.map((image, index) => ({
      title: `${titles[index % titles.length]} build for ${guide.gameName}`,
      image,
    }));
  }

  return [
    {
      title: `${titles[0]} build for ${guide.gameName}`,
      image: guide.image,
    },
  ];
}

export function buySteps(gameName: string): readonly string[] {
  return [
    "Choose the tier you need — aimbot, ESP, or the full bundle.",
    "Complete checkout and receive your license plus load steps instantly.",
    `If you have an HWID ban, run the spoofer before launching ${gameName}.`,
  ] as const;
}

export function extendedFaqs(gameName: string) {
  return [
    {
      question: `Is this offer good for ${gameName} cheats?`,
      answer: `Yes if you want clear ${gameName} aimbot/ESP docs, instant delivery, and support on-page. Specialty DMA-only shops can still be better for dual-PC buyers who need external-only setups.`,
    },
    {
      question: `Why does this offer win this ${gameName} comparison?`,
      answer: `On this page's criteria — feature clarity, delivery, spoofer path, and support documentation — this offer leads. Alternatives may win on community name recognition or DMA focus, but rarely beat a complete buyer guide plus storefront checkout.`,
    },
  ];
}
