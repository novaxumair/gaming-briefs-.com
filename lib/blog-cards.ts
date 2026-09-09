import { guides } from "./data";
import { INFO_ARTICLES } from "./info-articles";

const LIVE_GUIDE_SLUGS = new Set(guides.map((guide) => guide.slug));

export type BlogCard = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
  updated: string;
  image: string;
  gameName: string;
  relatedGuideSlug?: string;
};

export const FEATURED_BLOG_CARDS: BlogCard[] = INFO_ARTICLES.filter(
  (article) => !article.relatedGuideSlug || LIVE_GUIDE_SLUGS.has(article.relatedGuideSlug),
).map((article) => ({
  slug: article.slug,
  category: article.category,
  title: article.title,
  excerpt: article.excerpt,
  href: `/blog/${article.slug}`,
  updated: article.updated,
  image: article.image,
  gameName: article.gameName,
  relatedGuideSlug: article.relatedGuideSlug,
}));
