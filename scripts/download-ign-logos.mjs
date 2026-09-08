import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const IGN_GAME_IMAGES = {
  valorant: "https://assets-prd.ignimgs.com/2021/12/21/valorant-1640045685890.jpg",
  warzone: "https://assets1.ignimgs.com/2020/03/09/call-of-duty-warzone---button-01-1583782814571.jpg",
  "destiny-2": "https://assets-prd.ignimgs.com/2025/03/12/destiny2heresy-1741800139522.jpg",
  "rainbow-six-siege": "https://assets-prd.ignimgs.com/2025/06/30/siegex-1751319986948.jpg",
  "sea-of-thieves": "https://assets-prd.ignimgs.com/2026/06/09/sot-customthieves-1781027869323.jpg",
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "games");

fs.mkdirSync(outDir, { recursive: true });

for (const [slug, url] of Object.entries(IGN_GAME_IMAGES)) {
  const dest = path.join(outDir, `${slug}.jpg`);
  console.log(`Downloading ${slug}...`);
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
  });
  if (!res.ok) {
    console.error(`  Failed (${res.status}): ${url}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log(`  Saved ${dest} (${buf.length} bytes)`);
}

console.log("\nDone.");
