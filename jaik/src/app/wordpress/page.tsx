import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Wordpress from "@/pages/language_page/Wordpress";

export const metadata: Metadata = pageMetadata("/wordpress");

export default function Page() {
  return <Wordpress />;
}