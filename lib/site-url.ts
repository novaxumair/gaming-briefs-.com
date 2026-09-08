import { SITE } from "./data";

/** Absolute https URL on gamingbriefs.com (homepage always ends with /). */
export function siteUrl(path: string = "/"): string {
  if (!path || path === "/") return `${SITE.domain}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.domain}${normalized}`;
}
