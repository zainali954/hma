"use client";

import { FiPlus, FiTrash2, FiChevronUp, FiChevronDown, FiHelpCircle, FiChevronDown as FiChevronDownIcon } from "react-icons/fi";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqBuilderProps {
  faqs: FaqItem[];
  onChange: (faqs: FaqItem[]) => void;
}

export default function FaqBuilder({ faqs, onChange }: FaqBuilderProps) {
  const [open, setOpen] = useState(false);

  const addFaq = () => {
    onChange([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    onChange(faqs.filter((_, i) => i !== index));
  };

  const moveFaq = (index: number, direction: "up" | "down") => {
    const newFaqs = [...faqs];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= newFaqs.length) return;
    [newFaqs[index], newFaqs[target]] = [newFaqs[target], newFaqs[index]];
    onChange(newFaqs);
  };

  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    onChange(newFaqs);
  };

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden group"
    >
      <summary className="flex items-center gap-3 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
        <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
          <FiHelpCircle size={18} />
        </div>
        <div className="flex-1">
          <span className="text-sm font-semibold text-navy-900">FAQ Builder</span>
          {!open && faqs.length > 0 && (
            <p className="text-xs text-gray-400 mt-0.5">{faqs.length} FAQ{faqs.length !== 1 ? "s" : ""} added</p>
          )}
        </div>
        <FiChevronDownIcon
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </summary>

      <div className="px-6 pb-6 border-t border-gray-100 pt-5">
        {faqs.length === 0 ? (
          <div className="text-center py-8">
            <FiHelpCircle className="mx-auto text-gray-300 mb-3" size={32} />
            <p className="text-sm text-gray-500 mb-4">No FAQ items yet</p>
            <button
              type="button"
              onClick={addFaq}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy-900 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
            >
              <FiPlus size={16} />
              Add FAQ
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-4 relative group/faq"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    FAQ #{i + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveFaq(i, "up")}
                      disabled={i === 0}
                      className="p-1.5 text-gray-400 hover:text-navy-900 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <FiChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveFaq(i, "down")}
                      disabled={i === faqs.length - 1}
                      className="p-1.5 text-gray-400 hover:text-navy-900 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <FiChevronDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFaq(i)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove FAQ"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFaq(i, "question", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                    placeholder="Enter question..."
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(i, "answer", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all resize-none"
                    placeholder="Enter answer..."
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addFaq}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 border-2 border-dashed border-gray-200 rounded-xl hover:border-gold-400 hover:text-navy-900 transition-all"
            >
              <FiPlus size={16} />
              Add FAQ
            </button>
          </div>
        )}
      </div>
    </details>
  );
}
