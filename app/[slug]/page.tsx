import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuidePageContent from "@/components/gyc/GuidePageContent";
import {
  gameKeywords,
  gameMetaDescription,
  gameMetaTitle,
  getGameUrl,
  getGuide,
  getGuideByParam,
  getGuideUrl,
  guideKeywords,
  guideMetaDescription,
  guideMetaTitle,
  guides,
} from "@/lib/data";
import { buildPageMetadata, gameSchema, guideSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

type PageVariant = "full" | "cheats";

function resolveGuide(param: string): { guide: (typeof guides)[number]; variant: PageVariant } | null {
  if (param.endsWith("-cheats")) {
    const guide = getGuideByParam(param);
    return guide ? { guide, variant: "cheats" } : null;
  }

  const guide = getGuide(param);
  return guide ? { guide, variant: "full" } : null;
}

export async function generateStaticParams() {
  return guides.flatMap((guide) => [{ slug: guide.slug }, { slug: `${guide.slug}-cheats` }]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveGuide(slug);
  if (!resolved) return {};

  const { guide, variant } = resolved;

  if (variant === "full") {
    return buildPageMetadata({
      title: gameMetaTitle(guide.gameName),
      description: gameMetaDescription(guide.gameName),
      path: getGameUrl(guide.slug),
      keywords: gameKeywords(guide.gameName),
      ogType: "article",
      image: guide.image,
    });
  }

  return buildPageMetadata({
    title: guideMetaTitle(guide.gameName),
    description: guideMetaDescription(guide.gameName),
    path: getGuideUrl(guide.slug),
    keywords: guideKeywords(guide.gameName),
    ogType: "article",
    image: guide.image,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const resolved = resolveGuide(slug);
  if (!resolved) notFound();

  const { guide, variant } = resolved;
  const related = guides.filter((item) => item.slug !== guide.slug).slice(0, 6);
  const schema = variant === "full" ? gameSchema(guide) : guideSchema(guide);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <GuidePageContent guide={guide} related={related} variant={variant} />
    </>
  );
}
