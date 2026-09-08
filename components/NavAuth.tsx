"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Session = {
  user: { name: string; email: string } | null;
  isAdmin: boolean;
};

export default function NavAuth({
  buttonClassName = "",
  compact = false,
}: {
  buttonClassName?: string;
  compact?: boolean;
}) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const load = () => {
      fetch("/api/auth/me", { credentials: "include" })
        .then((res) => res.json())
        .then((data: Session) => setSession(data))
        .catch(() => setSession({ user: null, isAdmin: false }));
    };

    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(load, { timeout: 3500 });
      return;
    }
    window.setTimeout(load, 1500);
  }, []);

  if (!session) {
    return (
      <Link href="/signin" className={`nav-contact-btn relative overflow-hidden ${buttonClassName}`}>
        <span className="relative z-10">Sign in</span>
      </Link>
    );
  }

  if (session.user) {
    return (
      <div className={`nav-auth-signed-in${compact ? " nav-auth-signed-in-compact" : ""}`}>
        <Link href="/reviews" className="nav-auth-name">
          {session.user.name}
          {session.isAdmin ? " · Admin" : ""}
        </Link>
        <button
          type="button"
          className="nav-auth-signout"
          onClick={async () => {
            await fetch("/api/auth/signout", { method: "POST", credentials: "include" });
            window.location.href = "/";
          }}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link href="/signin" className={`nav-contact-btn relative overflow-hidden ${buttonClassName}`}>
      <span className="relative z-10">Sign in</span>
    </Link>
  );
}
