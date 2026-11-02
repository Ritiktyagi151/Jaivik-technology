// src/interfaces/blogInterface.ts

export interface blogContentInterface {
  title: string;
  slug?: string;
  description: string;
  content: string;
  category: string;
  tags?: string[];
  author: string;
  image: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  canonicalUrl?: string;
}

export interface blogInterface {
  _id?: string;          // Backend MongoDB ID
  id?: string;           // Slug/Frontend ID (legacy)
  slug?: string;
  category?: string;
  author?: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  scheduledAt?: string;

  title?: string;
  description?: string;
  summary?: string;
  image?: string;
  content?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  canonicalUrl?: string;

  draft?: blogContentInterface;
  published?: blogContentInterface;
  locked?: boolean;      // Admin lock status
  status?: string;       // published/draft/scheduled
}
