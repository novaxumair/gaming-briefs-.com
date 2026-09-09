import type { Metadata } from "next";
import SignInForm from "@/components/reviews/SignInForm";
import { SITE } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Sign in | ${SITE.name}`,
  description: "Sign in to leave reviews on Cheats Intel guides.",
  path: "/signin",
  indexable: false,
});

export default function SignInPage() {
  return <SignInForm />;
}
