import type { Metadata } from "next";
import ReviewsPageContent from "@/components/reviews/ReviewsPageContent";
import { SITE } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Reviews | ${SITE.name}`,
  description: "Reader reviews for Cheats Intel game guides and cheat breakdowns.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return <ReviewsPageContent />;
}
