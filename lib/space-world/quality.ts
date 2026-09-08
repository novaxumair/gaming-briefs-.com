export type QualityTier = "high" | "medium" | "low";

export type QualitySettings = {
  tier: QualityTier;
  starCount: number;
  shipCount: number;
  maxParticles: number;
  maxLasers: number;
  explosionRate: number;
  dprCap: number;
  nebulaLayers: number;
  planetCount: number;
  enableBloom: boolean;
};

function detectMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window;
}

function detectLowPower(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
  if (nav.deviceMemory && nav.deviceMemory <= 4) return true;
  if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) return true;
  return false;
}

export function getQualitySettings(): QualitySettings {
  const mobile = detectMobile();
  const lowPower = detectLowPower();

  if (mobile) {
    return {
      tier: "low",
      starCount: 700,
      shipCount: 1,
      maxParticles: 40,
      maxLasers: 4,
      explosionRate: 0.1,
      dprCap: 1,
      nebulaLayers: 1,
      planetCount: 0,
      enableBloom: false,
    };
  }

  if (lowPower) {
    return {
      tier: "medium",
      starCount: 1800,
      shipCount: 2,
      maxParticles: 80,
      maxLasers: 8,
      explosionRate: 0.2,
      dprCap: 1.25,
      nebulaLayers: 1,
      planetCount: 1,
      enableBloom: false,
    };
  }

  return {
    tier: "high",
    starCount: 3200,
    shipCount: 4,
    maxParticles: 160,
    maxLasers: 12,
    explosionRate: 0.3,
    dprCap: 1.75,
    nebulaLayers: 2,
    planetCount: 2,
    enableBloom: false,
  };
}
