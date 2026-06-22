"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMessageCircle } from "react-icons/fi";

const trustChips = [
  { value: "ICAEW",    label: "Chartered Accountants" },
  { value: "Licensed", label: "Ministry of Economy" },
  { value: "150+",     label: "Businesses Launched" },
  { value: "98%",      label: "Client Retention" },
];

export default function HeroSection() {
  return (
    <section className="bg-navy-950 pt-8 pb-0 sm:pt-10 lg:pt-16 overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 75% 60%, rgba(197,157,75,0.12) 0%, transparent 65%)" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-end">

          {/* Left: text */}
          <div className="pb-10 sm:pb-14 lg:pb-20 text-center lg:text-left">

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-[11px] font-bold tracking-[0.15em] uppercase text-gold-400 mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              Ministry of Economy Licensed · Est. 2017
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-[1.05] mb-5 uppercase tracking-tight"
            >
              Launch Your Dubai Business{" "}
              <span className="text-gold-400">In As Little As 3 Days</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
              className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Mainland, Free Zone &amp; Offshore Company Formation with End-to-End
              Support for Licensing, Visas, Banking, Tax and Compliance.
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

            {/* Trust chips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-8 max-w-xl mx-auto lg:mx-0"
            >
              {trustChips.map((chip) => (
                <div
                  key={chip.label}
                  className="flex flex-col items-center lg:items-start gap-0.5 py-3 px-3 bg-white/5 border border-white/10 rounded-lg text-center lg:text-left"
                >
                  <span className="text-base font-black text-gold-400 leading-tight">{chip.value}</span>
                  <span className="text-[10px] text-gray-400 font-medium leading-tight">{chip.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: header image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="hidden sm:relative sm:flex items-end justify-center lg:justify-end sm:h-72 lg:h-[460px]"
          >
            <Image
              src="/header-image.png"
              alt="HMA Dubai — Business Setup, Golden Visa and Compliance Specialists in the UAE"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain object-bottom"
              priority
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
