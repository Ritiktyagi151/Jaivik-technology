import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Java from "@/pages/language_page/Java";

export const metadata: Metadata = pageMetadata("/java");

export default function Page() {
  return <Java />;
}