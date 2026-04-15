"use client";

import dynamic from "next/dynamic";

const BlogPostContent = dynamic(() => import("./blog-post-content"), {
  ssr: false,
});

export default function BlogPostLoader({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <BlogPostContent params={params} />;
}
