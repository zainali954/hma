"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMessageCircle } from "react-icons/fi";

const kpis = [
  { value: "3 Days",   label: "Trade Licence" },
  { value: "5–7 Days", label: "Residence Visa" },
  { value: "1 Week",   label: "Bank Account" },
  { value: "98%",      label: "Client Retention" },
];

export default function HeroSection() {
  return (
    <section className="bg-navy-950 pt-8 pb-0 sm:pt-10 lg:pt-16 overflow-hidden relative">
      {/* Gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 75% 60%, rgba(197,157,75,0.12) 0%, transparent 65%)" }}
      />

      {/* Dubai skyline — full section height, pinned to right edge */}
      <motion.div
        className="hidden lg:block absolute inset-y-0 right-0 w-[46%] pointer-events-none"
        initial={{ opacity: 0, x: 48 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
      >
        <Image
          src="/header-image.png"
          alt="HMA Dubai — Business Setup, Golden Visa and Compliance Specialists in the UAE"
          fill
          sizes="46vw"
          className="object-contain object-bottom"
          priority
        />
      </motion.div>

      {/* Text content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pb-14 lg:pb-24 text-center lg:text-left lg:max-w-[56%]">

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-[10px] sm:text-[11px] font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase text-gold-400 mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse flex-shrink-0" />
            <span className="sm:hidden">Licensed · Regulated · Est. 2017</span>
            <span className="hidden sm:inline">Ministry of Economy Licensed · Est. 2017</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-[1.05] mb-8 uppercase tracking-tight"
          >
            Launch Your Dubai Business{" "}
            <span className="text-gold-400">In As Little As 3 Days</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
            className="text-base sm:text-lg text-gray-300 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            Company formation with end-to-end support for visas, banking, tax and compliance — under one roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center lg:items-start gap-3"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto whitespace-nowrap justify-center inline-flex items-center gap-2 px-8 py-4 bg-gold-400 text-navy-950 font-black text-sm rounded-lg hover:bg-gold-300 transition-all duration-200 uppercase tracking-wide shadow-lg shadow-gold-400/20"
            >
              Get Free Consultation
              <FiArrowRight size={14} />
            </Link>
            <a
              href="https://wa.me/971528370245"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto whitespace-nowrap justify-center inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold text-sm rounded-lg hover:bg-[#1ebe5a] transition-all duration-200 uppercase tracking-wide"
            >
              <FiMessageCircle size={16} />
              WhatsApp Expert
            </a>
          </motion.div>

          {/* KPI strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 mt-16 pt-10 border-t border-white/10 max-w-2xl mx-auto lg:mx-0"
          >
            {kpis.map((kpi) => (
              <div key={kpi.label} className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-black text-gold-400 leading-none mb-1.5">{kpi.value}</p>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide leading-tight">{kpi.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="text-[9px] sm:text-[11px] font-bold tracking-[0.08em] sm:tracking-[0.1em] uppercase text-gray-500 mt-8"
          >
            <span className="sm:hidden">ICAEW · ACCA · FTA Registered</span>
            <span className="hidden sm:inline">ICAEW Chartered Accountants &bull; FTA Registered Tax Agency</span>
          </motion.p>

        </div>
      </div>
    </section>
  );
}
