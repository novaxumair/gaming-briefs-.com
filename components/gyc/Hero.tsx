import type { ReactNode } from "react";
import HeroFlipBoardSlot from "@/components/gyc/HeroFlipBoardSlot";

export default function GycHero({
  title,
  description,
  children,
  compact = false,
  showFlipBoard = true,
}: {
  title: string;
  tagline?: string;
  description: string;
  children?: ReactNode;
  compact?: boolean;
  showFlipBoard?: boolean;
}) {
  const titleParts = title.split(/\s+/);
  const firstWord = titleParts[0] ?? title;
  const restWords = titleParts.slice(1).join(" ");

  return (
    <div className="relative overflow-hidden pb-2 pt-2 sm:pb-4">
      <div className="relative">
        <div className="site-container">
          <div className="site-hero-stack">
            <div className="site-hero-copy mx-auto max-w-2xl text-center">
              <h1 className="site-hero-title">
                {restWords ? (
                  <>
                    {firstWord}{" "}
                    <span
                      className="text-[#86efac]"
                      style={{ textShadow: "0 0 28px rgba(74,222,128,0.4)" }}
                    >
                      {restWords}
                    </span>
                  </>
                ) : (
                  title
                )}
              </h1>

              {compact ? null : (
                <p className="site-hero-lead mx-auto mt-3 max-w-lg font-body text-sm text-[#86efac]/70 sm:text-base">
                  {description}
                </p>
              )}

              {children ? <div className={compact ? "mt-3" : "mt-5"}>{children}</div> : null}
            </div>
          </div>

          {compact || !showFlipBoard ? null : <HeroFlipBoardSlot />}
        </div>
      </div>
    </div>
  );
}
