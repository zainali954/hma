"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import RouteChangeLoader from "@/components/RouteChangeLoader";
import { FiMenu } from "react-icons/fi";

const pageTitles: Record<string, string> = {
  "/admin":           "Dashboard",
  "/admin/blog":      "Blog Posts",
  "/admin/blog/new":  "New Post",
  "/admin/settings":  "Settings",
  "/admin/tickets":   "Tickets",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        setAuthenticated(true);
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  const pageTitle = Object.entries(pageTitles).find(([key]) =>
    key === pathname || pathname.startsWith(key + "/")
  )?.[1] ?? "Admin";

  return (
    <div className="min-h-screen bg-gray-50">
      <RouteChangeLoader />
      <AdminSidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      {/* Content area — offset by sidebar on desktop */}
      <div className="lg:pl-64 transition-all duration-300 flex flex-col min-h-screen">

        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 flex items-center gap-4 px-4 py-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-navy-900 hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <FiMenu size={22} />
          </button>
          <img src="/logo.svg" alt="HMA" style={{ height: "32px", width: "auto" }} />
          <span className="text-sm font-semibold text-navy-900 ml-auto">{pageTitle}</span>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
