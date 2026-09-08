import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");
const BASE = "https://wh-satano.ru";
const CATALOG_FILE = path.join(ROOT, "scripts/catalog.json");
const MAP_FILE = path.join(ROOT, "scripts/satano-map.json");
const HOME_FILE = path.join(ROOT, "scripts/satano-home.html");
const OUT_DIR = path.join(ROOT, "public/satano");
const GAMEPLAY_DIR = path.join(OUT_DIR, "gameplay");
const GALLERY_FILE = path.join(ROOT, "lib/gameplay-gallery.json");
const GAMEPLAY_TS = path.join(ROOT, "lib/gameplay-images.ts");

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

const manualMap = {
  "escape-from-tarkov": "escape_from_tarkov",
  pubg: "pybg",
  "call-of-duty-black-ops-7": "cod-black-ops-7",
  "team-fortress-2": "tf2",
  "7-days-to-die": "7-days-to-die",
  "the-division-2": "the-division-2",
  "ark-survival-ascended": "ark-ascended",
  "duet-night-abyss": "duet-night-abyss",
  "pioneers-of-pagonia": "pioner",
  "company-of-heroes-3": "company-of-heroes-3",
  humanitz: "humanitz",
  "russian-fishing-4": "ru-fish",
  "the-seven-deadly-sins": "the-seven-deadly-sins",
  "neverness-to-everness": "neverness-to-everness",
  "mongil-star-dive": "mongil",
  windrose: "windrose",
  vostok: "vostok",
  "mecha-break": "meccha-chameleon",
  sand: "sand-raiders",
  "gray-zone-warfare": "gray-zone-warfare",
  "once-human": "once-human",
  "the-first-descendant": "the-first-descendant",
  "zenless-zone-zero": "zenless-zone-zero",
  deadlock: "deadlock",
  "sa-mp": "samp",
  duckside: "duckside",
  "snowbreak-containment-zone": "snowbreak",
  "level-zero": "level-zero",
  "off-the-grid": "off-the-grid",
  "black-desert-mobile": "black-desert-mobile",
  "diablo-iv": "diablo-4",
  tarisland: "tarisland",
  "ea-sports-fc": "ea-fc",
  "honor-of-kings": "honor-of-kings",
  "maplestory-m": "maplestory-m",
  "marvel-rivals": "marvel",
  "left-4-dead-2": "left-4-dead-2",
  "arma-reforger": "arma-reforger",
  "cs-1-6": "cs16",
  fragpunk: "fragpunk",
  "point-blank": "point-blank",
  "path-of-exile-2": "path-of-exile-2",
  "last-epoch": "lastepoch",
  "8-ball-pool": "8ball-pool",
  "free-fire": "free-fire",
  "arc-raiders": "arc-raiders",
  "etheria-restart": "etheria-restart",
  foxhole: "foxhole",
  "steel-hunters": "steel-hunters",
  rematch: "rematch",
  koboom: "koboom",
  brawlhalla: "brawlhalla",
  hytale: "hytale",
  megabonk: "megabonk",
  marathon: "wardogs",
  roblox: "roblox",
  "battlefield-6": "battlefield-6",
  predecessor: "predecessor",
  "l33t-ragemp": "l33t",
  chess: "chess",
  "cod-bocw": "cod-cheats",
  wunthering: "wuthering-waves",
  bodycam: "bodycam",
  insurge: "insurge",
  isle: "isle",
  conan: "conan",
  "gray-zone": "gray-zone",
  titanfall2: "titanfall-2",
  halo: "halo",
  hd2: "helldivers-2",
  starship: "starship-troopers",
  moe: "moe",
  "six-day-ful": "six-days-in-fallujah",
  tptr: "tptr",
  atlas: "atlas",
  "wot-blitz": "wot-blitz",
  rocket: "rocket-league",
  realm: "realm-royale",
  swbf: "star-wars-battlefront",
  wows: "world-of-warships",
};

function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function extractGames(html) {
  const games = [];
  const blockRegex =
    /<a href="https:\/\/wh-satano\.ru\/en\/cheats\/([^"]+)"[^>]*>[\s\S]*?<img src="([^"]+)" alt="([^"]*)"[^>]*>[\s\S]*?<span>([^<]*)<\/span>/g;
  let m;
  while ((m = blockRegex.exec(html)) !== null) {
    games.push({
      slug: m[1],
      image: m[2].startsWith("http") ? m[2] : `${BASE}${m[2]}`,
      alt: m[3].replace(/&#039;/g, "'").trim(),
      label: m[4].trim(),
    });
  }
  return games;
}

