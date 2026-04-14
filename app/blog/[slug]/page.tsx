import type { Metadata } from "next";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import BlogPostLoader from "./blog-post-loader";

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string,
);

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL_SEO || "https://lennykioko.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let post: {
    title: string;
    description: string;
    author: string;
    publishedAt?: number;
    createdAt: number;
  } | null = null;

  try {
    post = await convex.query(api.blog.getBySlug, { slug });
  } catch {
    // Convex query failed — fall through to fallback metadata
  }

  if (!post) {
    return {
      title: "Post Not Found",
      alternates: { canonical: `${siteUrl}/blog/${slug}` },
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${slug}`,
      type: "article",
      publishedTime: new Date(
        post.publishedAt ?? post.createdAt,
      ).toISOString(),
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <BlogPostLoader params={params} />;
}
