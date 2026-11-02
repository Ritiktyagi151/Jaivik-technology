"use client";

import React, { useRef, useState, useEffect, memo } from "react";
import { cachedGet } from "@/lib/clientApiCache";
import { safePosterUrl } from "@/lib/media";
import { useBackButtonModal } from "@/lib/useBackButtonModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import { X, ArrowLeft as BackIcon } from "lucide-react";
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import ReelVideoCard from "../../components/cards/ReelVideoCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

type VideoItem = {
  _id?: string;
  src: string;
  poster: string;
};

type VideosResponse = {
  success?: boolean;
  data?: VideoItem[];
};

const OurVideosSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const closeSelectedVideo = useBackButtonModal(
    Boolean(selectedVideo),
    () => setSelectedVideo(null),
    "home-video-player"
  );

  const [videoList, setVideoList] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await cachedGet<VideosResponse>(`${API_URL}/videos`);
        if (isMounted && response.data.success && Array.isArray(response.data.data)) {
          setVideoList(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch videos", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchVideos();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleVideoHover = (value: boolean) => {
    if (swiperRef.current?.autoplay) {
      if (value) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
    }
  };

  if (loading && videoList.length === 0) return null;

  return (
    <div className="overflow-hidden h-auto my-4">
      {/* Section Heading */}
      <div className="websiteHeading mb-4">
        <h2 className="uppercase text-gray-200 text-xl inline-block relative">
          <span className="flex font-bold items-center gap-1.5 ml-2">
            Our Videos
          </span>
        </h2>
      </div>

      {/* ── Swiper Carousel ── */}
      <div className="w-full group relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          watchSlidesProgress={true}
          centeredSlides={true}
          loop={videoList.length > 3}
          speed={700}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            /* Mobile: center card big, peek on both sides */
            0: {
              slidesPerView: 1.25,
              spaceBetween: 14,
            },
            480: {
              slidesPerView: 1.35,
              spaceBetween: 14,
            },
            /* Tablet */
            640: {
              slidesPerView: 2.2,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 2.6,
              spaceBetween: 14,
            },
            /* Desktop — unchanged */
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 4.5,
              spaceBetween: 10,
            },
            1536: {
              slidesPerView: 5,
              spaceBetween: 12,
            },
          }}
          className="mySwiper !overflow-visible"
        >
          {videoList.map((item, index) => (
            <SwiperSlide
              key={item._id || `${item.src}-${index}`}
              className="
                !overflow-visible transition-all duration-500 ease-in-out
                max-md:!h-[260px]
                [&.swiper-slide-active]:scale-100
                [&.swiper-slide-active]:opacity-100
                [&.swiper-slide-active]:z-10
                [&.swiper-slide-prev]:max-md:scale-[0.87]
                [&.swiper-slide-prev]:max-md:opacity-55
                [&.swiper-slide-next]:max-md:scale-[0.87]
                [&.swiper-slide-next]:max-md:opacity-55
                [&:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next)]:max-md:scale-[0.75]
                [&:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next)]:max-md:opacity-30
              "
            >
              <div
                className="cursor-pointer h-full"
                onClick={() => {
                  if (window.innerWidth <= 768) {
                    setSelectedVideo(item);
                  }
                }}
              >
                <ReelVideoCard
                  src={item.src}
                  poster={item.poster}
                  onHover={handleVideoHover}
                  aspectRatio="16/9"
                  scale="hover:scale-[1.05]"
                  classname="transition-all duration-500 ease-in-out h-full [.swiper-slide-active_&]:shadow-[0_8px_40px_rgba(0,0,0,0.6)] [.swiper-slide-active_&]:rounded-xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Nav Arrows */}
        <ArrowLeft onClick={() => swiperRef.current?.slidePrev()} />
        <ArrowRight onClick={() => swiperRef.current?.slideNext()} />
      </div>

      {/* ── Mobile Fullscreen Overlay ── */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
          <button
            className="absolute top-5 left-4 text-white p-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md active:scale-95 transition-transform"
            onClick={closeSelectedVideo}
          >
            <BackIcon size={22} />
          </button>

          <button
            className="absolute top-5 right-4 text-white p-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md active:scale-95 transition-transform"
            onClick={closeSelectedVideo}
          >
            <X size={22} />
          </button>

          <video
            src={selectedVideo.src}
            poster={safePosterUrl(selectedVideo.poster)}
            controls
            autoPlay
            playsInline
            className="w-[92vw] max-w-lg rounded-2xl shadow-2xl max-h-[82vh] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default memo(OurVideosSection);
