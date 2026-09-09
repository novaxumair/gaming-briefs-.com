export type StaticParagraphPart = string | { href: string; label: string };
export type StaticParagraph = string | StaticParagraphPart[];

export interface StaticPageContent {
  path: string;
  title: string;
  description: string;
  h1: string;
  paragraphs: StaticParagraph[];
}

export const staticPages: StaticPageContent[] = [
  {
    path: "/contact",
    title: "Contact | Cheats Intel Support",
    description:
      "Contact Cheats Intel for load help, checkout questions, license lookup, and buyer support.",
    h1: "Contact Cheats Intel",
    paragraphs: [
      "Need help with a loader, license delivery, or comparing aimbot and ESP tiers before checkout? Contact us with your game title, order email, and a short description of the issue.",
      [
        "Support covers delivery questions, HWID spoofer setup, patch-status notes, and account lookup for guest purchases. For step-by-step load help, start on the ",
        { href: "/support", label: "help center" },
        " before opening a ticket here.",
      ],
    ],
  },
  {
    path: "/support",
    title: "Load Help & Support | Cheats Intel",
    description:
      "Load help, setup notes, and buyer support for Cheats Intel game cheat guides.",
    h1: "Load help & support",
    paragraphs: [
      [
        "Need help loading a build, reading a feature list, or comparing aimbot and ESP tiers? Start on the ",
        { href: "/", label: "homepage" },
        ", open the guide for your game from the ",
        { href: "/articles", label: "cheat guides" },
        ", then ",
        { href: "/contact", label: "contact us" },
        " if the loader or license step fails.",
      ],
      "Support covers delivery questions, HWID spoofer paths, and patch-status notes. We do not troubleshoot cracked pastes or third-party resellers — only guides and offers listed on this domain.",
    ],
  },
  {
    path: "/about-us",
    title: "About Us | Cheats Intel",
    description:
      "Learn what Cheats Intel is, how the cheat guides catalog works, and why the site exists.",
    h1: "About Cheats Intel",
    paragraphs: [
      [
        "Cheats Intel is a title-by-title ",
        { href: "/articles", label: "cheat guides" },
        ". Each page documents aimbot, ESP, wallhack, and spoofer coverage in plain language so buyers can compare features before checkout.",
      ],
      [
        "The site keeps stable guide URLs — for example our ",
        { href: "/valorant-cheats", label: "Valorant cheat guide" },
        " — plus a searchable ",
        { href: "/", label: "homepage" },
        " and buyer FAQs on one domain.",
      ],
    ],
  },
  {
    path: "/insight",
    title: "Insights | Cheats Intel",
    description:
      "Insights and updates on cheat guides, patch notes, and catalog changes at Cheats Intel.",
    h1: "Insights",
    paragraphs: [
      [
        "Insights covers catalog updates, newly listed games on the ",
        { href: "/", label: "homepage" },
        ", and notes on how aimbot, ESP, and wallhack builds change after major patches.",
      ],
      [
        "Bookmark the ",
        { href: "/articles", label: "cheat guides" },
        " for the full grid, or return here when you want a quick read on what changed across popular shooters and survival titles.",
      ],
    ],
  },
  {
    path: "/fees",
    title: "Fees | Cheats Intel",
    description:
      "Fee and pricing notes for Cheats Intel cheat guide listings and checkout paths.",
    h1: "Fees",
    paragraphs: [
      [
        "Pricing varies by game, build tier, and license length. Each ",
        { href: "/articles", label: "product guide" },
        " lists what the active offer includes so you can compare value before paying.",
      ],
      [
        "Payment processing fees may apply depending on your checkout method. Final totals are shown before you confirm payment. Questions about billing? ",
        { href: "/contact", label: "Contact support" },
        ".",
      ],
    ],
  },
  {
    path: "/signin",
    title: "Account Sign In | Cheats Intel",
    description: "Sign in to your Cheats Intel account to access licenses and order history.",
    h1: "Account sign in",
    paragraphs: [
      "Sign in to view active licenses, delivery details, and past orders tied to your account.",
      [
        "If you purchased as a guest, use the ",
        { href: "/contact", label: "contact page" },
        " with your order email so support can locate your license.",
      ],
      [
        "Account login is handled through your checkout provider. Use ",
        { href: "/support", label: "load help & support" },
        " if you need help linking a guest order to your email.",
      ],
    ],
  },
  {
    path: "/policies/terms-and-conditions",
    title: "Terms and Conditions | Cheats Intel",
    description: "Terms and conditions for using Cheats Intel and its cheat guide catalog.",
    h1: "Terms and Conditions",
    paragraphs: [
      [
        "By using Cheats Intel you agree to read product status notes on each ",
        { href: "/articles", label: "cheat guide" },
        " before every session. Cheat detection status can change after game patches.",
      ],
      "Guides are provided for informational comparison. You are responsible for how you use third-party software and for complying with each game's terms of service.",
    ],
  },
  {
    path: "/policies/returns-and-cancellations",
    title: "Returns & Cancellations | Cheats Intel",
    description: "Returns and cancellation policy for Cheats Intel digital cheat licenses.",
    h1: "Returns & Cancellations",
    paragraphs: [
      "Digital licenses and loader access are generally non-refundable once delivered, unless required by applicable law or stated on the product page at purchase.",
      [
        "Contact ",
        { href: "/support", label: "support" },
        " before disputing a charge if delivery failed — most license issues are resolved faster through the ",
        { href: "/contact", label: "contact page" },
        " than through a payment dispute.",
      ],
    ],
  },
  {
    path: "/policies/privacy-policy",
    title: "Privacy Policy | Cheats Intel",
    description: "Privacy policy for Cheats Intel — what data we collect and how it is used.",
    h1: "Privacy Policy",
    paragraphs: [
      "We collect account, order, and support contact data needed to deliver licenses and respond to tickets. Analytics may record page views to improve the catalog.",
      [
        "We do not sell personal data. Payment details are handled by the checkout provider and are not stored on this site. Privacy questions go to ",
        { href: "/contact", label: "contact support" },
        ".",
      ],
    ],
  },
];

export function getStaticPage(path: string): StaticPageContent | undefined {
  return staticPages.find((page) => page.path === path);
}
