"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !?.,-'\"";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function FlapChar({
  target,
  delay,
  duration,
}: {
  target: string;
  delay: number;
  duration: number;
}) {
  const [display, setDisplay] = useState(target);
  const [flipping, setFlipping] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const startTimer = window.setTimeout(() => {
      setFlipping(true);
      const scrambleSteps = 5;
      let step = 0;

      const interval = window.setInterval(() => {
        step += 1;
        setDisplay(step >= scrambleSteps ? target : randomChar());
        if (step >= scrambleSteps) {
          window.clearInterval(interval);
          window.setTimeout(() => setFlipping(false), duration * 1000 * 0.4);
        }
      }, (duration * 1000) / (scrambleSteps + 2));

      return () => window.clearInterval(interval);
    }, delay * 1000);

    return () => window.clearTimeout(startTimer);
  }, [target, delay, duration, mounted]);

  if (target === " ") {
    return <span className="inline-block w-[0.35em]" aria-hidden />;
  }

  return (
    <span
      className={cn(
        "font-display inline-block text-lg text-[#86efac] sm:text-xl md:text-2xl",
        "drop-shadow-[0_0_10px_rgba(74,222,128,0.55)]",
        flipping && "animate-flap-tick opacity-90",
      )}
      aria-hidden={false}
    >
      {display}
    </span>
  );
}

export function TextFlippingBoard({
  text,
  duration = 1.1,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}) {
  const rows = useMemo(() => text.split("\n"), [text]);

  return (
    <div
      className={cn(
        "inline-flex max-w-full flex-col items-center gap-3 px-2 py-2 sm:gap-4",
        className,
      )}
      aria-live="polite"
    >
      {rows.map((row, rowIdx) => (
        <div
          key={`${text}-${rowIdx}`}
          className="flex flex-wrap justify-center gap-x-[0.12em] gap-y-1 tracking-[0.08em]"
        >
          {row.split("").map((char, index) => (
            <FlapChar
              key={`${text}-${rowIdx}-${index}`}
              target={char.toUpperCase()}
              delay={index * 0.022}
              duration={duration}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
