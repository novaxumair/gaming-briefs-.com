import { MetadataRoute } from "next";
import { getGameUrl, getGuideUrl, guides } from "@/lib/data";
import { INFO_ARTICLES } from "@/lib/info-articles";
import { staticPages } from "@/lib/static-pages";
import { siteUrl } from "@/lib/site-url";

const LAST_MODIFIED = new Date("2026-09-08T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/blogs",
    "/articles",
    "/reviews",
    "/contact",
    "/support",
    "/about-us",
    "/insight",
    "/fees",
    ...staticPages
      .filter((page) => page.path.startsWith("/policies/"))
      .map((page) => page.path),
  ].map((path) => ({
    url: siteUrl(path),
    lastModified: LAST_MODIFIED,
    changeFrequency: "daily" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const gamePages = guides.map((guide) => ({
    url: siteUrl(getGameUrl(guide.slug)),
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const guidePages = guides.map((guide) => ({
    url: siteUrl(getGuideUrl(guide.slug)),
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const liveGuideSlugs = new Set(guides.map((guide) => guide.slug));
  const blogPages = INFO_ARTICLES.filter(
    (article) => !article.relatedGuideSlug || liveGuideSlugs.has(article.relatedGuideSlug),
  ).map((article) => ({
    url: siteUrl(`/blog/${article.slug}`),
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  return [...staticPaths, ...gamePages, ...guidePages, ...blogPages];
}
