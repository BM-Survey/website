import Link from "next/link";

import { defaultLocale } from "@/i18n/config";
import { getSystemMessages } from "@/i18n/system-messages";

/**
 * Not-found boundary. Rendered outside the [locale] param context, so it falls
 * back to the default locale's copy.
 */
export default function NotFound() {
  const t = getSystemMessages(defaultLocale).notFound;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg px-6 py-16 text-center">
      {/* Soft brand glows behind the illustration */}
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary-soft blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-purple-soft blur-3xl" />

      <NotFoundIllustration className="relative w-full max-w-md" />

      <p className="relative mt-2 font-display text-sm font-extrabold uppercase tracking-[0.3em] text-primary">
        Error 404
      </p>
      <h1 className="relative mt-3 font-display text-3xl font-black text-ink sm:text-4xl">
        {t.title}
      </h1>
      <p className="relative mt-3 max-w-md text-muted-2">{t.description}</p>

      <Link
        href={`/${defaultLocale}`}
        className="relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-linear-to-br from-primary to-primary-dark px-7 py-3.5 font-display font-extrabold text-white shadow-float transition-transform hover:-translate-y-0.5"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 11.5 12 4l9 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 10v9.5h13V10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {t.backHome}
      </Link>
    </div>
  );
}

/**
 * Brand illustration for the 404 screen: a stylized "lost" browser window with
 * a big 404, drawn with the site's design tokens and gently floating.
 */
function NotFoundIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 420 300"
      fill="none"
      role="img"
      aria-label="A lost page"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nf-primary" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e5bff" />
          <stop offset="1" stopColor="#1e3fcc" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="210" cy="272" rx="120" ry="14" fill="#e4e9ff" />

      {/* Floating browser card */}
      <g className="animate-floaty">
        <rect
          x="80"
          y="46"
          width="260"
          height="180"
          rx="22"
          fill="#ffffff"
          stroke="#e4e9ff"
          strokeWidth="2"
        />
        {/* Browser chrome */}
        <path
          d="M80 68a22 22 0 0 1 22-22h216a22 22 0 0 1 22 22v10H80z"
          fill="#eaf0ff"
        />
        <circle cx="104" cy="62" r="5" fill="#ff6b6b" />
        <circle cx="122" cy="62" r="5" fill="#ffb020" />
        <circle cx="140" cy="62" r="5" fill="#22c35e" />
        <rect x="168" y="56" width="150" height="12" rx="6" fill="#dbe3ff" />

        {/* 404 headline */}
        <text
          x="210"
          y="160"
          textAnchor="middle"
          fontFamily="Urbanist, system-ui, sans-serif"
          fontSize="72"
          fontWeight="900"
          fill="url(#nf-primary)"
        >
          404
        </text>
        <rect x="150" y="184" width="120" height="10" rx="5" fill="#edf1fb" />
        <rect x="172" y="202" width="76" height="10" rx="5" fill="#edf1fb" />
      </g>

      {/* Floating magnifier searching for the page */}
      <g className="animate-floaty2" style={{ transformOrigin: "320px 200px" }}>
        <circle
          cx="320"
          cy="196"
          r="30"
          fill="#f1eaff"
          stroke="#7a3ff2"
          strokeWidth="4"
        />
        <circle cx="320" cy="196" r="16" fill="#ffffff" opacity="0.7" />
        <rect
          x="342"
          y="216"
          width="34"
          height="12"
          rx="6"
          transform="rotate(45 342 216)"
          fill="#7a3ff2"
        />
      </g>

      {/* Little disconnected plug near top-left */}
      <g className="animate-floaty" style={{ transformOrigin: "96px 128px" }}>
        <circle cx="96" cy="128" r="9" fill="#ffb020" />
        <path
          d="M96 128q-18 10-8 30"
          stroke="#ffb020"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
