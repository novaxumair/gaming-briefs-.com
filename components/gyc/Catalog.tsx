"use client";

import { useMemo } from "react";
import { catalogItems, getCatalogHref, type CatalogItem } from "@/lib/data";
import ProductCard from "./ProductCard";

export default function GycCatalog({ query, linkMode }: { query: string; linkMode: "game" | "cheats" }) {
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return catalogItems;
    return catalogItems.filter((item) => item.title.toLowerCase().includes(q));
  }, [query]);

  if (filtered.length === 0) return null;

  const sectionTitle = linkMode === "game" ? "Featured games" : "Featured cheat guides";

  return (
    <div className="site-container flex flex-col gap-6 pb-10 pt-4">
      <h2 className="gyc-section-title text-center">{sectionTitle}</h2>
      <div className="gyc-grid mx-auto w-full max-w-5xl">
        {filtered.map((item: CatalogItem) => (
          <ProductCard
            key={item.slug}
            item={item}
            href={getCatalogHref(item.slug, linkMode)}
          />
        ))}
      </div>
    </div>
  );
}
