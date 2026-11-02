import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ReactJS from "@/pages/language_page/ReactJS";

export const metadata: Metadata = pageMetadata("/react-js");

export default function Page() {
  return <ReactJS />;
}