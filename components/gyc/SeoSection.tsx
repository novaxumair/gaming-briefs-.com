import Link from "next/link";
import { SITE, getGameUrl, getGuideUrl } from "@/lib/data";

const POPULAR_GUIDES = [
  { slug: "valorant", label: "Valorant" },
  { slug: "warzone", label: "Call of Duty: Warzone" },
  { slug: "destiny-2", label: "Destiny 2" },
  { slug: "rainbow-six-siege", label: "Rainbow Six Siege" },
  { slug: "sea-of-thieves", label: "Sea of Thieves" },
] as const;

export default function GycSeoSection({ variant = "home" }: { variant?: "home" | "articles" }) {
  const aboutTitle =
    variant === "articles" ? "About the Cheats Intel guide library" : "About Cheats Intel";

  return (
    <section className="site-container pb-8 pt-10">
      <div className="site-prose text-left">
        <h2>{aboutTitle}</h2>
        {variant === "articles" ? (
          <p>
            The{" "}
            <Link href="/articles" className="site-prose-link">
              cheat guides library
            </Link>{" "}
            lists every title on {SITE.domainHost} with feature breakdowns, gameplay previews,
            and buyer FAQs. Open a guide to compare aimbot, ESP, wallhack, and spoofer tiers
            before checkout.
          </p>
        ) : (
          <p>
            <Link href="/" className="site-prose-link">
              Cheats Intel
            </Link>{" "}
            is built for players who want clear, readable guides before they buy. Every listing
            focuses on practical tools people actually search for: aimbot tracking, ESP overlays,
            wallhack visibility, loot filters, trigger helpers, and HWID spoofer paths when a
            clean load is required after a hardware ban.
          </p>
        )}
        <p>
          Instead of vague Discord screenshots, each product page explains what ships on the
          active build, how delivery works after payment, and how this offer compares with
          common market channels. That structure helps you choose a cheat with fewer surprises
          and fewer abandoned reseller accounts.
        </p>

        <h2>How to research aimbot, ESP, and wallhack options</h2>
        {variant === "articles" ? (
          <p>
            Scroll the featured guide list below to jump straight into a game page, or use the{" "}
            <Link href="/" className="site-prose-link">
              homepage search
            </Link>{" "}
            to filter by title.
          </p>
        ) : (
          <p>
            Start on the{" "}
            <Link href="/" className="site-prose-link">
              homepage
            </Link>
            , search for your title, then open the matching guide. Popular shooters and survival
            games sit near the top of the grid so you can move quickly from browsing into a full
            feature checklist.
          </p>
        )}
        <p>
          Look for aimbot FOV and smoothing notes, ESP box or skeleton options, wallhack distance
          limits, stream-proof overlays, and whether a spoofer is included or sold separately.
          Those details matter more than marketing labels like “lifetime undetected.”
        </p>

        <h2>What a strong guide page should include</h2>
        <p>
          A useful aimbot section names bone priority, smooth aim, silent options, and FOV limits.
          A useful ESP or wallhack section names player boxes, health, distance, loot categories,
          and whether the overlay can stay hidden from capture software. When those points are
          missing, you are guessing from cropped images.
        </p>
        <p>
          Guides on {SITE.domainHost} keep those topics on the page intentionally so searchers and
          readers land on the same information. Buyer FAQs cover patch risk, delivery speed, and{" "}
          <Link href="/support" className="site-prose-link">
            support paths
          </Link>{" "}
          in plain language.
        </p>

        <h2>Buying notes and status honesty</h2>
        <p>
          Anti-cheat updates can change detection status overnight. Honest guides treat
          “undetected” as temporary and tell you to re-check status before every session. Instant
          delivery should mean license or loader access after payment clears — not waiting hours
          for a private message.
        </p>
        <p>
          If you already face a hardware ban, confirm the HWID spoofer path before the first
          launch. If you only need vision assistance, an ESP-focused tier can be enough. If you
          want aim assistance plus vision tools, pick a fuller pack and read the comparison ticks
          carefully.
        </p>

        <h2>Why Cheats Intel exists</h2>
        <p>
          Most people looking for game cheats waste time across Telegram sellers, cracked pastes,
          and storefronts that hide features until after checkout. {SITE.name} centralizes
          title-by-title guides so aimbot, ESP, wallhack, and spoofer research stays on one
          domain with stable URLs.
        </p>
        <p className="mb-0">
          Bookmark the{" "}
          <Link href="/" className="site-prose-link">
            homepage
          </Link>{" "}
          when you need a fast overview, then dive into{" "}
          {POPULAR_GUIDES.map((game, index) => (
            <span key={game.slug}>
              {index > 0 ? (index === POPULAR_GUIDES.length - 1 ? ", and " : ", ") : null}
              <Link
                href={variant === "articles" ? getGuideUrl(game.slug) : getGameUrl(game.slug)}
                className="site-prose-link"
              >
                {game.label}
              </Link>
            </span>
          ))}
          , and other featured titles. Use the search field to filter cards, open a{" "}
          <Link href="/articles" className="site-prose-link">
            cheat guide
          </Link>
          , verify features, then checkout when the offer matches how you play. Questions?{" "}
          <Link href="/contact" className="site-prose-link">
            Contact support
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
