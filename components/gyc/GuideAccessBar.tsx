"use client";

import AccessCta from "@/components/gyc/AccessCta";

export default function GuideAccessBar({
  slug,
  gameName,
}: {
  slug: string;
  gameName: string;
}) {
  return (
    <div className="guide-access-bar" role="region" aria-label="Get access">
      <div className="guide-access-bar-inner site-container">
        <p className="guide-access-bar-copy">
          Ready for <strong>{gameName}</strong> cheats?
        </p>
        <AccessCta slug={slug} gameName={gameName} size="lg" label="Get access" />
      </div>
    </div>
  );
}
