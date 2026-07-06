import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const svgDefaults = (props: IconProps): IconProps => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export function ArrowRight(props: IconProps) {
  return (
    <svg {...svgDefaults(props)}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg {...svgDefaults({ fill: "currentColor", ...props })}>
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.7L12 17.7 5.9 20.3l1.4-6.7L2.2 9l6.9-.7z" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...svgDefaults(props)}>
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Play(props: IconProps) {
  return (
    <svg {...svgDefaults({ fill: "currentColor", ...props })}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...svgDefaults(props)}>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...svgDefaults(props)}>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Bolt(props: IconProps) {
  return (
    <svg {...svgDefaults({ fill: "currentColor", ...props })}>
      <path d="M13 2L3 14h7l-1 8 10-12h-7z" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg {...svgDefaults(props)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Coins(props: IconProps) {
  return (
    <svg {...svgDefaults(props)}>
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 7.5v9M9.5 15c0 1.1 1.1 1.75 2.5 1.75s2.5-.65 2.5-1.75-1.1-1.5-2.5-1.75C10.6 12.75 9.5 12.35 9.5 11.25s1.1-1.75 2.5-1.75 2.5.65 2.5 1.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Users(props: IconProps) {
  return (
    <svg {...svgDefaults(props)}>
      <path
        d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 21v-2a4 4 0 0 0-2.8-3.82"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Briefcase(props: IconProps) {
  return (
    <svg {...svgDefaults(props)}>
      <rect x="3" y="7" width="18" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Lock(props: IconProps) {
  return (
    <svg {...svgDefaults(props)}>
      <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 10V7a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <svg {...svgDefaults(props)}>
      <path
        d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Globe(props: IconProps) {
  return (
    <svg {...svgDefaults(props)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...svgDefaults(props)}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...svgDefaults(props)}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function XSocial(props: IconProps) {
  return (
    <svg {...svgDefaults({ fill: "currentColor", ...props })}>
      <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.2 7H1.4l8.1-9.3L1 2h7.1l4.9 6.4L18.9 2zm-2.4 18h1.9L7.6 4H5.6l10.9 16z" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg {...svgDefaults(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function LinkedIn(props: IconProps) {
  return (
    <svg {...svgDefaults({ fill: "currentColor", ...props })}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z" />
    </svg>
  );
}

export function Apple(props: IconProps) {
  return (
    <svg {...svgDefaults({ fill: "currentColor", ...props })}>
      <path d="M16.4 12.7c0-2 1.6-3 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.4 2 2.4 2 1 0 1.3-.6 2.5-.6s1.5.6 2.5.6 1.7-1 2.3-2c.7-1.1 1-2.2 1-2.3 0 0-2-.8-2.1-3.1zM14.5 6.3c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.1 1.8-.4 2.3-1.1z" />
    </svg>
  );
}

export function GooglePlay(props: IconProps) {
  return (
    <svg {...svgDefaults({ fill: "currentColor", ...props })}>
      <path d="M4 3.2v17.6c0 .6.6 1 1.1.7l14-8.8c.5-.3.5-1.1 0-1.4l-14-8.8c-.5-.3-1.1.1-1.1.7z" />
    </svg>
  );
}
