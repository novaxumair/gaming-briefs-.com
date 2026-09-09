"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import GycHero from "@/components/gyc/Hero";
import GycCatalog from "@/components/gyc/Catalog";
import GycSearch from "@/components/gyc/Search";
import { isSearchActive } from "@/lib/search-guides";

const GuideCardStack = dynamic(() => import("@/components/gyc/GuideCardStack"), {
  loading: () => <div className="guide-stack-section min-h-[120px]" aria-hidden />,
});

export default function CatalogPageShell({
  title,
  tagline,
  description,
  linkMode,
  showCatalog = true,
  showCatalogOnBrowse = false,
  showSearch = true,
  showHero = true,
  children,
}: {
  title: string;
  tagline?: string;
  description: string;
  linkMode: "game" | "cheats";
  showCatalog?: boolean;
  showCatalogOnBrowse?: boolean;
  showSearch?: boolean;
  showHero?: boolean;
  children?: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const searching = isSearchActive(query);

  function handleSearch(nextQuery: string) {
    setQuery(nextQuery);

    const params = new URLSearchParams(searchParams.toString());
    const trimmed = nextQuery.trim();

    if (trimmed) {
      params.set("q", trimmed);
    } else {
      params.delete("q");
    }

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <>
      {showHero ? (
        <GycHero
          title={title}
          tagline={tagline}
          description={description}
          compact={searching}
          showFlipBoard={false}
        >
          {showSearch ? (
            <GycSearch initialQuery={initialQuery} onSearch={handleSearch} />
          ) : null}
        </GycHero>
      ) : null}
      {searching ? null : <GuideCardStack />}
      {showCatalog && (showCatalogOnBrowse || searching) ? (
        <GycCatalog query={query} linkMode={linkMode} />
      ) : null}
      {searching ? null : children}
    </>
  );
}
