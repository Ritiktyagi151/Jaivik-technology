"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import { X, ArrowLeft as BackIcon } from "lucide-react";
import { cachedGet } from "@/lib/clientApiCache";
// ✅ API URLs from Environment
const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""; 
const MEDIA_BASE = API_BASE.replace('/api', '');

interface Banner {
  _id: string;
  url: string;
  status: string;
  title?: string;
  altText?: string;
}

const GalleryImages = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const isHoveringRef = useRef(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // ✅ API States
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Banners Logic
  const fetchBanners = useCallback(async () => {
    try {
      setLoading(true);
      const response = await cachedGet(`${API_BASE}/banners`);
      // Sirf 'active' banners dikhane ke liye filter
      const allBanners = response.data.data || [];
      const activeBanners = allBanners.filter((b: Banner) => b.status === "active");
      setBanners(activeBanners);
    } catch (err) {
      console.error("Gallery Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const handleVideoHover = (value: boolean) => {
    isHoveringRef.current = value;
    if (swiperRef.current) {
      setTimeout(() => {
        if (isHoveringRef.current && swiperRef.current?.autoplay) {
          swiperRef.current.autoplay.stop();
        } else if (!isHoveringRef.current && swiperRef.current?.autoplay) {
          swiperRef.current.autoplay.start();
        }
      }, 50);
    }
  };

  // ✅ Loading & Empty State
  if (loading) return <div className="h-40 flex items-center justify-center text-gray-500">Loading Banners...</div>;

  if (banners.length === 0) {
    return (
      <div className="overflow-hidden h-auto my-4">
        <div className="websiteHeading mb-4">
          <h2 className="uppercase text-gray-200 text-xl inline-block relative">
            <span className="flex font-bold items-center gap-1.5 ml-2">Banners</span>
          </h2>
        </div>
        <p className="text-gray-400 text-center py-10">No active banners available.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden h-auto my-4">
      <div className="websiteHeading mb-4">
        <h2 className="uppercase text-gray-200 text-xl inline-block relative">
          <Link
            href="/gallery"
            className="flex font-bold items-center gap-1.5 ml-2"
          >
            Banners
          </Link>
        </h2>
      </div>
      <div className="w-full group relative">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 8 },
            480: { slidesPerView: 1, spaceBetween: 8 },
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 1, spaceBetween: 10 },
            1024: { slidesPerView: 2, spaceBetween: 12 },
            1280: { slidesPerView: 2, spaceBetween: 12 },
            1536: { slidesPerView: 2, spaceBetween: 15 },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            bulletClass:
              "swiper-pagination-bullet bg-gray-400 w-2 h-2 opacity-50",
            bulletActiveClass:
              "swiper-pagination-bullet-active bg-red-500 opacity-100",
          }}
          loop={banners.length > 2}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          speed={500}
          className="mySwiper !overflow-visible"
        >
          {banners.map((banner: Banner, index: number) => {
            // ✅ Handle both Absolute and Relative URLs
            const imageUrl = banner.url.startsWith('http') ? banner.url : `${MEDIA_BASE}${banner.url}`;
            
            return (
              <SwiperSlide
                key={banner._id}
                className="hover:z-50 transition-all duration-200"
              >
                <div
                  className="hover:scale-105 transition-all duration-300 h-full object-cover hover:z-[1000] hover:shadow-lg rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => {
                    if (window.innerWidth <= 768) {
                      setSelectedImage(imageUrl);
                    }
                  }}
                  onMouseEnter={() => handleVideoHover(true)}
                  onMouseOver={() => handleVideoHover(true)}
                  onMouseOut={() => handleVideoHover(false)}
                  onMouseLeave={() => handleVideoHover(false)}
                >
                  <img
                    src={imageUrl}
                    loading="lazy"
                    alt={banner.altText || `Banner Image ${index + 1}`}
                    className="w-full h-auto object-cover rounded-lg hover:brightness-105 transition-all duration-300"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="swiper-pagination top-3 text-right pr-5 z-10" />
      </div>

      {/* Overlay for Mobile Fullscreen */}
      {selectedImage && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-center justify-center p-4">
          <button
            className="absolute top-4 left-4 text-white p-2 rounded-full bg-black/40"
            onClick={() => setSelectedImage(null)}
          >
            <BackIcon size={24} />
          </button>

          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/40"
            onClick={() => setSelectedImage(null)}
          >
            <X size={26} />
          </button>

          <img
            src={selectedImage}
            alt="Fullscreen Banner"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default GalleryImages;
