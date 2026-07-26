"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { Button } from "@/components/ui/Button";

type CollaborationCtaProps = {
  title: string;
  subtitle: string;
  buttonLabel: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function CollaborationCta({ title, subtitle, buttonLabel }: CollaborationCtaProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    // Reset once the dialog is closed so a reopened form starts clean.
    setSent(false);
    setError(null);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const formData = new FormData(e.currentTarget);
    const payload = {
      fullName: String(formData.get("fullName") ?? "").trim(),
      workEmail: String(formData.get("workEmail") ?? "").trim(),
      companyName: String(formData.get("companyName") ?? "").trim(),
      projectRequirements: String(formData.get("projectRequirements") ?? "").trim(),
    };
    if (
      !payload.fullName ||
      !payload.workEmail ||
      !payload.companyName ||
      !payload.projectRequirements
    ) {
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/org-inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <CtaBanner
        title={title}
        subtitle={subtitle}
        action={
          <Button variant="white" onClick={() => setIsOpen(true)}>
            {buttonLabel}
          </Button>
        }
      />

      {/* Portalled to <body>: the page's <main> is a `relative z-1` stacking
          context, so a dialog rendered in place can never paint above the
          fixed navbar no matter how high its z-index. */}
      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-200 flex items-end sm:items-center justify-center p-0 sm:p-6">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={close}
              aria-hidden="true"
            />
            <div
              className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
            >
              <button
                onClick={close}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
                aria-label="Close dialog"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-6 sm:p-8">
                {sent ? (
                  <div className="flex min-h-70 flex-col items-center justify-center text-center">
                    <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <h2 className="text-2xl font-bold text-ink mb-2">Request received</h2>
                    <p className="max-w-[320px] text-[15px] leading-relaxed text-ink/60">
                      Thanks for reaching out — our team will be in touch soon.
                    </p>
                    <Button className="mt-6" onClick={close}>
                      Done
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-ink mb-6 pr-8">Start Your Research Project</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-ink/80 mb-1">Full Name*</label>
                        <input
                          required
                          type="text"
                          name="fullName"
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-ink/80 mb-1">Work Email*</label>
                        <input
                          required
                          type="email"
                          name="workEmail"
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-ink/80 mb-1">Company Name*</label>
                        <input
                          required
                          type="text"
                          name="companyName"
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-ink/80 mb-1">Project Requirements*</label>
                        <textarea
                          required
                          name="projectRequirements"
                          rows={4}
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                        ></textarea>
                      </div>

                      {error && (
                        <p role="alert" className="text-sm font-semibold text-[#e5484d]">
                          {error}
                        </p>
                      )}

                      <div className="pt-2">
                        <Button type="submit" className="w-full" disabled={submitting}>
                          {submitting ? "Submitting…" : "Submit Request"}
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
