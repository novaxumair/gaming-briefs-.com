"use client";

import { useEffect, useState } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function GoogleAnalyticsGate({ gaId }: { gaId: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return;
    setEnabled(true);
  }, []);

  if (!enabled) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
