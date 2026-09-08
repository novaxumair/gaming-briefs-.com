import Link from "next/link";
import type { StaticPageContent, StaticParagraph } from "@/lib/static-pages";

function renderParagraph(part: StaticParagraph) {
  if (typeof part === "string") return part;

  return part.map((segment, index) =>
    typeof segment === "string" ? (
      segment
    ) : (
      <Link key={`${segment.href}-${index}`} href={segment.href} className="gyc-simple-link">
        {segment.label}
      </Link>
    ),
  );
}

export default function GycSimplePage({ page }: { page: StaticPageContent }) {
  return (
    <div className="site-static-page">
      <div className="site-static-inner">
        <div className="gyc-simple-card">
          <h1 className="gyc-simple-title">{page.h1}</h1>
          {page.paragraphs.map((paragraph) => (
            <p key={JSON.stringify(paragraph).slice(0, 48)} className="gyc-simple-text">
              {renderParagraph(paragraph)}
            </p>
          ))}
          <p className="gyc-simple-text mt-4">
            Return to the{" "}
            <Link href="/" className="gyc-simple-link">
              homepage
            </Link>
            , browse{" "}
            <Link href="/blogs" className="gyc-simple-link">
              cheat guides
            </Link>
            , visit the{" "}
            <Link href="/support" className="gyc-simple-link">
              help center
            </Link>
            , or{" "}
            <Link href="/contact" className="gyc-simple-link">
              contact support
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
