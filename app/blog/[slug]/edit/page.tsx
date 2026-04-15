"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { BlogForm } from "@/components/blog/blog-form";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EditBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const approvalStatus = useQuery(api.admins.getMyApprovalStatus);
  const post = useQuery(api.blog.getBySlug, { slug });
  const loading = approvalStatus === undefined || post === undefined;
  const denied = !loading && (!approvalStatus?.isSuperAdmin || !post);

  useEffect(() => {
    if (denied) router.replace("/blog");
  }, [denied, router]);

  if (loading || denied || !post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-4xl grow px-6 py-16">
          <p className="text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">
        <BlogForm
          mode="edit"
          initialData={{
            id: post._id,
            slug: post.slug,
            title: post.title,
            description: post.description,
            content: post.content,
            coverImageUrl: post.coverImageUrl,
            tags: post.tags,
            author: post.author,
            published: post.published,
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
