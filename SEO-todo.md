# SEO / OG / 500-error hardening — parity check vs kwelivote

Reference repo: `/Users/lennykioko/Desktop/Repos/kwelivote`

Four commits in kwelivote addressed SEO previews and 500 errors on crawl.
Status of each measure in this repo (`lennykioko.com`):

| # | Measure | kwelivote commit | Status here |
|---|---|---|---|
| 1 | Server-side `generateMetadata` in `blog/[slug]/page.tsx` (split client into `blog-post-content.tsx`) so crawlers get post-specific `og:title` / `og:description` / `og:image` | `da3e604` | Present — `app/blog/[slug]/page.tsx:13-63` |
| 2 | Try/catch around the Convex query in `generateMetadata` so crawler timeouts return 200 with fallback metadata instead of 500 | `10eac08` | Present — `app/blog/[slug]/page.tsx:28-32`. Also applied defensively in `app/sitemap.ts` and `app/blog/[slug]/opengraph-image.tsx` |
| 3 | `blog-post-loader.tsx` that `dynamic(..., { ssr: false })`-imports `blog-post-content`, keeping `isomorphic-dompurify` / jsdom off the server runtime (fixes `ERR_REQUIRE_ESM` on Vercel) | `78ecb2f` | Present — `app/blog/[slug]/blog-post-loader.tsx` (byte-identical to kwelivote's) |
| 4 | Site-wide static `/og-image.png` fallback wired into root layout via `metadata.openGraph.images` + `metadata.twitter.images` (kwelivote deleted the top-level dynamic OG route because LinkedIn's crawler couldn't render it) | `2124a98` | **Missing** — `app/layout.tsx:16-28` has no `openGraph`, no `twitter`, no `robots` block, and `public/og-image.png` does not exist |

## Gap: measure #4

The blog route itself is covered. What's not covered:

- Pages without their own `metadata.openGraph.images` (e.g. `/sign-in`, `error.tsx`, `not-found.tsx`, any future pages) have no OG preview at all.
- If a dynamic OG image route ever fails (LinkedIn has been historically flaky with edge-runtime OG routes), there is no static fallback.
- Existing per-page OG images use off-spec sizes (e.g. `public/cityzen.jpg` is 1024×1024). WhatsApp, LinkedIn and Twitter expect **1200×630**.

## Action items

1. [ ] Produce a branded **1200×630 PNG** and drop it at `public/og-image.png`. Recommended: a dark-to-amber gradient matching the site theme, with the `Lenny Kioko` wordmark and tagline. Keep the file under ~300 KB for fast crawler fetches.
2. [ ] Add `openGraph`, `twitter`, and `robots` blocks to `app/layout.tsx` referencing `/og-image.png` — same shape as `kwelivote/src/app/layout.tsx:37-75`. Template:
   ```ts
   openGraph: {
     type: "website",
     locale: "en_US",
     url: siteUrl,
     siteName: "Lenny Kioko",
     title: "Lenny Kioko — Tech Consultant -- I help businesses save time & boost revenue using technology",
     description: "...",
     images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "..." }],
   },
   twitter: {
     card: "summary_large_image",
     title: "...",
     description: "...",
     images: ["/og-image.png"],
   },
   robots: {
     index: true,
     follow: true,
     googleBot: {
       index: true, follow: true,
       "max-video-preview": -1,
       "max-image-preview": "large",
       "max-snippet": -1,
     },
   },
   ```
3. [ ] (Optional) Re-export the per-page OG images (`cityzen.jpg`, etc.) at 1200×630 so crawlers don't crop them unpredictably.
4. [ ] After shipping #1 and #2, validate with:
   - https://developers.facebook.com/tools/debug/ (scrape a blog post URL)
   - https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/)
   - `curl -A "WhatsApp/2.0" https://lennykioko.com/blog/<slug>` → should return 200, not 500.
