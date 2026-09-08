import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");
const ZADEYO_JSON = path.join(ROOT, "scripts/zadeyo-products.json");
const CATALOG_FILE = path.join(ROOT, "scripts/catalog.json");
const OUT_FILE = path.join(ROOT, "scripts/zadeyo-extra-catalog.json");

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
};

const PLACEHOLDER_IMAGE = "/logo.svg";

/** Skip — already in main catalog or duplicate product. */
const SKIP_ZADEYO = new Set([
  "meccha-chameleon-cheats",
]);

/** Zadeyo slug -> our catalog slug (null = skip). */
const SLUG_FROM_ZADEYO = {
  "BF6-cheats": null,
  "dbd-cheats": "dead-by-daylight",
  "gta5-cheats": "gta-5",
  "thefinals-cheats": "the-finals",
  "redm-rp-cheats": "redm",
  "fivem-cheats": null,
  "abi-cheats": "arena-breakout-infinite",
};

const POPULAR_SLUGS = new Set([
  "fortnite",
  "valorant",
  "league-of-legends",
  "overwatch-2",
  "rainbow-six-siege",
  "destiny-2",
  "dota-2",
  "minecraft",
  "gta-5",
  "world-of-warcraft",
  "hunt-showdown",
  "sea-of-thieves",
  "palworld",
  "new-world",
  "lost-ark",
  "warframe",
  "counter-strike-2",
]);

const TITLE_OVERRIDES = {
  abi: "Arena Breakout Infinite",
  "arena-breakout-infinite": "Arena Breakout Infinite",
  bf6: "Battlefield 6",
  dbd: "Dead by Daylight",
  "dead-by-daylight": "Dead by Daylight",
  "gta-5": "GTA 5",
  gta5: "GTA 5",
  "dota-2": "Dota 2",
  "cs-2": "Counter-Strike 2",
  "counter-strike-2": "Counter-Strike 2",
  "league-of-legends": "League of Legends",
  "overwatch-2": "Overwatch 2",
  "rainbow-six-siege": "Rainbow Six Siege",
  "destiny-2": "Destiny 2",
  "world-of-warcraft": "World of Warcraft",
  "hunt-showdown": "Hunt: Showdown",
  "sea-of-thieves": "Sea of Thieves",
  "new-world": "New World",
  "lost-ark": "Lost Ark",
  "final-fantasy-xiv": "Final Fantasy XIV",
  "elder-scrolls-online": "Elder Scrolls Online",
  "honkai-star-rail": "Honkai: Star Rail",
  "genshin-impact": "Genshin Impact",
  "naraka-bladepoint": "Naraka: Bladepoint",
  "payday-3": "PAYDAY 3",
  "monster-hunter-world": "Monster Hunter World",
  "monster-hunter-wilds": "Monster Hunter Wilds",
  "monster-hunter-rise": "Monster Hunter Rise",
  "red-dead-redemption": "Red Dead Redemption",
  "ready-or-not": "Ready or Not",
  "the-finals": "THE FINALS",
  "the-outlast-trials": "The Outlast Trials",
  "hell-let-loose": "Hell Let Loose",
  "project-zomboid": "Project Zomboid",
  "sons-of-the-forest": "Sons of the Forest",
  "dark-and-darker": "Dark and Darker",
  "dune-awakening": "Dune: Awakening",
  "throne-and-liberty": "Throne and Liberty",
  "v-rising": "V Rising",
  "no-more-room-in-hell-2": "No More Room in Hell 2",
  "escape-from-tarkov-arena": "Escape from Tarkov Arena",
  "cloud-dma": "Cloud DMA",
  "hwid-spoofer": "HWID Spoofer",
  "skin-changer": "Skin Changer",
  redm: "RedM",
  ugc: "UGC",
  "nba-2k26": "NBA 2K26",
  "nhl-26": "NHL 26",
  "street-fighter-6": "Street Fighter 6",
  "mortal-kombat-1": "Mortal Kombat 1",
  "tekken-8": "Tekken 8",
  "star-wars-zero-company": "Star Wars Zero Company",
  "warzone": "Call of Duty: Warzone",
};

