import fs from "fs";

const html = fs.readFileSync(
  "C:/Users/3Tee System/Downloads/getyourcheats-extracted/getyourcheats.com/index.html",
  "utf8"
);

const titleMatch = html.match(/<title>([^<]+)<\/title>/);
const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);

console.log("TITLE:", titleMatch?.[1]);
console.log("DESC:", descMatch?.[1]);
console.log("CANONICAL:", canonicalMatch?.[1]);
console.log("OG IMAGE:", ogImageMatch?.[1]);

const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (schemaMatch) {
  console.log("\nSCHEMA:", schemaMatch[1].slice(0, 800));
}

const seoMatch = html.match(/class="seo-home-about"[\s\S]*?<\/section>/);
if (seoMatch) {
  const text = seoMatch[0]
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, "\n")
    .replace(/\n+/g, "\n")
    .trim();
  console.log("\nSEO SECTION:\n", text.slice(0, 2500));
}

const hrefs = [...html.matchAll(/href="(\/[a-z0-9-]+-cheats)"/g)].map((m) => m[1]);
const uniqueHrefs = [...new Set(hrefs)];
console.log("\nUNIQUE CHEAT HREFS:", uniqueHrefs.length);

const cards = uniqueHrefs.map((href) => {
  const slug = href.replace(/^\//, "").replace(/-cheats$/, "");
  const chunkStart = html.indexOf(`href="${href}"`);
  const chunk = html.slice(chunkStart, chunkStart + 2500);
  const imgMatch = chunk.match(/src="(\/cs\/uploads\/[^"]+)"/);
  const gifMatch = chunk.match(/data-gif="(\/cs\/uploads\/[^"]+)"/);
  const altMatch = chunk.match(/alt="([^"]+)"/);
  const titleMatch = chunk.match(/<p class="text-center text-\[#E2E8FF\]">([^<]+)<\/p>/);
  return {
    href,
    slug,
    image: imgMatch?.[1] ?? null,
    gif: gifMatch?.[1] ?? null,
    title: titleMatch?.[1]?.trim() ?? altMatch?.[1]?.trim() ?? slug,
    gameName: altMatch?.[1]?.trim() ?? titleMatch?.[1]?.trim() ?? slug,
  };
});

console.log("\nTOTAL CARDS:", cards.length);
console.log("\nFIRST 10:");
cards.slice(0, 10).forEach((c) => console.log(c.href, "|", c.title, "|", c.image));

const popularIdx = html.indexOf("Popular game cheats");
const moreIdx = html.indexOf("More game cheats");
console.log("\nPopular idx:", popularIdx, "More idx:", moreIdx);

if (popularIdx >= 0 && moreIdx >= 0) {
  const popularSlugs = new Set();
  const moreSlugs = new Set();
  for (const card of cards) {
    const pos = html.indexOf(`href="${card.href}"`);
    if (pos >= popularIdx && pos < moreIdx) popularSlugs.add(card.slug);
    else if (pos >= moreIdx) moreSlugs.add(card.slug);
  }
  cards.forEach((c) => {
    c.section = popularSlugs.has(c.slug) ? "popular" : "all";
    // better title from HTML
    const pos = html.indexOf(`href="${c.href}"`);
    const chunk = html.slice(pos, pos + 3000);
    const titleMatch = chunk.match(/gyc-product-title[^>]*>([^<]+)</);
    if (titleMatch) c.title = titleMatch[1].trim();
  });
  console.log("Popular:", popularSlugs.size, "More:", moreSlugs.size);
}

// extract full SEO HTML
const seoHtmlMatch = html.match(/<section class="seo-home-about"[\s\S]*?<\/section>/);
if (seoHtmlMatch) {
  fs.writeFileSync(
    "C:/Users/3Tee System/Downloads/gamingworlddaily-main/web/scripts/seo-section.html",
    seoHtmlMatch[0]
  );
  console.log("Wrote seo-section.html");
}

fs.writeFileSync(
  "C:/Users/3Tee System/Downloads/gamingworlddaily-main/web/scripts/catalog.json",
  JSON.stringify(cards, null, 2)
);
