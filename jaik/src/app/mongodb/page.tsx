import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import MongoDB from "@/pages/language_page/MongoDB";

export const metadata: Metadata = pageMetadata("/mongodb");

export default function Page() {
  return <MongoDB />;
}