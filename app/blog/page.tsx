import type { Metadata } from "next";
import BlogListContent from "./blog-list-content";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL_SEO || "https://lennykioko.com";

const DESCRIPTION =
  "Notes on software engineering, financial technology, and trading from Lenny Kioko.";

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  openGraph: {
    title: "Blog | Lenny Kioko",
    description: DESCRIPTION,
    url: `${siteUrl}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Lenny Kioko",
    description: DESCRIPTION,
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

export default function BlogPage() {
  return <BlogListContent />;
}
