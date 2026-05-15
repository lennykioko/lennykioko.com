import type { Metadata } from "next";
import { cache } from "react";
import { ConvexHttpClient } from "convex/browser";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { sanitize, jsonLd } from "@/lib/sanitize";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import BlogPostBody from "./blog-post-content";
import BlogEditButton from "./blog-edit-button";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL_SEO || "https://lennykioko.com";

type Post = {
  title: string;
  description: string;
  author: string;
  content: string;
  tags: string[];
  published: boolean;
  coverImageUrl?: string;
  publishedAt?: number;
  createdAt: number;
};

const fetchPost = cache(async (slug: string): Promise<Post | null> => {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return null;
  try {
    const convex = new ConvexHttpClient(url);
    return (await convex.query(api.blog.getBySlug, { slug })) as Post | null;
  } catch {
    return null;
  }
});

function estimateReadingTime(html: string): string {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      alternates: { canonical: `${siteUrl}/blog/${slug}` },
      robots: { index: false, follow: false },
    };
  }

  const ogImages = [post.coverImageUrl || "/og-image.png"];

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${siteUrl}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${slug}`,
      type: "article",
      publishedTime: new Date(
        post.publishedAt ?? post.createdAt,
      ).toISOString(),
      authors: [post.author],
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ogImages,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    notFound();
  }

  const sanitizedContent = sanitize(post.content);
  const wordCount = post.content
    .replace(/<[^>]*>/g, "")
    .split(/\s+/)
    .filter(Boolean).length;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    ...(post.coverImageUrl ? { image: post.coverImageUrl } : {}),
    datePublished: new Date(post.publishedAt ?? post.createdAt).toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Person",
      name: "Lenny Kioko",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
    wordCount,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${slug}`,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />
      <Header />
      <main className="mx-auto w-full max-w-3xl grow px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <BlogEditButton slug={slug} />
        </div>

        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {!post.published && (
              <Badge
                variant="outline"
                className="border-amber-300 text-xs text-amber-600"
              >
                Draft
              </Badge>
            )}
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString(
                "en-US",
                { year: "numeric", month: "long", day: "numeric" },
              )}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {estimateReadingTime(post.content)}
            </span>
          </div>
        </header>

        <BlogPostBody
          title={post.title}
          coverImageUrl={post.coverImageUrl}
          sanitizedContent={sanitizedContent}
        />
      </main>
      <Footer />
    </div>
  );
}
