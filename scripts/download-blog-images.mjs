import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images", "blog");

/** First working URL wins — landscape promo / Steam headers. */
const SOURCES = {
  valorant: [
    "https://assets-prd.ignimgs.com/2021/12/21/valorant-1640045685890.jpg",
  ],
  warzone: [
    "https://assets1.ignimgs.com/2020/03/09/call-of-duty-warzone---button-01-1583782814571.jpg",
  ],
  "rainbow-six-siege": [
    "https://assets-prd.ignimgs.com/2025/06/30/siegex-1751319986948.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/359550/header.jpg",
  ],
  "destiny-2": [
    "https://assets-prd.ignimgs.com/2025/03/12/destiny2heresy-1741800139522.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/1085660/header.jpg",
  ],
  "sea-of-thieves": [
    "https://assets-prd.ignimgs.com/2026/06/09/sot-customthieves-1781027869323.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/header.jpg",
  ],
  fortnite: [
    "https://assets-prd.ignimgs.com/2025/04/02/nintendoswitch2-fortnite-keyart-square-1743635675429.jpg?width=1600&crop=16%3A10%2Csmart&format=jpg&auto=webp&quality=85",
    "https://assets-prd.ignimgs.com/2025/04/02/nintendoswitch2-fortnite-keyart-square-1743635675429.jpg",
  ],
  tarkov: [
    "https://cdn.cloudflare.steamstatic.com/steam/apps/3932890/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/834910/header.jpg",
  ],
  pubg: [
    "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg",
  ],
  "league-of-legends": [
    "https://assets-prd.ignimgs.com/2021/12/14/leagueoflegends-1639513774570.jpg",
  ],
  "overwatch-2": [
    "https://cdn.cloudflare.steamstatic.com/steam/apps/2357570/header.jpg",
  ],
  rust: [
    "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/header.jpg",
  ],
  dayz: [
    "https://cdn.cloudflare.steamstatic.com/steam/apps/221100/header.jpg",
  ],
};

async function downloadOne(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; CheatsIntel/1.0)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 3000) throw new Error(`too small (${buf.length} bytes)`);
  return buf;
}

fs.mkdirSync(outDir, { recursive: true });

let ok = 0;
let fail = 0;

for (const [key, urls] of Object.entries(SOURCES)) {
  const dest = path.join(outDir, `${key}.jpg`);
  let saved = false;
  for (const url of urls) {
    try {
      const buf = await downloadOne(url);
      fs.writeFileSync(dest, buf);
      console.log(`OK  ${key} (${Math.round(buf.length / 1024)} KB) ← ${url}`);
      ok++;
      saved = true;
      break;
    } catch (err) {
      console.warn(`  skip ${key}: ${err.message} (${url})`);
    }
  }
  if (!saved) {
    console.error(`FAIL ${key}: all sources failed`);
    fail++;
  }
}

console.log(`\nDone: ${ok} saved, ${fail} failed → ${outDir}`);
process.exit(fail > 0 ? 1 : 0);
