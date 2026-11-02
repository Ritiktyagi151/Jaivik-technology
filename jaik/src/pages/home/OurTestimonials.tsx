"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import { X, ArrowLeft as BackIcon } from "lucide-react";
import { cachedGet } from "@/lib/clientApiCache";
import { useBackButtonModal } from "@/lib/useBackButtonModal";
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import ReelVideoCard from "../../components/cards/ReelVideoCard";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || ""}/testimonial-videos`;

const OurTestimonials = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{
    video: string;
    poster: string;
  } | null>(null);
  const closeSelectedVideo = useBackButtonModal(
    Boolean(selectedVideo),
    () => setSelectedVideo(null),
    "testimonial-video-player"
  );

  const [testimonialsList, setTestimonialsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await cachedGet(API_URL);
        const actualData = response.data.data || response.data;
        if (Array.isArray(actualData)) {
          setTestimonialsList(actualData);
        } else {
          console.error("Data is not an array:", actualData);
        }
      } catch (error) {
        console.error("Testimonials fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleVideoHover = (value: boolean) => {
    if (swiperRef.current?.autoplay) {
      value
        ? swiperRef.current.autoplay.stop()
        : swiperRef.current.autoplay.start();
    }
  };

  if (loading) {
    return (
      <div className="h-40 flex items-center justify-center text-white animate-pulse">
        Fetching Testimonials...
      </div>
    );
  }

  if (testimonialsList.length === 0) return null;

  return (
    <div className="overflow-hidden h-auto my-4">
      {/* Section Heading */}
      <div className="websiteHeading mb-4">
        <h2 className="uppercase text-gray-200 text-xl inline-block relative">
          <span className="flex font-bold items-center gap-1.5 ml-2">
            Our Testimonials
          </span>
        </h2>
      </div>

      {/* ── Swiper Carousel ── */}
      <div className="w-full group relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          watchSlidesProgress={true}
          centeredSlides={true}
          loop={testimonialsList.length > 3}
          speed={700}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true,
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
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1536: {
              slidesPerView: 4,
              spaceBetween: 18,
            },
          }}
          className="mySwiper !overflow-visible"
        >
          {testimonialsList.map((item, index) => (
            <SwiperSlide
              key={item._id || index}
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
                  src={item.video}
                  poster={item.poster}
                  onHover={handleVideoHover}
                  aspectRatio="16/9"
                  scale="hover:scale-[1.05]"
                  classname="
                    transition-all duration-500 ease-in-out h-full
                    [.swiper-slide-active_&]:shadow-[0_8px_40px_rgba(0,0,0,0.6)]
                    [.swiper-slide-active_&]:rounded-xl
                  "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

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
            src={selectedVideo.video}
            poster={selectedVideo.poster}
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

export default OurTestimonials;
