"use client";

import { useEffect, useState } from "react";

export function useActiveSection(
  sectionIds: string[],
  rootMargin = "-30% 0px -55% 0px",
): string {
  const [activeSection, setActiveSection] = useState(
    sectionIds[0] ?? "",
  );

  useEffect(() => {
    if (!sectionIds.length) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio,
          );

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [rootMargin, sectionIds.join("|")]);

  return activeSection;
}
