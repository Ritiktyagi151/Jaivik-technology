import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import JQuery from "@/pages/language_page/jQuery";

export const metadata: Metadata = pageMetadata("/jquery");

export default function Page() {
  return <JQuery />;
}