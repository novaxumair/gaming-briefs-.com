import {
  SITE,
  gameMetaDescription,
  gameMetaTitle,
  guideMetaDescription,
  guideMetaTitle,
  guideFaqs,
  guides,
  type Guide,
  getGameUrl,
  getGuideUrl,
} from "./data";
import { extendedFaqs } from "./guide-content";
import { siteUrl } from "./site-url";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  if (!path || path === "/") return siteUrl("/");
  return siteUrl(path);
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    name: SITE.name,
    url: siteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(SITE.logo),
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": siteUrl("/#website"),
    name: SITE.name,
    url: siteUrl("/"),
    publisher: { "@id": siteUrl("/#organization") },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl("/")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function catalogItemListSchema() {
  return {
    "@type": "ItemList",
    name: `${SITE.name} Featured Game Guides`,
    numberOfItems: guides.length,
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.gameName,
      url: absoluteUrl(getGameUrl(guide.slug)),
    })),
  };
}

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...organizationSchema(), "@id": siteUrl("/#organization") },
      websiteSchema(),
      catalogItemListSchema(),
    ],
  };
}

export function gameSchema(guide: Guide) {
  const url = siteUrl(getGameUrl(guide.slug));
  const title = gameMetaTitle(guide.gameName);
  const description = gameMetaDescription(guide.gameName);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
          { "@type": "ListItem", position: 2, name: guide.gameName, item: url },
        ],
      },
      {
        "@type": "Article",
        headline: title,
        description,
        image: absoluteUrl(guide.image),
        author: { "@type": "Organization", name: SITE.name },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          logo: { "@type": "ImageObject", url: absoluteUrl(SITE.logo) },
        },
        mainEntityOfPage: url,
        dateModified: new Date().toISOString().split("T")[0],
      },
      {
        "@type": "WebPage",
        "@id": url,
        name: title,
        description,
        isPartOf: { "@id": siteUrl("/#website") },
      },
      organizationSchema(),
    ],
  };
}

export function guideSchema(guide: Guide) {
  const url = siteUrl(getGuideUrl(guide.slug));
  const title = guideMetaTitle(guide.gameName);
  const description = guideMetaDescription(guide.gameName);
  const faqs = [...guideFaqs(guide.gameName), ...extendedFaqs(guide.gameName)];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blogs", item: siteUrl("/blogs") },
          { "@type": "ListItem", position: 3, name: `${guide.gameName} Cheats`, item: url },
        ],
      },
      {
        "@type": "Product",
        name: title,
        description,
        image: absoluteUrl(guide.image),
        brand: { "@type": "Brand", name: SITE.name },
        offers: {
          "@type": "Offer",
          url,
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "Article",
        headline: title,
        description,
        image: absoluteUrl(guide.image),
        author: { "@type": "Organization", name: SITE.name },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          logo: { "@type": "ImageObject", url: absoluteUrl(SITE.logo) },
        },
        mainEntityOfPage: url,
        dateModified: new Date().toISOString().split("T")[0],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "WebPage",
        "@id": url,
        name: title,
        description,
        isPartOf: { "@id": siteUrl("/#website") },
      },
      organizationSchema(),
    ],
  };
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  ogType = "website",
  image,
  indexable = true,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogType?: "website" | "article";
  image?: string;
  indexable?: boolean;
}) {
  const url = siteUrl(path);
  const imageUrl = image ? absoluteUrl(image) : absoluteUrl(SITE.logoFull);

  return {
    title: {
      absolute: title,
    },
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "x-default": url,
      },
    },
    robots: indexable
      ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      : { index: false, follow: false },
    openGraph: {
      type: ogType,
      siteName: SITE.name,
      title,
      description,
      url,
      locale: "en_US",
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [imageUrl],
    },
  };
}
