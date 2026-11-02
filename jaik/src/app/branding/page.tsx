import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import BrandPromotion from "@/pages/service/Brand_Promotion";

export const metadata: Metadata = pageMetadata("/branding");

export default function Page() {
  return <BrandPromotion />;
}