function findMatch(catalogSlug, catalogTitle, satanoGames) {
  const manual = manualMap[catalogSlug];
  if (manual) {
    const hit = satanoGames.find((g) => g.slug === manual);
    if (hit) return hit;
  }

  const nTitle = normalize(catalogTitle);
  const nSlug = normalize(catalogSlug);

  for (const g of satanoGames) {
    const gSlug = normalize(g.slug);
    const gAlt = normalize(g.alt);
    const gLabel = normalize(g.label);
    if (gSlug === nSlug || gSlug.includes(nSlug) || nSlug.includes(gSlug)) return g;
    if (gAlt.includes(nSlug) || nSlug.includes(gAlt)) return g;
    if (gLabel && (gLabel === nSlug || gAlt.includes(nTitle) || nTitle.includes(gAlt))) return g;
  }

  const tokens = nTitle.split("-").filter((t) => t.length > 2);
  let best = null;
  let bestScore = 0;
  for (const g of satanoGames) {
    const hay = `${normalize(g.alt)} ${normalize(g.slug)} ${normalize(g.label)}`;
    const score = tokens.reduce((acc, t) => acc + (hay.includes(t) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = g;
    }
  }
  return bestScore >= 2 ? best : null;
}

async function download(url, dest) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

async function pageImages(satanoSlug) {
  const url = `${BASE}/en/cheats/${satanoSlug}`;
  const res = await fetch(url, { headers });
  if (!res.ok) return { primary: null, extras: [] };
  const html = await res.text();
  const found = new Set();

  const og = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (og) found.add(og[1]);

  for (const m of html.matchAll(/(\/storage\/[^"'\\s>]+\.(?:webp|jpg|jpeg|png|gif))/gi)) {
    if (m[1].includes("/thumbnails/")) continue;
    found.add(`${BASE}${m[1]}`);
  }

  const all = [...found];
  return {
    primary: all[0] ?? null,
    extras: all.slice(1),
  };
}

async function resolveSatanoSlug(catalogSlug, catalogTitle, satanoGames) {
  const manual = manualMap[catalogSlug];
  if (manual) {
    const res = await fetch(`${BASE}/en/cheats/${manual}`, { headers, method: "HEAD" });
    if (res.ok) return manual;
  }
  const hit = findMatch(catalogSlug, catalogTitle, satanoGames);
  if (hit) return hit.slug;
  if (manual) return manual;
  return null;
}

console.log("Fetching Satano homepage...");
const homeRes = await fetch(`${BASE}/en`, { headers });
const homeHtml = await homeRes.text();
fs.writeFileSync(HOME_FILE, homeHtml);
const satanoGames = extractGames(homeHtml);
console.log("Satano games on home:", satanoGames.length);

const catalog = JSON.parse(fs.readFileSync(CATALOG_FILE, "utf8"));
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(GAMEPLAY_DIR, { recursive: true });

const mapping = [];
const gallery = {};
let primaryCount = 0;
let galleryCount = 0;

for (const item of catalog) {
  const row = {
    slug: item.slug,
    title: item.title,
    satanoSlug: null,
    satanoAlt: null,
    sourceUrl: null,
    previousImage: item.image,
    local: null,
  };

  const satanoSlug = await resolveSatanoSlug(item.slug, item.title, satanoGames);
  if (!satanoSlug) {
    console.log("MISS", item.slug);
    mapping.push(row);
    continue;
  }

  const hit = satanoGames.find((g) => g.slug === satanoSlug);
  const { primary, extras } = await pageImages(satanoSlug);
  const imageUrl = primary ?? hit?.image ?? null;

  row.satanoSlug = satanoSlug;
  row.satanoAlt = hit?.alt ?? null;
  row.sourceUrl = imageUrl;

  if (imageUrl) {
    const dest = path.join(OUT_DIR, `${item.slug}.webp`);
    try {
      await download(imageUrl, dest);
      row.local = `/satano/${item.slug}.webp`;
      primaryCount++;
      console.log("PRIMARY OK", item.slug, "->", satanoSlug);
    } catch (e) {
      console.log("PRIMARY FAIL", item.slug, e.message);
    }
  }

  const localExtras = [];
  let index = 2;
  for (const url of extras.slice(0, 4)) {
    const ext = path.extname(url.split("?")[0]) || ".webp";
    const file = `${item.slug}-${index}${ext}`;
    const dest = path.join(GAMEPLAY_DIR, file);
    try {
      await download(url, dest);
      localExtras.push(`/satano/gameplay/${file}`);
      index++;
    } catch {
      /* skip failed extras */
    }
  }
  if (localExtras.length) {
    gallery[item.slug] = localExtras;
    galleryCount++;
  }

  mapping.push(row);
  await new Promise((r) => setTimeout(r, 120));
}

fs.writeFileSync(MAP_FILE, JSON.stringify(mapping, null, 2));
fs.writeFileSync(GALLERY_FILE, JSON.stringify(gallery, null, 2));

const entries = mapping
  .filter((row) => row.local?.startsWith("/satano/"))
  .map((row) => `  "${row.slug}": "${row.local}",`)
  .sort()
  .join("\n");

const ts = `import type { Guide } from "@/lib/data";
import gameplayGallery from "./gameplay-gallery.json";

/** Satano gameplay previews — blog/guide inner sections only. Never used for catalog covers. */
const GAMEPLAY_IMAGES: Record<string, string> = {
${entries}
};

export function getGameplayImage(slug: string, fallback?: string | null): string | null {
  return GAMEPLAY_IMAGES[slug] ?? fallback ?? null;
}

export function getGameplayImagesForGuide(guide: Guide): string[] {
  const images: string[] = [];
  const gallery = gameplayGallery as Record<string, string[]>;

  if (guide.gif) images.push(guide.gif);

  const satano = getGameplayImage(guide.slug);
  if (satano && !images.includes(satano)) images.push(satano);

  for (const src of gallery[guide.slug] ?? []) {
    if (!images.includes(src)) images.push(src);
  }

  return images.slice(0, 4);
}
`;

fs.writeFileSync(GAMEPLAY_TS, ts);

console.log(`\nDone: ${primaryCount}/${catalog.length} primary Satano images`);
console.log(`Gallery entries: ${galleryCount}`);
console.log(`Missing: ${mapping.filter((r) => !r.local).map((r) => r.slug).join(", ") || "none"}`);
