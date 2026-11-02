"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazySectionProps = {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: number;
};

const LazySection = ({
  children,
  rootMargin = "150px 0px",
  minHeight = 120,
}: LazySectionProps) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    if (shouldRender || !hostRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(hostRef.current);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  useEffect(() => {
    if (!shouldRender || !hostRef.current || isSettled) return;

    const host = hostRef.current;
    const settle = () => {
      if (host.childElementCount > 0 && host.getBoundingClientRect().height > 0) {
        setIsSettled(true);
      }
    };

    settle();
    const frameId = window.requestAnimationFrame(settle);
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(settle)
        : null;
    resizeObserver?.observe(host);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
    };
  }, [isSettled, shouldRender]);

  const reserveSpace = !shouldRender || !isSettled;

  return (
    <div ref={hostRef} style={reserveSpace ? { minHeight } : undefined}>
      {shouldRender ? children : null}
    </div>
  );
};

export default LazySection;
