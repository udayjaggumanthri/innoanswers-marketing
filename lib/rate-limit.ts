const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const MAX_KEYS = 1000;

const buckets = new Map<string, number[]>();

function recentStamps(stamps: number[], now: number): number[] {
  return stamps.filter((stamp) => now - stamp < WINDOW_MS);
}

function sweep(now: number) {
  if (buckets.size <= MAX_KEYS) {
    return;
  }
  for (const [key, stamps] of buckets) {
    const recent = recentStamps(stamps, now);
    if (recent.length === 0) {
      buckets.delete(key);
    } else {
      buckets.set(key, recent);
    }
  }
}

export function consumeRateLimit(key: string): { allowed: boolean } {
  const now = Date.now();
  sweep(now);
  const recent = recentStamps(buckets.get(key) ?? [], now);
  if (recent.length >= MAX_ATTEMPTS) {
    buckets.set(key, recent);
    return { allowed: false };
  }
  recent.push(now);
  buckets.set(key, recent);
  return { allowed: true };
}
