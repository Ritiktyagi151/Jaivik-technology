import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SeoServices from "@/pages/service/Seo_Services";

export const metadata: Metadata = pageMetadata("/seo-services-in-india");

export default function Page() {
  return <SeoServices />;
}
