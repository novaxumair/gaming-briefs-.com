"use client";

import Link from "next/link";
import type { InfoArticle } from "@/lib/info-articles";

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

function renderParagraph(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-[#bbf7d0]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default function InfoArticleContent({ article }: { article: InfoArticle }) {
  const blocks = parseArticleMarkdown(article.articleMarkdown);

  return (
    <article className="info-article">
      <header className="info-article-header">
        <span className="info-article-category">{article.category}</span>
        <h1 className="info-article-title">{article.title}</h1>
        <p className="info-article-meta">
          {article.gameName} · Updated {article.updated}
        </p>
      </header>

      <div className="info-article-prose">
        {blocks.map((block, index) => {
          if (block.type === "h1") {
            return (
              <h2 key={index} className="info-article-h1">
                {block.text}
              </h2>
            );
          }
          if (block.type === "h2") {
            return (
              <h3 key={index} className="info-article-h2">
                {block.text}
              </h3>
            );
          }
          return (
            <p key={index} className="info-article-p">
              {renderParagraph(block.text)}
            </p>
          );
        })}
      </div>

      {article.relatedGuideSlug ? (
        <footer className="info-article-footer">
          <Link href={`/${article.relatedGuideSlug}-cheats`} className="info-article-guide-link">
            Read full {article.gameName} cheat guide →
          </Link>
        </footer>
      ) : null}
    </article>
  );
}
