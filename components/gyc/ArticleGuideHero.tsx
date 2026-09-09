"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import BuyLink from "@/components/gyc/BuyLink";
import SatanoImage from "@/components/gyc/SatanoImage";
import { blogSpotlightBadge, blogSpotlightStats } from "@/lib/blog-spotlight";
import { articleGalleryImages, articleHeroLead } from "@/lib/article-guide";
import { getAccessLabel, getBuyUrl, isBuyAvailable } from "@/lib/buy-links";
import type { Guide } from "@/lib/data";
import { isSatanoRemoteImage } from "@/lib/gameplay-images";

type Props = {
  guide: Guide;
  variant?: "full" | "cheats";
};

function PreviewImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  if (isSatanoRemoteImage(src)) {
    return (
      <SatanoImage
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes={sizes}
        priority
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-center"
      sizes={sizes}
      unoptimized={src.endsWith(".gif")}
      priority
    />
  );
}

export default function ArticleGuideHero({ guide, variant = "cheats" }: Props) {
  const isFull = variant === "full";
  const images = articleGalleryImages(guide);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0] ?? null;
  const stats = blogSpotlightStats(guide.slug);
  const buyAvailable = isBuyAvailable(guide.slug);
  const buyUrl = getBuyUrl(guide.slug);
  const heroLead = articleHeroLead(guide);

  const goPrev = useCallback(() => {
    if (images.length < 2) return;
    setActiveIndex((index) => (index - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    if (images.length < 2) return;
    setActiveIndex((index) => (index + 1) % images.length);
  }, [images.length]);

  return (
    <section
      id="article-hero"
      className="blog-spotlight-panel article-guide-hero-panel"
      aria-labelledby="article-spotlight-title"
    >
      <div className="blog-spotlight-grid">
        <div className="blog-spotlight-copy">
          <span className="blog-spotlight-badge">{blogSpotlightBadge(guide.gameName)}</span>
          <h1 id="article-spotlight-title" className="blog-spotlight-headline">
            {isFull ? (
              <>
                <span className="blog-spotlight-highlight">{guide.gameName}</span> Guide 2026
                {" — Updates, Tips & Meta"}
              </>
            ) : (
              <>
                Best <span className="blog-spotlight-highlight">{guide.gameName} Cheats</span> 2026
                {" — Undetected & Updated Daily"}
              </>
            )}
          </h1>
          <p className="blog-spotlight-lead">{heroLead}</p>

          <div className="blog-spotlight-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="blog-spotlight-stat">
                <span className="blog-spotlight-stat-value">{stat.value}</span>
                <span className="blog-spotlight-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="blog-spotlight-actions">
            {buyAvailable ? (
              <BuyLink href={buyUrl} className="blog-spotlight-cta access-cta access-cta-lg">
                {getAccessLabel(guide.gameName)}
              </BuyLink>
            ) : (
              <span className="blog-spotlight-cta access-cta access-cta-lg buy-cta-soon" aria-disabled="true">
                Coming soon
              </span>
            )}
            <a href="#article-features" className="blog-spotlight-cta-ghost access-cta-ghost">
              See full features
            </a>
          </div>
        </div>

        <div className="blog-spotlight-media">
          <div className="blog-spotlight-frame">
            {activeImage ? (
              <PreviewImage
                src={activeImage}
                alt={`${guide.gameName} gameplay preview`}
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            ) : (
              <div className="blog-spotlight-empty">Gameplay preview coming soon</div>
            )}

            <span className="blog-spotlight-corner blog-spotlight-corner-tl" aria-hidden />
            <span className="blog-spotlight-corner blog-spotlight-corner-tr" aria-hidden />
            <span className="blog-spotlight-corner blog-spotlight-corner-bl" aria-hidden />
            <span className="blog-spotlight-corner blog-spotlight-corner-br" aria-hidden />

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  className="blog-spotlight-nav blog-spotlight-nav-prev"
                  onClick={goPrev}
                  aria-label="Previous gameplay preview"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="blog-spotlight-nav blog-spotlight-nav-next"
                  onClick={goNext}
                  aria-label="Next gameplay preview"
                >
                  ›
                </button>
                <div className="blog-spotlight-thumb-stack">
                  {images.map((src, index) => (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      className={`blog-spotlight-thumb${index === activeIndex ? " is-active" : ""}`}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show ${guide.gameName} preview ${index + 1}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                    >
                      <PreviewImage src={src} alt="" sizes="72px" />
                    </button>
                  ))}
                </div>
                <span className="blog-spotlight-counter" aria-live="polite">
                  {activeIndex + 1} / {images.length}
                </span>
              </>
            ) : null}
          </div>
          <p className="blog-spotlight-caption">
            {isFull
              ? `${guide.gameName} guide preview`
              : `${guide.gameName} live gameplay — cheat preview`}
          </p>
        </div>
      </div>
    </section>
  );
}
