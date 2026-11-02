import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import CustomizedSoftware from "@/pages/service/CustomizedSoftware";

export const metadata: Metadata = pageMetadata("/cusotmized-software");

export default function Page() {
  return <CustomizedSoftware />;
}