import { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "../common/BackToTop";

export default function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <BackToTop />
    </>
  );
}
