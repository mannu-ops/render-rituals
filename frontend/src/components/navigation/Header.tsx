"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import MobileMenuButton from "./MobileMenuButton";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-5">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between border border-black/10 bg-[#f5f3ef]/90 px-4 backdrop-blur-xl md:h-16 md:px-5">
          <Logo />
          <DesktopNav />
          <MobileMenuButton onClick={() => setMenuOpen(true)} />
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
