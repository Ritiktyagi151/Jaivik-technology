import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import MobileApplication from "@/pages/service/Mobile_Application";

export const metadata: Metadata = pageMetadata("/mobile-application");

export default function Page() {
  return <MobileApplication />;
}