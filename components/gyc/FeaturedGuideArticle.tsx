"use client";

import type { FeaturedGuideArticle } from "@/lib/featured-guides";

type ArticleBlock =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; text: string };

function parseArticleMarkdown(markdown: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  const lines = markdown.trim().split("\n");
  let paragraph: string[] = [];

  const flushParagraph = () => {
    const text = paragraph.join(" ").trim();
    if (text) blocks.push({ type: "p", text });
    paragraph = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      continue;
    }
    if (trimmed.startsWith("# ")) {
      flushParagraph();
      blocks.push({ type: "h1", text: trimmed.slice(2).trim() });
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flushParagraph();
      blocks.push({ type: "h2", text: trimmed.slice(3).trim() });
      continue;
    }
    paragraph.push(trimmed);
  }

  flushParagraph();
  return blocks;
}

const ZADEYO_LINK_LABEL = "Start Your Journey Now";

function linkDisplayText(url: string): string {
  try {
    if (new URL(url).hostname.includes("zadeyo.com")) {
      return ZADEYO_LINK_LABEL;
    }
  } catch {
    /* keep raw url as label */
  }
  return url;
}

function renderParagraph(text: string) {
  const urlPattern = /(https?:\/\/[^\s)]+)/g;
  const parts = text.split(urlPattern);

  return parts.map((part, index) => {
    if (part.match(urlPattern)) {
      return (
        <a
          key={`${part}-${index}`}
          href={part}
          className="text-[#4ade80] underline decoration-[#4ade80]/35 underline-offset-2 transition hover:text-[#86efac]"
          target="_self"
          rel="noopener noreferrer sponsored"
        >
          {linkDisplayText(part)}
        </a>
      );
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export default function FeaturedGuideArticleSection({
  guide,
}: {
  guide: FeaturedGuideArticle;
}) {
  const blocks = parseArticleMarkdown(guide.articleMarkdown);

  return (
    <article
      id={guide.slug}
      className="scroll-mt-24 border-t border-[#4ade80]/10 pt-10 first:border-t-0 first:pt-0"
    >
      <div className="mb-6">
        <span className="font-display text-[10px] uppercase tracking-[0.3em] text-[#4ade80]/55">
          Full Guide
        </span>
        <h2
          className="font-display mt-2 text-xl text-[#bbf7d0] sm:text-2xl"
          style={{ textShadow: "0 0 20px rgba(74,222,128,0.25)" }}
        >
          {guide.title}
        </h2>
      </div>

      <div className="featured-guide-prose space-y-4">
        {blocks.map((block, index) => {
          if (block.type === "h1") {
            return (
              <h3
                key={`${guide.slug}-h1-${index}`}
                className="font-display text-lg leading-snug text-[#86efac] sm:text-xl"
              >
                {block.text}
              </h3>
            );
          }
          if (block.type === "h2") {
            return (
              <h4
                key={`${guide.slug}-h2-${index}`}
                className="font-display pt-4 text-sm uppercase tracking-[0.12em] text-[#4ade80]/85 sm:text-base"
              >
                {block.text}
              </h4>
            );
          }
          return (
            <p
              key={`${guide.slug}-p-${index}`}
              className="font-body text-sm leading-relaxed text-[#86efac]/75 sm:text-[0.95rem]"
            >
              {renderParagraph(block.text)}
            </p>
          );
        })}
      </div>
    </article>
  );
}
