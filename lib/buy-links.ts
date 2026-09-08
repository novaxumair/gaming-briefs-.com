import {
  ZADEYO_AVAILABLE_SLUGS,
  ZADEYO_PRODUCT_OVERRIDES,
} from "./zadeyo-catalog";

const ZADEYO_AFFILIATE = "https://zadeyo.com/go/QRH";

export function getZadeyoProductSlug(catalogSlug: string): string {
  return ZADEYO_PRODUCT_OVERRIDES[catalogSlug] ?? catalogSlug;
}

export function isBuyAvailable(catalogSlug: string): boolean {
  return ZADEYO_AVAILABLE_SLUGS.has(catalogSlug);
}

export const FEATURED_ACCESS_SLUG = "rust";

export function getAccessLabel(gameName?: string): string {
  if (!gameName) return "Get access";
  return `Get ${gameName} access`;
}

/** @deprecated Use getAccessLabel */
export function getBuyButtonLabel(gameName: string): string {
  return getAccessLabel(gameName);
}

/** Affiliate checkout URL for buy CTAs only. */
export function getBuyUrl(catalogSlug: string): string {
  const productSlug = getZadeyoProductSlug(catalogSlug);
  return `${ZADEYO_AFFILIATE}?to=${encodeURIComponent(`/products/${productSlug}`)}`;
}

export function isExternalBuyUrl(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function isBuyHref(href: string, catalogSlug: string): boolean {
  return href === getBuyUrl(catalogSlug);
}
