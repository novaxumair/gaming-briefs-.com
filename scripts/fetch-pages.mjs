import fs from "fs";
import path from "path";

const OUT = "C:/Users/3Tee System/Downloads/gamingworlddaily-main/web/scripts/fetched-pages";

const PAGES = [
  "https://getyourcheats.com/contact",
  "https://getyourcheats.com/support",
  "https://getyourcheats.com/about-us",
  "https://getyourcheats.com/insight",
  "https://getyourcheats.com/fees",
  "https://getyourcheats.com/blogs",
  "https://getyourcheats.com/signin",
  "https://getyourcheats.com/policies/terms-and-conditions",
  "https://getyourcheats.com/policies/returns-and-cancellations",
  "https://getyourcheats.com/policies/privacy-policy",
];

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml",
};

function slugFromUrl(url) {
  const u = new URL(url);
  return u.pathname.replace(/^\/|\/$/g, "").replace(/\//g, "__") || "home";
}

function extractMeta(html, name) {
  const m = html.match(new RegExp(`<meta name="${name}" content="([^"]*)"`));
  return m?.[1] ?? null;
}

function extractOg(html, prop) {
  const m = html.match(new RegExp(`<meta property="${prop}" content="([^"]*)"`));
  return m?.[1] ?? null;
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]+)<\/title>/);
  return m?.[1]?.replace(/&amp;/g, "&") ?? null;
}

function extractCanonical(html) {
  const m = html.match(/<link rel="canonical" href="([^"]*)"/);
  return m?.[1] ?? null;
}

function extractH1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!m) return null;
  return m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractMainContent(html) {
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (mainMatch) return mainMatch[1];

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  if (!bodyMatch) return "";

  let body = bodyMatch[1];
  body = body.replace(/<div class="site-skeleton"[\s\S]*?<\/div>/, "");
  body = body.replace(/<div class="site-top-nav[\s\S]*?<\/div><div class="site-top-nav[\s\S]*?<\/div>/, "");
  const footerIdx = body.indexOf("<footer");
  if (footerIdx >= 0) body = body.slice(0, footerIdx);
  return body;
}

function textBlocks(html) {
  const blocks = [];
  for (const m of html.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/g)) {
    blocks.push({
      type: "heading",
      level: Number(m[1]),
      text: m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    });
  }
  for (const m of html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)) {
    const text = m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text.length > 20) blocks.push({ type: "paragraph", text });
  }
  return blocks.slice(0, 30);
}

fs.mkdirSync(OUT, { recursive: true });

const summary = [];

for (const url of PAGES) {
  const slug = slugFromUrl(url);
  console.log("Fetching", url);
  try {
    const res = await fetch(url, { headers });
    const html = await res.text();
    const data = {
      url,
      slug,
      status: res.status,
      title: extractTitle(html),
      description: extractMeta(html, "description"),
      canonical: extractCanonical(html),
      ogTitle: extractOg(html, "og:title"),
      ogDescription: extractOg(html, "og:description"),
      h1: extractH1(html),
      blocks: textBlocks(extractMainContent(html)),
      mainHtml: extractMainContent(html).slice(0, 12000),
    };

    fs.writeFileSync(path.join(OUT, `${slug}.json`), JSON.stringify(data, null, 2));
    fs.writeFileSync(path.join(OUT, `${slug}.html`), html);
    summary.push({ slug, title: data.title, h1: data.h1, blocks: data.blocks.length });
    console.log("  OK:", data.title);
  } catch (err) {
    console.log("  ERR:", err.message);
    summary.push({ slug, error: String(err) });
  }
}

fs.writeFileSync(path.join(OUT, "summary.json"), JSON.stringify(summary, null, 2));
console.log("\nDone:", summary.length, "pages");
