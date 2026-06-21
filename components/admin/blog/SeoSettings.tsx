"use client";

import { FiSearch, FiExternalLink, FiChevronDown } from "react-icons/fi";
import { useState } from "react";

interface SeoSettingsProps {
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  postTitle: string;
  excerpt: string;
  onChange: (field: string, value: string) => void;
}

export default function SeoSettings({
  seoTitle,
  metaDescription,
  focusKeyword,
  canonicalUrl,
  postTitle,
  excerpt,
  onChange,
}: SeoSettingsProps) {
  const [open, setOpen] = useState(false);

  const seoFallback = seoTitle || postTitle || "Post title";
  const descFallback = metaDescription || excerpt || "Post excerpt";

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden group"
    >
      <summary className="flex items-center gap-3 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
        <div className="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
          <FiSearch size={18} />
        </div>
        <div className="flex-1">
          <span className="text-sm font-semibold text-navy-900">SEO Settings</span>
          {!open && seoTitle && (
            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-md">{seoTitle}</p>
          )}
        </div>
        <FiChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </summary>

      <div className="px-6 pb-6 space-y-5 border-t border-gray-100 pt-5">
        {/* SEO Title */}
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1.5">
            SEO Title
          </label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => onChange("seoTitle", e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
            placeholder={postTitle || "Enter SEO title..."}
          />
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-gray-400">
              Recommended: 50–60 characters
              {!seoTitle && (
                <span className="text-amber-500 ml-1">
                  (falls back to post title)
                </span>
              )}
            </span>
            <span
              className={`text-xs font-medium ${
                seoTitle.length > 60
                  ? "text-red-500"
                  : seoTitle.length >= 50
                  ? "text-green-500"
                  : "text-gray-400"
              }`}
            >
              {seoTitle.length || seoFallback.length} chars
            </span>
          </div>
          {seoTitle && (
            <p className="text-xs text-gray-400 mt-1">
              Preview: <span className="text-gray-500">{seoTitle}</span>
            </p>
          )}
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1.5">
            Meta Description
          </label>
          <textarea
            value={metaDescription}
            onChange={(e) => onChange("metaDescription", e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all resize-none"
            placeholder={excerpt || "Brief description for search results..."}
          />
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-gray-400">
              Recommended: 150–160 characters
              {!metaDescription && (
                <span className="text-amber-500 ml-1">
                  (falls back to excerpt)
                </span>
              )}
            </span>
            <span
              className={`text-xs font-medium ${
                metaDescription.length > 160
                  ? "text-red-500"
                  : metaDescription.length >= 150
                  ? "text-green-500"
                  : "text-gray-400"
              }`}
            >
              {metaDescription.length || descFallback.length} chars
            </span>
          </div>
        </div>

        {/* Focus Keyword */}
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1.5">
            Focus Keyword
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <input
            type="text"
            value={focusKeyword}
            onChange={(e) => onChange("focusKeyword", e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
            placeholder="e.g. dubai business setup"
          />
          <p className="text-xs text-gray-400 mt-1">
            Used internally to track SEO performance
          </p>
        </div>

        {/* Canonical URL */}
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1.5">
            Canonical URL
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <div className="relative">
            <FiExternalLink
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={15}
            />
            <input
              type="url"
              value={canonicalUrl}
              onChange={(e) => onChange("canonicalUrl", e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
              placeholder="https://hmaadubai.com/blog/..."
            />
          </div>
        </div>
      </div>
    </details>
  );
}
