"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SpaceWorldBackground = dynamic(
  () => import("@/components/space/SpaceWorldBackground"),
  {
    ssr: false,
    loading: () => <div className="space-world-fallback" aria-hidden />,
  }
);

const BACKGROUND_IDLE_TIMEOUT_MS = 4000;

function scheduleBackgroundLoad(onReady: () => void) {
  const start = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(onReady, { timeout: BACKGROUND_IDLE_TIMEOUT_MS });
      return;
    }
    window.setTimeout(onReady, BACKGROUND_IDLE_TIMEOUT_MS);
  };

  if (document.readyState === "complete") {
    start();
    return;
  }

  window.addEventListener("load", start, { once: true });
}

export default function SpaceWorldBackgroundLoader() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    scheduleBackgroundLoad(() => setReady(true));
  }, [isHome]);

  if (!isHome || !ready) {
    return <div className="space-world-fallback" aria-hidden />;
  }

  return <SpaceWorldBackground />;
}
