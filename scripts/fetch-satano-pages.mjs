import fs from "fs";
import path from "path";

const BASE = "https://wh-satano.ru";
const MAP_FILE = "C:/Users/3Tee System/Downloads/gamingworlddaily-main/web/scripts/satano-map.json";
const OUT_DIR = "C:/Users/3Tee System/Downloads/gamingworlddaily-main/web/public/satano";

const pageSlugs = {
  "pioneers-of-pagonia": "pioner",
  "wunthering": "wuthering-waves",
  "once-human": "once-human",
  "7-days-to-die": "7-days-to-die",
  marathon: "wardogs",
  valorant: "valorant",
  fortnite: "fortnite-cheats",
  minecraft: "minecraft",
  "elden-ring": "elden-ring",
  "halo-infinite": "halo",
  "dead-cells": "dead-cells",
  roblox: "roblox",
  koboom: "koboom",
  "team-fortress-2": "tf2",
  brawlhalla: "brawlhalla",
  hytale: "hytale",
  "company-of-heroes-3": "company-of-heroes-3",
  "russian-fishing-4": "ru-fish",
  "mongil-star-dive": "mongil",
  windrose: "windrose",
  vostok: "vostok",
  "cod-bocw": "cod-cheats",
  "free-fire": "free-fire",
  "point-blank": "point-blank",
  rematch: "rematch",
  "steel-hunters": "steel-hunters",
  "8-ball-pool": "8ball-pool",
  "ea-sports-fc": "ea-fc",
  "honor-of-kings": "honor-of-kings",
  "maplestory-m": "maplestory-m",
  "black-desert-mobile": "black-desert-mobile",
  "diablo-iv": "diablo-4",
  tarisland: "tarisland",
  "level-zero": "level-zero",
  duckside: "duckside",
  "sa-mp": "samp",
  predecessor: "predecessor",
  "l33t-ragemp": "l33t",
  chess: "chess",
};

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

async function pageImage(slug) {
  const url = `${BASE}/en/cheats/${slug}`;
  const res = await fetch(url, { headers });
  if (!res.ok) return null;
  const html = await res.text();
  const og = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (og) return og[1];
  const img = html.match(/<img src="(\/storage\/thumbnails[^"]+\.webp[^"]*)"/);
  if (img) return img[1].startsWith("http") ? img[1] : `${BASE}${img[1]}`;
  return null;
}

async function download(url, dest) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

const mapping = JSON.parse(fs.readFileSync(MAP_FILE, "utf8"));
let added = 0;

for (const row of mapping) {
  if (row.local?.startsWith("/satano/")) continue;
  const satanoSlug = pageSlugs[row.slug];
  if (!satanoSlug) continue;
  const imageUrl = await pageImage(satanoSlug);
  if (!imageUrl) {
    console.log("NO PAGE", row.slug, satanoSlug);
    continue;
  }
  const dest = path.join(OUT_DIR, `${row.slug}.webp`);
  try {
    await download(imageUrl, dest);
    row.local = `/satano/${row.slug}.webp`;
    row.sourceUrl = imageUrl;
    row.satanoSlug = satanoSlug;
    added++;
    console.log("PAGE OK", row.slug);
  } catch (e) {
    console.log("PAGE FAIL", row.slug, e.message);
  }
}

fs.writeFileSync(MAP_FILE, JSON.stringify(mapping, null, 2));
console.log("Added from pages:", added);
