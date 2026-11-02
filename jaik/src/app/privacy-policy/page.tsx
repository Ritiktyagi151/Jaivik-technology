import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PrivacyPolicy from "@/pages/service/PrivacyPolicy";

export const metadata: Metadata = pageMetadata("/privacy-policy");

export default function Page() {
  return <PrivacyPolicy />;
}