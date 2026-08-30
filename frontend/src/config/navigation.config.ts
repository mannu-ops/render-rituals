import { navigation, primaryNavigation } from "@/data";

export const navigationConfig = {
  main: primaryNavigation,
  footer: navigation,
  mobile: [
    { label: "Home", href: "/" },
    ...navigation,
  ],
} as const;
