import { valorantInfoArticles } from "./valorant-articles";
import { crossGameInfoArticles } from "./cross-game-articles";
import type { InfoArticle } from "./types";

export const INFO_ARTICLES: InfoArticle[] = [
  ...valorantInfoArticles,
  ...crossGameInfoArticles,
];

export function getInfoArticle(slug: string): InfoArticle | undefined {
  return INFO_ARTICLES.find((article) => article.slug === slug);
}

export type { InfoArticle } from "./types";
