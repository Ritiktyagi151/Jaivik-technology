import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactUs from "@/pages/contact/ContactUs";

export const metadata: Metadata = pageMetadata("/contact-us");

export default function Page() {
  return <ContactUs />;
}