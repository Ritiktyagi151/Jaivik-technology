"use client";

import { useEffect, useState } from "react";

const DESKTOP_VIDEO =
  "/videos/jaivik-destop.mp4";
const MOBILE_VIDEO =
  "/videos/jaivik-mobile.mp4";
const POSTER_IMAGE =
  "/jaivik-thumnail.webp";

const shouldSkipAutoplay = () => {
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const connection = nav.connection as
    | { saveData?: boolean; effectiveType?: string }
    | undefined;

  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    connection?.saveData ||
    connection?.effectiveType === "2g" ||
    connection?.effectiveType === "slow-2g"
  );
};

const HeroVideo = () => {
  const [canLoadVideo, setCanLoadVideo] = useState(false);

  useEffect(() => {
    if (shouldSkipAutoplay()) return;
    // Start fetching as soon as the hero mounts. Waiting for a pointer event
    // made desktop playback feel delayed and prevented mobile autoplay entirely.
    setCanLoadVideo(true);
  }, []);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black lg:aspect-[16/8.5] lg:rounded-lg lg:shadow-lg">
      <div className="absolute inset-0 grid place-items-center bg-black">
        <img
          src={POSTER_IMAGE}
          alt="Jaivik Technology"
          width={867}
          height={522}
          className="h-full w-full object-fill"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {!canLoadVideo && (
        <button
          type="button"
          aria-label="Play hero video"
          onClick={() => setCanLoadVideo(true)}
          className="absolute inset-0 cursor-pointer bg-transparent"
        />
      )}

      {canLoadVideo && (
        <video
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          poster={POSTER_IMAGE}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-[1.01]"
        >
          <source src={MOBILE_VIDEO} type="video/mp4" media="(max-width: 768px)" />
          <source src={DESKTOP_VIDEO} type="video/mp4" media="(min-width: 769px)" />
        </video>
      )}
    </div>
  );
};

export default HeroVideo;
