"use client";

import React, { useRef, useState, useEffect, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import { X, ArrowLeft as BackIcon } from "lucide-react";
import { cachedGet } from "@/lib/clientApiCache";
import { useBackButtonModal } from "@/lib/useBackButtonModal";
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import ReelVideoCard from "../../components/cards/ReelVideoCard";

// API configuration
const API_URL = `${process.env.NEXT_PUBLIC_API_URL || ""}/team-videos`;

const TeamVideoSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{
    video: string;
    poster: string;
  } | null>(null);
  const closeSelectedVideo = useBackButtonModal(
    Boolean(selectedVideo),
    () => setSelectedVideo(null),
    "team-video-player"
  );

  const [teamVideosList, setTeamVideosList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Memory leak bachane ke liye
    const fetchTeamVideos = async () => {
      try {
        setLoading(true);
        const response = await cachedGet(API_URL);
        if (isMounted) {
          if (response.data.success) {
            setTeamVideosList(response.data.data);
          } else {
            setTeamVideosList(response.data); 
          }
        }
      } catch (error) {
        console.error("Team videos fetch failed", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchTeamVideos();
    return () => { isMounted = false; };
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

  if (loading && teamVideosList.length === 0) {
    return <div className="h-40 flex items-center justify-center text-white animate-pulse text-sm">Loading Team Videos...</div>;
  }

  const isLoopable = teamVideosList.length >= 8; 

  return (
    <div className="overflow-hidden h-auto my-4">
      <div className="websiteHeading mb-4">
        <h2 className="uppercase text-gray-200 text-xl inline-block relative">
          <span className="flex font-bold items-center gap-1.5 ml-2">
            Meet Our Team
          </span>
        </h2>
      </div>

      <div className="w-full group relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={4.5}
          // Performance Fix: Sirf visible slides ki calculation hogi
          watchSlidesProgress={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={isLoopable} 
          autoplay={{
            delay: 4000, // Speed Fix: 3000ms se 4000ms kiya taaki CPU par load kam pade
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          speed={800} // Smoothness optimization
          className="mySwiper !overflow-visible"
          breakpoints={{
            320: { slidesPerView: 1.2, loop: teamVideosList.length > 2 },
            640: { slidesPerView: 2.5, loop: teamVideosList.length > 4 },
            1024: { slidesPerView: 3.5, loop: teamVideosList.length > 6 },
            1280: { slidesPerView: 4.5, loop: isLoopable },
          }}
        >
          {teamVideosList.map((item, index) => (
            <SwiperSlide key={item._id || index} className="hover:z-50 !overflow-visible">
              <div
                className="cursor-pointer"
                onClick={() => {
                  if (window.innerWidth <= 768) {
                    setSelectedVideo(item);
                  }
                }}
              >
                <ReelVideoCard
                  src={item.video}
                  onHover={handleVideoHover}
                  aspectRatio="16/9"
                  scale="hover:scale-125"
                  poster={item.poster}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <ArrowLeft onClick={() => swiperRef.current?.slidePrev()} />
        <ArrowRight onClick={() => swiperRef.current?.slideNext()} />
      </div>

      {/* Fullscreen Video Overlay */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-center justify-center p-4">
          <button
            className="absolute top-4 left-4 text-white p-2 rounded-full bg-black/40"
            onClick={closeSelectedVideo}
          >
            <BackIcon size={24} />
          </button>

          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/40"
            onClick={closeSelectedVideo}
          >
            <X size={26} />
          </button>

          <video
            src={selectedVideo.video}
            poster={selectedVideo.poster}
            controls
            autoPlay
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

// Exporting with memo to prevent unnecessary re-renders
export default memo(TeamVideoSlider);
