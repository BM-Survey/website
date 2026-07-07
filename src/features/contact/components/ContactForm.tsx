"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowRight, Check } from "@/components/ui/icons";
import type { ContactDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

type ContactFormProps = {
  form: ContactDictionary["form"];
};

const EMAIL_STORAGE_KEY = "contact-email";

/**
 * Low-friction contact form: tap a topic chip (first one is pre-selected),
 * write the message, drop an email — done. The email is remembered locally so
 * returning visitors never retype it, and success replaces the form entirely.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function ContactForm({ form }: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Returning visitors skip retyping their email. The input stays
  // uncontrolled and is prefilled via the DOM after hydration, so the
  // server-rendered markup never mismatches.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(EMAIL_STORAGE_KEY);
      if (saved && emailRef.current && !emailRef.current.value) {
        emailRef.current.value = saved;
      }
    } catch {
      /* storage unavailable (private mode) — start blank */
    }
  }, []);

  if (sent) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[26px] border border-primary-border bg-white p-8 text-center shadow-(--shadow-card) sm:p-10">
        <span className="mb-5 flex h-14 w-14 animate-[popSpring_0.6s_cubic-bezier(0.22,1,0.36,1)_both] items-center justify-center rounded-full bg-success-soft text-success-dark">
          <Check width={26} height={26} />
        </span>
        <div className="mb-2 font-display text-2xl font-black tracking-tight text-ink">
          {form.submitted}
        </div>
        <p className="max-w-[320px] text-[15px] leading-relaxed text-muted-2">{form.sentMessage}</p>
      </div>
    );
  }

  return (
    <div className="rounded-[26px] border border-primary-border bg-white p-6 shadow-(--shadow-card) sm:p-10">
      <div className="mb-1.5 font-display text-lg font-extrabold text-ink">{form.label}</div>
      <p className="mb-6 text-[13.5px] text-muted">{form.reassure}</p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (submitting) return;

          const email = emailRef.current?.value.trim() ?? "";
          const message = messageRef.current?.value.trim() ?? "";
          if (!email || !message) return;

          setSubmitting(true);
          setError(null);
          try {
            const res = await fetch(`${API_URL}/contact-queries`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ topic: form.topics[topic], message, email }),
            });
            if (!res.ok) {
              throw new Error(`Request failed (${res.status})`);
            }

            try {
              window.localStorage.setItem(EMAIL_STORAGE_KEY, email);
            } catch {
              /* storage unavailable — nothing to remember */
            }
            setSent(true);
          } catch {
            setError(form.errorMessage);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {/* Topic: one tap instead of a dropdown; first chip pre-selected */}
        <fieldset className="mb-5">
          <legend className="mb-2.5 block font-display text-xs font-bold text-muted">
            {form.topicLabel}
          </legend>
          <div className="flex flex-wrap gap-2">
            {form.topics.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setTopic(i);
                  messageRef.current?.focus();
                }}
                aria-pressed={i === topic}
                className={cn(
                  "rounded-full border px-3.5 py-2 font-display text-[13px] font-bold transition-colors duration-150",
                  i === topic
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-line bg-white text-muted-2 hover:border-primary-border hover:text-ink",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* The message is the star — everything else is one line */}
        <Field label={form.messageLabel} className="mb-4">
          <textarea
            ref={messageRef}
            rows={4}
            placeholder={form.messagePlaceholder}
            required
            className={cn(inputClasses, "resize-y")}
          />
        </Field>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="contact-email" className="sr-only">
              {form.emailLabel}
            </label>
            <input
              ref={emailRef}
              id="contact-email"
              type="email"
              placeholder={form.emailPlaceholder}
              required
              autoComplete="email"
              className={inputClasses}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-3.5 font-display text-[15px] font-extrabold text-white transition-colors duration-150 hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? form.submitting : form.submit}
            <ArrowRight width={16} height={16} className="rtl:rotate-180" />
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-3 text-[13.5px] font-semibold text-[#e5484d]">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

const inputClasses =
  "w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-[14.5px] text-ink outline-none transition-colors duration-150 placeholder:text-muted-3 focus-visible:border-primary focus-visible:bg-white";

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block font-display text-xs font-bold text-muted">{label}</label>
      {children}
    </div>
  );
}
