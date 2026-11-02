"use client";

import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { Play, Pause, Volume2, VolumeX, X, ArrowLeft as BackArrow } from "lucide-react";
import { cachedGet } from "@/lib/clientApiCache";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface VideoItemProps {
  label: string;
  videoSrc: string;
  posterSrc: string;
  title: string; 
  description: string;
}
// ── Custom hook: stable isMobile check (avoids SSR mismatch) ──
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
};

const VideoItem: React.FC<VideoItemProps> = memo(({
  label,
  videoSrc,
  posterSrc,
  title,
  description,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPoster, setShowPoster] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isMobile = useIsMobile();

  const handlePlay = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      setShowPoster(false);
      await videoRef.current.play();
      setIsPlaying(true);
    } catch {
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
        await videoRef.current.play();
        setIsPlaying(true);
      }
    }
  }, []);

  const handlePause = useCallback(() => {
    videoRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const handleResetVideo = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
    setShowPoster(true);
  }, []);

  // IntersectionObserver — reset when out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (!entry.isIntersecting) handleResetVideo();
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [handleResetVideo]);

  // ── Open fullscreen: pause card video, sync time to fullscreen video ──
  const openFullscreen = useCallback(() => {
    // Pause the card video first to prevent double audio
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setIsFullscreen(true);
  }, []);

  // ── Sync currentTime from card video → fullscreen video on open ──
  useEffect(() => {
    if (isFullscreen && fullscreenVideoRef.current && videoRef.current) {
      // Small rAF delay so the element is painted before we mutate it
      const raf = requestAnimationFrame(() => {
        if (fullscreenVideoRef.current && videoRef.current) {
          fullscreenVideoRef.current.currentTime = videoRef.current.currentTime;
        }
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isFullscreen]);

  // ── Close fullscreen: sync time back to card video ──
  const closeFullscreen = useCallback(() => {
    if (fullscreenVideoRef.current && videoRef.current) {
      videoRef.current.currentTime = fullscreenVideoRef.current.currentTime;
    }
    setIsFullscreen(false);
  }, []);

  // ── Lock body scroll when fullscreen is open ──
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isFullscreen]);

  const handleCardClick = useCallback(() => {
    if (isMobile) {
      openFullscreen();
    } else {
      isPlaying ? handlePause() : handlePlay();
    }
  }, [isMobile, isPlaying, openFullscreen, handlePause, handlePlay]);

  return (
    <>
      {/* ── Card ── */}
      <div ref={containerRef} className="w-full flex justify-center px-4">
        <div
          className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black group cursor-pointer"
          onClick={handleCardClick}
        >
          <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase z-10">
            {label}
          </span>

          {isInView ? (
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover z-[2] transition-opacity duration-300 ${
                showPoster ? "opacity-0" : "opacity-100"
              }`}
              loop
              playsInline
              muted={isMuted}
              preload="none"
              poster={posterSrc}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <img
              src={posterSrc}
              className="absolute inset-0 w-full h-full object-cover"
              alt={title}
            />
          )}

          {showPoster && (
            <img
              src={posterSrc}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover z-[1]"
              loading="lazy"
            />
          )}

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-[3]">
              <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center transition-transform hover:scale-110">
                <Play className="text-white ml-1" size={32} />
              </div>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white z-[3]">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm opacity-90 line-clamp-2">{description}</p>
          </div>

          {!showPoster && !isMobile && (
            <button
              className="absolute bottom-4 right-4 bg-black/50 rounded-full p-2 z-[4] hover:bg-black/70 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                const next = !isMuted;
                setIsMuted(next);
                if (videoRef.current) videoRef.current.muted = next;
              }}
            >
              {isMuted ? (
                <VolumeX className="text-white" size={20} />
              ) : (
                <Volume2 className="text-white" size={20} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile Fullscreen Modal ── */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[9999] md:hidden flex flex-col"
          style={{ background: "#000" }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ background: "rgba(0,0,0,0.7)" }}
          >
            <button
              className="text-white p-1"
              onClick={closeFullscreen}
              aria-label="Back"
            >
              <BackArrow size={28} />
            </button>
            <button
              className="text-white p-1"
              onClick={closeFullscreen}
              aria-label="Close"
            >
              <X size={28} />
            </button>
          </div>

          {/* Video — fills remaining space, no layout shift */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <video
              ref={fullscreenVideoRef}
              src={videoSrc}
              poster={posterSrc}
              autoPlay
              controls
              playsInline
              className="w-full h-full object-contain"
              style={{ maxHeight: "100%", display: "block" }}
            />
          </div>
        </div>
      )}
    </>
  );
});

VideoItem.displayName = "VideoItem";

const CorporateVideosSection: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  const fetchCorporateVideos = useCallback(async () => {
    try {
      setFetching(true);
      const response = await cachedGet(`${API_BASE}/corporate-videos`);
      setVideos(response.data.filter((v: any) => v.status === "published"));
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchCorporateVideos();
  }, [fetchCorporateVideos]);

  if (fetching)
    return (
      <div className="py-20 text-center text-white animate-pulse">Loading...</div>
    );
  if (videos.length === 0) return null;

  return (
    <section className="w-full py-12 px-2 sm:px-4 lg:px-6 bg-black pb-5">
      <div className="max-w-8xl mx-auto">
        <div className="text-left mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our Corporate Videos
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <VideoItem key={video._id} {...video} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CorporateVideosSection;
