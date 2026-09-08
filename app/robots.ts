import { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/store/",
        "/signin",
        "/api/",
        "/_source_backup/",
        "/_cheatseller_source/",
        "/agent-transcripts/",
      ],
    },
    sitemap: siteUrl("/sitemap.xml"),
  };
}
