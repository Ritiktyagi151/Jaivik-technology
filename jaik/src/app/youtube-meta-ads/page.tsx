import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import YoutubeMetaAds from "@/pages/service/Youtube_Meta_Ads";

export const metadata: Metadata = pageMetadata("/youtube-meta-ads");

export default function Page() {
  return <YoutubeMetaAds />;
}