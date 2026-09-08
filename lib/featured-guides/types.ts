export interface FeaturedGuideCard {
  slug: string;
  title: string;
  description: string;
  image: string;
}

export interface FeaturedGuideArticle extends FeaturedGuideCard {
  articleMarkdown: string;
  zadeyoUrl?: string;
}
