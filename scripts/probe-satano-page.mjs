import fs from "fs";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
};

const slug = process.argv[2] || "rust";
const res = await fetch(`https://wh-satano.ru/en/cheats/${slug}`, { headers });
console.log("status", res.status);
const html = await res.text();
console.log("html length", html.length);
const urls = new Set();
for (const m of html.matchAll(/src="([^"]+\.(?:webp|jpg|jpeg|png|gif)[^"]*)"/gi)) {
  const u = m[1].startsWith("http") ? m[1] : `https://wh-satano.ru${m[1]}`;
  urls.add(u);
}
console.log("found", urls.size);
console.log([...urls].slice(0, 30).join("\n"));

for (const url of [...urls].slice(0, 5)) {
  const r = await fetch(url, { headers, method: "HEAD" });
  console.log(r.status, url);
}
