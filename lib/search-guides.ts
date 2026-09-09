import { FEATURED_BLOG_CARDS, type BlogCard } from "./blog-cards";
import { catalogItems, type CatalogItem } from "./data";

export function normalizeSearchQuery(query: string): string {
  return query.toLowerCase().trim();
}

export function isSearchActive(query: string): boolean {
  return normalizeSearchQuery(query).length > 0;
}

export function matchesCatalogItem(item: CatalogItem, query: string): boolean {
  const q = normalizeSearchQuery(query);
  if (!q) return true;

  const title = item.title.toLowerCase();
  const slug = item.slug.toLowerCase();
  const slugWords = slug.replace(/-/g, " ");

  return title.includes(q) || slug.includes(q) || slugWords.includes(q);
}

export function filterCatalogItems(query: string): CatalogItem[] {
  const q = normalizeSearchQuery(query);
  if (!q) return catalogItems;
  return catalogItems.filter((item) => matchesCatalogItem(item, q));
}

export function getMatchingGuideSlugs(query: string): string[] {
  return filterCatalogItems(query).map((item) => item.slug);
}

export function filterBlogCards(query: string): BlogCard[] {
  const q = normalizeSearchQuery(query);
  if (!q) return FEATURED_BLOG_CARDS;

  const matchingSlugs = new Set(getMatchingGuideSlugs(query));
  if (matchingSlugs.size > 0) {
    return FEATURED_BLOG_CARDS.filter(
      (post) => post.relatedGuideSlug && matchingSlugs.has(post.relatedGuideSlug),
    );
  }

  return FEATURED_BLOG_CARDS.filter(
    (post) =>
      post.gameName.toLowerCase().includes(q) ||
      post.title.toLowerCase().includes(q) ||
      post.slug.includes(q.replace(/\s+/g, "-")),
  );
}
