import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import BrochurePdfPage from "@/pages/service/BrochurePdfPage";

export const metadata: Metadata = pageMetadata("/brochure");

export default function Page() {
  return <BrochurePdfPage />;
}