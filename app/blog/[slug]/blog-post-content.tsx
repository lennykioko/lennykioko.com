"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageLightbox } from "@/components/blog/image-lightbox";

type Props = {
  title: string;
  coverImageUrl?: string;
  sanitizedContent: string;
};

export default function BlogPostBody({
  title,
  coverImageUrl,
  sanitizedContent,
}: Props) {
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
  }, []);

  return (
    <>
      {coverImageUrl && (
        <button
          type="button"
          onClick={() => setLightbox({ src: coverImageUrl, alt: title })}
          aria-label="Open cover image"
          className="-mx-6 mb-10 block w-[calc(100%+3rem)] overflow-hidden sm:mx-0 sm:w-full sm:rounded-xl"
        >
          <Image
            src={coverImageUrl}
            alt={title}
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
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
