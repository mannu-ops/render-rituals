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
    <div className="flex min-h-screen flex-col bg-[#14171A] text-[#F3F4F6] antialiased">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
      <BackToTop />
    </div>
  );
}
