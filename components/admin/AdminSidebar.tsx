"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiLayout,
  FiFileText,
  FiSettings,
  FiMessageSquare,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: FiLayout },
  { href: "/admin/blog", label: "Blog Posts", icon: FiFileText },
  { href: "/admin/settings", label: "Settings", icon: FiSettings },
  { href: "/admin/messages", label: "Messages", icon: FiMessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/me", { method: "POST" });
    router.push("/login");
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-navy-950 text-white z-40 transition-all duration-300 flex flex-col ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-navy-800 flex items-center justify-center">
        {collapsed ? (
          <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-navy-950 font-bold text-sm">H</span>
          </div>
        ) : (
          <img
            src="/logo.svg"
            alt="HMA"
            style={{ height: "40px", width: "auto" }}
          />
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                isActive
                  ? "bg-navy-800 text-gold-400"
                  : "text-gray-400 hover:text-white hover:bg-navy-800/50"
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {isActive && (
                <motion.div
                  layoutId="admin-nav-indicator"
                  className="absolute left-0 top-1 bottom-1 w-0.5 bg-gold-400 rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout & Collapse */}
      <div className="p-2 border-t border-navy-800 space-y-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-navy-800/50 transition-all duration-200 w-full"
        >
          <FiLogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-navy-800/50 transition-all duration-200 w-full"
        >
          {collapsed ? (
            <FiChevronRight size={20} className="flex-shrink-0" />
          ) : (
            <FiChevronLeft size={20} className="flex-shrink-0" />
          )}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
