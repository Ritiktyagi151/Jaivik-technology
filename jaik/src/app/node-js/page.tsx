import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import NodeJS from "@/pages/language_page/NodeJS";

export const metadata: Metadata = pageMetadata("/node-js");

export default function Page() {
  return <NodeJS />;
}