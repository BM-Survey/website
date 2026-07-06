/**
 * Replaces `{key}` placeholders in a translation string with provided values.
 * Keeps text out of components while allowing dynamic values (e.g. the year).
 */
export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
