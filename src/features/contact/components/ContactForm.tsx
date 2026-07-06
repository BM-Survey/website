"use client";

import { useState } from "react";

import type { ContactDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

type ContactFormProps = {
  form: ContactDictionary["form"];
};

export function ContactForm({ form }: ContactFormProps) {
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-[26px] border border-primary-border bg-white p-8 shadow-[var(--shadow-card-lg)] sm:p-10">
      <div className="mb-6 font-display text-[13px] font-bold text-muted">{form.label}</div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <Field label={form.nameLabel}>
            <input type="text" placeholder={form.namePlaceholder} required className={inputClasses} />
          </Field>
          <Field label={form.emailLabel}>
            <input type="email" placeholder={form.emailPlaceholder} required className={inputClasses} />
          </Field>
        </div>

        <Field label={form.topicLabel} className="mb-4">
          <select className={cn(inputClasses, "appearance-none")}>
            {form.topics.map((topic) => (
              <option key={topic}>{topic}</option>
            ))}
          </select>
        </Field>

        <Field label={form.messageLabel} className="mb-5.5">
          <textarea rows={5} placeholder={form.messagePlaceholder} required className={cn(inputClasses, "resize-y")} />
        </Field>

        <button
          type="submit"
          className={cn(
            "rounded-2xl px-7 py-3.5 font-display text-base font-extrabold text-white shadow-[0_12px_28px_rgba(46,91,255,0.35)] transition-transform hover:-translate-y-0.5",
            sent ? "bg-gradient-to-br from-success to-success-dark" : "bg-gradient-to-br from-primary to-primary-dark",
          )}
        >
          {sent ? `${form.submitted} ✓` : form.submit}
        </button>

        {sent && <p className="mt-3.5 text-[13px] font-bold text-success-dark">✓ {form.sentMessage}</p>}
      </form>
    </div>
  );
}

const inputClasses =
  "w-full rounded-2xl border border-primary-border bg-bg px-4 py-3.5 text-[14.5px] text-ink outline-none focus-visible:border-primary";

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
