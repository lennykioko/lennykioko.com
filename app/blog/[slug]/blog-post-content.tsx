"use client";

import { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/blog/image-lightbox";
import { Calendar, Clock, ArrowLeft, Pencil } from "lucide-react";

function estimateReadingTime(html: string): string {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function BlogPostJsonLd({
  post,
  slug,
}: {
  post: {
    title: string;
    description: string;
    author: string;
    content: string;
    coverImageUrl?: string;
    publishedAt?: number;
    createdAt: number;
  };
  slug: string;
}) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL_SEO || "https://lennykioko.com";
  const wordCount = post.content.replace(/<[^>]*>/g, "").split(/\s+/).length;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    ...(post.coverImageUrl ? { image: post.coverImageUrl } : {}),
    datePublished: new Date(
      post.publishedAt ?? post.createdAt,
    ).toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
    },
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function BlogPostContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = useQuery(api.blog.getBySlug, { slug });
  const approvalStatus = useQuery(api.admins.getMyApprovalStatus);
  const isSuperAdmin = approvalStatus?.isSuperAdmin ?? false;
  const articleRef = useRef<HTMLElement | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null,
  );

  useEffect(() => {
    const node = articleRef.current;
    if (!node) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const img = target?.closest("img");
      if (!img || !node.contains(img)) return;
      e.preventDefault();
      setLightbox({ src: img.src, alt: img.alt || "" });
    };
    node.addEventListener("click", onClick);
    return () => node.removeEventListener("click", onClick);
  }, [post?.content]);

  if (post === undefined) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-3xl grow px-6 py-16">
          <div className="animate-pulse">
            <div className="mb-8 h-4 w-24 rounded bg-muted" />
            <div className="mb-4 flex gap-2">
              <div className="h-5 w-16 rounded bg-muted" />
              <div className="h-5 w-20 rounded bg-muted" />
            </div>
            <div className="mb-4 h-10 w-3/4 rounded bg-muted" />
            <div className="mb-10 h-4 w-1/2 rounded bg-muted" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-3xl grow px-6 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Post not found
          </h1>
          <p className="mb-8 text-muted-foreground">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild variant="outline">
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BlogPostJsonLd post={post} slug={slug} />
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
          {isSuperAdmin && (
            <Button asChild variant="outline" size="sm">
              <Link href={`/blog/${slug}/edit`}>
                <Pencil className="mr-2 h-3.5 w-3.5" />
                Edit
              </Link>
            </Button>
          )}
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
              {new Date(
                post.publishedAt ?? post.createdAt,
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {estimateReadingTime(post.content)}
            </span>
          </div>
        </header>

        {post.coverImageUrl && (
          <button
            type="button"
            onClick={() =>
              setLightbox({
                src: post.coverImageUrl as string,
                alt: post.title,
              })
            }
            aria-label="Open cover image"
            className="-mx-6 mb-10 block w-[calc(100%+3rem)] overflow-hidden sm:mx-0 sm:w-full sm:rounded-xl"
          >
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full cursor-zoom-in object-cover"
              priority
            />
          </button>
        )}

        <article
          ref={articleRef}
          className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline prose-img:cursor-zoom-in prose-img:rounded-lg [&_img]:-mx-6 [&_img]:w-[calc(100%+3rem)] [&_img]:max-w-none sm:[&_img]:mx-0 sm:[&_img]:w-auto sm:[&_img]:max-w-full"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        />
      </main>
      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
      <Footer />
    </div>
  );
}
