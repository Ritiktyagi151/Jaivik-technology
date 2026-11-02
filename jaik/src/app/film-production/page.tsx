import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import FilmProduction from "@/pages/service/Film_Production";

export const metadata: Metadata = pageMetadata("/film-production");

export default function Page() {
  return <FilmProduction />;
}