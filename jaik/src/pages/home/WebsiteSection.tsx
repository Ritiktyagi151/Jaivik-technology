"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import { cachedGet } from "@/lib/clientApiCache";
// Axios import kiya
import "swiper/swiper-bundle.css";
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import WebsiteCard, { type WebsiteCardItem } from "../../components/cards/WebsiteCard";

// ✅ Blog ki tarah API URL environment variable se liya
const API_URL = `${process.env.NEXT_PUBLIC_API_URL || ""}/websites`;

type WebsitesResponse = {
  success?: boolean;
  data?: WebsiteCardItem[];
};

const WebsiteSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const autoSlideLockRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ States for API Data
  const [websitesList, setWebsitesList] = useState<WebsiteCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Data logic same as Blogs
  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        setLoading(true);
        const response = await cachedGet<WebsitesResponse>(API_URL);
        if (response.data.success && Array.isArray(response.data.data)) {
          setWebsitesList(response.data.data);
        }
      } catch (error) {
        console.error("Fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWebsites();
  }, []);

  const onSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  const handleArrowClick = (direction: "prev" | "next") => {
    if (direction === "prev") swiperRef.current?.slidePrev();
    else swiperRef.current?.slideNext();
  };

  const handleWebsiteScrollComplete = (index: number) => {
    const swiper = swiperRef.current;

    if (
      !swiper ||
      websitesList.length <= 1 ||
      index !== swiper.realIndex ||
      autoSlideLockRef.current
    ) {
      return;
    }

    autoSlideLockRef.current = true;
    swiper.slideNext();

    window.setTimeout(() => {
      autoSlideLockRef.current = false;
    }, 500);
  };

  // Loading state (Style change nahi kiya, bas content control hai)
  if (loading && websitesList.length === 0) {
    return <div className="text-center py-20 text-white animate-pulse">Loading Projects...</div>;
  }

  return (
    <div className="overflow-hidden my-4 h-[350px] md:h-[400px] relative px-4 md:px-6 lg:px-8">
      <div className="websiteHeading mb-4">
        <h2 className="uppercase text-gray-200 text-xl inline-block relative">
          <h1 className="flex text-xl font-bold items-center gap-1.5 ml-2">
            Website
          </h1>
        </h2>
      </div>
      <div className="w-full group relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={15}
          slidesPerView="auto"
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 10 },
            640: { slidesPerView: 1.5, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 2.5, spaceBetween: 20 },
            1280: { slidesPerView: 2.8, spaceBetween: 20 },
          }}
          loop={websitesList.length > 2} // Loop tabhi jab sufficient slides hon
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActiveIndex(swiper.realIndex);
          }}
          onSlideChange={onSlideChange}
          className="mySwiper"
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={false}
        >
          {websitesList.map((website, index) => (
            <SwiperSlide key={website._id || index} className="!h-auto">
              <WebsiteCard
                index={index}
                website={website}
                shouldLoadMedia={index <= 2 || Math.abs(index - activeIndex) <= 2}
                isActive={index === activeIndex}
                onScrollComplete={() => handleWebsiteScrollComplete(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="sm:block">
          <ArrowLeft onClick={() => handleArrowClick("prev")} />
          <ArrowRight onClick={() => handleArrowClick("next")} />
        </div>
      </div>
    </div>
  );
};

export default WebsiteSection;
