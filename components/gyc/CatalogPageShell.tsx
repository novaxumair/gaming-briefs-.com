"use client";

import dynamic from "next/dynamic";
import { useState, type ReactNode } from "react";
import GycHero from "@/components/gyc/Hero";
import GycCatalog from "@/components/gyc/Catalog";
import GycSearch from "@/components/gyc/Search";
import BlogCards from "@/components/gyc/BlogCards";

const GuideCardStack = dynamic(() => import("@/components/gyc/GuideCardStack"), {
  loading: () => <div className="guide-stack-section min-h-[120px]" aria-hidden />,
});

export default function CatalogPageShell({
  title,
  tagline,
  description,
  linkMode,
  showCatalog = true,
  children,
}: {
  title: string;
  tagline?: string;
  description: string;
  linkMode: "game" | "cheats";
  showCatalog?: boolean;
  children?: ReactNode;
}) {
  const [query, setQuery] = useState("");

  return (
    <>
      <GycHero title={title} tagline={tagline} description={description}>
        <GycSearch onSearch={setQuery} />
      </GycHero>
      <GuideCardStack />
      {showCatalog ? <GycCatalog query={query} linkMode={linkMode} /> : null}
      <BlogCards />
      {children}
    </>
  );
}
