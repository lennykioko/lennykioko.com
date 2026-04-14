"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { BlogForm } from "@/components/blog/blog-form";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NewBlogPostPage() {
  const router = useRouter();
  const approvalStatus = useQuery(api.admins.getMyApprovalStatus);

  if (approvalStatus === undefined) {
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

  if (!approvalStatus?.isSuperAdmin) {
    router.replace("/blog");
    return null;
  }

  return (
    <>
      <Header />
      <main>
        <BlogForm mode="create" />
      </main>
      <Footer />
    </>
  );
}
