"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { BlogEditor } from "./blog-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";

const DEFAULT_AUTHOR = "Lenny Kioko";

interface BlogFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: Id<"blogPosts">;
    slug: string;
    title: string;
    description: string;
    content: string;
    coverImageUrl?: string;
    tags: string[];
    author: string;
    published: boolean;
  };
}

export function BlogForm({ mode, initialData }: BlogFormProps) {
  const router = useRouter();
  const createPost = useMutation(api.blog.create);
  const updatePost = useMutation(api.blog.update);

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );
  const [content, setContent] = useState(initialData?.content ?? "");
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [author, setAuthor] = useState(initialData?.author ?? DEFAULT_AUTHOR);
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (mode === "create" || slug === generateSlug(initialData?.title ?? "")) {
      setSlug(generateSlug(value));
    }
  };

  const addTag = () => {
    const newTags = tagInput
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t && !tags.includes(t));
    if (newTags.length > 0) {
      setTags([...tags, ...newTags]);
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!slug.trim()) {
      setError("Slug is required");
      return;
    }
    if (!description.trim()) {
      setError("Description is required");
      return;
    }
    if (!content.trim() || content === "<p></p>") {
      setError("Content is required");
      return;
    }

    setSaving(true);
    try {
      if (mode === "create") {
        await createPost({
          slug: slug.trim(),
          title: title.trim(),
          description: description.trim(),
          content,
          tags,
          author: author.trim() || DEFAULT_AUTHOR,
          published,
        });
      } else if (initialData) {
        await updatePost({
          id: initialData.id,
          slug: slug.trim(),
          title: title.trim(),
          description: description.trim(),
          content,
          tags,
          author: author.trim() || DEFAULT_AUTHOR,
          published,
        });
      }
      router.push("/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch
              checked={published}
              onCheckedChange={setPublished}
              id="published"
            />
            <Label htmlFor="published" className="text-sm text-muted-foreground">
              {published ? "Published" : "Draft"}
            </Label>
          </div>
          <Button type="submit" disabled={saving}>
            {saving
              ? "Saving..."
              : mode === "create"
                ? "Create Post"
                : "Save Changes"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <Label htmlFor="title" className="mb-1.5 block text-sm font-medium">
            Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title"
            className="text-lg"
          />
        </div>

        <div>
          <Label htmlFor="slug" className="mb-1.5 block text-sm font-medium">
            Slug
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">/blog/</span>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="post-slug"
              className="font-mono text-sm"
            />
          </div>
        </div>

        <div>
          <Label
            htmlFor="description"
            className="mb-1.5 block text-sm font-medium"
          >
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description for SEO and post cards"
            rows={2}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label
              htmlFor="author"
              className="mb-1.5 block text-sm font-medium"
            >
              Author
            </Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author name"
            />
          </div>

          <div>
            <Label htmlFor="tags" className="mb-1.5 block text-sm font-medium">
              Tags
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={addTag}
                placeholder="Add tag and press Enter"
              />
            </div>
            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 text-xs"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-0.5 rounded-full hover:bg-muted"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <Label className="mb-1.5 block text-sm font-medium">Content</Label>
          <BlogEditor content={content} onChange={setContent} />
        </div>
      </div>
    </form>
  );
}
