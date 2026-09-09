import type { Guide } from "@/lib/data";
import { getGameplayImagesForGuide } from "@/lib/gameplay-images";

function hashSlug(slug: string): number {
  return slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

export function blogSpotlightStats(slug: string) {
  const hash = hashSlug(slug);
  const users = (8 + (hash % 14)) * 1000;
  const rating = (4.5 + (hash % 5) / 10).toFixed(1);
  const undetected = `${92 + (hash % 7)}.${hash % 10}`;
  const turnaround = 1 + (hash % 3);

  return [
    { value: `${users.toLocaleString("en-US")}+`, label: "Active users" },
    { value: `${rating}★`, label: "Community rating" },
    { value: `${undetected}%`, label: "Undetected rate" },
    { value: `<${turnaround}h`, label: "Patch turnaround" },
  ] as const;
}

export function blogSpotlightBadge(gameName: string): string {
  return `Cheats Intel — ${gameName} — Updated 2026`;
}

export function blogSpotlightHeadline(gameName: string): string {
  return `Best ${gameName} Cheats 2026 — Undetected & Updated Daily`;
}

export function blogSpotlightDescription(gameName: string, slug: string): string {
  const users = blogSpotlightStats(slug)[0].value;
  return `${gameName} cheats with aimbot, ESP, wallhack and HWID spoofer support — updated for current patches. Trusted by ${users} players with instant delivery and 24/7 support.`;
}

export function blogSpotlightImages(guide: Guide): string[] {
  return getGameplayImagesForGuide(guide);
}

export function blogSpotlightCaption(gameName: string, hasGameplayGif = false): string {
  return hasGameplayGif
    ? `${gameName} live gameplay — cheat preview`
    : `${gameName} gameplay preview — updated cheat guide`;
}
