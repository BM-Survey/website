"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { getSystemMessages } from "@/i18n/system-messages";

/** Route error boundary. Must be a Client Component. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = typeof params.locale === "string" ? params.locale : "en";
  const t = getSystemMessages(locale).error;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center">
      <h1 className="font-display text-3xl font-black text-ink">{t.title}</h1>
      <p className="max-w-md text-muted-2">{t.description}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark px-6 py-3 font-display font-extrabold text-white transition-transform hover:-translate-y-0.5"
      >
        {t.retry}
      </button>
    </div>
  );
}
