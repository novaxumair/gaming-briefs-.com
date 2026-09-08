import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GycSimplePage from "@/components/gyc/SimplePage";
import { getStaticPage, staticPages } from "@/lib/static-pages";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string[] }> };

export async function generateStaticParams() {
  return staticPages
    .filter((page) => page.path.startsWith("/policies/"))
    .map((page) => ({
      slug: page.path.replace("/policies/", "").split("/"),
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = `/policies/${slug.join("/")}`;
  const page = getStaticPage(path);
  if (!page) return {};

  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path,
  });
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const path = `/policies/${slug.join("/")}`;
  const page = getStaticPage(path);
  if (!page) notFound();

  return <GycSimplePage page={page} />;
}
