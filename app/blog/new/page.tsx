"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { BlogForm } from "@/components/blog/blog-form";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NewBlogPostPage() {
  const router = useRouter();
  const approvalStatus = useQuery(api.admins.getMyApprovalStatus);
  const denied =
    approvalStatus !== undefined && !approvalStatus?.isSuperAdmin;

  useEffect(() => {
    if (denied) router.replace("/blog");
  }, [denied, router]);

  if (approvalStatus === undefined || denied) {
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
        <BlogForm mode="create" />
      </main>
      <Footer />
    </div>
  );
}
