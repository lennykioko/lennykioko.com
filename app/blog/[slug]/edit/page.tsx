"use client";

import { use } from "react";
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

  if (approvalStatus === undefined || post === undefined) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-4xl px-6 py-16">
          <p className="text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!approvalStatus?.isSuperAdmin || !post) {
    router.replace("/blog");
    return null;
  }

  return (
    <>
      <Header />
      <main>
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
    </>
  );
}
