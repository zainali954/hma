"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMessageCircle } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="bg-white pt-6 pb-4 sm:pt-8 sm:pb-0 lg:pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-end relative">

          {/* Left: text */}
          <div className="pb-6 sm:pb-12 lg:pb-20 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-[11px] font-bold tracking-[0.15em] uppercase text-gold-700 mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
              Ministry of Economy Licensed
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-3xl sm:text-4xl lg:text-6xl font-black text-navy-900 leading-[1.05] mb-5 uppercase tracking-tight"
            >
              Start Your Business in Dubai — The Right Way
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
              className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Mainland · Free Zone · Offshore company formation by a Ministry of Economy
              licensed firm. <span className="text-navy-900 font-semibold">Trade licence in 3–5 working days.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: "easeOut" }}
              className="flex flex-col sm:flex-row flex-wrap items-center lg:items-start gap-3"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto whitespace-nowrap justify-center inline-flex items-center gap-2 px-7 py-3.5 bg-navy-900 text-white font-bold text-sm rounded-lg hover:bg-navy-800 transition-all duration-200 uppercase tracking-wide"
              >
                Free Setup Consultation
                <FiArrowRight size={14} />
              </Link>
              <a
                href="https://wa.me/971528370245"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto whitespace-nowrap justify-center inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-bold text-sm rounded-lg hover:bg-[#1ebe5a] transition-all duration-200 uppercase tracking-wide"
              >
                <FiMessageCircle size={16} />
                WhatsApp Us
              </a>
              <Link
                href="/services"
                className="w-full sm:w-auto whitespace-nowrap justify-center inline-flex items-center px-7 py-3.5 border-2 border-navy-900 text-navy-900 font-bold text-sm rounded-lg hover:bg-navy-900 hover:text-white transition-all duration-200 uppercase tracking-wide"
              >
                Explore Services
              </Link>
            </motion.div>

            {/* Trust microcopy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="text-xs text-gray-500 mt-5 lg:mt-6"
            >
              150+ businesses launched · Burlington Tower, Business Bay · Reply within 1 hour
            </motion.p>
          </div>

          {/* Right: header image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="hidden sm:relative sm:flex items-end justify-center lg:justify-end sm:h-72 lg:h-[420px]"
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
