"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, Pencil } from "lucide-react";

function estimateReadingTime(html: string): string {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export default function BlogListContent() {
  const approvalStatus = useQuery(api.admins.getMyApprovalStatus);
  const isSuperAdmin = approvalStatus?.isSuperAdmin ?? false;
  const posts = useQuery(
    isSuperAdmin ? api.blog.listAll : api.blog.listPublished,
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-4xl grow px-6 py-16">
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="mb-4 text-3xl font-bold text-foreground">Blog</h1>
            <p className="text-lg text-muted-foreground">
              Notes on technology, fintech, leadership and personal reflections.
            </p>
          </div>
          {isSuperAdmin && (
            <Button asChild>
              <Link href="/blog/new">
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Link>
            </Button>
          )}
        </div>

        {posts === undefined ? (
          <div className="grid gap-8 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-border p-6"
              >
                <div className="mb-3 flex gap-2">
                  <div className="h-5 w-16 rounded bg-muted" />
                  <div className="h-5 w-20 rounded bg-muted" />
                </div>
                <div className="mb-2 h-6 w-3/4 rounded bg-muted" />
                <div className="mb-4 h-4 w-full rounded bg-muted" />
                <div className="h-4 w-1/3 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Check back soon!</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {posts.map((post) => (
              <div
                key={post._id}
                className="group relative overflow-hidden rounded-xl border border-border transition-shadow hover:shadow-md"
              >
                {isSuperAdmin && (
                  <Link
                    href={`/blog/${post.slug}/edit`}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-background/80 text-muted-foreground opacity-0 backdrop-blur transition-opacity hover:bg-background group-hover:opacity-100"
                    title="Edit post"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                )}
                <Link href={`/blog/${post.slug}`}>
                  {post.coverImageUrl && (
                    <Image
                      src={post.coverImageUrl}
                      alt=""
                      width={600}
                      height={300}
                      className="h-44 w-full object-cover"
                    />
                  )}
                  <div className="p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
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
                  <h2 className="mb-2 text-xl font-semibold text-foreground group-hover:text-amber-600">
                    {post.title}
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(
                        post.publishedAt ?? post.createdAt,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {estimateReadingTime(post.content)}
                    </span>
                  </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
