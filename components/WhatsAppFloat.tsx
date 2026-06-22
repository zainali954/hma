"use client";

import { useState, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="https://wa.me/971528370245"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with HMA on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex items-center bg-[#25D366] text-white rounded-full shadow-lg shadow-black/20 hover:shadow-xl hover:scale-105 transition-all duration-300 group overflow-hidden ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ transition: "opacity 0.4s ease, transform 0.4s ease, box-shadow 0.2s ease, scale 0.2s ease" }}
    >
      <span className="flex items-center justify-center w-14 h-14 flex-shrink-0">
        <FiMessageCircle size={24} />
      </span>
      <span className="max-w-0 overflow-hidden group-hover:max-w-[140px] transition-all duration-300 ease-in-out whitespace-nowrap pr-0 group-hover:pr-5 text-sm font-bold uppercase tracking-wide">
        WhatsApp Us
      </span>
    </a>
  );
}
