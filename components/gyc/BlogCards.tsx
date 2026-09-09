import BlogCardsCarousel from "@/components/gyc/BlogCardsCarousel";
import { filterBlogCards } from "@/lib/search-guides";

export default function BlogCards({
  query = "",
  hideHeader = false,
}: {
  query?: string;
  hideHeader?: boolean;
}) {
  const posts = filterBlogCards(query);
  if (posts.length === 0) return null;

  return (
    <section className="gyc-blog-section relative py-8 sm:py-10" aria-label="Featured articles">
      {hideHeader ? null : (
        <div className="site-container mb-8 text-center sm:mb-10">
          <span className="font-display text-[10px] uppercase tracking-[0.35em] text-[#4ade80]/70 sm:text-xs">
            Informational Blogs
          </span>
          <h2
            className="font-display mt-2 text-lg text-[#bbf7d0] sm:text-xl md:text-2xl"
            style={{ textShadow: "0 0 24px rgba(74,222,128,0.35)" }}
          >
            Guides, Trends & Ranked Integrity
          </h2>
          <p className="mx-auto mt-2 max-w-2xl font-body text-xs text-[#86efac]/55 sm:text-sm">
            Long-form reads across popular titles — meta breakdowns, ranked tips, patch trends, and beginner
            guides without keyword stuffing.
          </p>
        </div>
      )}

      <div className="site-container">
        <BlogCardsCarousel posts={posts} />
      </div>
    </section>
  );
}
