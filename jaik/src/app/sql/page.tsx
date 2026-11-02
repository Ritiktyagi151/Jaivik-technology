import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SQL from "@/pages/language_page/SQL";

export const metadata: Metadata = pageMetadata("/sql");

export default function Page() {
  return <SQL />;
}