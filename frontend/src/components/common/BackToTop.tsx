"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      // Make visible once scrolled past 120px on mobile or desktop
      setIsVisible(scrollPos > 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      onTouchEnd={(e) => {
        e.preventDefault();
        scrollToTop();
      }}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-[9980] flex h-12 w-12 items-center justify-center rounded-full border border-[#D49A6A]/40 bg-[#1E2227] text-[#D49A6A] shadow-[0_4px_25px_rgba(0,0,0,0.6)] transition-all duration-300 active:scale-90 hover:border-[#D49A6A] hover:bg-[#D49A6A] hover:text-[#14171A] cursor-pointer touch-manipulation select-none ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
          : "opacity-0 translate-y-6 pointer-events-none scale-75"
      }`}
    >
      <ArrowUp size={20} className="stroke-[2.5]" />
    </button>
  );
}
