import Header from "@/components/Header";
import GycFooter from "@/components/gyc/Footer";
import SpaceWorldBackgroundLoader from "@/components/space/SpaceWorldBackgroundLoader";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import type { Metadata } from "next";
import "./globals.css";
import "./theme-overrides.css";
import "./space-world.css";
import { SITE } from "@/lib/data";
import { siteFontVariables } from "@/lib/fonts";
import { siteUrl } from "@/lib/site-url";

const homeUrl = siteUrl("/");

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: homeUrl,
    languages: {
      en: homeUrl,
      "x-default": homeUrl,
    },
  },
  icons: {
    icon: [
      { url: "/images/favicon-invader.png", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: homeUrl,
    locale: "en_US",
    images: [{ url: SITE.logoFull, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.logoFull],
  },
  appleWebApp: {
    title: SITE.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" data-theme="logo" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0f0a" />
        <meta name="description" content={SITE.description} />
        <link rel="canonical" href={homeUrl} />
        <link rel="alternate" hrefLang="en" href={homeUrl} />
        <link rel="alternate" hrefLang="x-default" href={homeUrl} />
        <link rel="icon" href="/images/favicon-invader.png" type="image/png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`space-world-site ${siteFontVariables}`}>
        <GoogleAnalytics gaId={SITE.gaId} />
        <SpaceWorldBackgroundLoader />
        <div className="space-world-ui">
          <Header />
          <main>{children}</main>
          <GycFooter />
        </div>
      </body>
    </html>
  );
}
