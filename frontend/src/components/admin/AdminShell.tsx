"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  BriefcaseBusiness,
  MessageSquare,
  Star,
  Settings,
  Menu,
  X,
  ArrowUpRight,
  LogOut,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";

type AdminShellProps = {
  children: ReactNode;
  activeItem?: string;
};

const navigation = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Services & Rates", href: "/admin/services", icon: BriefcaseBusiness },
  { label: "Client Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Studio Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminShell({ children, activeItem = "Overview" }: AdminShellProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout, inquiries, settings } = useAdminData();

  // Redirect if not authenticated (except on /admin/login)
  useEffect(() => {
    if (!isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [isAuthenticated, pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14171A] text-[#F3F4F6]">
        <div className="flex items-center gap-3 font-mono-spec text-sm">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#D49A6A] border-t-transparent" />
          <span>Verifying Studio Credentials...</span>
        </div>
      </div>
    );
  }

  const newInquiriesCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="min-h-screen bg-[#14171A] text-[#F3F4F6] flex">
      {/* Mobile Sidebar Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ========================================================= */}
      {/* 1. LUXURY DARK SIDEBAR                                    */}
      {/* ========================================================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-white/10 bg-[#16191D] p-6 transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Top Logo & Title */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D49A6A] text-xs font-bold text-[#14171A]">
                RR
              </div>
              <div>
                <span className="font-display text-lg font-semibold tracking-tight text-[#F3F4F6] block leading-none">
                  Render Rituals
                </span>
                <span className="font-mono-spec text-[8.5px] uppercase tracking-widest text-[#8E98A5] mt-1 block">
                  Studio Control Center
                </span>
              </div>
            </Link>

            <button
              type="button"
              aria-label="Close admin menu"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#8E98A5] hover:text-[#F3F4F6] lg:hidden"
            >
              <X size={16} />
            </button>
          </div>

          {/* Live Studio Badge */}
          <div className="my-5 flex items-center justify-between rounded-2xl border border-white/5 bg-[#1E2227] p-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${settings.isAvailable ? "bg-[#25D366]" : "bg-[#EF4444]"}`} />
                <span className={`relative inline-flex h-2 w-2 rounded-full ${settings.isAvailable ? "bg-[#25D366]" : "bg-[#EF4444]"}`} />
              </span>
              <span className="text-[11px] font-medium text-[#F3F4F6]">
                {settings.isAvailable ? "Taking Projects" : "Booked"}
              </span>
            </div>
            <Link
              href="/admin/settings"
              className="font-mono-spec text-[9px] uppercase tracking-wider text-[#D49A6A] hover:underline"
            >
              Edit
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center justify-between rounded-2xl px-4 py-3 text-xs font-medium transition-all ${
                    active
                      ? "bg-[#D49A6A] text-[#14171A] font-bold shadow-lg shadow-[#D49A6A]/15"
                      : "text-[#8E98A5] hover:bg-white/5 hover:text-[#F3F4F6]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={active ? "text-[#14171A]" : "text-[#D49A6A]"} />
                    <span>{item.label}</span>
                  </div>

                  {item.label === "Client Inquiries" && newInquiriesCount > 0 && (
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono-spec text-[9px] font-bold ${
                        active ? "bg-[#14171A] text-[#D49A6A]" : "bg-[#D49A6A] text-[#14171A]"
                      }`}
                    >
                      {newInquiriesCount} new
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: View Site & Logout */}
        <div className="border-t border-white/10 pt-4 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#1E2227] px-3.5 py-2.5 text-xs text-[#F3F4F6] transition-colors hover:border-[#D49A6A]/50"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={13} className="text-[#D49A6A]" />
              <span>Live Website</span>
            </span>
            <ArrowUpRight size={13} className="text-[#8E98A5]" />
          </Link>

          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/admin/login");
            }}
            className="flex w-full items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#EF4444] transition-colors hover:bg-[#EF4444]/10 cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. MAIN CONTENT AREA                                      */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#14171A]/90 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#1E2227] text-[#F3F4F6] lg:hidden"
              aria-label="Open navigation drawer"
            >
              <Menu size={16} />
            </button>
            <div>
              <span className="font-display text-sm font-semibold text-[#F3F4F6]">
                Studio Workspace
              </span>
              <span className="hidden sm:inline text-xs text-[#8E98A5] ml-2">
                · Render Rituals Direct Control
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#1E2227] px-3.5 py-1.5 text-xs font-medium text-[#F3F4F6] hover:border-[#D49A6A]"
            >
              <span>View Live Site</span>
              <ArrowUpRight size={13} className="text-[#D49A6A]" />
            </Link>

            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D49A6A] bg-[#D49A6A]/15 text-xs font-bold text-[#D49A6A]">
              N
            </div>
          </div>
        </header>

        {/* Page Children Container */}
        <main className="flex-1 p-3.5 xs:p-5 sm:p-8 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
