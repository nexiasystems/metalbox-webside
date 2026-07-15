"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import QuoteModal from "@/components/QuoteModal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

interface QuoteModalContextValue {
  openQuote: (projectType?: string) => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue>({ openQuote: () => {} });

export function useQuoteModal() {
  return useContext(QuoteModalContext);
}

export default function QuoteModalProvider({
  children,
  form,
  privacyHref,
}: {
  children: ReactNode;
  form: Dictionary["form"];
  privacyHref: string;
}) {
  const [open, setOpen] = useState(false);
  const [projectType, setProjectType] = useState<string | undefined>();

  const openQuote = useCallback((type?: string) => {
    setProjectType(type);
    setOpen(true);
  }, []);

  return (
    <QuoteModalContext.Provider value={{ openQuote }}>
      {children}
      <QuoteModal
        open={open}
        onClose={() => setOpen(false)}
        form={form}
        privacyHref={privacyHref}
        defaultProjectType={projectType}
      />
    </QuoteModalContext.Provider>
  );
}
