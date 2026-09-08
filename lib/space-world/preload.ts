let engineModule: Promise<typeof import("./SpaceWorldEngine")> | null = null;

export function preloadSpaceWorldEngine() {
  if (!engineModule) {
    engineModule = import("./SpaceWorldEngine");
  }
  return engineModule;
}
