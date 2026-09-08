"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GuideCardStack = dynamic(() => import("@/components/gyc/GuideCardStack"), {
  ssr: false,
  loading: () => null,
});

export default function DeferredGuideCardStack() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(start, { timeout: 1800 });
      return;
    }
    window.setTimeout(start, 900);
  }, []);

  return (
    <section className="guide-stack-section min-h-[520px]" aria-label="Featured articles">
      {ready ? <GuideCardStack /> : null}
    </section>
  );
}
