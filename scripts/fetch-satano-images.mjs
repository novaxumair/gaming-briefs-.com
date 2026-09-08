import fs from "fs";
import path from "path";

const BASE = "https://wh-satano.ru";
const HTML_FILE =
  "C:/Users/3Tee System/Downloads/gamingworlddaily-main/web/scripts/satano-home.html";
const OUT_DIR = "C:/Users/3Tee System/Downloads/gamingworlddaily-main/web/public/satano";
const MAP_FILE = "C:/Users/3Tee System/Downloads/gamingworlddaily-main/web/scripts/satano-map.json";

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
  "pioneers-of-pagonia": "pioneers-of-pagonia",
  "company-of-heroes-3": "company-of-heroes-3",
  humanitz: "humanitz",
  "russian-fishing-4": "russian-fishing-4",
  "the-seven-deadly-sins-origin": "the-seven-deadly-sins",
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
  "pioneers-of-pagonia": "pioner",
  wunthering: "wuthering-waves",
  "cod-bocw": "cod-cheats",
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
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
}

const html = fs.readFileSync(HTML_FILE, "utf8");
const satanoGames = extractGames(html);
console.log("Satano games parsed:", satanoGames.length);

const catalog = JSON.parse(
  fs.readFileSync(
    "C:/Users/3Tee System/Downloads/gamingworlddaily-main/web/scripts/catalog.json",
    "utf8"
  )
);

fs.mkdirSync(OUT_DIR, { recursive: true });
const mapping = [];
let downloaded = 0;

for (const item of catalog) {
  const hit = findMatch(item.slug, item.title, satanoGames);
  const row = {
    slug: item.slug,
    title: item.title,
    satanoSlug: hit?.slug ?? null,
    satanoAlt: hit?.alt ?? null,
    sourceUrl: hit?.image ?? null,
    previousImage: item.image,
  };

  if (hit?.image) {
    const local = `/satano/${item.slug}.webp`;
    const dest = path.join(
      "C:/Users/3Tee System/Downloads/gamingworlddaily-main/web/public",
      "satano",
      `${item.slug}.webp`
    );
    try {
      await download(hit.image, dest);
      row.local = local;
      downloaded++;
      console.log("OK", item.slug, "->", hit.slug);
    } catch (e) {
      row.error = String(e);
      row.local = item.image;
      console.log("FAIL", item.slug, e.message);
    }
  } else {
    row.local = item.image;
    console.log("MISS", item.slug);
  }

  mapping.push(row);
}

fs.writeFileSync(MAP_FILE, JSON.stringify(mapping, null, 2));
console.log(`Downloaded ${downloaded}/${catalog.length}`);
