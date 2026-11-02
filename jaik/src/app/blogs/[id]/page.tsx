import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import BlogDetail from "@/pages/blogs/BlogDetail";

export const metadata: Metadata = pageMetadata("/blogs/[id]");

export default function Page() {
  return <BlogDetail />;
}