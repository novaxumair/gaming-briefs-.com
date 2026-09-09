"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SEARCH_PLACEHOLDER = "Search articles, guides, game updates...";

export default function HeaderSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setOpen(false);
    router.push(`/articles?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div ref={containerRef} className="relative flex items-center">
      {open ? (
        <form onSubmit={handleSubmit} className="flex items-center">
          <label htmlFor="header-search" className="sr-only">
            {SEARCH_PLACEHOLDER}
          </label>
          <input
            ref={inputRef}
            id="header-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={SEARCH_PLACEHOLDER}
            className="w-56 rounded-full border border-[#4ade80]/35 bg-[#0a0f0a]/90 py-2 pl-9 pr-3 font-body text-sm text-[#bbf7d0] shadow-[0_0_16px_rgba(74,222,128,0.08)] focus:border-[#4ade80]/65 focus:outline-none focus:ring-1 focus:ring-[#4ade80]/25 xl:w-72"
          />
          <span className="pointer-events-none absolute left-3 text-[#4ade80]/70" aria-hidden>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-[#86efac]/60 transition hover:text-[#4ade80]"
          aria-label="Open search"
          aria-expanded={open}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
