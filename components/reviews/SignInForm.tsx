"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function safeRedirect(path: string | null): string {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return "/reviews";
  return path;
}

function SignInFormInner() {
  const searchParams = useSearchParams();
  const redirectTo = safeRedirect(searchParams.get("redirect"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          adminPassword: showAdmin ? adminPassword : undefined,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        warning?: string;
      };

      if (!response.ok) {
        setError(data.error || "Could not sign in.");
        return;
      }

      if (data.warning) {
        setNotice(data.warning);
      }

      window.location.assign(redirectTo);
    } catch {
      setError("Could not sign in. Check that the dev server is running and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="site-static-page signin-page">
      <div className="site-static-inner site-static-inner-narrow">
        <div className="gyc-simple-card">
          <h1 className="gyc-simple-title">Sign in</h1>
          <p className="gyc-simple-text">
            Sign in with your name and email to leave reviews on guides you read. Approved
            reviews appear on the{" "}
            <Link href="/reviews" className="gyc-simple-link">
              Reviews
            </Link>{" "}
            page.
          </p>

          <form className="review-form" onSubmit={handleSubmit}>
            <label className="review-field">
              <span>Display name</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                required
                autoComplete="name"
              />
            </label>

            <label className="review-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </label>

            <button type="button" className="review-admin-toggle" onClick={() => setShowAdmin((v) => !v)}>
              {showAdmin ? "Hide admin sign-in" : "Admin sign-in"}
            </button>

            {showAdmin ? (
              <label className="review-field">
                <span>Admin password</span>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(event) => setAdminPassword(event.target.value)}
                  placeholder="Admin password"
                  autoComplete="current-password"
                />
              </label>
            ) : null}

            {error ? <p className="review-form-error">{error}</p> : null}
            {notice ? <p className="review-form-success">{notice}</p> : null}

            <button type="submit" className="guide-cta review-submit-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SignInForm() {
  return (
    <Suspense fallback={<div className="site-static-page signin-page" />}>
      <SignInFormInner />
    </Suspense>
  );
}
