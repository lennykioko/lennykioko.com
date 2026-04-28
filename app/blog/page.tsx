import type { Metadata } from "next";
import BlogListContent from "./blog-list-content";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL_SEO || "https://lennykioko.com";

const DESCRIPTION =
  "Notes on technology, fintech, leadership and personal reflections from Lenny Kioko.";

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  openGraph: {
    title: "Blog | Lenny Kioko",
    description: DESCRIPTION,
    url: `${siteUrl}/blog`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lenny Kioko — Tech Consultant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Lenny Kioko",
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

export default function BlogPage() {
  return <BlogListContent />;
}
