"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import { Play } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { cachedGet } from "@/lib/clientApiCache";
import { safePosterUrl } from "@/lib/media";
import { useBackButtonModal } from "@/lib/useBackButtonModal";
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import ReelVideoCard from "../../components/cards/ReelVideoCard";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const API_URL = `${API_BASE_URL}/reels`;

type ReelItem = {
  _id?: string;
  video: string;
  poster?: string;
};

type ReelsResponse =
  | {
      success?: boolean;
      data?: ReelItem[];
    }
  | ReelItem[];

const SocialMediaSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const desktopSwiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reelsData, setReelsData] = useState<ReelItem[]>([]);
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);
  const closeSelectedReel = useBackButtonModal(
    Boolean(selectedReel),
    () => setSelectedReel(null),
    "home-reel-player"
  );
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Fetch Data
  useEffect(() => {
    const fetchReels = async () => {
      try {
        setLoading(true);
        const response = await cachedGet<ReelsResponse>(API_URL);
        const payload = response.data;
        if (!Array.isArray(payload) && payload.success && Array.isArray(payload.data)) {
          setReelsData(payload.data);
        } else if (Array.isArray(payload)) {
          setReelsData(payload);
        } else {
          setReelsData([]);
        }
      } catch (error) {
        console.error("Error fetching reels:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReels();
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    setProgress(0);
  };

  const handleVideoHover = (value: boolean) => {
    if (!desktopSwiperRef.current) return;
    if (value) desktopSwiperRef.current.autoplay.stop();
    else desktopSwiperRef.current.autoplay.start();
  };

  const openMobileReel = (reel: ReelItem) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSelectedReel(reel);
    }
  };

  if (loading) return <div className="h-60 flex items-center justify-center text-white">Loading Reels...</div>;

  return (
    <div className="overflow-hidden h-auto my-8 bg-black py-10">
      {/* Heading */}
      <div className="px-6 mb-8">
        <h2 className="text-white text-2xl font-bold uppercase tracking-wider border-l-4 border-red-500 pl-4">
          Social Media Reels
        </h2>
      </div>

      {/* ─── MOBILE SLIDER (Shows 3+ videos on screen) ─── */}
      <div className="block lg:hidden">
        <div className="relative w-full">
          <Swiper
            modules={[Navigation]}
            slidesPerView={2.2} // Shows center + partial sides
            centeredSlides={true}
            spaceBetween={-10} // Slight overlap for the stack look
            loop={reelsData.length > 3}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            speed={600}
            className="!overflow-visible" // Crucial to see side videos
          >
            {reelsData.map((reel, index) => (
              <SwiperSlide key={reel._id || index} className="py-10">
                {({ isActive, isPrev, isNext }) => {
                  // If it's not the active one or direct neighbor, scale it down more
                  const isFar = !isActive && !isPrev && !isNext;
                  
                  return (
                    <div
                      className={`
                        relative rounded-2xl overflow-hidden shadow-2xl
                        transition-all duration-500 ease-in-out
                        ${isActive ? "scale-125 z-30 opacity-100" : "scale-90 z-10 opacity-40"}
                        ${isFar ? "scale-75 opacity-20" : ""}
                      `}
                      style={{ aspectRatio: "9/16" }}
                      onClick={() => openMobileReel(reel)}
                    >
                      <img
                        src={safePosterUrl(reel.poster)}
                        alt="Social media reel"
                        width={270}
                        height={480}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        aria-label="Play reel"
                        onClick={(event) => {
                          event.stopPropagation();
                          openMobileReel(reel);
                        }}
                        className="absolute inset-0 z-10 flex items-center justify-center bg-black/10"
                      >
                        <span className="grid h-14 w-14 place-items-center rounded-full border border-white/70 bg-black/60 text-white shadow-lg backdrop-blur-sm transition-transform hover:scale-110">
                          <Play aria-hidden="true" className="ml-1 h-7 w-7 fill-current" />
                        </span>
                      </button>
                      
                      {/* Active Video Overlay */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-white shadow-[0_0_10px_#fff]" 
                              style={{ width: `${progress}%` }} 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {reelsData.slice(0, 10).map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex % reelsData.length ? "w-8 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ─── DESKTOP SLIDER ─── */}
      {selectedReel && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black lg:hidden">
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
            onClick={closeSelectedReel}
            aria-label="Close reel"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <video
            src={selectedReel.video}
            poster={safePosterUrl(selectedReel.poster)}
            controls
            autoPlay
            playsInline
            preload="none"
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <div className="hidden lg:block px-10">
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={4.5}
            spaceBetween={20}
            loop={reelsData.length > 4}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            onSwiper={(swiper) => (desktopSwiperRef.current = swiper)}
            className="mySwiper"
          >
            {reelsData.map((reel, index) => (
              <SwiperSlide key={reel._id || `${reel.video}-${index}`}>
                <ReelVideoCard
                  src={reel.video}
                  poster={reel.poster}
                  onHover={handleVideoHover}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowLeft onClick={() => desktopSwiperRef.current?.slidePrev()} />
            <ArrowRight onClick={() => desktopSwiperRef.current?.slideNext()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaSection;
