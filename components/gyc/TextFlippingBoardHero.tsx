"use client";

import React, { useCallback, useEffect, useState } from "react";
import { TextFlippingBoard } from "@/components/ui/text-flipping-board";

const MESSAGES: string[] = [
  "GAME GUIDES\nCHEATS & TIPS\n- GAMING BRIEFS",
  "DOMINATE EVERY\nMATCH YOU PLAY",
  "PATCH NOTES\nBUILD GUIDES\nMETA BREAKDOWNS",
  "LEVEL UP FAST\nWIN MORE GAMES",
  "YOUR ULTIMATE\nGAMING INTEL HUB",
];

export default function TextFlippingBoardHero() {
  const [msgIdx, setMsgIdx] = useState(0);

  const next = useCallback(
    () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="flex w-full flex-col items-center justify-center py-2 pb-4 sm:py-3 sm:pb-5">
      <TextFlippingBoard text={MESSAGES[msgIdx]} />
    </div>
  );
}
