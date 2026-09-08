"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { RetroDieGuideText } from "@/components/ui/retro-die-text";
import { FEATURED_GUIDES } from "@/lib/featured-guides";
import { getGameUrl } from "@/lib/data";

const GUIDE_CARDS = FEATURED_GUIDES.map((guide) => ({
  slug: guide.slug,
  title: guide.title,
  description: guide.description,
  image: guide.image,
  href: getGameUrl(guide.slug),
}));

const PANEL_HEIGHT = 420;
const IMAGE_SIZE = 360;
const DIE_EXIT_MS = 780;

function getActiveIndex(scrollTop: number, maxScroll: number, total: number) {
  if (maxScroll <= 0) return 0;
  const progress = scrollTop / maxScroll;
  return Math.min(total - 1, Math.max(0, Math.floor(progress * total + 0.001)));
}

function GuideTextOverlay({
  activeIndex,
  panelHeight,
}: {
  activeIndex: number;
  panelHeight: number;
}) {
  const [visibleIndex, setVisibleIndex] = useState(activeIndex);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const pendingIndex = useRef(activeIndex);
  const exitTimer = useRef<number | null>(null);

  useEffect(() => {
    pendingIndex.current = activeIndex;

    if (activeIndex === visibleIndex && phase === "enter") {
      return;
    }

    if (phase === "exit") {
      return;
    }

    setPhase("exit");
  }, [activeIndex, visibleIndex, phase]);

  useEffect(() => {
    if (phase !== "exit") return;

    exitTimer.current = window.setTimeout(() => {
      setVisibleIndex(pendingIndex.current);
      setPhase("enter");
      exitTimer.current = null;
    }, DIE_EXIT_MS);

    return () => {
      if (exitTimer.current !== null) {
        window.clearTimeout(exitTimer.current);
        exitTimer.current = null;
      }
    };
  }, [phase]);

  const card = GUIDE_CARDS[visibleIndex];

  return (
    <div
      className="pointer-events-none sticky top-0 z-[60] flex w-full items-center px-4 sm:px-6"
      style={{ height: panelHeight, marginBottom: -panelHeight }}
    >
      <div className="relative w-full max-w-[48%] pr-2 sm:pr-3 pointer-events-auto">
        <RetroDieGuideText
          key={`${visibleIndex}-${phase}`}
          phase={phase}
          counter={`0${visibleIndex + 1} / 0${GUIDE_CARDS.length}`}
          title={card.title}
          titleHref={card.href}
          description={card.description}
        />
      </div>
    </div>
  );
}

export default function GuideCardStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = GUIDE_CARDS.length;
  const scrollHeight = total * PANEL_HEIGHT;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateActiveIndex = () => {
      const maxScroll = el.scrollHeight - el.clientHeight;
      setActiveIndex(getActiveIndex(el.scrollTop, maxScroll, total));
    };

    updateActiveIndex();
    el.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      el.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [total, scrollHeight]);

  return (
    <section className="guide-stack-section relative py-8 sm:py-10">
      <div className="site-container mb-5 text-center sm:mb-6">
        <span className="font-display text-[10px] uppercase tracking-[0.35em] text-[#4ade80]/70 sm:text-xs">
          Featured Articles
        </span>
        <h2
          className="font-display mt-2 text-lg text-[#bbf7d0] sm:text-xl md:text-2xl"
          style={{ textShadow: "0 0 24px rgba(74,222,128,0.35)" }}
        >
          TOP PICKS
        </h2>
        <p className="mx-auto mt-2 max-w-md font-body text-xs text-[#86efac]/55 sm:text-sm">
          Scroll inside the panel — one guide at a time.
        </p>
      </div>

      <div
        ref={containerRef}
        className="guide-stack-scroll relative mx-auto w-full max-w-6xl overflow-auto rounded-2xl border border-[#4ade80]/10 bg-[#0a0f0a]/25 backdrop-blur-sm"
        style={{ height: PANEL_HEIGHT }}
      >
        <GuideTextOverlay activeIndex={activeIndex} panelHeight={PANEL_HEIGHT} />

        <div style={{ height: scrollHeight }}>
          <CardStack
            totalCards={total}
            scaleMultiplier={0.03}
            scrollContainer={containerRef}
            className="w-full"
          >
            {GUIDE_CARDS.map((card, index) => (
              <CardStackItem
                key={card.title}
                index={index}
                style={{ height: PANEL_HEIGHT }}
              >
                <div className="flex h-full w-full items-center justify-end px-4 sm:px-6">
                  <div
                    className="relative aspect-square shrink-0 overflow-hidden rounded-md border border-[#4ade80]/15 bg-[#0a0f0a]/40"
                    style={{
                      width: `min(${IMAGE_SIZE}px, 46vw)`,
                      height: `min(${IMAGE_SIZE}px, 46vw)`,
                    }}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      loading="lazy"
                      className="object-contain object-center"
                      sizes="(max-width: 768px) 48vw, 360px"
                      style={{
                        filter:
                          "saturate(0.9) contrast(1.05) drop-shadow(0 0 20px rgba(74,222,128,0.18))",
                      }}
                    />
                  </div>
                </div>
              </CardStackItem>
            ))}
          </CardStack>
        </div>
      </div>
    </section>
  );
}
