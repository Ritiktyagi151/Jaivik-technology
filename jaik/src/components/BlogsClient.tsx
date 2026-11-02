"use client";

import dynamic from "next/dynamic";

const Blogs = dynamic(() => import("@/pages/blogs/Blogs"), {
  ssr: false,
});

export default function BlogsClient() {
  return <Blogs />;
}