import type { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

export default function SiteShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[#f4f1eb] text-[#171717]">
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </div>
  );
}
