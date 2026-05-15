import type { MetadataRoute } from "next";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { resourcesData } from "@/lib/resourcesData";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL_SEO || "https://lennykioko.com";

export const revalidate = 43200; // 12 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/career`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/trading`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/hobbies`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const resourceEntries: MetadataRoute.Sitemap = Object.entries(
    resourcesData,
  ).map(([slug, data]) => ({
    url: `${siteUrl}/resources/${data.category}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

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

  return [...staticEntries, ...resourceEntries, ...postEntries];
}
