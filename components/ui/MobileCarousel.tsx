"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

type MobileCarouselProps = {
  children: ReactNode;
  className: string;
  label: string;
  tone?: "gold" | "white";
};

export function MobileCarousel({
  children,
  className,
  label,
  tone = "gold",
}: MobileCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollCarousel(direction: "previous" | "next") {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const firstItem = track.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0");
    const itemWidth = firstItem?.getBoundingClientRect().width ?? track.clientWidth;
    const distance = itemWidth + gap;

    track.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: "smooth",
    });
  }

  return (
    <div className={`mobile-carousel-shell mobile-carousel-shell-${tone}`}>
      <div className={className} ref={trackRef}>
        {children}
      </div>
      <button
        className="mobile-carousel-arrow mobile-carousel-arrow-prev"
        type="button"
        aria-label={`Ver fotos anteriores de ${label}`}
        onClick={() => scrollCarousel("previous")}
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        className="mobile-carousel-arrow mobile-carousel-arrow-next"
        type="button"
        aria-label={`Ver próximas fotos de ${label}`}
        onClick={() => scrollCarousel("next")}
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}
