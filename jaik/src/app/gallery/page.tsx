import type { Metadata } from "next";
import GalleryClient from "@/components/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | Jaivik Technology",
  description:
    "Explore Jaivik Technology's latest banners, gallery images, and visual updates.",
};

export default function Page() {
  return <GalleryClient />;
}
