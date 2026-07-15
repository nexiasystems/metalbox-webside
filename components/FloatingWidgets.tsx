"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { site } from "@/lib/site";

export default function FloatingWidgets({ labels }: { labels: Dictionary["widgets"] }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={labels.topLabel}
          className="flex h-11 w-11 items-center justify-center bg-ink text-white shadow-lg transition-colors hover:bg-graphite"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 16V4m0 0l-5 5m5-5l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      <a
        href={`tel:${site.phone}`}
        aria-label={labels.callLabel}
        className="flex h-11 w-11 items-center justify-center bg-graphite text-white shadow-lg transition-colors hover:bg-steel"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.6a1 1 0 01-.25 1l-2.22 2.2z" />
        </svg>
      </a>
      <a
        href={`mailto:${site.email}`}
        aria-label={labels.emailLabel}
        className="flex h-11 w-11 items-center justify-center bg-graphite text-white shadow-lg transition-colors hover:bg-steel"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="2" />
          <path d="M3.5 6.5L12 13l8.5-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </a>
      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.whatsappLabel}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-105"
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.9 5 2.3 7L4 29l7.3-2.3c1.9 1 4 1.6 6.2 1.6h.5c6.6 0 12-5.3 12-11.9C30 8.3 24.6 3 16 3zm7 16.9c-.3.8-1.7 1.6-2.4 1.7-.6.1-1.4.1-2.2-.1-.5-.2-1.2-.4-2-.8-3.6-1.5-5.9-5.1-6.1-5.4-.2-.2-1.4-1.9-1.4-3.6s.9-2.6 1.2-2.9c.3-.3.7-.4 1-.4h.7c.2 0 .5-.1.8.6.3.8 1.1 2.6 1.2 2.8.1.2.2.4 0 .7-.1.2-.2.4-.4.6l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.7 2.2 2.7 1.5 1.4 2.8 1.8 3.2 2 .4.2.6.2.9-.1.2-.3 1-1.2 1.3-1.6.3-.4.5-.3.9-.2.4.1 2.3 1.1 2.7 1.3.4.2.7.3.8.5.1.1.1.9-.2 1.7z" />
        </svg>
      </a>
    </div>
  );
}
