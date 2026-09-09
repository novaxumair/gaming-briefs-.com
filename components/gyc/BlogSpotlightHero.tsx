"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import BuyLink from "@/components/gyc/BuyLink";
import SatanoImage from "@/components/gyc/SatanoImage";
import {
  blogSpotlightBadge,
  blogSpotlightCaption,
  blogSpotlightDescription,
  blogSpotlightHeadline,
  blogSpotlightImages,
  blogSpotlightStats,
} from "@/lib/blog-spotlight";
import { isSatanoRemoteImage } from "@/lib/gameplay-images";
import {
  getAccessLabel,
  getBuyUrl,
  isBuyAvailable,
  isBuyHref,
} from "@/lib/buy-links";
import { type Guide, getGuideUrl } from "@/lib/data";

type Props = {
  guide: Guide;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  showGuideLink?: boolean;
  headingLevel?: "h1" | "h2";
};

export default function BlogSpotlightHero({
  guide,
  primaryHref,
  primaryLabel,
  secondaryHref = "/articles",
  secondaryLabel = "See all cheats",
  showGuideLink = false,
  headingLevel = "h2",
}: Props) {
  const images = useMemo(() => blogSpotlightImages(guide), [guide]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0] ?? null;
  const stats = blogSpotlightStats(guide.slug);
  const headline = blogSpotlightHeadline(guide.gameName);
  const nameMatch = headline.match(/^Best (.+?) Cheats 2026/);
  const highlight = nameMatch?.[1] ?? guide.gameName;
  const headlineRest = headline.replace(`Best ${highlight} Cheats 2026`, "").trim();

  const buyAvailable = isBuyAvailable(guide.slug);
  const primaryLink =
    primaryHref ?? (showGuideLink ? getGuideUrl(guide.slug) : getBuyUrl(guide.slug));
  const primaryIsBuy = isBuyHref(primaryLink, guide.slug);
  const secondaryIsBuy = isBuyHref(secondaryHref, guide.slug);
  const primaryText =
    primaryLabel ??
    (showGuideLink
      ? `Read ${guide.gameName} cheat guide`
      : getAccessLabel(guide.gameName));

  const HeadingTag = headingLevel;

  function renderAction(href: string, className: string, text: string, isBuy: boolean) {
    if (isBuy && !buyAvailable) {
      return (
        <span className={`${className} buy-cta-soon`} aria-disabled="true">
          Coming soon
        </span>
      );
    }

    return (
      <BuyLink href={href} className={className}>
        {text}
      </BuyLink>
    );
  }

  return (
    <section
      id={`${guide.slug}-cheats`}
      className="blog-spotlight-panel"
      aria-labelledby={`spotlight-${guide.slug}`}
    >
      <div className="blog-spotlight-grid">
        <div className="blog-spotlight-copy">
          <span className="blog-spotlight-badge">{blogSpotlightBadge(guide.gameName)}</span>
          <HeadingTag id={`spotlight-${guide.slug}`} className="blog-spotlight-headline">
            Best <span className="blog-spotlight-highlight">{highlight} Cheats</span> 2026
            {headlineRest ? ` ${headlineRest}` : ""}
          </HeadingTag>
          <p className="blog-spotlight-lead">{blogSpotlightDescription(guide.gameName, guide.slug)}</p>

          <div className="blog-spotlight-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="blog-spotlight-stat">
                <span className="blog-spotlight-stat-value">{stat.value}</span>
                <span className="blog-spotlight-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="blog-spotlight-actions">
            {renderAction(primaryLink, "blog-spotlight-cta access-cta access-cta-lg", primaryText, primaryIsBuy)}
            {renderAction(
              secondaryHref,
              "blog-spotlight-cta-ghost access-cta-ghost",
              secondaryLabel,
              secondaryIsBuy,
            )}
          </div>
        </div>

        <div className="blog-spotlight-media">
          <div className="blog-spotlight-frame">
            {activeImage ? (
              isSatanoRemoteImage(activeImage) ? (
                <SatanoImage
                  src={activeImage}
                  alt={`${guide.gameName} gameplay preview`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
              ) : (
                <Image
                  src={activeImage}
                  alt={`${guide.gameName} gameplay preview`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 520px"
                  loading="lazy"
                  unoptimized={activeImage.endsWith(".gif")}
                />
              )
            ) : (
              <div className="blog-spotlight-empty">Gameplay preview coming soon</div>
            )}
            <span className="blog-spotlight-corner blog-spotlight-corner-tl" aria-hidden />
            <span className="blog-spotlight-corner blog-spotlight-corner-tr" aria-hidden />
            <span className="blog-spotlight-corner blog-spotlight-corner-bl" aria-hidden />
            <span className="blog-spotlight-corner blog-spotlight-corner-br" aria-hidden />
            {images.length > 1 ? (
              <div className="blog-spotlight-thumb-stack">
                {images.map((src, index) => (
                  <button
                    key={`${src}-${index}`}
                    type="button"
                    className={`blog-spotlight-thumb${index === activeIndex ? " is-active" : ""}`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show ${guide.gameName} preview ${index + 1}`}
                  >
                    {isSatanoRemoteImage(src) ? (
                      <SatanoImage
                        src={src}
                        alt=""
                        fill
                        className="object-cover object-center"
                        sizes="72px"
                      />
                    ) : (
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover object-center"
                        sizes="72px"
                        loading="lazy"
                        unoptimized={src.endsWith(".gif")}
                      />
                    )}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <p className="blog-spotlight-caption">
            {blogSpotlightCaption(guide.gameName, Boolean(guide.gif))}
          </p>
        </div>
      </div>
    </section>
  );
}
