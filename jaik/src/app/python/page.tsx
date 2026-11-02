import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Python from "@/pages/language_page/Python";

export const metadata: Metadata = pageMetadata("/python");

export default function Page() {
  return <Python />;
}