import { Request, Response } from "express";
import { Blog } from "../models/blog.model";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeStringArray = (value: any): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String).map(v => v.trim()).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map(v => v.trim())
      .filter(Boolean);
  }
  return [];
};

const buildDraftFromBody = (body: any, existingDraft: any = {}) => {
  const title = body.title ?? body.draftTitle ?? existingDraft.title ?? "";
  const description = body.description ?? body.draftDescription ?? existingDraft.description ?? "";
  const content = body.content ?? body.draftContent ?? existingDraft.content ?? "";
  const category = body.category ?? body.draftCategory ?? existingDraft.category ?? "";
  const author = body.author ?? body.draftAuthor ?? existingDraft.author ?? "Admin";
  const image = body.image ?? body.draftImage ?? existingDraft.image ?? "";
  const tags = normalizeStringArray(body.tags ?? body.draftTags ?? existingDraft.tags);
  const metaTitle = body.metaTitle ?? body.draftMetaTitle ?? existingDraft.metaTitle;
  const metaDescription = body.metaDescription ?? body.draftMetaDescription ?? existingDraft.metaDescription;
  const metaKeywords = normalizeStringArray(body.metaKeywords ?? body.draftMetaKeywords ?? existingDraft.metaKeywords);
  const canonicalUrl = body.canonicalUrl ?? body.draftCanonicalUrl ?? existingDraft.canonicalUrl;
  const slug = slugify(title);

  return {
    title,
    slug,
    description,
    content,
    category,
    tags,
    author,
    image,
    metaTitle,
    metaDescription,
    metaKeywords,
    canonicalUrl,
  };
};

const assertValidSlug = (draft: { slug?: string }) => {
  if (!draft.slug) {
    throw new Error("Blog title is required to generate a valid slug");
  }
};

const pickPublishedPayload = (blog: any) => {
  const published = blog.published || blog.draft || {
    title: blog.title,
    slug: blog.slug,
    description: blog.description,
    content: blog.content,
    category: blog.category,
    tags: blog.tags || [],
    author: blog.author,
    image: blog.image,
    metaTitle: blog.metaTitle,
    metaDescription: blog.metaDescription,
    metaKeywords: blog.metaKeywords || [],
    canonicalUrl: blog.canonicalUrl,
  };

  return {
    _id: blog._id,
    title: published.title,
    slug: published.slug,
    description: published.description,
    content: published.content,
    category: published.category,
    tags: published.tags || [],
    author: published.author,
    image: published.image,
    metaTitle: published.metaTitle,
    metaDescription: published.metaDescription,
    metaKeywords: published.metaKeywords || [],
    canonicalUrl: published.canonicalUrl,
    status: blog.status,
    publishedAt: blog.publishedAt,
    scheduledAt: blog.scheduledAt,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    views: blog.views,
  };
};

// ADMIN: Get All Blogs (Drafts + Published)
export const getAllBlogsAdmin = async (req: Request, res: Response): Promise<any> => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Admin fetch error" });
  }
};

// PUBLIC: Get Published Only
export const getBlogs = async (req: Request, res: Response): Promise<any> => {
  try {
    const now = new Date();
    const blogs = await Blog.find({
      $or: [
        { status: "published" },
        { status: "scheduled", scheduledAt: { $lte: now } },
      ],
    }).sort({ publishedAt: -1, createdAt: -1 });

    const data = blogs.map((blog) => pickPublishedPayload(blog));
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Public fetch error" });
  }
};

// GET BY SLUG
export const getBlogBySlug = async (req: Request, res: Response): Promise<any> => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({
      $or: [
        { "published.slug": slug },
        { "draft.slug": slug },
        { slug },
      ],
    });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    const now = new Date();
    if (blog.status === "draft") {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    if (blog.status === "scheduled" && (!blog.scheduledAt || blog.scheduledAt > now)) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    if (blog.status === "scheduled" && blog.scheduledAt && blog.scheduledAt <= now) {
      blog.status = "published";
      blog.publishedAt = blog.publishedAt || blog.scheduledAt || new Date();
      if (!blog.published) {
        blog.published = blog.draft;
      }
    }

    blog.views += 1;
    await blog.save();
    return res.json({ success: true, data: pickPublishedPayload(blog) });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Slug fetch error" });
  }
};

// CREATE
export const createBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const blogData = { ...req.body };
    if (req.file) {
      blogData.image = `/uploads/${req.file.filename}`;
    }
    const draft = buildDraftFromBody(blogData);
    assertValidSlug(draft);
    if (blogData.image) {
      draft.image = blogData.image;
    }

    const status = blogData.status || "draft";
    const scheduledAt = blogData.scheduledAt ? new Date(blogData.scheduledAt) : undefined;
    const publishedAt = blogData.publishedAt ? new Date(blogData.publishedAt) : undefined;

    const blogPayload: any = {
      slug: draft.slug,
      draft,
      status,
      scheduledAt,
    };

    if (status === "published") {
      blogPayload.published = draft;
      blogPayload.publishedAt = publishedAt || new Date();
    }

    const blog = await Blog.create(blogPayload);
    return res.status(201).json({ success: true, data: blog });
  } catch (error: any) {
    if (error?.code === 11000 && error?.keyPattern?.slug) {
      return res.status(409).json({ success: false, message: "A blog with this slug already exists" });
    }
    return res.status(400).json({ success: false, message: error.message });
  }
};

// UPDATE
export const updateBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found to update" });
    }

    const draft = buildDraftFromBody(updateData, blog.draft);
    assertValidSlug(draft);
    if (updateData.image) {
      draft.image = updateData.image;
    }

    blog.slug = draft.slug;
    blog.draft = draft;

    const nextStatus = updateData.status || blog.status;
    const scheduledAt = updateData.scheduledAt ? new Date(updateData.scheduledAt) : blog.scheduledAt;
    const publishedAt = updateData.publishedAt ? new Date(updateData.publishedAt) : blog.publishedAt;

    blog.status = nextStatus;
    blog.scheduledAt = scheduledAt;

    if (nextStatus === "published") {
      blog.published = draft;
      blog.publishedAt = publishedAt || new Date();
    }

    await blog.save();
    return res.json({ success: true, data: blog });
  } catch (error: any) {
    if (error?.code === 11000 && error?.keyPattern?.slug) {
      return res.status(409).json({ success: false, message: "A blog with this slug already exists" });
    }
    return res.status(500).json({ success: false, message: error.message || "Update error" });
  }
};

// DELETE
export const deleteBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found to delete" });
    }
    return res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Delete error" });
  }
};

// TOGGLE LOCK
export const toggleLock = async (req: Request, res: Response): Promise<any> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    blog.locked = !blog.locked;
    await blog.save();
    return res.json({ success: true, data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lock error" });
  }
};
