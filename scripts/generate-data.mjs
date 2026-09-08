import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");
const CATALOG_FILE = path.join(ROOT, "scripts/catalog.json");
const EXTRA_FILE = path.join(ROOT, "scripts/zadeyo-extra-catalog.json");
const OUT_FILE = path.join(ROOT, "lib/data.ts");

const catalog = JSON.parse(fs.readFileSync(CATALOG_FILE, "utf8"));
const extra = fs.existsSync(EXTRA_FILE)
  ? JSON.parse(fs.readFileSync(EXTRA_FILE, "utf8"))
  : [];

const merged = [...catalog, ...extra.map(({ zadeyoSlug, ...item }) => item)];

const guides = merged.map((item) => ({
  slug: item.slug,
  gameName: item.gameName,
  title: item.title,
  image: item.image,
  gif: item.gif ?? null,
  section: item.section,
}));

const lines = `export const SITE = {
  name: "Gaming World Daily",
  domain: "https://gamingworlddaily.com",
  domainHost: "gamingworlddaily.com",
  title: "Gaming World Daily | Game Guides, Updates & Cheats",
  mainH1: "Gaming World Daily",
  heroTagline: "Game guides · updates · patches · what players are running",
  heroLead:
    "Get everything about the games you play — guides, patch notes, and cheat comparisons in one place.",
  description:
    "Gaming World Daily is your hub for game guides, updates, patch notes, and cheat feature breakdowns. Compare aimbot, ESP, wallhack, and spoofer options by title.",
  blogsTitle: "Cheat Guides | Gaming World Daily",
  blogsMainH1: "Gaming World Daily",
  blogsHeroTagline: "Cheat guides · feature breakdowns · patch status · player picks",
  blogsHeroLead:
    "Deep-dive guides for every title in the catalog — see what ships, what changed, and what players are using before you buy.",
  blogsDescription:
    "Browse cheat guides by game with aimbot, ESP, wallhack, and spoofer feature lists, patch notes, and buyer FAQs on Gaming World Daily.",
  contactTitle: "Contact | Gaming World Daily Support",
  twitter: "@gamingworlddaily",
  themeColor: "#090819",
  logo: "/images/logo-48.png",
  logoFull: "/images/logo-128.png",
  logoWidth: 40,
  logoHeight: 40,
  gaId: "G-F3G2WXE227",
} as const;

export interface Guide {
  slug: string;
  gameName: string;
  title: string;
  image: string;
  gif?: string | null;
  section: "popular" | "all";
}

export const guides: Guide[] = ${JSON.stringify(guides, null, 2)};

export interface CatalogItem {
  slug: string;
  title: string;
  image: string;
  gif?: string | null;
  section: "popular" | "all";
}

export const catalogItems: CatalogItem[] = guides.map((guide) => ({
  slug: guide.slug,
  title: guide.title,
  image: guide.image,
  gif: guide.gif,
  section: guide.section,
}));

export function getGameUrl(slug: string): string {
  return \`/\${slug}\`;
}

export function getGuideUrl(slug: string): string {
  return \`/\${slug}-cheats\`;
}

export function getCatalogHref(slug: string, mode: "game" | "cheats"): string {
  return mode === "game" ? getGameUrl(slug) : getGuideUrl(slug);
}

export function getGuideParam(slug: string): string {
  return \`\${slug}-cheats\`;
}

export function parseGuideParam(param: string): string | null {
  if (!param.endsWith("-cheats")) return null;
  return param.slice(0, -"-cheats".length);
}

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuideByParam(param: string): Guide | undefined {
  const slug = parseGuideParam(param);
  if (!slug) return undefined;
  return getGuide(slug);
}

export function guideMetaTitle(gameName: string): string {
  return \`\${gameName} Cheats | Aimbot, ESP & Wallhack Guide\`;
}

export function gameMetaTitle(gameName: string): string {
  return \`\${gameName} Guides, Updates & Patches | \${SITE.name}\`;
}

export function guideMetaDescription(gameName: string): string {
  return \`Compare \${gameName} cheats with aimbot, ESP, wallhack and spoofer options. See features, market alternatives, and buyer notes for \${gameName} cheats.\`;
}

export function gameMetaDescription(gameName: string): string {
  return \`\${gameName} guides, patch notes, player picks, and meta updates — plus a full cheat feature breakdown when you need aimbot, ESP, and spoofer details.\`;
}

export function gameKeywords(gameName: string): string {
  return \`\${gameName} guides, \${gameName} updates, \${gameName} patches, \${gameName} meta, \${gameName} cheats, \${gameName} aimbot, \${gameName} ESP\`;
}

export function guideKeywords(gameName: string): string {
  return \`\${gameName} cheats, \${gameName} aimbot, \${gameName} ESP, \${gameName} wallhack, \${gameName} spoofer, buy \${gameName} cheats, undetected \${gameName} cheats\`;
}

export function guideH1(gameName: string): string {
  return \`\${gameName} Cheats — \${SITE.name}\`;
}

export function gameH1(gameName: string): string {
  return \`\${gameName}\`;
}

export function guidePageLead(gameName: string): string {
  return \`\${gameName} cheat guides with aimbot, ESP, and wallhack comparisons — shop at \${SITE.domainHost}.\`;
}

export function gamePageLead(gameName: string): string {
  return \`Your \${gameName} hub — patch notes, player trends, loadout picks, and a full cheat breakdown below when you need it.\`;
}

export function guideLead(gameName: string): string {
  return \`If you run \${gameName}, cheats that show people and loot through walls cut the grind. Below is a straight feature comparison for aimbot, ESP and spoofer builds.\`;
}

export const GUIDE_FEATURES = [
  { name: "Aimbot", text: "Configurable FOV, smooth aim, and bone priority for cleaner fights." },
  { name: "ESP / Wallhack", text: "Player boxes, distance, and health readouts through walls." },
  { name: "Loot / world ESP", text: "Highlight valuable loot and world objects where the build supports it." },
  { name: "No recoil helpers", text: "Weapon control assists on supported titles and configs." },
  { name: "Triggerbot", text: "Fire assistance when crosshair meets a valid target." },
  { name: "HWID Spoofer path", text: "Documented spoofer pairing when hardware bans are a risk." },
  { name: "Stream-proof mode", text: "Hide overlays from capture software on supported builds." },
  { name: "Instant delivery", text: "Loader / license access after payment clears — no DM waiting." },
  { name: "Patch updates", text: "Builds tracked against current game patches with status notes." },
  { name: "24/7 support", text: "Contact path for load help instead of abandoned reseller accounts." },
] as const;

export function guideFaqs(gameName: string) {
  return [
    {
      question: \`Are \${gameName} cheats undetected?\`,
      answer: \`Status changes after every \${gameName} patch. We list the current status on the product and update builds when detection hits. Always read the latest note before you inject or load.\`,
    },
    {
      question: \`What do \${gameName} cheats include?\`,
      answer: \`Most packs combine aimbot, ESP (player and/or loot) and optional extras like no recoil, triggerbot or a HWID spoofer. The comparison table on this page shows what each tier covers.\`,
    },
    {
      question: \`How fast is delivery for \${gameName} cheats?\`,
      answer: "Delivery is instant after payment. You get load instructions and license access without waiting on a ticket queue.",
    },
    {
      question: \`Can I use a spoofer with \${gameName} cheats?\`,
      answer: \`Yes on builds that ship a built-in spoofer or list HWID support. If you already have a hardware ban on \${gameName}, use a spoofer before the first launch.\`,
    },
  ];
}
`;

fs.writeFileSync(OUT_FILE, lines);
console.log(
  "Generated data.ts:",
  catalog.length,
  "base +",
  extra.length,
  "zadeyo =",
  guides.length,
  "guides"
);
