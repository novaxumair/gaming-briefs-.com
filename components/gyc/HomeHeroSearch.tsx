const SEARCH_PLACEHOLDER = "Search articles, guides, game updates...";

export default function HomeHeroSearch() {
  return (
    <div className="site-search-row mt-4 w-full max-w-xl">
      <form action="/articles" method="get" className="relative w-full">
        <input
          type="search"
          name="q"
          aria-label={SEARCH_PLACEHOLDER}
          placeholder={SEARCH_PLACEHOLDER}
          className="w-full rounded-full border border-[#4ade80]/35 bg-[#0a0f0a]/60 py-3 pl-11 pr-24 font-body text-sm text-[#bbf7d0] shadow-[0_0_20px_rgba(74,222,128,0.08)] focus:border-[#4ade80]/65 focus:outline-none focus:ring-1 focus:ring-[#4ade80]/25 sm:py-3.5 sm:text-base"
        />
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#4ade80]/70">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] px-4 py-2 font-display text-[10px] uppercase tracking-wider text-[#0a0f0a] sm:px-5 sm:py-2.5 sm:text-xs"
        >
          Go
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>
    </div>
  );
}
