import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Laravel from "@/pages/language_page/Laravel";

export const metadata: Metadata = pageMetadata("/laravel");

export default function Page() {
  return <Laravel />;
}