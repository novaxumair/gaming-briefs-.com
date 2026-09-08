import fs from "fs";

const html = fs.readFileSync("scripts/satano-home.html", "utf8");
const games = [];
const re =
  /<a href="https:\/\/wh-satano\.ru\/en\/cheats\/([^"]+)"[^>]*>[\s\S]*?<img src="([^"]+)" alt="([^"]*)"[^>]*>[\s\S]*?<span>([^<]*)<\/span>/g;
let m;
while ((m = re.exec(html))) {
  games.push({
    slug: m[1],
    image: m[2],
    alt: m[3].replace(/&#039;/g, "'"),
    label: m[4],
  });
}

console.log("All satano slugs:");
for (const g of games) console.log(`${g.slug}\t${g.label}\t${g.alt}`);

const missing = JSON.parse(fs.readFileSync("scripts/satano-map.json", "utf8"))
  .filter((r) => !r.local?.startsWith("/satano/"))
  .map((r) => r.slug);

console.log("\n--- Suggestions for missing ---");
for (const slug of missing) {
  const tokens = slug.split("-").filter((t) => t.length > 2);
  const hits = games.filter((g) => {
    const hay = `${g.slug} ${g.alt} ${g.label}`.toLowerCase();
    return tokens.some((t) => hay.includes(t));
  });
  console.log(slug, "=>", hits.slice(0, 2).map((h) => `${h.slug} (${h.label})`).join(" | ") || "NONE");
}
