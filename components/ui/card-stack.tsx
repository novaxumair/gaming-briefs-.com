"use client";

import {
  createContext,
  useContext,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/cn";

interface CardStackContextValue {
  progress: MotionValue<number>;
  scaleMultiplier: number;
  totalCards: number;
}

const CardStackContext = createContext<CardStackContextValue | null>(null);

export function useCardStack() {
  const context = useContext(CardStackContext);
  if (!context) {
    throw new Error("useCardStack must be used within CardStack");
  }
  return context;
}

function useCardStackContext() {
  return useCardStack();
}

export function CardStack({
  totalCards,
  scaleMultiplier = 0.03,
  className,
  scrollContainer,
  children,
}: {
  totalCards: number;
  scaleMultiplier?: number;
  className?: string;
  scrollContainer?: RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer,
    offset: ["start start", "end end"],
  });

  return (
    <CardStackContext.Provider
      value={{
        progress: scrollYProgress,
        scaleMultiplier,
        totalCards: Math.max(totalCards, 1),
      }}
    >
      <div ref={containerRef} className={cn("relative", className)}>
        {children}
      </div>
    </CardStackContext.Provider>
  );
}

export function CardStackItem({
  index,
  topPosition,
  className,
  style,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  index: number;
  topPosition?: string;
}) {
  const { progress, scaleMultiplier, totalCards } = useCardStackContext();
  const scaleTo = 1 - (totalCards - index) * scaleMultiplier;
  const scale = useTransform(progress, [index / totalCards, 1], [1, scaleTo]);
  const top = topPosition ?? `${5 + index * 3}%`;

  return (
    <div
      className={cn("sticky top-0 h-full", className)}
      style={{ zIndex: index + 1, ...style }}
      {...props}
    >
      <motion.div
        style={{ top, scale }}
        className="relative h-full w-full origin-top will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
