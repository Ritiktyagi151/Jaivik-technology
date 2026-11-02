import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import CRMPage from "@/pages/service/CRMPage";

export const metadata: Metadata = pageMetadata("/crm");

export default function Page() {
  return <CRMPage />;
}