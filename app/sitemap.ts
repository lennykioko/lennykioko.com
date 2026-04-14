import type { MetadataRoute } from "next";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL_SEO || "https://lennykioko.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/career`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/trading`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/hobbies`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.9 },
  ];

  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const convex = new ConvexHttpClient(
      process.env.NEXT_PUBLIC_CONVEX_URL as string,
    );
    const posts = await convex.query(api.blog.listPublished);
    postEntries = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Convex unreachable — fall back to static entries only
  }

  return [...staticEntries, ...postEntries];
}
