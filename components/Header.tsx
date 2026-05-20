"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const services = [
  { label: "Audit & Assurance",  href: "/services/audit-assurance"   },
  { label: "Accounting",         href: "/services/accounting"         },
  { label: "Bookkeeping",        href: "/services/bookkeeping"        },
  { label: "Tax Consultancy",    href: "/services/tax-consultancy"    },
  { label: "Corporate Tax",      href: "/services/corporate-tax"      },
  { label: "Business Advisory",  href: "/services/business-advisory"  },
  { label: "Company Formation",  href: "/services/company-formation"  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); setServicesOpen(false); }, [pathname]);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top language bar */}
      <div className="hidden sm:block bg-navy-950 text-gray-400 text-[11px] py-1.5 px-4 text-right">
        <span className="inline-flex items-center gap-2">
          <span className="text-gray-500">🌐</span>
          Arabic | English
        </span>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img
              src="/logo.svg"
              alt="HMA"
              style={{ height: "48px", width: "auto" }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">

            {/* Services dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center">
                <Link
                  href="/services"
                  className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    pathname.startsWith("/services") ? "text-gold-700" : "text-navy-900 hover:text-gold-700"
                  }`}
                >
                  Services
                </Link>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`p-1 transition-colors ${
                    pathname.startsWith("/services") ? "text-gold-700" : "text-navy-900 hover:text-gold-700"
                  }`}
                  aria-label="Services menu"
                >
                  <FiChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-100 rounded-xl shadow-xl shadow-navy-900/10 py-2 z-50"
                  >
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setServicesOpen(false)}
                        className="block px-4 py-2.5 text-sm text-navy-800 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gold-600 hover:bg-gold-50 transition-colors"
                      >
                        View All Services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[
              { label: "Why Choose Us", href: "/about" },
              { label: "Knowledge Hub", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    isActive ? "text-gold-700" : "text-navy-900 hover:text-gold-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-navy-900 text-white text-sm font-bold rounded-lg hover:bg-navy-800 transition-all duration-200 uppercase tracking-wide whitespace-nowrap"
            >
              Get a Free Consultation
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-navy-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: 600 }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <div className="space-y-1">
                <div className="flex items-center justify-between px-4 py-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Services</p>
                  <Link href="/services" onClick={() => setMobileOpen(false)} className="text-xs font-bold text-gold-600 uppercase tracking-wide">
                    View All →
                  </Link>
                </div>
                {services.map((s) => (
                  <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm text-navy-800 hover:bg-gold-50 rounded-lg">
                    {s.label}
                  </Link>
                ))}
              </div>
              {[
                { label: "Why Choose Us", href: "/about" },
                { label: "Knowledge Hub", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="block px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-gray-50 rounded-lg">
                  {l.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/contact" className="block px-4 py-3 bg-navy-900 text-white rounded-lg text-sm font-bold text-center uppercase tracking-wide">
                  Get a Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
