/**
 * Input sanitization helpers. These complement (not replace) Zod schema
 * validation: Zod guarantees shape/type, these neutralise dangerous content
 * before it is stored, logged or rendered.
 */

const HTML_ESCAPE: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

/** Escape a string so it is safe to render as HTML text. */
export function escapeHtml(input: string): string {
  return input.replace(/[&<>"'`=/]/g, (ch) => HTML_ESCAPE[ch] ?? ch);
}

/** Remove ASCII control characters (except common whitespace). */
export function stripControlChars(input: string): string {
  // eslint-disable-next-line no-control-regex
  return input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

/**
 * Normalise free-text input: trim, collapse excessive whitespace, strip
 * control chars. Use for names, subjects, messages, etc. before persistence.
 */
export function sanitizeText(input: string): string {
  return stripControlChars(input).replace(/\s{3,}/g, "  ").trim();
}

/** Normalise an email address for storage/comparison. */
export function normalizeEmail(input: string): string {
  return stripControlChars(input).trim().toLowerCase();
}

/**
 * Detect the most common injection / spam signals in free text.
 * Returns true when the content looks suspicious.
 */
export function looksMalicious(input: string): boolean {
  const patterns = [
    /<script\b/i,
    /javascript:/i,
    /on\w+\s*=/i, // inline event handlers
    /\$where|\$ne|\$gt|\$regex/i, // NoSQL operator injection
    /\b(?:https?:\/\/[^\s]+){4,}/i, // link spam (4+ urls)
  ];
  return patterns.some((re) => re.test(input));
}
