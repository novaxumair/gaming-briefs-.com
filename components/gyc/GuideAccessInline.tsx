import AccessCta from "@/components/gyc/AccessCta";
import { isBuyAvailable } from "@/lib/buy-links";

export default function GuideAccessInline({
  slug,
  gameName,
  message,
  align = "center",
}: {
  slug: string;
  gameName: string;
  message?: string;
  align?: "center" | "start";
}) {
  if (!isBuyAvailable(slug)) return null;

  return (
    <div className={`guide-access-inline guide-access-inline-${align}`}>
      {message ? <p className="guide-access-inline-copy">{message}</p> : null}
      <AccessCta slug={slug} gameName={gameName} size="lg" label="Get access" />
    </div>
  );
}
