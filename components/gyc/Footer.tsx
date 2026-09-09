import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/data";

const footerLinkClass =
  "font-onest text-sm text-white transition hover:text-white";

function FooterNav({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav className="site-footer-nav border-b-2 border-[#64548D]/30 py-5 md:border-b-0 md:pb-5">
      <p className="mb-5 font-onest text-base font-semibold text-white md:mb-5 md:pt-0">
        {title}
      </p>
      <ul className="flex flex-col gap-4 md:gap-5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href} className={footerLinkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function GycFooter() {
  return (
    <div className="site-container pt-20">
      <footer className="flex w-full flex-col pb-[50px]">
        <div className="site-footer-top gap-4 md:flex md:flex-row md:justify-between md:border-b-2 md:border-[#64548D]/30">
          <div className="site-footer-brand flex shrink-0 flex-col gap-10 border-b-2 border-[#64548D]/30 pb-5 md:gap-20 md:border-0">
            <Link href="/" aria-label={`${SITE.name} home`}>
              <Image
                src={SITE.logo}
                alt={`${SITE.name} logo`}
                width={32}
                height={32}
                loading="lazy"
                className="site-logo-pixel opacity-90"
              />
            </Link>
            <p className="flex items-center gap-2.5 text-sm text-white">
              <Image
                src="/images/flags/EN.svg"
                alt=""
                aria-hidden
                width={24}
                height={16}
                loading="lazy"
                className="h-6 w-6 rounded-sm border border-white/50 object-contain"
              />
              <span className="font-onest">English</span>
            </p>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-4 lg:gap-[100px]">
            <FooterNav
              title="Navigation"
              links={[
                { href: "/support", label: "Load help & support" },
                { href: "/", label: "Home" },
                { href: "/blogs", label: "Blogs" },
                { href: "/articles", label: "Articles" },
                { href: "/insight", label: "Insights" },
                { href: "/about-us", label: "About us" },
                { href: "/fees", label: "Fees" },
              ]}
            />
            <FooterNav
              title="Other"
              links={[
                {
                  href: "/policies/terms-and-conditions",
                  label: "Terms and Conditions",
                },
                {
                  href: "/policies/returns-and-cancellations",
                  label: "Returns & Cancellations",
                },
                { href: "/policies/privacy-policy", label: "Privacy Policy" },
                { href: "/contact", label: "Contact" },
              ]}
            />
            <FooterNav
              title="Guides"
              links={[
                { href: "/articles", label: "Cheat guides" },
                { href: "/signin", label: "Account sign in" },
                { href: "/support", label: "Help center" },
              ]}
            />
            <FooterNav
              title="Socials"
              links={[
                { href: "https://x.com/cheatsintel", label: "X / Twitter" },
                { href: "/contact", label: "Contact support" },
              ]}
            />
          </div>
        </div>

        <p className="pt-5 text-left font-onest text-sm text-white">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
