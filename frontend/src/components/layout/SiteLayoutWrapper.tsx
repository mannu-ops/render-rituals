"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "@/components/common/BackToTop";

export default function SiteLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#14171A] text-[#F3F4F6] antialiased selection:bg-[#D49A6A] selection:text-[#14171A]">
      <div className="site-canvas-limit flex min-h-screen flex-col bg-[#14171A]">
        <Navbar />
        <div className="flex-1 w-full">{children}</div>
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
}
