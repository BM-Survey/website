import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Max content width. Defaults to the wide marketing width. */
  size?: "sm" | "md" | "lg";
  as?: ElementType;
};

const sizes: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm: "max-w-[820px]",
  md: "max-w-[1080px]",
  lg: "max-w-[1180px]",
};

/** Centered, responsive content wrapper with consistent horizontal padding. */
export function Container({
  children,
  className,
  size = "lg",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-6", sizes[size], className)}>
      {children}
    </Tag>
  );
}
