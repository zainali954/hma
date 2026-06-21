"use client";

import { FiZap, FiChevronDown } from "react-icons/fi";
import { useState } from "react";

interface AiSnippetProps {
  value: string;
  onChange: (value: string) => void;
}

const MAX = 250;

export default function AiSnippet({ value, onChange }: AiSnippetProps) {
  const [open, setOpen] = useState(false);
  const remaining = MAX - value.length;
  const isOver = remaining < 0;
  const isGood = value.length >= 100 && !isOver;

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden"
    >
      <summary className="flex items-center gap-3 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
        <div className="w-9 h-9 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
          <FiZap size={18} />
        </div>
        <div className="flex-1">
          <span className="text-sm font-semibold text-navy-900">AI Snippet / TL;DR</span>
          {!open && value && (
            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-md">{value}</p>
          )}
          {!open && !value && (
            <p className="text-xs text-amber-500 mt-0.5">Not set — AI crawlers will fall back to excerpt</p>
          )}
        </div>
        <FiChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </summary>

      <div className="px-6 pb-6 border-t border-gray-100 pt-5 space-y-3">
        <p className="text-xs text-gray-400 leading-relaxed">
          A single hyper-focused sentence (100–250 chars) placed immediately after the article heading.
          LLMs and Google AI Overviews pull this as the primary pull-quote attributed to your site.
        </p>
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value.slice(0, MAX + 10))}
            rows={3}
            className={`w-full px-4 py-2.5 text-sm rounded-xl border resize-none outline-none transition-all focus:ring-2 focus:ring-gold-400/20 ${
              isOver
                ? "border-red-300 bg-red-50 focus:border-red-400"
                : isGood
                ? "border-green-300 focus:border-green-400"
                : "border-gray-200 focus:border-gold-400"
            }`}
            placeholder="e.g. Setting up a business in Dubai takes as few as 3 days and costs from AED 15,000 with the right free zone."
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {value.length < 100 ? `${100 - value.length} more chars for minimum` : "Good length"}
          </span>
          <span className={`text-xs font-medium tabular-nums ${isOver ? "text-red-500" : isGood ? "text-green-500" : "text-gray-400"}`}>
            {value.length}/{MAX}
          </span>
        </div>
      </div>
    </details>
  );
}
