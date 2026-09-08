import fs from "fs";

const map = JSON.parse(
  fs.readFileSync("scripts/satano-map.json", "utf8")
);

const entries = map
  .filter((row) => row.local?.startsWith("/satano/"))
  .map((row) => `  "${row.slug}": "${row.local}",`)
  .sort()
  .join("\n");

const content = `import type { Guide } from "@/lib/data";
import gameplayGallery from "./gameplay-gallery.json";

/** Satano gameplay previews — blog/guide inner sections only. Never used for catalog covers. */
const GAMEPLAY_IMAGES: Record<string, string> = {
${entries}
};

export function getGameplayImage(slug: string): string | null {
  return GAMEPLAY_IMAGES[slug] ?? null;
}

/** Satano + optional GIF previews for guide/blog hero galleries. */
export function getGameplayImagesForGuide(guide: Guide): string[] {
  const images: string[] = [];
  const gallery = gameplayGallery as Record<string, string[]>;

  const satano = getGameplayImage(guide.slug);
  if (satano) images.push(satano);

  for (const src of gallery[guide.slug] ?? []) {
    if (!images.includes(src)) images.push(src);
  }

  if (guide.gif && !images.includes(guide.gif)) images.push(guide.gif);

  return images.slice(0, 4);
}
`;

fs.writeFileSync("lib/gameplay-images.ts", content);
console.log("Synced gameplay images:", map.filter((r) => r.local?.startsWith("/satano/")).length);
