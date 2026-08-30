export function scrollToTop(): void {
  if (typeof window === "undefined") return;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
