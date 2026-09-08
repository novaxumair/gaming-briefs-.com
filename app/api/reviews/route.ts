import { NextResponse } from "next/server";
import { getSiteUser, isAdmin } from "@/lib/auth-session";
import { createReview, listReviews } from "@/lib/reviews";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageSlug = searchParams.get("pageSlug") || undefined;
  const admin = await isAdmin();

  const reviews = await listReviews({
    pageSlug,
    status: admin ? ["pending", "approved", "rejected"] : "approved",
  });

  return NextResponse.json({ reviews, isAdmin: admin });
}

export async function POST(request: Request) {
  const user = await getSiteUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in to leave a review." }, { status: 401 });
  }

  const body = (await request.json()) as {
    pageSlug?: string;
    pageTitle?: string;
    pagePath?: string;
    rating?: number;
    body?: string;
  };

  const pageSlug = body.pageSlug?.trim();
  const pageTitle = body.pageTitle?.trim();
  const pagePath = body.pagePath?.trim();
  const reviewBody = body.body?.trim();
  const rating = Number(body.rating);

  if (!pageSlug || !pageTitle || !pagePath || !reviewBody) {
    return NextResponse.json({ error: "Missing review details." }, { status: 400 });
  }

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Choose a rating from 1 to 5." }, { status: 400 });
  }

  if (reviewBody.length < 12) {
    return NextResponse.json({ error: "Write at least a few words in your review." }, { status: 400 });
  }

  const review = await createReview({
    pageSlug,
    pageTitle,
    pagePath,
    authorName: user.name,
    authorEmail: user.email,
    rating,
    body: reviewBody,
  });

  return NextResponse.json({ review, message: "Review submitted and waiting for approval." });
}
