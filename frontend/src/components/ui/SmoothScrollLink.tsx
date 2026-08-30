"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

interface SmoothScrollLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  offset?: number;
  duration?: number;
}

export default function SmoothScrollLink({
  href,
  children,
  offset = -75,
  duration = 900,
  className,
  onClick,
  ...props
}: SmoothScrollLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // If external link (e.g. wa.me or mailto:)
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return;
    }

    const isHash = href.startsWith("#") || href.startsWith("/#");
    if (!isHash) {
      return;
    }

    const sectionId = href.replace(/^\/?#/, "");

    // If on sub-page, save intent and navigate to homepage
    if (pathname !== "/") {
      e.preventDefault();
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pendingScrollSection", sectionId);
      }
      window.location.href = `/#${sectionId}`;
      return;
    }

    // On homepage: smooth scroll directly
    e.preventDefault();
    const target = document.getElementById(sectionId);
    if (!target) {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const startY = window.scrollY || window.pageYOffset;
    const targetY = target.getBoundingClientRect().top + startY + offset;
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
    window.history.pushState(null, "", `#${sectionId}`);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
