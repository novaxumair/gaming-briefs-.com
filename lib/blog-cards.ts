import { INFO_ARTICLES } from "./info-articles";

export type BlogCard = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
  updated: string;
  image: string;
  gameName: string;
};

export const FEATURED_BLOG_CARDS: BlogCard[] = INFO_ARTICLES.map((article) => ({
  slug: article.slug,
  category: article.category,
  title: article.title,
  excerpt: article.excerpt,
  href: `/blog/${article.slug}`,
  updated: article.updated,
  image: article.image,
  gameName: article.gameName,
}));
