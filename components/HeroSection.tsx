"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-white pt-6 pb-4 sm:pt-8 sm:pb-0 lg:pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-end relative">

          {/* Left: text */}
          <div className="pb-6 sm:pb-12 lg:pb-20 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-3xl sm:text-4xl lg:text-6xl font-black text-navy-900 leading-[1.05] mb-6 uppercase tracking-tight"
            >
              Your Trusted Compliance Partner in the UAE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
              className="text-lg sm:text-xl text-gray-600 mb-10 font-medium"
            >
              Statutory Audit, Corporate Tax, Company Formation
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: "easeOut" }}
              className="flex flex-col sm:flex-row flex-wrap items-center lg:items-start gap-3 lg:gap-2"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto whitespace-nowrap justify-center inline-flex items-center px-7 py-3.5 lg:px-4 lg:py-3 bg-navy-900 text-white font-bold text-sm lg:text-xs rounded-lg hover:bg-navy-800 transition-all duration-200 uppercase tracking-wide lg:tracking-normal"
              >
                Start Your Company
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto whitespace-nowrap justify-center inline-flex items-center px-7 py-3.5 lg:px-4 lg:py-3 border-2 border-navy-900 text-navy-900 font-bold text-sm lg:text-xs rounded-lg hover:bg-navy-900 hover:text-white transition-all duration-200 uppercase tracking-wide lg:tracking-normal"
              >
                Request Audit Quote
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto whitespace-nowrap justify-center inline-flex items-center px-7 py-3.5 lg:px-4 lg:py-3 border-2 border-navy-900 text-navy-900 font-bold text-sm lg:text-xs rounded-lg hover:bg-navy-900 hover:text-white transition-all duration-200 uppercase tracking-wide lg:tracking-normal"
              >
                Schedule Tax Review
              </Link>
            </motion.div>
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
              alt="HMA - Your trusted compliance partner in the UAE"
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
