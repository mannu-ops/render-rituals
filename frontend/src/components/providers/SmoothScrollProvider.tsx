"use client";

import { useEffect } from "react";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 1. Enable smooth scrolling on HTML root
    document.documentElement.style.scrollBehavior = "smooth";

    // 2. Custom frame-by-frame smooth scroll function
    const smoothScrollToTarget = (targetElement: HTMLElement, offset = -75, duration = 900) => {
      const startY = window.scrollY || window.pageYOffset;
      const targetY = targetElement.getBoundingClientRect().top + startY + offset;
      const distance = targetY - startY;

      if (Math.abs(distance) < 5) return;

      let startTime: number | null = null;

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const step = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startY + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    // 3. Global Click Interceptor for all in-page links & buttons (Hero buttons, CTA links, Footer, Process, etc.)
    const handleGlobalAnchorClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Handle pure "#section" or "/#section" when already on homepage
      const isHomepage = window.location.pathname === "/";
      const isInternalHash =
        href.startsWith("#") || (href.startsWith("/#") && isHomepage);

      if (isInternalHash) {
        const hashId = href.replace(/^\/?#/, "");
        if (!hashId) return;

        // If target is "top" or "hero"
        if (hashId === "top") {
          e.preventDefault();
          e.stopPropagation();
          const startY = window.scrollY;
          const duration = 900;
          let startTime: number | null = null;

          const easeInOutCubic = (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

          const step = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, startY * (1 - easeInOutCubic(progress)));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          return;
        }

        const targetEl = document.getElementById(hashId);
        if (targetEl) {
          e.preventDefault();
          e.stopPropagation();

          smoothScrollToTarget(targetEl, -75, 900);
          window.history.pushState(null, "", `#${hashId}`);
        }
      }
    };

    // Global listener with capture phase to prevent browser default jump immediately
    document.addEventListener("click", handleGlobalAnchorClick, { capture: true });

    // Expose helper globally
    (window as any).__smoothScrollTo = smoothScrollToTarget;

    return () => {
      document.removeEventListener("click", handleGlobalAnchorClick, { capture: true });
      (window as any).__smoothScrollTo = null;
    };
  }, []);

  return <>{children}</>;
}
