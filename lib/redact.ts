export function redactPII(input: string) {
  if (!input) return { text: input, types: [] as string[] };

  let text = input;
  const found = new Set<string>();

  const patterns: { type: string; regex: RegExp; token: string }[] = [
    // Emails
    { type: "EMAIL", regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, token: "[REDACTED_EMAIL]" },
    // US SSN (###-##-####)
    { type: "SSN", regex: /\b\d{3}-\d{2}-\d{4}\b/g, token: "[REDACTED_SSN]" },
    // Common credit card-like sequences (13-19 digits, allowing spaces/dashes)
    { type: "CREDIT_CARD", regex: /\b(?:\d[ \-]*?){13,19}\b/g, token: "[REDACTED_CREDIT_CARD]" },
    // Phone numbers (US-ish, with optional country code)
    { type: "PHONE", regex: /\b(?:\+?\d{1,3}[\-\.\s]?)?(?:\(?\d{3}\)?[\-\.\s]?)?\d{3}[\-\.\s]?\d{4}\b/g, token: "[REDACTED_PHONE]" },
    // IBAN / international bank-ish identifiers (starts with 2 letters + 2 digits)
    { type: "IBAN", regex: /\b[A-Z]{2}\d{2}[A-Z0-9]{1,30}\b/gi, token: "[REDACTED_IBAN]" },
    // Account/routing hints (words + numbers)
    { type: "ACCOUNT", regex: /\b(?:acct|account|routing|aba)[\s:\-]*\d{3,}\b/gi, token: "[REDACTED_ACCOUNT]" },
  ];

  for (const p of patterns) {
    if (p.regex.test(text)) {
      found.add(p.type);
      text = text.replace(p.regex, p.token);
      // reset lastIndex for global regex so subsequent tests work correctly
      p.regex.lastIndex = 0;
    }
  }

  return { text, types: Array.from(found) };
}
