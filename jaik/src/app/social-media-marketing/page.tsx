import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SocialMediaMarketing from "@/pages/service/Socail_Media";

export const metadata: Metadata = pageMetadata("/social-media-marketing");

export default function Page() {
  return <SocialMediaMarketing />;
}