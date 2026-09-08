import fs from "fs";

const files = [
  "ign-valorant",
  "ign-warzone",
  "ign-destiny-2",
  "ign-rainbow-six-siege",
  "ign-sea-of-thieves",
];

for (const f of files) {
  const html = fs.readFileSync(`scripts/${f}.html`, "utf8");
  const og = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  const urls = [
    ...new Set(
      [...html.matchAll(/https:\/\/assets[^"'\s<>]+ignimgs[^"'\s<>]+/g)].map((m) => m[0])
    ),
  ];
  console.log(`\n=== ${f} ===`);
  console.log("og:", og);
  console.log("urls:", urls.slice(0, 5).join("\n  "));
}
