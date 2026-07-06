type ClassValue = string | false | null | undefined;

/** Minimal className combiner — joins truthy class strings. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
