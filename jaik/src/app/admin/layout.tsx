import type { Metadata } from "next";
import { adminNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = adminNoIndexMetadata;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
