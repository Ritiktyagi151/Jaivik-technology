import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ErpPage from "@/pages/service/ErpPage";

export const metadata: Metadata = pageMetadata("/erp");

export default function Page() {
  return <ErpPage />;
}