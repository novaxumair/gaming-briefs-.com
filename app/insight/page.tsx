import type { Metadata } from "next";
import GycSimplePage from "@/components/gyc/SimplePage";
import { getStaticPage } from "@/lib/static-pages";
import { buildPageMetadata } from "@/lib/seo";

const page = getStaticPage("/insight")!;

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function InsightPage() {
  return <GycSimplePage page={page} />;
}
