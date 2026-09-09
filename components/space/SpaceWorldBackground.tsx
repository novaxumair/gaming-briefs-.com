"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  computeScrollProgress,
  setMouseTarget,
  setRoutePhase,
  setScrollTarget,
  setUiHover,
  spaceWorldInput,
} from "@/lib/space-world/input-bridge";
import { preloadSpaceWorldEngine } from "@/lib/space-world/preload";
import type { SpaceWorldEngine } from "@/lib/space-world/SpaceWorldEngine";

const ROUTE_PHASES: Record<string, number> = {
  "/": 0,
  "/articles": 0.15,
  "/reviews": 0.25,
  "/contact": 0.5,
  "/about-us": 0.45,
  "/signin": 0.4,
};

const UI_SELECTOR =
  "a, button, input, textarea, [role='button'], .gyc-product-card, .site-top-nav";

export default function SpaceWorldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<SpaceWorldEngine | null>(null);
  const pathname = usePathname();
  const routePhaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let engine: SpaceWorldEngine | null = null;
    let effectsTimerId: ReturnType<typeof setTimeout> | null = null;
    let effectsIdleId: number | null = null;
    let scrollRaf = 0;
    let uiRaf = 0;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    spaceWorldInput.reducedMotion = reducedMotion;

    const boot = async () => {
      const [{ SpaceWorldEngine }, { getQualitySettings }] = await Promise.all([
        preloadSpaceWorldEngine(),
        import("@/lib/space-world/quality"),
      ]);
      if (cancelled || !canvas) return;

      const quality = getQualitySettings();
      try {
        engine = new SpaceWorldEngine(canvas, quality);
        engineRef.current = engine;
        engine.start();
        document.body.classList.add("space-world-active");

        const scheduleEffects = () => {
          if (cancelled || !engine) return;
          engine.initEffects();
        };

        if (typeof window.requestIdleCallback === "function") {
          effectsIdleId = window.requestIdleCallback(scheduleEffects, { timeout: 120 });
        } else {
          effectsTimerId = setTimeout(scheduleEffects, 16);
        }
      } catch (err) {
        console.error("[SpaceWorld] WebGL init failed:", err);
      }
    };

    void boot();

    const onResize = () => {
      engine?.resize(window.innerWidth, window.innerHeight);
    };
    onResize();
    window.addEventListener("resize", onResize, { passive: true });

    const onScroll = () => {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(() => {
        setScrollTarget(computeScrollProgress());
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseTarget(nx, ny);

      cancelAnimationFrame(uiRaf);
      uiRaf = requestAnimationFrame(() => {
        const hit = document.elementFromPoint(e.clientX, e.clientY);
        setUiHover(hit?.closest(UI_SELECTOR) ? 1 : 0);
      });
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onPointerLeave = () => setMouseTarget(0, 0);
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    const onVisibility = () => {
      if (!engine) return;
      if (document.hidden) engine.pause();
      else engine.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      document.body.classList.remove("space-world-active");
      cancelAnimationFrame(scrollRaf);
      cancelAnimationFrame(uiRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      if (effectsIdleId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(effectsIdleId);
      }
      if (effectsTimerId !== null) clearTimeout(effectsTimerId);
      engine?.dispose();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const target = ROUTE_PHASES[pathname] ?? 0.2;
    const start = routePhaseRef.current;
    const startTime = performance.now();
    const duration = 1200;

    let frame = 0;
    const animateRoute = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - (1 - t) ** 3;
      routePhaseRef.current = start + (target - start) * eased;
      setRoutePhase(routePhaseRef.current);
      if (t < 1) frame = requestAnimationFrame(animateRoute);
    };
    frame = requestAnimationFrame(animateRoute);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <>
      <div className="space-world-fallback" aria-hidden />
      <canvas ref={canvasRef} className="space-world-canvas" aria-hidden />
      <div className="space-world-vignette" aria-hidden />
      <div className="space-world-content-shade" aria-hidden />
    </>
  );
}
