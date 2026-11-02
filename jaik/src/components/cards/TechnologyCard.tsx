"use client";

import { useEffect, useRef } from "react";
type WebsiteCardProps = {
  website: {
    url: string;
    imageSrc: string;
    alt?: string;
  };
  poster: string;
  index: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
};

const TechnologyCard = ({
  website,
  poster,
  index,
  onHoverStart,
  onHoverEnd,
}: WebsiteCardProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setImagePosition = () => {
    const image = imageRef.current;
    const container = containerRef.current;

    if (image && container) {
      const imageHeight = image.getBoundingClientRect().height;
      const containerHeight = container.getBoundingClientRect().height;

      if (imageHeight > containerHeight) {
        image.style.bottom = `${-(imageHeight - containerHeight)}px`;
      } else {
        image.style.bottom = "0px";
      }
    }
  };

  const handleMouseEnter = (duration = 5000) => {
    onHoverStart?.();
    const image = imageRef.current;
    if (image) {
      image.style.transition = `bottom ${duration}ms linear`;
      image.style.bottom = "0px";
    }
  };

  const handleMouseLeave = () => {
    onHoverEnd?.();
    const image = imageRef.current;
    const container = containerRef.current;

    if (image && container) {
      const imageHeight = image.getBoundingClientRect().height;
      const containerHeight = container.getBoundingClientRect().height;

      image.style.transition = "bottom 500ms ease-out";
      if (imageHeight > containerHeight) {
        image.style.bottom = `${-(imageHeight - containerHeight)}px`;
      }
    }
  };

  useEffect(() => {
    const image = imageRef.current;

    if (image?.complete) {
      setImagePosition();
    } else {
      image?.addEventListener("load", setImagePosition);
    }

    window.addEventListener("resize", setImagePosition);

    return () => {
      image?.removeEventListener("load", setImagePosition);
      window.removeEventListener("resize", setImagePosition);
    };
  }, []);

  return (
    <div
      className="websiteCard relative hover:scale-110 hover:-translate-y-3 group/card"
      ref={containerRef}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={poster}
        alt="poster"
        className="absolute top-0 left-0 w-full h-full z-10 transition-all duration-300 group-hover/card:opacity-0"
      />
      <a
        href={website.url}
        target="_blank"
        rel="noopener noreferrer"
        className="screen block aspect-[19/16] overflow-hidden relative mx-auto"
      >
        <img
          src={website.imageSrc}
          alt={website.alt || `Website ${index + 1}`}
          className="max-w-full h-auto absolute inset-x-0 bottom-0 m-auto p-0 z-0 object-cover"
          ref={imageRef}
        />
      </a>
    </div>
  );
};

export default TechnologyCard;
