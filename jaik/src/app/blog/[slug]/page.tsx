import type { Metadata } from "next";
import BlogDetail from "@/pages/blogs/BlogDetail";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const MEDIA_BASE = API_BASE.replace("/api", "");

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!API_BASE) return {};
  try {
    const { slug } = await params;
    const res = await fetch(`${API_BASE}/blogs/${slug}`, { cache: "no-store" });
    if (!res.ok) return {};
    const payload = await res.json();
    const blog = payload?.data;
    if (!blog) return {};

    const canonical = blog.canonicalUrl || `${SITE_URL}/blog/${blog.slug}`;
    const title = blog.metaTitle || blog.title;
    const description = blog.metaDescription || blog.description;
    const keywords = Array.isArray(blog.metaKeywords) ? blog.metaKeywords.join(", ") : undefined;
    const image = blog.image ? `${MEDIA_BASE}${blog.image}` : undefined;
    const publisher = process.env.NEXT_PUBLIC_SITE_PUBLISHER || blog.author || "Jaivik Technology";

    return {
      metadataBase: new URL(SITE_URL),
      title,
      description,
      keywords,
      alternates: { canonical },
      robots: { index: true, follow: true },
      authors: blog.author ? [{ name: blog.author }] : undefined,
      openGraph: {
        title,
        description,
        url: canonical,
        type: "article",
        images: image ? [{ url: image }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: image ? [image] : [],
      },
      other: {
        publisher,
      },
    };
  } catch {
    return {};
  }
}

export default function BlogDetailPage() {
  return <BlogDetail />;
}