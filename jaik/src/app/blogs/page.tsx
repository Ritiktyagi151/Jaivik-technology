import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import BlogsClient from "@/components/BlogsClient"; // ✅ wrapper use karo

export const metadata: Metadata = pageMetadata("/blogs");

export default function Page() {
  return <BlogsClient />;
}