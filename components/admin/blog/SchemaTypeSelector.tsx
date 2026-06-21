"use client";

import { FiCode, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import type { SchemaType } from "@/lib/models/BlogPost";

const SCHEMA_OPTIONS: { value: SchemaType; label: string; description: string }[] = [
  { value: "Article", label: "Article", description: "Standard news or blog post" },
  { value: "TechArticle", label: "TechArticle", description: "Technical documentation or guide" },
  { value: "HowTo", label: "HowTo", description: "Step-by-step guide with time & cost" },
  { value: "ProductReview", label: "ProductReview", description: "Review of a product or service" },
  { value: "LocalBusiness", label: "LocalBusiness", description: "About a local business or location" },
];

interface SchemaTypeSelectorProps {
  schemaType: SchemaType;
  howToTotalTime: string;
  howToEstimatedCost: string;
  howToSupply: string[];
  onChange: (field: string, value: string | string[]) => void;
}

export default function SchemaTypeSelector({
  schemaType,
  howToTotalTime,
  howToEstimatedCost,
  howToSupply,
  onChange,
}: SchemaTypeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [supplyInput, setSupplyInput] = useState("");

  const addSupply = () => {
    const trimmed = supplyInput.trim();
    if (trimmed && !howToSupply.includes(trimmed)) {
      onChange("howToSupply", [...howToSupply, trimmed]);
    }
    setSupplyInput("");
  };

  const removeSupply = (idx: number) => {
    onChange("howToSupply", howToSupply.filter((_, i) => i !== idx));
  };

  const selected = SCHEMA_OPTIONS.find((o) => o.value === schemaType);

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden"
    >
      <summary className="flex items-center gap-3 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
        <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
          <FiCode size={18} />
        </div>
        <div className="flex-1">
          <span className="text-sm font-semibold text-navy-900">Schema Type</span>
          {!open && (
            <p className="text-xs text-gray-400 mt-0.5">{selected?.label} — {selected?.description}</p>
          )}
        </div>
        <FiChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </summary>

      <div className="px-6 pb-6 border-t border-gray-100 pt-5 space-y-5">
        <p className="text-xs text-gray-400 leading-relaxed">
          Tells search engines and AI crawlers how to categorise this content in their knowledge graph.
        </p>

        {/* Dropdown */}
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1.5">Primary Content Type</label>
          <select
            value={schemaType}
            onChange={(e) => onChange("schemaType", e.target.value as SchemaType)}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all bg-white"
          >
            {SCHEMA_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} — {opt.description}
              </option>
            ))}
          </select>
        </div>

        {/* HowTo-specific fields */}
        {schemaType === "HowTo" && (
          <div className="space-y-4 p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider">HowTo Details</p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-navy-900 mb-1">Total Time</label>
                <input
                  type="text"
                  value={howToTotalTime}
                  onChange={(e) => onChange("howToTotalTime", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none"
                  placeholder="e.g. 3 days"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-navy-900 mb-1">Estimated Cost</label>
                <input
                  type="text"
                  value={howToEstimatedCost}
                  onChange={(e) => onChange("howToEstimatedCost", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none"
                  placeholder="e.g. AED 15,000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-navy-900 mb-1">Tools / Supplies Required</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={supplyInput}
                  onChange={(e) => setSupplyInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSupply(); } }}
                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none"
                  placeholder="e.g. Passport copy"
                />
                <button
                  type="button"
                  onClick={addSupply}
                  className="px-3 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
              {howToSupply.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {howToSupply.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-blue-200 text-blue-700 text-xs rounded-full">
                      {item}
                      <button
                        type="button"
                        onClick={() => removeSupply(i)}
                        className="text-blue-400 hover:text-red-500 transition-colors ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </details>
  );
}
