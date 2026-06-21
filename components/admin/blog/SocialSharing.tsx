"use client";

import { FiShare2, FiChevronDown } from "react-icons/fi";
import { useState } from "react";

interface SocialSharingProps {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  seoTitle: string;
  metaDescription: string;
  postTitle: string;
  excerpt: string;
  coverImage: string;
  onChange: (field: string, value: string) => void;
}

export default function SocialSharing({
  ogTitle,
  ogDescription,
  ogImage,
  seoTitle,
  metaDescription,
  postTitle,
  excerpt,
  coverImage,
  onChange,
}: SocialSharingProps) {
  const [open, setOpen] = useState(false);

  const titleFallback = ogTitle || seoTitle || postTitle || "Post title";
  const descFallback = ogDescription || metaDescription || excerpt || "Post description";
  const imageFallback = ogImage || coverImage || "";

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden group"
    >
      <summary className="flex items-center gap-3 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
        <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
          <FiShare2 size={18} />
        </div>
        <div className="flex-1">
          <span className="text-sm font-semibold text-navy-900">Social Sharing</span>
          {!open && ogTitle && (
            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-md">{ogTitle}</p>
          )}
        </div>
        <FiChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </summary>

      <div className="px-6 pb-6 space-y-5 border-t border-gray-100 pt-5">
        {/* OG Title */}
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1.5">
            OG Title
          </label>
          <input
            type="text"
            value={ogTitle}
            onChange={(e) => onChange("ogTitle", e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
            placeholder={titleFallback}
          />
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-gray-400">
              {!ogTitle && (
                <span className="text-amber-500">
                  Falls back to: SEO Title → Post Title
                </span>
              )}
            </span>
            <span className="text-xs text-gray-400">{ogTitle.length || titleFallback.length} chars</span>
          </div>
        </div>

        {/* OG Description */}
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1.5">
            OG Description
          </label>
          <textarea
            value={ogDescription}
            onChange={(e) => onChange("ogDescription", e.target.value)}
            rows={2}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all resize-none"
            placeholder={descFallback}
          />
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-gray-400">
              {!ogDescription && (
                <span className="text-amber-500">
                  Falls back to: Meta Description → Excerpt
                </span>
              )}
            </span>
            <span className="text-xs text-gray-400">{ogDescription.length || descFallback.length} chars</span>
          </div>
        </div>

        {/* OG Image */}
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1.5">
            OG Image URL
          </label>
          <input
            type="url"
            value={ogImage}
            onChange={(e) => onChange("ogImage", e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
            placeholder={coverImage || "https://example.com/social-image.jpg"}
          />
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-gray-400">
              {!ogImage && (
                <span className="text-amber-500">Falls back to: Featured Image</span>
              )}
            </span>
          </div>
          {(ogImage || coverImage) && (
            <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 max-w-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageFallback}
                alt="Social preview"
                className="w-full h-32 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      </div>
    </details>
  );
}
