import type { Core } from "@strapi/strapi";

const DAY_MS = 24 * 60 * 60 * 1000;
const CLEANUP_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitConfig {
  maxRequests?: number;
}

export default (
  config: RateLimitConfig,
  { strapi }: { strapi: Core.Strapi },
) => {
  const maxRequests = config.maxRequests ?? 50;
  const store = new Map<string, RateLimitEntry>();

  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of store) {
      if (now >= entry.resetAt) {
        store.delete(ip);
      }
    }
  }, CLEANUP_INTERVAL_MS);

  if (cleanupTimer.unref) {
    cleanupTimer.unref();
  }

  return async (ctx, next) => {
    // Only rate-limit POST /api/reports
    if (ctx.request.method !== "POST" || !ctx.request.path.startsWith("/api/reports")) {
      await next();
      return;
    }

    // Skip rate limiting for authenticated users
    const authHeader = ctx.request.get("Authorization");
    if (authHeader) {
      try {
        const token = authHeader.replace(/^Bearer\s+/i, "");
        const jwtService = strapi.plugin("users-permissions").service("jwt");
        const payload = await jwtService.verify(token);
        if (payload?.id) {
          await next();
          return;
        }
      } catch {
        // Invalid token — fall through to rate limiting
      }
    }

    const ip =
      ctx.request.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
      ctx.request.ip;

    const now = Date.now();
    let entry = store.get(ip);

    if (!entry || now >= entry.resetAt) {
      entry = { count: 0, resetAt: now + DAY_MS };
      store.set(ip, entry);
    }

    entry.count += 1;

    const remaining = Math.max(0, maxRequests - entry.count);
    ctx.set("X-RateLimit-Limit", String(maxRequests));
    ctx.set("X-RateLimit-Remaining", String(remaining));
    ctx.set("X-RateLimit-Reset", String(Math.ceil(entry.resetAt / 1000)));

    if (entry.count > maxRequests) {
      ctx.status = 429;
      ctx.body = {
        error: {
          status: 429,
          name: "TooManyRequestsError",
          message: "Rate limit exceeded. Try again later.",
        },
      };
      return;
    }

    await next();
  };
};
