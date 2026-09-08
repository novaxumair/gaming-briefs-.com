import Link from "next/link";
import { FEATURED_GUIDES } from "@/lib/featured-guides";
import { getGameUrl } from "@/lib/data";

export default function FeaturedGuideLinks() {
  return (
    <nav className="sr-only" aria-label="Featured game guides">
      <ul>
        {FEATURED_GUIDES.map((guide) => (
          <li key={guide.slug}>
            <Link href={getGameUrl(guide.slug)}>{guide.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
