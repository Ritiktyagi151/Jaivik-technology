"use client";

import { useCallback, useEffect, useState } from "react";
import { cachedGet } from "@/lib/clientApiCache";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const MEDIA_BASE = API_BASE.replace("/api", "");

type Banner = {
  _id: string;
  url: string;
  status: string;
  title?: string;
  altText?: string;
};

const getImageUrl = (url: string) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `${MEDIA_BASE}${url}`;
};

export default function GalleryClient() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = useCallback(async () => {
    try {
      setLoading(true);
      const response = await cachedGet(`${API_BASE}/banners`);
      const allBanners = response.data.data || [];
      setBanners(allBanners.filter((banner: Banner) => banner.status === "active"));
    } catch (error) {
      console.error("Gallery Fetch Error:", error);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold uppercase text-white md:text-5xl">
              Gallery
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-gray-300 md:text-base">
              Explore the latest Jaivik Technology banners and visual updates.
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-64 items-center justify-center text-gray-400">
              Loading gallery...
            </div>
          ) : banners.length === 0 ? (
            <div className="flex min-h-64 items-center justify-center rounded border border-gray-800 text-gray-400">
              No active gallery images available.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {banners.map((banner, index) => {
                const imageUrl = getImageUrl(banner.url);

                return (
                  <figure
                    key={banner._id}
                    className="overflow-hidden rounded-md border border-gray-800 bg-gray-950"
                  >
                    <img
                      src={imageUrl}
                      alt={banner.altText || banner.title || `Gallery image ${index + 1}`}
                      className="aspect-video w-full object-cover transition duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    {banner.title && (
                      <figcaption className="px-4 py-3 text-sm font-medium text-gray-200">
                        {banner.title}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
