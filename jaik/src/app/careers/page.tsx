import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Careers from "@/pages/careers/Careers";

export const metadata: Metadata = pageMetadata("/careers");

export default function Page() {
  return <Careers />;
}