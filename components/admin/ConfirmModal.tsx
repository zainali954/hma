"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Delete",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) setTimeout(() => cancelRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — portalled to body, no stacking-context interference */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: "fixed", inset: 0, zIndex: 9998 }}
            className="bg-navy-950/50 backdrop-blur-sm"
            onClick={onCancel}
            aria-hidden="true"
          />

          {/* Dialog — centering wrapper is plain div; motion div handles only opacity/scale */}
          <div
            key="dialog-wrap"
            style={{ position: "fixed", zIndex: 9999, inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", pointerEvents: "none" }}
          >
          <motion.div
            key="dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ pointerEvents: "auto", width: "100%", maxWidth: "28rem" }}
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-navy-900/20 overflow-hidden">
              {/* Icon strip */}
              <div className="bg-red-50 border-b border-red-100 px-6 pt-6 pb-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <FiAlertTriangle size={18} className="text-red-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 id="modal-title" className="text-base font-bold text-navy-900">
                    {title}
                  </h2>
                  <p id="modal-desc" className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {description}
                  </p>
                </div>
                <button
                  onClick={onCancel}
                  className="flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <FiX size={16} />
                </button>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 flex items-center justify-end gap-3 bg-white">
                <button
                  ref={cancelRef}
                  onClick={onCancel}
                  disabled={loading}
                  className="px-5 py-2.5 text-sm font-medium text-navy-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FiTrash2 size={14} />
                  )}
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