function decodeHtml(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function zadeyoBaseSlug(zadeyoSlug) {
  return zadeyoSlug
    .replace(/-novaxware-cheats$/i, "")
    .replace(/-cheats$/i, "")
    .toLowerCase();
}

function catalogSlugFromZadeyo(zadeyoSlug) {
  if (SLUG_FROM_ZADEYO[zadeyoSlug] === null) return null;
  if (SLUG_FROM_ZADEYO[zadeyoSlug]) return SLUG_FROM_ZADEYO[zadeyoSlug];
  return zadeyoBaseSlug(zadeyoSlug);
}

function slugToTitle(slug) {
  if (TITLE_OVERRIDES[slug]) return TITLE_OVERRIDES[slug];
  const acronyms = new Set(["hwid", "ugc", "dma", "rp", "mmo", "nba", "nhl", "xiv"]);
  return slug
    .split("-")
    .map((word) => {
      if (/^\d+$/.test(word)) return word;
      if (acronyms.has(word)) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function titleFromZadeyoPage(html, fallbackSlug) {
  const ogTitle = html.match(/property="og:title"\s+content="([^"]+)"/i);
  if (ogTitle) {
    const raw = decodeHtml(ogTitle[1]);
    const cleaned = raw
      .replace(/^ZADEYO\s*\/\s*/i, "")
      .replace(/\s*Cheat.*$/i, "")
      .replace(/\s*\|\s*Zadeyo.*$/i, "")
      .trim();
    if (cleaned.length > 1) return cleaned;
  }
  return slugToTitle(fallbackSlug);
}

async function fetchProductMeta(zadeyoSlug) {
  const url = `https://zadeyo.com/products/${zadeyoSlug}`;
  try {
    const res = await fetch(url, { headers, redirect: "follow" });
    if (!res.ok) return { image: PLACEHOLDER_IMAGE, title: null };
    const html = await res.text();
    const og = html.match(/property="og:image"\s+content="([^"]+)"/i);
    const title = titleFromZadeyoPage(html, catalogSlugFromZadeyo(zadeyoSlug) ?? zadeyoBaseSlug(zadeyoSlug));
    return {
      image: og?.[1] ?? PLACEHOLDER_IMAGE,
      title,
    };
  } catch {
    return { image: PLACEHOLDER_IMAGE, title: null };
  }
}

async function mapPool(items, fn, concurrency = 8) {
  const results = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);
    process.stdout.write(`\rFetched ${Math.min(i + concurrency, items.length)}/${items.length}...`);
  }
  process.stdout.write("\n");
  return results;
}

if (!fs.existsSync(ZADEYO_JSON)) {
  console.error("Run npm run sync:zadeyo first.");
  process.exit(1);
}

const payload = JSON.parse(fs.readFileSync(ZADEYO_JSON, "utf8"));
const existingCatalog = JSON.parse(fs.readFileSync(CATALOG_FILE, "utf8"));
const existingSlugs = new Set(existingCatalog.map((item) => item.slug));

const zadeyoOnly = payload.zadeyoOnlySlugs.filter((s) => !SKIP_ZADEYO.has(s));
const toAdd = [];

for (const zadeyoSlug of zadeyoOnly) {
  const catalogSlug = catalogSlugFromZadeyo(zadeyoSlug);
  if (!catalogSlug || existingSlugs.has(catalogSlug)) continue;
  if (toAdd.some((e) => e.slug === catalogSlug)) continue;
  toAdd.push({ zadeyoSlug, slug: catalogSlug });
}

console.log("Zadeyo-only products to add:", toAdd.length);

const metas = await mapPool(toAdd, async ({ zadeyoSlug, slug }) => {
  const meta = await fetchProductMeta(zadeyoSlug);
  return { zadeyoSlug, slug, ...meta };
});

const entries = metas.map(({ zadeyoSlug, slug, image, title }) => {
  const gameName = title ?? slugToTitle(slug);
  return {
    href: `/${slug}-cheats`,
    slug,
    image,
    gif: null,
    title: gameName,
    gameName,
    section: POPULAR_SLUGS.has(slug) ? "popular" : "all",
    zadeyoSlug,
  };
});

entries.sort((a, b) => a.title.localeCompare(b.title));

fs.writeFileSync(OUT_FILE, JSON.stringify(entries, null, 2));
console.log("Wrote", OUT_FILE, "with", entries.length, "entries");
