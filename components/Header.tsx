"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiPhone } from "react-icons/fi";

const setupLinks = [
  { label: "Mainland Formation",    href: "/services/business-setup" },
  { label: "Free Zone Formation",   href: "/services/business-setup" },
  { label: "Offshore Formation",    href: "/services/business-setup" },
  { label: "Golden Visa",           href: "/services/golden-visa"    },
  { label: "Compare Jurisdictions", href: "/#comparison"             },
];

const complianceLinks = [
  { label: "Tax & VAT Compliance",     href: "/services/tax-vat-compliance"     },
  { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
  { label: "Audit & Assurance",        href: "/services/audit-assurance"        },
];

export default function Header() {
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [setupOpen,      setSetupOpen]      = useState(false);
  const [complianceOpen, setComplianceOpen] = useState(false);
  const pathname = usePathname();
  const setupRef      = useRef<HTMLDivElement>(null);
  const complianceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (setupRef.current && !setupRef.current.contains(e.target as Node)) setSetupOpen(false);
      if (complianceRef.current && !complianceRef.current.contains(e.target as Node)) setComplianceOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSetupOpen(false);
    setComplianceOpen(false);
  }, [pathname]);

  const dropdownClass = "absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl shadow-navy-900/10 py-2 z-50 min-w-[220px]";

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">

      {/* Top bar */}
      <div className="hidden sm:flex bg-navy-950 text-gray-400 text-[11px] py-1.5 px-4 items-center justify-between max-w-7xl mx-auto">
        <span className="text-gold-400/70 font-semibold tracking-wide">
          Ministry of Economy Licensed · ICAEW · ACCA · AICPA · FTA Registered
        </span>
        <a href="tel:+97145837001" className="inline-flex items-center gap-1.5 hover:text-gold-400 transition-colors">
          <FiPhone size={11} />
          (+971) 4 583 7001
        </a>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img src="/logo.svg" alt="HMA" style={{ height: "48px", width: "auto" }} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">

            {/* Business Setup dropdown */}
            <div className="relative" ref={setupRef}>
              <div className="flex items-center">
                <Link
                  href="/services/business-setup"
                  className={`px-3 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                    pathname === "/services/business-setup" ? "text-gold-700" : "text-navy-900 hover:text-gold-700"
                  }`}
                >
                  Business Setup
                </Link>
                <button
                  onClick={() => { setSetupOpen(!setupOpen); setComplianceOpen(false); }}
                  className={`p-1 transition-colors ${setupOpen ? "text-gold-700" : "text-navy-900 hover:text-gold-700"}`}
                  aria-label="Business Setup menu"
                >
                  <FiChevronDown size={13} className={`transition-transform duration-200 ${setupOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
              <AnimatePresence>
                {setupOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className={dropdownClass}
                  >
                    <div className="px-4 py-2 mb-1">
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gold-600">Start Your Business</p>
                    </div>
                    {setupLinks.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        onClick={() => setSetupOpen(false)}
                        className="block px-4 py-2.5 text-sm text-navy-800 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href="/services/business-setup"
                        onClick={() => setSetupOpen(false)}
                        className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gold-600 hover:bg-gold-50 transition-colors"
                      >
                        All Setup Services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Compliance dropdown */}
            <div className="relative" ref={complianceRef}>
              <div className="flex items-center">
                <Link
                  href="/services"
                  className={`px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    pathname.startsWith("/services") && pathname !== "/services/business-setup"
                      ? "text-gold-700"
                      : "text-navy-900 hover:text-gold-700"
                  }`}
                >
                  Compliance
                </Link>
                <button
                  onClick={() => { setComplianceOpen(!complianceOpen); setSetupOpen(false); }}
                  className={`p-1 transition-colors ${complianceOpen ? "text-gold-700" : "text-navy-900 hover:text-gold-700"}`}
                  aria-label="Compliance menu"
                >
                  <FiChevronDown size={13} className={`transition-transform duration-200 ${complianceOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
              <AnimatePresence>
                {complianceOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className={dropdownClass}
                  >
                    <div className="px-4 py-2 mb-1">
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gold-600">Stay Compliant</p>
                    </div>
                    {complianceLinks.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setComplianceOpen(false)}
                        className="block px-4 py-2.5 text-sm text-navy-800 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href="/services"
                        onClick={() => setComplianceOpen(false)}
                        className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gold-600 hover:bg-gold-50 transition-colors"
                      >
                        All Services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[
              { label: "Why HMA",      href: "/about"   },
              { label: "Knowledge Hub",href: "/blog"    },
              { label: "Contact",      href: "/contact" },
            ].map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
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
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-gold-400 text-navy-950 text-sm font-black rounded-lg hover:bg-gold-300 transition-all duration-200 uppercase tracking-wide whitespace-nowrap"
            >
              Free Consultation
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
            animate={{ opacity: 1, maxHeight: 700 }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">

              {/* Business Setup group */}
              <div className="space-y-0.5">
                <div className="px-4 py-2">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-600">Start Your Business</p>
                </div>
                {setupLinks.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-sm font-semibold text-navy-800 hover:bg-gold-50 rounded-lg"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-2 space-y-0.5">
                <div className="px-4 py-2">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-600">Stay Compliant</p>
                </div>
                {complianceLinks.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-sm font-semibold text-navy-800 hover:bg-gold-50 rounded-lg"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-2 space-y-0.5">
                {[
                  { label: "Why HMA",       href: "/about"   },
                  { label: "Knowledge Hub", href: "/blog"    },
                  { label: "Contact",       href: "/contact" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-gray-50 rounded-lg"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href="https://wa.me/971528370245"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-lg text-sm font-bold uppercase tracking-wide"
                >
                  WhatsApp Us
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 bg-gold-400 text-navy-950 rounded-lg text-sm font-black text-center uppercase tracking-wide"
                >
                  Get Free Consultation
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
