"use client";

import dynamic from "next/dynamic";

const TextFlippingBoardHero = dynamic(() => import("@/components/gyc/TextFlippingBoardHero"), {
  ssr: false,
  loading: () => null,
});

export default function HeroFlipBoardSlot() {
  return (
    <div className="hero-flip-board-slot mx-auto min-h-[5.5rem] w-full max-w-3xl sm:min-h-[6.5rem]">
      <TextFlippingBoardHero />
    </div>
  );
}
