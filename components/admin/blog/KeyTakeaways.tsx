"use client";

import { FiPlus, FiTrash2, FiChevronUp, FiChevronDown, FiList, FiChevronDown as FiChevronDownIcon } from "react-icons/fi";
import { useState } from "react";

interface KeyTakeawaysProps {
  takeaways: string[];
  onChange: (takeaways: string[]) => void;
}

export default function KeyTakeaways({ takeaways, onChange }: KeyTakeawaysProps) {
  const [open, setOpen] = useState(false);

  const addTakeaway = () => {
    onChange([...takeaways, ""]);
  };

  const removeTakeaway = (index: number) => {
    onChange(takeaways.filter((_, i) => i !== index));
  };

  const moveTakeaway = (index: number, direction: "up" | "down") => {
    const newItems = [...takeaways];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= newItems.length) return;
    [newItems[index], newItems[target]] = [newItems[target], newItems[index]];
    onChange(newItems);
  };

  const updateTakeaway = (index: number, value: string) => {
    const newItems = [...takeaways];
    newItems[index] = value;
    onChange(newItems);
  };

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden group"
    >
      <summary className="flex items-center gap-3 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
        <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
          <FiList size={18} />
        </div>
        <div className="flex-1">
          <span className="text-sm font-semibold text-navy-900">Key Takeaways</span>
          {!open && takeaways.length > 0 && (
            <p className="text-xs text-gray-400 mt-0.5">{takeaways.length} takeaway{takeaways.length !== 1 ? "s" : ""}</p>
          )}
        </div>
        <FiChevronDownIcon
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </summary>

      <div className="px-6 pb-6 border-t border-gray-100 pt-5">
        {takeaways.length === 0 ? (
          <div className="text-center py-8">
            <FiList className="mx-auto text-gray-300 mb-3" size={32} />
            <p className="text-sm text-gray-500 mb-4">No key takeaways yet</p>
            <button
              type="button"
              onClick={addTakeaway}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy-900 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
            >
              <FiPlus size={16} />
              Add Takeaway
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {takeaways.map((takeaway, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center text-xs font-bold mt-2">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <input
                    type="text"
                    value={takeaway}
                    onChange={(e) => updateTakeaway(i, e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                    placeholder="Enter key takeaway..."
                  />
                </div>
                <div className="flex items-center gap-0.5 mt-1">
                  <button
                    type="button"
                    onClick={() => moveTakeaway(i, "up")}
                    disabled={i === 0}
                    className="p-1.5 text-gray-400 hover:text-navy-900 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    <FiChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveTakeaway(i, "down")}
                    disabled={i === takeaways.length - 1}
                    className="p-1.5 text-gray-400 hover:text-navy-900 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    <FiChevronDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTakeaway(i)}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    title="Remove"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addTakeaway}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 border-2 border-dashed border-gray-200 rounded-xl hover:border-gold-400 hover:text-navy-900 transition-all"
            >
              <FiPlus size={16} />
              Add Takeaway
            </button>
          </div>
        )}
      </div>
    </details>
  );
}
