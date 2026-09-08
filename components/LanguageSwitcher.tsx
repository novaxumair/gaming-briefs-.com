"use client";

import { useEffect, useState } from "react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "pt", label: "Português" },
  { code: "ja", label: "日本語" },
] as const;

type LanguageSwitcherProps = {
  variant?: "pill" | "nav";
};

export default function LanguageSwitcher({
  variant = "pill",
}: LanguageSwitcherProps) {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("gwd-locale");
    if (saved && LANGUAGES.some((lang) => lang.code === saved)) {
      setLocale(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  function handleChange(nextLocale: string) {
    setLocale(nextLocale);
    window.localStorage.setItem("gwd-locale", nextLocale);
    document.documentElement.lang = nextLocale;
  }

  if (variant === "nav") {
    return (
      <label className="relative inline-flex items-center font-onest text-sm font-semibold text-[#ABB0C7] transition hover:text-white">
        <span className="sr-only">Change language</span>
        <select
          value={locale}
          onChange={(event) => handleChange(event.target.value)}
          className="cursor-pointer appearance-none bg-transparent py-1 pl-0 pr-5 text-inherit focus:outline-none"
          aria-label="Change language"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-[#120f2a]">
              {lang.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#ABB0C7]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </label>
    );
  }

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Change language</span>
      <svg
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gwd-muted"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 21a9 9 0 100-18 9 9 0 000 18z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3.6 9h16.8M3.6 15h16.8M12 3c2.2 2.6 3.4 5.8 3.4 9s-1.2 6.4-3.4 9c-2.2-2.6-3.4-5.8-3.4-9s1.2-6.4 3.4-9z"
        />
      </svg>
      <select
        value={locale}
        onChange={(event) => handleChange(event.target.value)}
        className="h-[42px] min-w-[132px] cursor-pointer appearance-none rounded-full border border-gwd-border bg-[#121722] py-2 pl-10 pr-8 text-[13px] font-medium text-white transition hover:border-gwd-muted focus:border-gwd-accent focus:outline-none"
        aria-label="Change language"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-[#121722]">
            {lang.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gwd-muted"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </label>
  );
}
