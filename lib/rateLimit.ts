const WINDOW_MS = 60_000; // 1 minute window
const MAX_PER_WINDOW = 6; // max requests per minute

const buckets = new Map<string, number[]>();

export function checkRateLimitSlidingWindow(userId: string) {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const arr = buckets.get(userId) ?? [];
  // remove old timestamps
  const filtered = arr.filter((t) => t > windowStart);
  if (filtered.length >= MAX_PER_WINDOW) {
    // update map with filtered to keep memory trimmed
    buckets.set(userId, filtered);
    return { allowed: false, remaining: 0, window: WINDOW_MS };
  }

  // accept request: push now
  filtered.push(now);
  buckets.set(userId, filtered);
  return { allowed: true, remaining: Math.max(0, MAX_PER_WINDOW - filtered.length), window: WINDOW_MS };
}
