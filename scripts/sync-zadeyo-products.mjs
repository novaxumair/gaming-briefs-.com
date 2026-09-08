import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");
const CATALOG_FILE = path.join(ROOT, "scripts/catalog.json");
const EXTRA_CATALOG_FILE = path.join(ROOT, "scripts/zadeyo-extra-catalog.json");
const OUT_JSON = path.join(ROOT, "scripts/zadeyo-products.json");
const OUT_TS = path.join(ROOT, "lib/zadeyo-catalog.ts");

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
};

/** Catalog slug -> exact Zadeyo /products slug (from sitemap). */
const MANUAL_MAP = {
  pubg: "pubg-cheats",
  "escape-from-tarkov": "escape-from-tarkov-cheats",
  "battlefield-6": "BF6-cheats",
  "call-of-duty-black-ops-7": "warzone-cheats",
  "team-fortress-2": "team-fortress-2-cheats",
  "the-division-2": "the-division-2-cheats",
  "ark-survival-ascended": "ark-ascended-cheats",
  "diablo-iv": "diablo-4-cheats",
  "marvel-rivals": "marvel-rivals-cheats",
  "left-4-dead-2": "left-4-dead-2-cheats",
  "cs-1-6": "cs16-cheats",
  "last-epoch": "last-epoch-cheats",
  "8-ball-pool": "8ball-pool-cheats",
  "mecha-break": "mecha-break-cheats",
  "gray-zone-warfare": "gray-zone-warfare-cheats",
  "gray-zone": "gray-zone-warfare-cheats",
  "the-first-descendant": "the-first-descendant-cheats",
  "the-seven-deadly-sins": "the-seven-deadly-sins-cheats",
  "off-the-grid": "off-the-grid-cheats",
  "snowbreak-containment-zone": "snowbreak-containment-zone-cheats",
  insurge: "insurgency-sandstorm-cheats",
  conan: "conan-exiles-cheats",
  isle: "the-isle-novaxware-cheats",
  sand: "sand-raiders-of-sophie-cheats",
  "russian-fishing-4": "ru-fish-cheats",
  "mongil-star-dive": "mongil-cheats",
  "pioneers-of-pagonia": "pioner-cheats",
  wunthering: "wuthering-waves-cheats",
  "cod-bocw": "warzone-cheats",
  "ea-sports-fc": "ea-sports-fc-2026-cheats",
  "black-desert-mobile": "black-desert-online-cheats",
  "maplestory-m": "maplestory-m-cheats",
  "honor-of-kings": "honor-of-kings-cheats",
  "path-of-exile-2": "path-of-exile-cheats",
  "point-blank": "point-blank-cheats",
  "free-fire": "free-fire-cheats",
  "steel-hunters": "steel-hunters-cheats",
  rematch: "rematch-cheats",
  "sa-mp": "gta5-cheats",
  "l33t-ragemp": "fivem-cheats",
  predecessor: "predecessor-cheats",
  "once-human": "once-human-cheats",
  "7-days-to-die": "7-days-to-die-cheats",
  "company-of-heroes-3": "company-of-heroes-3-cheats",
  duckside: "duckside-cheats",
  "level-zero": "level-zero-cheats",
  tarisland: "tarisland-cheats",
  fragpunk: "fragpunk-novaxware-cheats",
  foxhole: "foxhole-novaxware-cheats",
  "etheria-restart": "etheria-restart-novaxware-cheats",
  "arc-raiders": "arc-raiders-cheats",
  koboom: "koboom-cheats",
  brawlhalla: "brawlhalla-cheats",
  hytale: "hytale-cheats",
  roblox: "roblox-cheats",
  halo: "halo-infinite-cheats",
  swbf: "star-wars-battlefront-2-cheats",
  moe: "myth-of-empires-cheats",
  hd2: "helldivers-2-cheats",
  wows: "war-thunder-cheats",
  deadlock: "deadlock-cheats",
  titanfall2: "titanfall-2-cheats",
};

function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Strip Zadeyo suffixes for fuzzy matching. */
function zadeyoBaseSlug(slug) {
  return normalize(
    slug
      .replace(/-novaxware-cheats$/i, "")
      .replace(/-cheats$/i, "")
  );
}

async function fetchProductSlugs() {
  const res = await fetch("https://zadeyo.com/sitemap.xml", { headers });
  const xml = await res.text();
  const slugs = new Set();
  for (const m of xml.matchAll(/<loc>https:\/\/zadeyo\.com\/products\/([^<]+)<\/loc>/g)) {
    slugs.add(m[1].trim());
  }
  return [...slugs].sort();
}

function buildIndexes(zadeyoSlugs) {
  const byBase = new Map();
  const byExact = new Set(zadeyoSlugs);

  for (const slug of zadeyoSlugs) {
    const base = zadeyoBaseSlug(slug);
    if (!byBase.has(base)) byBase.set(base, []);
    byBase.get(base).push(slug);
  }

  return { byBase, byExact };
}

function pickBestSlug(candidates, catalogSlug, catalogTitle) {
  if (candidates.length === 1) return candidates[0];

  const nSlug = normalize(catalogSlug);
  const exact = candidates.find((z) => zadeyoBaseSlug(z) === nSlug);
  if (exact) return exact;

  const withCheats = candidates.find((z) => z.endsWith("-cheats") && !z.includes("-novaxware-"));
  if (withCheats) return withCheats;

  return candidates.sort((a, b) => a.length - b.length)[0];
}

