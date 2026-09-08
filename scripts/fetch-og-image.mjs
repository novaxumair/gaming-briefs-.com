const url = process.argv[2] ?? "https://www.ign.com/games/fortnite";
const res = await fetch(url, {
  headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
});
const html = await res.text();
const og = html.match(/property="og:image" content="([^"]+)"/)?.[1];
console.log("status:", res.status);
console.log("og:", og);
