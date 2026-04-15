import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// `/api/(.*)` is intentionally public at the middleware layer.
// The API routes under `app/api/*` serve specialised external integrations that
// must NOT be gated by Clerk session auth, because the callers are not users:
//   - /api/trade-alerts   → TradingView webhook (auth via shared secret header)
//   - /api/send-telegram  → Telegram notification hook (auth via shared secret)
//   - /api/save-download  → Resource download logger (auth via shared secret)
// Each route enforces its own auth, so do not add middleware-level Clerk
// protection here without also updating the upstream callers.
const isPublicRoute = createRouteMatcher([
  "/",
  "/career(.*)",
  "/hobbies(.*)",
  "/trading(.*)",
  "/resources(.*)",
  "/blog(.*)",
  "/sign-in(.*)",
  "/api/(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
