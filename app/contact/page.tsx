import type { Metadata } from "next";
import GycSimplePage from "@/components/gyc/SimplePage";
import { getStaticPage } from "@/lib/static-pages";
import { buildPageMetadata } from "@/lib/seo";

const page = getStaticPage("/contact")!;

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: "/contact",
});

export default function ContactPage() {
  return <GycSimplePage page={page} />;
}
