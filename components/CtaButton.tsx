"use client";

import type { ReactNode } from "react";
import { useQuoteModal } from "@/components/QuoteModalProvider";

export default function CtaButton({
  children,
  projectType,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  projectType?: string;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
}) {
  const { openQuote } = useQuoteModal();
  const base = variant === "primary" ? "btn-primary" : variant === "ghost" ? "btn-ghost" : "btn-dark";
  return (
    <button type="button" onClick={() => openQuote(projectType)} className={`${base} ${className}`}>
      {children}
    </button>
  );
}
