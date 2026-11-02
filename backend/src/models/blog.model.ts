import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  slug: string;
  draft: {
    title: string;
    slug: string;
    description: string;
    content: string;
    category: string;
    tags: string[];
    author: string;
    image: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    canonicalUrl?: string;
  };
  published?: {
    title: string;
    slug: string;
    description: string;
    content: string;
    category: string;
    tags: string[];
    author: string;
    image: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    canonicalUrl?: string;
  };
  status: "draft" | "scheduled" | "published";
  publishedAt?: Date;
  scheduledAt?: Date;
  views: number;
  locked: boolean;
}

const blogContentSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    description: { type: String, required: true, maxlength: 500 },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    author: { type: String, default: "Admin" },
    image: { type: String, required: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: [String], default: [] },
    canonicalUrl: { type: String },
  },
  { _id: false }
);

const blogSchema = new Schema<IBlog>(
  {
    slug: { type: String, required: true, trim: true, unique: true },
    draft: { type: blogContentSchema, required: true },
    published: { type: blogContentSchema, required: false },
    status: { type: String, enum: ["draft", "scheduled", "published"], default: "draft" },
    publishedAt: { type: Date },
    scheduledAt: { type: Date },
    views: { type: Number, default: 0 },
    locked: { type: Boolean, default: false },
  },
  {
    timestamps: true
  }
);

blogSchema.index({ "published.slug": 1 }, { unique: true, sparse: true });

blogSchema.pre("validate", function (next) {
  const canonicalSlug = this.published?.slug || this.draft?.slug;

  if (!canonicalSlug) {
    return next(new Error("Blog slug is required"));
  }

  this.slug = canonicalSlug;

  if (this.draft && !this.draft.slug) {
    this.draft.slug = canonicalSlug;
  }

  if (this.published && !this.published.slug) {
    this.published.slug = canonicalSlug;
  }

  next();
});

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
