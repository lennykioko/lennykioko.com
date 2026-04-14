import { ImageResponse } from "next/og";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";

export const alt = "Lenny Kioko Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_URL as string,
  );
  const post = await convex.query(api.blog.getBySlug, { slug });

  const title = post?.title ?? "Lenny Kioko Blog";
  const author = post?.author;
  const wordCount = post
    ? post.content.replace(/<[^>]*>/g, "").split(/\s+/).length
    : 0;
  const readingTime =
    wordCount > 0
      ? `${Math.max(1, Math.round(wordCount / 200))} min read`
      : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "16px",
          }}
        >
          Lenny Kioko · Blog
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          {title}
        </div>
        {author && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "32px",
              fontSize: 20,
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <span>{author}</span>
            {readingTime && (
              <>
                <span>·</span>
                <span>{readingTime}</span>
              </>
            )}
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
