"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StarRating, StarRatingInput } from "@/components/reviews/StarRating";

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

type Session = {
  user: { name: string; email: string } | null;
  isAdmin: boolean;
};

export default function ReviewSection({
  pageSlug,
  pageTitle,
  pagePath,
}: {
  pageSlug: string;
  pageTitle: string;
  pagePath: string;
}) {
  const [session, setSession] = useState<Session>({ user: null, isAdmin: false });
  const [sessionReady, setSessionReady] = useState(false);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadData() {
    const [sessionRes, reviewsRes] = await Promise.all([
      fetch("/api/auth/me", { credentials: "include" }),
      fetch(`/api/reviews?pageSlug=${encodeURIComponent(pageSlug)}`, { credentials: "include" }),
    ]);

    const sessionData = (await sessionRes.json()) as Session;
    const reviewsData = (await reviewsRes.json()) as { reviews: ReviewItem[] };
    setSession(sessionData);
    setReviews(reviewsData.reviews.filter((review) => review.status === "approved"));
    setSessionReady(true);
  }

  useEffect(() => {
    void loadData();
  }, [pageSlug]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageSlug, pageTitle, pagePath, rating, body }),
      });
      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        setError(data.error || "Could not submit review.");
        return;
      }

      setBody("");
      setMessage(data.message || "Review submitted.");
    } catch {
      setError("Could not submit review.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="guide-section" id="reviews">
      <div className="guide-card">
        <h2>Reader reviews</h2>
        <p>
          Finished reading? Share what you thought about this {pageTitle} guide. Approved
          reviews also show on the{" "}
          <Link href="/reviews" className="guide-inline-link">
            Reviews
          </Link>{" "}
          page.
        </p>

        {reviews.length > 0 ? (
          <div className="review-list">
            {reviews.map((review) => (
              <article key={review.id} className="review-card">
                <div className="review-card-head">
                  <strong>{review.authorName}</strong>
                  <StarRating rating={review.rating} />
                </div>
                <p>{review.body}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="review-empty">No approved reviews for this page yet.</p>
        )}

        {!sessionReady ? (
          <p className="review-signin-prompt">Checking sign-in...</p>
        ) : session.user ? (
          <form className="review-form review-form-inline" onSubmit={handleSubmit}>
            <p className="review-signed-in">
              Signed in as <strong>{session.user.name}</strong>
            </p>

            <div className="review-field">
              <span>Your rating</span>
              <StarRatingInput value={rating} onChange={setRating} />
            </div>

            <label className="review-field">
              <span>Your review</span>
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder={`What did you think about this ${pageTitle} guide?`}
                rows={4}
                required
              />
            </label>

            {error ? <p className="review-form-error">{error}</p> : null}
            {message ? <p className="review-form-success">{message}</p> : null}

            <button type="submit" className="guide-cta review-submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit review"}
            </button>
          </form>
        ) : (
          <div className="review-signin-box">
            <p>
              Sign in with your name and email to leave a review after reading this guide.
            </p>
            <Link href={`/signin?redirect=${encodeURIComponent(pagePath)}`} className="guide-cta">
              Sign in
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
