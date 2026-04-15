import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { isSuperAdmin } from "./admins";

export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!post) return null;

    if (!post.published) {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity || !isSuperAdmin(identity.email)) return null;
    }

    return post;
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !isSuperAdmin(identity.email)) return [];

    return await ctx.db.query("blogPosts").order("desc").collect();
  },
});

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function validateBlogFields(args: {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  author: string;
}) {
  if (!args.slug || args.slug.length > 200) {
    throw new Error("Slug must be 1–200 characters");
  }
  if (!SLUG_PATTERN.test(args.slug)) {
    throw new Error(
      "Slug can only contain lowercase letters, numbers, and hyphens",
    );
  }
  if (!args.title || args.title.length > 500) {
    throw new Error("Title must be 1–500 characters");
  }
  if (!args.description || args.description.length > 1000) {
    throw new Error("Description must be 1–1,000 characters");
  }
  if (!args.content || args.content.length > 200000) {
    throw new Error("Content must be 1–200,000 characters");
  }
  if (args.tags.length > 20) {
    throw new Error("Maximum 20 tags allowed");
  }
  if (args.tags.some((t) => t.length > 50)) {
    throw new Error("Each tag must be 50 characters or fewer");
  }
  if (!args.author || args.author.length > 200) {
    throw new Error("Author must be 1–200 characters");
  }
}

export const create = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    content: v.string(),
    coverImageUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    author: v.string(),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !isSuperAdmin(identity.email)) {
      throw new Error("Only super admins can create blog posts");
    }

    validateBlogFields(args);

    const existing = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (existing) {
      throw new Error("A post with this slug already exists");
    }

    const now = Date.now();
    return await ctx.db.insert("blogPosts", {
      ...args,
      publishedAt: args.published ? now : undefined,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("blogPosts"),
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    content: v.string(),
    coverImageUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    author: v.string(),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !isSuperAdmin(identity.email)) {
      throw new Error("Only super admins can update blog posts");
    }

    validateBlogFields(args);

    const post = await ctx.db.get(args.id);
    if (!post) throw new Error("Post not found");

    if (args.slug !== post.slug) {
      const existing = await ctx.db
        .query("blogPosts")
        .withIndex("by_slug", (q) => q.eq("slug", args.slug))
        .first();
      if (existing) {
        throw new Error("A post with this slug already exists");
      }
    }

    const now = Date.now();
    const { id, ...fields } = args;
    await ctx.db.patch(id, {
      ...fields,
      publishedAt:
        args.published && !post.published
          ? now
          : args.published
            ? post.publishedAt
            : undefined,
      updatedAt: now,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !isSuperAdmin(identity.email)) {
      throw new Error("Only super admins can delete blog posts");
    }

    const post = await ctx.db.get(args.id);
    if (!post) throw new Error("Post not found");

    if (post.coverImageUrl) {
      const storageIdMatch = post.coverImageUrl.match(
        /\/api\/storage\/(.+)$/,
      );
      if (storageIdMatch) {
        try {
          await ctx.storage.delete(storageIdMatch[1] as never);
        } catch {
          // Storage item may already be deleted
        }
      }
    }

    await ctx.db.delete(args.id);
  },
});
