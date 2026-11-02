export type WebsiteCardItem = {
  _id?: string;
  url: string;
  imageSrc: string;
  alt?: string;
};

type WebsiteCardProps = {
  website: WebsiteCardItem;
  index: number;
  shouldLoadMedia?: boolean;
  isActive?: boolean;
  onScrollComplete?: () => void;
};

const WebsiteCard = ({
  website,
  index,
  shouldLoadMedia = false,
  isActive = false,
  onScrollComplete,
}: WebsiteCardProps) => {
  const imageAnimationClass = isActive
    ? "motion-safe:animate-[website-card-scroll_8s_linear_infinite]"
    : "";

  return (
    <div
      className="websiteCard group h-full"
      style={{ position: "relative", overflow: "hidden", height: "100%" }}
    >
      <a
        href={website.url}
        target="_blank"
        rel="noopener noreferrer"
        className="screen block aspect-[19/27] md:aspect-[19/16] overflow-hidden relative mx-auto h-full"
      >
        {shouldLoadMedia ? (
          <>
            <img
              src={website.imageSrc}
              alt={website.alt || `Website ${index + 1}`}
              className={`absolute inset-x-0 top-0 z-0 m-auto min-h-full w-full max-w-full object-cover p-0 motion-reduce:animate-none ${imageAnimationClass}`}
              draggable={false}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              width={640}
              height={900}
              onAnimationIteration={isActive ? onScrollComplete : undefined}
              style={{ willChange: "transform" }}
            />
            <style jsx>{`
              @keyframes website-card-scroll {
                0% {
                  transform: translateY(0);
                }
                100% {
                  transform: translateY(-33.333%);
                }
              }
            `}</style>
          </>
        ) : (
          <div
            className="absolute inset-0 bg-neutral-900"
            aria-label={website.alt || `Website ${index + 1}`}
            role="img"
          />
        )}
      </a>
    </div>
  );
};

export default WebsiteCard;
