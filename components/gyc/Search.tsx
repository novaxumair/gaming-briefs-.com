"use client";

import { useEffect, useState } from "react";

const SEARCH_PLACEHOLDER = "Search articles, guides, game updates...";
/** Reserve space for Go label + arrow so marquee text never overlaps the button. */
const GO_BUTTON_INSET = "5.75rem";

export default function GycSearch({
  onSearch,
  initialQuery = "",
}: {
  onSearch: (query: string) => void;
  initialQuery?: string;
}) {
  const [value, setValue] = useState(initialQuery);
  const [focused, setFocused] = useState(false);
  const showMarquee = !value && !focused;

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(value.trim());
  }

  return (
    <div className="site-search-row mt-4 w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative w-full">
        <input
          type="search"
          aria-label={SEARCH_PLACEHOLDER}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            setValue(e.target.value);
            onSearch(e.target.value);
          }}
          className="w-full rounded-full border border-[#4ade80]/35 bg-[#0a0f0a]/60 py-3 pl-11 font-body text-sm text-[#bbf7d0] shadow-[0_0_20px_rgba(74,222,128,0.08)] focus:border-[#4ade80]/65 focus:outline-none focus:ring-1 focus:ring-[#4ade80]/25 sm:py-3.5 sm:text-base"
          style={{ paddingRight: GO_BUTTON_INSET }}
        />
        {showMarquee ? (
          <div
            className="pointer-events-none absolute inset-y-0 left-11 overflow-hidden"
            style={{
              right: GO_BUTTON_INSET,
              maskImage: "linear-gradient(to right, black 72%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, black 72%, transparent 100%)",
            }}
            aria-hidden
          >
            <div className="gyc-search-marquee-track flex h-full items-center">
              <span className="gyc-search-marquee-text whitespace-nowrap font-body text-sm text-[#86efac]/35 sm:text-base">
                {SEARCH_PLACEHOLDER}
                <span className="mx-8 opacity-50">·</span>
                {SEARCH_PLACEHOLDER}
              </span>
            </div>
          </div>
        ) : null}
        <div className="pointer-events-none absolute inset-y-0 flex items-center pl-4">
          <svg
            className="h-[18px] w-[18px] text-[#4ade80]/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex min-w-[5.75rem] items-center justify-end gap-1.5 rounded-r-full bg-gradient-to-l from-[#0a0f0a]/95 via-[#0a0f0a]/75 to-transparent pl-3 pr-4 font-display text-[10px] uppercase tracking-wider text-[#4ade80]/85 transition hover:text-[#86efac] sm:text-[11px]"
          aria-label="Search"
        >
          Go
          <svg
            className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.25}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
    </div>
  );
}
