"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !?.,-#@";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function RetroDieChar({
  char,
  delay,
  variant,
  phase,
}: {
  char: string;
  delay: number;
  variant: "label" | "title" | "body";
  phase: "enter" | "exit";
}) {
  const [display, setDisplay] = useState(phase === "enter" ? randomChar() : char);
  const [dead, setDead] = useState(false);

  useEffect(() => {
    if (char === " ") {
      setDisplay(" ");
      return;
    }

    setDead(false);
    const scrambleSteps = phase === "enter" ? 6 : 4;
    const intervalMs = phase === "enter" ? 38 : 28;
    let step = 0;

    const startTimer = window.setTimeout(
      () => {
        const interval = window.setInterval(() => {
          step += 1;

          if (phase === "enter") {
            setDisplay(step >= scrambleSteps ? char : randomChar());
            if (step >= scrambleSteps) {
              window.clearInterval(interval);
            }
            return;
          }

          if (step >= scrambleSteps) {
            setDisplay("▪");
            setDead(true);
            window.clearInterval(interval);
            return;
          }

          setDisplay(randomChar());
        }, intervalMs);

        return () => window.clearInterval(interval);
      },
      phase === "enter" ? delay * 1000 : delay * 500,
    );

    return () => window.clearTimeout(startTimer);
  }, [char, delay, phase]);

  if (char === " ") {
    return <span className="inline-block w-[0.35em]" aria-hidden />;
  }

  const styles = {
    label: "font-display text-[9px] text-[#4ade80]/45 tracking-[0.3em]",
    title: "font-display text-sm sm:text-base md:text-lg text-[#bbf7d0]",
    body: "font-body text-xs sm:text-sm text-[#86efac]/70",
  };

  return (
    <span
      className={cn(
        "inline-block",
        styles[variant],
        phase === "enter" && !dead && "animate-flap-tick",
        phase === "exit" && dead && "opacity-0 blur-[1px]",
        phase === "exit" && !dead && "text-[#4ade80]/30",
      )}
      style={{
        transition: dead ? "opacity 0.15s ease-out, filter 0.15s ease-out" : undefined,
        textShadow: variant === "title" ? "0 0 18px rgba(74,222,128,0.28)" : undefined,
      }}
    >
      {display}
    </span>
  );
}

function RetroDieLine({
  text,
  variant,
  phase,
  charDelay = 0.018,
}: {
  text: string;
  variant: "label" | "title" | "body";
  phase: "enter" | "exit";
  charDelay?: number;
}) {
  const segments =
    variant === "body"
      ? text.split(" ").map((word, wordIndex) => ({ key: `${word}-${wordIndex}`, word }))
      : [{ key: text, word: text }];

  return (
    <div
      className={cn(
        "flex flex-wrap gap-x-[0.12em] gap-y-1",
        variant === "label" && "uppercase",
        variant === "title" && "leading-snug",
        variant === "body" && "font-body leading-relaxed",
      )}
    >
      {segments.map(({ key, word }, wordIndex) => (
        <span key={key} className="inline-flex whitespace-nowrap">
          {word.split("").map((char, index) => (
            <RetroDieChar
              key={`${key}-${index}`}
              char={variant === "body" ? char : char.toUpperCase()}
              delay={wordIndex * 0.08 + index * charDelay}
              variant={variant}
              phase={phase}
            />
          ))}
          {variant === "body" && wordIndex < segments.length - 1 && (
            <span className="inline-block w-[0.35em]" aria-hidden />
          )}
        </span>
      ))}
    </div>
  );
}

export function RetroDieGuideText({
  counter,
  title,
  titleHref,
  description,
  phase,
}: {
  counter: string;
  title: string;
  titleHref?: string;
  description: string;
  phase: "enter" | "exit";
}) {
  const titleLine = <RetroDieLine text={title} variant="title" phase={phase} charDelay={0.016} />;

  return (
    <div className="space-y-3">
      <RetroDieLine text={counter} variant="label" phase={phase} charDelay={0.012} />
      {titleHref ? (
        <Link
          href={titleHref}
          className="inline-block transition hover:text-[#86efac] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4ade80]/50"
        >
          {titleLine}
        </Link>
      ) : (
        titleLine
      )}
      <RetroDieLine text={description} variant="body" phase={phase} charDelay={0.008} />
    </div>
  );
}
