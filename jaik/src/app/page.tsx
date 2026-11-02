import type { Metadata } from "next";
import Home from "@/pages/home/Home";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/");

export default function Page() {
  return <Home />;
}
