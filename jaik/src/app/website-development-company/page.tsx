import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import WebDevelopment from "@/pages/service/Web_Development";

export const metadata: Metadata = pageMetadata("/website-development-company");

export default function Page() {
  return <WebDevelopment />;
}
