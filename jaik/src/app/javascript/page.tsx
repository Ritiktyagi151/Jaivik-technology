import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import JavaScript from "@/pages/language_page/JavaScript";

export const metadata: Metadata = pageMetadata("/javascript");

export default function Page() {
  return <JavaScript />;
}