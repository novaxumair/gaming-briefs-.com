import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InfoArticleContent from "@/components/gyc/InfoArticleContent";
import { INFO_ARTICLES, getInfoArticle } from "@/lib/info-articles";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return INFO_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getInfoArticle(slug);
  if (!article) return {};

  return buildPageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    ogType: "article",
    image: article.image,
  });
}

export default async function InfoBlogPage({ params }: Props) {
  const { slug } = await params;
  const article = getInfoArticle(slug);
  if (!article) notFound();

  return (
    <div className="site-container py-10 sm:py-14">
      <nav className="mb-8 text-sm">
        <Link href="/" className="text-[#86efac]/70 transition hover:text-[#bbf7d0]">
          Home
        </Link>
        <span className="mx-2 text-[#4ade80]/40">/</span>
        <Link href="/blogs" className="text-[#86efac]/70 transition hover:text-[#bbf7d0]">
          Blogs
        </Link>
        <span className="mx-2 text-[#4ade80]/40">/</span>
        <span className="text-[#bbf7d0]/90">{article.gameName}</span>
      </nav>

      <div className="info-article-layout">
        <div className="info-article-hero">
          <div className="info-article-hero-frame">
            <Image
              src={article.image}
              alt={article.gameName}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 720px"
              priority
              unoptimized={article.image.startsWith("http") || article.image.startsWith("/cs/")}
            />
          </div>
        </div>
        <InfoArticleContent article={article} />
      </div>
    </div>
  );
}
