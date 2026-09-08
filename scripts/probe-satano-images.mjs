const slug = process.argv[2] ?? "rust";
const url = `https://wh-satano.ru/en/cheats/${slug}`;
const res = await fetch(url, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
  },
});
const html = await res.text();
const urls = [
  ...html.matchAll(/(?:src|href|content|data-src)="(https?:\/\/wh-satano\.ru\/[^"]+\.(?:webp|jpg|jpeg|png|gif)[^"]*)"/gi),
  ...html.matchAll(/(?:src|href|content|data-src)="(\/storage\/[^"]+\.(?:webp|jpg|jpeg|png|gif)[^"]*)"/gi),
  ...html.matchAll(/(\/storage\/[^"'\\s>]+\.(?:webp|jpg|jpeg|png|gif))/gi),
].map((m) => (m[1].startsWith("http") ? m[1] : `https://wh-satano.ru${m[1]}`));

console.log([...new Set(urls)].slice(0, 25).join("\n"));