function matchCatalogSlug(catalogSlug, catalogTitle, indexes, explicitZadeyoSlug) {
  const { byBase, byExact } = indexes;

  if (explicitZadeyoSlug && byExact.has(explicitZadeyoSlug)) {
    return { catalogSlug, zadeyoSlug: explicitZadeyoSlug, match: "extra-catalog" };
  }

  const manual = MANUAL_MAP[catalogSlug];
  if (manual && byExact.has(manual)) {
    return { catalogSlug, zadeyoSlug: manual, match: "manual" };
  }

  const direct = `${catalogSlug}-cheats`;
  if (byExact.has(direct)) {
    return { catalogSlug, zadeyoSlug: direct, match: "exact-cheats" };
  }

  if (byExact.has(catalogSlug)) {
    return { catalogSlug, zadeyoSlug: catalogSlug, match: "exact" };
  }

  const nSlug = normalize(catalogSlug);
  const baseHits = byBase.get(nSlug);
  if (baseHits?.length) {
    return {
      catalogSlug,
      zadeyoSlug: pickBestSlug(baseHits, catalogSlug, catalogTitle),
      match: "base-slug",
    };
  }

  const nTitle = normalize(catalogTitle);
  if (byBase.has(nTitle)) {
    return {
      catalogSlug,
      zadeyoSlug: pickBestSlug(byBase.get(nTitle), catalogSlug, catalogTitle),
      match: "title-base",
    };
  }

  const tokens = nTitle.split("-").filter((t) => t.length > 2);
  let best = null;
  let bestScore = 0;

  for (const [base, slugs] of byBase) {
    const score = tokens.reduce((acc, t) => acc + (base.includes(t) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = pickBestSlug(slugs, catalogSlug, catalogTitle);
    }
  }

  if (best && bestScore >= Math.min(2, tokens.length)) {
    return { catalogSlug, zadeyoSlug: best, match: "token-fuzzy" };
  }

  return null;
}

const zadeyoSlugs = await fetchProductSlugs();
const indexes = buildIndexes(zadeyoSlugs);
console.log("Zadeyo products in sitemap:", zadeyoSlugs.length);

const catalog = JSON.parse(fs.readFileSync(CATALOG_FILE, "utf8"));
const extraCatalog = fs.existsSync(EXTRA_CATALOG_FILE)
  ? JSON.parse(fs.readFileSync(EXTRA_CATALOG_FILE, "utf8"))
  : [];
const fullCatalog = [
  ...catalog,
  ...extraCatalog.map(({ zadeyoSlug, ...item }) => ({ ...item, zadeyoSlug })),
];
const mappings = [];
const overrides = {};
const available = [];
const unmatchedCatalog = [];
const unmatchedZadeyo = new Set(zadeyoSlugs);

for (const item of fullCatalog) {
  const hit = matchCatalogSlug(item.slug, item.title, indexes, item.zadeyoSlug);
  if (hit) {
    mappings.push({
      catalogSlug: hit.catalogSlug,
      title: item.title,
      zadeyoSlug: hit.zadeyoSlug,
      match: hit.match,
    });
    available.push(hit.catalogSlug);
    if (hit.zadeyoSlug !== hit.catalogSlug) {
      overrides[hit.catalogSlug] = hit.zadeyoSlug;
    }
    unmatchedZadeyo.delete(hit.zadeyoSlug);
  } else {
    unmatchedCatalog.push(item.slug);
  }
}

const payload = {
  fetchedAt: new Date().toISOString(),
  zadeyoProductCount: zadeyoSlugs.length,
  mappedCount: mappings.length,
  availableSlugs: available.sort(),
  overrides,
  mappings,
  unmatchedCatalog,
  zadeyoOnlySlugs: [...unmatchedZadeyo].sort(),
};

fs.writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2));

const overrideEntries = Object.entries(overrides)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([k, v]) => `  "${k}": "${v}",`)
  .join("\n");

const availableEntries = available
  .sort()
  .map((s) => `  "${s}",`)
  .join("\n");

const ts = `/** Auto-generated by scripts/sync-zadeyo-products.mjs — do not edit by hand. */
/** Re-run: npm run sync:zadeyo */
export const ZADEYO_PRODUCT_COUNT = ${zadeyoSlugs.length};
export const ZADEYO_MAPPED_COUNT = ${mappings.length};

export const ZADEYO_PRODUCT_OVERRIDES: Record<string, string> = {
${overrideEntries}
};

export const ZADEYO_AVAILABLE_SLUGS = new Set<string>([
${availableEntries}
]);

export type ZadeyoMapping = {
  catalogSlug: string;
  title: string;
  zadeyoSlug: string;
  match: string;
};

export const ZADEYO_MAPPINGS: ZadeyoMapping[] = ${JSON.stringify(mappings, null, 2)} as ZadeyoMapping[];

/** Zadeyo products not yet in our catalog (${unmatchedZadeyo.size} items). */
export const ZADEYO_UNMAPPED_PRODUCTS: string[] = ${JSON.stringify([...unmatchedZadeyo].sort(), null, 2)};
`;

fs.writeFileSync(OUT_TS, ts);

console.log("\nMapped to catalog:", mappings.length, "/", fullCatalog.length);
console.log("Overrides:", Object.keys(overrides).length);
console.log("Unmatched catalog:", unmatchedCatalog.length, unmatchedCatalog.join(", "));
console.log("Zadeyo-only products:", unmatchedZadeyo.size);
console.log("Wrote", OUT_JSON, "and", OUT_TS);
