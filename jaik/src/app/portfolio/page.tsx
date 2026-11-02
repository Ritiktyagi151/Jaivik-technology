import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Portfolio from "@/pages/service/Portfolio";

export const metadata: Metadata = pageMetadata("/portfolio");

export default function Page() {
  return <Portfolio />;
}