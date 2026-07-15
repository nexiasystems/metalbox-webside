"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import QuoteForm from "@/components/QuoteForm";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  form: Dictionary["form"];
  privacyHref: string;
  defaultProjectType?: string;
}

export default function QuoteModal({ open, onClose, form, privacyHref, defaultProjectType }: QuoteModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-ink/70 p-4 backdrop-blur-sm md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={form.title}
        >
          <motion.div
            className="relative w-full max-w-2xl bg-white p-6 shadow-2xl md:p-10"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={form.close}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-ink/50 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-metal-red"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-ink md:text-3xl">
              {form.title}
            </h2>
            <p className="mt-2 text-sm text-ink/60">{form.subtitle}</p>
            <div className="mt-8">
              <QuoteForm form={form} privacyHref={privacyHref} defaultProjectType={defaultProjectType} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
