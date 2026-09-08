/** Mutable input state read by the WebGL loop — never triggers React updates. */
export type SpaceWorldInput = {
  mouseX: number;
  mouseY: number;
  mouseTargetX: number;
  mouseTargetY: number;
  scrollTarget: number;
  scrollCurrent: number;
  scrollVelocity: number;
  uiHover: number;
  routePhase: number;
  reducedMotion: boolean;
};

export const spaceWorldInput: SpaceWorldInput = {
  mouseX: 0,
  mouseY: 0,
  mouseTargetX: 0,
  mouseTargetY: 0,
  scrollTarget: 0,
  scrollCurrent: 0,
  scrollVelocity: 0,
  uiHover: 0,
  routePhase: 0,
  reducedMotion: false,
};

export function setMouseTarget(x: number, y: number): void {
  spaceWorldInput.mouseTargetX = x;
  spaceWorldInput.mouseTargetY = y;
}

export function setScrollTarget(normalized: number): void {
  spaceWorldInput.scrollTarget = normalized;
}

export function setUiHover(amount: number): void {
  spaceWorldInput.uiHover = amount;
}

export function setRoutePhase(phase: number): void {
  spaceWorldInput.routePhase = phase;
}

export function computeScrollProgress(): number {
  if (typeof document === "undefined") return 0;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollHeight <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / scrollHeight));
}
