import fs from "fs";
import path from "path";

const GAMES = [
  { slug: "valorant", file: "valorant" },
  { slug: "call-of-duty-warzone", file: "warzone" },
  { slug: "destiny-2", file: "destiny-2" },
  { slug: "tom-clancys-rainbow-six-siege", file: "rainbow-six-siege" },
  { slug: "sea-of-thieves", file: "sea-of-thieves" },
];

function extractFromHtml(html) {
  const urls = [...html.matchAll(/https:\/\/assets[^"'\s<>]+ignimgs[^"'\s<>]+/g)].map((m) => m[0]);
  const unique = [...new Set(urls)];

  const ogImage = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  let jsonLogo = null;
  if (nextDataMatch) {
    try {
      const data = JSON.parse(nextDataMatch[1]);
      const str = JSON.stringify(data);
      const logoMatches = [...str.matchAll(/"logo":\{[^}]*"url":"([^"]+)"/g)].map((m) => m[1]);
      const imageMatches = [...str.matchAll(/"image":\{[^}]*"url":"([^"]+)"/g)].map((m) => m[1]);
      jsonLogo = { logoMatches: [...new Set(logoMatches)], imageMatches: [...new Set(imageMatches)].slice(0, 5) };
    } catch {
      /* ignore */
    }
  }

  const logoLike = unique.filter((u) => /logo|thumb|cover|boxart|title/i.test(u));
  return { ogImage, jsonLogo, logoLike, all: unique.slice(0, 20) };
}

for (const game of GAMES) {
  const url = `https://www.ign.com/games/${game.slug}`;
  console.log(`\n=== ${game.slug} ===`);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    });
    const html = await res.text();
    fs.writeFileSync(path.join("scripts", `ign-${game.file}.html`), html);
    const result = extractFromHtml(html);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.log("error:", err.message);
  }
}
