"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StarRating } from "@/components/reviews/StarRating";

type ReviewItem = {
  id: string;
  pageSlug: string;
  pageTitle: string;
  pagePath: string;
  authorName: string;
  rating: number;
  body: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

function ReviewCard({
  review,
  isAdmin,
  onUpdate,
}: {
  review: ReviewItem;
  isAdmin: boolean;
  onUpdate: () => void;
}) {
  async function setStatus(status: "approved" | "rejected" | "pending") {
    await fetch(`/api/reviews/${review.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    onUpdate();
  }

  async function removeReview() {
    await fetch(`/api/reviews/${review.id}`, { method: "DELETE", credentials: "include" });
    onUpdate();
  }

  return (
    <article className="review-card">
      <div className="review-card-head">
        <div>
          <strong>{review.authorName}</strong>
          <span className="review-card-meta">
            on{" "}
            <Link href={review.pagePath} className="guide-inline-link">
              {review.pageTitle}
            </Link>
          </span>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p>{review.body}</p>
      {isAdmin ? (
        <div className="review-admin-actions">
          <span className={`review-status review-status-${review.status}`}>{review.status}</span>
          {review.status !== "approved" ? (
            <button type="button" className="guide-cta" onClick={() => void setStatus("approved")}>
              Keep / Approve
            </button>
          ) : null}
          {review.status !== "rejected" ? (
            <button type="button" className="guide-cta-ghost" onClick={() => void setStatus("rejected")}>
              Hide
            </button>
          ) : null}
          <button type="button" className="guide-cta-ghost" onClick={() => void removeReview()}>
            Remove
          </button>
        </div>
      ) : null}
    </article>
  );
}

export default function ReviewsPageContent() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  async function loadReviews() {
    const [sessionRes, reviewsRes] = await Promise.all([
      fetch("/api/auth/me", { credentials: "include" }),
      fetch("/api/reviews", { credentials: "include" }),
    ]);
    const sessionData = (await sessionRes.json()) as {
      user: { name: string } | null;
      isAdmin: boolean;
    };
    const reviewsData = (await reviewsRes.json()) as { reviews: ReviewItem[] };

    setUserName(sessionData.user?.name ?? null);
    setIsAdmin(sessionData.isAdmin);
    setReviews(reviewsData.reviews);
  }

  useEffect(() => {
    void loadReviews();
  }, []);

  const approved = reviews.filter((review) => review.status === "approved");
  const pending = reviews.filter((review) => review.status === "pending");

  return (
    <div className="site-static-page">
      <div className="site-static-inner">
        <div className="gyc-simple-card">
          <h1 className="gyc-simple-title">Reader reviews</h1>
          <p className="gyc-simple-text">
            Reviews from signed-in readers about the guides they finished. New submissions
            wait for admin approval before they appear publicly.
          </p>
          {userName ? (
            <p className="gyc-simple-text">
              Signed in as <strong>{userName}</strong>
              {isAdmin ? " · Admin moderation enabled" : null}
            </p>
          ) : (
            <p className="gyc-simple-text">
              <Link href="/signin" className="gyc-simple-link">
                Sign in
              </Link>{" "}
              to submit a review after reading a guide.
            </p>
          )}

          {isAdmin && pending.length > 0 ? (
            <section className="review-admin-panel">
              <h2 className="gyc-section-title">Pending reviews</h2>
              <div className="review-list">
                {pending.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    isAdmin={isAdmin}
                    onUpdate={() => void loadReviews()}
                  />
                ))}
              </div>
            </section>
          ) : null}

          <section className="review-public-panel">
            <h2 className="gyc-section-title">Approved reviews</h2>
            {approved.length > 0 ? (
              <div className="review-list">
                {approved.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    isAdmin={isAdmin}
                    onUpdate={() => void loadReviews()}
                  />
                ))}
              </div>
            ) : (
              <p className="review-empty">No approved reviews yet.</p>
            )}
          </section>

          {isAdmin ? (
            <section className="review-admin-panel">
              <h2 className="gyc-section-title">Hidden / rejected</h2>
              <div className="review-list">
                {reviews
                  .filter((review) => review.status === "rejected")
                  .map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      isAdmin={isAdmin}
                      onUpdate={() => void loadReviews()}
                    />
                  ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
