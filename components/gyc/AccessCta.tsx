import BuyLink from "@/components/gyc/BuyLink";
import { getAccessLabel, getBuyUrl, isBuyAvailable } from "@/lib/buy-links";

type AccessCtaProps = {
  slug: string;
  gameName?: string;
  className?: string;
  label?: string;
  size?: "md" | "lg";
  fullWidth?: boolean;
};

export default function AccessCta({
  slug,
  gameName,
  className = "",
  label,
  size = "md",
  fullWidth = false,
}: AccessCtaProps) {
  const sizeClass = size === "lg" ? "access-cta-lg" : "";
  const widthClass = fullWidth ? "access-cta-full" : "";
  const classes = ["access-cta", sizeClass, widthClass, className].filter(Boolean).join(" ");

  if (!isBuyAvailable(slug)) {
    return (
      <span className={`${classes} access-cta-soon`.trim()} aria-disabled="true">
        Coming soon
      </span>
    );
  }

  const text = label ?? getAccessLabel(gameName);

  return (
    <BuyLink href={getBuyUrl(slug)} className={classes}>
      <span className="access-cta-shine" aria-hidden />
      <span className="access-cta-text">{text}</span>
    </BuyLink>
  );
}
