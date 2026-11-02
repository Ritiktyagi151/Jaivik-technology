"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { cachedGet } from "@/lib/clientApiCache";
import "../../styles/technology.css"; 
import Link from "next/link";

// ✅ API configuration (Blog logic ki tarah)
const API_URL = `${process.env.NEXT_PUBLIC_API_URL || ""}/technologies`;

interface Technology {
  _id?: string;
  name: string;
  mainImage: string;
  hoverImage: string;
  link: string;
}

interface TechnologyCardProps {
  tech: Technology;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ tech }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverImageRef = useRef<HTMLImageElement>(null);
  const [bottom, setBottom] = useState(0);

  const getImageScrollHeight = (): number => {
    if (!containerRef.current || !hoverImageRef.current) return 0;
    const imageHeight = hoverImageRef.current.offsetHeight;
    const containerHeight = containerRef.current.offsetHeight;
    return containerHeight - imageHeight;
  };

  const animateTo = (start: number, end: number, duration: number) => {
    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = start + (end - start) * progress;
      setBottom(value);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const handleHoverStart = () => {
    const scrollHeight = getImageScrollHeight();
    if (scrollHeight >= 0) return;
    animateTo(scrollHeight, 0, 5000);
  };

  const handleHoverEnd = () => {
    animateTo(bottom, getImageScrollHeight(), 500);
  };

  useEffect(() => {
    // Initial calculation once image is likely loaded
    const timer = setTimeout(() => setBottom(getImageScrollHeight()), 500);
    const handleResize = () => setBottom(getImageScrollHeight());
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bhakar-technologia-card">
      <div
        ref={containerRef}
        className="bhakar-technologia-img bhakar-scroll-image"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        <a href={tech.link}>
          <img src={tech.mainImage} alt={tech.name} className="image main-image" />
          <img
            ref={hoverImageRef}
            src={tech.hoverImage}
            alt={tech.name}
            className="image hover-image"
            style={{ bottom: `${bottom}px`, position: "absolute" }}
            onLoad={() => setBottom(getImageScrollHeight())}
          />
        </a>
      </div>
    </div>
  );
};

const TechnologySlider: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const [technologiesList, setTechnologiesList] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Data from API
  useEffect(() => {
    const fetchTech = async () => {
      try {
        setLoading(true);
        const response = await cachedGet(API_URL);
        if (response.data.success) {
          setTechnologiesList(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch technologies", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTech();
  }, []);

  // Preload images effect (Updated for API data)
  useEffect(() => {
    if (technologiesList.length > 0) {
      technologiesList.forEach((tech) => {
        const img = new Image();
        img.src = tech.mainImage;
        const hoverImg = new Image();
        hoverImg.src = tech.hoverImage;
      });
    }
  }, [technologiesList]);

  if (loading && technologiesList.length === 0) {
    return <div className="text-center py-20 text-white animate-pulse">Loading Technologies...</div>;
  }

  // Agar koi tech data nahi hai toh section hide kardein
  if (technologiesList.length === 0) return null;

  return (
    <section className="bhakar-technologia-section">
      <div className="swiper bhakar-technologia-slider">
        <div className="bhakar-technologia-heading">
          <h2>
            <Link href="/">Our Technology <span></span></Link>
          </h2>
        </div>
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1.2}
          spaceBetween={20}
          loop={technologiesList.length > 4}
          autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ el: ".bhakar-technologia-pagination", clickable: true }}
          navigation={{
            nextEl: ".bhakar-technologia-button-next",
            prevEl: ".bhakar-technologia-button-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          onMouseEnter={() => swiperRef.current?.swiper?.autoplay.stop()}
          onMouseLeave={() => swiperRef.current?.swiper?.autoplay.start()}
        >
          {technologiesList.map((tech, index) => (
            <SwiperSlide key={tech._id || index}>
              <TechnologyCard tech={tech} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="bhakar-technologia-nav">
          <div className="bhakar-technologia-button-prev"></div>
          <div className="bhakar-technologia-button-next"></div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySlider;