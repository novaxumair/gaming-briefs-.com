"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import type { BlogCard } from "@/lib/blog-cards";

const CARDS_PER_PAGE = 3;

function chunkPosts(posts: BlogCard[], size: number): BlogCard[][] {
  const pages: BlogCard[][] = [];
  for (let i = 0; i < posts.length; i += size) {
    pages.push(posts.slice(i, i + size));
  }
  return pages;
}

export default function BlogCardsCarousel({ posts }: { posts: BlogCard[] }) {
  const pages = useMemo(() => chunkPosts(posts, CARDS_PER_PAGE), [posts]);
  const [page, setPage] = useState(0);

  const goPrev = useCallback(() => {
    setPage((current) => Math.max(0, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setPage((current) => Math.min(pages.length - 1, current + 1));
  }, [pages.length]);

  const canPrev = page > 0;
  const canNext = page < pages.length - 1;

  return (
    <div className="gyc-blog-carousel">
      <button
        type="button"
        className="gyc-blog-carousel-nav gyc-blog-carousel-nav-prev"
        onClick={goPrev}
        disabled={!canPrev}
        aria-label="Previous blog posts"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="gyc-blog-carousel-viewport">
        <div
          className="gyc-blog-carousel-track"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((pagePosts, pageIndex) => (
            <div key={`blog-page-${pageIndex}`} className="gyc-blog-carousel-page">
              {pagePosts.map((post) => (
                <article key={post.slug} className="gyc-blog-card group">
                  <Link href={post.href} className="gyc-blog-card-link block h-full">
                    <div className="gyc-blog-card-image-wrap">
                      <Image
                        src={post.image}
                        alt={post.gameName}
                        fill
                        loading="lazy"
                        className="gyc-blog-card-image object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized={post.image.startsWith("http") || post.image.startsWith("/cs/")}
                      />
                    </div>
                    <div className="gyc-blog-card-body">
                      <span className="gyc-blog-card-category">{post.category}</span>
                      <h3 className="gyc-blog-card-title">{post.title}</h3>
                      <p className="gyc-blog-card-excerpt">{post.excerpt}</p>
                      <div className="gyc-blog-card-footer">
                        <span className="gyc-blog-card-date">{post.updated}</span>
                        <span className="gyc-blog-card-cta">Read more</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="gyc-blog-carousel-nav gyc-blog-carousel-nav-next"
        onClick={goNext}
        disabled={!canNext}
        aria-label="Next blog posts"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
