import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import About from "@/pages/about/About";

export const metadata: Metadata = pageMetadata("/about");

export default function Page() {
  return <About />;
}