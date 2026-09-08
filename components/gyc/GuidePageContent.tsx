import ArticleGuide from "@/components/gyc/ArticleGuide";
import type { Guide } from "@/lib/data";

export default function GuidePageContent({
  guide,
  related,
  variant = "cheats",
}: {
  guide: Guide;
  related: Guide[];
  variant?: "full" | "cheats";
}) {
  return <ArticleGuide guide={guide} related={related} variant={variant} />;
}
