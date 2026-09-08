import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");
const MAP_FILE = path.join(ROOT, "scripts/satano-map.json");
const OUT_DIR = path.join(ROOT, "public/satano/gameplay");
const GALLERY_FILE = path.join(ROOT, "lib/gameplay-gallery.json");

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

async function download(url, dest) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

function pageGameplayUrls(html) {
  const urls = new Set();
  for (const m of html.matchAll(/(?:src|data-src|content)="([^"]+\.(?:webp|jpg|jpeg|png|gif)[^"]*)"/gi)) {
  const raw = m[1];
  if (!raw.includes("wh-satano.ru") && !raw.startsWith("http")) continue;
  const url = raw.startsWith("http") ? raw : `https://wh-satano.ru${raw}`;
  if (url.includes("/storage/thumbnails/")) continue;
  if (url.includes("logo") || url.includes("icon") || url.includes("favicon")) continue;
  urls.add(url);
}
  return [...urls];
}

const onlySlug = process.argv.find((arg) => arg.startsWith("--slug="))?.split("=")[1];
const maxImages = Number(process.argv.find((arg) => arg.startsWith("--limit="))?.split("=")[1] || 6);

const mapping = JSON.parse(fs.readFileSync(MAP_FILE, "utf8"));
const gallery = onlySlug
  ? JSON.parse(fs.readFileSync(GALLERY_FILE, "utf8"))
  : {};
let total = 0;

const rows = onlySlug ? mapping.filter((row) => row.slug === onlySlug) : mapping;

for (const row of rows) {
  if (!row.satanoSlug) continue;
  const pageUrl = `https://wh-satano.ru/en/cheats/${row.satanoSlug}`;
  const res = await fetch(pageUrl, { headers });
  if (!res.ok) {
    console.log("PAGE MISS", row.slug, res.status);
    continue;
  }
  const html = await res.text();
  const urls = pageGameplayUrls(html);
  const local = [];
  let index = 1;
  for (const url of urls.slice(0, maxImages)) {
    const ext = path.extname(url.split("?")[0]) || ".webp";
    const file = `${row.slug}-gameplay-${index}${ext}`;
    const dest = path.join(OUT_DIR, file);
    try {
      await download(url, dest);
      local.push(`/satano/gameplay/${file}`);
      index++;
      total++;
      console.log("OK", row.slug, file);
    } catch (e) {
      console.log("SKIP", row.slug, url, e.message);
    }
  }
  if (local.length) gallery[row.slug] = local;
  await new Promise((r) => setTimeout(r, 100));
}

fs.writeFileSync(GALLERY_FILE, JSON.stringify(gallery, null, 2));
console.log(`Gameplay images saved: ${total} files across ${Object.keys(gallery).length} games`);
