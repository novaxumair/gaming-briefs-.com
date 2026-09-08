import type { Guide } from "@/lib/data";
import gameplayGallery from "./gameplay-gallery.json";

/** Satano gameplay previews — blog/guide inner sections only. Never used for catalog covers. */
const GAMEPLAY_IMAGES: Record<string, string> = {
  "arc-raiders": "/satano/arc-raiders.webp",
  "ark-survival-ascended": "/satano/ark-survival-ascended.webp",
  "arma-reforger": "/satano/arma-reforger.webp",
  "battlefield-6": "/satano/battlefield-6.webp",
  "bodycam": "/satano/bodycam.webp",
  "call-of-duty-black-ops-7": "/satano/call-of-duty-black-ops-7.webp",
  "cod-bocw": "/satano/cod-bocw.webp",
  "conan": "/satano/conan.webp",
  "cs-1-6": "/satano/cs-1-6.webp",
  "dayz": "/satano/dayz.webp",
  "deadlock": "/satano/deadlock.webp",
  "duet-night-abyss": "/satano/duet-night-abyss.webp",
  "escape-from-tarkov": "/satano/escape-from-tarkov.webp",
  "etheria-restart": "/satano/etheria-restart.webp",
  "foxhole": "/satano/foxhole.webp",
  "fragpunk": "/satano/fragpunk.webp",
  "gray-zone": "/satano/gray-zone.webp",
  "gray-zone-warfare": "/satano/gray-zone-warfare.webp",
  "humanitz": "/satano/humanitz.webp",
  "insurge": "/satano/insurge.webp",
  "isle": "/satano/isle.webp",
  "last-epoch": "/satano/last-epoch.webp",
  "left-4-dead-2": "/satano/left-4-dead-2.webp",
  "marathon": "/satano/marathon.webp",
  "marvel-rivals": "/satano/marvel-rivals.webp",
  "mecha-break": "/satano/mecha-break.webp",
  "megabonk": "/satano/megabonk.webp",
  "neverness-to-everness": "/satano/neverness-to-everness.webp",
  "off-the-grid": "/satano/off-the-grid.webp",
  "path-of-exile-2": "/satano/path-of-exile-2.webp",
  "pioneers-of-pagonia": "/satano/pioneers-of-pagonia.webp",
  "pubg": "/satano/pubg.webp",
  "rust": "/satano/rust.webp",
  "sand": "/satano/sand.webp",
  "snowbreak-containment-zone": "/satano/snowbreak-containment-zone.webp",
  "the-division-2": "/satano/the-division-2.webp",
  "the-first-descendant": "/satano/the-first-descendant.webp",
  "the-seven-deadly-sins": "/satano/the-seven-deadly-sins.webp",
  "wunthering": "/satano/wunthering.webp",
  "zenless-zone-zero": "/satano/zenless-zone-zero.webp",
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

/** Satano gameplay gallery only — no catalog GIFs or cover art fallbacks. */
export function getSatanoGameplayImagesForGuide(guide: Guide, limit = 6): string[] {
  const images: string[] = [];
  const gallery = gameplayGallery as Record<string, string[]>;

  for (const src of gallery[guide.slug] ?? []) {
    if (!images.includes(src)) images.push(src);
  }

  const satano = getGameplayImage(guide.slug);
  if (satano && !images.includes(satano)) images.push(satano);

  return images.slice(0, limit);
}

/** Satano CDN blocks hotlinks when a referrer is sent — use with referrerPolicy="no-referrer". */
export function isSatanoRemoteImage(src: string): boolean {
  return src.startsWith("https://") && src.includes("satano");
}
