import Image from "next/image";
import Link from "next/link";
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
    <section className="gyc-blog-section relative py-8 sm:py-10">
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
        <div className="gyc-blog-grid">
          {posts.map((post) => (
            <article key={post.slug} className="gyc-blog-card group">
              <Link href={post.href} className="gyc-blog-card-link block h-full">
                <div className="gyc-blog-card-image-wrap">
                  <Image
                    src={post.image}
                    alt={post.gameName}
                    fill
                    loading="lazy"
                    className="gyc-blog-card-image object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized={post.image.startsWith("http") || post.image.startsWith("/cs/")}
                  />
                  <div className="gyc-blog-card-image-overlay" aria-hidden />
                  <span className="gyc-blog-card-game">{post.gameName}</span>
                </div>
                <div className="gyc-blog-card-body">
                  <span className="gyc-blog-card-category">{post.category}</span>
                  <h3 className="gyc-blog-card-title">{post.title}</h3>
                  <p className="gyc-blog-card-excerpt">{post.excerpt}</p>
                  <div className="gyc-blog-card-footer">
                    <span className="gyc-blog-card-date">Updated {post.updated}</span>
                    <span className="gyc-blog-card-cta">Read guide</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
